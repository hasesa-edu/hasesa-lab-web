import { sql } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { Badge } from "@/components/ui/badge";
import { Gift, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
      <SectionTitle icon={<Wallet className="size-4" />}>Subscribers</SectionTitle>
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Active passes" value={s.active} tone="teal" />
        <StatCard label="Ending in 3 days" value={s.endingSoon} tone="sun" />
        <StatCard label="Revenue this month (ETB)" value={r.month} sub={`${r.paymentsMonth} payments`} />
        <StatCard label="Revenue all time (ETB)" value={r.total} sub={`${s.everPaid} students ever paid`} />
      </div>

      <div className="mt-4 rounded-2xl bg-sun-soft/50 p-5 ring-1 ring-sun/30">
        <div className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-sun text-deep">
            <Gift className="size-4" />
          </span>
          <div>
            <h3 className="text-base font-bold text-foreground">Add days to a pass</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              For gifts, or payments made outside Chapa. Adds days on top of what the student has left.
            </p>
          </div>
        </div>
        <div className="mt-4">
          <GrantForm />
        </div>
      </div>

      <TablePanel title="Recent payments" className="mt-4">
        <Table>
          <TableHeader className={TABLE_HEAD}>
            <TableRow className="hover:bg-transparent">
              <TableHead className={TH}>When</TableHead>
              <TableHead className={TH}>Student</TableHead>
              <TableHead className={TH}>Amount</TableHead>
              <TableHead className={TH}>Days</TableHead>
              <TableHead className={TH}>Status</TableHead>
              <TableHead className={TH}>Pass ends</TableHead>
              <TableHead className={TH}>Ref / note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={7} className="px-3 py-4 text-muted-foreground">
                  No payments yet.
                </TableCell>
              </TableRow>
            ) : (
              list.map((p) => (
                <TableRow key={p.txRef}>
                  <TableCell className="px-3 text-muted-foreground">{new Date(p.createdAt).toLocaleString()}</TableCell>
                  <TableCell className="px-3 text-foreground">{p.email}</TableCell>
                  <TableCell className="px-3 font-semibold text-foreground tabular-nums">{p.source === "admin" ? "grant" : `${p.amountEtb} ETB`}</TableCell>
                  <TableCell className="px-3 text-foreground tabular-nums">{p.days}</TableCell>
                  <TableCell className="px-3">
                    <StatusBadge status={p.status} />
                  </TableCell>
                  <TableCell className="px-3 text-muted-foreground">
                    {p.paidUntil ? new Date(p.paidUntil).toLocaleDateString() : "—"}
                  </TableCell>
                  <TableCell className="px-3 font-mono text-xs text-subtle-foreground">{p.note ?? p.txRef}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TablePanel>
    </section>
  );
}

/* Shared admin building blocks (also used by ./page.tsx). */

export const TABLE_HEAD = "bg-primary-soft/50";
export const TH = "px-3 text-xs font-bold tracking-wide text-primary-strong uppercase";

const STAT_TONES = {
  teal: { bar: "bg-primary", value: "text-primary-strong" },
  sun: { bar: "bg-sun", value: "text-chemistry" },
  plain: { bar: "bg-primary/30", value: "text-foreground" },
} as const;

export function StatCard({
  label,
  value,
  sub,
  tone = "plain",
}: {
  label: string;
  value: number | string;
  sub?: string;
  tone?: keyof typeof STAT_TONES;
}) {
  const t = STAT_TONES[tone];
  return (
    <div className="relative overflow-hidden rounded-2xl bg-card p-4 shadow-card ring-1 ring-border">
      <span aria-hidden className={cn("absolute inset-x-0 top-0 h-1", t.bar)} />
      <div className="text-[11px] leading-tight font-semibold tracking-wide text-muted-foreground uppercase">{label}</div>
      <div className={cn("mt-1.5 font-heading text-3xl leading-none font-extrabold tabular-nums", t.value)}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      {sub && <div className="mt-1 text-xs text-subtle-foreground">{sub}</div>}
    </div>
  );
}

export function SectionTitle({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-foreground">
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary-soft text-primary-strong">{icon}</span>
      {children}
    </h2>
  );
}

export function TablePanel({
  title,
  aside,
  className,
  children,
}: {
  title: string;
  aside?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("overflow-hidden rounded-2xl bg-card shadow-card ring-1 ring-border", className)}>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-border px-4 py-3">
        <h3 className="text-sm font-bold text-foreground">{title}</h3>
        {aside}
      </div>
      {children}
    </div>
  );
}

// Shows the raw status value; tone only tells success / failure / needs-attention apart.
function StatusBadge({ status }: { status: string }) {
  if (status === "success")
    return <Badge variant="success">{status}</Badge>;
  if (status === "failed") return <Badge variant="destructive">{status}</Badge>;
  if (status === "review")
    return <Badge variant="warning">{status}</Badge>;
  return <Badge variant="secondary">{status}</Badge>;
}
