"use client";

import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import type { t as Dict } from "@/lib/i18n";
import { buttonVariants } from "@/components/ui/button";
import { Why } from "./landing/Why";
import { SectionLabel } from "./landing/SectionLabel";
import { StatusTag } from "./landing/StatusTag";

type Key = keyof typeof Dict;
type TR = (k: Key) => string;

// Hasesa's own page: the organisation, its thesis and the questions it is
// exploring. Clean and typographic: paper, ink, hairlines, numbered mono
// section labels. The Academy (its first program) lives at /academy.

export function HomeClient({ moduleCount }: { moduleCount: number }) {
  const { tr } = useLocale();
  return (
    <div className="bg-background">
      <Hero tr={tr} />
      <Why tr={tr} n="01" />
      <Exploring tr={tr} />
      <HowWeWork tr={tr} />
      <Programs tr={tr} moduleCount={moduleCount} />
    </div>
  );
}

/* ─────────────────────────────  HERO  ───────────────────────────── */

function Hero({ tr }: { tr: TR }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 pb-16 sm:pt-24 sm:pb-24">
      <p className="flex items-center gap-3 font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">
        <span lang="am" className="font-ethiopic text-lg font-bold tracking-normal text-foreground normal-case">
          ሐሰሳ
        </span>
        <span aria-hidden className="h-px w-8 bg-input" />
        {tr("home.eyebrow")}
      </p>
      <h1 className="mt-7 max-w-5xl text-[2.75rem] leading-[1] font-semibold tracking-[-0.04em] sm:text-7xl lg:text-[5.5rem]">
        {tr("home.title")}
      </h1>
      <p className="mt-7 max-w-2xl text-lg leading-relaxed text-foreground/75 sm:text-xl">{tr("home.sub")}</p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link href="/academy" className={buttonVariants({ size: "lg", variant: "ink" })}>
          {tr("home.cta.academy")}
        </Link>
        <a href="#exploring" className={buttonVariants({ size: "lg", variant: "outline" })}>
          {tr("home.cta.exploring")}
          <ArrowRightIcon />
        </a>
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
    <section id="exploring" className="scroll-mt-16 border-y border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <SectionLabel n="02">{tr("label.exploring")}</SectionLabel>
        <h2 className="mt-4 text-3xl leading-tight font-semibold sm:text-5xl">{tr("home.exploring.title")}</h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{tr("home.exploring.sub")}</p>
        {/* A bordered grid: each cell draws its right and bottom edge, the list draws the top and left. */}
        <ol className="mt-10 grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-3">
          {QUESTIONS.map((q, i) => (
            <li key={q.title} className="flex flex-col gap-3 border-r border-b border-border p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-sm text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <StatusTag tone={q.status === "testing" ? "teal" : "open"}>
                  {tr(q.status === "testing" ? "home.status.testing" : "home.status.open")}
                </StatusTag>
              </div>
              <h3 className="text-xl leading-snug font-semibold">{tr(q.title)}</h3>
              <p className="leading-relaxed text-muted-foreground">{tr(q.body)}</p>
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
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      <SectionLabel n="03">{tr("label.how")}</SectionLabel>
      <h2 className="mt-4 max-w-3xl text-3xl leading-tight font-semibold sm:text-5xl">{tr("home.how.title")}</h2>
      <ol className="mt-10 grid gap-10 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} className="border-t border-input pt-5">
            <span className="font-mono text-3xl text-primary tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 text-xl font-semibold">{tr(s.title)}</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">{tr(s.body)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ───────────────────────────  PROGRAMS  ─────────────────────────── */

function Programs({ tr, moduleCount }: { tr: TR; moduleCount: number }) {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <SectionLabel n="04">{tr("label.program")}</SectionLabel>
        <Link
          href="/academy"
          className="group mt-6 flex flex-wrap items-end justify-between gap-8 rounded-lg border border-border bg-card p-6 outline-none transition-colors hover:border-input focus-visible:ring-3 focus-visible:ring-ring/40 sm:p-9"
        >
          <div className="flex max-w-2xl flex-[999_1_26rem] flex-col gap-4">
            <StatusTag tone="teal">{tr("home.programs.academy.status")}</StatusTag>
            <span className="font-display text-3xl leading-tight font-semibold tracking-[-0.03em] sm:text-5xl">
              {tr("home.programs.academy.title")}
            </span>
            <span className="text-lg leading-relaxed text-muted-foreground">{tr("home.programs.academy.body")}</span>
          </div>
          <div className="flex flex-[1_1_12rem] flex-col items-start gap-4">
            {moduleCount > 0 && (
              <span className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">
                {moduleCount} {tr("nav.experiments")}
              </span>
            )}
            <span className="inline-flex items-center gap-2 font-medium text-primary">
              {tr("home.programs.academy.cta")}
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
