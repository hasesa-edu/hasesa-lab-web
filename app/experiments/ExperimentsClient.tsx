"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GRADES, SUBJECTS, subjectMeta, type CatalogItem, type Grade, type Subject } from "@/lib/subjects";
import { isPlanActive } from "@/lib/billing/plan";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { apiGetProgress, type ProgressDTO } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
        <ToggleGroup
          type="single"
          value={String(grade)}
          onValueChange={(v) => v && setGrade(v === "all" ? "all" : (Number(v) as Grade))}
          aria-label={tr("experiments.filter.grade")}
          className="flex-wrap"
        >
          <FilterPill value="all">{tr("experiments.allGrades")}</FilterPill>
          {GRADES.map((g) => (
            <FilterPill key={g} value={String(g)}>
              {tr("experiments.grade")} {g}
            </FilterPill>
          ))}
        </ToggleGroup>
        <ToggleGroup
          type="single"
          value={subject}
          onValueChange={(v) => v && setSubject(v as Subject | "all")}
          aria-label={tr("experiments.filter.subject")}
          className="flex-wrap"
        >
          <FilterPill value="all">{tr("experiments.allSubjects")}</FilterPill>
          {SUBJECTS.map((s) => (
            <FilterPill key={s.id} value={s.id}>
              <span>{s.emoji}</span>
              {s.label}
            </FilterPill>
          ))}
        </ToggleGroup>
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
                  className="group block h-full rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <Card className="h-full shadow-soft transition group-hover:shadow-card group-hover:ring-primary/60">
                    <CardHeader>
                      <div className="flex items-center justify-between gap-3 text-xs text-subtle-foreground">
                        <span className="uppercase tracking-wide font-semibold text-primary">
                          {tr("experiments.grade")} {exp.grade} · {s.emoji} {s.label}
                        </span>
                        <span className="shrink-0">
                          {exp.estimatedMinutes} {tr("experiments.minutes")}
                        </span>
                      </div>
                      <h2 className="mt-1 text-lg font-semibold text-foreground tracking-tight">{exp.title}</h2>
                      <CardDescription className="leading-relaxed line-clamp-3">{exp.summary}</CardDescription>
                    </CardHeader>

                    <CardContent className="mt-auto flex flex-wrap items-center gap-1.5">
                      {status === "done" && (
                        <StatusBadge tone="done">
                          <span>✓</span>
                          <span>{tr("experiments.badge.done")}</span>
                        </StatusBadge>
                      )}
                      {status === "started" && (
                        <StatusBadge tone="started">
                          <span>◐</span>
                          <span>{tr("experiments.badge.started")}</span>
                        </StatusBadge>
                      )}
                      {exp.free && !active && (
                        <StatusBadge tone="done">
                          <span>🎁</span>
                          <span>{tr("experiments.free")}</span>
                        </StatusBadge>
                      )}
                      {!exp.free && !active && (
                        <StatusBadge>
                          <span>🔒</span>
                          <span>{tr("experiments.locked")}</span>
                        </StatusBadge>
                      )}
                      {exp.hasVideo && (
                        <StatusBadge>
                          <span>🎥</span>
                          <span>{tr("experiments.badge.video")}</span>
                        </StatusBadge>
                      )}
                      <StatusBadge>
                        <span>{exp.difficulty === "easy" ? "🟢" : "🟠"}</span>
                        <span>{tr(exp.difficulty === "easy" ? "experiments.easy" : "experiments.medium")}</span>
                      </StatusBadge>
                      <StatusBadge>
                        <span>🧰</span>
                        <span>
                          {exp.materialsCount} {tr("experiments.badge.materials")}
                        </span>
                      </StatusBadge>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function StatusBadge({ children, tone }: { children: React.ReactNode; tone?: "done" | "started" }) {
  if (tone) {
    return <Badge variant={tone === "done" ? "success" : "warning"}>{children}</Badge>;
  }
  return (
    <Badge variant="outline" className="bg-muted text-muted-foreground">
      {children}
    </Badge>
  );
}

function FilterPill({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <ToggleGroupItem
      value={value}
      variant="outline"
      className="h-10 rounded-full border-border bg-card px-4 text-muted-foreground hover:border-primary/60 hover:bg-card hover:text-foreground data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-soft data-[state=on]:hover:bg-primary/90 data-[state=on]:hover:text-primary-foreground"
    >
      {children}
    </ToggleGroupItem>
  );
}
