import { NextRequest } from "next/server";
import { getLesson } from "@/lib/lessons";
import { getSession } from "@/lib/auth/session";
import { checkAndIncrement } from "@/lib/usage";

export const runtime = "nodejs";

const SCHEMA_HINT = `{
  "questions": [
    {
      "q": "question text",
      "choices": ["A", "B", "C", "D"],
      "answerIndex": 0,
      "explanation": "why the answer is right"
    }
  ]
}`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "GROQ_API_KEY not configured" }, { status: 500 });
  }

  let body: { lessonId: string; count?: number };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const lesson = getLesson(body.lessonId);
  if (!lesson) return Response.json({ error: "Lesson not found" }, { status: 404 });
  const count = Math.min(Math.max(body.count ?? 3, 1), 5);

  const session = await getSession();
  if (session.userId) {
    const cap = await checkAndIncrement(session.userId, "quizBatches", 1);
    if (!cap.ok) {
      return Response.json(
        { error: `Monthly AI quiz cap reached (${cap.current}/${cap.cap}). Resets next month.` },
        { status: 429 }
      );
    }
  }

  const lessonBody = lesson.sections.map((s) => `## ${s.heading.en}\n${s.body}`).join("\n\n");

  const system = `You generate multiple-choice practice questions for Ethiopian high school students (currently Grade 11). The goal is to deepen understanding, not just drill exam patterns — though strong understanding also leads to better EUEE performance.

Rules:
- Each question must be answerable solely from the lesson content below.
- Each question has exactly 4 choices. Exactly one is correct.
- Distractors must be plausible — common misconceptions, off-by-one errors, sign errors, unit confusion, etc. — not silly.
- Prefer questions that test the *why* (conceptual understanding) over rote recall, when the lesson supports it.
- Avoid duplicates of each other or of the existing in-lesson quiz.
- Difficulty: appropriate for a Grade 11 student.
- Use plain text math (e.g. "v = u + at"). No LaTeX.
- Output VALID JSON only matching this schema (no markdown fences, no commentary):
${SCHEMA_HINT}

LESSON: ${lesson.title.en} (${lesson.moeCode})
${lesson.summary.en}

${lessonBody}

Existing in-lesson questions to AVOID duplicating:
${lesson.quiz.map((q, i) => `${i + 1}. ${q.q}`).join("\n")}`;

  const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_tokens: 1200,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: `Generate ${count} new practice questions.` },
      ],
    }),
  });

  if (!groqRes.ok) {
    const text = await groqRes.text().catch(() => "");
    console.error(`Groq error ${groqRes.status}: ${text.slice(0, 200)}`);
    return Response.json({ error: "Quiz generation is temporarily unavailable." }, { status: 502 });
  }

  const data = await groqRes.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) return Response.json({ error: "No content from model" }, { status: 502 });

  let parsed: { questions?: { q: string; choices: string[]; answerIndex: number; explanation: string }[] };
  try {
    parsed = JSON.parse(content);
  } catch {
    return Response.json({ error: "Model returned non-JSON" }, { status: 502 });
  }

  const questions = (parsed.questions || []).filter(
    (q) =>
      q && typeof q.q === "string" &&
      Array.isArray(q.choices) && q.choices.length === 4 &&
      typeof q.answerIndex === "number" && q.answerIndex >= 0 && q.answerIndex < 4 &&
      typeof q.explanation === "string"
  );

  return Response.json({ questions });
}
