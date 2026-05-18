"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { SUBJECTS, lessonsBySubject, type Subject } from "@/lib/lessons";
import { apiBumpMastery } from "@/lib/api";

type MockQ = { q: string; choices: string[]; answerIndex: number; explanation: string; topic: string };

export default function MockTestPage() {
  const params = useParams<{ subject: string }>();
  const subject = params.subject as Subject;
  const subjectMeta = SUBJECTS.find((s) => s.id === subject);

  const { tr, locale } = useLocale();
  const { user, ready } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user) router.push("/login");
  }, [ready, user, router]);

  const questions: MockQ[] = useMemo(() => {
    if (!subjectMeta) return [];
    const bank: MockQ[] = [];
    for (const lesson of lessonsBySubject(subject)) {
      for (const q of lesson.quiz) {
        bank.push({ ...q, topic: lesson.eueeTopics[0] });
      }
    }
    return shuffle(bank).slice(0, 10);
  }, [subject, subjectMeta]);

  const [phase, setPhase] = useState<"intro" | "running" | "done">("intro");
  const [cur, setCur] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  if (!subjectMeta) return <div className="max-w-2xl mx-auto px-4 py-10 text-ink-muted">{tr("mock.subjectNotFound")}</div>;
  if (!ready || !user) return <div className="max-w-2xl mx-auto px-4 py-10 text-ink-subtle">{tr("common.loading")}</div>;

  if (phase === "intro") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-ink">
          {tr("mock.title")} · {subjectMeta.emoji} {subjectMeta.label[locale]}
        </h1>
        <p className="mt-2 text-ink-muted">{tr("mock.intro")}</p>
        <p className="mt-1 text-sm text-ink-subtle">{questions.length} {tr("mock.questions")}</p>
        <button
          onClick={() => setPhase("running")}
          className="mt-6 px-5 py-2.5 bg-brand text-brand-on rounded-lg hover:bg-brand-hover font-medium shadow-soft transition"
        >
          {tr("mock.start")} →
        </button>
      </div>
    );
  }

  if (phase === "running") {
    const q = questions[cur];
    const isLast = cur + 1 >= questions.length;
    function commit() {
      if (selected === null) return;
      const newAnswers = [...answers, selected];
      setAnswers(newAnswers);
      apiBumpMastery(subject, q.topic, selected === q.answerIndex ? 6 : -3).catch(() => {});
      setSelected(null);
      if (isLast) {
        setPhase("done");
      } else {
        setCur(cur + 1);
      }
    }
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between text-sm text-ink-muted">
          <span>{subjectMeta.emoji} {subjectMeta.label[locale]}</span>
          <span className="tabular-nums">{tr("mock.question")} {cur + 1} {tr("mock.of")} {questions.length}</span>
        </div>
        <div className="mt-3 h-1.5 bg-surface-2 rounded overflow-hidden">
          <div className="h-full bg-brand rounded transition-all" style={{ width: `${((cur + 1) / questions.length) * 100}%` }} />
        </div>
        <div className="mt-6 rounded-xl border border-line bg-surface p-5 shadow-soft">
          <p className="text-xs text-brand font-semibold uppercase tracking-wide">{q.topic}</p>
          <p className="mt-2 font-medium text-ink">{q.q}</p>
          <div className="mt-4 grid gap-2">
            {q.choices.map((c, i) => {
              const isSelected = selected === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  aria-pressed={isSelected}
                  className={
                    "text-left text-sm px-3.5 py-2.5 rounded-lg border transition " +
                    (isSelected
                      ? "border-brand bg-brand-soft/50 text-ink"
                      : "border-line bg-surface text-ink hover:border-brand/60 hover:bg-brand-soft/30")
                  }
                >
                  {c}
                </button>
              );
            })}
          </div>
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={commit}
              disabled={selected === null}
              className="px-5 py-2 bg-brand text-brand-on rounded-lg hover:bg-brand-hover disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium shadow-soft transition"
            >
              {isLast ? tr("mock.submit") : tr("mock.next") + " →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const correct = questions.filter((q, i) => answers[i] === q.answerIndex).length;
  const byTopic = new Map<string, { right: number; total: number }>();
  for (const [i, q] of questions.entries()) {
    const t = byTopic.get(q.topic) || { right: 0, total: 0 };
    t.total++;
    if (answers[i] === q.answerIndex) t.right++;
    byTopic.set(q.topic, t);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-ink tabular-nums">
        {tr("mock.score")}: {correct} / {questions.length}
      </h1>
      <div className="mt-3 h-3 bg-surface-2 rounded overflow-hidden">
        <div className="h-full bg-emerald-500 rounded" style={{ width: `${(correct / questions.length) * 100}%` }} />
      </div>

      <h2 className="mt-10 font-semibold text-ink text-lg tracking-tight">{tr("mock.byTopic")}</h2>
      <ul className="mt-3 space-y-2">
        {Array.from(byTopic.entries()).map(([topic, stat]) => (
          <li key={topic} className="flex justify-between text-sm">
            <span className="text-ink">{topic}</span>
            <span className="text-ink-muted tabular-nums">{stat.right} / {stat.total}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 font-semibold text-ink text-lg tracking-tight">{tr("mock.review")}</h2>
      <ul className="mt-3 space-y-3">
        {questions.map((q, i) => {
          const wasRight = answers[i] === q.answerIndex;
          return (
            <li key={i} className="rounded-xl border border-line bg-surface p-4 text-sm shadow-soft">
              <p className="font-medium text-ink">{i + 1}. {q.q}</p>
              <p className="mt-1 text-ink-muted">
                {tr("mock.yourAnswer")}:{" "}
                <span className={wasRight ? "text-emerald-700 dark:text-emerald-400 font-medium" : "text-red-700 dark:text-red-400 font-medium"}>
                  {q.choices[answers[i]]}
                </span>
                {!wasRight && (
                  <>
                    {" · " + tr("mock.correctAnswer") + ": "}
                    <span className="text-emerald-700 dark:text-emerald-400 font-medium">{q.choices[q.answerIndex]}</span>
                  </>
                )}
              </p>
              <p className="mt-1 text-xs text-ink-subtle">{q.explanation}</p>
            </li>
          );
        })}
      </ul>

      <div className="mt-10 flex gap-3">
        <button
          onClick={() => { setPhase("intro"); setCur(0); setAnswers([]); setSelected(null); }}
          className="px-4 py-2 bg-brand text-brand-on rounded-lg hover:bg-brand-hover text-sm font-medium shadow-soft transition"
        >
          {tr("mock.again")}
        </button>
        <Link
          href="/dashboard"
          className="px-4 py-2 border border-line bg-surface rounded-lg text-sm hover:border-brand/60 text-ink transition"
        >
          {tr("nav.dashboard")}
        </Link>
      </div>
    </div>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
