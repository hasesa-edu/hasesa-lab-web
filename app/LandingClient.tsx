"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, Clock, FlaskConical, MessageCircle, Search, Sparkles } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { googleSignInHref } from "@/components/GoogleButton";
import { CheckoutButton } from "@/components/CheckoutButton";
import { SUBJECT_STYLES, SubjectIcon, SubjectLabel, SubjectTile } from "@/components/Subject";
import type { t as Dict } from "@/lib/i18n";
import type { CatalogItem } from "@/lib/experiments";
import { PLAN, isPlanActive } from "@/lib/billing/plan";
import { SUBJECTS } from "@/lib/subjects";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";

type Key = keyof typeof Dict;
type TR = (k: Key) => string;

export function LandingClient({ catalog }: { catalog: CatalogItem[] }) {
  const { tr } = useLocale();
  const { user, ready } = useUser();
  const primaryHref = user ? "/dashboard" : googleSignInHref();
  const primaryLabel = ready && user ? tr("hero.cta.dashboard") : tr("hero.cta.signup");

  return (
    <div className="overflow-hidden">
      <Hero tr={tr} primaryHref={primaryHref} primaryLabel={primaryLabel} catalog={catalog} />
      <ExperimentStrip tr={tr} catalog={catalog} />
      <HowItWorks tr={tr} />
      <Showcase tr={tr} catalog={catalog} signedIn={!!user} />
      <AssistantSection tr={tr} />
      <Partners tr={tr} />
      <Pricing tr={tr} />
      <FinalCta tr={tr} primaryHref={primaryHref} primaryLabel={primaryLabel} />
    </div>
  );
}

/* ─────────────────────────────  HERO  ───────────────────────────── */

function Hero({
  tr,
  primaryHref,
  primaryLabel,
  catalog,
}: {
  tr: TR;
  primaryHref: string;
  primaryLabel: string;
  catalog: CatalogItem[];
}) {
  const sticker = catalog.find((e) => e.free) ?? catalog[0];
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
            {/* Plain <a>: signed out, this is the Google OAuth route, which needs a full-page navigation. */}
            <a
              href={primaryHref}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-sun font-semibold text-deep shadow-pop hover:bg-sun/90"
              )}
            >
              {primaryLabel}
              <ArrowRight />
            </a>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="text-deep-foreground hover:bg-white/10 hover:text-deep-foreground dark:hover:bg-white/10"
            >
              <a href="#pricing">{tr("hero.cta.pricing")}</a>
            </Button>
          </div>

          <p className="mt-6 text-sm text-deep-foreground/70">
            <span className="font-semibold text-deep-foreground">{tr("hero.price")}</span>
            <span className="mx-2">·</span>
            {tr("hero.price.note")}
          </p>
        </div>

        <HeroVisual tr={tr} sticker={sticker} />
      </div>
    </section>
  );
}

function HeroVisual({ tr, sticker }: { tr: TR; sticker: CatalogItem }) {
  const s = SUBJECT_STYLES[sticker.subject];
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* Video, framed like a photo pinned to the notebook */}
      <div className="relative rotate-2 rounded-[2rem] bg-deep-foreground/10 p-2 shadow-pop ring-1 ring-white/15 sm:p-3">
        <video
          className="aspect-[4/5] w-full rounded-[1.5rem] object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
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
      </div>

      {/* Sticker: a real experiment card */}
      <div
        className="absolute -bottom-6 -left-3 w-56 animate-float rounded-2xl bg-card p-3.5 text-card-foreground shadow-pop ring-1 ring-border sm:-left-8 sm:w-64"
        style={{ ["--tilt" as string]: "-4deg" }}
      >
        <div className="flex items-center justify-between">
          <SubjectLabel subject={sticker.subject} />
          {sticker.free && <Badge variant="success">{tr("showcase.free")}</Badge>}
        </div>
        <p className="mt-1.5 text-sm leading-snug font-semibold">{sticker.title}</p>
        <div className={cn("mt-2.5 h-1.5 overflow-hidden rounded-full", s.soft)}>
          <div className={cn("h-full w-2/3 rounded-full", s.bg)} />
        </div>
        <p className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground">
          <Clock className="size-3" /> {sticker.estimatedMinutes} {tr("showcase.min")}
        </p>
      </div>

      {/* Sticker: the assistant answering */}
      <div
        className="absolute -top-5 -right-2 w-52 animate-float rounded-2xl rounded-tr-md bg-sun-soft p-3 text-sm text-foreground shadow-pop ring-1 ring-sun/30 [animation-delay:-3s] sm:-right-6 sm:w-60"
        style={{ ["--tilt" as string]: "3deg" }}
      >
        <p className="flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-chemistry uppercase">
          <MessageCircle className="size-3.5" /> {tr("pillars.ai.eyebrow")}
        </p>
        <p className="mt-1 leading-snug">{tr("pillars.ai.mock.assistant1")}</p>
      </div>
    </div>
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

/* ─────────────────────  EXPERIMENT MARQUEE  ───────────────────── */

function ExperimentStrip({ tr, catalog }: { tr: TR; catalog: CatalogItem[] }) {
  const items = catalog.slice(0, 14);
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-3 pr-3">
      {items.map((e) => (
        <li
          key={e.id}
          className="flex items-center gap-2 rounded-full bg-white/10 py-1.5 pr-4 pl-1.5 text-sm font-medium whitespace-nowrap text-primary-foreground"
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-white/15">
            <SubjectIcon subject={e.subject} className="size-4" />
          </span>
          {e.title}
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

/* ─────────────────────────  HOW IT WORKS  ───────────────────────── */

function HowItWorks({ tr }: { tr: TR }) {
  const steps = [
    { n: "01", icon: Search, title: tr("how.1.title"), body: tr("how.1.body"), tone: "bg-primary-soft text-primary-strong" },
    { n: "02", icon: FlaskConical, title: tr("how.2.title"), body: tr("how.2.body"), tone: "bg-sun-soft text-chemistry" },
    { n: "03", icon: BookOpen, title: tr("how.3.title"), body: tr("how.3.body"), tone: "bg-physics-soft text-physics" },
  ];
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20 sm:py-24">
      <SectionHeading eyebrow={tr("how.eyebrow")} title={tr("how.title")} />
      <ol className="relative mt-10 grid gap-8 md:mt-14 md:grid-cols-3 md:gap-6">
        {/* Dashed line joining the steps on wide screens */}
        <div aria-hidden className="absolute top-8 right-[16%] left-[16%] hidden border-t-2 border-dashed border-primary/30 md:block" />
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

function Showcase({ tr, catalog, signedIn }: { tr: TR; catalog: CatalogItem[]; signedIn: boolean }) {
  // Free guides first, then one of each subject so all three colors show.
  const picks: CatalogItem[] = [];
  for (const e of catalog.filter((e) => e.free)) picks.push(e);
  for (const s of SUBJECTS) {
    const e = catalog.find((x) => x.subject === s.id && !picks.includes(x));
    if (e) picks.push(e);
  }
  for (const e of catalog) if (picks.length < 6 && !picks.includes(e)) picks.push(e);
  const shown = picks.slice(0, 6);

  const avgMinutes = Math.round(catalog.reduce((n, e) => n + e.estimatedMinutes, 0) / Math.max(catalog.length, 1));
  const stats = [
    { value: String(catalog.length), label: tr("showcase.stat.experiments") },
    { value: String(SUBJECTS.length), label: tr("showcase.stat.subjects") },
    { value: "4", label: tr("showcase.stat.grades") },
    { value: `~${avgMinutes}`, label: tr("showcase.stat.minutes") },
  ];
  const hrefFor = (id: string) => (signedIn ? `/experiments/${id}` : googleSignInHref(`/experiments/${id}`));

  return (
    <section className="relative bg-primary-soft/40">
      <div aria-hidden className="absolute inset-0 bg-dots text-primary opacity-40" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow={tr("showcase.eyebrow")} title={tr("showcase.title")} sub={tr("showcase.sub")} align="left" />
          <dl className="grid shrink-0 grid-cols-4 gap-2 rounded-2xl bg-card p-2 shadow-card ring-1 ring-border">
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
          {shown.map((e) => {
            const st = SUBJECT_STYLES[e.subject];
            return (
              <li key={e.id} className="w-[80%] shrink-0 snap-start sm:w-auto">
                {/* Plain <a>: signed out, these go through Google sign-in first. */}
                <a
                  href={hrefFor(e.id)}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card p-5 shadow-card ring-1 ring-border transition hover:-translate-y-1 hover:shadow-pop focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <span aria-hidden className={cn("absolute inset-x-0 top-0 h-1.5", st.bg)} />
                  <div className="flex items-start justify-between gap-3">
                    <SubjectTile subject={e.subject} />
                    {e.free ? (
                      <Badge variant="success">{tr("showcase.free")}</Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">
                        {tr("showcase.grade")} {e.grade}
                      </Badge>
                    )}
                  </div>
                  <h3 className="mt-4 text-lg leading-snug font-bold group-hover:text-primary-strong">{e.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{e.summary}</p>
                  <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5" /> {e.estimatedMinutes} {tr("showcase.min")}
                    </span>
                    <ArrowRight className={cn("size-4 transition group-hover:translate-x-1", st.text)} />
                  </div>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 text-center">
          <a
            href={signedIn ? "/experiments" : googleSignInHref("/experiments")}
            className={cn(buttonVariants({ variant: "soft", size: "lg" }), "font-semibold")}
          >
            {tr("showcase.all")} <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────  ASSISTANT  ────────────────────────── */

function AssistantSection({ tr }: { tr: TR }) {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:py-24 lg:grid-cols-2">
      <div>
        <p className="text-xs font-bold tracking-[0.18em] text-primary uppercase">{tr("pillars.ai.eyebrow")}</p>
        <h2 className="mt-2 text-4xl leading-[1.05] font-extrabold sm:text-5xl">{tr("pillars.ai.title")}</h2>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">{tr("pillars.ai.body")}</p>

        <div className="mt-8 rounded-2xl border-2 border-dashed border-sun/50 bg-sun-soft/40 p-5">
          <p className="text-[11px] font-bold tracking-[0.18em] text-chemistry uppercase">{tr("pillars.exp.mock.label")}</p>
          <h3 className="mt-1 text-lg font-bold">{tr("pillars.exp.mock.title")}</h3>
          <ol className="mt-3 space-y-2 text-sm">
            {(["pillars.exp.mock.step1", "pillars.exp.mock.step2", "pillars.exp.mock.step3"] as Key[]).map((k, i) => (
              <li key={k} className="flex items-start gap-2.5">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{tr(k)}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Chat mock on the deep panel */}
      <div className="relative overflow-hidden rounded-[2rem] bg-deep p-5 text-deep-foreground shadow-pop sm:p-7">
        <div aria-hidden className="absolute inset-0 bg-grid text-primary-soft opacity-40" />
        <div aria-hidden className="absolute -top-20 -right-16 size-60 rounded-full bg-primary/50 blur-3xl" />
        <div className="relative space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="flex size-8 items-center justify-center rounded-full bg-sun text-deep">
              <Sparkles className="size-4" />
            </span>
            {tr("nav.assistant")}
          </div>
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm text-primary-foreground shadow-soft">
              {tr("pillars.ai.mock.user")}
            </div>
          </div>
          <div className="max-w-[90%] space-y-2 rounded-2xl rounded-bl-md bg-card p-4 text-sm text-card-foreground shadow-soft">
            <div className="rounded-lg bg-primary-soft/60 py-2 text-center font-mono text-base font-bold text-primary-strong">
              F = m · a
            </div>
            <p className="leading-relaxed">{tr("pillars.ai.mock.assistant1")}</p>
          </div>
          <p className="flex items-center gap-1.5 text-xs text-deep-foreground/70">
            <BookOpen className="size-3.5" /> {tr("pillars.ai.mock.source")}
          </p>
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

/* ───────────────────────────  PRICING  ─────────────────────────── */

function Pricing({ tr }: { tr: TR }) {
  const { user } = useUser();
  const active = isPlanActive(user?.paidUntil);
  const features: Key[] = ["pricing.f.guides", "pricing.f.videos", "pricing.f.assistant", "pricing.f.notebook", "pricing.f.scientists"];
  return (
    <section id="pricing" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:py-24">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-deep text-deep-foreground shadow-pop">
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid text-primary-soft opacity-40" />
        <div aria-hidden className="absolute -bottom-24 -left-24 -z-10 size-80 rounded-full bg-primary/50 blur-3xl" />
        <div aria-hidden className="absolute -top-24 right-0 -z-10 size-72 rounded-full bg-sun/20 blur-3xl" />

        <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-2 lg:p-14">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-sun uppercase">{tr("pricing.eyebrow")}</p>
            <h2 className="mt-2 text-4xl leading-[1.05] font-extrabold sm:text-5xl">{tr("pricing.title")}</h2>
            <p className="mt-3 text-deep-foreground/75">{tr("footer.motto")}.</p>
            <p className="mt-8 flex items-baseline gap-2">
              <span className="font-heading text-7xl font-extrabold tracking-tight text-sun tabular-nums">{PLAN.priceEtb}</span>
              <span className="text-xl font-semibold">ETB</span>
              <span className="text-deep-foreground/70">{tr("pricing.per")}</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-deep-foreground/70">
              {tr("pricing.pay")}{" "}
              <Link href="/refund" className="underline hover:text-sun">
                {tr("footer.refund")}
              </Link>
            </p>
          </div>

          <div className="rounded-2xl bg-card p-6 text-card-foreground shadow-card sm:p-7">
            <p className="text-sm font-semibold tracking-wide text-primary uppercase">{tr("pricing.plan")}</p>
            <ul className="mt-4 space-y-3">
              {features.map((k) => (
                <li key={k} className="flex gap-3 text-sm">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-strong">
                    <Check className="size-3.5" />
                  </span>
                  <span>{tr(k)}</span>
                </li>
              ))}
            </ul>
            {active && user?.paidUntil && (
              <p className="mt-5 rounded-lg bg-biology-soft px-3 py-2 text-sm font-medium text-biology">
                {tr("pricing.active")} {formatDate(user.paidUntil)}.
              </p>
            )}
            <div className="mt-6">
              <CheckoutButton signedIn={!!user} label={active ? tr("pricing.cta.renew") : tr("pricing.cta")} className="w-full" />
            </div>
            {!active && (
              <a
                href={user ? "/experiments" : googleSignInHref("/experiments")}
                className={cn(buttonVariants({ variant: "link" }), "mt-2 h-auto min-h-10 w-full whitespace-normal")}
              >
                {tr("pricing.free")} →
              </a>
            )}
          </div>
        </div>
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
            {SUBJECTS.map((s) => (
              <SubjectTile key={s.id} subject={s.id} size="lg" className="bg-card shadow-card" />
            ))}
          </div>
          <h2 className="mt-6 text-4xl font-extrabold sm:text-5xl">{tr("cta.title")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{tr("cta.sub")}</p>
          <a href={primaryHref} className={cn(buttonVariants({ size: "lg" }), "mt-8 font-semibold shadow-pop")}>
            {primaryLabel}
            <ArrowRight />
          </a>
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
