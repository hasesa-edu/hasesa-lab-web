// The single paid plan. Every successful payment adds `days` of access,
// stacked on top of any days the student still has left.
export const PLAN = {
  id: "monthly",
  priceEtb: 300,
  days: 30,
  dailyChatCap: 30,
} as const;

// Guides anyone can read without a plan, as a free sample.
export const FREE_GUIDE_IDS: readonly string[] = ["g9-phy-density-column", "bio-gen-01-dna-structure"];

export function isFreeGuide(id: string): boolean {
  return FREE_GUIDE_IDS.includes(id);
}

/** Client-safe check on a user's `paidUntil` ISO string. */
export function isPlanActive(paidUntil: string | null | undefined, now = Date.now()): boolean {
  return !!paidUntil && new Date(paidUntil).getTime() > now;
}

/** Whole days left on the pass, rounded up (0 when expired). */
export function daysLeft(paidUntil: string | null | undefined, now = Date.now()): number {
  if (!paidUntil) return 0;
  return Math.max(0, Math.ceil((new Date(paidUntil).getTime() - now) / 86_400_000));
}
