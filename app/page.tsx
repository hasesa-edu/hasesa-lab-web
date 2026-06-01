"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import type { t as Dict } from "@/lib/i18n";

type Key = keyof typeof Dict;
type TR = (k: Key) => string;

export default function Home() {
  const { tr } = useLocale();
  const { user, ready } = useUser();
  const primaryHref = user
    ? user.role === "teacher"
      ? "/teacher"
      : "/dashboard"
    : "/signup";
  const primaryLabel =
    ready && user ? tr("hero.cta.dashboard") : tr("hero.cta.signup");

  return (
    <div className="relative overflow-hidden">
      <Backdrop />

      {/* HERO — full-bleed looping product video as the background */}
      <section className="relative overflow-hidden min-h-[calc(100vh-61px)] flex items-center">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-demo.poster.jpg"
          aria-label={tr("hero.video.alt")}
        >
          {/* Chrome/Firefox pick the smaller WebM; Safari falls through to MP4. */}
          <source src="/hero-demo.webm" type="video/webm" />
          <source src="/hero-demo.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for headline readability */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/75"
        />

        <div className="relative w-full max-w-3xl mx-auto px-4 py-16 text-center text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur px-3 py-1 text-xs font-semibold text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            {tr("hero.tag")}
          </div>
          <h1 className="mt-6 text-5xl sm:text-6xl md:text-[4rem] font-extrabold leading-[0.95] tracking-tight text-white">
            {tr("hero.title.before")}{" "}
            <span className="text-brand-soft">{tr("hero.title.highlight")}</span>
          </h1>
          <p className="mt-6 text-lg text-white/90 max-w-xl mx-auto leading-relaxed">
            {tr("hero.sub")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={primaryHref}
              prefetch={false}
              className="inline-flex items-center px-6 py-3 bg-brand text-brand-on rounded-xl hover:bg-brand-hover font-semibold shadow-card transition"
            >
              {primaryLabel} →
            </Link>
            <Link
              href="/chat"
              prefetch={false}
              className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur text-white border border-white/40 rounded-xl hover:bg-white/20 hover:border-white/70 font-medium transition"
            >
              {tr("hero.cta.chat")}
            </Link>
          </div>
          <p className="mt-5 text-xs text-white/80">
            <span className="inline-flex items-center gap-1 font-semibold text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              {tr("hero.pilot")}
            </span>
            <span className="mx-2">·</span>
            {tr("hero.pilot.note")}
          </p>
        </div>
      </section>

      {/* PILLARS — on a brand-soft tint for visual rhythm */}
      <div className="bg-brand-soft/30">
        <section className="max-w-5xl mx-auto px-4 pt-20 sm:pt-24 pb-20 sm:pb-24">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.18em] font-bold text-brand">
              {tr("pillars.eyebrow")}
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink leading-[1.05]">
              {tr("pillars.title")}
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <PillarExperiment tr={tr} />
            <PillarAITutor tr={tr} />
          </div>
        </section>
      </div>

      {/* PARTNERS */}
      <section className="max-w-5xl mx-auto px-4 pt-20 sm:pt-24 pb-20">
        <p className="text-center text-xs uppercase tracking-[0.18em] font-semibold text-brand">
          {tr("partners.eyebrow")}
        </p>
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <PartnerCard
            href="https://www.thesciencebasement.org/"
            logo="/partners/science-basement.png"
            name="The Science Basement"
            tag={tr("partners.sb.tag")}
          />
          <PartnerCard
            href="https://bekurguide.com/organization/magic-carpet-schools"
            logo="/partners/magic-carpet.jpg"
            name="Magic Carpet Schools"
            tag={tr("partners.mcs.tag")}
          />
        </ul>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <div className="relative rounded-3xl overflow-hidden border border-brand/30 bg-gradient-to-br from-brand-soft via-sun-soft/30 to-surface p-8 sm:p-12 text-center shadow-card">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink">
            {tr("cta.title")}
          </h2>
          <p className="mt-3 text-ink-muted max-w-xl mx-auto">{tr("cta.sub")}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={primaryHref}
              prefetch={false}
              className="inline-flex items-center px-6 py-3 bg-brand text-brand-on rounded-xl hover:bg-brand-hover font-semibold shadow-card transition"
            >
              {primaryLabel} →
            </Link>
            <Link
              href="/lessons"
              prefetch={false}
              className="inline-flex items-center px-6 py-3 bg-surface text-ink border border-line rounded-xl hover:border-brand/60 hover:text-brand font-medium transition"
            >
              {tr("hero.cta.lessons")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ────────────────────────  PIECES  ──────────────────────── */

function Backdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[800px] opacity-70 dark:opacity-40"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 0%, rgb(var(--brand) / 0.18), transparent 70%)",
      }}
    />
  );
}

/* Pillar 1: experiment, with at-home-recipe visual mock. */
function PillarExperiment({ tr }: { tr: TR }) {
  return (
    <div className="rounded-3xl border border-line bg-surface p-7 sm:p-8 shadow-card hover:shadow-pop transition flex flex-col">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🧪</span>
        <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-brand">
          {tr("pillars.exp.eyebrow")}
        </p>
      </div>
      <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-ink leading-tight">
        {tr("pillars.exp.title")}
      </h3>
      <p className="mt-3 text-ink-muted leading-relaxed">
        {tr("pillars.exp.body")}
      </p>

      <div className="mt-6 rounded-2xl border-2 border-dashed border-brand/30 bg-sun-soft/30 p-5">
        <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-amber-700 dark:text-amber-300">
          {tr("pillars.exp.mock.label")}
        </p>
        <h4 className="mt-1.5 text-lg font-bold tracking-tight text-ink leading-snug">
          {tr("pillars.exp.mock.title")}
        </h4>
        <ol className="mt-4 space-y-2.5 text-sm text-ink">
          <li className="flex items-start gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-brand-on text-[11px] font-bold">
              1
            </span>
            <span className="leading-relaxed">
              {tr("pillars.exp.mock.step1")}
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-brand-on text-[11px] font-bold">
              2
            </span>
            <span className="leading-relaxed">
              {tr("pillars.exp.mock.step2")}
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-brand-on text-[11px] font-bold">
              3
            </span>
            <span className="leading-relaxed">
              {tr("pillars.exp.mock.step3")}
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
}

/* Pillar 2: AI tutor, with chat-exchange visual mock. */
function PillarAITutor({ tr }: { tr: TR }) {
  return (
    <div className="rounded-3xl border border-line bg-surface p-7 sm:p-8 shadow-card hover:shadow-pop transition flex flex-col">
      <div className="flex items-center gap-2">
        <span className="text-2xl">💬</span>
        <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-brand">
          {tr("pillars.ai.eyebrow")}
        </p>
      </div>
      <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-ink leading-tight">
        {tr("pillars.ai.title")}
      </h3>
      <p className="mt-3 text-ink-muted leading-relaxed">
        {tr("pillars.ai.body")}
      </p>

      <div className="mt-6 rounded-2xl border border-line bg-surface-2 p-4 space-y-3">
        <div className="flex justify-end">
          <div className="max-w-[85%] bg-brand text-brand-on px-3.5 py-2 rounded-2xl rounded-br-md text-sm shadow-soft">
            {tr("pillars.ai.mock.user")}
          </div>
        </div>
        <div className="max-w-[88%]">
          <div className="bg-surface border border-line px-3.5 py-3 rounded-2xl rounded-bl-md text-sm shadow-soft space-y-2">
            <div className="text-center font-mono text-brand-hover font-bold py-1.5 bg-brand-soft/50 rounded">
              F = m · a
            </div>
            <p className="text-ink leading-relaxed">
              {tr("pillars.ai.mock.assistant1")}
            </p>
          </div>
          <p className="mt-2 text-[11px] text-ink-subtle flex items-center gap-1 ml-1">
            <span>📖</span>
            <span>{tr("pillars.ai.mock.source")}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function PartnerCard({
  href,
  logo,
  name,
  tag,
}: {
  href: string;
  logo: string;
  name: string;
  tag: string;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 rounded-xl border border-line bg-surface p-4 sm:p-5 shadow-soft hover:border-brand/40 hover:shadow-card transition"
      >
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-surface-2 border border-line overflow-hidden">
          <Image
            src={logo}
            alt={`${name} logo`}
            width={128}
            height={128}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-ink tracking-tight group-hover:text-brand transition">
            {name}
          </h3>
          <p className="mt-0.5 text-sm text-ink-muted leading-relaxed">{tag}</p>
        </div>
      </a>
    </li>
  );
}
