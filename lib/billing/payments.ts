import { db, schema } from "@/lib/db/client";
import { and, desc, eq, sql } from "drizzle-orm";
import { PLAN } from "./plan";
import { verifyTransaction } from "./chapa";

export function newTxRef(): string {
  return `hl-${crypto.randomUUID()}`;
}

/**
 * Marks a pending payment paid and adds its days to the student's pass, in a
 * single statement. The `status = 'pending'` guard makes it idempotent, so
 * the return page, the callback and the webhook can all call it safely.
 * Returns the new paid-until date, or null if nothing was applied.
 */
async function claimAndExtend(txRef: string, chapaRef: string | null): Promise<Date | null> {
  const res = await db.execute(sql`
    WITH claimed AS (
      UPDATE payments
      SET status = 'success', verified_at = now(), chapa_ref = ${chapaRef}
      WHERE tx_ref = ${txRef} AND status = 'pending'
      RETURNING user_id, days
    )
    UPDATE users u
    SET paid_until = GREATEST(COALESCE(u.paid_until, now()), now()) + make_interval(days => c.days)
    FROM claimed c
    WHERE u.id = c.user_id
    RETURNING u.paid_until
  `);
  const row = (res as any).rows?.[0];
  return row?.paid_until ? new Date(row.paid_until) : null;
}

export type ApplyResult =
  | { state: "paid"; paidUntil: Date | null } // paidUntil null = was already applied earlier
  | { state: "pending" }
  | { state: "failed" }
  | { state: "unknown" };

/** Verifies a Chapa transaction and, if it's a successful 300 ETB payment, extends the pass. */
export async function verifyAndApply(txRef: string): Promise<ApplyResult> {
  const rows = await db.select().from(schema.payments).where(eq(schema.payments.txRef, txRef)).limit(1);
  const payment = rows[0];
  if (!payment || payment.source !== "chapa") return { state: "unknown" };
  if (payment.status === "success") return { state: "paid", paidUntil: null };

  const tx = await verifyTransaction(txRef);
  if (!tx || tx.status === "pending") return { state: "pending" };
  if (tx.status === "failed") {
    await db
      .update(schema.payments)
      .set({ status: "failed", verifiedAt: new Date() })
      .where(and(eq(schema.payments.txRef, txRef), eq(schema.payments.status, "pending")));
    return { state: "failed" };
  }
  if (tx.currency !== payment.currency || !(tx.amount >= payment.amountEtb)) {
    console.error(`chapa amount mismatch for ${txRef}: got ${tx.amount} ${tx.currency}`);
    return { state: "failed" };
  }
  const paidUntil = await claimAndExtend(txRef, tx.reference);
  return { state: "paid", paidUntil };
}

export async function createPendingPayment(userId: string): Promise<string> {
  const txRef = newTxRef();
  await db.insert(schema.payments).values({
    txRef,
    userId,
    amountEtb: PLAN.priceEtb,
    currency: "ETB",
    days: PLAN.days,
    status: "pending",
    source: "chapa",
  });
  return txRef;
}

/** Admin comp/fix: adds days to a student's pass without a Chapa payment. */
export async function grantDays(userId: string, days: number, note: string): Promise<Date | null> {
  const txRef = `admin-${crypto.randomUUID()}`;
  await db.insert(schema.payments).values({
    txRef,
    userId,
    amountEtb: 0,
    currency: "ETB",
    days,
    status: "pending",
    source: "admin",
    note: note.slice(0, 200) || null,
  });
  return claimAndExtend(txRef, null);
}

export async function listPayments(userId: string, limit = 20) {
  return db
    .select()
    .from(schema.payments)
    .where(eq(schema.payments.userId, userId))
    .orderBy(desc(schema.payments.createdAt))
    .limit(limit);
}
