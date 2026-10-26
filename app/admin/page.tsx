import { redirect } from "next/navigation";
import { sql } from "drizzle-orm";
import { getSession } from "@/lib/auth/session";
import { db, schema } from "@/lib/db/client";
import { BarChart3, Eye, FlaskConical, ShieldCheck, Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminSignOutButton } from "./signout-button";
import { SectionTitle, StatCard, Subscribers, TABLE_HEAD, TH, TablePanel } from "./Subscribers";

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

function TopList({ title, rows }: { title: string; rows: LabelCountRow[] }) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  return (
    <div className="rounded-2xl bg-card p-5 shadow-card ring-1 ring-border">
      <h3 className="text-sm font-bold text-foreground">{title}</h3>
      <div className="mt-3">
        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">No data yet.</p>
        ) : (
          <ul className="space-y-2.5">
            {rows.map((r) => (
              <li key={r.label ?? "—"} className="text-sm">
                <div className="flex justify-between gap-3">
                  <span className="truncate text-foreground" title={r.label ?? ""}>
                    {r.label ?? "—"}
                  </span>
                  <span className="font-semibold text-primary-strong tabular-nums">{r.count}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-primary-soft">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${(r.count / max) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default async function AdminPage() {
  const session = await getSession();
  if (!session.isAdmin) redirect("/admin/login");

  const s = await loadStats();

  return (
    <div>
      <PageHeader
        eyebrow={
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-3.5" /> Admin
          </span>
        }
        title="Admin analytics"
        description="User signups, traffic, and content engagement."
      >
        <AdminSignOutButton />
      </PageHeader>

      <div className="mx-auto max-w-5xl space-y-10 px-4 py-10">
      <section>
        <SectionTitle icon={<Users className="size-4" />}>Users</SectionTitle>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Total users" value={s.usersTotal} tone="teal" />
          <StatCard label="New in 24h" value={s.users1d} tone="sun" />
          <StatCard label="New in 7d" value={s.users7d} />
          <StatCard label="New in 30d" value={s.users30d} />
        </div>

        <TablePanel
          title="Registered users"
          className="mt-4"
          aside={
            <span className="text-xs text-muted-foreground">
              Showing {s.users.length}
              {s.usersTotal > s.users.length ? ` of ${s.usersTotal} (most recent 200)` : ""}
            </span>
          }
        >
          <Table>
            <TableHeader className={TABLE_HEAD}>
              <TableRow className="hover:bg-transparent">
                <TableHead className={TH}>Name</TableHead>
                <TableHead className={TH}>Email</TableHead>
                <TableHead className={TH}>Grade</TableHead>
                <TableHead className={TH}>Lang</TableHead>
                <TableHead className={TH}>Region</TableHead>
                <TableHead className={TH}>School</TableHead>
                <TableHead className={TH}>Subjects</TableHead>
                <TableHead className={TH}>Joined</TableHead>
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
        </TablePanel>
      </section>

      <Subscribers />

      <section>
        <SectionTitle icon={<BarChart3 className="size-4" />}>Traffic</SectionTitle>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-5">
          <StatCard label="Page views (all-time)" value={s.pvTotal} tone="teal" />
          <StatCard label="Views in 24h" value={s.pv1d} tone="sun" />
          <StatCard label="Views in 7d" value={s.pv7d} />
          <StatCard label="Views in 30d" value={s.pv30d} />
          <StatCard label="Unique visitors (7d)" value={s.uniqueVisitors7d} sub="distinct user / user-agent" />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <TopList title="Top pages" rows={s.topPaths} />
        <TopList title="Top countries" rows={s.topCountries} />
        <TopList title="Top referrers" rows={s.topReferrers} />
      </section>

      <section>
        <SectionTitle icon={<FlaskConical className="size-4" />}>Engagement</SectionTitle>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Conversations" value={s.convosTotal} tone="teal" />
          <StatCard label="Chat messages" value={s.messagesTotal} />
          <StatCard label="Experiments started" value={s.experimentsStarted} sub="student × experiment" />
          <StatCard label="Experiments completed" value={s.experimentsDone} tone="sun" />
        </div>
      </section>

      <section>
        <SectionTitle icon={<Eye className="size-4" />}>Recent page views</SectionTitle>
        <TablePanel title="Last 25 views" className="mt-3">
          <Table>
            <TableHeader className={TABLE_HEAD}>
              <TableRow className="hover:bg-transparent">
                <TableHead className={TH}>When</TableHead>
                <TableHead className={TH}>Path</TableHead>
                <TableHead className={TH}>Country</TableHead>
                <TableHead className={TH}>City</TableHead>
                <TableHead className={TH}>Referrer</TableHead>
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
        </TablePanel>
      </section>
      </div>
    </div>
  );
}
