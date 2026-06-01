"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import type { Locale } from "@/lib/i18n";
import { useUser } from "@/components/UserProvider";
import {
  SUBJECTS,
  allTopicsForSubject,
  getLesson,
  type Subject,
} from "@/lib/lessons";
import { apiGetMastery } from "@/lib/api";

export default function DashboardPage() {
  const { tr, locale } = useLocale();
  const { user, ready } = useUser();
  const router = useRouter();
  const [mastery, setMastery] = useState<Record<string, Record<string, number>>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ready && !user) router.push("/login");
    if (ready && user && user.role === "teacher") router.push("/teacher");
  }, [ready, user, router]);

  useEffect(() => {
    if (user) {
      apiGetMastery()
        .then(setMastery)
        .finally(() => setLoading(false));
    }
  }, [user]);

  const recommendations = useMemo(() => {
    if (!user) return [];
    const scored: { lessonId: string; topic: string; subject: Subject; mastery: number; weight: number; priority: number }[] = [];
    for (const subject of user.subjects) {
      for (const t of allTopicsForSubject(subject)) {
        const m = mastery[subject]?.[t.topic] ?? 50;
        const priority = (100 - m) * t.weight;
        scored.push({ lessonId: t.lessonId, topic: t.topic, subject, mastery: m, weight: t.weight, priority });
      }
    }
    scored.sort((a, b) => b.priority - a.priority);
    const seen = new Set<string>();
    const out: typeof scored = [];
    for (const s of scored) {
      if (seen.has(s.lessonId)) continue;
      seen.add(s.lessonId);
      out.push(s);
      if (out.length >= 3) break;
    }
    return out;
  }, [user, mastery]);

  if (!ready || !user) {
    return <div className="max-w-3xl mx-auto px-4 py-10 text-ink-subtle">{tr("common.loading")}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-ink">
        {tr("dash.greeting")}, {user.displayName} 👋
      </h1>
      <p className="text-ink-muted mt-1.5 text-sm">{tr("dash.title")}</p>

      <section className="mt-10">
        <h2 className="font-semibold text-ink text-lg tracking-tight">{tr("dash.recommended")}</h2>
        <p className="text-xs text-ink-subtle mt-0.5">{tr("dash.recommendedWhy")}</p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {loading ? (
            <p className="text-sm text-ink-subtle col-span-3">{tr("common.loading")}</p>
          ) : recommendations.length === 0 ? (
            <p className="text-sm text-ink-subtle col-span-3">{tr("dash.noActivity")}</p>
          ) : (
            recommendations.map((r) => {
              const lesson = getLesson(r.lessonId)!;
              const subject = SUBJECTS.find((s) => s.id === r.subject)!;
              return (
                <Link
                  key={r.lessonId}
                  href={`/lessons/${r.lessonId}`}
                  className="block rounded-xl border border-brand/30 bg-surface p-4 hover:border-brand hover:shadow-card transition shadow-soft"
                >
                  <div className="text-xs text-brand font-semibold uppercase tracking-wide">
                    {subject.emoji} {subject.label[locale]}
                  </div>
                  <div className="font-semibold text-ink mt-1 text-sm">{lesson.title[locale]}</div>
                  <div className="text-xs text-ink-subtle mt-2">
                    {r.topic} · {tr("dash.mastery").toLowerCase()}: {r.mastery}/100
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-semibold text-ink text-lg tracking-tight">{tr("dash.mastery")}</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {user.subjects.map((s) => (
            <MasterySubjectCard key={s} subject={s} mastery={mastery} locale={locale} tr={tr} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-semibold text-ink text-lg tracking-tight">{tr("dash.takeMock")}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {user.subjects.map((s) => {
            const subject = SUBJECTS.find((x) => x.id === s)!;
            return (
              <Link
                key={s}
                href={`/mock/${s}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm rounded-lg border border-line hover:border-brand/60 bg-surface text-ink hover:text-brand transition font-medium"
              >
                <span>{subject.emoji}</span>
                {subject.label[locale]}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function MasterySubjectCard({
  subject,
  mastery,
  locale,
  tr,
}: {
  subject: Subject;
  mastery: Record<string, Record<string, number>>;
  locale: Locale;
  tr: (k: any) => string;
}) {
  const meta = SUBJECTS.find((s) => s.id === subject)!;
  const topics = allTopicsForSubject(subject);
  const avg = topics.length
    ? Math.round(topics.reduce((acc, t) => acc + (mastery[subject]?.[t.topic] ?? 50), 0) / topics.length)
    : 0;
  return (
    <div className="rounded-xl border border-line bg-surface p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-ink">
          {meta.emoji} {meta.label[locale]}
        </h3>
        <span className="text-sm text-ink-muted tabular-nums">{avg}/100</span>
      </div>
      <ul className="mt-3 space-y-2">
        {topics.map((t) => {
          const m = mastery[subject]?.[t.topic] ?? 50;
          return (
            <li key={t.topic}>
              <div className="flex justify-between text-xs text-ink-muted">
                <span>{t.topic}</span>
                <span className="tabular-nums">{m}</span>
              </div>
              <div className="mt-1 h-1.5 bg-surface-2 rounded overflow-hidden">
                <div
                  className={
                    "h-full transition-all " +
                    (m >= 70 ? "bg-emerald-500" : m >= 40 ? "bg-amber-500" : "bg-red-500")
                  }
                  style={{ width: `${m}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
