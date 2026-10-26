"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GRADES, SUBJECTS, subjectMeta, type CatalogItem, type Grade, type Subject } from "@/lib/subjects";
import { isPlanActive } from "@/lib/billing/plan";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { apiGetProgress, type ProgressDTO } from "@/lib/api";

export function ExperimentsClient({ catalog }: { catalog: CatalogItem[] }) {
  const { tr } = useLocale();
  const { user } = useUser();
  const active = isPlanActive(user?.paidUntil);
  const [grade, setGrade] = useState<Grade | "all">("all");
  const [subject, setSubject] = useState<Subject | "all">("all");
  const [progress, setProgress] = useState<Record<string, ProgressDTO>>({});

  // Start signed-in students on their own grade.
  useEffect(() => {
    if (user?.grade) setGrade(user.grade);
  }, [user?.grade]);

  useEffect(() => {
    if (!user) {
      setProgress({});
      return;
    }
    apiGetProgress()
      .then((rows) => setProgress(Object.fromEntries(rows.map((r) => [r.experimentId, r]))))
      .catch(() => {});
  }, [user]);

  const filtered = catalog.filter(
    (e) => (grade === "all" || e.grade === grade) && (subject === "all" || e.subject === subject)
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">{tr("experiments.title")}</h1>
      <p className="text-muted-foreground mt-2 max-w-2xl">{tr("experiments.subtitle")}</p>

      <div className="mt-6 space-y-3">
        <div className="flex flex-wrap gap-2" role="group" aria-label={tr("experiments.filter.grade")}>
          <FilterPill active={grade === "all"} onClick={() => setGrade("all")}>
            {tr("experiments.allGrades")}
          </FilterPill>
          {GRADES.map((g) => (
            <FilterPill key={g} active={grade === g} onClick={() => setGrade(g)}>
              {tr("experiments.grade")} {g}
            </FilterPill>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label={tr("experiments.filter.subject")}>
          <FilterPill active={subject === "all"} onClick={() => setSubject("all")}>
            {tr("experiments.allSubjects")}
          </FilterPill>
          {SUBJECTS.map((s) => (
            <FilterPill key={s.id} active={subject === s.id} onClick={() => setSubject(s.id)}>
              <span className="mr-1">{s.emoji}</span>
              {s.label}
            </FilterPill>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-muted-foreground">{tr("experiments.none")}</p>
      ) : (
        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((exp) => {
            const s = subjectMeta(exp.subject);
            const status = progress[exp.id]?.status;
            return (
              <li key={exp.id}>
                <Link
                  href={`/experiments/${exp.id}`}
                  className="block rounded-xl border border-border bg-card p-5 hover:border-primary/60 hover:shadow-card transition h-full shadow-soft"
                >
                  <div className="flex items-center justify-between gap-3 text-xs text-subtle-foreground">
                    <span className="uppercase tracking-wide font-semibold text-primary">
                      {tr("experiments.grade")} {exp.grade} · {s.emoji} {s.label}
                    </span>
                    <span className="shrink-0">
                      {exp.estimatedMinutes} {tr("experiments.minutes")}
                    </span>
                  </div>
                  <h2 className="mt-2 text-lg font-semibold text-foreground tracking-tight">{exp.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-3">{exp.summary}</p>

                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    {status === "done" && (
                      <Badge tone="done">
                        <span>✓</span>
                        <span>{tr("experiments.badge.done")}</span>
                      </Badge>
                    )}
                    {status === "started" && (
                      <Badge tone="started">
                        <span>◐</span>
                        <span>{tr("experiments.badge.started")}</span>
                      </Badge>
                    )}
                    {exp.free && !active && (
                      <Badge tone="done">
                        <span>🎁</span>
                        <span>{tr("experiments.free")}</span>
                      </Badge>
                    )}
                    {!exp.free && !active && (
                      <Badge>
                        <span>🔒</span>
                        <span>{tr("experiments.locked")}</span>
                      </Badge>
                    )}
                    {exp.hasVideo && (
                      <Badge>
                        <span>🎥</span>
                        <span>{tr("experiments.badge.video")}</span>
                      </Badge>
                    )}
                    <Badge>
                      <span>{exp.difficulty === "easy" ? "🟢" : "🟠"}</span>
                      <span>{tr(exp.difficulty === "easy" ? "experiments.easy" : "experiments.medium")}</span>
                    </Badge>
                    <Badge>
                      <span>🧰</span>
                      <span>
                        {exp.materialsCount} {tr("experiments.badge.materials")}
                      </span>
                    </Badge>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Badge({ children, tone }: { children: React.ReactNode; tone?: "done" | "started" }) {
  const cls =
    tone === "done"
      ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
      : tone === "started"
        ? "border-amber-300 bg-sun-soft text-amber-800 dark:border-amber-800 dark:text-amber-200"
        : "border-border bg-muted text-muted-foreground";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${cls}`}>
      {children}
    </span>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={
        "px-3.5 py-1.5 text-sm rounded-full border transition font-medium " +
        (active
          ? "bg-primary text-primary-foreground border-primary shadow-soft"
          : "bg-card text-muted-foreground border-border hover:border-primary/60 hover:text-foreground")
      }
    >
      {children}
    </button>
  );
}
