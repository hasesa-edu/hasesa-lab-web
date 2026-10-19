import Link from "next/link";
import { subjectMeta, type CatalogItem } from "@/lib/subjects";
import { PLAN } from "@/lib/billing/plan";
import { BRAND } from "@/lib/brand";
import { GoogleButton } from "@/components/GoogleButton";
import { CheckoutButton } from "@/components/CheckoutButton";

/** What a student without a plan sees instead of a paid guide. */
export function LockedGuide({ item, signedIn }: { item: CatalogItem; signedIn: boolean }) {
  const subject = subjectMeta(item.subject);
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/experiments" className="text-sm text-brand hover:underline">
        ← All experiments
      </Link>
      <header className="mt-3">
        <p className="text-xs uppercase tracking-wider text-brand font-semibold">
          Grade {item.grade} · {subject.emoji} {subject.label} · {item.unit}
        </p>
        <h1 className="mt-1.5 text-4xl sm:text-5xl font-extrabold tracking-tight text-ink leading-tight">{item.title}</h1>
        <p className="mt-3 text-ink-muted leading-relaxed">{item.summary}</p>
        <p className="mt-3 text-sm text-ink-subtle">
          ⏱ {item.estimatedMinutes} min · 🧰 {item.materialsCount} materials{item.hasVideo ? " · ▶ demo video" : ""}
        </p>
      </header>

      <div className="relative mt-8 rounded-2xl border border-line bg-surface overflow-hidden shadow-card">
        <div aria-hidden className="p-6 space-y-3 blur-[3px] select-none opacity-60">
          <div className="h-4 w-1/3 rounded bg-surface-2" />
          <div className="h-3 w-full rounded bg-surface-2" />
          <div className="h-3 w-5/6 rounded bg-surface-2" />
          <div className="h-3 w-2/3 rounded bg-surface-2" />
          <div className="h-16 w-full rounded-xl bg-surface-2" />
          <div className="h-16 w-full rounded-xl bg-surface-2" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center p-6 bg-canvas/60">
          <div className="max-w-sm text-center">
            <div className="text-3xl" aria-hidden>
              🔒
            </div>
            <h2 className="mt-2 text-xl font-bold text-ink">This guide is for {BRAND} subscribers</h2>
            <p className="mt-1.5 text-sm text-ink-muted">
              Get every step-by-step guide, demo video and the AI lab assistant for {PLAN.priceEtb} ETB a month.
            </p>
            <div className="mt-4 flex flex-col items-center gap-2">
              {signedIn ? (
                <CheckoutButton signedIn label={`Unlock for ${PLAN.priceEtb} ETB / month`} />
              ) : (
                <GoogleButton next={`/experiments/${item.id}`} label="Continue with Google" />
              )}
              <Link href="/#pricing" className="text-sm text-brand hover:underline">
                See what's included
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
