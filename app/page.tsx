"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";

export default function Home() {
  const { tr } = useLocale();
  return (
    <div className="max-w-5xl mx-auto px-4">
      <section className="py-14 sm:py-20">
        <p className="text-xs sm:text-sm uppercase tracking-wider text-brand font-medium">
          {tr("hero.tag")}
        </p>
        <h1 className="mt-3 text-3xl sm:text-5xl font-bold leading-tight text-stone-900">
          {tr("hero.title")}
        </h1>
        <p className="mt-4 text-lg text-stone-600 max-w-2xl leading-relaxed">
          {tr("hero.sub")}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/lessons"
            className="inline-flex items-center px-5 py-2.5 bg-brand text-white rounded-md hover:bg-brand-dark font-medium"
          >
            {tr("hero.cta.lessons")}
          </Link>
          <Link
            href="/chat"
            className="inline-flex items-center px-5 py-2.5 bg-white text-brand border border-brand/30 rounded-md hover:border-brand font-medium"
          >
            {tr("hero.cta.chat")} →
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-16">
        <FeatureCard titleKey="feature.aligned.title" bodyKey="feature.aligned.body" emoji="📚" />
        <FeatureCard titleKey="feature.lang.title" bodyKey="feature.lang.body" emoji="🗣️" />
        <FeatureCard titleKey="feature.offline.title" bodyKey="feature.offline.body" emoji="📶" />
        <FeatureCard titleKey="feature.ai.title" bodyKey="feature.ai.body" emoji="🎯" />
      </section>
    </div>
  );
}

function FeatureCard({
  titleKey,
  bodyKey,
  emoji,
}: {
  titleKey: Parameters<ReturnType<typeof useLocale>["tr"]>[0];
  bodyKey: Parameters<ReturnType<typeof useLocale>["tr"]>[0];
  emoji: string;
}) {
  const { tr } = useLocale();
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-5">
      <div className="text-2xl mb-2">{emoji}</div>
      <h2 className="font-semibold text-stone-900">{tr(titleKey)}</h2>
      <p className="text-sm text-stone-600 mt-1 leading-relaxed">{tr(bodyKey)}</p>
    </div>
  );
}
