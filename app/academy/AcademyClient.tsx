"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { googleSignInHref } from "@/components/GoogleButton";
import { SUBJECT_STYLES } from "@/components/Subject";
import type { t as Dict } from "@/lib/i18n";
import type { ModuleSummary } from "@/lib/content/types";
import { DISCIPLINES, LEVELS, LEVEL_ORDER } from "@/lib/disciplines";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { LevelHeading, ModuleRows } from "@/components/module/ModuleRows";
import { type CatalogueItem, catalogueItem, previewModules } from "@/lib/catalogue";
import { SolveIt, type Challenge } from "../landing/SolveIt";
import { Partners } from "../landing/Partners";
import { SectionLabel } from "../landing/SectionLabel";
import { ArrowRightIcon, PlusIcon, SearchIcon } from "lucide-react";
import { FAQ_KEYS } from "./faq";

type Key = keyof typeof Dict;
type TR = (k: Key) => string;

// The Academy's page (/academy), in the site's clean look. The hero is a
// finder (search, or start from a level) and the modules section is a short
// preview of each level, so the page stays the same length however many
// modules there are. The rest uses the same numbered mono labels and
// hairlines as the Hasesa home page.

export function AcademyClient({ modules, challenge }: { modules: ModuleSummary[]; challenge: Challenge | null }) {
  const { tr } = useLocale();
  const { user, ready } = useUser();
  const primaryHref = user ? "/dashboard" : googleSignInHref("/modules");
  const primaryLabel = ready && user ? tr("hero.cta.dashboard") : tr("hero.cta.signup");
  const items = modules.map(catalogueItem);
  const sampleHref = modules[0] ? `/concepts/${modules[0].publicSample.id}` : "/modules";

  return (
    <div className="bg-background">
      <Hero tr={tr} items={items} sampleHref={sampleHref} />
      <Modules tr={tr} items={items} />
      {challenge && (
        <section className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
            <SectionLabel n="02" className="mb-6">{tr("label.solve")}</SectionLabel>
            <SolveIt
              challenge={challenge}
              labels={{
                eyebrow: tr("solve.eyebrow"),
                title: tr("solve.title"),
                check: tr("solve.check"),
                solved: tr("solve.solved"),
                wrong: tr("solve.wrong"),
                open: tr("solve.open"),
                more: tr("solve.more"),
                tryAgain: tr("solve.tryAgain"),
              }}
            />
          </div>
        </section>
      )}
      <HowItWorks tr={tr} />
      <Parents tr={tr} modules={modules} sampleHref={sampleHref} />
      <Faq tr={tr} />
      <Partners tr={tr} />
      <FinalCta tr={tr} primaryHref={primaryHref} primaryLabel={primaryLabel} />
    </div>
  );
}

/* ─────────────────────────────  HERO  ───────────────────────────── */

function Hero({ tr, items, sampleHref }: { tr: TR; items: CatalogueItem[]; sampleHref: string }) {
  // The finder (search and the three levels) should fit on the first screen.
  // On phones the intro and buttons move below it; on desktop they sit beside
  // the headline.
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-x-10 gap-y-5 px-4 pt-10 pb-14 sm:gap-y-8 sm:pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:pb-20">
      <div>
        <p className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">{tr("academy.eyebrow")}</p>
        <h1 className="mt-4 text-[2.75rem] leading-[1] font-semibold tracking-[-0.04em] sm:text-7xl lg:text-[5rem]">
          {tr("hero.title.a")} <span className="text-primary">{tr("hero.title.b")}</span>
        </h1>
      </div>
      <div className="order-3 lg:order-none lg:pb-2">
        <p className="max-w-md text-lg leading-relaxed text-foreground/75">{tr("hero.sub")}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/modules" className={buttonVariants({ size: "lg", variant: "ink" })}>
            {tr("hero.cta.lessons")}
          </Link>
          <Link href={sampleHref} className={buttonVariants({ size: "lg", variant: "outline" })}>
            {tr("hero.cta.sample")}
          </Link>
        </div>
      </div>
      {items.length > 0 && (
        <div className="order-2 min-w-0 lg:order-none lg:col-span-2 lg:mt-2">
          <Finder tr={tr} items={items} />
        </div>
      )}
    </section>
  );
}

/** Search every module, or start from a level. Both open the catalogue, filtered. */
function Finder({ tr, items }: { tr: TR; items: CatalogueItem[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-soft sm:p-6">
      <form action="/modules" role="search" className="flex gap-2">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">{tr("finder.search")}</span>
          <SearchIcon aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            name="q"
            placeholder={tr("finder.placeholder")}
            className="h-12 w-full rounded-lg border border-input bg-background pr-3 pl-10 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </label>
        <button type="submit" className={cn(buttonVariants({ size: "lg", variant: "ink" }), "h-12")}>
          {tr("finder.go")}
        </button>
      </form>
      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {LEVEL_ORDER.map((level) => {
          const n = items.filter((m) => m.level === level).length;
          return (
            <li key={level}>
              <Link
                href={`/modules?level=${level}`}
                className="group flex h-full flex-col rounded-lg border border-border p-4 transition-colors hover:border-primary/60 focus-visible:border-primary"
              >
                <span className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-xs tracking-[0.08em] uppercase">{LEVELS[level].label}</span>
                  <span className="font-mono text-xs text-muted-foreground tabular-nums">
                    {n} {n === 1 ? tr("finder.module") : tr("finder.modules")}
                  </span>
                </span>
                <span className="mt-2 flex-1 text-sm text-muted-foreground">{LEVELS[level].blurb}</span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  {tr("finder.browse")} <ArrowRightIcon aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ───────────────────────────  MODULES  ─────────────────────────── */

function Modules({ tr, items }: { tr: TR; items: CatalogueItem[] }) {
  const preview = previewModules(items);
  return (
    <section className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <SectionLabel n="01">{tr("label.modules")}</SectionLabel>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl leading-tight font-semibold sm:text-5xl">{tr("showcase.title")}</h2>
            <p className="mt-3 max-w-xl text-lg text-muted-foreground">{tr("showcase.sub")}</p>
          </div>
          <Link href="/modules" className="inline-flex items-center gap-2 font-medium text-primary">
            {tr("showcase.all").replace("{n}", String(items.length))}
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>

        <div className="mt-10 space-y-12">
          {LEVEL_ORDER.map((level) => {
            const total = items.filter((m) => m.level === level).length;
            const shown = preview.filter((m) => m.level === level);
            if (!shown.length) return null;
            return (
              <section key={level} aria-labelledby={`level-${level}`}>
                <LevelHeading level={level} count={total} as="h3">
                  {total > shown.length && (
                    <Link href={`/modules?level=${level}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      {tr("showcase.allLevel").replace("{n}", String(total)).replace("{level}", LEVELS[level].label.toLowerCase())}
                      <ArrowRightIcon aria-hidden className="size-4" />
                    </Link>
                  )}
                </LevelHeading>
                <ModuleRows items={shown} showLevel={false} />
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  HOW IT WORKS  ───────────────────────── */

function HowItWorks({ tr }: { tr: TR }) {
  const steps: { title: Key; body: Key }[] = [
    { title: "how.1.title", body: "how.1.body" },
    { title: "how.2.title", body: "how.2.body" },
    { title: "how.3.title", body: "how.3.body" },
    { title: "how.4.title", body: "how.4.body" },
  ];
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <SectionLabel n="03">{tr("label.method")}</SectionLabel>
        <h2 className="mt-4 max-w-3xl text-3xl leading-tight font-semibold sm:text-5xl">{tr("how.title")}</h2>
        {/* The idea the method rests on, a century old. */}
        <figure className="mt-8 max-w-3xl border-l-2 border-primary pl-5 sm:pl-6">
          <blockquote className="text-xl leading-snug font-medium tracking-[-0.015em] text-foreground/85 sm:text-2xl">
            &ldquo;{tr("dewey.quote")}&rdquo;
          </blockquote>
          <figcaption className="mt-3 font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">
            — {tr("dewey.attribution")}
          </figcaption>
        </figure>
        <ol className="mt-10 grid gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t border-input pt-5">
              <span className="font-mono text-3xl text-primary tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-xl font-semibold">{tr(s.title)}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{tr(s.body)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────────────────────────  PARENTS  ─────────────────────────── */

function Parents({ tr, modules, sampleHref }: { tr: TR; modules: ModuleSummary[]; sampleHref: string }) {
  const seen = new Map<string, ModuleSummary["curriculum"][number]>();
  for (const m of modules) for (const c of m.curriculum) seen.set(`${c.subject}|${c.grade}|${c.unit}`, c);
  const topics = [...seen.values()];
  // Two per science, so parents see topics from every subject.
  const examples = (["physics", "chemistry", "biology"] as const).flatMap((sub) => topics.filter((c) => c.subject === sub).slice(0, 2));

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionLabel n="04">{tr("label.parents")}</SectionLabel>
          <h2 className="mt-4 text-3xl leading-tight font-semibold sm:text-5xl">{tr("parents.title")}</h2>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">{tr("parents.sub")}</p>
          <Link href={sampleHref} className={cn(buttonVariants({ size: "lg", variant: "ink" }), "mt-8")}>
            {tr("hero.cta.sample")}
          </Link>
        </div>
        <div className="space-y-8">
          <div>
            <p className="font-mono text-5xl text-primary tabular-nums">{topics.length}</p>
            <p className="mt-2 font-semibold">{tr("parents.curriculum.title")}</p>
            <p className="mt-1 text-muted-foreground">{tr("parents.curriculum.body")}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {examples.map((c) => (
                <li key={`${c.subject}-${c.grade}-${c.unit}`} className="rounded-full border border-border bg-card px-3 py-1 text-sm">
                  <span className={cn("font-medium", SUBJECT_STYLES[c.subject].text)}>
                    {DISCIPLINES[c.subject].label} {c.grade}
                  </span>{" "}
                  <span className="text-muted-foreground">{c.unit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-8 border-t border-border pt-8 sm:grid-cols-2">
            <div>
              <p className="font-semibold">{tr("parents.guide.title")}</p>
              <p className="mt-1 text-muted-foreground">{tr("parents.guide.body")}</p>
            </div>
            <div>
              <p className="font-semibold">{tr("parents.cert.title")}</p>
              <p className="mt-1 text-muted-foreground">{tr("parents.cert.body")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────  FAQ  ───────────────────────────── */

// Plain questions and answers: what parents ask, and what AI answer engines quote.
// The same wording is published as FAQPage structured data (app/academy/page.tsx).
function Faq({ tr }: { tr: TR }) {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-24 lg:grid-cols-[1fr_2fr]">
        <div>
          <SectionLabel n="05">{tr("label.faq")}</SectionLabel>
          <h2 className="mt-4 text-3xl leading-tight font-semibold sm:text-5xl">{tr("faq.title")}</h2>
        </div>
        <div className="border-t border-border">
          {FAQ_KEYS.map((k) => (
            <details key={k} className="group border-b border-border">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                <h3>{tr(`faq.${k}.q` as Key)}</h3>
                <PlusIcon aria-hidden className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-45" />
              </summary>
              <p className="max-w-2xl pb-5 leading-relaxed text-muted-foreground">{tr(`faq.${k}.a` as Key)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────  FINAL CTA  ────────────────────────── */

function FinalCta({ tr, primaryHref, primaryLabel }: { tr: TR; primaryHref: string; primaryLabel: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-8">
      <div className="flex flex-wrap items-end justify-between gap-8 rounded-lg bg-accent px-6 py-12 sm:px-10 sm:py-14">
        <div className="max-w-2xl flex-[999_1_26rem]">
          <h2 className="text-3xl leading-tight font-semibold sm:text-5xl">{tr("cta.title")}</h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground/75">{tr("cta.sub")}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {/* Plain <a>: signed out, this is the Google OAuth route, which needs a full-page navigation. */}
          <a href={primaryHref} className={buttonVariants({ size: "lg", variant: "ink" })}>
            {primaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
