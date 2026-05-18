"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { getLesson, SUBJECTS } from "@/lib/lessons";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { apiBumpMastery } from "@/lib/api";

type QItem = { q: string; choices: string[]; answerIndex: number; explanation: string };

export default function LessonDetail() {
  const params = useParams<{ id: string }>();
  const lesson = getLesson(params.id);
  const { locale, tr } = useLocale();
  const { user } = useUser();

  const [aiQuestions, setAiQuestions] = useState<QItem[]>([]);
  const [generating, setGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  if (!lesson) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <p className="text-ink-muted">Lesson not found.</p>
        <Link href="/lessons" className="text-brand mt-3 inline-block">{tr("lessons.back")}</Link>
      </div>
    );
  }

  const subject = SUBJECTS.find((s) => s.id === lesson.subject)!;
  const primaryTopic = lesson.eueeTopics[0];

  function onAnswer(correct: boolean) {
    if (!user) return;
    apiBumpMastery(lesson!.subject, primaryTopic, correct ? 6 : -3).catch(() => {});
  }

  async function generateMore() {
    setGenerating(true);
    setAiError(null);
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ lessonId: lesson!.id, count: 3 }),
      });
      const data = await res.json();
      if (!res.ok || !data.questions?.length) {
        throw new Error(data.error || "no questions");
      }
      setAiQuestions((cur) => [...cur, ...data.questions]);
    } catch (e: any) {
      setAiError(e?.message || "Could not generate questions");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/lessons" className="text-sm text-brand hover:underline">{tr("lessons.back")}</Link>

      <header className="mt-3">
        <p className="text-xs uppercase tracking-wider text-brand font-semibold">
          {subject.emoji} {subject.label[locale]} · {lesson.unit[locale]} · {lesson.moeCode}
        </p>
        <h1 className="mt-1.5 text-3xl sm:text-4xl font-bold tracking-tight text-ink leading-tight">
          {lesson.title[locale]}
        </h1>
        <p className="mt-3 text-ink-muted leading-relaxed">{lesson.summary[locale]}</p>
        <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
          {lesson.eueeTopics.map((topic) => (
            <span
              key={topic}
              className="px-2 py-0.5 bg-sun-soft text-amber-800 dark:text-amber-200 rounded font-medium"
            >
              {topic}
            </span>
          ))}
        </div>
      </header>

      {lesson.video && (
        <section className="mt-8">
          <div className="flex items-center justify-between gap-3 mb-2">
            <p className="text-xs uppercase tracking-[0.16em] font-semibold text-brand">
              {tr("video.label")}
            </p>
            <p className="text-xs text-ink-subtle">
              {tr("video.credit")} {lesson.video.credit}
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-line bg-canvas shadow-card aspect-video">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${lesson.video.youtubeId}?rel=0&modestbranding=1`}
              title={lesson.title[locale]}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </section>
      )}

      <div className="prose-edu mt-8">
        {lesson.sections.map((section) => (
          <section key={section.heading.en}>
            <h3>{section.heading[locale]}</h3>
            <p>{renderWithCode(section.body)}</p>
          </section>
        ))}
      </div>

      <section className="mt-8 rounded-xl border border-brand/25 bg-brand-soft/40 p-5">
        <h3 className="font-semibold text-brand-hover dark:text-brand">{tr("quiz.workedEx")}</h3>
        <p className="mt-2 text-ink">
          <strong>{tr("quiz.problem")}</strong> {lesson.workedExample.problem}
        </p>
        <p className="mt-2 text-ink">
          <strong>{tr("quiz.solution")}</strong> {renderWithCode(lesson.workedExample.solution)}
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-line bg-surface p-6 shadow-soft">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-sun-soft text-amber-700 dark:text-amber-200 text-lg">
            🧪
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] font-semibold text-amber-700 dark:text-amber-300">
              {tr("exp.label")}
            </p>
            <h3 className="text-lg font-semibold tracking-tight text-ink">
              {lesson.atHomeExperiment.title[locale]}
            </h3>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-ink-subtle">
              {tr("exp.materials")}
            </h4>
            <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
              {lesson.atHomeExperiment.materials.map((m, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 rounded-full bg-brand shrink-0" />
                  <span className="leading-relaxed">{m[locale]}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-ink-subtle">
              {tr("exp.steps")}
            </h4>
            <ol className="mt-2 space-y-2 text-sm text-ink-muted">
              {lesson.atHomeExperiment.steps.map((s, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-hover dark:text-brand text-[11px] font-bold tabular-nums">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{s[locale]}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-line bg-canvas/40 p-4">
          <h4 className="text-xs uppercase tracking-wider font-semibold text-ink-subtle">
            {tr("exp.observe")}
          </h4>
          <p className="mt-1.5 text-sm text-ink leading-relaxed whitespace-pre-line">
            {lesson.atHomeExperiment.observe[locale]}
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h3 className="font-semibold text-ink text-lg tracking-tight">{tr("quiz.check")}</h3>
        <ul className="mt-3 space-y-5">
          {lesson.quiz.map((q, i) => (
            <QuizItem key={i} question={q} index={i} onAnswer={onAnswer} tr={tr} />
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-ink text-lg tracking-tight">{tr("quiz.generated")}</h3>
          <button
            onClick={generateMore}
            disabled={generating}
            className="text-sm px-3 py-1.5 rounded-lg border border-brand/40 hover:border-brand text-brand-hover dark:text-brand bg-surface disabled:opacity-50 transition"
          >
            {generating ? tr("quiz.generating") : `+ ${tr("quiz.generate")}`}
          </button>
        </div>
        {aiError && <div className="mt-3 text-sm text-red-700 dark:text-red-300">{aiError}</div>}
        <ul className="mt-3 space-y-5">
          {aiQuestions.map((q, i) => (
            <QuizItem key={i} question={q} index={lesson.quiz.length + i} onAnswer={onAnswer} tr={tr} aiGenerated />
          ))}
        </ul>
        {aiQuestions.length === 0 && !generating && (
          <p className="mt-3 text-sm text-ink-subtle">No AI-generated questions yet. Click the button above to make some.</p>
        )}
      </section>

      <div className="mt-12 border-t border-line pt-6">
        <Link
          href={`/chat?lesson=${lesson.id}`}
          className="inline-flex items-center px-4 py-2.5 bg-brand text-brand-on rounded-lg hover:bg-brand-hover text-sm font-medium shadow-soft transition"
        >
          {tr("lessons.askAbout")} →
        </Link>
      </div>
    </article>
  );
}

function QuizItem({
  question,
  index,
  onAnswer,
  tr,
  aiGenerated,
}: {
  question: QItem;
  index: number;
  onAnswer?: (correct: boolean) => void;
  tr: (k: any) => string;
  aiGenerated?: boolean;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    onAnswer?.(i === question.answerIndex);
  }
  return (
    <li className="rounded-xl border border-line bg-surface p-4 shadow-soft">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-medium text-ink">
          {index + 1}. {question.q}
        </p>
        {aiGenerated && (
          <span className="text-[10px] uppercase tracking-wider text-ink-subtle shrink-0">AI</span>
        )}
      </div>
      <div className="mt-3 grid gap-2">
        {question.choices.map((c, i) => {
          const isPicked = picked === i;
          const isAnswer = i === question.answerIndex;
          const show = picked !== null;
          let cls = "border-line hover:border-brand/60 text-ink";
          if (show && isAnswer) cls = "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 dark:border-emerald-700 text-ink";
          else if (show && isPicked && !isAnswer) cls = "border-red-300 bg-red-50 dark:bg-red-950/40 dark:border-red-800 text-ink";
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              className={`text-left text-sm px-3 py-2 rounded-lg border transition ${cls}`}
              disabled={picked !== null}
            >
              {c}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <p className="mt-3 text-sm text-ink-muted">
          <span
            className={
              picked === question.answerIndex
                ? "text-emerald-700 dark:text-emerald-400 font-medium"
                : "text-red-700 dark:text-red-400 font-medium"
            }
          >
            {picked === question.answerIndex ? tr("quiz.correct") : tr("quiz.incorrect")}
          </span>{" "}
          {question.explanation}
        </p>
      )}
    </li>
  );
}

function renderWithCode(s: string) {
  const parts = s.split(/(`[^`]+`)/g);
  return parts.map((part, i) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <code key={i}>{part.slice(1, -1)}</code>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}
