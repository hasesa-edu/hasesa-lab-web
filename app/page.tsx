"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { googleSignInHref } from "@/components/GoogleButton";
import type { t as Dict } from "@/lib/i18n";
import { CheckoutButton } from "@/components/CheckoutButton";
import { PLAN, isPlanActive } from "@/lib/billing/plan";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Key = keyof typeof Dict;
type TR = (k: Key) => string;

export default function Home() {
  const { tr } = useLocale();
  const { user, ready } = useUser();
  const primaryHref = user ? "/dashboard" : googleSignInHref();
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
          // Background video — yields bandwidth to anything more visible.
          // React's <video> types don't include fetchpriority yet, so we
          // spread it as a raw attribute.
          {...({ fetchpriority: "low" } as Record<string, string>)}
          aria-label={tr("hero.video.alt")}
        >
          {/* Chrome/Firefox pick the smaller WebM; Safari falls through to MP4. */}
          <source src="/hero-demo.webm" type="video/webm" />
          <source src="/hero-demo.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for headline readability */}
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-b from-black/60 via-black/45 to-black/75"
        />

        <div className="relative w-full max-w-3xl mx-auto px-4 py-16 text-center text-white">
          <Badge
            variant="outline"
            className="h-auto gap-2 whitespace-normal border-white/30 bg-white/10 px-3 py-1 font-semibold text-white backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {tr("hero.tag")}
          </Badge>
          <h1 className="mt-6 text-5xl sm:text-6xl md:text-[4rem] font-extrabold leading-[0.95] tracking-tight text-white">
            {tr("hero.title.before")}{" "}
            <span className="text-primary-soft">{tr("hero.title.highlight")}</span>
          </h1>
          <p className="mt-6 text-lg text-white/90 max-w-xl mx-auto leading-relaxed">
            {tr("hero.sub")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {/* Plain <a>: the signed-out target is the Google OAuth route, which needs a full-page navigation. */}
            <a href={primaryHref} className={primaryCta}>
              {primaryLabel} →
            </a>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:border-white/70 hover:bg-white/20 hover:text-white dark:border-white/40 dark:bg-white/10 dark:hover:bg-white/20"
            >
              <a href="#pricing">{tr("hero.cta.pricing")}</a>
            </Button>
          </div>
          <p className="mt-5 text-xs text-white/80">
            <span className="inline-flex items-center gap-1 font-semibold text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {tr("hero.price")}
            </span>
            <span className="mx-2">·</span>
            {tr("hero.price.note")}
          </p>
        </div>
      </section>

      {/* PILLARS — on a brand-soft tint for visual rhythm */}
      <div className="bg-primary-soft/30">
        <section className="max-w-5xl mx-auto px-4 pt-20 sm:pt-24 pb-20 sm:pb-24">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.18em] font-bold text-primary">
              {tr("pillars.eyebrow")}
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.05]">
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
        <p className="text-center text-xs uppercase tracking-[0.18em] font-semibold text-primary">
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

      <Pricing tr={tr} />

      {/* FINAL CTA */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <Card className="relative gap-0 rounded-3xl text-base bg-linear-to-br from-primary-soft via-sun-soft/30 to-card p-8 text-center shadow-card ring-primary/30 sm:p-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {tr("cta.title")}
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">{tr("cta.sub")}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a href={primaryHref} className={primaryCta}>
              {primaryLabel} →
            </a>
            {user && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-card hover:border-primary/60 hover:bg-card hover:text-primary"
              >
                <Link href="/experiments" prefetch={false}>
                  {tr("hero.cta.lessons")}
                </Link>
              </Button>
            )}
          </div>
        </Card>
      </section>
    </div>
  );
}

/* ────────────────────────  PIECES  ──────────────────────── */

const primaryCta = cn(buttonVariants({ size: "lg" }), "font-semibold shadow-card");

function Pricing({ tr }: { tr: TR }) {
  const { user } = useUser();
  const active = isPlanActive(user?.paidUntil);
  const features: Key[] = [
    "pricing.f.guides",
    "pricing.f.videos",
    "pricing.f.assistant",
    "pricing.f.notebook",
    "pricing.f.scientists",
  ];
  return (
    <section id="pricing" className="max-w-5xl mx-auto px-4 pb-20 scroll-mt-20">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.18em] font-bold text-primary">{tr("pricing.eyebrow")}</p>
        <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.05]">
          {tr("pricing.title")}
        </h2>
        <p className="mt-3 text-muted-foreground">{tr("footer.motto")}.</p>
      </div>

      <Card className="mt-10 mx-auto max-w-md gap-0 rounded-3xl p-7 text-base shadow-card ring-2 ring-primary/40 sm:p-8">
        <p className="text-sm font-semibold text-primary uppercase tracking-wide">{tr("pricing.plan")}</p>
        <p className="mt-2 flex items-baseline gap-2">
          <span className="text-5xl font-extrabold tracking-tight text-foreground tabular-nums">{PLAN.priceEtb}</span>
          <span className="text-lg font-semibold text-foreground">ETB</span>
          <span className="text-muted-foreground">{tr("pricing.per")}</span>
        </p>
        <ul className="mt-6 space-y-2.5">
          {features.map((k) => (
            <li key={k} className="flex gap-2.5 text-sm text-foreground">
              <span aria-hidden className="mt-0.5 text-primary font-bold">✓</span>
              <span>{tr(k)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-7">
          {active && user?.paidUntil && (
            // role reset: this is a static status line, not something to announce on page load.
            <Alert
              role={undefined}
              className="mb-3 border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40"
            >
              <AlertDescription className="font-medium text-emerald-700 dark:text-emerald-300">
                {tr("pricing.active")} {formatDate(user.paidUntil)}.
              </AlertDescription>
            </Alert>
          )}
          <CheckoutButton
            signedIn={!!user}
            label={active ? tr("pricing.cta.renew") : tr("pricing.cta")}
            className="w-full py-3"
          />
        </div>
        <p className="mt-4 text-xs text-subtle-foreground leading-relaxed">
          {tr("pricing.pay")}{" "}
          <Link href="/refund" className="underline hover:text-primary">
            {tr("footer.refund")}
          </Link>
        </p>
        {!active && (
          <a
            href={user ? "/experiments" : googleSignInHref("/experiments")}
            className={cn(buttonVariants({ variant: "link" }), "mt-2 h-auto min-h-10 w-full whitespace-normal")}
          >
            {tr("pricing.free")} →
          </a>
        )}
      </Card>
    </section>
  );
}

function Backdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[800px] opacity-70 dark:opacity-40"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 0%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 70%)",
      }}
    />
  );
}

const pillarCard = "gap-0 rounded-3xl p-7 text-base shadow-card transition hover:shadow-pop sm:p-8";

/* Pillar 1: experiment, with at-home-recipe visual mock. */
function PillarExperiment({ tr }: { tr: TR }) {
  return (
    <Card className={pillarCard}>
      <div className="flex items-center gap-2">
        <span className="text-2xl">🧪</span>
        <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-primary">
          {tr("pillars.exp.eyebrow")}
        </p>
      </div>
      <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
        {tr("pillars.exp.title")}
      </h3>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        {tr("pillars.exp.body")}
      </p>

      <div className="mt-6 rounded-2xl border-2 border-dashed border-primary/30 bg-sun-soft/30 p-5">
        <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-amber-700 dark:text-amber-300">
          {tr("pillars.exp.mock.label")}
        </p>
        <h4 className="mt-1.5 text-lg font-bold tracking-tight text-foreground leading-snug">
          {tr("pillars.exp.mock.title")}
        </h4>
        <ol className="mt-4 space-y-2.5 text-sm text-foreground">
          <li className="flex items-start gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-[11px] font-bold">
              1
            </span>
            <span className="leading-relaxed">
              {tr("pillars.exp.mock.step1")}
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-[11px] font-bold">
              2
            </span>
            <span className="leading-relaxed">
              {tr("pillars.exp.mock.step2")}
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-[11px] font-bold">
              3
            </span>
            <span className="leading-relaxed">
              {tr("pillars.exp.mock.step3")}
            </span>
          </li>
        </ol>
      </div>
    </Card>
  );
}

/* Pillar 2: AI tutor, with chat-exchange visual mock. */
function PillarAITutor({ tr }: { tr: TR }) {
  return (
    <Card className={pillarCard}>
      <div className="flex items-center gap-2">
        <span className="text-2xl">💬</span>
        <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-primary">
          {tr("pillars.ai.eyebrow")}
        </p>
      </div>
      <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
        {tr("pillars.ai.title")}
      </h3>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        {tr("pillars.ai.body")}
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-muted p-4 space-y-3">
        <div className="flex justify-end">
          <div className="max-w-[85%] bg-primary text-primary-foreground px-3.5 py-2 rounded-2xl rounded-br-md text-sm shadow-soft">
            {tr("pillars.ai.mock.user")}
          </div>
        </div>
        <div className="max-w-[88%]">
          <div className="bg-card border border-border px-3.5 py-3 rounded-2xl rounded-bl-md text-sm shadow-soft space-y-2">
            <div className="text-center font-mono text-primary-strong font-bold py-1.5 bg-primary-soft/50 rounded-sm">
              F = m · a
            </div>
            <p className="text-foreground leading-relaxed">
              {tr("pillars.ai.mock.assistant1")}
            </p>
          </div>
          <p className="mt-2 text-[11px] text-subtle-foreground flex items-center gap-1 ml-1">
            <span>📖</span>
            <span>{tr("pillars.ai.mock.source")}</span>
          </p>
        </div>
      </div>
    </Card>
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
        className="group block h-full rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <Card className="h-full flex-row items-center gap-4 p-4 text-base shadow-soft transition group-hover:shadow-card group-hover:ring-primary/40 sm:p-5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-muted border border-border overflow-hidden">
          <Image
            src={logo}
            alt={`${name} logo`}
            width={128}
            height={128}
            className="h-full w-full object-contain"
            loading="lazy"
            // Below the fold so we keep loading="lazy", but when the user
            // scrolls here we want the logos ahead of the still-streaming
            // hero video.
            fetchPriority="high"
          />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-foreground tracking-tight group-hover:text-primary transition">
            {name}
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">{tag}</p>
        </div>
        </Card>
      </a>
    </li>
  );
}
