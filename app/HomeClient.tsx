"use client";

import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import type { t as Dict } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Why } from "./landing/Why";
import { Partners } from "./landing/Partners";

type Key = keyof typeof Dict;
type TR = (k: Key) => string;

// Hasesa's own page: the organisation, its thesis and the questions it is
// exploring. The Academy (its first program) has its own page at /academy,
// which keeps the radio dial; this page stays typographic.

export function HomeClient({ moduleCount }: { moduleCount: number }) {
  const { tr } = useLocale();
  return (
    <div className="bg-lab font-legible text-ink">
      <Hero tr={tr} />
      <Why tr={tr} />
      <Exploring tr={tr} />
      <HowWeWork tr={tr} />
      <Programs tr={tr} moduleCount={moduleCount} />
      <Partners tr={tr} />
      <FinalCta tr={tr} />
    </div>
  );
}

/* ─────────────────────────────  HERO  ───────────────────────────── */

function Hero({ tr }: { tr: TR }) {
  return (
    <section className="relative isolate overflow-hidden bg-enamel text-enamel-foreground">
      <div aria-hidden className="absolute -bottom-40 left-1/2 -z-10 h-80 w-[70rem] -translate-x-1/2 rounded-[50%] bg-signal/25 blur-3xl" />
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-16 sm:pt-20 sm:pb-24">
        <p className="font-bold text-sun">{tr("home.eyebrow")}</p>
        <h1 className="mt-4 max-w-5xl font-dial text-[2.8rem] leading-[0.9] font-extrabold tracking-tight text-white sm:text-7xl lg:text-[6rem]">
          {tr("home.title.a")} <span className="text-sun">{tr("home.title.b")}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-enamel-foreground/85 sm:text-xl">{tr("home.sub")}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/academy" className={cn(buttonVariants({ size: "lg" }), "bg-white font-bold text-enamel hover:bg-white/90")}>
            {tr("home.cta.academy")}
          </Link>
          <a
            href="#exploring"
            className={cn(buttonVariants({ size: "lg", variant: "outline" }), "border-white/30 bg-transparent font-bold text-white hover:bg-white/10 hover:text-white")}
          >
            {tr("home.cta.exploring")}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  WHAT WE'RE EXPLORING  ───────────────────────── */

type Question = { title: Key; body: Key; status: "testing" | "open" };

const QUESTIONS: Question[] = [
  { title: "home.q.graduate.title", body: "home.q.graduate.body", status: "open" },
  { title: "home.q.learning.title", body: "home.q.learning.body", status: "testing" },
  { title: "home.q.teacher.title", body: "home.q.teacher.body", status: "testing" },
  { title: "home.q.ai.title", body: "home.q.ai.body", status: "testing" },
  { title: "home.q.cost.title", body: "home.q.cost.body", status: "testing" },
  { title: "home.q.evidence.title", body: "home.q.evidence.body", status: "open" },
];

function Exploring({ tr }: { tr: TR }) {
  return (
    <section id="exploring" className="scroll-mt-16 bg-white dark:bg-card">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <h2 className="font-dial text-5xl leading-none font-bold sm:text-7xl">{tr("home.exploring.title")}</h2>
        <p className="mt-4 max-w-2xl text-lg text-ink/75">{tr("home.exploring.sub")}</p>
        <ol className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {QUESTIONS.map((q, i) => (
            <li key={q.title} className={cn("border-t-4 pt-4", q.status === "testing" ? "border-signal" : "border-sun")}>
              <div className="flex items-center justify-between gap-3">
                <span className="font-dial text-3xl font-bold text-ink/40 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-bold",
                    q.status === "testing" ? "bg-signal/15 text-primary" : "border-2 border-sun text-ink/80"
                  )}
                >
                  {tr(q.status === "testing" ? "home.status.testing" : "home.status.open")}
                </span>
              </div>
              <h3 className="mt-3 font-dial text-3xl leading-[0.95] font-bold">{tr(q.title)}</h3>
              <p className="mt-3 leading-relaxed text-ink/75">{tr(q.body)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────────────────────────  HOW WE WORK  ─────────────────────────── */

function HowWeWork({ tr }: { tr: TR }) {
  const steps: { title: Key; body: Key }[] = [
    { title: "home.how.1.title", body: "home.how.1.body" },
    { title: "home.how.2.title", body: "home.how.2.body" },
    { title: "home.how.3.title", body: "home.how.3.body" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
      <h2 className="max-w-3xl font-dial text-5xl leading-[0.95] font-bold sm:text-7xl">{tr("home.how.title")}</h2>
      {/* A real sequence, so it gets numbers and a line that runs through it. */}
      <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        <span aria-hidden className="absolute top-7 right-0 left-0 hidden h-1 rounded-full bg-signal/30 md:block" />
        {steps.map((s, i) => (
          <li key={s.title} className="relative">
            <span className="relative flex size-14 items-center justify-center rounded-full bg-enamel font-dial text-3xl font-bold text-sun ring-8 ring-lab">
              {i + 1}
            </span>
            <h3 className="mt-5 font-dial text-3xl leading-none font-bold">{tr(s.title)}</h3>
            <p className="mt-3 leading-relaxed text-ink/75">{tr(s.body)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ───────────────────────────  PROGRAMS  ─────────────────────────── */

function Programs({ tr, moduleCount }: { tr: TR; moduleCount: number }) {
  return (
    <section className="bg-enamel text-enamel-foreground">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <p className="font-bold text-sun">{tr("home.programs.eyebrow")}</p>
        <Link
          href="/academy"
          className="group mt-5 grid gap-8 rounded-3xl border-2 border-white/15 p-6 outline-none transition-colors hover:border-signal focus-visible:ring-3 focus-visible:ring-signal/50 sm:p-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-end"
        >
          <div>
            <span className="inline-flex rounded-full bg-signal/20 px-2.5 py-0.5 text-xs font-bold text-white">{tr("home.programs.academy.status")}</span>
            <h2 className="mt-4 font-dial text-5xl leading-none font-bold text-white sm:text-7xl">{tr("home.programs.academy.title")}</h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-enamel-foreground/80">{tr("home.programs.academy.body")}</p>
          </div>
          <div className="flex items-end justify-between gap-6 lg:flex-col lg:items-end">
            {moduleCount > 0 && (
              <p className="lg:text-right">
                <span className="block font-dial text-6xl leading-none font-bold text-sun tabular-nums">{moduleCount}</span>
                <span className="text-sm text-enamel-foreground/70">{tr("nav.experiments").toLowerCase()}</span>
              </p>
            )}
            <span className="inline-flex items-center gap-2 font-bold text-white">
              {tr("home.programs.academy.cta")}
              <ArrowRightIcon className="size-5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

/* ──────────────────────────  FINAL CTA  ────────────────────────── */

function FinalCta({ tr }: { tr: TR }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-8">
      <div className="relative overflow-hidden rounded-3xl bg-sun px-6 py-14 sm:px-12 sm:py-20">
        <h2 className="relative max-w-3xl font-dial text-6xl leading-[0.9] font-extrabold text-ink sm:text-8xl">{tr("home.cta.title")}</h2>
        <p className="relative mt-5 max-w-xl text-lg text-ink/80">{tr("home.cta.sub")}</p>
        <div className="relative mt-8 flex flex-wrap gap-3">
          {CONTACT_EMAIL && (
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Hasesa")}`}
              className={cn(buttonVariants({ size: "lg" }), "bg-ink font-bold text-white hover:bg-ink/90")}
            >
              {tr("home.cta.contact")}
            </a>
          )}
          <Link
            href="/academy"
            className={cn(
              buttonVariants({ size: "lg", variant: CONTACT_EMAIL ? "outline" : "default" }),
              CONTACT_EMAIL ? "border-ink/40 bg-transparent font-bold text-ink hover:bg-ink/10 hover:text-ink" : "bg-ink font-bold text-white hover:bg-ink/90"
            )}
          >
            {tr("home.cta.academy")}
          </Link>
        </div>
      </div>
    </section>
  );
}
