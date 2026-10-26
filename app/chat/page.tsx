import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCatalog } from "@/lib/experiments";
import { requireSession } from "@/lib/auth/session";
import { getEntitlement } from "@/lib/billing/entitlement";
import { CAPS, getCurrentUsage } from "@/lib/usage";
import { PLAN } from "@/lib/billing/plan";
import { BRAND } from "@/lib/brand";
import { CheckoutButton } from "@/components/CheckoutButton";
import { Button } from "@/components/ui/button";
import { BookOpen, MessageCircle, Sparkles } from "lucide-react";
import { ChatClient } from "./ChatClient";

export const metadata: Metadata = { title: `Lab Assistant · ${BRAND}` };
export const dynamic = "force-dynamic";

export default async function ChatPage({ searchParams }: { searchParams: Promise<{ experiment?: string }> }) {
  const sess = await requireSession();
  if (!sess) {
    const { experiment } = await searchParams;
    const next = experiment ? `/chat?experiment=${encodeURIComponent(experiment)}` : "/chat";
    redirect(`/login?next=${encodeURIComponent(next)}`);
  }
  const ent = await getEntitlement(sess.userId);

  if (!ent.active) {
    const perks = [
      { icon: BookOpen, text: `Knows every ${BRAND} guide` },
      { icon: MessageCircle, text: "Explains it step by step" },
      { icon: Sparkles, text: `Up to ${PLAN.dailyChatCap} questions a day` },
    ];
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
        <section className="relative isolate overflow-hidden rounded-[2rem] bg-deep px-6 py-10 text-center text-deep-foreground shadow-pop sm:px-12 sm:py-14">
          <div aria-hidden className="absolute inset-0 -z-10 bg-grid text-primary-soft opacity-40" />
          <div aria-hidden className="absolute -top-24 -left-20 -z-10 size-72 rounded-full bg-primary/50 blur-3xl" />
          <div aria-hidden className="absolute -right-20 -bottom-24 -z-10 size-72 rounded-full bg-sun/25 blur-3xl" />
          <Sparkles aria-hidden className="absolute top-8 right-8 size-5 text-sun/70" />
          <Sparkles aria-hidden className="absolute bottom-10 left-8 size-4 text-primary-soft/60" />

          <span className="mx-auto flex size-16 animate-float items-center justify-center rounded-2xl bg-sun text-deep shadow-pop">
            <Sparkles className="size-8" />
          </span>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">The Lab Assistant is for subscribers</h1>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-deep-foreground/80">
            Stuck on an experiment, or not sure why it worked? The assistant knows every {BRAND} guide and explains it step by
            step. Up to {PLAN.dailyChatCap} questions a day, as part of the {PLAN.priceEtb} ETB monthly pass.
          </p>

          <ul className="mx-auto mt-8 grid max-w-xl gap-2 text-left sm:grid-cols-3">
            {perks.map((p) => (
              <li key={p.text} className="flex items-center gap-2.5 rounded-xl bg-white/10 px-3 py-2.5 text-sm ring-1 ring-white/10">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <p.icon className="size-3.5" />
                </span>
                <span className="leading-snug">{p.text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-center gap-2">
            <CheckoutButton
              signedIn
              label={`Get ${BRAND} · ${PLAN.priceEtb} ETB / month`}
              className="bg-sun text-deep shadow-pop hover:bg-sun/90"
            />
            <Button
              asChild
              variant="link"
              className="min-h-10 text-deep-foreground/80 hover:text-sun"
            >
              <Link href="/#pricing">See what's included</Link>
            </Button>
          </div>
        </section>
      </div>
    );
  }

  const used = (await getCurrentUsage(sess.userId)).chatTurns;
  return <ChatClient catalog={getCatalog()} remainingToday={Math.max(0, CAPS.chatTurns - used)} dailyCap={CAPS.chatTurns} />;
}
