import { redirect } from "next/navigation";
import { sql } from "drizzle-orm";
import { getSession } from "@/lib/auth/session";
import { db, schema } from "@/lib/db/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminSignOutButton } from "./signout-button";
import { Subscribers } from "./Subscribers";

export const dynamic = "force-dynamic";

type LabelCountRow = { label: string | null; count: number };
type RecentViewRow = {
  path: string;
  country: string | null;
  city: string | null;
  referrer: string | null;
  createdAt: Date;
};
type UserStatsRow = { total: number; d1: number; d7: number; d30: number };
type ViewStatsRow = { total: number; d1: number; d7: number; d30: number; unique7d: number };
type EngagementRow = { convos: number; messages: number; expStarted: number; expDone: number };
type UserRow = {
  id: string;
  email: string;
  displayName: string;
  grade: number | null;
  language: string;
  region: string | null;
  school: string | null;
  subjects: string[] | null;
  createdAt: Date;
};

function rows<T>(r: any): T[] {
  return Array.isArray(r) ? r : r?.rows ?? [];
}

// The Neon HTTP driver occasionally cold-fails with "fetch failed" — one
// retry on a fresh connection clears it without affecting the happy path.
async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    return await fn();
  }
}

async function loadStats() {
  const d1 = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString();
  const d7 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const d30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  // Run in two sequential waves so we never have more than ~4 concurrent
  // HTTP fetches to Neon — bigger fan-outs occasionally fail cold-start.
  const [userStats, viewStats, engagement, usersList] = await withRetry(() => Promise.all([
    db.execute<UserStatsRow>(sql`
      select
        count(*)::int as total,
        count(*) filter (where created_at >= ${d1})::int as d1,
        count(*) filter (where created_at >= ${d7})::int as d7,
        count(*) filter (where created_at >= ${d30})::int as d30
      from users
    `),
    db.execute<ViewStatsRow>(sql`
      select
        count(*)::int as total,
        count(*) filter (where created_at >= ${d1})::int as d1,
        count(*) filter (where created_at >= ${d7})::int as d7,
        count(*) filter (where created_at >= ${d30})::int as d30,
        count(distinct coalesce(user_id, user_agent)) filter (where created_at >= ${d7})::int as unique7d
      from page_views
    `),
    db.execute<EngagementRow>(sql`
      select
        (select count(*)::int from conversations) as convos,
        (select count(*)::int from messages) as messages,
        (select count(*)::int from experiment_progress) as "expStarted",
        (select count(*)::int from experiment_progress where status = 'done') as "expDone"
    `),
    db.execute<UserRow>(sql`
      select id, email, display_name as "displayName", grade, language,
             region, school, subjects, created_at as "createdAt"
      from users
      order by created_at desc
      limit 200
    `),
  ]));

  const [topPaths, topCountries, topReferrers, recentViews] = await withRetry(() => Promise.all([
    db.execute<LabelCountRow>(sql`
      select path as label, count(*)::int as count
      from page_views
      group by path
      order by count desc
      limit 10
    `),
    db.execute<LabelCountRow>(sql`
      select coalesce(country, 'Unknown') as label, count(*)::int as count
      from page_views
      group by country
      order by count desc
      limit 10
    `),
    db.execute<LabelCountRow>(sql`
      select coalesce(nullif(referrer, ''), 'Direct / none') as label, count(*)::int as count
      from page_views
      group by label
      order by count desc
      limit 10
    `),
    db.execute<RecentViewRow>(sql`
      select path, country, city, referrer, created_at as "createdAt"
      from page_views
      order by created_at desc
      limit 25
    `),
  ]));

  const u = rows<UserStatsRow>(userStats)[0] ?? { total: 0, d1: 0, d7: 0, d30: 0 };
  const v = rows<ViewStatsRow>(viewStats)[0] ?? { total: 0, d1: 0, d7: 0, d30: 0, unique7d: 0 };
  const e = rows<EngagementRow>(engagement)[0] ?? { convos: 0, messages: 0, expStarted: 0, expDone: 0 };

  return {
    usersTotal: u.total,
    users1d: u.d1,
    users7d: u.d7,
    users30d: u.d30,
    pvTotal: v.total,
    pv1d: v.d1,
    pv7d: v.d7,
    pv30d: v.d30,
    uniqueVisitors7d: v.unique7d,
    topPaths: rows<LabelCountRow>(topPaths),
    topCountries: rows<LabelCountRow>(topCountries),
    topReferrers: rows<LabelCountRow>(topReferrers),
    recentViews: rows<RecentViewRow>(recentViews),
    convosTotal: e.convos,
    messagesTotal: e.messages,
    experimentsStarted: e.expStarted,
    experimentsDone: e.expDone,
    users: rows<UserRow>(usersList),
  };
}

function StatCard({ label, value, sub }: { label: string; value: number | string; sub?: string }) {
  return (
    <Card className="gap-0 shadow-card">
      <CardContent>
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="mt-1 text-2xl font-bold text-foreground tabular-nums">{value}</div>
        {sub && <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>}
      </CardContent>
    </Card>
  );
}

function TopList({ title, rows }: { title: string; rows: LabelCountRow[] }) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  return (
    <Card className="gap-3 shadow-card">
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-foreground">
          <h3>{title}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">No data yet.</p>
        ) : (
          <ul className="space-y-2">
            {rows.map((r) => (
              <li key={r.label ?? "—"} className="text-sm">
                <div className="flex justify-between gap-3">
                  <span className="truncate text-foreground" title={r.label ?? ""}>
                    {r.label ?? "—"}
                  </span>
                  <span className="tabular-nums text-muted-foreground">{r.count}</span>
                </div>
                <div className="mt-1 h-1.5 rounded-sm bg-background">
                  <div className="h-full rounded-sm bg-primary" style={{ width: `${(r.count / max) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

export default async function AdminPage() {
  const session = await getSession();
  if (!session.isAdmin) redirect("/admin/login");

  const s = await loadStats();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">User signups, traffic, and content engagement.</p>
        </div>
        <AdminSignOutButton />
      </header>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Users</h2>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Total users" value={s.usersTotal} />
          <StatCard label="New in 24h" value={s.users1d} />
          <StatCard label="New in 7d" value={s.users7d} />
          <StatCard label="New in 30d" value={s.users30d} />
        </div>

        <Card className="mt-4 gap-0 py-0 shadow-card">
          <div className="px-4 py-3 border-b border-border flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <h3 className="text-sm font-semibold text-foreground">Registered users</h3>
            <span className="text-xs text-muted-foreground">
              Showing {s.users.length}
              {s.usersTotal > s.users.length ? ` of ${s.usersTotal} (most recent 200)` : ""}
            </span>
          </div>
          <Table>
            <TableHeader className="bg-background text-xs uppercase tracking-wide">
              <TableRow className="hover:bg-transparent">
                <TableHead className="px-3 text-muted-foreground">Name</TableHead>
                <TableHead className="px-3 text-muted-foreground">Email</TableHead>
                <TableHead className="px-3 text-muted-foreground">Grade</TableHead>
                <TableHead className="px-3 text-muted-foreground">Lang</TableHead>
                <TableHead className="px-3 text-muted-foreground">Region</TableHead>
                <TableHead className="px-3 text-muted-foreground">School</TableHead>
                <TableHead className="px-3 text-muted-foreground">Subjects</TableHead>
                <TableHead className="px-3 text-muted-foreground">Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {s.users.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={8} className="px-3 py-4 text-muted-foreground">
                    No registered users yet.
                  </TableCell>
                </TableRow>
              ) : (
                s.users.map((u) => (
                  <TableRow key={u.id} className="align-top">
                    <TableCell className="px-3 align-top text-foreground font-medium">{u.displayName}</TableCell>
                    <TableCell className="px-3 align-top text-foreground">{u.email}</TableCell>
                    <TableCell className="px-3 align-top text-foreground tabular-nums">{u.grade ?? "—"}</TableCell>
                    <TableCell className="px-3 align-top text-muted-foreground uppercase">{u.language}</TableCell>
                    <TableCell className="px-3 align-top text-foreground">{u.region || "—"}</TableCell>
                    <TableCell className="px-3 align-top text-foreground">{u.school || "—"}</TableCell>
                    <TableCell className="px-3 align-top min-w-40 whitespace-normal text-muted-foreground">
                      {(u.subjects ?? []).length ? (u.subjects ?? []).join(", ") : "—"}
                    </TableCell>
                    <TableCell className="px-3 align-top text-muted-foreground">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </section>

      <Subscribers />

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Traffic</h2>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-5 gap-3">
          <StatCard label="Page views (all-time)" value={s.pvTotal} />
          <StatCard label="Views in 24h" value={s.pv1d} />
          <StatCard label="Views in 7d" value={s.pv7d} />
          <StatCard label="Views in 30d" value={s.pv30d} />
          <StatCard label="Unique visitors (7d)" value={s.uniqueVisitors7d} sub="distinct user / user-agent" />
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <TopList title="Top pages" rows={s.topPaths} />
        <TopList title="Top countries" rows={s.topCountries} />
        <TopList title="Top referrers" rows={s.topReferrers} />
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Engagement</h2>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Conversations" value={s.convosTotal} />
          <StatCard label="Chat messages" value={s.messagesTotal} />
          <StatCard label="Experiments started" value={s.experimentsStarted} sub="student × experiment" />
          <StatCard label="Experiments completed" value={s.experimentsDone} />
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Recent page views</h2>
        <Card className="mt-3 gap-0 py-0 shadow-card">
          <Table>
            <TableHeader className="bg-background text-xs uppercase tracking-wide">
              <TableRow className="hover:bg-transparent">
                <TableHead className="px-3 text-muted-foreground">When</TableHead>
                <TableHead className="px-3 text-muted-foreground">Path</TableHead>
                <TableHead className="px-3 text-muted-foreground">Country</TableHead>
                <TableHead className="px-3 text-muted-foreground">City</TableHead>
                <TableHead className="px-3 text-muted-foreground">Referrer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {s.recentViews.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={5} className="px-3 py-4 whitespace-normal text-muted-foreground">
                    No page views yet. Traffic will appear here as people visit the site.
                  </TableCell>
                </TableRow>
              ) : (
                s.recentViews.map((v, i) => (
                  <TableRow key={i}>
                    <TableCell className="px-3 text-muted-foreground">{new Date(v.createdAt).toLocaleString()}</TableCell>
                    <TableCell className="px-3 text-foreground font-mono">{v.path}</TableCell>
                    <TableCell className="px-3 text-foreground">{v.country ?? "—"}</TableCell>
                    <TableCell className="px-3 text-foreground">{v.city ?? "—"}</TableCell>
                    <TableCell className="px-3 text-muted-foreground truncate max-w-[16rem]" title={v.referrer ?? ""}>
                      {v.referrer || "—"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </section>
    </div>
  );
}
