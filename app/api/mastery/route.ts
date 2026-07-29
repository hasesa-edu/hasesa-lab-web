import { NextRequest } from "next/server";
import { requireSession } from "@/lib/auth/session";
import { db, schema } from "@/lib/db/client";
import { eq, sql } from "drizzle-orm";
import { allTopicsForSubject, SUBJECTS, type Subject } from "@/lib/lessons";
import { readJsonLimited, BODY_LIMIT } from "@/lib/http";

export const runtime = "nodejs";

// GET /api/mastery → { mastery: { [subject]: { [topic]: 0..100 } } }
export async function GET() {
  const sess = await requireSession();
  if (!sess) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const rows = await db
    .select()
    .from(schema.mastery)
    .where(eq(schema.mastery.userId, sess.userId));

  const mastery: Record<string, Record<string, number>> = {};
  for (const s of SUBJECTS) {
    mastery[s.id] = {};
    for (const t of allTopicsForSubject(s.id)) mastery[s.id][t.topic] = 50;
  }
  for (const r of rows) {
    mastery[r.subject] = mastery[r.subject] || {};
    mastery[r.subject][r.topic] = r.value;
  }
  return Response.json({ mastery });
}

// POST /api/mastery
//   body: { subject, topic, delta?: number, value?: number }
//   Either delta (+/-) or absolute value. Clamped 0..100.
export async function POST(req: NextRequest) {
  const sess = await requireSession();
  if (!sess) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = await readJsonLimited(req, BODY_LIMIT.small);
  if (!parsed.ok) return Response.json({ error: parsed.error }, { status: parsed.status });
  const { subject, topic, delta, value } = parsed.data ?? {};
  if (!subject || !topic) return Response.json({ error: "Missing subject/topic" }, { status: 400 });
  if (!SUBJECTS.find((s) => s.id === subject)) return Response.json({ error: "Bad subject" }, { status: 400 });
  // Only accept real topics for the subject — prevents inserting junk rows.
  if (!allTopicsForSubject(subject as Subject).some((t) => t.topic === topic)) {
    return Response.json({ error: "Bad topic" }, { status: 400 });
  }

  // Fetch current
  const rows = await db
    .select()
    .from(schema.mastery)
    .where(
      sql`${schema.mastery.userId} = ${sess.userId} AND ${schema.mastery.subject} = ${subject} AND ${schema.mastery.topic} = ${topic}`
    )
    .limit(1);

  const current = rows[0]?.value ?? 50;
  let next: number;
  if (typeof value === "number") next = value;
  else if (typeof delta === "number") next = current + delta;
  else return Response.json({ error: "Provide delta or value" }, { status: 400 });
  next = Math.max(0, Math.min(100, Math.round(next)));

  await db
    .insert(schema.mastery)
    .values({ userId: sess.userId, subject, topic, value: next })
    .onConflictDoUpdate({
      target: [schema.mastery.userId, schema.mastery.subject, schema.mastery.topic],
      set: { value: next, updatedAt: new Date() },
    });

  return Response.json({ value: next });
}
