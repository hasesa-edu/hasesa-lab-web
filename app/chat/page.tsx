import type { Metadata } from "next";
import Link from "next/link";
import { getCatalog } from "@/lib/experiments";
import { requireSession } from "@/lib/auth/session";
import { getEntitlement } from "@/lib/billing/entitlement";
import { CAPS, getCurrentUsage } from "@/lib/usage";
import { PLAN } from "@/lib/billing/plan";
import { BRAND } from "@/lib/brand";
import { GoogleButton } from "@/components/GoogleButton";
import { CheckoutButton } from "@/components/CheckoutButton";
import { ChatClient } from "./ChatClient";

export const metadata: Metadata = { title: `Lab Assistant · ${BRAND}` };
export const dynamic = "force-dynamic";

export default async function ChatPage({ searchParams }: { searchParams: Promise<{ experiment?: string }> }) {
  const sess = await requireSession();
  const ent = await getEntitlement(sess?.userId);

  if (!sess || !ent.active) {
    const { experiment } = await searchParams;
    const next = experiment ? `/chat?experiment=${encodeURIComponent(experiment)}` : "/chat";
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl" aria-hidden>
          🤖
        </div>
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-ink">The Lab Assistant is for subscribers</h1>
        <p className="mt-3 text-ink-muted leading-relaxed">
          Stuck on an experiment, or not sure why it worked? The assistant knows every {BRAND} guide and explains it step by
          step. Up to {PLAN.dailyChatCap} questions a day, as part of the {PLAN.priceEtb} ETB monthly pass.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          {sess ? (
            <CheckoutButton signedIn label={`Get ${BRAND} · ${PLAN.priceEtb} ETB / month`} />
          ) : (
            <GoogleButton next={next} />
          )}
          <Link href="/#pricing" className="text-sm text-brand hover:underline">
            See what's included
          </Link>
        </div>
      </div>
    );
  }

  const used = (await getCurrentUsage(sess.userId)).chatTurns;
  return <ChatClient catalog={getCatalog()} remainingToday={Math.max(0, CAPS.chatTurns - used)} dailyCap={CAPS.chatTurns} />;
}
