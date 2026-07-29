import { NextRequest } from "next/server";
import { randomInt } from "crypto";
import { requireSession } from "@/lib/auth/session";
import { db, schema } from "@/lib/db/client";
import { eq } from "drizzle-orm";
import { allTopicsForSubject, SUBJECTS, type Subject } from "@/lib/lessons";
import { readJsonLimited, BODY_LIMIT } from "@/lib/http";

export const runtime = "nodejs";

function generateClassCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  // Cryptographic RNG so codes can't be predicted/enumerated.
  for (let i = 0; i < 6; i++) out += alphabet[randomInt(alphabet.length)];
  return out;
}

// GET /api/classes → teacher: own classes with aggregates; student: joined classes (read-only)
export async function GET() {
  const sess = await requireSession();
  if (!sess) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const user = (await db.select().from(schema.users).where(eq(schema.users.id, sess.userId)).limit(1))[0];
  if (!user) return Response.json({ error: "Unknown user" }, { status: 404 });

  if (user.role === "teacher") {
    const rows = await db
      .select()
      .from(schema.classes)
      .where(eq(schema.classes.teacherId, user.id));
    const result = [];
    for (const cls of rows) {
      const members = await db
        .select({ userId: schema.classMembers.userId })
        .from(schema.classMembers)
        .where(eq(schema.classMembers.classCode, cls.code));
      const aggregate = await computeAggregate(members.map((m) => m.userId));
      result.push({ code: cls.code, name: cls.name, memberCount: members.length, aggregate });
    }
    return Response.json({ classes: result });
  }

  // student: list joined classes
  const joins = await db
    .select({ code: schema.classMembers.classCode })
    .from(schema.classMembers)
    .where(eq(schema.classMembers.userId, user.id));
  const codes = joins.map((j) => j.code);
  return Response.json({ classes: codes.map((code) => ({ code })) });
}

// POST /api/classes  body: { name }  — teacher creates a class
export async function POST(req: NextRequest) {
  const sess = await requireSession();
  if (!sess) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const user = (await db.select().from(schema.users).where(eq(schema.users.id, sess.userId)).limit(1))[0];
  if (!user || user.role !== "teacher") return Response.json({ error: "Teachers only" }, { status: 403 });

  const parsed = await readJsonLimited(req, BODY_LIMIT.small);
  if (!parsed.ok) return Response.json({ error: parsed.error }, { status: parsed.status });
  const name = (typeof parsed.data?.name === "string" ? parsed.data.name : "").trim().slice(0, 120);
  if (!name) return Response.json({ error: "Class name required" }, { status: 400 });

  // generate unique code (try a few times)
  let code = generateClassCode();
  for (let i = 0; i < 5; i++) {
    const existing = await db.select({ code: schema.classes.code }).from(schema.classes).where(eq(schema.classes.code, code)).limit(1);
    if (!existing.length) break;
    code = generateClassCode();
  }

  await db.insert(schema.classes).values({ code, name, teacherId: user.id });
  return Response.json({ code, name });
}

async function computeAggregate(userIds: string[]) {
  if (!userIds.length) return [];
  const rows = await db.select().from(schema.mastery);
  const byUser = new Map<string, Map<string, number>>();
  for (const r of rows) {
    if (!userIds.includes(r.userId)) continue;
    const key = `${r.subject}:${r.topic}`;
    const m = byUser.get(r.userId) ?? new Map();
    m.set(key, r.value);
    byUser.set(r.userId, m);
  }
  const out: { subject: string; topic: string; avg: number; weight: number; lessonId: string; n: number }[] = [];
  for (const s of SUBJECTS) {
    for (const t of allTopicsForSubject(s.id)) {
      const key = `${s.id}:${t.topic}`;
      const values: number[] = [];
      for (const uid of userIds) {
        const v = byUser.get(uid)?.get(key);
        values.push(typeof v === "number" ? v : 50);
      }
      const avg = values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0;
      out.push({ subject: s.id, topic: t.topic, avg, weight: t.weight, lessonId: t.lessonId, n: values.length });
    }
  }
  return out;
}
