"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { SUBJECTS, lessonsBySubject, type Subject } from "@/lib/lessons";
import { bumpMastery } from "@/lib/store";

type MockQ = { q: string; choices: string[]; answerIndex: number; explanation: string; topic: string };

export default function MockTestPage() {
  const params = useParams<{ subject: string }>();
  const subject = params.subject as Subject;
  const subjectMeta = SUBJECTS.find((s) => s.id === subject);

  const { tr, locale } = useLocale();
  const { user, refresh, ready } = useUser();
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

  if (!subjectMeta) {
    return <div className="max-w-2xl mx-auto px-4 py-10">Subject not found.</div>;
  }
  if (!ready || !user) {
    return <div className="max-w-2xl mx-auto px-4 py-10 text-stone-500">{tr("common.loading")}</div>;
  }

  if (phase === "intro") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-stone-900">
          {tr("mock.title")} · {subjectMeta.emoji} {subjectMeta.label[locale]}
        </h1>
        <p className="mt-2 text-stone-600">{tr("mock.intro")}</p>
        <p className="mt-1 text-sm text-stone-500">{questions.length} questions</p>
        <button
          onClick={() => setPhase("running")}
          className="mt-6 px-5 py-2.5 bg-brand text-white rounded-md hover:bg-brand-dark font-medium"
        >
          {tr("mock.start")} →
        </button>
      </div>
    );
  }

  if (phase === "running") {
    const q = questions[cur];
    function submit(i: number) {
      const newAnswers = [...answers, i];
      setAnswers(newAnswers);
      bumpMastery(subject, q.topic, i === q.answerIndex ? 6 : -3);
      refresh();
      if (cur + 1 < questions.length) {
        setCur(cur + 1);
      } else {
        setPhase("done");
      }
    }
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between text-sm text-stone-500">
          <span>
            {subjectMeta.emoji} {subjectMeta.label[locale]}
          </span>
          <span>
            {tr("mock.question")} {cur + 1} {tr("mock.of")} {questions.length}
          </span>
        </div>
        <div className="mt-3 h-1.5 bg-stone-100 rounded">
          <div className="h-full bg-brand rounded transition-all" style={{ width: `${((cur + 1) / questions.length) * 100}%` }} />
        </div>
        <div className="mt-6 rounded-lg border border-stone-200 bg-white p-5">
          <p className="text-xs text-brand font-medium uppercase">{q.topic}</p>
          <p className="mt-2 font-medium text-stone-900">{q.q}</p>
          <div className="mt-4 grid gap-2">
            {q.choices.map((c, i) => (
              <button
                key={i}
                onClick={() => submit(i)}
                className="text-left text-sm px-3 py-2.5 rounded border border-stone-200 hover:border-brand"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // done
  const correct = questions.filter((q, i) => answers[i] === q.answerIndex).length;
  const byTopic = new Map<string, { right: number; total: number }>();
  for (const [i, q] of questions.entries()) {
    const t = byTopic.get(q.topic) || { right: 0, total: 0 };
    t.total++;
    if (answers[i] === q.answerIndex) t.right++;
    byTopic.set(q.topic, t);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-stone-900">
        {tr("mock.score")}: {correct} / {questions.length}
      </h1>
      <div className="mt-3 h-3 bg-stone-100 rounded">
        <div
          className="h-full bg-emerald-500 rounded"
          style={{ width: `${(correct / questions.length) * 100}%` }}
        />
      </div>

      <h2 className="mt-8 font-semibold text-stone-900">By topic</h2>
      <ul className="mt-3 space-y-2">
        {Array.from(byTopic.entries()).map(([topic, stat]) => (
          <li key={topic} className="flex justify-between text-sm">
            <span className="text-stone-700">{topic}</span>
            <span className="text-stone-500">{stat.right} / {stat.total}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-8 font-semibold text-stone-900">{tr("mock.review")}</h2>
      <ul className="mt-3 space-y-3">
        {questions.map((q, i) => {
          const wasRight = answers[i] === q.answerIndex;
          return (
            <li key={i} className="rounded border border-stone-200 bg-white p-3 text-sm">
              <p className="font-medium text-stone-900">{i + 1}. {q.q}</p>
              <p className="mt-1 text-stone-600">
                Your answer: <span className={wasRight ? "text-emerald-700" : "text-red-700"}>{q.choices[answers[i]]}</span>
                {!wasRight && <> · Correct: <span className="text-emerald-700">{q.choices[q.answerIndex]}</span></>}
              </p>
              <p className="mt-1 text-xs text-stone-500">{q.explanation}</p>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex gap-3">
        <button
          onClick={() => { setPhase("intro"); setCur(0); setAnswers([]); }}
          className="px-4 py-2 bg-brand text-white rounded-md hover:bg-brand-dark text-sm"
        >
          {tr("mock.again")}
        </button>
        <Link href="/dashboard" className="px-4 py-2 border border-stone-300 rounded-md text-sm hover:border-brand">
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
