"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { subjectMeta, type CatalogItem } from "@/lib/subjects";
import { apiGetProgress, type ProgressDTO } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      <div className="max-w-5xl mx-auto px-4 py-12">
        <span className="sr-only">{tr("common.loading")}</span>
        <Skeleton className="h-10 w-3/4 max-w-md sm:h-12" />
        <Skeleton className="mt-3 h-4 w-40" />
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
        {tr("dash.greeting")}, {user.displayName} 👋
      </h1>
      <p className="text-muted-foreground mt-1.5 text-sm">
        {tr("dash.title")}
        {user.grade ? ` · ${tr("experiments.grade")} ${user.grade}` : ""}
      </p>

      {!loading && (
        <dl className="mt-6 grid grid-cols-3 gap-3 max-w-md">
          <Stat label={tr("dash.stat.done")} value={completed.length} />
          <Stat label={tr("dash.stat.inProgress")} value={inProgress.length} />
          <Stat label={tr("dash.stat.total")} value={catalog.length} />
        </dl>
      )}

      {loading ? (
        <>
          <span className="sr-only">{tr("common.loading")}</span>
          <DashboardSkeleton />
        </>
      ) : (
        <>
          {inProgress.length > 0 && (
            <section className="mt-10">
              <h2 className="font-semibold text-foreground text-lg tracking-tight">{tr("dash.inProgress")}</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {inProgress.map((p) => {
                  const e = getExperiment(p.experimentId);
                  if (!e) return null;
                  return <ExperimentCard key={e.id} exp={e} tr={tr} cta={tr("dash.continue")} />;
                })}
              </div>
            </section>
          )}

          <section className="mt-10">
            <h2 className="font-semibold text-foreground text-lg tracking-tight">{tr("dash.next")}</h2>
            <p className="text-xs text-subtle-foreground mt-0.5">
              {progress.length === 0 ? tr("dash.nextWhyNew") : tr("dash.nextWhy")}
            </p>
            {suggestions.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">{tr("dash.allDone")}</p>
            ) : (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {suggestions.map((e) => (
                  <ExperimentCard key={e.id} exp={e} tr={tr} cta={tr("dash.start")} />
                ))}
              </div>
            )}
          </section>

          <section className="mt-12">
            <h2 className="font-semibold text-foreground text-lg tracking-tight">{tr("dash.completed")}</h2>
            {completed.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">{tr("dash.noCompleted")}</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {completed.map((p) => {
                  const e = getExperiment(p.experimentId);
                  if (!e) return null;
                  const s = subjectMeta(e.subject);
                  return (
                    <li key={e.id}>
                      <Card className="shadow-soft">
                      <CardContent>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <Link href={`/experiments/${e.id}#notebook`} className="font-semibold text-foreground hover:text-primary transition">
                          {e.title}
                        </Link>
                        <span className="text-xs text-subtle-foreground">
                          {tr("experiments.grade")} {e.grade} · {s.emoji} {s.label}
                          {p.completedAt ? ` · ${new Date(p.completedAt).toLocaleDateString()}` : ""}
                        </span>
                      </div>
                      {p.observations ? (
                        <p className="mt-2 text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{p.observations}</p>
                      ) : (
                        <p className="mt-2 text-xs text-subtle-foreground italic">{tr("dash.noNotes")}</p>
                      )}
                      </CardContent>
                      </Card>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </>
      )}

      <div className="mt-12 flex flex-wrap gap-2">
        <Button asChild>
          <Link href="/experiments">{tr("dash.browse")} →</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/chat">{tr("dash.askAssistant")}</Link>
        </Button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    // dt/dd sit directly in the Card's div so the <dl> markup stays valid (dl > div > dt + dd).
    <Card size="sm" className="gap-0 px-3 py-2.5 shadow-soft">
      <dt className="text-[11px] uppercase tracking-wider text-subtle-foreground font-semibold">{label}</dt>
      <dd className="text-2xl font-extrabold text-foreground tabular-nums">{value}</dd>
    </Card>
  );
}

/** Placeholder layout while progress loads: stat tiles + a row of cards. */
function DashboardSkeleton() {
  return (
    <div aria-hidden>
      <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>
      <Skeleton className="mt-10 h-5 w-32" />
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function ExperimentCard({ exp, tr, cta }: { exp: CatalogItem; tr: Tr; cta: string }) {
  const s = subjectMeta(exp.subject);
  return (
    <Link
      href={`/experiments/${exp.id}`}
      className="group block rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Card className="h-full shadow-soft ring-primary/30 transition group-hover:shadow-card group-hover:ring-primary">
        <CardContent className="flex flex-1 flex-col">
          <div className="text-xs text-primary font-semibold uppercase tracking-wide">
            {tr("experiments.grade")} {exp.grade} · {s.emoji} {s.label}
          </div>
          <div className="font-semibold text-foreground mt-1 text-sm flex-1">{exp.title}</div>
          <div className="text-xs text-subtle-foreground mt-2">
            {exp.estimatedMinutes} {tr("experiments.minutes")} · <span className="text-primary">{cta} →</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
