import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireSession } from "@/lib/auth/session";
import { getUserDTO } from "@/lib/auth/users";
import { BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { ArrowRight, SlidersHorizontal, UserRound } from "lucide-react";

export const metadata: Metadata = { title: `Account · ${BRAND}`, robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const sess = await requireSession();
  if (!sess) redirect("/login?next=/account");
  const user = await getUserDTO(sess.userId);
  if (!user) redirect("/login?next=/account");

  return (
    <div>
      <PageHeader
        eyebrow={BRAND}
        title="Account"
        description={
          <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 break-all">
            <UserRound className="size-4 shrink-0 text-sun" />
            <span className="font-semibold text-deep-foreground">{user.displayName}</span>
            <span>· {user.email} (Google)</span>
          </span>
        }
      />

      <div className="mx-auto max-w-3xl px-4 pt-8 pb-16">
        <section>
          <Button asChild variant="soft" size="lg" className="font-semibold">
            <Link href="/onboarding">
              <SlidersHorizontal /> Change grade & subjects <ArrowRight />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
