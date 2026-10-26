"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Clock, FlaskConical, MessageCircle, NotebookPen, Sparkles } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { PageHeader } from "@/components/PageHeader";
import { SUBJECT_STYLES, SubjectLabel, SubjectTile } from "@/components/Subject";
import type { CatalogItem } from "@/lib/subjects";
import { apiGetProgress, type ProgressDTO } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type Tr = (k: any) => string;

export function DashboardClient({ catalog }: { catalog: CatalogItem[] }) {
  const byId = useMemo(() => new Map(catalog.map((e) => [e.id, e])), [catalog]);
  const getExperiment = (id: string) => byId.get(id);
  const { tr } = useLocale();
  const { user, ready } = useUser();
  const router = useRouter();
  const [progress, setProgress] = useState<ProgressDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ready && !user) router.push("/login");
  }, [ready, user, router]);

  useEffect(() => {
    if (!user) return;
    apiGetProgress()
      .then(setProgress)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  const byRecent = useMemo(
    () => [...progress].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    [progress]
  );
  const inProgress = byRecent.filter((p) => p.status === "started");
  const completed = byRecent.filter((p) => p.status === "done");

  // Next up: experiments not yet touched, preferring the student's grade and subjects.
  const suggestions = useMemo(() => {
    if (!user) return [];
    const touched = new Set(progress.map((p) => p.experimentId));
    const subjects = user.subjects.length ? user.subjects : null;
    const score = (e: CatalogItem) =>
      (user.grade === e.grade ? 2 : user.grade && Math.abs(user.grade - e.grade) === 1 ? 1 : 0) +
      (!subjects || subjects.includes(e.subject) ? 2 : 0);
    return catalog.filter((e) => !touched.has(e.id))
      .map((e, i) => ({ e, s: score(e), i }))
      .sort((a, b) => b.s - a.s || a.i - b.i)
      .slice(0, 3)
      .map((x) => x.e);
  }, [user, progress, catalog]);

  if (!ready || !user) {
    return (
      <div>
        <span className="sr-only">{tr("common.loading")}</span>
        <header aria-hidden className="relative overflow-hidden bg-deep">
          <div className="absolute inset-0 bg-grid text-primary-soft opacity-60" />
          <div className="relative mx-auto max-w-5xl px-4 pt-10 pb-8 sm:pt-14 sm:pb-10">
            <Skeleton className="h-3 w-28 bg-white/15" />
            <Skeleton className="mt-3 h-10 w-3/4 max-w-md bg-white/15 sm:h-12" />
            <div className="mt-6">
              <StatsSkeleton />
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-5xl px-4">
          <CardsSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow={
          <span className="inline-flex items-center gap-1.5">
            <NotebookPen className="size-3.5" />
            {tr("dash.title")}
            {user.grade ? ` · ${tr("experiments.grade")} ${user.grade}` : ""}
          </span>
        }
        title={
          <>
            {tr("dash.greeting")}, <span className="text-sun">{user.displayName}</span> 👋
          </>
        }
      >
        {loading ? (
          <StatsSkeleton />
        ) : (
          <dl className="grid max-w-lg grid-cols-3 gap-2 sm:gap-3">
            <Stat label={tr("dash.stat.done")} value={completed.length} tone="sun" icon={<Check className="size-4" />} />
            <Stat
              label={tr("dash.stat.inProgress")}
              value={inProgress.length}
              tone="teal"
              icon={<FlaskConical className="size-4" />}
            />
            <Stat
              label={tr("dash.stat.total")}
              value={catalog.length}
              tone="plain"
              icon={<Sparkles className="size-4" />}
            />
          </dl>
        )}
      </PageHeader>

      {loading ? (
        <div className="mx-auto max-w-5xl px-4">
          <span className="sr-only">{tr("common.loading")}</span>
          <CardsSkeleton />
        </div>
      ) : (
        <>
          {inProgress.length > 0 && (
            <section className="mx-auto max-w-5xl px-4 pt-10">
              <SectionTitle eyebrow={tr("dash.stat.inProgress")} title={tr("dash.inProgress")} />
              <CardRow>
                {inProgress.map((p) => {
                  const e = getExperiment(p.experimentId);
                  if (!e) return null;
                  return <ExperimentCard key={e.id} exp={e} tr={tr} cta={tr("dash.continue")} started />;
                })}
              </CardRow>
            </section>
          )}

          <section className="relative mt-10 bg-primary-soft/40">
            <div aria-hidden className="absolute inset-0 bg-dots text-primary opacity-40" />
            <div className="relative mx-auto max-w-5xl px-4 py-10">
              <SectionTitle
                eyebrow={tr("dash.start")}
                title={tr("dash.next")}
                sub={progress.length === 0 ? tr("dash.nextWhyNew") : tr("dash.nextWhy")}
              />
              {suggestions.length === 0 ? (
                <p className="mt-4 rounded-2xl bg-card p-5 text-sm text-muted-foreground shadow-card ring-1 ring-border">
                  {tr("dash.allDone")}
                </p>
              ) : (
                <CardRow>
                  {suggestions.map((e) => (
                    <ExperimentCard key={e.id} exp={e} tr={tr} cta={tr("dash.start")} />
                  ))}
                </CardRow>
              )}
            </div>
          </section>

          <section className="mx-auto max-w-5xl px-4 pt-10">
            <SectionTitle eyebrow={tr("dash.stat.done")} title={tr("dash.completed")} />
            {completed.length === 0 ? (
              <div className="mt-4 flex items-start gap-3 rounded-2xl border-2 border-dashed border-primary/30 bg-card p-5 text-sm text-muted-foreground">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-strong">
                  <NotebookPen className="size-4" />
                </span>
                <p className="leading-relaxed">{tr("dash.noCompleted")}</p>
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {completed.map((p) => {
                  const e = getExperiment(p.experimentId);
                  if (!e) return null;
                  const st = SUBJECT_STYLES[e.subject];
                  return (
                    <li
                      key={e.id}
                      className="relative overflow-hidden rounded-2xl bg-card p-4 pl-5 shadow-card ring-1 ring-border sm:p-5 sm:pl-6"
                    >
                      <span aria-hidden className={cn("absolute inset-y-0 left-0 w-1.5", st.bg)} />
                      <div className="flex items-start gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-biology-soft text-biology ring-4 ring-biology-soft/40">
                          <Check className="size-5" strokeWidth={3} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <SubjectLabel subject={e.subject} />
                            <span className="text-xs text-subtle-foreground">
                              {tr("experiments.grade")} {e.grade}
                              {p.completedAt ? ` · ${new Date(p.completedAt).toLocaleDateString()}` : ""}
                            </span>
                          </div>
                          <Link
                            href={`/experiments/${e.id}#notebook`}
                            className="mt-1 inline-flex min-h-8 items-center font-bold text-foreground transition hover:text-primary-strong"
                          >
                            {e.title}
                          </Link>
                          {p.observations ? (
                            <p className="mt-2 rounded-xl bg-muted/60 px-3 py-2 text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                              {p.observations}
                            </p>
                          ) : (
                            <p className="mt-1 text-xs text-subtle-foreground italic">{tr("dash.noNotes")}</p>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </>
      )}

      <div className="mx-auto max-w-5xl px-4 pt-10 pb-16">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button asChild size="lg" className="font-semibold">
            <Link href="/experiments">
              {tr("dash.browse")} <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="soft" className="font-semibold">
            <Link href="/chat">
              <MessageCircle /> {tr("dash.askAssistant")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div>
      <p className="text-xs font-bold tracking-[0.18em] text-primary uppercase">{eyebrow}</p>
      <h2 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
      {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
    </div>
  );
}

/** Phones: a swipeable row. Wider screens: a three-column grid. */
function CardRow({ children }: { children: React.ReactNode }) {
  return (
    <ul className="-mx-4 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-1 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-1 lg:grid-cols-3">
      {children}
    </ul>
  );
}

const STAT_TONES = {
  sun: { tile: "bg-sun text-deep", label: "text-deep/75", icon: "bg-deep/10" },
  teal: { tile: "bg-primary text-primary-foreground", label: "text-primary-foreground/80", icon: "bg-white/15" },
  plain: { tile: "bg-white/10 text-deep-foreground ring-1 ring-white/15", label: "text-deep-foreground/70", icon: "bg-white/10" },
} as const;

function Stat({
  label,
  value,
  tone,
  icon,
}: {
  label: string;
  value: number;
  tone: keyof typeof STAT_TONES;
  icon: React.ReactNode;
}) {
  const t = STAT_TONES[tone];
  return (
    // dt/dd sit directly in the tile's div so the <dl> markup stays valid (dl > div > dt + dd).
    <div className={cn("flex flex-col-reverse rounded-2xl p-3 shadow-soft sm:p-4", t.tile)}>
      <dt className={cn("mt-0.5 text-[11px] leading-tight font-semibold tracking-wider uppercase", t.label)}>{label}</dt>
      <dd className="flex items-end justify-between gap-1">
        <span className="font-heading text-3xl leading-none font-extrabold tabular-nums sm:text-4xl">{value}</span>
        <span aria-hidden className={cn("hidden size-7 items-center justify-center rounded-full sm:flex", t.icon)}>
          {icon}
        </span>
      </dd>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div aria-hidden className="grid max-w-lg grid-cols-3 gap-2 sm:gap-3">
      {[0, 1, 2].map((i) => (
        <Skeleton key={i} className="h-[76px] rounded-2xl bg-white/15 sm:h-[92px]" />
      ))}
    </div>
  );
}

/** Placeholder while progress loads: a section title + a row of cards. */
function CardsSkeleton() {
  return (
    <div aria-hidden className="pt-10">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="mt-2 h-7 w-56" />
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-44 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

function ExperimentCard({ exp, tr, cta, started }: { exp: CatalogItem; tr: Tr; cta: string; started?: boolean }) {
  const st = SUBJECT_STYLES[exp.subject];
  return (
    <li className="w-[80%] shrink-0 snap-start sm:w-auto">
      <Link
        href={`/experiments/${exp.id}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card p-5 shadow-card ring-1 ring-border transition hover:-translate-y-1 hover:shadow-pop focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        <span aria-hidden className={cn("absolute inset-x-0 top-0 h-1.5", st.bg)} />
        <div className="flex items-start justify-between gap-3">
          <SubjectTile subject={exp.subject} />
          <Badge variant="outline" className="text-muted-foreground">
            {tr("experiments.grade")} {exp.grade}
          </Badge>
        </div>
        <h3 className="mt-4 text-lg leading-snug font-bold group-hover:text-primary-strong">{exp.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{exp.summary}</p>
        <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" /> {exp.estimatedMinutes} {tr("experiments.minutes")}
          </span>
          <span className={cn("flex items-center gap-1 text-sm font-semibold", st.text)}>
            {cta}
            <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </li>
  );
}
