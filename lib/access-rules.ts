// Pure access rules, shared by server code and tests.

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
