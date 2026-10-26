import { db, schema } from "@/lib/db/client";
import { and, eq, sql } from "drizzle-orm";
import { PLAN } from "@/lib/billing/plan";

// Daily caps, reset at midnight Addis Ababa time.
export const CAPS = {
  chatTurns: PLAN.dailyChatCap,
} as const;

export type UsageField = keyof typeof CAPS;
const FIELD_MAP: Record<UsageField, any> = {
  chatTurns: schema.usage.chatTurns,
};

/** Today's date in Addis Ababa (UTC+3, no DST), e.g. "2026-10-19". */
export function currentPeriod(d = new Date()): string {
  return new Date(d.getTime() + 3 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

export async function getCurrentUsage(userId: string) {
  const period = currentPeriod();
  const rows = await db
    .select()
    .from(schema.usage)
    .where(and(eq(schema.usage.userId, userId), eq(schema.usage.period, period)))
    .limit(1);
  return rows[0] ?? { userId, period, chatTurns: 0 };
}

export async function checkAndIncrement(
  userId: string,
  field: UsageField,
  amount = 1
): Promise<{ ok: true; current: number; cap: number } | { ok: false; current: number; cap: number }> {
  const period = currentPeriod();
  const cap = CAPS[field];
  const col = FIELD_MAP[field];

  // Ensure the month's row exists so the conditional UPDATE below can target it.
  await db
    .insert(schema.usage)
    .values({ userId, period, chatTurns: 0 })
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
        eq(schema.usage.period, period),
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

/** Gives back usage counted for a request that then failed (e.g. the AI provider errored). */
export async function refundUsage(userId: string, field: UsageField, amount = 1) {
  const col = FIELD_MAP[field];
  await db
    .update(schema.usage)
    .set({ [field]: sql`greatest(${col} - ${amount}, 0)` })
    .where(and(eq(schema.usage.userId, userId), eq(schema.usage.period, currentPeriod())));
}
