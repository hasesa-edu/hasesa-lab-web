import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireSession } from "@/lib/auth/session";
import { getUserDTO } from "@/lib/auth/users";
import { formatDate } from "@/lib/format";
import { BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { EnrolCard } from "@/components/module/ui";
import { ArrowRight, GraduationCap, UserRound } from "lucide-react";

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
        <section className="rounded-2xl bg-card p-5 shadow-card ring-1 ring-border sm:p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
            <GraduationCap aria-hidden className="size-5 text-primary" /> Hasesa Academy
          </h2>
          <p className="mt-2 text-muted-foreground">
            {user.access === "guide"
              ? "You're the Academy's guide."
              : user.access === "enrolled"
                ? `You're enrolled until ${formatDate(user.paidUntil!)}.`
                : user.paidUntil
                  ? `Your enrolment ended on ${formatDate(user.paidUntil)}. Your progress is saved; enrol again to continue.`
                  : "You're signed up but not enrolled yet."}
          </p>
          <Button asChild variant="soft" className="mt-4 font-semibold">
            <Link href={user.access === "guide" ? "/guide" : "/dashboard"}>
              {user.access === "guide" ? "Open the student tracker" : "Go to my dashboard"} <ArrowRight />
            </Link>
          </Button>
        </section>
        {user.access === "signed-in" && <EnrolCard signedIn next="/dashboard" className="mt-6" />}
      </div>
    </div>
  );
}
