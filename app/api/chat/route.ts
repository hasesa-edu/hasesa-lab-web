import { NextRequest } from "next/server";
import { getLesson } from "@/lib/lessons";
import type { Locale } from "@/lib/i18n";
import { getSession } from "@/lib/auth/session";
import { db, schema } from "@/lib/db/client";
import { and, eq } from "drizzle-orm";
import { CAPS, checkAndIncrement, getCurrentUsage } from "@/lib/usage";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { readJsonLimited, BODY_LIMIT } from "@/lib/http";

const MAX_MESSAGE_CHARS = 8000;

export const runtime = "nodejs";

type Msg = { role: "user" | "assistant"; content: string };

const LANG_NAME: Record<Locale, string> = {
  en: "English",
};

function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

function buildSystemPrompt(locale: Locale, lessonId?: string): string {
  const langName = LANG_NAME[locale] ?? "English";
  const lesson = lessonId ? getLesson(lessonId) : undefined;

  const base = `You are an AI tutor for Ethiopian high school students. Your job is to help them truly understand the subject — not just pass an exam. Preparing well for the EUEE is a natural by-product of real understanding, not the goal itself.

YOUR SCOPE — strictly these four subjects at the Grade 11 level (the current demo scope):
- Mathematics
- Physics
- Chemistry
- Biology

If a question is outside this scope (entertainment, politics, personal life, harmful content, other school subjects), politely decline in one sentence and steer back to studying.

TEACHING STYLE:
- Be encouraging, clear, and concise. Short paragraphs.
- Aim for understanding: explain *why*, not just *what*. Use analogies and everyday examples when helpful.
- For Math/Physics problems, walk through reasoning step-by-step before the final answer.
- When relevant, suggest a simple at-home experiment or observation the student could try.
- Use simple language; define jargon the first time.
- Use plain-text math (e.g. "v = u + at"). Avoid LaTeX — many students view on low-end Android.

LANGUAGE: Respond in ${langName}. Do not switch unless the student asks.

SAFETY: Never produce harmful, age-inappropriate, or politically charged content.

You are the Hasesa demo tutor.`;

  if (!lesson) return base;

  const lessonBody = lesson.sections.map((s) => `## ${s.heading.en}\n${s.body}`).join("\n\n");
  return (
    base +
    `\n\n---\nGROUNDING CONTEXT — the student is currently viewing this lesson. Ground your answer in this content and cite it at the end as "(Source: ${lesson.title.en}, ${lesson.moeCode})".\n\n# ${lesson.title.en}\n${lesson.summary.en}\n\n${lessonBody}\n\n### Worked example\nProblem: ${lesson.workedExample.problem}\nSolution: ${lesson.workedExample.solution}`
  );
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "GROQ_API_KEY not configured" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  // Throttle every caller (esp. anonymous) so the endpoint can't be looped to
  // burn Groq spend. 20 requests per IP per 5 minutes.
  const limit = rateLimit(`chat:${clientIp(req)}`, 20, 5 * 60 * 1000);
  if (!limit.ok) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please slow down." }),
      { status: 429, headers: { "content-type": "application/json", "retry-after": String(limit.retryAfter) } }
    );
  }

  const parsed = await readJsonLimited(req, BODY_LIMIT.chat);
  if (!parsed.ok) {
    return new Response(JSON.stringify({ error: parsed.error }), { status: parsed.status });
  }
  const body = parsed.data as { messages: Msg[]; locale?: Locale; lessonId?: string; conversationId?: string };

  const { messages, locale = "en", lessonId } = body;
  let conversationId = body.conversationId;
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: "messages required" }), { status: 400 });
  }

  // Only trust user/assistant turns from the client; drop any injected
  // "system" role and malformed entries, and cap history length.
  const safeMessages: Msg[] = messages
    .filter(
      (m): m is Msg =>
        !!m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.length <= MAX_MESSAGE_CHARS
    )
    .slice(-20);
  if (safeMessages.length === 0) {
    return new Response(JSON.stringify({ error: "messages required" }), { status: 400 });
  }

  // Auth: if signed in, persist + enforce caps. Anonymous: just stream, no persistence.
  const session = await getSession();
  const userId = session.userId;

  if (userId) {
    const cap = await checkAndIncrement(userId, "chatTurns", 1);
    if (!cap.ok) {
      return new Response(
        JSON.stringify({
          error: `Monthly chat turn cap reached (${cap.current}/${cap.cap}). Resets next month.`,
        }),
        { status: 429, headers: { "content-type": "application/json" } }
      );
    }

    // Ensure conversation exists and belongs to this user (prevents writing
    // into another user's conversation via a supplied conversationId).
    if (!conversationId) {
      conversationId = uid();
      await db.insert(schema.conversations).values({ id: conversationId, userId, lessonId: lessonId ?? null });
    } else {
      const owned = await db
        .select({ id: schema.conversations.id })
        .from(schema.conversations)
        .where(and(eq(schema.conversations.id, conversationId), eq(schema.conversations.userId, userId)))
        .limit(1);
      if (!owned.length) {
        return new Response(JSON.stringify({ error: "Conversation not found" }), {
          status: 404,
          headers: { "content-type": "application/json" },
        });
      }
      await db
        .update(schema.conversations)
        .set({ updatedAt: new Date() })
        .where(and(eq(schema.conversations.id, conversationId), eq(schema.conversations.userId, userId)));
    }
    // Persist user's last message
    const lastUser = [...safeMessages].reverse().find((m) => m.role === "user");
    if (lastUser) {
      await db.insert(schema.messages).values({
        id: uid(),
        conversationId,
        role: "user",
        content: lastUser.content,
      });
    }
  }

  const systemPrompt = buildSystemPrompt(locale as Locale, lessonId);
  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

  const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      stream: true,
      temperature: 0.4,
      max_tokens: 800,
      messages: [{ role: "system", content: systemPrompt }, ...safeMessages],
    }),
  });

  if (!groqRes.ok || !groqRes.body) {
    // Log upstream detail server-side; don't relay it to the client.
    const text = await groqRes.text().catch(() => "");
    console.error(`Groq error ${groqRes.status}: ${text.slice(0, 300)}`);
    return new Response(
      JSON.stringify({ error: "The tutor is temporarily unavailable. Please try again." }),
      { status: 502, headers: { "content-type": "application/json" } }
    );
  }

  let acc = "";
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
              if (userId && conversationId && acc) {
                await db
                  .insert(schema.messages)
                  .values({ id: uid(), conversationId, role: "assistant", content: acc })
                  .catch(() => {});
              }
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(data);
              const delta = json?.choices?.[0]?.delta?.content;
              if (delta) {
                acc += delta;
                controller.enqueue(encoder.encode(delta));
              }
            } catch {
              // ignore parse errors on partial chunks
            }
          }
        }
        if (userId && conversationId && acc) {
          await db
            .insert(schema.messages)
            .values({ id: uid(), conversationId, role: "assistant", content: acc })
            .catch(() => {});
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  const headers: Record<string, string> = {
    "content-type": "text/plain; charset=utf-8",
    "cache-control": "no-cache",
  };
  if (conversationId) headers["x-conversation-id"] = conversationId;
  return new Response(stream, { headers });
}
