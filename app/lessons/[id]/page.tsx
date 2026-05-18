"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { getLesson } from "@/lib/lessons";
import { useLocale } from "@/components/LocaleProvider";

export default function LessonDetail() {
  const params = useParams<{ id: string }>();
  const lesson = getLesson(params.id);
  const { locale, tr } = useLocale();

  if (!lesson) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <p className="text-stone-600">Lesson not found.</p>
        <Link href="/lessons" className="text-brand mt-3 inline-block">
          {tr("lessons.back")}
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/lessons" className="text-sm text-brand hover:underline">
        {tr("lessons.back")}
      </Link>

      <header className="mt-3">
        <p className="text-xs uppercase tracking-wider text-brand font-medium">
          {lesson.unit[locale]} · {lesson.moeCode}
        </p>
        <h1 className="mt-1 text-3xl font-bold text-stone-900">{lesson.title[locale]}</h1>
        <p className="mt-2 text-stone-600 leading-relaxed">{lesson.summary[locale]}</p>
        <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
          {lesson.eueeTopics.map((topic) => (
            <span key={topic} className="px-2 py-0.5 bg-sun/15 text-amber-800 rounded">
              {topic}
            </span>
          ))}
        </div>
      </header>

      <div className="prose-edu mt-8">
        {lesson.sections.map((section) => (
          <section key={section.heading.en}>
            <h3>{section.heading[locale]}</h3>
            <p>{renderWithCode(section.body)}</p>
          </section>
        ))}
      </div>

      <section className="mt-8 rounded-lg border border-brand/20 bg-brand/5 p-5">
        <h3 className="font-semibold text-brand-dark">Worked example</h3>
        <p className="mt-2 text-stone-800">
          <strong>Problem.</strong> {lesson.workedExample.problem}
        </p>
        <p className="mt-2 text-stone-800">
          <strong>Solution.</strong> {renderWithCode(lesson.workedExample.solution)}
        </p>
      </section>

      <section className="mt-8">
        <h3 className="font-semibold text-stone-900">Quick check</h3>
        <ul className="mt-3 space-y-5">
          {lesson.quiz.map((q, i) => (
            <QuizItem key={i} question={q} index={i} />
          ))}
        </ul>
      </section>

      <div className="mt-10 border-t border-stone-200 pt-6">
        <Link
          href={`/chat?lesson=${lesson.id}`}
          className="inline-flex items-center px-4 py-2 bg-brand text-white rounded-md hover:bg-brand-dark text-sm font-medium"
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
}: {
  question: { q: string; choices: string[]; answerIndex: number; explanation: string };
  index: number;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <li className="rounded-lg border border-stone-200 bg-white p-4">
      <p className="font-medium text-stone-900">
        {index + 1}. {question.q}
      </p>
      <div className="mt-3 grid gap-2">
        {question.choices.map((c, i) => {
          const isPicked = picked === i;
          const isAnswer = i === question.answerIndex;
          const show = picked !== null;
          let cls = "border-stone-200 hover:border-brand";
          if (show && isAnswer) cls = "border-emerald-400 bg-emerald-50";
          else if (show && isPicked && !isAnswer) cls = "border-red-300 bg-red-50";
          return (
            <button
              key={i}
              onClick={() => setPicked(i)}
              className={`text-left text-sm px-3 py-2 rounded border transition ${cls}`}
              disabled={picked !== null}
            >
              {c}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <p className="mt-3 text-sm text-stone-700">
          <span className={picked === question.answerIndex ? "text-emerald-700" : "text-red-700"}>
            {picked === question.answerIndex ? "Correct." : "Not quite."}
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
