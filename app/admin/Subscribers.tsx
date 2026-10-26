import { sql } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { GrantForm } from "./GrantForm";

type SubStats = { active: number; endingSoon: number; everPaid: number };
type Revenue = { month: number; total: number; paymentsMonth: number };
type PaymentRow = {
  txRef: string;
  email: string;
  amountEtb: number;
  days: number;
  status: string;
  source: string;
  note: string | null;
  createdAt: string;
  paidUntil: string | null;
};

function rows<T>(r: any): T[] {
  return Array.isArray(r) ? r : r?.rows ?? [];
}

export async function Subscribers() {
  // Month boundary in Addis Ababa time (UTC+3).
  const [subs, revenue, recent] = await Promise.all([
    db.execute(sql`
      select
        count(*) filter (where paid_until > now())::int as active,
        count(*) filter (where paid_until > now() and paid_until < now() + interval '3 days')::int as "endingSoon",
        count(*) filter (where paid_until is not null)::int as "everPaid"
      from users
    `),
    db.execute(sql`
      select
        coalesce(sum(amount_etb) filter (
          where verified_at >= date_trunc('month', now() at time zone 'Africa/Addis_Ababa') at time zone 'Africa/Addis_Ababa'
        ), 0)::int as month,
        coalesce(sum(amount_etb), 0)::int as total,
        count(*) filter (
          where verified_at >= date_trunc('month', now() at time zone 'Africa/Addis_Ababa') at time zone 'Africa/Addis_Ababa'
        )::int as "paymentsMonth"
      from payments
      where status = 'success' and source = 'chapa'
    `),
    db.execute(sql`
      select p.tx_ref as "txRef", u.email, p.amount_etb as "amountEtb", p.days, p.status, p.source, p.note,
             p.created_at as "createdAt", u.paid_until as "paidUntil"
      from payments p join users u on u.id = p.user_id
      order by p.created_at desc
      limit 20
    `),
  ]);
  const s = rows<SubStats>(subs)[0] ?? { active: 0, endingSoon: 0, everPaid: 0 };
  const r = rows<Revenue>(revenue)[0] ?? { month: 0, total: 0, paymentsMonth: 0 };
  const list = rows<PaymentRow>(recent);

  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Subscribers</h2>
      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card label="Active passes" value={s.active} />
        <Card label="Ending in 3 days" value={s.endingSoon} />
        <Card label="Revenue this month (ETB)" value={r.month} sub={`${r.paymentsMonth} payments`} />
        <Card label="Revenue all time (ETB)" value={r.total} sub={`${s.everPaid} students ever paid`} />
      </div>

      <div className="mt-4 rounded-xl border border-line bg-surface shadow-card p-4">
        <h3 className="text-sm font-semibold text-ink">Add days to a pass</h3>
        <p className="mt-1 text-xs text-ink-muted">For gifts, or payments made outside Chapa. Adds days on top of what the student has left.</p>
        <div className="mt-3">
          <GrantForm />
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-line bg-surface shadow-card overflow-hidden">
        <div className="px-4 py-3 border-b border-line">
          <h3 className="text-sm font-semibold text-ink">Recent payments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-canvas text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th className="text-left px-3 py-2">When</th>
                <th className="text-left px-3 py-2">Student</th>
                <th className="text-left px-3 py-2">Amount</th>
                <th className="text-left px-3 py-2">Days</th>
                <th className="text-left px-3 py-2">Status</th>
                <th className="text-left px-3 py-2">Pass ends</th>
                <th className="text-left px-3 py-2">Ref / note</th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-4 text-ink-muted">
                    No payments yet.
                  </td>
                </tr>
              ) : (
                list.map((p) => (
                  <tr key={p.txRef} className="border-t border-line">
                    <td className="px-3 py-2 text-ink-muted whitespace-nowrap">{new Date(p.createdAt).toLocaleString()}</td>
                    <td className="px-3 py-2 text-ink">{p.email}</td>
                    <td className="px-3 py-2 text-ink tabular-nums">{p.source === "admin" ? "grant" : `${p.amountEtb} ETB`}</td>
                    <td className="px-3 py-2 text-ink tabular-nums">{p.days}</td>
                    <td className="px-3 py-2 text-ink">{p.status}</td>
                    <td className="px-3 py-2 text-ink-muted whitespace-nowrap">
                      {p.paidUntil ? new Date(p.paidUntil).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-3 py-2 text-xs text-ink-subtle font-mono">{p.note ?? p.txRef}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Card({ label, value, sub }: { label: string; value: number; sub?: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4 shadow-soft">
      <div className="text-xs text-ink-muted">{label}</div>
      <div className="mt-1 text-2xl font-bold text-ink tabular-nums">{value.toLocaleString()}</div>
      {sub && <div className="mt-0.5 text-xs text-ink-subtle">{sub}</div>}
    </div>
  );
}
