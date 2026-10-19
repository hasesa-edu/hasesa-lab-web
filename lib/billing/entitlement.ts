import { db, schema } from "@/lib/db/client";
import { eq } from "drizzle-orm";
import { isFreeGuide } from "./plan";

export type Entitlement = {
  active: boolean;
  paidUntil: Date | null;
  /** Whole days left, rounded up. 0 when inactive. */
  daysLeft: number;
};

export const NO_ENTITLEMENT: Entitlement = { active: false, paidUntil: null, daysLeft: 0 };

export function entitlementFrom(paidUntil: Date | null, now = new Date()): Entitlement {
  if (!paidUntil || paidUntil <= now) return { active: false, paidUntil, daysLeft: 0 };
  const daysLeft = Math.ceil((paidUntil.getTime() - now.getTime()) / 86_400_000);
  return { active: true, paidUntil, daysLeft };
}

export async function getEntitlement(userId: string | undefined): Promise<Entitlement> {
  if (!userId) return NO_ENTITLEMENT;
  const rows = await db
    .select({ paidUntil: schema.users.paidUntil })
    .from(schema.users)
    .where(eq(schema.users.id, userId))
    .limit(1);
  return entitlementFrom(rows[0]?.paidUntil ?? null);
}

export function canReadGuide(id: string, ent: Entitlement): boolean {
  return isFreeGuide(id) || ent.active;
}
