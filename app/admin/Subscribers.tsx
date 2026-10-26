import { sql } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Subscribers</h2>
      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Active passes" value={s.active} />
        <StatCard label="Ending in 3 days" value={s.endingSoon} />
        <StatCard label="Revenue this month (ETB)" value={r.month} sub={`${r.paymentsMonth} payments`} />
        <StatCard label="Revenue all time (ETB)" value={r.total} sub={`${s.everPaid} students ever paid`} />
      </div>

      <Card className="mt-4 gap-3 shadow-card">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-foreground">
            <h3>Add days to a pass</h3>
          </CardTitle>
          <CardDescription className="text-xs">
            For gifts, or payments made outside Chapa. Adds days on top of what the student has left.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GrantForm />
        </CardContent>
      </Card>

      <Card className="mt-4 gap-0 py-0 shadow-card">
        <div className="px-4 py-3 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Recent payments</h3>
        </div>
        <Table>
          <TableHeader className="bg-background text-xs uppercase tracking-wide">
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-3 text-muted-foreground">When</TableHead>
              <TableHead className="px-3 text-muted-foreground">Student</TableHead>
              <TableHead className="px-3 text-muted-foreground">Amount</TableHead>
              <TableHead className="px-3 text-muted-foreground">Days</TableHead>
              <TableHead className="px-3 text-muted-foreground">Status</TableHead>
              <TableHead className="px-3 text-muted-foreground">Pass ends</TableHead>
              <TableHead className="px-3 text-muted-foreground">Ref / note</TableHead>
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
                  <TableCell className="px-3 text-foreground tabular-nums">{p.source === "admin" ? "grant" : `${p.amountEtb} ETB`}</TableCell>
                  <TableCell className="px-3 text-foreground tabular-nums">{p.days}</TableCell>
                  <TableCell className="px-3">
                    <StatusBadge status={p.status} />
                  </TableCell>
                  <TableCell className="px-3 text-muted-foreground">
                    {p.paidUntil ? new Date(p.paidUntil).toLocaleDateString() : "—"}
                  </TableCell>
                  <TableCell className="px-3 text-xs text-subtle-foreground font-mono">{p.note ?? p.txRef}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
}

function StatCard({ label, value, sub }: { label: string; value: number; sub?: string }) {
  return (
    <Card className="gap-0 shadow-soft">
      <CardContent>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="mt-1 text-2xl font-bold text-foreground tabular-nums">{value.toLocaleString()}</div>
        {sub && <div className="mt-0.5 text-xs text-subtle-foreground">{sub}</div>}
      </CardContent>
    </Card>
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
