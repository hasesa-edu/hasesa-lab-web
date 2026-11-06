import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAccess, hasFullAccess } from "@/lib/access";
import { chatContextOptions, contextFromParams } from "@/lib/chat-context";
import { CAPS, getCurrentUsage } from "@/lib/usage";
import { BRAND } from "@/lib/brand";
import { PageHeader } from "@/components/PageHeader";
import { EnrolCard } from "@/components/module/ui";
import { ChatClient } from "./ChatClient";

export const metadata: Metadata = { title: `Lab Assistant · ${BRAND}` };
export const dynamic = "force-dynamic";

type SP = { module?: string; step?: string; concept?: string };

export default async function ChatPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const access = await getAccess();
  if (!access.userId) {
    const q = new URLSearchParams(Object.entries(sp).filter((e): e is [string, string] => typeof e[1] === "string")).toString();
    redirect(`/login?next=${encodeURIComponent(`/chat${q ? `?${q}` : ""}`)}`);
  }
  if (!hasFullAccess(access)) {
    return (
      <div>
        <PageHeader eyebrow={BRAND} title="Lab Assistant" description="An AI assistant that knows your module, for students enrolled at the Academy." />
        <div className="mx-auto max-w-3xl px-4 py-10">
          <EnrolCard signedIn next="/chat" />
        </div>
      </div>
    );
  }
  const used = (await getCurrentUsage(access.userId)).chatTurns;
  return (
    <ChatClient
      options={chatContextOptions()}
      initialContext={contextFromParams(sp)}
      remainingToday={Math.max(0, CAPS.chatTurns - used)}
      dailyCap={CAPS.chatTurns}
    />
  );
}
