// Pure access rules, shared by server code and tests.

/**
 * Pilot: every account is enrolled at the Academy until the end of 2027
 * (Addis Ababa time). New sign-ups get this as their paid_until.
 */
export const PILOT_ENROLLED_UNTIL = new Date("2028-01-01T00:00:00+03:00");

export type AccessLevel = "public" | "signed-in" | "enrolled" | "guide";

export type Access = { level: "public"; userId?: undefined } | { level: Exclude<AccessLevel, "public">; userId: string };

export function accessFrom(user: { id: string; role: string | null; paidUntil: Date | null }, now = new Date()): Access {
  if (user.role === "guide") return { level: "guide", userId: user.id };
  if (user.paidUntil && user.paidUntil > now) return { level: "enrolled", userId: user.id };
  return { level: "signed-in", userId: user.id };
}

/** Enrolled students and the guide get every step, unit and the assistant. */
export function hasFullAccess(a: Access): a is Access & { userId: string } {
  return a.level === "enrolled" || a.level === "guide";
}
