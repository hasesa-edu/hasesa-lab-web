import { NextRequest } from "next/server";
import { getExperiment, subjectMeta, type Experiment } from "@/lib/experiments";
import type { Locale } from "@/lib/i18n";
import { getSession } from "@/lib/auth/session";
import { db, schema } from "@/lib/db/client";
import { and, eq } from "drizzle-orm";
import { checkAndIncrement } from "@/lib/usage";
import { getEntitlement } from "@/lib/billing/entitlement";
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

function experimentContext(exp: Experiment): string {
  const concept = exp.concept.map((c) => `## ${c.heading}\n${c.body}`).join("\n\n");
  const materials = exp.materials.map((m) => `- ${m.item}${m.localNote ? ` (${m.localNote})` : ""}`).join("\n");
  const safety = exp.safety.map((s) => `- ${s}`).join("\n");
  const steps = exp.steps.map((s, i) => `Step ${i + 1}: ${s.text}${s.tip ? ` (Tip: ${s.tip})` : ""}`).join("\n");
  const troubleshooting = exp.troubleshooting.map((t) => `- Problem: ${t.problem}\n  Fix: ${t.fix}`).join("\n");
  return `# ${exp.title}
Grade ${exp.grade} ${subjectMeta(exp.subject).label} · ${exp.unit}
${exp.summary}

## Background concepts
${concept}

## Materials
${materials}

## Safety
${safety}

## Procedure
${steps}

## What the student should observe
${exp.observe}

## Why it happens
${exp.explanation}

## Troubleshooting
${troubleshooting}`;
}

function buildSystemPrompt(locale: Locale, experimentId?: string): string {
  const langName = LANG_NAME[locale] ?? "English";
  const exp = experimentId ? getExperiment(experimentId) : undefined;

  const base = `You are the Hasesa assistant for Ethiopian high school students (grades 9–12). Students do hands-on science experiments on their own, using cheap, locally available materials, by following step-by-step guides and pre-recorded videos. Your job is to help them while they do that: explain the science behind an experiment, help them work out why it didn't go as expected, and help them make sense of what they observed.

YOUR SCOPE — strictly Biology, Chemistry and Physics at the grade 9–12 level, with a focus on experiments and the concepts behind them.

If a question is outside this scope (entertainment, politics, personal life, harmful content, other school subjects), politely decline in one sentence and steer back to the experiment or the science.

HOW TO HELP:
- Be encouraging, clear and concise. Short paragraphs.
- Explain *why*, not just *what*. Connect what the student sees to the underlying concept.
- When a student says something went wrong, ask what they did or saw if it's unclear, then suggest the most likely cause and one concrete thing to try next.
- Ask guiding questions so the student does the thinking — don't just hand over the answer.
- Use simple language; define jargon the first time.
- Use plain-text formulas (e.g. "v = u + at"). Avoid LaTeX — many students use low-end Android phones.

SAFETY FIRST:
- Never suggest dangerous substitutions, stronger chemicals, higher voltages, open flames or bigger quantities than the guide uses.
- For anything involving heat, sharp tools, mains electricity or chemicals such as alcohol, hydrogen peroxide, ash water or iodine, remind the student to have an adult present.
- If a student describes an injury, a burn, a chemical in the eyes or something swallowed, tell them to stop, rinse with plenty of clean water if relevant, and get an adult or medical help immediately.
- Never produce harmful, age-inappropriate or politically charged content.

LANGUAGE: Respond in ${langName}. Do not switch unless the student asks.`;

  if (!exp) return base;

  return (
    base +
    `\n\n---\nGROUNDING CONTEXT — the student is working on the experiment below. Ground your answers in this guide. When you rely on a specific step, safety note or troubleshooting tip, cite it at the end, e.g. "(Source: ${exp.title}, step 3)" or "(Source: ${exp.title}, troubleshooting)". If the guide doesn't cover the question, say so and answer from general science knowledge.\n\n${experimentContext(exp)}`
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

  // The assistant is for students with an active pass only.
  const session = await getSession();
  const userId = session.userId;
  if (!userId) return jsonError(401, "Please sign in to use the lab assistant.", "signin");
  const ent = await getEntitlement(userId);
  if (!ent.active) return jsonError(402, "The lab assistant is part of the Hasesa pass.", "plan_required");

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
    experimentId?: string;
    /** Legacy alias for experimentId. */
    lessonId?: string;
    conversationId?: string;
  };

  const { messages, locale = "en" } = body;
  const requestedId = body.experimentId ?? body.lessonId;
  const experimentId = typeof requestedId === "string" && getExperiment(requestedId) ? requestedId : undefined;
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

  const cap = await checkAndIncrement(userId, "chatTurns", 1);
  if (!cap.ok) {
    return jsonError(
      429,
      `You've used all ${cap.cap} messages for today. They reset at midnight (Addis Ababa time).`,
      "daily_cap"
    );
  }

  // Ensure conversation exists and belongs to this user (prevents writing
  // into another user's conversation via a supplied conversationId).
  if (!conversationId) {
    conversationId = uid();
    await db.insert(schema.conversations).values({ id: conversationId, userId, lessonId: experimentId ?? null });
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

  const systemPrompt = buildSystemPrompt(locale as Locale, experimentId);

  const aiRes = await fetch(`${AI_BASE_URL}/chat/completions`, {
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

  if (!aiRes.ok || !aiRes.body) {
    // Log upstream detail server-side; don't relay it to the client.
    const text = await aiRes.text().catch(() => "");
    console.error(`AI provider error ${aiRes.status}: ${text.slice(0, 300)}`);
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
