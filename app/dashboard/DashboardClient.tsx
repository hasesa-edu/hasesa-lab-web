"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { subjectMeta, type CatalogItem } from "@/lib/subjects";
import { apiGetProgress, type ProgressDTO } from "@/lib/api";

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
    return <div className="max-w-3xl mx-auto px-4 py-10 text-ink-subtle">{tr("common.loading")}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-ink">
        {tr("dash.greeting")}, {user.displayName} 👋
      </h1>
      <p className="text-ink-muted mt-1.5 text-sm">
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
        <p className="mt-10 text-sm text-ink-subtle">{tr("common.loading")}</p>
      ) : (
        <>
          {inProgress.length > 0 && (
            <section className="mt-10">
              <h2 className="font-semibold text-ink text-lg tracking-tight">{tr("dash.inProgress")}</h2>
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
            <h2 className="font-semibold text-ink text-lg tracking-tight">{tr("dash.next")}</h2>
            <p className="text-xs text-ink-subtle mt-0.5">
              {progress.length === 0 ? tr("dash.nextWhyNew") : tr("dash.nextWhy")}
            </p>
            {suggestions.length === 0 ? (
              <p className="mt-4 text-sm text-ink-muted">{tr("dash.allDone")}</p>
            ) : (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {suggestions.map((e) => (
                  <ExperimentCard key={e.id} exp={e} tr={tr} cta={tr("dash.start")} />
                ))}
              </div>
            )}
          </section>

          <section className="mt-12">
            <h2 className="font-semibold text-ink text-lg tracking-tight">{tr("dash.completed")}</h2>
            {completed.length === 0 ? (
              <p className="mt-3 text-sm text-ink-muted">{tr("dash.noCompleted")}</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {completed.map((p) => {
                  const e = getExperiment(p.experimentId);
                  if (!e) return null;
                  const s = subjectMeta(e.subject);
                  return (
                    <li key={e.id} className="rounded-xl border border-line bg-surface p-4 shadow-soft">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <Link href={`/experiments/${e.id}#notebook`} className="font-semibold text-ink hover:text-brand transition">
                          {e.title}
                        </Link>
                        <span className="text-xs text-ink-subtle">
                          {tr("experiments.grade")} {e.grade} · {s.emoji} {s.label}
                          {p.completedAt ? ` · ${new Date(p.completedAt).toLocaleDateString()}` : ""}
                        </span>
                      </div>
                      {p.observations ? (
                        <p className="mt-2 text-sm text-ink-muted whitespace-pre-line leading-relaxed">{p.observations}</p>
                      ) : (
                        <p className="mt-2 text-xs text-ink-subtle italic">{tr("dash.noNotes")}</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </>
      )}

      <div className="mt-12 flex flex-wrap gap-2">
        <Link
          href="/experiments"
          className="inline-flex items-center px-4 py-2.5 bg-brand text-brand-on rounded-lg hover:bg-brand-hover text-sm font-medium shadow-soft transition"
        >
          {tr("dash.browse")} →
        </Link>
        <Link
          href="/chat"
          className="inline-flex items-center px-4 py-2.5 rounded-lg border border-line bg-surface text-sm font-medium text-ink hover:border-brand/60 transition"
        >
          {tr("dash.askAssistant")}
        </Link>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-line bg-surface px-3 py-2.5 shadow-soft">
      <dt className="text-[11px] uppercase tracking-wider text-ink-subtle font-semibold">{label}</dt>
      <dd className="text-2xl font-extrabold text-ink tabular-nums">{value}</dd>
    </div>
  );
}

function ExperimentCard({ exp, tr, cta }: { exp: CatalogItem; tr: Tr; cta: string }) {
  const s = subjectMeta(exp.subject);
  return (
    <Link
      href={`/experiments/${exp.id}`}
      className="flex flex-col rounded-xl border border-brand/30 bg-surface p-4 hover:border-brand hover:shadow-card transition shadow-soft"
    >
      <div className="text-xs text-brand font-semibold uppercase tracking-wide">
        {tr("experiments.grade")} {exp.grade} · {s.emoji} {s.label}
      </div>
      <div className="font-semibold text-ink mt-1 text-sm flex-1">{exp.title}</div>
      <div className="text-xs text-ink-subtle mt-2">
        {exp.estimatedMinutes} {tr("experiments.minutes")} · <span className="text-brand">{cta} →</span>
      </div>
    </Link>
  );
}
