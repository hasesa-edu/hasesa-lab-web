"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "./UserProvider";
import { PLAN, daysLeft } from "@/lib/billing/plan";
import { BRAND } from "@/lib/brand";
import { ArrowRightIcon, ClockIcon } from "lucide-react";

const WARN_DAYS = 3;
const EXPIRED_GRACE_DAYS = 14;

/** Reminds students to renew when their pass is about to end, or ended recently. */
export function RenewBanner() {
  const { user } = useUser();
  const pathname = usePathname();
  if (!user?.paidUntil || pathname.startsWith("/account") || pathname.startsWith("/billing")) return null;

  const left = daysLeft(user.paidUntil);
  const endedDaysAgo = Math.floor((Date.now() - new Date(user.paidUntil).getTime()) / 86_400_000);
  let text: string | null = null;
  if (left > 0 && left <= WARN_DAYS) {
    text = `Your ${BRAND} pass ends in ${left} ${left === 1 ? "day" : "days"}.`;
  } else if (left === 0 && endedDaysAgo <= EXPIRED_GRACE_DAYS) {
    text = `Your ${BRAND} pass has ended.`;
  }
  if (!text) return null;

  return (
    <div className="bg-sun-soft border-b border-sun/50">
      <div className="max-w-5xl mx-auto px-4 py-1.5 text-sm text-amber-900 dark:text-amber-100 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-center">
        <span className="inline-flex items-center gap-1.5 font-medium">
          <ClockIcon aria-hidden className="size-4 text-sun" />
          {text}
        </span>
        <Link
          href="/account"
          className="inline-flex min-h-9 items-center gap-1 rounded-full bg-sun px-3.5 font-semibold text-deep shadow-soft transition hover:bg-sun/90"
        >
          Renew for {PLAN.priceEtb} ETB
          <ArrowRightIcon aria-hidden className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}
