import type { Metadata } from "next";
import Link from "next/link";
import { requireSession } from "@/lib/auth/session";
import { db, schema } from "@/lib/db/client";
import { eq } from "drizzle-orm";
import { verifyAndApply } from "@/lib/billing/payments";
import { getEntitlement } from "@/lib/billing/entitlement";
import { BRAND } from "@/lib/brand";
import { formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: `Payment · ${BRAND}`, robots: { index: false } };
export const dynamic = "force-dynamic";

// Chapa sends the student back here after checkout. We verify with Chapa
// before showing anything as paid.
export default async function BillingReturn({ searchParams }: { searchParams: Promise<{ tx_ref?: string }> }) {
  const { tx_ref: txRef } = await searchParams;
  const sess = await requireSession();

  let state: "paid" | "pending" | "failed" | "review" | "unknown" = "unknown";
  if (txRef && sess) {
    const owner = await db
      .select({ userId: schema.payments.userId })
      .from(schema.payments)
      .where(eq(schema.payments.txRef, txRef))
      .limit(1);
    if (owner[0]?.userId === sess.userId) state = (await verifyAndApply(txRef)).state;
  }
  const ent = sess ? await getEntitlement(sess.userId) : null;

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      {state === "paid" ? (
        <>
          <div className="text-5xl">🎉</div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground">You're in!</h1>
          <p className="mt-2 text-muted-foreground">
            Your {BRAND} pass is active{ent?.paidUntil ? ` until ${formatDate(ent.paidUntil)}` : ""}. Every guide and the lab
            assistant are unlocked.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/experiments">Browse experiments</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/chat">Ask the assistant</Link>
            </Button>
          </div>
        </>
      ) : state === "pending" ? (
        <>
          <div className="text-5xl">⏳</div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground">Confirming your payment…</h1>
          <p className="mt-2 text-muted-foreground">
            Chapa hasn't confirmed it yet. This usually takes a few seconds. Refresh this page, or check your account in a minute.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href={`/billing/return?tx_ref=${encodeURIComponent(txRef ?? "")}`}>Check again</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/account">My account</Link>
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="text-5xl">😕</div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground">Payment not completed</h1>
          <p className="mt-2 text-muted-foreground">
            {state === "failed"
              ? "The payment didn't go through, and you haven't been charged for a pass."
              : state === "review"
                ? "Chapa received a payment, but not the amount we expected, so we couldn't activate your pass automatically. Please contact us and we'll sort it out."
                : "We couldn't find this payment. If money left your account, contact us with the time you paid."}
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/account">Try again</Link>
          </Button>
        </>
      )}
    </div>
  );
}
