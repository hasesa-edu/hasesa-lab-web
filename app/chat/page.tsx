import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCatalog } from "@/lib/experiments";
import { requireSession } from "@/lib/auth/session";
import { CAPS, getCurrentUsage } from "@/lib/usage";
import { BRAND } from "@/lib/brand";
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
  const used = (await getCurrentUsage(sess.userId)).chatTurns;
  return <ChatClient catalog={getCatalog()} remainingToday={Math.max(0, CAPS.chatTurns - used)} dailyCap={CAPS.chatTurns} />;
}
