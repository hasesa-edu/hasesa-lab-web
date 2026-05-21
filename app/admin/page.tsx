import { redirect } from "next/navigation";
import { sql } from "drizzle-orm";
import { getSession } from "@/lib/auth/session";
import { db, schema } from "@/lib/db/client";
import { AdminSignOutButton } from "./signout-button";

export const dynamic = "force-dynamic";

type LabelCountRow = { label: string | null; count: number };
type RecentViewRow = {
  path: string;
  country: string | null;
  city: string | null;
  referrer: string | null;
  createdAt: Date;
};
type UserStatsRow = { total: number; students: number; teachers: number; d1: number; d7: number; d30: number };
type ViewStatsRow = { total: number; d1: number; d7: number; d30: number; unique7d: number };
type EngagementRow = { convos: number; messages: number };

function rows<T>(r: any): T[] {
  return Array.isArray(r) ? r : r?.rows ?? [];
}

async function loadStats() {
  const d1 = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString();
  const d7 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const d30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const [userStats, viewStats, topPaths, topCountries, topReferrers, recentViews, engagement] = await Promise.all([
    db.execute<UserStatsRow>(sql`
      select
        count(*)::int as total,
        count(*) filter (where role = 'student')::int as students,
        count(*) filter (where role = 'teacher')::int as teachers,
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
    db.execute<EngagementRow>(sql`
      select
        (select count(*)::int from conversations) as convos,
        (select count(*)::int from messages) as messages
    `),
  ]);

  const u = rows<UserStatsRow>(userStats)[0] ?? { total: 0, students: 0, teachers: 0, d1: 0, d7: 0, d30: 0 };
  const v = rows<ViewStatsRow>(viewStats)[0] ?? { total: 0, d1: 0, d7: 0, d30: 0, unique7d: 0 };
  const e = rows<EngagementRow>(engagement)[0] ?? { convos: 0, messages: 0 };

  return {
    usersTotal: u.total,
    usersStudents: u.students,
    usersTeachers: u.teachers,
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
  };
}

function StatCard({ label, value, sub }: { label: string; value: number | string; sub?: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4 shadow-card">
      <div className="text-xs uppercase tracking-wide text-ink-muted">{label}</div>
      <div className="mt-1 text-2xl font-bold text-ink tabular-nums">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-ink-muted">{sub}</div>}
    </div>
  );
}

function TopList({ title, rows }: { title: string; rows: LabelCountRow[] }) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  return (
    <div className="rounded-xl border border-line bg-surface p-4 shadow-card">
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      {rows.length === 0 ? (
        <p className="mt-2 text-sm text-ink-muted">No data yet.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {rows.map((r) => (
            <li key={r.label ?? "—"} className="text-sm">
              <div className="flex justify-between gap-3">
                <span className="truncate text-ink" title={r.label ?? ""}>
                  {r.label ?? "—"}
                </span>
                <span className="tabular-nums text-ink-muted">{r.count}</span>
              </div>
              <div className="mt-1 h-1.5 rounded bg-canvas">
                <div className="h-full rounded bg-brand" style={{ width: `${(r.count / max) * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
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
          <h1 className="text-3xl font-bold tracking-tight text-ink">Admin analytics</h1>
          <p className="mt-1 text-sm text-ink-muted">User signups, traffic, and content engagement.</p>
        </div>
        <AdminSignOutButton />
      </header>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Users</h2>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Total users" value={s.usersTotal} sub={`${s.usersStudents} students · ${s.usersTeachers} teachers`} />
          <StatCard label="New in 24h" value={s.users1d} />
          <StatCard label="New in 7d" value={s.users7d} />
          <StatCard label="New in 30d" value={s.users30d} />
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Traffic</h2>
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
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Engagement</h2>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Conversations" value={s.convosTotal} />
          <StatCard label="Chat messages" value={s.messagesTotal} />
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">Recent page views</h2>
        <div className="mt-3 rounded-xl border border-line bg-surface shadow-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-canvas text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th className="text-left px-3 py-2">When</th>
                <th className="text-left px-3 py-2">Path</th>
                <th className="text-left px-3 py-2">Country</th>
                <th className="text-left px-3 py-2">City</th>
                <th className="text-left px-3 py-2">Referrer</th>
              </tr>
            </thead>
            <tbody>
              {s.recentViews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 py-4 text-ink-muted">
                    No page views yet. Traffic will appear here as people visit the site.
                  </td>
                </tr>
              ) : (
                s.recentViews.map((v, i) => (
                  <tr key={i} className="border-t border-line">
                    <td className="px-3 py-2 text-ink-muted whitespace-nowrap">
                      {new Date(v.createdAt).toLocaleString()}
                    </td>
                    <td className="px-3 py-2 text-ink font-mono">{v.path}</td>
                    <td className="px-3 py-2 text-ink">{v.country ?? "—"}</td>
                    <td className="px-3 py-2 text-ink">{v.city ?? "—"}</td>
                    <td className="px-3 py-2 text-ink-muted truncate max-w-[16rem]" title={v.referrer ?? ""}>
                      {v.referrer || "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
