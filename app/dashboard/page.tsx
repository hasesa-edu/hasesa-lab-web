import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BookOpen, ClipboardList, GraduationCap, MessageSquareQuote } from "lucide-react";
import { getConcept, getModule, getModules, summarize } from "@/lib/content";
import { getAccess, hasFullAccess } from "@/lib/access";
import { myStudentState } from "@/lib/my-progress";
import { getUserDTO } from "@/lib/auth/users";
import { cardStates, isUnitDone, moduleProgress } from "@/lib/summary";
import { formatDate } from "@/lib/format";
import { BRAND } from "@/lib/brand";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { CardGrid, ModuleCard } from "@/components/module/ModuleCard";
import { CardRow } from "@/components/module/CardRow";
import { type Viewer, catalogueItem, suggestModules } from "@/lib/catalogue";
import { FeedbackItem } from "@/components/module/FeedbackItem";
import { EnrolCard, SectionTitle, UnitStatusPill } from "@/components/module/ui";

export const metadata: Metadata = { title: `My learning · ${BRAND}`, robots: { index: false } };
export const dynamic = "force-dynamic";

type Tab = "in-progress" | "completed" | "dropped";
const EMPTY: Record<Tab, string> = {
  "in-progress": "Nothing in progress. Pick a module below to start.",
  completed: "No modules signed off yet. Your certificates will appear here.",
  dropped: "No dropped modules.",
};

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const access = await getAccess();
  if (!access.userId) redirect("/login?next=/dashboard");
  const [user, state] = await Promise.all([getUserDTO(access.userId), myStudentState(access.userId)]);
  if (!user) redirect("/login?next=/dashboard");

  const modules = getModules();
  const progress = modules.map((m) => ({ m, p: moduleProgress(m, state) }));
  const active = progress.filter((x) => x.p.status === "active").sort((a, b) => (b.p.lastActivity?.getTime() ?? 0) - (a.p.lastActivity?.getTime() ?? 0));
  const completed = progress.filter((x) => x.p.status === "completed");
  const dropped = progress.filter((x) => x.p.status === "dropped");
  const items = modules.map((m) => catalogueItem(summarize(m)));
  const byId = new Map(items.map((i) => [i.id, i]));
  const states = cardStates(modules, state);
  const viewer: Viewer = hasFullAccess(access) ? "full" : "limited";
  const suggestions = suggestModules(items, Object.fromEntries(progress.map(({ m, p }) => [m.id, p.status])), 8);

  // My modules, in tabs. The tab lives in the URL so the page renders on the server.
  const tabs: { key: Tab; label: string; items: typeof items }[] = [
    { key: "in-progress", label: "In progress", items: active.map(({ m }) => byId.get(m.id)!) },
    { key: "completed", label: "Completed", items: completed.map(({ m }) => byId.get(m.id)!) },
    { key: "dropped", label: "Dropped", items: dropped.map(({ m }) => byId.get(m.id)!) },
  ];
  const asked = (await searchParams).tab;
  const tab: Tab = tabs.find((t) => t.key === asked)?.key ?? tabs.find((t) => t.items.length)?.key ?? "in-progress";
  const current = tabs.find((t) => t.key === tab)!.items;
  const unitStatus = new Map(state.units.map((u) => [u.unitId, u.status]));
  const assignments = state.assignments.filter((a) => getConcept(a.unitId));
  const openAssignments = assignments.filter((a) => !isUnitDone(unitStatus.get(a.unitId)));
  const full = hasFullAccess(access);
  const firstName = user.displayName.split(" ")[0];

  return (
    <div>
      <PageHeader
        eyebrow={`Hello, ${firstName}`}
        title="My learning"
        description={
          access.level === "guide"
            ? "You're the Academy's guide."
            : access.level === "enrolled"
              ? `Enrolled at the Academy until ${formatDate(user.paidUntil!)}.`
              : "You're signed up. Enrol at the Academy to start a module."
        }
      >
        {access.level === "guide" && (
          <Button asChild variant="ink">
            <Link href="/guide">
              <GraduationCap aria-hidden /> Open the student tracker
            </Link>
          </Button>
        )}
      </PageHeader>

      <div className="mx-auto max-w-6xl px-4 pt-8 pb-16">
        {!full && <EnrolCard signedIn next="/dashboard" className="mb-10" />}

        {state.feedback.length > 0 && (
          <section className="mb-12">
            <SectionTitle icon={MessageSquareQuote}>From your guide</SectionTitle>
            <ul className="mt-4 space-y-2">
              {state.feedback.slice(0, 8).map((f) => {
                const m = f.moduleId ? getModule(f.moduleId) : undefined;
                const s = m && f.stepId ? m.steps.find((x) => x.id === f.stepId) : undefined;
                return (
                  <FeedbackItem
                    key={f.id}
                    id={f.id}
                    body={f.body}
                    date={formatDate(f.createdAt)}
                    context={s ? `${m!.title}: ${s.title}` : m?.title}
                    unread={!f.readAt}
                  />
                );
              })}
            </ul>
          </section>
        )}

        {openAssignments.length > 0 && (
          <section className="mb-12">
            <SectionTitle icon={ClipboardList}>Your guide asked you to study</SectionTitle>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {openAssignments.map((a) => {
                const c = getConcept(a.unitId)!;
                return (
                  <li key={a.id}>
                    <Link href={`/concepts/${c.id}`} className="flex h-full items-start gap-3 rounded-lg bg-card p-4 shadow-card ring-1 ring-border transition hover:ring-primary/50">
                      <BookOpen aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-foreground">{c.title}</span>
                        {a.note && <span className="mt-0.5 block text-sm text-muted-foreground">{a.note}</span>}
                      </span>
                      <UnitStatusPill status={unitStatus.get(a.unitId)} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {tabs.some((t) => t.items.length) && (
          <section className="mb-14">
            <nav aria-label="My modules" className="flex gap-1 overflow-x-auto border-b border-border [scrollbar-width:none]">
              {tabs.map((t) => (
                <Link
                  key={t.key}
                  href={`/dashboard?tab=${t.key}`}
                  scroll={false}
                  aria-current={tab === t.key ? "page" : undefined}
                  className={
                    "relative inline-flex min-h-11 shrink-0 items-center gap-2 px-3 text-sm font-medium transition-colors after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 " +
                    (tab === t.key ? "text-foreground after:bg-foreground" : "text-muted-foreground hover:text-foreground")
                  }
                >
                  {t.label}
                  <span className="rounded-full bg-muted px-1.5 font-mono text-[11px] tabular-nums">{t.items.length}</span>
                </Link>
              ))}
            </nav>
            {current.length ? (
              <CardGrid className="mt-6">
                {current.map((m) => (
                  <li key={m.id}>
                    <ModuleCard item={m} state={states[m.id]} viewer={viewer} />
                  </li>
                ))}
              </CardGrid>
            ) : (
              <p className="mt-6 text-muted-foreground">{EMPTY[tab]}</p>
            )}
          </section>
        )}

        {suggestions.length > 0 && (
          <CardRow
            title={active.length || completed.length ? "Recommended for you" : "Start here"}
            sub={
              active.length || completed.length
                ? "Picked from your level and the subjects you've tried. You can start any module."
                : "A few beginner modules to start with. You can start any module."
            }
            seeAll={{ href: "/modules", label: `Browse all ${modules.length}` }}
          >
            {suggestions.map((m) => (
              <li key={m.id}>
                <ModuleCard item={m} state={states[m.id]} viewer={viewer} />
              </li>
            ))}
          </CardRow>
        )}
      </div>
    </div>
  );
}
