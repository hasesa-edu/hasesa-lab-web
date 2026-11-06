"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Clock,
  GraduationCap,
  Hammer,
  Mail,
  MessageCircle,
  Route,
  Search,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { googleSignInHref } from "@/components/GoogleButton";
import { SUBJECT_STYLES, SubjectIcon, SubjectLabel, SubjectTile } from "@/components/Subject";
import type { t as Dict } from "@/lib/i18n";
import type { ModuleSummary } from "@/lib/content/types";
import { DISCIPLINES } from "@/lib/disciplines";
import { CONTACT_EMAIL } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";

type Key = keyof typeof Dict;
type TR = (k: Key) => string;

const FEATURED_SUBJECTS = ["physics", "chemistry", "biology"] as const;

export function LandingClient({ modules }: { modules: ModuleSummary[] }) {
  const { tr } = useLocale();
  const { user, ready } = useUser();
  const primaryHref = user ? "/dashboard" : googleSignInHref("/modules");
  const primaryLabel = ready && user ? tr("hero.cta.dashboard") : tr("hero.cta.signup");
  // The first module's free concept unit: the quickest way to try the course.
  const sampleHref = modules[0] ? `/concepts/${modules[0].publicSample.id}` : "/modules";

  return (
    <div className="overflow-hidden">
      <Hero tr={tr} sampleHref={sampleHref} modules={modules} />
      <ModuleStrip tr={tr} modules={modules} />
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
    <section className="relative isolate bg-deep text-deep-foreground">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid text-primary-soft opacity-50" />
      <div aria-hidden className="absolute -top-40 -left-32 -z-10 size-[28rem] rounded-full bg-primary/50 blur-3xl" />
      <div aria-hidden className="absolute -right-24 bottom-0 -z-10 size-80 rounded-full bg-sun/25 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-12 pb-16 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-20 lg:pb-24">
        <div className="text-center lg:text-left">
          <Badge
            variant="outline"
            className="h-auto gap-2 whitespace-normal border-primary-soft/30 bg-white/5 px-3 py-1 font-semibold text-primary-soft"
          >
            <Sparkles className="size-3.5! text-sun" />
            {tr("hero.tag")}
          </Badge>

          <h1 className="mt-6 text-[2.75rem] leading-[0.95] font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            {tr("hero.title.before")}{" "}
            <span className="relative inline-block whitespace-nowrap text-sun">
              {tr("hero.title.highlight")}
              <Squiggle className="absolute -bottom-3 left-0 w-full text-sun/70" />
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-deep-foreground/80 lg:mx-0">{tr("hero.sub")}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link href="/modules" className={cn(buttonVariants({ size: "lg" }), "bg-sun font-semibold text-deep shadow-pop hover:bg-sun/90")}>
              {tr("hero.cta.lessons")}
              <ArrowRight />
            </Link>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="text-deep-foreground ring-1 ring-white/20 hover:bg-white/10 hover:text-deep-foreground dark:hover:bg-white/10"
            >
              <Link href={sampleHref}>{tr("hero.cta.sample")}</Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-deep-foreground/70">
            <span className="font-semibold text-deep-foreground">{tr("hero.free")}</span>
            <span className="mx-2">·</span>
            {tr("hero.free.note")}
          </p>
        </div>

        {modules.length > 0 && <MysteryCards tr={tr} modules={modules} />}
      </div>
    </section>
  );
}

/** The module mysteries, pinned to the notebook like case cards. */
function MysteryCards({ tr, modules }: { tr: TR; modules: ModuleSummary[] }) {
  const tilts = ["-3deg", "2.5deg", "-1.5deg"];
  return (
    <ul className="relative mx-auto flex w-full max-w-md flex-col gap-4 lg:max-w-lg">
      {modules.slice(0, 3).map((m, i) => {
        const lead = m.disciplines[0];
        const st = SUBJECT_STYLES[lead];
        // The hook's last sentence is the mystery itself.
        const question = m.hook.match(/[^.!?…—]*\?\s*$/)?.[0].trim() || m.tagline;
        return (
          <li
            key={m.id}
            className={cn("animate-float", i === 1 && "sm:ml-10 [animation-delay:-2s]", i === 2 && "sm:ml-4 [animation-delay:-4s]")}
            style={{ ["--tilt" as string]: tilts[i % tilts.length] }}
          >
            <Link
              href={`/modules/${m.id}`}
              className="group relative block overflow-hidden rounded-2xl bg-card p-4 text-card-foreground shadow-pop ring-1 ring-border transition hover:ring-sun focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:p-5"
            >
              <span aria-hidden className={cn("absolute inset-y-0 left-0 w-1.5", st.bg)} />
              <div className="flex items-center justify-between gap-3 pl-1">
                <SubjectLabel subject={lead} />
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Clock className="size-3" /> ~{m.hours} {tr("showcase.hours")}
                </span>
              </div>
              <p className="mt-2 pl-1 font-heading text-lg leading-snug font-extrabold sm:text-xl">&ldquo;{question}&rdquo;</p>
              <p className="mt-1.5 flex items-center gap-1 pl-1 text-sm font-semibold text-primary-strong dark:text-primary">
                {m.title}: {m.tagline}
                <ArrowRight className="size-3.5 shrink-0 transition group-hover:translate-x-0.5" />
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function Squiggle({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 300 14" preserveAspectRatio="none" className={cn("h-3", className)}>
      <path
        d="M2 9c30-6 45 4 75-1s45-6 75-1 45 6 75 1 45-6 71-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ───────────────────────  MODULE MARQUEE  ─────────────────────── */

function ModuleStrip({ tr, modules }: { tr: TR; modules: ModuleSummary[] }) {
  // Every step of every module, so the strip shows what students actually do.
  const items = modules.flatMap((m) => m.steps.map((s) => ({ key: `${m.id}/${s.id}`, subject: m.disciplines[0], label: s.title })));
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-3 pr-3">
      {items.map((e) => (
        <li
          key={e.key}
          className="flex items-center gap-2 rounded-full bg-white/10 py-1.5 pr-4 pl-1.5 text-sm font-medium whitespace-nowrap text-primary-foreground"
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-white/15">
            <SubjectIcon subject={e.subject} className="size-4" />
          </span>
          {e.label}
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label={tr("landing.strip.label")} className="relative border-y border-primary-strong/20 bg-primary py-3">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}

/* ───────────────────────────  WHY  ─────────────────────────── */

function WhyBand({ tr }: { tr: TR }) {
  const then = ["why.then.1", "why.then.2", "why.then.3", "why.then.4"] as Key[];
  const now = ["why.now.1", "why.now.2", "why.now.3", "why.now.4"] as Key[];
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20 sm:py-24">
      <SectionHeading eyebrow={tr("why.eyebrow")} title={tr("why.title")} sub={tr("why.sub")} />
      <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2">
        <div className="rounded-2xl bg-muted/60 p-6 ring-1 ring-border sm:p-7">
          <p className="text-xs font-bold tracking-[0.18em] text-subtle-foreground uppercase">{tr("why.then.label")}</p>
          <ul className="mt-4 space-y-3">
            {then.map((k) => (
              <li key={k} className="flex items-start gap-3 text-muted-foreground">
                <span aria-hidden className="mt-2.5 h-0.5 w-3 shrink-0 rounded-full bg-subtle-foreground/60" />
                <span className="leading-relaxed">{tr(k)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative overflow-hidden rounded-2xl bg-deep p-6 text-deep-foreground shadow-pop sm:p-7">
          <div aria-hidden className="absolute inset-0 bg-grid text-primary-soft opacity-40" />
          <div aria-hidden className="absolute -top-16 -right-16 size-48 rounded-full bg-sun/25 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-bold tracking-[0.18em] text-sun uppercase">{tr("why.now.label")}</p>
            <ul className="mt-4 space-y-3">
              {now.map((k) => (
                <li key={k} className="flex items-start gap-3">
                  <Sparkles aria-hidden className="mt-1 size-4 shrink-0 text-sun" />
                  <span className="leading-relaxed font-medium">{tr(k)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  HOW IT WORKS  ───────────────────────── */

function HowItWorks({ tr }: { tr: TR }) {
  const steps = [
    { n: "01", icon: Search, title: tr("how.1.title"), body: tr("how.1.body"), tone: "bg-primary-soft text-primary-strong" },
    { n: "02", icon: Hammer, title: tr("how.2.title"), body: tr("how.2.body"), tone: "bg-sun-soft text-chemistry" },
    { n: "03", icon: BookOpen, title: tr("how.3.title"), body: tr("how.3.body"), tone: "bg-physics-soft text-physics" },
    { n: "04", icon: Award, title: tr("how.4.title"), body: tr("how.4.body"), tone: "bg-biology-soft text-biology" },
  ];
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20 sm:py-24">
      <SectionHeading eyebrow={tr("how.eyebrow")} title={tr("how.title")} />
      <ol className="relative mt-10 grid gap-8 md:mt-14 md:grid-cols-4 md:gap-6">
        {/* Dashed line joining the steps on wide screens */}
        <div aria-hidden className="absolute top-8 right-[12%] left-[12%] hidden border-t-2 border-dashed border-primary/30 md:block" />
        {steps.map((s) => (
          <li key={s.n} className="relative flex gap-4 text-left md:block md:text-center">
            <span className={cn("relative flex size-14 shrink-0 items-center justify-center rounded-2xl shadow-card ring-4 ring-background md:mx-auto md:size-16", s.tone)}>
              <s.icon className="size-6 md:size-7" />
            </span>
            <div>
              <p className="font-heading text-sm font-bold tracking-widest text-subtle-foreground md:mt-5">{s.n}</p>
              <h3 className="mt-0.5 text-xl font-extrabold md:mt-1 md:text-2xl">{s.title}</h3>
              <p className="mt-1.5 max-w-xs leading-relaxed text-muted-foreground md:mx-auto md:mt-2">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ───────────────────────────  SHOWCASE  ─────────────────────────── */

function Showcase({ tr, modules }: { tr: TR; modules: ModuleSummary[] }) {
  const units = new Set(modules.flatMap((m) => m.curriculum.map((c) => `${c.subject}|${c.grade}|${c.unit}`))).size;
  const stats = [
    { value: String(modules.length), label: tr("showcase.stat.modules") },
    { value: `~${Math.round(modules.reduce((n, m) => n + m.hours, 0) / Math.max(modules.length, 1))}`, label: tr("showcase.stat.hours") },
    { value: String(units), label: tr("showcase.stat.curriculum") },
  ];

  return (
    <section className="relative bg-primary-soft/40">
      <div aria-hidden className="absolute inset-0 bg-dots text-primary opacity-40" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow={tr("showcase.eyebrow")} title={tr("showcase.title")} sub={tr("showcase.sub")} align="left" />
          <dl className="grid shrink-0 grid-cols-3 gap-2 rounded-2xl bg-card p-2 shadow-card ring-1 ring-border">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl px-3 py-2 text-center">
                <dd className="font-heading text-2xl font-extrabold text-primary-strong tabular-nums">{s.value}</dd>
                <dt className="text-[11px] leading-tight text-muted-foreground">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Phones: a swipeable row (snaps per card). Wider screens: a grid. */}
        <ul className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {modules.map((m) => {
            const st = SUBJECT_STYLES[m.disciplines[0]];
            return (
              <li key={m.id} className="w-[85%] shrink-0 snap-start sm:w-auto">
                <Link
                  href={`/modules/${m.id}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card p-5 shadow-card ring-1 ring-border transition hover:-translate-y-1 hover:shadow-pop focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <span aria-hidden className={cn("absolute inset-x-0 top-0 h-1.5", st.bg)} />
                  <div className="flex items-start justify-between gap-3">
                    <SubjectTile subject={m.disciplines[0]} />
                    <Badge variant="outline" className="text-muted-foreground">
                      {m.hours} {tr("showcase.hours")}
                    </Badge>
                  </div>
                  <h3 className="mt-4 text-xl leading-snug font-extrabold group-hover:text-primary-strong">{m.title}</h3>
                  <p className="font-semibold text-primary-strong dark:text-primary">{m.tagline}</p>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{m.hook}</p>
                  <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Hammer className="size-3.5" /> {m.stepCount} {tr("showcase.steps")}
                    </span>
                    <ArrowRight className={cn("size-4 shrink-0 transition group-hover:translate-x-1", st.text)} />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 text-center">
          <Link href="/modules" className={cn(buttonVariants({ variant: "soft", size: "lg" }), "font-semibold")}>
            {tr("showcase.all")} <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────  PILLARS  ─────────────────────────── */

function Pillars({ tr }: { tr: TR }) {
  const cards: { icon: LucideIcon; title: Key; body: Key; tone: string }[] = [
    { icon: Hammer, title: "pillars.hands.title", body: "pillars.hands.body", tone: "bg-sun-soft text-chemistry" },
    { icon: Route, title: "pillars.paths.title", body: "pillars.paths.body", tone: "bg-primary-soft text-primary-strong" },
    { icon: GraduationCap, title: "pillars.guide.title", body: "pillars.guide.body", tone: "bg-biology-soft text-biology" },
    { icon: Users, title: "pillars.together.title", body: "pillars.together.body", tone: "bg-chemistry-soft text-chemistry" },
  ];
  return (
    <section className="relative bg-primary-soft/40">
      <div aria-hidden className="absolute inset-0 bg-dots text-primary opacity-40" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <SectionHeading eyebrow={tr("pillars.eyebrow")} title={tr("pillars.title")} sub={tr("pillars.sub")} />
        <div className="mt-10 grid gap-4 md:mt-14 lg:grid-cols-3">
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {cards.map((c) => (
              <div key={c.title} className="rounded-2xl bg-card p-5 shadow-card ring-1 ring-border sm:p-6">
                <span className={cn("inline-flex size-11 items-center justify-center rounded-xl", c.tone)}>
                  <c.icon aria-hidden className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-extrabold">{tr(c.title)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{tr(c.body)}</p>
              </div>
            ))}
          </div>

          {/* AI support: the fifth pillar, with a small chat mock */}
          <div className="relative overflow-hidden rounded-2xl bg-deep p-5 text-deep-foreground shadow-pop sm:p-6">
            <div aria-hidden className="absolute inset-0 bg-grid text-primary-soft opacity-40" />
            <div aria-hidden className="absolute -top-20 -right-16 size-56 rounded-full bg-primary/50 blur-3xl" />
            <div className="relative">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-sun text-deep">
                <MessageCircle aria-hidden className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-extrabold">{tr("pillars.ai.title")}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-deep-foreground/80">{tr("pillars.ai.body")}</p>
              <div className="mt-5 space-y-3">
                <div className="flex justify-end">
                  <div className="max-w-[90%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-sm text-primary-foreground shadow-soft">
                    {tr("pillars.ai.mock.user")}
                  </div>
                </div>
                <div className="max-w-[95%] space-y-2 rounded-2xl rounded-bl-md bg-card p-3.5 text-sm text-card-foreground shadow-soft">
                  <div className="rounded-lg bg-primary-soft/60 py-1.5 text-center font-mono font-bold text-primary-strong">λ = c ÷ f</div>
                  <p className="leading-relaxed">{tr("pillars.ai.mock.assistant1")}</p>
                </div>
                <p className="flex items-center gap-1.5 text-xs text-deep-foreground/70">
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

  const points: { icon: LucideIcon; title: Key; body: Key }[] = [
    { icon: BookOpen, title: "parents.curriculum.title", body: "parents.curriculum.body" },
    { icon: GraduationCap, title: "parents.guide.title", body: "parents.guide.body" },
    { icon: Award, title: "parents.cert.title", body: "parents.cert.body" },
  ];

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:py-24 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <p className="text-xs font-bold tracking-[0.18em] text-primary uppercase">{tr("parents.eyebrow")}</p>
        <h2 className="mt-2 text-4xl leading-[1.05] font-extrabold sm:text-5xl">{tr("parents.title")}</h2>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">{tr("parents.sub")}</p>
        <Link href={sampleHref} className={cn(buttonVariants({ variant: "soft", size: "lg" }), "mt-8 font-semibold")}>
          {tr("hero.cta.sample")} <ArrowRight />
        </Link>
      </div>
      <div className="space-y-3">
        {points.map((p) => (
          <div key={p.title} className="flex gap-4 rounded-2xl bg-card p-5 shadow-card ring-1 ring-border">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-strong dark:text-primary">
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
                    <li key={`${c.subject}-${c.grade}-${c.unit}`} className="inline-flex min-h-7 items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-xs">
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
    <section className="border-y border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 md:flex-row md:justify-between">
        <p className="text-xs font-bold tracking-[0.18em] text-primary uppercase">{tr("partners.eyebrow")}</p>
        <ul className="grid w-full gap-3 sm:grid-cols-2 md:w-auto">
          {partners.map((p) => (
            <li key={p.name}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-16 items-center gap-3 rounded-xl p-2 pr-4 transition hover:bg-primary-soft/40 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted ring-1 ring-border">
                  <Image src={p.logo} alt={`${p.name} logo`} width={96} height={96} className="size-full object-contain" loading="lazy" />
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold group-hover:text-primary-strong">{p.name}</span>
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
    <section className="mx-auto max-w-6xl px-4 pb-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-sun-soft px-6 py-12 text-center ring-1 ring-sun/30 sm:px-12 sm:py-16">
        <div aria-hidden className="absolute inset-0 bg-grid text-chemistry opacity-30" />
        <div className="relative">
          <div className="mx-auto flex w-fit gap-2">
            {FEATURED_SUBJECTS.map((s) => (
              <SubjectTile key={s} subject={s} size="lg" className="bg-card shadow-card" />
            ))}
          </div>
          <h2 className="mt-6 text-4xl font-extrabold sm:text-5xl">{tr("cta.title")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{tr("cta.sub")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {/* Plain <a>: signed out, this is the Google OAuth route, which needs a full-page navigation. */}
            <a href={primaryHref} className={cn(buttonVariants({ size: "lg" }), "font-semibold shadow-pop")}>
              {primaryLabel}
              <ArrowRight />
            </a>
            {CONTACT_EMAIL && (
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Enrolling at Hasesa Academy")}`}
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "bg-card font-semibold")}
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

function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="text-xs font-bold tracking-[0.18em] text-primary uppercase">{eyebrow}</p>
      <h2 className="mt-2 text-4xl leading-[1.05] font-extrabold sm:text-5xl">{title}</h2>
      {sub && <p className="mt-3 text-lg text-muted-foreground">{sub}</p>}
    </div>
  );
}
