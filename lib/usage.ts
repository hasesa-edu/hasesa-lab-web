import { db, schema } from "@/lib/db/client";
import { and, eq, sql } from "drizzle-orm";

export const CAPS = {
  chatTurns: 50,
  quizBatches: 20,
  aiGrades: 30,
  asrMinutes: 15,
} as const;

export type UsageField = keyof typeof CAPS;
const FIELD_MAP: Record<UsageField, any> = {
  chatTurns: schema.usage.chatTurns,
  quizBatches: schema.usage.quizBatches,
  aiGrades: schema.usage.aiGrades,
  asrMinutes: schema.usage.asrMinutes,
};

export function currentYearMonth(d = new Date()): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export async function getCurrentUsage(userId: string) {
  const ym = currentYearMonth();
  const rows = await db
    .select()
    .from(schema.usage)
    .where(and(eq(schema.usage.userId, userId), eq(schema.usage.yearMonth, ym)))
    .limit(1);
  return rows[0] ?? { userId, yearMonth: ym, chatTurns: 0, quizBatches: 0, aiGrades: 0, asrMinutes: 0 };
}

export async function checkAndIncrement(
  userId: string,
  field: UsageField,
  amount = 1
): Promise<{ ok: true; current: number; cap: number } | { ok: false; current: number; cap: number }> {
  const ym = currentYearMonth();
  const cap = CAPS[field];
  const cur = await getCurrentUsage(userId);
  if ((cur as any)[field] + amount > cap) {
    return { ok: false, current: (cur as any)[field], cap };
  }
  await db
    .insert(schema.usage)
    .values({
      userId,
      yearMonth: ym,
      chatTurns: field === "chatTurns" ? amount : 0,
      quizBatches: field === "quizBatches" ? amount : 0,
      aiGrades: field === "aiGrades" ? amount : 0,
      asrMinutes: field === "asrMinutes" ? amount : 0,
    })
    .onConflictDoUpdate({
      target: [schema.usage.userId, schema.usage.yearMonth],
      set: { [field]: sql`${FIELD_MAP[field]} + ${amount}` },
    });
  return { ok: true, current: (cur as any)[field] + amount, cap };
}
