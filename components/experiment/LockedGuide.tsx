import Link from "next/link";
import { CirclePlay, Clock, ListChecks, Lock, MessageCircle, NotebookPen, Package, type LucideIcon } from "lucide-react";
import type { CatalogItem } from "@/lib/subjects";
import { PLAN } from "@/lib/billing/plan";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { GoogleButton } from "@/components/GoogleButton";
import { CheckoutButton } from "@/components/CheckoutButton";
import { SUBJECT_STYLES, SubjectLabel } from "@/components/Subject";
import { Button } from "@/components/ui/button";

/** What a student without a plan sees instead of a paid guide. */
export function LockedGuide({ item, signedIn }: { item: CatalogItem; signedIn: boolean }) {
  const st = SUBJECT_STYLES[item.subject];
  const inside: { icon: LucideIcon; text: string }[] = [
    { icon: ListChecks, text: "Step-by-step guide with tips" },
    { icon: Package, text: `${item.materialsCount} materials from home or the market` },
    ...(item.hasVideo ? [{ icon: CirclePlay, text: "Demo video" }] : []),
    { icon: MessageCircle, text: "AI lab assistant" },
    { icon: NotebookPen, text: "Quiz and lab notebook" },
  ];

  return (
    <article className="relative">
      <div aria-hidden className="absolute inset-x-0 top-0 h-80 bg-dots text-primary opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <Link
          href="/experiments"
          className="inline-flex h-10 items-center text-sm font-medium text-muted-foreground outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          ← All experiments
        </Link>

        <header className="mt-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className={cn("inline-flex h-7 items-center rounded-full px-3", st.soft)}>
              <SubjectLabel subject={item.subject} />
            </span>
            <span className="text-xs font-semibold tracking-wide text-subtle-foreground uppercase">
              Grade {item.grade} · {item.unit}
            </span>
          </div>
          <h1 className="mt-3 text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-foreground sm:text-5xl">
            {item.title}
          </h1>
          <p className="mt-4 leading-relaxed text-muted-foreground sm:text-lg">{item.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            <Chip icon={Clock}>{item.estimatedMinutes} min</Chip>
            <Chip icon={Package}>{item.materialsCount} materials</Chip>
            {item.hasVideo && <Chip icon={CirclePlay}>demo video</Chip>}
          </div>
        </header>

        <section className="relative isolate mt-8 overflow-hidden rounded-[2rem] bg-deep p-6 text-deep-foreground shadow-pop sm:p-8">
          <div aria-hidden className="absolute inset-0 -z-10 bg-grid text-primary-soft opacity-50" />
          <div aria-hidden className="absolute -top-24 -right-20 -z-10 size-72 rounded-full bg-primary/50 blur-3xl" />
          <div aria-hidden className="absolute -bottom-28 -left-16 -z-10 size-64 rounded-full bg-sun/20 blur-3xl" />

          <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] sm:items-center">
            <div>
              <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-sun text-deep shadow-pop">
                <Lock aria-hidden className="size-7" />
              </span>
              <h2 className="mt-4 text-2xl leading-tight font-bold sm:text-3xl">This guide is for {BRAND} subscribers</h2>
              <p className="mt-2 text-sm leading-relaxed text-deep-foreground/80 sm:text-base">
                Get every step-by-step guide, demo video and the AI lab assistant for {PLAN.priceEtb} ETB a month.
              </p>
              <div className="mt-6 flex flex-col items-start gap-1">
                {signedIn ? (
                  <CheckoutButton
                    signedIn
                    label={`Unlock for ${PLAN.priceEtb} ETB / month`}
                    className="bg-sun text-deep hover:bg-sun/90"
                  />
                ) : (
                  <GoogleButton next={`/experiments/${item.id}`} label="Continue with Google" />
                )}
                <Button asChild variant="link" className="px-0 text-deep-foreground/85 hover:text-deep-foreground">
                  <Link href="/#pricing">See what's included</Link>
                </Button>
              </div>
            </div>

            <ul className="space-y-2">
              {inside.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 rounded-xl bg-white/10 px-3.5 py-3 text-sm ring-1 ring-white/10">
                  <Icon aria-hidden className="size-5 shrink-0 text-sun" />
                  <span className="flex-1">{text}</span>
                  <Lock aria-hidden className="size-3.5 shrink-0 text-deep-foreground/50" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </article>
  );
}

function Chip({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <span className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-primary-strong dark:text-primary">
      <Icon aria-hidden className="size-4" />
      {children}
    </span>
  );
}
