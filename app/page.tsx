"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import type { t as Dict } from "@/lib/i18n";

type Key = keyof typeof Dict;

export default function Home() {
  const { tr } = useLocale();
  const { user, ready } = useUser();

  return (
    <div className="relative">
      <Backdrop />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-14 sm:pt-20 pb-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 backdrop-blur px-3 py-1 text-xs font-medium text-ink-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-brand" />
          {tr("hero.tag")}
        </div>
        <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-ink">
          {tr("hero.title")}
        </h1>
        <p className="mt-5 text-lg text-ink-muted max-w-2xl leading-relaxed">
          {tr("hero.sub")}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {ready && user ? (
            <Link
              href={user.role === "teacher" ? "/teacher" : "/dashboard"}
              className="inline-flex items-center px-5 py-2.5 bg-brand text-brand-on rounded-lg hover:bg-brand-hover font-medium shadow-soft transition"
            >
              {tr("hero.cta.dashboard")} →
            </Link>
          ) : (
            <Link
              href="/signup"
              className="inline-flex items-center px-5 py-2.5 bg-brand text-brand-on rounded-lg hover:bg-brand-hover font-medium shadow-soft transition"
            >
              {tr("hero.cta.signup")} →
            </Link>
          )}
          <Link
            href="/chat"
            className="inline-flex items-center px-5 py-2.5 bg-surface text-ink border border-line rounded-lg hover:border-brand/60 hover:text-brand font-medium transition"
          >
            {tr("hero.cta.chat")}
          </Link>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-hover dark:text-brand bg-brand-soft/60 px-2.5 py-1 rounded-full border border-brand/20">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            {tr("hero.pilot")}
          </span>
        </div>
      </section>

      {/* Product preview */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <ChatPreview tr={tr} />
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <SectionHeading title={tr("how.title")} subtitle={tr("how.sub")} />
        <ol className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { n: "1", t: tr("how.s1.title"), b: tr("how.s1.body") },
            { n: "2", t: tr("how.s2.title"), b: tr("how.s2.body") },
            { n: "3", t: tr("how.s3.title"), b: tr("how.s3.body") },
            { n: "4", t: tr("how.s4.title"), b: tr("how.s4.body") },
          ].map((s) => (
            <li
              key={s.n}
              className="rounded-xl border border-line bg-surface p-5 shadow-soft hover:border-brand/40 transition"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-soft text-brand-hover dark:text-brand text-sm font-bold">
                {s.n}
              </div>
              <h3 className="mt-3 font-semibold text-ink tracking-tight">{s.t}</h3>
              <p className="mt-1 text-sm text-ink-muted leading-relaxed">{s.b}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Audience split */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AudienceCard
            icon="🎓"
            title={tr("aud.students.title")}
            bullets={[tr("aud.students.b1"), tr("aud.students.b2"), tr("aud.students.b3")]}
            href={ready && user ? "/dashboard" : "/signup"}
            cta={tr("hero.cta.signup")}
          />
          <AudienceCard
            icon="👩‍🏫"
            title={tr("aud.teachers.title")}
            bullets={[tr("aud.teachers.b1"), tr("aud.teachers.b2"), tr("aud.teachers.b3")]}
            href={ready && user && user.role === "teacher" ? "/teacher" : "/signup"}
            cta={tr("nav.teacher")}
          />
        </div>
      </section>

      {/* Why us */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <SectionHeading title={tr("why.title")} subtitle={tr("why.sub")} />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <WhyCard
            icon={<ChatIcon />}
            title={tr("why.b1.title")}
            body={tr("why.b1.body")}
          />
          <WhyCard
            icon={<GlobeIcon />}
            title={tr("why.b2.title")}
            body={tr("why.b2.body")}
          />
          <WhyCard
            icon={<TargetIcon />}
            title={tr("why.b3.title")}
            body={tr("why.b3.body")}
          />
          <WhyCard
            icon={<WifiIcon />}
            title={tr("why.b4.title")}
            body={tr("why.b4.body")}
          />
        </div>
      </section>

      {/* Dewey quote */}
      <section className="max-w-3xl mx-auto px-4 pb-20">
        <figure className="relative rounded-2xl border border-line bg-surface px-6 py-10 sm:px-10 sm:py-14 text-center shadow-soft overflow-hidden">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-4 left-6 sm:left-10 text-[120px] leading-none font-serif text-brand/15 select-none"
          >
            &ldquo;
          </span>
          <p className="text-xs uppercase tracking-[0.18em] font-semibold text-brand">
            {tr("dewey.eyebrow")}
          </p>
          <blockquote className="mt-4 text-xl sm:text-2xl font-medium italic leading-relaxed tracking-tight text-ink">
            {tr("dewey.quote")}
          </blockquote>
          <figcaption className="mt-4 text-sm text-ink-muted">
            {tr("dewey.attribution")}
          </figcaption>
          <div className="mx-auto mt-8 h-px w-12 bg-line" />
          <p className="mt-6 text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl mx-auto">
            {tr("dewey.gloss")}
          </p>
        </figure>
      </section>

      {/* Final CTA */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <div className="rounded-2xl border border-brand/30 bg-gradient-to-br from-brand-soft/60 to-surface p-8 sm:p-10 text-center shadow-soft">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
            {tr("cta.title")}
          </h2>
          <p className="mt-2 text-ink-muted">{tr("cta.sub")}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={ready && user ? (user.role === "teacher" ? "/teacher" : "/dashboard") : "/signup"}
              className="inline-flex items-center px-5 py-2.5 bg-brand text-brand-on rounded-lg hover:bg-brand-hover font-medium shadow-soft transition"
            >
              {ready && user ? tr("hero.cta.dashboard") : tr("hero.cta.signup")} →
            </Link>
            <Link
              href="/lessons"
              className="inline-flex items-center px-5 py-2.5 bg-surface text-ink border border-line rounded-lg hover:border-brand/60 hover:text-brand font-medium transition"
            >
              {tr("hero.cta.lessons")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ──────────────────────── pieces ──────────────────────── */

function Backdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] opacity-60 dark:opacity-40"
      style={{
        background:
          "radial-gradient(ellipse 60% 40% at 50% 0%, rgb(var(--brand) / 0.18), transparent 70%)",
      }}
    />
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">{title}</h2>
      <p className="mt-2 text-ink-muted max-w-2xl">{subtitle}</p>
    </div>
  );
}

function AudienceCard({
  icon,
  title,
  bullets,
  href,
  cta,
}: {
  icon: string;
  title: string;
  bullets: string[];
  href: string;
  cta: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-6 shadow-soft hover:border-brand/40 hover:shadow-card transition flex flex-col">
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-ink-muted flex-1">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2">
            <CheckIcon />
            <span className="leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className="mt-5 inline-flex items-center text-sm font-medium text-brand hover:text-brand-hover transition self-start"
      >
        {cta} →
      </Link>
    </div>
  );
}

function WhyCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-5 shadow-soft hover:border-brand/40 transition">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-soft text-brand-hover dark:text-brand">
        {icon}
      </div>
      <h3 className="mt-3 font-semibold text-ink tracking-tight">{title}</h3>
      <p className="mt-1 text-sm text-ink-muted leading-relaxed">{body}</p>
    </div>
  );
}

/* Mocked-up chat preview — gives visitors a visual feel of the AI tutor */
function ChatPreview({ tr }: { tr: (k: Key) => string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface shadow-card overflow-hidden">
      {/* faux window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-line bg-surface-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-3 text-xs text-ink-subtle font-medium">{tr("chat.title")}</span>
      </div>
      <div className="p-5 sm:p-6 space-y-3">
        <ChatBubble role="user">
          Explain Newton&apos;s second law with a simple example.
        </ChatBubble>
        <ChatBubble role="assistant">
          <p className="text-sm">
            Newton&apos;s second law says <strong>F = m·a</strong> — the force on an object equals
            its mass times its acceleration.
          </p>
          <p className="text-sm mt-2">
            <span className="font-medium">Example.</span> A 2&nbsp;kg ball pushed with a force of
            10&nbsp;N accelerates at{" "}
            <code className="bg-brand-soft/60 text-brand-hover dark:text-brand px-1.5 py-0.5 rounded">
              a = F/m = 5 m/s²
            </code>
            .
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-ink-subtle">
            <span>📖</span>
            <span>From: Physics · Newton&apos;s laws of motion</span>
          </div>
        </ChatBubble>
      </div>
    </div>
  );
}

function ChatBubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  if (role === "user") {
    return (
      <div className="ml-auto max-w-[80%] bg-brand text-brand-on px-4 py-2.5 rounded-2xl rounded-br-md text-sm shadow-soft w-fit">
        {children}
      </div>
    );
  }
  return (
    <div className="mr-auto max-w-[88%] bg-surface-2 border border-line px-4 py-3 rounded-2xl rounded-bl-md text-ink shadow-soft w-fit">
      {children}
    </div>
  );
}

/* Inline icons (stroke uses currentColor so theme adapts) */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke} aria-hidden>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke} aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
    </svg>
  );
}
function TargetIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke} aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function WifiIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke} aria-hidden>
      <path d="M5 12.55a11 11 0 0 1 14 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.94 0" />
      <circle cx="12" cy="20" r="0.5" fill="currentColor" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      className="mt-0.5 shrink-0 text-brand"
      {...stroke}
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
