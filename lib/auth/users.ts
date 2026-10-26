import { db, schema } from "@/lib/db/client";
import { and, eq, isNull, ne } from "drizzle-orm";
import type { Locale } from "@/lib/i18n";
import { SUBJECTS, isGrade, type Grade, type Subject } from "@/lib/subjects";

const VALID_SUBJECTS = new Set<string>(SUBJECTS.map((s) => s.id));
const VALID_LOCALES = new Set<string>(["en"]);
const MAX_TEXT = 120;
const MAX_SUBJECTS = 8;

function capStr(v: unknown, max = MAX_TEXT): string | undefined {
  if (typeof v !== "string") return undefined;
  return v.trim().slice(0, max);
}

function cleanSubjects(v: unknown): Subject[] | undefined {
  if (!Array.isArray(v)) return undefined;
  return v
    .filter((x): x is Subject => typeof x === "string" && VALID_SUBJECTS.has(x))
    .slice(0, MAX_SUBJECTS);
}

function cleanGrade(v: unknown): Grade | null | undefined {
  if (v === null) return null;
  return isGrade(v) ? v : undefined;
}

export type UserDTO = {
  id: string;
  email: string;
  displayName: string;
  language: Locale;
  region?: string | null;
  school?: string | null;
  under18: boolean;
  extendedRetention: boolean;
  subjects: Subject[];
  grade: Grade | null;
  avatarUrl: string | null;
  /** ISO timestamp the paid pass ends, or null if the student never paid. */
  paidUntil: string | null;
};

/**
 * Find or create the account for a verified Google identity. Matches on the
 * Google account ID first. An email match only links an account that has no
 * Google ID yet (created before Google sign-in), so a second Google account
 * with the same email can't take over an existing one. Returns whether this
 * is a brand-new account.
 */
export async function upsertGoogleUser(profile: {
  sub: string;
  email: string;
  name?: string;
  picture?: string;
}): Promise<{ userId: string; isNew: boolean }> {
  const email = profile.email.trim().toLowerCase().slice(0, 254);
  const displayName = (capStr(profile.name, 100) || email.split("@")[0]).slice(0, 100);
  const avatarUrl = typeof profile.picture === "string" && profile.picture.startsWith("https://") ? profile.picture : null;

  const bySub = await findBySub(profile.sub);
  if (bySub) {
    // Keep the email in sync with Google, unless another account already holds it.
    const taken = await db
      .select({ id: schema.users.id })
      .from(schema.users)
      .where(and(eq(schema.users.email, email), ne(schema.users.id, bySub)))
      .limit(1);
    await db
      .update(schema.users)
      .set(taken.length ? { avatarUrl } : { email, avatarUrl })
      .where(eq(schema.users.id, bySub));
    return { userId: bySub, isNew: false };
  }

  const linked = await db
    .update(schema.users)
    .set({ googleSub: profile.sub, avatarUrl })
    .where(and(eq(schema.users.email, email), isNull(schema.users.googleSub)))
    .returning({ id: schema.users.id });
  if (linked.length) return { userId: linked[0].id, isNew: false };

  const id = crypto.randomUUID();
  const inserted = await db
    .insert(schema.users)
    .values({ id, email, googleSub: profile.sub, displayName, avatarUrl })
    .onConflictDoNothing()
    .returning({ id: schema.users.id });
  if (inserted.length) return { userId: id, isNew: true };

  // Lost a race with a parallel sign-in for the same Google account.
  const raced = await findBySub(profile.sub);
  if (raced) return { userId: raced, isNew: false };
  // The email belongs to an account linked to a different Google ID.
  throw new EmailTakenError();
}

export class EmailTakenError extends Error {
  constructor() {
    super("email already linked to another Google account");
  }
}

async function findBySub(sub: string): Promise<string | null> {
  const rows = await db.select({ id: schema.users.id }).from(schema.users).where(eq(schema.users.googleSub, sub)).limit(1);
  return rows[0]?.id ?? null;
}

export async function getUserDTO(userId: string): Promise<UserDTO | null> {
  const rows = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.id, userId))
    .limit(1);
  if (!rows.length) return null;
  const u = rows[0];

  return {
    id: u.id,
    email: u.email,
    displayName: u.displayName,
    language: u.language as Locale,
    region: u.region,
    school: u.school,
    under18: u.under18,
    extendedRetention: u.extendedRetention,
    subjects: ((u.subjects ?? []) as string[]).filter((s): s is Subject => VALID_SUBJECTS.has(s)),
    grade: isGrade(u.grade) ? u.grade : null,
    avatarUrl: u.avatarUrl,
    paidUntil: u.paidUntil ? u.paidUntil.toISOString() : null,
  };
}

export async function updateUserProfile(
  userId: string,
  patch: {
    subjects?: Subject[];
    grade?: Grade | null;
    language?: Locale;
    region?: string;
    school?: string;
    extendedRetention?: boolean;
  }
) {
  const set: Record<string, unknown> = {};
  if (patch.subjects !== undefined) {
    const s = cleanSubjects(patch.subjects);
    if (s !== undefined) set.subjects = s;
  }
  if (patch.grade !== undefined) {
    const g = cleanGrade(patch.grade);
    if (g !== undefined) set.grade = g;
  }
  if (patch.language !== undefined && VALID_LOCALES.has(patch.language as string)) {
    set.language = patch.language;
  }
  if (patch.region !== undefined) set.region = capStr(patch.region) ?? null;
  if (patch.school !== undefined) set.school = capStr(patch.school) ?? null;
  if (patch.extendedRetention !== undefined) set.extendedRetention = !!patch.extendedRetention;
  if (Object.keys(set).length === 0) return;
  await db.update(schema.users).set(set).where(eq(schema.users.id, userId));
}
