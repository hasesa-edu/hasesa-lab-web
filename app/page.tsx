"use client";

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

      {/* HERO */}
      <section className="relative max-w-5xl mx-auto px-4 pt-10 sm:pt-14 pb-20 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="lg:pr-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-soft/50 px-3 py-1 text-xs font-semibold text-brand-hover">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              {tr("hero.tag")}
            </div>
            <h1 className="mt-6 text-[2.7rem] sm:text-6xl md:text-[4.5rem] font-extrabold leading-[0.95] tracking-tight text-ink">
              {tr("hero.title.before")}{" "}
              <span className="relative inline-block">
                <span
                  aria-hidden
                  className="absolute inset-x-[-2px] bottom-1 sm:bottom-1.5 h-4 sm:h-5 md:h-6 bg-sun-soft rounded-sm"
                />
                <span className="relative text-brand-hover">
                  {tr("hero.title.highlight")}
                </span>
              </span>
            </h1>
            <p className="mt-6 text-lg text-ink-muted max-w-xl leading-relaxed">
              {tr("hero.sub")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={primaryHref}
                className="inline-flex items-center px-6 py-3 bg-brand text-brand-on rounded-xl hover:bg-brand-hover font-semibold shadow-card transition"
              >
                {primaryLabel} →
              </Link>
              <Link
                href="/chat"
                className="inline-flex items-center px-6 py-3 bg-surface text-ink border border-line rounded-xl hover:border-brand/60 hover:text-brand font-medium transition"
              >
                {tr("hero.cta.chat")}
              </Link>
            </div>
            <p className="mt-5 text-xs text-ink-muted">
              <span className="inline-flex items-center gap-1 font-semibold text-brand-hover">
                <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                {tr("hero.pilot")}
              </span>
              <span className="mx-2">·</span>
              {tr("hero.pilot.note")}
            </p>
          </div>

          <HeroCollage tr={tr} />
        </div>
      </section>

      {/* PILLARS */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
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

      {/* MORE EXPERIMENTS GRID */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.18em] font-bold text-brand">
            {tr("exps.eyebrow")}
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-ink leading-tight">
            {tr("exps.title")}
          </h2>
          <p className="mt-3 text-ink-muted leading-relaxed">{tr("exps.sub")}</p>
        </div>
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <ExperimentTile
            emoji="🪙"
            subjectKey="exps.phy.subject"
            titleKey="exps.phy.title"
            bodyKey="exps.phy.body"
            tr={tr}
          />
          <ExperimentTile
            emoji="🌳"
            subjectKey="exps.math.subject"
            titleKey="exps.math.title"
            bodyKey="exps.math.body"
            tr={tr}
          />
          <ExperimentTile
            emoji="🥬"
            subjectKey="exps.chem.subject"
            titleKey="exps.chem.title"
            bodyKey="exps.chem.body"
            tr={tr}
          />
          <ExperimentTile
            emoji="🧅"
            subjectKey="exps.bio.subject"
            titleKey="exps.bio.title"
            bodyKey="exps.bio.body"
            tr={tr}
          />
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/lessons"
            className="inline-flex items-center text-sm font-semibold text-brand hover:text-brand-hover transition"
          >
            {tr("exps.cta")} →
          </Link>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
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
              className="inline-flex items-center px-6 py-3 bg-brand text-brand-on rounded-xl hover:bg-brand-hover font-semibold shadow-card transition"
            >
              {primaryLabel} →
            </Link>
            <Link
              href="/lessons"
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

/* Asymmetric collage of two Ethiopian portraits (Unsplash). */
function HeroCollage({ tr }: { tr: TR }) {
  return (
    <div className="relative mx-auto w-full max-w-[460px] h-[400px] sm:h-[460px] lg:h-[500px]">
      {/* soft brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-6 -z-10 rounded-[60px] bg-gradient-to-br from-brand-soft via-sun-soft/40 to-transparent blur-2xl opacity-80"
      />

      {/* decorative dot pattern — brand */}
      <div
        aria-hidden
        className="absolute -top-1 left-2 grid grid-cols-4 gap-1.5 opacity-50"
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className="block h-1 w-1 rounded-full bg-brand" />
        ))}
      </div>

      {/* decorative dot pattern — amber */}
      <div
        aria-hidden
        className="absolute bottom-1 -right-1 grid grid-cols-4 gap-1.5 opacity-60"
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className="block h-1 w-1 rounded-full bg-amber-400" />
        ))}
      </div>

      {/* Photo 1 — Ethiopian girl in traditional dress (top-right, larger) */}
      <a
        href="https://unsplash.com/photos/VC_pOerCKNU"
        target="_blank"
        rel="noopener noreferrer"
        className="group absolute top-0 right-2 sm:right-4 w-[66%] aspect-[3/4] -rotate-[3deg] hover:-rotate-[1deg] transition duration-500 z-10"
        title={tr("hero.collage.credit1")}
      >
        <div className="relative h-full w-full overflow-hidden rounded-2xl border-[6px] border-white shadow-pop">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1764145177622-8317fbfe1877?w=900&q=80&auto=format&fit=crop&crop=faces"
            alt={tr("hero.collage.alt1")}
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
        </div>
      </a>

      {/* Photo 2 — boy in Addis Ababa (bottom-left, smaller) */}
      <a
        href="https://unsplash.com/photos/uWj6n0eEBLI"
        target="_blank"
        rel="noopener noreferrer"
        className="group absolute bottom-2 left-0 sm:left-2 w-[58%] aspect-[3/4] rotate-[4deg] hover:rotate-[1deg] transition duration-500"
        title={tr("hero.collage.credit2")}
      >
        <div className="relative h-full w-full overflow-hidden rounded-2xl border-[6px] border-white shadow-pop">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1633539656332-d0861676473a?w=900&q=80&auto=format&fit=crop&crop=faces"
            alt={tr("hero.collage.alt2")}
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
        </div>
      </a>
    </div>
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
        <div className="mt-4 pt-3 border-t border-brand/15 text-[11px] uppercase tracking-[0.16em] font-semibold text-ink-muted">
          {tr("pillars.exp.mock.tag")}
        </div>
      </div>

      <Link
        href="/lessons"
        className="mt-6 inline-flex items-center text-sm font-semibold text-brand hover:text-brand-hover transition self-start"
      >
        {tr("pillars.exp.cta")} →
      </Link>
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
        <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-brand text-center">
          {tr("pillars.ai.mock.label")}
        </p>
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
            <p className="text-ink leading-relaxed">
              {tr("pillars.ai.mock.assistant2")}
            </p>
          </div>
          <p className="mt-2 text-[11px] text-ink-subtle flex items-center gap-1 ml-1">
            <span>📖</span>
            <span>{tr("pillars.ai.mock.source")}</span>
          </p>
        </div>
      </div>

      <Link
        href="/chat"
        className="mt-6 inline-flex items-center text-sm font-semibold text-brand hover:text-brand-hover transition self-start"
      >
        {tr("pillars.ai.cta")} →
      </Link>
    </div>
  );
}

function ExperimentTile({
  emoji,
  subjectKey,
  titleKey,
  bodyKey,
  tr,
}: {
  emoji: string;
  subjectKey: Key;
  titleKey: Key;
  bodyKey: Key;
  tr: TR;
}) {
  return (
    <div className="group rounded-2xl border border-line bg-surface p-5 hover:border-brand/40 hover:shadow-card transition flex flex-col">
      <div className="text-3xl transition group-hover:scale-110">{emoji}</div>
      <p className="mt-3 text-[10px] uppercase tracking-[0.18em] font-bold text-brand">
        {tr(subjectKey)}
      </p>
      <h3 className="mt-1 font-bold tracking-tight text-ink leading-snug">
        {tr(titleKey)}
      </h3>
      <p className="mt-1 text-xs text-ink-muted leading-relaxed">
        {tr(bodyKey)}
      </p>
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo}
            alt={`${name} logo`}
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
