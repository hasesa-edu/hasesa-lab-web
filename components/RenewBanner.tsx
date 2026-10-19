"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "./UserProvider";
import { PLAN, daysLeft } from "@/lib/billing/plan";
import { BRAND } from "@/lib/brand";

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
    <div className="bg-sun-soft border-b border-amber-300 dark:border-amber-800">
      <div className="max-w-5xl mx-auto px-4 py-2 text-sm text-amber-900 dark:text-amber-100 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
        <span>{text}</span>
        <Link href="/account" className="font-semibold underline">
          Renew for {PLAN.priceEtb} ETB
        </Link>
      </div>
    </div>
  );
}
