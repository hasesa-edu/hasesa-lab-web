"use client";

import Link from "next/link";
import { LESSONS } from "@/lib/lessons";
import { useLocale } from "@/components/LocaleProvider";

export default function LessonsPage() {
  const { locale, tr } = useLocale();
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-stone-900">{tr("lessons.title")}</h1>
      <p className="text-stone-600 mt-2 max-w-2xl">{tr("lessons.subtitle")}</p>

      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {LESSONS.map((lesson) => (
          <li key={lesson.id}>
            <Link
              href={`/lessons/${lesson.id}`}
              className="block rounded-lg border border-stone-200 bg-white p-5 hover:border-brand transition"
            >
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="uppercase tracking-wide font-medium text-brand">
                  {lesson.unit[locale]}
                </span>
                <span>
                  {lesson.estimatedMinutes} {tr("lessons.estimate")}
                </span>
              </div>
              <h2 className="mt-2 text-lg font-semibold text-stone-900">
                {lesson.title[locale]}
              </h2>
              <p className="mt-1 text-sm text-stone-600 leading-relaxed line-clamp-3">
                {lesson.summary[locale]}
              </p>
              <div className="mt-3 text-xs text-stone-500">
                {tr("lessons.code")}: <code className="text-stone-700">{lesson.moeCode}</code>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
