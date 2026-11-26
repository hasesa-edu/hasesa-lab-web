import type { Metadata } from "next";
import Link from "next/link";
import { requireSession } from "@/lib/auth/session";
import { db, schema } from "@/lib/db/client";
import { eq } from "drizzle-orm";
import { verifyAndApply } from "@/lib/billing/payments";
import { entitlementFrom, getEntitlement, type Entitlement } from "@/lib/billing/entitlement";
import { billingViaApi } from "@/lib/auth/hasesa-api";
import { apiFetch } from "@/lib/api-server";
import { BRAND } from "@/lib/brand";
import { formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CircleAlertIcon, HourglassIcon, MessageCircleIcon, PartyPopperIcon, RefreshCwIcon } from "lucide-react";

export const metadata: Metadata = { title: `Payment · ${BRAND}`, robots: { index: false } };
export const dynamic = "force-dynamic";

// Chapa sends the student back here after checkout. We verify with Chapa
// before showing anything as paid.
export default async function BillingReturn({ searchParams }: { searchParams: Promise<{ tx_ref?: string }> }) {
  const { tx_ref: txRef } = await searchParams;
  const sess = await requireSession();

  type State = "paid" | "pending" | "failed" | "review" | "unknown";
  let state: State = "unknown";
  let ent: Entitlement | null = null;
  let checked = false;
  if (txRef && sess && billingViaApi()) {
    // Verifying is idempotent, so if the API fails the website's own check below is safe to run.
    try {
      const r = await apiFetch<{ state: State; paidUntil: string | null }>(`/v1/billing/payments/${encodeURIComponent(txRef)}`);
      state = r.state;
      ent = entitlementFrom(r.paidUntil ? new Date(r.paidUntil) : null);
      checked = true;
    } catch (e) {
      console.error("payment check through hasesa-api failed, checking here instead:", e);
    }
  }
  if (!checked) {
    if (txRef && sess) {
      const owner = await db
        .select({ userId: schema.payments.userId })
        .from(schema.payments)
        .where(eq(schema.payments.txRef, txRef))
        .limit(1);
      if (owner[0]?.userId === sess.userId) state = (await verifyAndApply(txRef)).state;
    }
    ent = sess ? await getEntitlement(sess.userId) : null;
  }

  return (
    <div className="flex min-h-[calc(100svh-61px)] items-center bg-background px-4 py-14 sm:py-20">
      <div className="mx-auto w-full max-w-lg text-center">
        {state === "paid" ? (
          <div className="rounded-lg border border-border bg-card px-6 py-10 sm:px-10 sm:py-12">
            <span className="mx-auto inline-flex size-14 items-center justify-center rounded-lg bg-accent text-primary [&_svg]:size-7">
              <PartyPopperIcon aria-hidden />
            </span>
            <h1 className="mt-5 text-4xl leading-tight font-semibold sm:text-5xl">You're in!</h1>
            <p className="mx-auto mt-3 max-w-sm text-muted-foreground">
              Your {BRAND} Academy enrolment is active{ent?.paidUntil ? " until " : ""}
              {ent?.paidUntil && <strong className="font-semibold text-foreground">{formatDate(ent.paidUntil)}</strong>}. Every module,
              concept unit and the lab assistant are unlocked.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="ink">
                <Link href="/modules">
                  Browse modules
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
              >
                <Link href="/dashboard">
                  <MessageCircleIcon />
                  Go to my dashboard
                </Link>
              </Button>
            </div>
          </div>
        ) : state === "pending" ? (
          <div className="rounded-lg border border-border bg-card px-6 py-10 sm:px-10">
            <span className="mx-auto inline-flex size-14 items-center justify-center rounded-lg bg-muted text-muted-foreground [&_svg]:size-7">
              <HourglassIcon aria-hidden className="animate-pulse" />
            </span>
            <h1 className="mt-4 text-3xl leading-tight font-semibold text-foreground">Confirming your payment…</h1>
            <p className="mt-2 text-muted-foreground">
              Chapa hasn't confirmed it yet. This usually takes a few seconds. Refresh this page, or check your account in a minute.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="font-semibold">
                <Link href={`/billing/return?tx_ref=${encodeURIComponent(txRef ?? "")}`}>
                  <RefreshCwIcon />
                  Check again
                </Link>
              </Button>
              <Button asChild size="lg" variant="soft">
                <Link href="/account">My account</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card px-6 py-10 sm:px-10">
            <span className="mx-auto inline-flex size-14 items-center justify-center rounded-lg bg-destructive/10 text-destructive [&_svg]:size-7">
              <CircleAlertIcon aria-hidden />
            </span>
            <h1 className="mt-4 text-3xl leading-tight font-semibold text-foreground">Payment not completed</h1>
            <p className="mt-2 text-muted-foreground">
              {state === "failed"
                ? "The payment didn't go through, and you haven't been charged for a pass."
                : state === "review"
                  ? "Chapa received a payment, but not the amount we expected, so we couldn't activate your pass automatically. Please contact us and we'll sort it out."
                  : "We couldn't find this payment. If money left your account, contact us with the time you paid."}
            </p>
            <Button asChild size="lg" className="mt-6 font-semibold">
              <Link href="/account">
                Try again
                <ArrowRightIcon />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
