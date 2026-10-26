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
import { ArrowRightIcon, CircleAlertIcon, HourglassIcon, MessageCircleIcon, PartyPopperIcon, RefreshCwIcon, SparklesIcon } from "lucide-react";

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
    <div className="relative isolate flex min-h-[calc(100svh-61px)] items-center overflow-hidden bg-primary-soft/40 px-4 py-14 sm:py-20">
      <div aria-hidden className="absolute inset-0 -z-10 bg-dots text-primary opacity-40" />
      <div className="mx-auto w-full max-w-lg text-center">
        {state === "paid" ? (
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-deep px-6 py-10 text-deep-foreground shadow-pop sm:px-10 sm:py-12">
            <div aria-hidden className="absolute inset-0 -z-10 bg-grid text-primary-soft opacity-40" />
            <div aria-hidden className="absolute -top-24 -left-20 -z-10 size-72 rounded-full bg-primary/50 blur-3xl" />
            <div aria-hidden className="absolute -right-16 -bottom-24 -z-10 size-72 rounded-full bg-sun/25 blur-3xl" />
            <SparklesIcon aria-hidden className="absolute top-8 left-8 size-6 text-sun animate-float" />
            <SparklesIcon aria-hidden className="absolute top-14 right-10 size-4 text-sun/80 animate-float [animation-delay:0.8s]" />
            <SparklesIcon aria-hidden className="absolute bottom-10 left-12 size-4 text-sun/70 animate-float [animation-delay:1.6s]" />

            <span className="mx-auto inline-flex size-20 items-center justify-center rounded-3xl bg-sun text-deep shadow-pop [&_svg]:size-10">
              <PartyPopperIcon aria-hidden />
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">You're in!</h1>
            <p className="mx-auto mt-3 max-w-sm text-deep-foreground/80">
              Your {BRAND} pass is active{ent?.paidUntil ? " until " : ""}
              {ent?.paidUntil && <strong className="font-semibold text-sun">{formatDate(ent.paidUntil)}</strong>}. Every guide
              and the lab assistant are unlocked.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-sun font-semibold text-deep shadow-pop hover:bg-sun/90">
                <Link href="/experiments">
                  Browse experiments
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="bg-white/10 text-deep-foreground ring-1 ring-white/15 hover:bg-white/20 hover:text-deep-foreground"
              >
                <Link href="/chat">
                  <MessageCircleIcon />
                  Ask the assistant
                </Link>
              </Button>
            </div>
          </div>
        ) : state === "pending" ? (
          <div className="relative overflow-hidden rounded-[2rem] bg-card px-6 py-10 shadow-pop ring-1 ring-border sm:px-10">
            <div aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-sun" />
            <span className="mx-auto inline-flex size-16 items-center justify-center rounded-2xl bg-sun-soft text-sun [&_svg]:size-8">
              <HourglassIcon aria-hidden className="animate-pulse" />
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground">Confirming your payment…</h1>
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
          <div className="relative overflow-hidden rounded-[2rem] bg-card px-6 py-10 shadow-pop ring-1 ring-border sm:px-10">
            <div aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-destructive/70" />
            <span className="mx-auto inline-flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive [&_svg]:size-8">
              <CircleAlertIcon aria-hidden />
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground">Payment not completed</h1>
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
