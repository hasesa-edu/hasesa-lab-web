import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Award, BookOpen, ChevronRight, ClipboardList, Compass, GraduationCap, MessageSquareQuote, RotateCcw } from "lucide-react";
import { getConcept, getModule, getModules, summarize } from "@/lib/content";
import { getAccess, hasFullAccess } from "@/lib/access";
import { getStudentState } from "@/lib/progress";
import { getUserDTO } from "@/lib/auth/users";
import { isUnitDone, moduleProgress } from "@/lib/summary";
import { formatDate } from "@/lib/format";
import { BRAND } from "@/lib/brand";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { ModuleCard } from "@/components/module/ModuleCard";
import { FeedbackItem } from "@/components/module/FeedbackItem";
import { EnrolCard, ProgressBar, SectionTitle, UnitStatusPill } from "@/components/module/ui";

export const metadata: Metadata = { title: `My dashboard · ${BRAND}`, robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const access = await getAccess();
  if (!access.userId) redirect("/login?next=/dashboard");
  const [user, state] = await Promise.all([getUserDTO(access.userId), getStudentState(access.userId)]);
  if (!user) redirect("/login?next=/dashboard");

  const modules = getModules();
  const progress = modules.map((m) => ({ m, p: moduleProgress(m, state) }));
  const active = progress.filter((x) => x.p.status === "active").sort((a, b) => (b.p.lastActivity?.getTime() ?? 0) - (a.p.lastActivity?.getTime() ?? 0));
  const completed = progress.filter((x) => x.p.status === "completed");
  const dropped = progress.filter((x) => x.p.status === "dropped");
  const fresh = progress.filter((x) => x.p.status === "not-started");
  const unitStatus = new Map(state.units.map((u) => [u.unitId, u.status]));
  const assignments = state.assignments.filter((a) => getConcept(a.unitId));
  const openAssignments = assignments.filter((a) => !isUnitDone(unitStatus.get(a.unitId)));
  const full = hasFullAccess(access);
  const firstName = user.displayName.split(" ")[0];

  return (
    <div>
      <PageHeader
        eyebrow="My dashboard"
        title={`Hello, ${firstName}`}
        description={
          access.level === "guide"
            ? "You're the Academy's guide."
            : access.level === "enrolled"
              ? `Enrolled at the Academy until ${formatDate(user.paidUntil!)}.`
              : "You're signed up. Enrol at the Academy to start a module."
        }
      >
        {access.level === "guide" && (
          <Button asChild className="bg-sun font-semibold text-deep hover:bg-sun/90">
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
                    <Link href={`/concepts/${c.id}`} className="flex h-full items-start gap-3 rounded-2xl bg-card p-4 shadow-card ring-1 ring-border transition hover:ring-primary/50">
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

        {active.length > 0 && (
          <section className="mb-12">
            <SectionTitle icon={Compass}>Pick up where you stopped</SectionTitle>
            <ul className="mt-4 space-y-3">
              {active.map(({ m, p }) => (
                <li key={m.id} className="rounded-2xl bg-card p-5 shadow-card ring-1 ring-border">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link href={`/modules/${m.id}`} className="text-xl font-extrabold tracking-tight text-foreground hover:text-primary-strong">
                        {m.title}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {p.stepsDone}/{p.stepsTotal} steps · {p.unitsDone}/{p.unitsTotal} concept units
                        {p.lastActivity ? ` · last active ${formatDate(p.lastActivity)}` : ""}
                      </p>
                    </div>
                    {p.nextStep ? (
                      <Button asChild>
                        <Link href={`/modules/${m.id}/${p.nextStep.id}`}>
                          Next: {p.nextStep.title} <ChevronRight aria-hidden />
                        </Link>
                      </Button>
                    ) : (
                      <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">All steps done. Ask your guide to sign you off.</span>
                    )}
                  </div>
                  <ProgressBar pct={p.stepsTotal ? Math.round((p.stepsDone / p.stepsTotal) * 100) : 0} className="mt-4" />
                </li>
              ))}
            </ul>
          </section>
        )}

        {completed.length > 0 && (
          <section className="mb-12">
            <SectionTitle icon={Award}>Certificates</SectionTitle>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {completed.map(({ m, p }) => (
                <li key={m.id}>
                  <Link
                    href={`/certificates/${p.certificateCode}`}
                    className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-300 transition hover:ring-emerald-500 dark:bg-emerald-950/40 dark:ring-emerald-800"
                  >
                    <Award aria-hidden className="size-6 shrink-0 text-emerald-600" />
                    <span className="flex-1 font-semibold text-foreground">{m.title}</span>
                    <ChevronRight aria-hidden className="size-4 text-emerald-600" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {dropped.length > 0 && (
          <section className="mb-12">
            <SectionTitle icon={RotateCcw}>Dropped</SectionTitle>
            <p className="mt-2 text-sm text-muted-foreground">Your notes and progress are kept. Restart any time.</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {dropped.map(({ m }) => (
                <li key={m.id}>
                  <Button asChild variant="outline">
                    <Link href={`/modules/${m.id}`}>{m.title}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {fresh.length > 0 && (
          <section>
            <SectionTitle icon={Compass}>{active.length || completed.length ? "Start another module" : "Choose your first module"}</SectionTitle>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {fresh.map(({ m }) => (
                <ModuleCard key={m.id} m={summarize(m)} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
