import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireSession } from "@/lib/auth/session";
import { getUserDTO } from "@/lib/auth/users";
import { getEntitlement } from "@/lib/billing/entitlement";
import { listPayments } from "@/lib/billing/payments";
import { PLAN } from "@/lib/billing/plan";
import { BRAND } from "@/lib/brand";
import { formatDate } from "@/lib/format";
import { CheckoutButton } from "@/components/CheckoutButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { ArrowRight, BadgeCheck, Receipt, SlidersHorizontal, Sparkles, UserRound } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const metadata: Metadata = { title: `Account & billing · ${BRAND}`, robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AccountPage({ searchParams }: { searchParams: Promise<{ buy?: string }> }) {
  const sess = await requireSession();
  if (!sess) redirect("/login?next=/account");
  const user = await getUserDTO(sess.userId);
  if (!user) redirect("/login?next=/account");
  const [ent, payments, sp] = await Promise.all([getEntitlement(sess.userId), listPayments(sess.userId), searchParams]);

  const pct = ent.active ? Math.min(100, Math.max(4, Math.round((ent.daysLeft / PLAN.days) * 100))) : 0;
  const refundNote = (
    <>
      Paid securely through Chapa (Telebirr, CBE Birr, M-Pesa or card). No automatic charges.{" "}
      <Link href="/refund" className="underline hover:text-sun">
        Refund policy
      </Link>
    </>
  );

  return (
    <div>
      <PageHeader
        eyebrow={BRAND}
        title="Account & billing"
        description={
          <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 break-all">
            <UserRound className="size-4 shrink-0 text-sun" />
            <span className="font-semibold text-deep-foreground">{user.displayName}</span>
            <span>· {user.email} (Google)</span>
          </span>
        }
      />

      <div className="mx-auto max-w-3xl px-4 pt-8 pb-16">
        {ent.active && ent.paidUntil ? (
          <section className="relative isolate overflow-hidden rounded-[2rem] bg-deep p-6 text-deep-foreground shadow-pop sm:p-8">
            <div aria-hidden className="absolute inset-0 -z-10 bg-grid text-primary-soft opacity-40" />
            <div aria-hidden className="absolute -top-24 -right-20 -z-10 size-72 rounded-full bg-primary/50 blur-3xl" />
            <div aria-hidden className="absolute -bottom-24 -left-16 -z-10 size-64 rounded-full bg-sun/20 blur-3xl" />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-bold tracking-[0.18em] text-sun uppercase">{BRAND} pass</p>
              <Badge className="bg-biology-soft text-biology">
                <BadgeCheck /> Active
              </Badge>
            </div>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Active until {formatDate(ent.paidUntil)}</h2>

            <p className="mt-6 flex items-baseline gap-2">
              <span className="font-heading text-7xl leading-none font-extrabold tracking-tight text-sun tabular-nums">
                {ent.daysLeft}
              </span>
              <span className="text-lg font-semibold">{ent.daysLeft === 1 ? "day" : "days"} left</span>
            </p>
            <div
              role="progressbar"
              aria-label="Days left on your pass"
              aria-valuemin={0}
              aria-valuemax={PLAN.days}
              aria-valuenow={Math.min(ent.daysLeft, PLAN.days)}
              className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/15"
            >
              <div className="h-full rounded-full bg-sun" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-2 flex justify-between text-xs text-deep-foreground/60">
              <span>0</span>
              <span>{PLAN.days} days</span>
            </p>

            <p className="mt-6 text-sm text-deep-foreground/80">
              Renewing adds {PLAN.days} days on top of what you have.
            </p>
            <div className="mt-4">
              <CheckoutButton
                signedIn
                auto={sp.buy === "1"}
                label={`Add ${PLAN.days} days · ${PLAN.priceEtb} ETB`}
                className="w-full bg-sun text-deep shadow-pop hover:bg-sun/90 sm:w-auto"
              />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-deep-foreground/60">{refundNote}</p>
          </section>
        ) : (
          <section className="relative isolate overflow-hidden rounded-[2rem] bg-sun-soft p-6 ring-1 ring-sun/30 sm:p-8">
            <div aria-hidden className="absolute inset-0 -z-10 bg-grid text-chemistry opacity-25" />
            <div aria-hidden className="absolute -top-20 -right-16 -z-10 size-64 rounded-full bg-primary/20 blur-3xl" />

            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-card">
                <Sparkles className="size-6" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold tracking-[0.18em] text-chemistry uppercase">{BRAND} pass</p>
                <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">No active pass</h2>
              </div>
            </div>
            <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
              {ent.paidUntil ? `Your last pass ended on ${formatDate(ent.paidUntil)}. ` : ""}
              Unlock every guide and the lab assistant for {PLAN.priceEtb} ETB for {PLAN.days} days.
            </p>
            <p className="mt-5 flex items-baseline gap-2">
              <span className="font-heading text-6xl leading-none font-extrabold tracking-tight text-primary-strong tabular-nums">
                {PLAN.priceEtb}
              </span>
              <span className="text-lg font-semibold">ETB</span>
              <span className="text-muted-foreground">/ {PLAN.days} days</span>
            </p>
            <div className="mt-6">
              <CheckoutButton
                signedIn
                auto={sp.buy === "1"}
                label={`Get ${BRAND} · ${PLAN.priceEtb} ETB`}
                className="w-full shadow-pop sm:w-auto"
              />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Paid securely through Chapa (Telebirr, CBE Birr, M-Pesa or card). No automatic charges.{" "}
              <Link href="/refund" className="underline hover:text-primary">
                Refund policy
              </Link>
            </p>
          </section>
        )}

        <section className="mt-10">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary-soft text-primary-strong">
              <Receipt className="size-4" />
            </span>
            <h2 className="text-xl font-extrabold tracking-tight">Payment history</h2>
          </div>
          {payments.length === 0 ? (
            <p className="mt-3 rounded-2xl border-2 border-dashed border-primary/25 p-5 text-sm text-muted-foreground">
              No payments yet.
            </p>
          ) : (
            <div className="mt-4 overflow-hidden rounded-2xl bg-card shadow-card ring-1 ring-border">
              <Table>
                <TableHeader className="bg-primary-soft/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="px-4 text-xs font-bold tracking-wide text-primary-strong uppercase">Date</TableHead>
                    <TableHead className="px-4 text-xs font-bold tracking-wide text-primary-strong uppercase">Amount</TableHead>
                    <TableHead className="px-4 text-xs font-bold tracking-wide text-primary-strong uppercase">Days</TableHead>
                    <TableHead className="px-4 text-xs font-bold tracking-wide text-primary-strong uppercase">Status</TableHead>
                    <TableHead className="px-4 text-xs font-bold tracking-wide text-primary-strong uppercase">Reference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((p) => (
                    <TableRow key={p.txRef}>
                      <TableCell className="px-4 py-3 text-foreground">{formatDate(p.createdAt)}</TableCell>
                      <TableCell className="px-4 py-3 font-semibold text-foreground tabular-nums">
                        {p.source === "admin" ? "Gift" : `${p.amountEtb} ${p.currency}`}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-foreground tabular-nums">{p.days}</TableCell>
                      <TableCell className="px-4 py-3">
                        <StatusPill status={p.status} txRef={p.txRef} source={p.source} />
                      </TableCell>
                      <TableCell className="px-4 py-3 font-mono text-xs text-subtle-foreground">{p.chapaRef ?? "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>

        <section className="mt-10">
          <Button asChild variant="soft" size="lg" className="font-semibold">
            <Link href="/onboarding">
              <SlidersHorizontal /> Change grade & subjects <ArrowRight />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
}

function StatusPill({ status, txRef, source }: { status: string; txRef: string; source: string }) {
  if (status === "success") return <Badge variant="success">Paid</Badge>;
  if (status === "failed") return <Badge variant="destructive">Failed</Badge>;
  if (status === "review") return <Badge variant="warning">Needs review · contact us</Badge>;
  return source === "chapa" ? (
    <Badge asChild variant="warning" className="underline">
      <Link href={`/billing/return?tx_ref=${encodeURIComponent(txRef)}`}>Pending · check</Link>
    </Badge>
  ) : (
    <Badge variant="secondary">Pending</Badge>
  );
}
