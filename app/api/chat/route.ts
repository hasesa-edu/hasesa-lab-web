import { NextRequest } from "next/server";
import { groundingFor, isValidContext, studentContextFor } from "@/lib/chat-context";
import { getAccess, hasFullAccess } from "@/lib/access";
import type { Locale } from "@/lib/i18n";
import { db, schema } from "@/lib/db/client";
import { and, eq } from "drizzle-orm";
import { checkAndIncrement, refundUsage } from "@/lib/usage";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { readJsonLimited, BODY_LIMIT } from "@/lib/http";

const MAX_MESSAGE_CHARS = 8000;

// Any OpenAI-compatible chat completions API works. Defaults to Groq; set
// AI_BASE_URL / AI_API_KEY / AI_MODEL to switch provider or model. GROQ_* are
// still read for older .env files.
const AI_BASE_URL = (process.env.AI_BASE_URL || "https://api.groq.com/openai/v1").replace(/\/+$/, "");
const AI_MODEL = process.env.AI_MODEL || process.env.GROQ_MODEL || "openai/gpt-oss-120b";
// Only sent when set, since non-reasoning models reject it.
const AI_REASONING_EFFORT = process.env.AI_REASONING_EFFORT;

export const runtime = "nodejs";

type Msg = { role: "user" | "assistant"; content: string };

const LANG_NAME: Record<Locale, string> = {
  en: "English",
};

function uid(): string {
  return crypto.randomUUID();
}

function jsonError(status: number, error: string, code?: string, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify({ error, code }), {
    status,
    headers: { "content-type": "application/json", ...extra },
  });
}

function buildSystemPrompt(locale: Locale, context?: string, student?: string | null): string {
  const langName = LANG_NAME[locale] ?? "English";
  const grounding = groundingFor(context);

  const base = `You are the Hasesa lab assistant for high-school students at Hasesa Academy in Ethiopia. Students learn through project modules: they start by doing (building a radio, controlling a robot claw with their muscles, solving a food-adulteration mystery) and learn the science and maths when the project needs it. Builds happen at the Academy with a guide; at home students read concept units and solve problems. Your job: explain concepts, help them reason through problems, help them work out why a build or test didn't go as expected, and help them make sense of what they observed.

YOUR SCOPE — science, maths and technology at high-school level, with a focus on the student's module, its experiments and the concepts behind them.

If a question is outside this scope (entertainment, politics, personal life, harmful content, other school subjects), politely decline in one sentence and steer back to the module or the science.

HOW TO HELP:
- Be encouraging, clear and concise. Short paragraphs.
- Explain *why*, not just *what*. Connect what the student sees to the underlying concept.
- When a student says something went wrong, ask what they did or saw if it's unclear, then suggest the most likely cause and one concrete thing to try next.
- Ask guiding questions so the student does the thinking — don't just hand over the answer. For practice problems, give hints and check their reasoning; don't just state the final number.
- Use simple language; define jargon the first time.
- Use plain-text formulas (e.g. "v = u + at"). Avoid LaTeX — many students use low-end Android phones.

SAFETY FIRST:
- Never suggest dangerous substitutions, stronger chemicals, higher voltages, open flames or bigger quantities than the guide uses.
- For anything involving heat, sharp tools, electricity, raw meat or chemicals such as iodine, remind the student to do it at the Academy with the guide, or with an adult present.
- Never help connect anything to mains electricity. Electrodes on the body are battery-only.
- If a student describes an injury, a burn, a chemical in the eyes or something swallowed, tell them to stop, rinse with plenty of clean water if relevant, and get an adult or medical help immediately.
- Never produce harmful, age-inappropriate or politically charged content.

LANGUAGE: Respond in ${langName}. Do not switch unless the student asks.`;

  if (!grounding) return base;

  const aboutStudent = student
    ? `\n\n---\nWHAT THIS STUDENT HAS DONE HERE (use it to meet them where they are; refer to it naturally, e.g. "in your notes you wrote…"):\n${student}\n\nPROBLEMS: when a student is stuck on a practice problem, give one hint at a time and check their working. Never state the final answer to a practice problem, even if asked directly.`
    : "";

  return (
    base +
    `\n\n---\nGROUNDING CONTEXT — the student is on the page for ${grounding.title} and is asking from there. Ground your answers in the material below. When you rely on a specific part of it, cite it at the end, e.g. "(Source: ${grounding.title})". If it doesn't cover the question, say so and answer from general science knowledge.\n\n${grounding.text}` +
    aboutStudent
  );
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.AI_API_KEY || process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "AI_API_KEY not configured" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  // The assistant is for enrolled students and the guide.
  const access = await getAccess();
  if (!access.userId) return jsonError(401, "Please sign in to use the lab assistant.", "signin");
  if (!hasFullAccess(access)) return jsonError(403, "The lab assistant is for students enrolled at the Academy.", "enrol");
  const userId = access.userId;

  // Throttle every caller so the endpoint can't be looped to
  // burn AI provider quota. 20 requests per IP per 5 minutes.
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
  const body = parsed.data as {
    messages: Msg[];
    locale?: Locale;
    /** "m:<module>/<step>" or "c:<concept>"; see lib/chat-context. */
    context?: string;
    conversationId?: string;
  };

  const { messages, locale = "en" } = body;
  const context = isValidContext(body.context) ? body.context : undefined;
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

  // A supplied conversationId must belong to this user (prevents writing
  // into another user's conversation).
  if (conversationId) {
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
  }

  // Count the message only once the request is known to be valid.
  const cap = await checkAndIncrement(userId, "chatTurns", 1);
  if (!cap.ok) {
    return jsonError(
      429,
      `You've used all ${cap.cap} messages for today. They reset at midnight (Addis Ababa time).`,
      "daily_cap"
    );
  }

  if (!conversationId) {
    conversationId = uid();
    await db.insert(schema.conversations).values({ id: conversationId, userId, lessonId: context ?? null });
  } else {
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

  const student = context ? await studentContextFor(userId, context).catch(() => null) : null;
  const systemPrompt = buildSystemPrompt(locale as Locale, context, student);

  let aiRes: Response | null = null;
  try {
    aiRes = await fetch(`${AI_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: AI_MODEL,
        stream: true,
        temperature: 0.4,
        max_tokens: 800,
        ...(AI_REASONING_EFFORT ? { reasoning_effort: AI_REASONING_EFFORT } : {}),
        messages: [{ role: "system", content: systemPrompt }, ...safeMessages],
      }),
    });
  } catch (e) {
    console.error("AI provider request failed:", e);
  }

  if (!aiRes || !aiRes.ok || !aiRes.body) {
    // Log upstream detail server-side; don't relay it to the client.
    if (aiRes) {
      const text = await aiRes.text().catch(() => "");
      console.error(`AI provider error ${aiRes.status}: ${text.slice(0, 300)}`);
    }
    // The student got no answer, so don't count it against today's messages.
    await refundUsage(userId, "chatTurns", 1).catch(() => {});
    return new Response(
      JSON.stringify({ error: "The lab assistant is temporarily unavailable. Please try again." }),
      { status: 502, headers: { "content-type": "application/json" } }
    );
  }

  let acc = "";
  const stream = new ReadableStream({
    async start(controller) {
      const reader = aiRes.body!.getReader();
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
  headers["x-chat-remaining"] = String(Math.max(0, cap.cap - cap.current));
  return new Response(stream, { headers });
}
