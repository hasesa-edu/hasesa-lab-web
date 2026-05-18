"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";

export default function Home() {
  const { tr } = useLocale();
  const { user, ready } = useUser();

  return (
    <div className="relative">
      {/* Soft teal radial backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] opacity-60 dark:opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgb(var(--brand) / 0.18), transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-4">
        <section className="py-16 sm:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 backdrop-blur px-3 py-1 text-xs font-medium text-ink-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            {tr("hero.tag")}
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-ink">
            {tr("hero.title")}
          </h1>
          <p className="mt-5 text-lg text-ink-muted max-w-2xl leading-relaxed">
            {tr("hero.sub")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {ready && user ? (
              <Link
                href={user.role === "teacher" ? "/teacher" : "/dashboard"}
                className="inline-flex items-center px-5 py-2.5 bg-brand text-brand-on rounded-lg hover:bg-brand-hover font-medium shadow-soft transition"
              >
                {tr("hero.cta.dashboard")} →
              </Link>
            ) : (
              <Link
                href="/signup"
                className="inline-flex items-center px-5 py-2.5 bg-brand text-brand-on rounded-lg hover:bg-brand-hover font-medium shadow-soft transition"
              >
                {tr("hero.cta.signup")}
              </Link>
            )}
            <Link
              href="/lessons"
              className="inline-flex items-center px-5 py-2.5 bg-surface text-ink border border-line rounded-lg hover:border-brand/60 hover:text-brand font-medium transition"
            >
              {tr("hero.cta.lessons")}
            </Link>
            <Link
              href="/chat"
              className="inline-flex items-center px-5 py-2.5 bg-surface text-ink border border-line rounded-lg hover:border-brand/60 hover:text-brand font-medium transition"
            >
              {tr("hero.cta.chat")} →
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-20">
          <FeatureCard titleKey="feature.aligned.title" bodyKey="feature.aligned.body" emoji="📚" />
          <FeatureCard titleKey="feature.lang.title" bodyKey="feature.lang.body" emoji="🗣️" />
          <FeatureCard titleKey="feature.offline.title" bodyKey="feature.offline.body" emoji="📶" />
          <FeatureCard titleKey="feature.ai.title" bodyKey="feature.ai.body" emoji="🎯" />
        </section>
      </div>
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
    <div className="rounded-xl border border-line bg-surface p-5 shadow-soft hover:border-brand/40 hover:shadow-card transition">
      <div className="text-2xl mb-2">{emoji}</div>
      <h2 className="font-semibold text-ink tracking-tight">{tr(titleKey)}</h2>
      <p className="text-sm text-ink-muted mt-1 leading-relaxed">{tr(bodyKey)}</p>
    </div>
  );
}
