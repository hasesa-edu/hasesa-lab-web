"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  GraduationCap,
  Hammer,
  Mail,
  MessageCircle,
  Route,
  Search,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { googleSignInHref } from "@/components/GoogleButton";
import { LogoMark } from "@/components/Logo";
import { SUBJECT_STYLES, SubjectIcon, SubjectLabel } from "@/components/Subject";
import type { t as Dict } from "@/lib/i18n";
import type { ModuleSummary } from "@/lib/content/types";
import { DISCIPLINES } from "@/lib/disciplines";
import { CONTACT_EMAIL } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Workbench } from "./landing/Workbench";
import { SolveIt, type Challenge } from "./landing/SolveIt";
import { Reveal } from "./landing/Reveal";
import { ClawDoodle, RadioDoodle } from "./landing/Doodles";

type Key = keyof typeof Dict;
type TR = (k: Key) => string;

// The landing page is a maker's workbench: warm paper, dark ink, amber tape.
// Teal stays for the logo and links only.

export function LandingClient({ modules, challenge }: { modules: ModuleSummary[]; challenge: Challenge | null }) {
  const { tr } = useLocale();
  const { user, ready } = useUser();
  const primaryHref = user ? "/dashboard" : googleSignInHref("/modules");
  const primaryLabel = ready && user ? tr("hero.cta.dashboard") : tr("hero.cta.signup");
  // The first module's free concept unit: the quickest way to try the course.
  const sampleHref = modules[0] ? `/concepts/${modules[0].publicSample.id}` : "/modules";

  return (
    <div className="overflow-hidden bg-paper">
      <Hero tr={tr} sampleHref={sampleHref} modules={modules} />
      {challenge && <SolveSection tr={tr} challenge={challenge} />}
      <HazardStrip tr={tr} modules={modules} />
      <WhyBand tr={tr} />
      <Showcase tr={tr} modules={modules} />
      <HowItWorks tr={tr} />
      <Pillars tr={tr} />
      <ParentsBand tr={tr} modules={modules} sampleHref={sampleHref} />
      <Partners tr={tr} />
      <FinalCta tr={tr} primaryHref={primaryHref} primaryLabel={primaryLabel} />
    </div>
  );
}

/* ─────────────────────────────  HERO  ───────────────────────────── */

function Hero({ tr, sampleHref, modules }: { tr: TR; sampleHref: string; modules: ModuleSummary[] }) {
  return (
    <section className="relative isolate">
      {/* Notebook page: faint grid, red margin line on wide screens. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid text-ink opacity-[0.35]" />
      <div aria-hidden className="absolute inset-y-0 left-[max(1rem,calc(50%-37rem))] -z-10 hidden w-px bg-red-300/70 lg:block" />
      <div aria-hidden className="absolute -right-32 -bottom-24 -z-10 size-96 rounded-full bg-sun/15 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 pt-12 pb-24 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-20 lg:pb-32">
        <div className="text-center lg:pl-6 lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1 text-xs font-semibold text-ink shadow-soft ring-1 ring-ink/10 dark:text-foreground">
            <span aria-hidden className="size-2 rounded-full bg-sun" />
            {tr("hero.tag")}
          </p>

          <h1 className="mt-6 text-[2.75rem] leading-[0.98] font-extrabold tracking-tight text-ink sm:text-6xl lg:text-[3.4rem] xl:text-[3.9rem] dark:text-foreground">
            {tr("hero.title.a")}
            <br />
            <span className="hl">{tr("hero.title.b")}</span>
            <br />
            <span className="relative inline-block whitespace-nowrap text-chemistry">
              {tr("hero.title.highlight")}
              <Squiggle className="absolute -bottom-3 left-0 w-full text-sun" />
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0">{tr("hero.sub")}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link href="/modules" className={cn(buttonVariants({ size: "lg" }), "bg-ink font-semibold text-ink-foreground shadow-pop hover:bg-ink/90")}>
              {tr("hero.cta.lessons")}
              <ArrowRight />
            </Link>
            <Link href={sampleHref} className={cn(buttonVariants({ size: "lg", variant: "outline" }), "bg-card font-semibold")}>
              {tr("hero.cta.sample")}
            </Link>
          </div>

          <p className="mt-6 -rotate-1 font-hand text-2xl text-chemistry">{tr("hero.note")}</p>
        </div>

        {modules.length > 0 && <Workbench modules={modules} hoursLabel={tr("showcase.hours")} />}
      </div>
    </section>
  );
}

function Squiggle({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 300 14" preserveAspectRatio="none" className={cn("h-3", className)}>
      <path d="M2 9c30-6 45 4 75-1s45-6 75-1 45 6 75 1 45-6 71-2" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/* ─────────────────────────  CAN YOU SOLVE IT?  ───────────────────────── */

function SolveSection({ tr, challenge }: { tr: TR; challenge: Challenge }) {
  return (
    <section className="relative z-10 mx-auto -mt-12 max-w-5xl px-4 pb-16 sm:-mt-16">
      <div className="-rotate-[0.6deg]">
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
  );
}

/* ───────────────────────  HAZARD-TAPE MARQUEE  ─────────────────────── */

function HazardStrip({ tr, modules }: { tr: TR; modules: ModuleSummary[] }) {
  // Every step of every module, so the strip shows what students actually do.
  const items = modules.flatMap((m) => m.steps.map((s) => ({ key: `${m.id}/${s.id}`, subject: m.disciplines[0], label: s.title })));
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-6 pr-6">
      {items.map((e) => (
        <li key={e.key} className="flex items-center gap-2 text-sm font-extrabold tracking-wide whitespace-nowrap text-ink uppercase">
          <SubjectIcon subject={e.subject} className="size-4" />
          {e.label}
          <span aria-hidden className="ml-4 text-ink/40">
            ✕
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label={tr("landing.strip.label")} className="relative -rotate-1 scale-[1.02] bg-sun shadow-pop">
      <div aria-hidden className="hazard h-2" />
      <div className="py-2.5">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {row(false)}
          {row(true)}
        </div>
      </div>
      <div aria-hidden className="hazard h-2" />
    </section>
  );
}

/* ───────────────────────────  WHY  ─────────────────────────── */

function WhyBand({ tr }: { tr: TR }) {
  const then = ["why.then.1", "why.then.2", "why.then.3", "why.then.4"] as Key[];
  const now = ["why.now.1", "why.now.2", "why.now.3", "why.now.4"] as Key[];
  return (
    <section className="relative isolate mt-16 bg-ink text-ink-foreground">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid text-ink-foreground opacity-[0.07]" />
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.18em] text-sun uppercase">{tr("why.eyebrow")}</p>
          <h2 className="mt-2 text-4xl leading-[1.05] font-extrabold sm:text-5xl">{tr("why.title")}</h2>
          <p className="mt-3 text-lg text-ink-foreground/70">{tr("why.sub")}</p>
        </div>

        <Reveal className="mt-12 grid gap-10 md:mt-16 md:grid-cols-2 md:gap-14">
          <div>
            <p className="font-hand text-3xl text-ink-foreground/60">{tr("why.then.label")}</p>
            <ul className="mt-4 space-y-4">
              {then.map((k, i) => (
                <li key={k} className="text-xl font-semibold text-ink-foreground/60 sm:text-2xl">
                  <span className="strike" style={{ ["--d" as string]: `${0.2 + i * 0.25}s` }}>
                    {tr(k)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-hand text-3xl text-sun">{tr("why.now.label")}</p>
            <ul className="mt-4 space-y-4">
              {now.map((k, i) => (
                <li key={k} className="text-xl font-bold sm:text-2xl">
                  <span className="hl hl-dark" style={{ ["--d" as string]: `${1.2 + i * 0.25}s` }}>
                    {tr(k)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────────  SHOWCASE  ─────────────────────────── */

const CARD_TILTS = ["-rotate-1", "rotate-1", "-rotate-[0.5deg]"];

function Showcase({ tr, modules }: { tr: TR; modules: ModuleSummary[] }) {
  const units = new Set(modules.flatMap((m) => m.curriculum.map((c) => `${c.subject}|${c.grade}|${c.unit}`))).size;
  const stats = [
    { value: String(modules.length), label: tr("showcase.stat.modules") },
    { value: `~${Math.round(modules.reduce((n, m) => n + m.hours, 0) / Math.max(modules.length, 1))}`, label: tr("showcase.stat.hours") },
    { value: String(units), label: tr("showcase.stat.curriculum") },
  ];

  return (
    <section className="relative bg-sand">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow={tr("showcase.eyebrow")} title={tr("showcase.title")} sub={tr("showcase.sub")} align="left" />
          {/* A lab label stuck on the bench */}
          <dl className="relative grid shrink-0 rotate-2 grid-cols-3 divide-x divide-dashed divide-ink/25 rounded-md border-2 border-ink bg-card px-2 py-3 shadow-pop">
            <span aria-hidden className="tape absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2" />
            {stats.map((s) => (
              <div key={s.label} className="px-3 text-center">
                <dd className="font-heading text-2xl font-extrabold text-ink tabular-nums dark:text-foreground">{s.value}</dd>
                <dt className="font-hand text-base leading-tight text-muted-foreground">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Phones: a swipeable row (snaps per card). Wider screens: a grid. */}
        <ul className="-mx-4 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pt-3 pb-6 [perspective:1000px] [scrollbar-width:none] sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {modules.map((m, i) => {
            const st = SUBJECT_STYLES[m.disciplines[0]];
            return (
              <li key={m.id} className={cn("w-[85%] shrink-0 snap-start sm:w-auto", CARD_TILTS[i % CARD_TILTS.length])}>
                <Link
                  href={`/modules/${m.id}`}
                  className="group relative flex h-full flex-col rounded-xl bg-card p-6 pt-7 shadow-card ring-1 ring-ink/10 transition duration-300 hover:shadow-pop hover:[transform:rotateX(6deg)_translateY(-6px)] focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <span aria-hidden className="tape absolute -top-2.5 left-6 h-5 w-16 -rotate-6" />
                  <span aria-hidden className={cn("absolute inset-x-0 top-0 h-1 rounded-t-xl", st.bg)} />
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    {m.disciplines.map((d) => (
                      <SubjectLabel key={d} subject={d} />
                    ))}
                  </div>
                  <h3 className="mt-3 text-2xl leading-snug font-extrabold text-ink dark:text-foreground">{m.title}</h3>
                  <p className="font-semibold text-chemistry">{m.tagline}</p>
                  <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">{m.hook}</p>
                  <div className="mt-auto flex items-center justify-between border-t border-dashed border-ink/20 pt-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Hammer className="size-4" /> {m.stepCount} {tr("showcase.steps")} · ~{m.hours} {tr("showcase.hours")}
                    </span>
                    <ArrowRight className={cn("size-4 shrink-0 transition group-hover:translate-x-1", st.text)} />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 text-center">
          <Link href="/modules" className={cn(buttonVariants({ size: "lg" }), "bg-ink font-semibold text-ink-foreground hover:bg-ink/90")}>
            {tr("showcase.all")} <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  HOW IT WORKS  ───────────────────────── */

function HowItWorks({ tr }: { tr: TR }) {
  const steps = [
    { n: "1", icon: Search, title: tr("how.1.title"), body: tr("how.1.body") },
    { n: "2", icon: Hammer, title: tr("how.2.title"), body: tr("how.2.body") },
    { n: "3", icon: BookOpen, title: tr("how.3.title"), body: tr("how.3.body") },
    { n: "4", icon: Award, title: tr("how.4.title"), body: tr("how.4.body") },
  ];
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20 sm:py-24">
      <SectionHeading eyebrow={tr("how.eyebrow")} title={tr("how.title")} />
      <ol className="relative mt-12 grid gap-10 md:mt-16 md:grid-cols-4 md:gap-6">
        {/* The path between steps, with a signal travelling along it. */}
        <div aria-hidden className="absolute top-8 right-[12%] left-[12%] hidden md:block">
          <div className="border-t-2 border-dashed border-ink/30" />
          <span className="travel absolute -top-[7px] left-0 size-3 -translate-x-1/2 rounded-full bg-sun shadow-[0_0_0_4px_color-mix(in_oklab,var(--sun)_30%,transparent)]" />
        </div>
        {steps.map((s) => (
          <li key={s.n} className="relative flex gap-4 text-left md:block md:text-center">
            <span className="relative flex size-16 shrink-0 items-center justify-center rounded-2xl border-2 border-ink bg-card text-ink shadow-[4px_4px_0_0_var(--ink)] md:mx-auto dark:text-foreground">
              <s.icon className="size-7" />
              <span className="absolute -top-3 -right-3 flex size-8 items-center justify-center rounded-full bg-sun font-hand text-2xl leading-none text-ink">
                {s.n}
              </span>
            </span>
            <div>
              <h3 className="text-xl font-extrabold text-ink md:mt-6 md:text-2xl dark:text-foreground">{s.title}</h3>
              <p className="mt-1.5 max-w-xs leading-relaxed text-muted-foreground md:mx-auto md:mt-2">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ───────────────────────────  PILLARS  ─────────────────────────── */

function Pillars({ tr }: { tr: TR }) {
  const cards: { icon: LucideIcon; title: Key; body: Key; tone: string }[] = [
    { icon: Hammer, title: "pillars.hands.title", body: "pillars.hands.body", tone: "text-chemistry" },
    { icon: Route, title: "pillars.paths.title", body: "pillars.paths.body", tone: "text-physics" },
    { icon: GraduationCap, title: "pillars.guide.title", body: "pillars.guide.body", tone: "text-biology" },
    { icon: Users, title: "pillars.together.title", body: "pillars.together.body", tone: "text-chemistry" },
  ];
  return (
    <section className="relative bg-sand">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <SectionHeading eyebrow={tr("pillars.eyebrow")} title={tr("pillars.title")} sub={tr("pillars.sub")} />
        <div className="mt-12 grid gap-5 md:mt-16 lg:grid-cols-3">
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
            {cards.map((c) => (
              <div key={c.title} className="rounded-xl bg-card p-5 shadow-card ring-1 ring-ink/10 sm:p-6">
                {/* a rubber-stamp icon */}
                <span className={cn("inline-flex size-12 -rotate-6 items-center justify-center rounded-full border-2 border-dashed border-current", c.tone)}>
                  <c.icon aria-hidden className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-ink dark:text-foreground">{tr(c.title)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{tr(c.body)}</p>
              </div>
            ))}
          </div>

          {/* AI support: the fifth pillar, on ink with a small chat mock */}
          <div className="relative overflow-hidden rounded-xl bg-ink p-5 text-ink-foreground shadow-pop sm:p-6">
            <div aria-hidden className="absolute inset-0 bg-grid text-ink-foreground opacity-[0.06]" />
            <div className="relative">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-sun text-ink">
                <MessageCircle aria-hidden className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-extrabold">{tr("pillars.ai.title")}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-foreground/75">{tr("pillars.ai.body")}</p>
              <div className="mt-5 space-y-3">
                <div className="flex justify-end">
                  <div className="max-w-[90%] rounded-2xl rounded-br-md bg-sun px-3.5 py-2 text-sm font-medium text-ink shadow-soft">
                    {tr("pillars.ai.mock.user")}
                  </div>
                </div>
                <div className="max-w-[95%] space-y-2 rounded-2xl rounded-bl-md bg-card p-3.5 text-sm text-card-foreground shadow-soft">
                  <div className="rounded-lg bg-sand py-1.5 text-center font-mono font-bold text-ink dark:text-foreground">λ = c ÷ f</div>
                  <p className="leading-relaxed">{tr("pillars.ai.mock.assistant1")}</p>
                </div>
                <p className="flex items-center gap-1.5 text-xs text-ink-foreground/60">
                  <BookOpen className="size-3.5" /> {tr("pillars.ai.mock.source")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────  PARENTS  ─────────────────────────── */

function ParentsBand({ tr, modules, sampleHref }: { tr: TR; modules: ModuleSummary[]; sampleHref: string }) {
  const seen = new Map<string, ModuleSummary["curriculum"][number]>();
  for (const m of modules) for (const c of m.curriculum) seen.set(`${c.subject}|${c.grade}|${c.unit}`, c);
  const topics = [...seen.values()];
  // A few examples across subjects, so parents see school topics they recognise.
  const examples = (["physics", "chemistry", "biology"] as const)
    .map((s) => topics.find((c) => c.subject === s))
    .filter((c): c is NonNullable<typeof c> => !!c);
  const certModule = modules.find((m) => m.id === "radio") ?? modules[0];

  const points: { icon: LucideIcon; title: Key; body: Key }[] = [
    { icon: BookOpen, title: "parents.curriculum.title", body: "parents.curriculum.body" },
    { icon: GraduationCap, title: "parents.guide.title", body: "parents.guide.body" },
    { icon: Award, title: "parents.cert.title", body: "parents.cert.body" },
  ];

  return (
    <section className="mx-auto grid max-w-6xl items-start gap-12 px-4 py-20 sm:py-24 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <p className="text-xs font-bold tracking-[0.18em] text-chemistry uppercase">{tr("parents.eyebrow")}</p>
        <h2 className="mt-2 text-4xl leading-[1.05] font-extrabold text-ink sm:text-5xl dark:text-foreground">
          {tr("parents.title.a")} <span className="hl">{tr("parents.title.b")}</span>
        </h2>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">{tr("parents.sub")}</p>
        <Link href={sampleHref} className={cn(buttonVariants({ size: "lg" }), "mt-8 bg-ink font-semibold text-ink-foreground hover:bg-ink/90")}>
          {tr("hero.cta.sample")} <ArrowRight />
        </Link>

        {/* A certificate, slightly askew on the bench */}
        {certModule && (
          <div className="relative mt-12 hidden max-w-sm -rotate-3 rounded-md border border-ink/15 bg-card p-6 text-center shadow-pop sm:block">
            <div aria-hidden className="absolute inset-2 rounded border-2 border-dashed border-sun/50" />
            <LogoMark size={64} className="relative mx-auto" />
            <p className="relative mt-2 text-[10px] font-bold tracking-[0.24em] text-primary-strong uppercase">Hasesa Academy</p>
            <p className="relative mt-2 font-heading text-sm font-bold text-ink dark:text-foreground">{tr("parents.cert.mock")}</p>
            <p className="relative mt-1 font-hand text-2xl text-ink dark:text-foreground">
              {certModule.title}: {certModule.tagline}
            </p>
            <span
              aria-hidden
              className="absolute -right-4 -bottom-4 flex size-16 rotate-12 items-center justify-center rounded-full bg-sun font-hand text-lg leading-tight text-ink shadow-pop"
            >
              ✓ signed
            </span>
          </div>
        )}
      </div>
      <div className="space-y-4">
        {points.map((p) => (
          <div key={p.title} className="flex gap-4 rounded-xl bg-card p-5 shadow-card ring-1 ring-ink/10">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-ink text-ink dark:border-foreground dark:text-foreground">
              <p.icon aria-hidden className="size-5" />
            </span>
            <div className="min-w-0">
              <h3 className="font-bold text-foreground">
                {p.title === "parents.curriculum.title" ? `${topics.length} ${tr(p.title)}` : tr(p.title)}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tr(p.body)}</p>
              {p.title === "parents.curriculum.title" && examples.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {examples.map((c) => (
                    <li key={`${c.subject}-${c.grade}-${c.unit}`} className="inline-flex min-h-7 items-center gap-1.5 rounded-full bg-sand px-2.5 py-0.5 text-xs">
                      <span className={cn("font-semibold", SUBJECT_STYLES[c.subject].text)}>
                        {DISCIPLINES[c.subject].label} {c.grade}
                      </span>
                      <span className="text-muted-foreground">{c.unit}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────────  PARTNERS  ─────────────────────────── */

function Partners({ tr }: { tr: TR }) {
  const partners = [
    { href: "https://www.thesciencebasement.org/", logo: "/partners/science-basement.png", name: "The Science Basement", tag: tr("partners.sb.tag") },
    { href: "https://bekurguide.com/organization/magic-carpet-schools", logo: "/partners/magic-carpet.jpg", name: "Magic Carpet Schools", tag: tr("partners.mcs.tag") },
  ];
  return (
    <section className="border-y border-dashed border-ink/20 bg-sand">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 md:flex-row md:justify-between">
        <p className="font-hand text-2xl text-ink dark:text-foreground">{tr("partners.eyebrow")}</p>
        <ul className="grid w-full gap-3 sm:grid-cols-2 md:w-auto">
          {partners.map((p) => (
            <li key={p.name}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-16 items-center gap-3 rounded-xl p-2 pr-4 transition hover:bg-card focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-card ring-1 ring-border">
                  <Image src={p.logo} alt={`${p.name} logo`} width={96} height={96} className="size-full object-contain" loading="lazy" />
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold">{p.name}</span>
                  <span className="block text-xs leading-snug text-muted-foreground">{p.tag}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ──────────────────────────  FINAL CTA  ────────────────────────── */

function FinalCta({ tr, primaryHref, primaryLabel }: { tr: TR; primaryHref: string; primaryLabel: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-center text-ink-foreground shadow-pop sm:px-12 sm:py-20">
        <div aria-hidden className="absolute inset-0 bg-grid text-ink-foreground opacity-[0.06]" />
        <RadioDoodle className="absolute top-8 left-8 hidden w-28 text-ink-foreground/80 md:block" />
        <ClawDoodle className="absolute right-8 bottom-8 hidden w-32 text-ink-foreground/80 md:block" />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-4xl font-extrabold sm:text-6xl">
            {tr("cta.title.a")} <span className="hl hl-dark">{tr("cta.title.b")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-foreground/70">{tr("cta.sub")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {/* Plain <a>: signed out, this is the Google OAuth route, which needs a full-page navigation. */}
            <a href={primaryHref} className={cn(buttonVariants({ size: "lg" }), "bg-sun font-semibold text-ink shadow-pop hover:bg-sun/90")}>
              {primaryLabel}
              <ArrowRight />
            </a>
            {CONTACT_EMAIL && (
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Enrolling at Hasesa Academy")}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-ink-foreground/30 bg-transparent font-semibold text-ink-foreground hover:bg-white/10 hover:text-ink-foreground"
                )}
              >
                <Mail /> {tr("cta.enrol")}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────  BITS  ───────────────────────────── */

function SectionHeading({ eyebrow, title, sub, align = "center" }: { eyebrow: string; title: string; sub?: string; align?: "center" | "left" }) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="text-xs font-bold tracking-[0.18em] text-chemistry uppercase">{eyebrow}</p>
      <h2 className="mt-2 text-4xl leading-[1.05] font-extrabold text-ink sm:text-5xl dark:text-foreground">{title}</h2>
      {sub && <p className="mt-3 text-lg text-muted-foreground">{sub}</p>}
    </div>
  );
}
