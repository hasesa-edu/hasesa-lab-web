"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { googleSignInHref } from "@/components/GoogleButton";
import type { t as Dict } from "@/lib/i18n";
import type { ModuleSummary } from "@/lib/content/types";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ModuleCard } from "@/components/module/ModuleCard";
import { CardRow } from "@/components/module/CardRow";
import { HeaderSearch } from "@/components/HeaderSearch";
import { type CardState, type CatalogueItem, type Viewer, catalogueItem, sortModules } from "@/lib/catalogue";
import { SolveIt, type Challenge } from "../landing/SolveIt";
import { Partners } from "../landing/Partners";
import { SectionLabel } from "../landing/SectionLabel";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import { FAQ_KEYS } from "./faq";

type Key = keyof typeof Dict;
type TR = (k: Key) => string;

// The Academy's page (/academy), in the site's clean look. The hero leads with
// search; the modules section is a short preview (what you're doing, where to
// start) and a link to the full catalogue, whose filters do the browsing, so
// the page stays short however many modules there are. The rest uses the same
// numbered mono labels and hairlines as the Hasesa home page.

export function AcademyClient({
  modules,
  states,
  viewer,
  challenge,
}: {
  modules: ModuleSummary[];
  states: Record<string, CardState>;
  viewer: Viewer;
  challenge: Challenge | null;
}) {
  const { tr } = useLocale();
  const { user, ready } = useUser();
  const primaryHref = user ? "/dashboard" : googleSignInHref("/modules");
  const primaryLabel = ready && user ? tr("hero.cta.dashboard") : tr("hero.cta.signup");
  const items = modules.map(catalogueItem);
  const sampleHref = modules[0] ? `/concepts/${modules[0].publicSample.id}` : "/modules";

  return (
    <div className="bg-background">
      <Hero tr={tr} sampleHref={sampleHref} />
      <Modules tr={tr} items={items} states={states} viewer={viewer} />
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

const POPULAR = ["rocket", "coffee", "electricity", "DNA", "clean water"];

function Hero({ tr, sampleHref }: { tr: TR; sampleHref: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-10 pb-12 sm:pt-16 sm:pb-16">
      <p className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">{tr("academy.eyebrow")}</p>
      <h1 className="mt-4 max-w-4xl text-[2.75rem] leading-[1] font-semibold tracking-[-0.04em] sm:text-7xl">
        {tr("hero.title.a")} <span className="text-primary">{tr("hero.title.b")}</span>
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/75">{tr("hero.sub")}</p>
      <div className="mt-7 max-w-2xl">
        <HeaderSearch size="lg" shortcut />
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted-foreground">{tr("finder.popular")}</span>
          {POPULAR.map((q) => (
            <Link key={q} href={`/modules?q=${encodeURIComponent(q)}`} className="rounded-full border border-border bg-card px-3 py-1 transition-colors hover:border-foreground/40">
              {q}
            </Link>
          ))}
        </div>
      </div>
      <Link href={sampleHref} className="group mt-6 inline-flex items-center gap-1.5 font-medium text-primary">
        {tr("hero.sample.link")}
        <ArrowRightIcon aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </section>
  );
}

/* ───────────────────────────  MODULES  ─────────────────────────── */

/** A short preview (what you're doing, where to start); the catalogue's filters do the rest. */
function Modules({ tr, items, states, viewer }: { tr: TR; items: CatalogueItem[]; states: Record<string, CardState>; viewer: Viewer }) {
  const card = (m: CatalogueItem) => (
    <li key={m.id}>
      <ModuleCard item={m} state={states[m.id]} viewer={viewer} />
    </li>
  );
  const doing = viewer === "full" ? items.filter((m) => states[m.id]?.status === "active") : [];
  const beginners = sortModules(items.filter((m) => m.level === "beginner"), "suggested");

  return (
    <section className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel n="01">{tr("label.modules")}</SectionLabel>
            <h2 className="mt-4 text-3xl leading-tight font-semibold sm:text-5xl">{tr("showcase.title")}</h2>
            <p className="mt-3 max-w-xl text-lg text-muted-foreground">{tr("showcase.sub")}</p>
          </div>
          <Link href="/modules" className="inline-flex items-center gap-2 font-medium text-primary">
            {tr("showcase.all").replace("{n}", String(items.length))}
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>

        {doing.length > 0 && (
          <CardRow title={tr("rows.continue")} sub={tr("rows.continue.sub")} seeAll={{ href: "/modules?progress=active" }}>
            {doing.map(card)}
          </CardRow>
        )}
        {beginners.length > 0 && (
          <CardRow title={tr("rows.start")} sub={tr("rows.start.sub")} seeAll={{ href: "/modules?level=beginner" }}>
            {beginners.slice(0, 10).map(card)}
          </CardRow>
        )}
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
