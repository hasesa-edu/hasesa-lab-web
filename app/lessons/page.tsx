"use client";

import Link from "next/link";
import { useState } from "react";
import { LESSONS, SUBJECTS, type Subject } from "@/lib/lessons";
import { useLocale } from "@/components/LocaleProvider";

export default function LessonsPage() {
  const { locale, tr } = useLocale();
  const [filter, setFilter] = useState<Subject | "all">("all");
  const filtered = filter === "all" ? LESSONS : LESSONS.filter((l) => l.subject === filter);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-ink">
        {tr("lessons.title")}
      </h1>
      <p className="text-ink-muted mt-2 max-w-2xl">{tr("lessons.subtitle")}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>
          {tr("lessons.all")}
        </FilterPill>
        {SUBJECTS.map((s) => (
          <FilterPill key={s.id} active={filter === s.id} onClick={() => setFilter(s.id)}>
            <span className="mr-1">{s.emoji}</span>
            {s.label[locale]}
          </FilterPill>
        ))}
      </div>

      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((lesson) => {
          const subject = SUBJECTS.find((s) => s.id === lesson.subject)!;
          return (
            <li key={lesson.id}>
              <Link
                href={`/lessons/${lesson.id}`}
                className="block rounded-xl border border-line bg-surface p-5 hover:border-brand/60 hover:shadow-card transition h-full shadow-soft"
              >
                <div className="flex items-center justify-between text-xs text-ink-subtle">
                  <span className="uppercase tracking-wide font-semibold text-brand">
                    {subject.emoji} {subject.label[locale]} · {lesson.unit[locale]}
                  </span>
                  <span>
                    {lesson.estimatedMinutes} {tr("lessons.estimate")}
                  </span>
                </div>
                <h2 className="mt-2 text-lg font-semibold text-ink tracking-tight">
                  {lesson.title[locale]}
                </h2>
                <p className="mt-1 text-sm text-ink-muted leading-relaxed line-clamp-3">
                  {lesson.summary[locale]}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  {lesson.video && (
                    <Badge title={tr("lessons.badge.videoTitle")}>
                      <span>🎥</span>
                      <span>{tr("lessons.badge.video")}</span>
                    </Badge>
                  )}
                  <Badge title={tr("lessons.badge.experimentTitle")}>
                    <span>🧪</span>
                    <span>{tr("lessons.badge.experiment")}</span>
                  </Badge>
                  <Badge title={`${lesson.quiz.length} ${tr("lessons.badge.quizTitle")}`}>
                    <span>✏️</span>
                    <span>{lesson.quiz.length} {tr("lessons.badge.quiz")}</span>
                  </Badge>
                </div>

                <div className="mt-3 text-xs text-ink-subtle">
                  {tr("lessons.code")}:{" "}
                  <code className="text-ink-muted bg-surface-2 px-1.5 py-0.5 rounded">
                    {lesson.moeCode}
                  </code>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Badge({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <span
      title={title}
      className="inline-flex items-center gap-1 rounded-full border border-line bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-ink-muted"
    >
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
      className={
        "px-3.5 py-1.5 text-sm rounded-full border transition font-medium " +
        (active
          ? "bg-brand text-brand-on border-brand shadow-soft"
          : "bg-surface text-ink-muted border-line hover:border-brand/60 hover:text-ink")
      }
    >
      {children}
    </button>
  );
}
