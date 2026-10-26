"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Check, CircleDashed, Clock, Gift, Lock, Package, CirclePlay } from "lucide-react";
import { GRADES, SUBJECTS, type CatalogItem, type Grade, type Subject } from "@/lib/subjects";
import { isPlanActive } from "@/lib/billing/plan";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { apiGetProgress, type ProgressDTO } from "@/lib/api";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/PageHeader";
import { SUBJECT_STYLES, SubjectIcon, SubjectTile } from "@/components/Subject";
import { Badge } from "@/components/ui/badge";
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
    <div>
      <PageHeader title={tr("experiments.title")} description={tr("experiments.subtitle")}>
        <div className="space-y-2.5">
          <ToggleGroup
            type="single"
            value={String(grade)}
            onValueChange={(v) => v && setGrade(v === "all" ? "all" : (Number(v) as Grade))}
            aria-label={tr("experiments.filter.grade")}
            className={filterRow}
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
            className={filterRow}
          >
            <FilterPill value="all">{tr("experiments.allSubjects")}</FilterPill>
            {SUBJECTS.map((s) => (
              <FilterPill key={s.id} value={s.id}>
                <SubjectIcon subject={s.id} />
                {s.label}
              </FilterPill>
            ))}
          </ToggleGroup>
        </div>
      </PageHeader>

      <div className="relative">
        <div aria-hidden className="absolute inset-x-0 top-0 h-72 bg-dots text-primary opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="relative mx-auto max-w-5xl px-4 py-8 sm:py-10">
          {filtered.length === 0 ? (
            <div className="rounded-2xl bg-card p-8 text-center shadow-card ring-1 ring-border">
              <span className="mx-auto inline-flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary-strong">
                <CircleDashed className="size-6" aria-hidden />
              </span>
              <p className="mt-3 text-muted-foreground">{tr("experiments.none")}</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((exp) => {
                const st = SUBJECT_STYLES[exp.subject];
                const status = progress[exp.id]?.status;
                return (
                  <li key={exp.id}>
                    <Link
                      href={`/experiments/${exp.id}`}
                      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card p-5 pt-6 shadow-card ring-1 ring-border transition hover:-translate-y-1 hover:shadow-pop focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                    >
                      <span aria-hidden className={cn("absolute inset-x-0 top-0 h-1.5", st.bg)} />
                      <div className="flex items-start justify-between gap-3">
                        <SubjectTile subject={exp.subject} />
                        <div className="flex flex-wrap justify-end gap-1.5">
                          {status === "done" && (
                            <Badge variant="success">
                              <Check aria-hidden />
                              {tr("experiments.badge.done")}
                            </Badge>
                          )}
                          {status === "started" && (
                            <Badge variant="warning">
                              <CircleDashed aria-hidden />
                              {tr("experiments.badge.started")}
                            </Badge>
                          )}
                          {exp.free && !active && (
                            <Badge variant="success">
                              <Gift aria-hidden />
                              {tr("experiments.free")}
                            </Badge>
                          )}
                          {!exp.free && !active && (
                            <Badge variant="outline" className="text-muted-foreground">
                              <Lock aria-hidden />
                              {tr("experiments.locked")}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <p className="mt-4 text-xs font-semibold text-subtle-foreground">
                        <span className={st.text}>
                          {tr("experiments.grade")} {exp.grade}
                        </span>{" "}
                        · {exp.unit}
                      </p>
                      <h2 className="mt-1 text-lg leading-snug font-bold text-foreground group-hover:text-primary-strong">
                        {exp.title}
                      </h2>
                      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{exp.summary}</p>

                      <div className="mt-auto flex items-center justify-between gap-3 pt-4 text-xs text-muted-foreground">
                        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="flex items-center gap-1">
                            <Clock aria-hidden className="size-3.5" /> {exp.estimatedMinutes} {tr("experiments.minutes")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Package aria-hidden className="size-3.5" /> {exp.materialsCount} {tr("experiments.badge.materials")}
                          </span>
                          {exp.hasVideo && (
                            <span className="flex items-center gap-1 text-primary-strong">
                              <CirclePlay aria-hidden className="size-3.5" /> {tr("experiments.badge.video")}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <span
                              aria-hidden
                              className={cn("size-2 rounded-full", exp.difficulty === "easy" ? "bg-emerald-500" : "bg-amber-500")}
                            />
                            {tr(exp.difficulty === "easy" ? "experiments.easy" : "experiments.medium")}
                          </span>
                        </span>
                        <ArrowRight aria-hidden className={cn("size-4 shrink-0 transition group-hover:translate-x-1", st.text)} />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterPill({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <ToggleGroupItem
      value={value}
      className="h-10 gap-1.5 rounded-full bg-white/10 px-4 text-deep-foreground ring-1 ring-white/15 hover:bg-white/20 hover:text-deep-foreground data-[state=on]:bg-sun data-[state=on]:font-semibold data-[state=on]:text-deep data-[state=on]:shadow-pop data-[state=on]:ring-sun data-[state=on]:hover:bg-sun/90 data-[state=on]:hover:text-deep"
    >
      {children}
    </ToggleGroupItem>
  );
}

// Phones: one swipeable row per filter. Wider screens: wrap.
const filterRow =
  "-mx-4 w-auto flex-nowrap overflow-x-auto px-4 py-1 [scrollbar-width:none] sm:mx-0 sm:w-fit sm:flex-wrap sm:overflow-visible sm:px-0 after:w-2 after:shrink-0 after:content-[''] sm:after:hidden";
