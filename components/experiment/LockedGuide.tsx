import Link from "next/link";
import { subjectMeta, type CatalogItem } from "@/lib/subjects";
import { PLAN } from "@/lib/billing/plan";
import { BRAND } from "@/lib/brand";
import { GoogleButton } from "@/components/GoogleButton";
import { CheckoutButton } from "@/components/CheckoutButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/** What a student without a plan sees instead of a paid guide. */
export function LockedGuide({ item, signedIn }: { item: CatalogItem; signedIn: boolean }) {
  const subject = subjectMeta(item.subject);
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Button asChild variant="link" className="px-0">
        <Link href="/experiments">← All experiments</Link>
      </Button>
      <header className="mt-1">
        <p className="text-xs uppercase tracking-wider text-primary font-semibold">
          Grade {item.grade} · {subject.emoji} {subject.label} · {item.unit}
        </p>
        <h1 className="mt-1.5 text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">{item.title}</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">{item.summary}</p>
        <p className="mt-3 text-sm text-subtle-foreground">
          ⏱ {item.estimatedMinutes} min · 🧰 {item.materialsCount} materials{item.hasVideo ? " · ▶ demo video" : ""}
        </p>
      </header>

      {/* py-0 gap-0: the blurred preview and overlay fill the card edge to edge. */}
      <Card className="relative mt-8 gap-0 rounded-2xl py-0 shadow-card">
        {/* Static, blurred stand-in for the guide; animate-none keeps low-end phones from repainting it. */}
        <div aria-hidden className="p-6 space-y-3 blur-[3px] select-none opacity-60">
          <Skeleton className="h-4 w-1/3 animate-none rounded-sm" />
          <Skeleton className="h-3 w-full animate-none rounded-sm" />
          <Skeleton className="h-3 w-5/6 animate-none rounded-sm" />
          <Skeleton className="h-3 w-2/3 animate-none rounded-sm" />
          <Skeleton className="h-16 w-full animate-none rounded-xl" />
          <Skeleton className="h-16 w-full animate-none rounded-xl" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center p-6 bg-background/60">
          <div className="max-w-sm text-center">
            <div className="text-3xl" aria-hidden>
              🔒
            </div>
            <h2 className="mt-2 text-xl font-bold text-foreground">This guide is for {BRAND} subscribers</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Get every step-by-step guide, demo video and the AI lab assistant for {PLAN.priceEtb} ETB a month.
            </p>
            <div className="mt-4 flex flex-col items-center gap-2">
              {signedIn ? (
                <CheckoutButton signedIn label={`Unlock for ${PLAN.priceEtb} ETB / month`} />
              ) : (
                <GoogleButton next={`/experiments/${item.id}`} label="Continue with Google" />
              )}
              <Button asChild variant="link">
                <Link href="/#pricing">See what's included</Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </article>
  );
}
