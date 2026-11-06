"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { googleSignInHref } from "@/components/GoogleButton";
import { SUBJECT_STYLES } from "@/components/Subject";
import type { t as Dict } from "@/lib/i18n";
import type { ModuleSummary } from "@/lib/content/types";
import { DISCIPLINES } from "@/lib/disciplines";
import { CONTACT_EMAIL } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { TuningDial, assignStations, mysteryOf, type Station } from "./landing/TuningDial";
import { SolveIt, type Challenge } from "./landing/SolveIt";

type Key = keyof typeof Dict;
type TR = (k: Key) => string;

// "Tune in": the landing page is a radio. The hero is a tuning dial whose
// stations are the modules; the rest of the page stays quiet so the dial is
// the one thing you remember. Enamel, teal signal and amber come from the
// logo; Big Shoulders is the dial's numerals, Atkinson Hyperlegible the body.

export function LandingClient({ modules, challenge }: { modules: ModuleSummary[]; challenge: Challenge | null }) {
  const { tr } = useLocale();
  const { user, ready } = useUser();
  const primaryHref = user ? "/dashboard" : googleSignInHref("/modules");
  const primaryLabel = ready && user ? tr("hero.cta.dashboard") : tr("hero.cta.signup");
  const stations = assignStations(modules);
  const sampleHref = modules[0] ? `/concepts/${modules[0].publicSample.id}` : "/modules";

  return (
    <div className="bg-lab font-legible text-ink">
      <Hero tr={tr} stations={stations} sampleHref={sampleHref} />
      {challenge && (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
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
        </section>
      )}
      <Why tr={tr} />
      <Modules tr={tr} stations={stations} />
      <HowItWorks tr={tr} />
      <Academy tr={tr} />
      <Parents tr={tr} modules={modules} sampleHref={sampleHref} />
      <Partners tr={tr} />
      <FinalCta tr={tr} primaryHref={primaryHref} primaryLabel={primaryLabel} />
    </div>
  );
}

/* ─────────────────────────────  HERO  ───────────────────────────── */

function Hero({ tr, stations, sampleHref }: { tr: TR; stations: Station[]; sampleHref: string }) {
  // The radio (screen + dial) must fit on the first screen. On phones the
  // intro and buttons move below the dial; on desktop they sit beside the
  // headline.
  return (
    <section className="relative isolate overflow-hidden bg-enamel text-enamel-foreground">
      {/* a soft teal glow behind the dial, like a lit radio face */}
      <div aria-hidden className="absolute -bottom-40 left-1/2 -z-10 h-80 w-[70rem] -translate-x-1/2 rounded-[50%] bg-signal/25 blur-3xl" />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-10 gap-y-4 px-4 pt-4 pb-12 sm:gap-y-6 sm:pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:pb-16">
        <h1 className="font-dial text-[2.8rem] leading-[0.88] font-extrabold tracking-tight text-white sm:text-7xl lg:text-[5.6rem]">
          {tr("hero.title.a")} <span className="text-sun">{tr("hero.title.b")}</span>
        </h1>
        <div className="order-3 lg:order-none lg:pb-2">
          <p className="max-w-md text-lg leading-relaxed text-enamel-foreground/85">{tr("hero.sub")}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/modules" className={cn(buttonVariants({ size: "lg" }), "bg-white font-bold text-enamel hover:bg-white/90")}>
              {tr("hero.cta.lessons")}
            </Link>
            <Link
              href={sampleHref}
              className={cn(buttonVariants({ size: "lg", variant: "outline" }), "border-white/30 bg-transparent font-bold text-white hover:bg-white/10 hover:text-white")}
            >
              {tr("hero.cta.sample")}
            </Link>
          </div>
        </div>
        {stations.length > 0 && (
          <div className="order-2 min-w-0 lg:order-none lg:col-span-2 lg:mt-2">
            <TuningDial stations={stations} />
          </div>
        )}
      </div>
    </section>
  );
}

/* ───────────────────────────  WHY  ─────────────────────────── */

function Why({ tr }: { tr: TR }) {
  // Matched pairs: the same science, the way a typical class asks for it
  // and the way a Hasesa module gets you there.
  const pairs = [1, 2, 3, 4].map((n) => ({ then: `why.then.${n}` as Key, now: `why.now.${n}` as Key }));
  return (
    <section className="border-t-2 border-ink/10">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <h2 className="max-w-3xl font-dial text-5xl leading-[0.95] font-bold sm:text-7xl">{tr("why.title")}</h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/75">{tr("why.sub")}</p>
        <table className="mt-12 w-full border-collapse text-left">
          <thead>
            <tr className="text-sm font-bold">
              <th scope="col" className="pb-3 text-ink/55 md:w-1/2 md:pr-10">
                {tr("why.then.label")}
              </th>
              <th scope="col" className="hidden pb-3 text-signal md:table-cell md:pl-10">
                {tr("why.now.label")}
              </th>
            </tr>
          </thead>
          <tbody>
            {pairs.map((p) => (
              <tr key={p.then} className="flex flex-col border-t-2 border-ink/10 py-5 md:table-row md:py-0">
                <td className="text-lg text-ink/55 md:py-6 md:pr-10 md:align-top">{tr(p.then)}</td>
                <td className="mt-2 text-xl leading-snug font-bold md:mt-0 md:border-l-4 md:border-signal md:py-6 md:pl-10 md:align-top md:text-2xl">
                  <span className="mr-2 text-sm font-bold text-signal md:hidden">{tr("why.now.label")}:</span>
                  {tr(p.now)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ───────────────────────────  MODULES  ─────────────────────────── */

function Modules({ tr, stations }: { tr: TR; stations: Station[] }) {
  return (
    <section className="bg-white dark:bg-card">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-dial text-5xl leading-none font-bold sm:text-7xl">{tr("showcase.title")}</h2>
            <p className="mt-4 max-w-xl text-lg text-ink/75">{tr("showcase.sub")}</p>
          </div>
          <Link href="/modules" className="font-bold text-signal underline underline-offset-4">
            {tr("showcase.all")}
          </Link>
        </div>

        {/* Case files, filed by their station on the dial */}
        <ul className="mt-12 border-t-2 border-ink">
          {stations.map(({ khz, module: m }) => (
            <li key={m.id} className="border-b-2 border-ink/15">
              <Link
                href={`/modules/${m.id}`}
                className="group grid gap-x-8 gap-y-3 py-8 outline-none focus-visible:bg-lab sm:grid-cols-[7rem_1fr] lg:grid-cols-[7rem_1.1fr_1fr_auto] lg:items-baseline"
              >
                <span className="font-dial text-4xl font-bold text-sun tabular-nums">
                  {khz}
                  <span className="ml-1 text-base font-medium text-ink/50">kHz</span>
                </span>
                <span>
                  <span className="block font-dial text-4xl leading-none font-bold transition-colors group-hover:text-signal sm:text-5xl">
                    {m.title}
                  </span>
                  <span className="mt-2 block text-ink/75">{m.tagline}</span>
                </span>
                <span className="text-lg leading-snug italic sm:col-start-2 lg:col-start-auto">“{mysteryOf(m)}”</span>
                <span className="flex flex-wrap gap-2 sm:col-start-2 lg:col-start-auto lg:justify-end">
                  {m.disciplines.map((d) => (
                    <span key={d} className={cn("text-sm font-bold", SUBJECT_STYLES[d].text)}>
                      {DISCIPLINES[d].label}
                    </span>
                  ))}
                  <span className="w-full text-sm text-ink/55 lg:text-right">
                    {m.stepCount} {tr("showcase.steps")}, about {m.hours} {tr("showcase.hours")}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
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
    <section className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
      <h2 className="max-w-3xl font-dial text-5xl leading-[0.95] font-bold sm:text-7xl">{tr("how.title")}</h2>
      {/* A real sequence, so it gets numbers and a line that runs through it. */}
      <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-8">
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

/* ───────────────────────────  THE ACADEMY  ─────────────────────────── */

function Academy({ tr }: { tr: TR }) {
  const items: { title: Key; body: Key }[] = [
    { title: "pillars.hands.title", body: "pillars.hands.body" },
    { title: "pillars.guide.title", body: "pillars.guide.body" },
    { title: "pillars.paths.title", body: "pillars.paths.body" },
    { title: "pillars.together.title", body: "pillars.together.body" },
    { title: "pillars.ai.title", body: "pillars.ai.body" },
  ];
  return (
    <section className="bg-enamel text-enamel-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="font-dial text-5xl leading-[0.95] font-bold text-white sm:text-7xl">{tr("pillars.title")}</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-enamel-foreground/80">{tr("pillars.sub")}</p>
        </div>
        <dl className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {items.map((it) => (
            <div key={it.title} className="border-t-2 border-signal pt-4">
              <dt className="font-dial text-3xl font-bold text-white">{tr(it.title)}</dt>
              <dd className="mt-2 leading-relaxed text-enamel-foreground/80">{tr(it.body)}</dd>
            </div>
          ))}
        </dl>
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
    <section className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-dial text-5xl leading-[0.95] font-bold sm:text-7xl">{tr("parents.title")}</h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink/75">{tr("parents.sub")}</p>
          <Link href={sampleHref} className={cn(buttonVariants({ size: "lg" }), "mt-8 bg-ink font-bold text-white hover:bg-ink/90")}>
            {tr("hero.cta.sample")}
          </Link>
        </div>
        <div className="space-y-8">
          <div>
            <p className="font-dial text-6xl font-bold text-signal tabular-nums">{topics.length}</p>
            <p className="font-bold">{tr("parents.curriculum.title")}</p>
            <p className="mt-1 text-ink/75">{tr("parents.curriculum.body")}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {examples.map((c) => (
                <li key={`${c.subject}-${c.grade}-${c.unit}`} className="rounded-full border-2 border-ink/15 px-3 py-1 text-sm">
                  <span className={cn("font-bold", SUBJECT_STYLES[c.subject].text)}>
                    {DISCIPLINES[c.subject].label} {c.grade}
                  </span>{" "}
                  <span className="text-ink/70">{c.unit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-bold">{tr("parents.guide.title")}</p>
              <p className="mt-1 text-ink/75">{tr("parents.guide.body")}</p>
            </div>
            <div>
              <p className="font-bold">{tr("parents.cert.title")}</p>
              <p className="mt-1 text-ink/75">{tr("parents.cert.body")}</p>
            </div>
          </div>
        </div>
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
    <section className="border-t-2 border-ink/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 md:flex-row md:items-center md:justify-between">
        <h2 className="font-bold text-ink/60">{tr("partners.eyebrow")}</h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {partners.map((p) => (
            <li key={p.name}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-14 items-center gap-3 rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-signal/50"
              >
                <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-ink/10">
                  <Image src={p.logo} alt={`${p.name} logo`} width={96} height={96} className="size-full object-contain" loading="lazy" />
                </span>
                <span>
                  <span className="block font-bold group-hover:text-signal">{p.name}</span>
                  <span className="block text-sm text-ink/65">{p.tag}</span>
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
    <section className="mx-auto max-w-6xl px-4 pb-8">
      <div className="relative overflow-hidden rounded-3xl bg-sun px-6 py-14 sm:px-12 sm:py-20">
        <h2 className="relative max-w-2xl font-dial text-6xl leading-[0.9] font-extrabold text-ink sm:text-8xl">{tr("cta.title")}</h2>
        <p className="relative mt-5 max-w-lg text-lg text-ink/80">{tr("cta.sub")}</p>
        <div className="relative mt-8 flex flex-wrap gap-3">
          {/* Plain <a>: signed out, this is the Google OAuth route, which needs a full-page navigation. */}
          <a href={primaryHref} className={cn(buttonVariants({ size: "lg" }), "bg-ink font-bold text-white hover:bg-ink/90")}>
            {primaryLabel}
          </a>
          {CONTACT_EMAIL && (
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Enrolling at Hasesa Academy")}`}
              className={cn(buttonVariants({ size: "lg", variant: "outline" }), "border-ink/40 bg-transparent font-bold text-ink hover:bg-ink/10 hover:text-ink")}
            >
              {tr("cta.enrol")}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
