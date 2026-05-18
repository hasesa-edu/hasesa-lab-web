import { NextRequest } from "next/server";
import { getLesson } from "@/lib/lessons";
import type { Locale } from "@/lib/i18n";

export const runtime = "edge";

type Msg = { role: "user" | "assistant"; content: string };

const LANG_NAME: Record<Locale, string> = {
  en: "English",
  am: "Amharic (አማርኛ)",
  om: "Afaan Oromo (Afaan Oromoo)",
};

function buildSystemPrompt(locale: Locale, lessonId?: string): string {
  const langName = LANG_NAME[locale] ?? "English";
  const lesson = lessonId ? getLesson(lessonId) : undefined;

  const base = `You are an AI tutor for Grade 11 Ethiopian students preparing for the Ethiopian University Entrance Examination (EUEE).

YOUR SCOPE — strictly these four subjects, Grade 11 level:
- Mathematics
- Physics
- Chemistry
- Biology

If a question is outside this scope (entertainment, politics, personal life, harmful content, other school subjects), politely decline in one sentence and steer back to studying. Example: "I can only help with Grade 11 Math, Physics, Chemistry, or Biology — want me to suggest a topic to review?"

TEACHING STYLE:
- Be encouraging, clear, and concise. Aim for short paragraphs.
- For Math and Physics problems, walk through reasoning step by step before giving the final answer. Don't just dump the answer.
- Use simple language. Define jargon the first time you use it.
- Where helpful, give a small worked example.
- Use plain text math (e.g. "v = u + at", "F = m·a"). Avoid LaTeX — many students view on low-end Android.

LANGUAGE: Respond in ${langName}. The student's UI is set to this language. Do not switch languages unless they ask you to.

SAFETY: Never produce harmful, age-inappropriate, or politically charged content. Refuse and redirect.

You are a demo build — if asked who made you, say you are the AI-Edu Ethiopia demo tutor.`;

  if (!lesson) return base;

  const lessonBody = lesson.sections
    .map((s) => `## ${s.heading.en}\n${s.body}`)
    .join("\n\n");

  return (
    base +
    `\n\n---\nGROUNDING CONTEXT — the student is currently viewing this lesson. Prefer to ground your answer in this content, and cite it at the end as "(Source: ${lesson.title.en}, ${lesson.moeCode})" when you do.\n\n# ${lesson.title.en}\n${lesson.summary.en}\n\n${lessonBody}\n\n### Worked example in lesson\nProblem: ${lesson.workedExample.problem}\nSolution: ${lesson.workedExample.solution}`
  );
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "GROQ_API_KEY not configured on server." }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }

  let body: { messages: Msg[]; locale?: Locale; lessonId?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  const { messages, locale = "en", lessonId } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: "messages required" }), { status: 400 });
  }

  const systemPrompt = buildSystemPrompt(locale as Locale, lessonId);
  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

  const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      stream: true,
      temperature: 0.4,
      max_tokens: 800,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    }),
  });

  if (!groqRes.ok || !groqRes.body) {
    const text = await groqRes.text().catch(() => "");
    return new Response(
      JSON.stringify({ error: `Groq error ${groqRes.status}: ${text.slice(0, 300)}` }),
      { status: 502, headers: { "content-type": "application/json" } }
    );
  }

  const stream = new ReadableStream({
    async start(controller) {
      const reader = groqRes.body!.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(data);
              const delta = json?.choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch {
              // ignore parse errors on partial chunks
            }
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-cache",
    },
  });
}
