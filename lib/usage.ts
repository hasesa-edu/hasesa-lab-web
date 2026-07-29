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
  const col = FIELD_MAP[field];

  // Ensure the month's row exists so the conditional UPDATE below can target it.
  await db
    .insert(schema.usage)
    .values({ userId, yearMonth: ym, chatTurns: 0, quizBatches: 0, aiGrades: 0, asrMinutes: 0 })
    .onConflictDoNothing();

  // Atomically increment only if it stays within the cap. Doing the check and
  // the write in a single statement avoids a TOCTOU race where concurrent
  // requests all read an under-cap value and then all increment past it.
  const updated = await db
    .update(schema.usage)
    .set({ [field]: sql`${col} + ${amount}` })
    .where(
      and(
        eq(schema.usage.userId, userId),
        eq(schema.usage.yearMonth, ym),
        sql`${col} + ${amount} <= ${cap}`
      )
    )
    .returning({ value: col });

  if (!updated.length) {
    const cur = await getCurrentUsage(userId);
    return { ok: false, current: (cur as any)[field], cap };
  }
  return { ok: true, current: (updated[0] as any).value, cap };
}
