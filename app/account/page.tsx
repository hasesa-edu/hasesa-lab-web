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
      <h1 className="text-4xl font-extrabold tracking-tight text-ink">Account & billing</h1>
      <p className="mt-1.5 text-sm text-ink-muted">
        {user.displayName} · {user.email} (Google)
      </p>

      <section className="mt-8 rounded-2xl border border-line bg-surface p-6 shadow-card">
        <p className="text-xs uppercase tracking-[0.16em] font-semibold text-brand">{BRAND} pass</p>
        {ent.active && ent.paidUntil ? (
          <>
            <p className="mt-2 text-2xl font-bold text-ink">Active until {formatDate(ent.paidUntil)}</p>
            <p className="mt-1 text-sm text-ink-muted">
              {ent.daysLeft} {ent.daysLeft === 1 ? "day" : "days"} left. Renewing adds {PLAN.days} days on top of what you have.
            </p>
          </>
        ) : (
          <>
            <p className="mt-2 text-2xl font-bold text-ink">No active pass</p>
            <p className="mt-1 text-sm text-ink-muted">
              {ent.paidUntil ? `Your last pass ended on ${formatDate(ent.paidUntil)}. ` : ""}
              Unlock every guide and the lab assistant for {PLAN.priceEtb} ETB for {PLAN.days} days.
            </p>
          </>
        )}
        <div className="mt-5">
          <CheckoutButton
            signedIn
            auto={sp.buy === "1"}
            label={ent.active ? `Add ${PLAN.days} days · ${PLAN.priceEtb} ETB` : `Get ${BRAND} · ${PLAN.priceEtb} ETB`}
          />
        </div>
        <p className="mt-3 text-xs text-ink-subtle">
          Paid securely through Chapa (Telebirr, CBE Birr, M-Pesa or card). No automatic charges.{" "}
          <Link href="/refund" className="underline hover:text-brand">
            Refund policy
          </Link>
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-ink">Payment history</h2>
        {payments.length === 0 ? (
          <p className="mt-2 text-sm text-ink-muted">No payments yet.</p>
        ) : (
          <div className="mt-3 overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-sm">
              <thead className="bg-surface-2 text-left text-ink-muted">
                <tr>
                  <th className="px-4 py-2 font-medium">Date</th>
                  <th className="px-4 py-2 font-medium">Amount</th>
                  <th className="px-4 py-2 font-medium">Days</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                  <th className="px-4 py-2 font-medium">Reference</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.txRef} className="border-t border-line">
                    <td className="px-4 py-2 text-ink whitespace-nowrap">{formatDate(p.createdAt)}</td>
                    <td className="px-4 py-2 text-ink whitespace-nowrap">
                      {p.source === "admin" ? "Gift" : `${p.amountEtb} ${p.currency}`}
                    </td>
                    <td className="px-4 py-2 text-ink">{p.days}</td>
                    <td className="px-4 py-2">
                      <StatusPill status={p.status} txRef={p.txRef} source={p.source} />
                    </td>
                    <td className="px-4 py-2 text-xs text-ink-subtle font-mono">{p.chapaRef ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-8 text-sm">
        <Link href="/onboarding" className="text-brand hover:underline">
          Change grade & subjects →
        </Link>
      </section>
    </div>
  );
}

function StatusPill({ status, txRef, source }: { status: string; txRef: string; source: string }) {
  if (status === "success") return <span className="text-emerald-700 dark:text-emerald-300 font-medium">Paid</span>;
  if (status === "failed") return <span className="text-red-700 dark:text-red-300">Failed</span>;
  if (status === "review") return <span className="text-amber-700 dark:text-amber-300">Needs review · contact us</span>;
  return source === "chapa" ? (
    <Link href={`/billing/return?tx_ref=${encodeURIComponent(txRef)}`} className="text-amber-700 dark:text-amber-300 underline">
      Pending · check
    </Link>
  ) : (
    <span className="text-ink-muted">Pending</span>
  );
}
