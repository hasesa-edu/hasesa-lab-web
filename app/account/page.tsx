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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const metadata: Metadata = { title: `Account & billing · ${BRAND}`, robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AccountPage({ searchParams }: { searchParams: Promise<{ buy?: string }> }) {
  const sess = await requireSession();
  if (!sess) redirect("/login?next=/account");
  const user = await getUserDTO(sess.userId);
  if (!user) redirect("/login?next=/account");
  const [ent, payments, sp] = await Promise.all([getEntitlement(sess.userId), listPayments(sess.userId), searchParams]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Account & billing</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        {user.displayName} · {user.email} (Google)
      </p>

      <Card className="mt-8 gap-5 py-6 shadow-card">
        <CardHeader className="px-6">
          <p className="text-xs uppercase tracking-[0.16em] font-semibold text-primary">{BRAND} pass</p>
          {ent.active && ent.paidUntil ? (
            <>
              <CardTitle className="mt-1 text-2xl font-bold text-foreground">Active until {formatDate(ent.paidUntil)}</CardTitle>
              <CardDescription>
                {ent.daysLeft} {ent.daysLeft === 1 ? "day" : "days"} left. Renewing adds {PLAN.days} days on top of what you have.
              </CardDescription>
            </>
          ) : (
            <>
              <CardTitle className="mt-1 text-2xl font-bold text-foreground">No active pass</CardTitle>
              <CardDescription>
                {ent.paidUntil ? `Your last pass ended on ${formatDate(ent.paidUntil)}. ` : ""}
                Unlock every guide and the lab assistant for {PLAN.priceEtb} ETB for {PLAN.days} days.
              </CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent className="px-6">
          <CheckoutButton
            signedIn
            auto={sp.buy === "1"}
            label={ent.active ? `Add ${PLAN.days} days · ${PLAN.priceEtb} ETB` : `Get ${BRAND} · ${PLAN.priceEtb} ETB`}
          />
          <p className="mt-3 text-xs text-subtle-foreground">
            Paid securely through Chapa (Telebirr, CBE Birr, M-Pesa or card). No automatic charges.{" "}
            <Link href="/refund" className="underline hover:text-primary">
              Refund policy
            </Link>
          </p>
        </CardContent>
      </Card>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-foreground">Payment history</h2>
        {payments.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">No payments yet.</p>
        ) : (
          <Card className="mt-3 py-0 gap-0">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="px-4 text-muted-foreground">Date</TableHead>
                  <TableHead className="px-4 text-muted-foreground">Amount</TableHead>
                  <TableHead className="px-4 text-muted-foreground">Days</TableHead>
                  <TableHead className="px-4 text-muted-foreground">Status</TableHead>
                  <TableHead className="px-4 text-muted-foreground">Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((p) => (
                  <TableRow key={p.txRef}>
                    <TableCell className="px-4 text-foreground">{formatDate(p.createdAt)}</TableCell>
                    <TableCell className="px-4 text-foreground">
                      {p.source === "admin" ? "Gift" : `${p.amountEtb} ${p.currency}`}
                    </TableCell>
                    <TableCell className="px-4 text-foreground">{p.days}</TableCell>
                    <TableCell className="px-4">
                      <StatusPill status={p.status} txRef={p.txRef} source={p.source} />
                    </TableCell>
                    <TableCell className="px-4 text-xs text-subtle-foreground font-mono">{p.chapaRef ?? "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </section>

      <section className="mt-8 text-sm">
        <Link href="/onboarding" className="text-primary hover:underline">
          Change grade & subjects →
        </Link>
      </section>
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
