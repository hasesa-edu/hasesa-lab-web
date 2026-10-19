import { db, schema } from "@/lib/db/client";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import type { Locale } from "@/lib/i18n";
import { SUBJECTS, isGrade, type Grade, type Subject } from "@/lib/experiments";

// A valid bcrypt hash compared against when an email is not found, so that
// verifyCredentials spends the same time whether or not the account exists.
const DUMMY_HASH = "$2b$10$MJi3uIOk4dm.AKGwE1PsgOw3zxfBwC37qALqpm6yD2V2vIpzWHWBW";

const VALID_SUBJECTS = new Set<string>(SUBJECTS.map((s) => s.id));
const VALID_LOCALES = new Set<string>(["en"]);
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
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
};

function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

export async function createUserAccount(input: {
  email: string;
  password: string;
  displayName: string;
  language: Locale;
  region?: string;
  school?: string;
  under18?: boolean;
  subjects?: Subject[];
  grade?: Grade | null;
}): Promise<{ ok: true; userId: string } | { ok: false; reason: "taken" | "invalid" }> {
  const email = (typeof input.email === "string" ? input.email : "").trim().toLowerCase();
  const displayName = (capStr(input.displayName, 100) || email.split("@")[0]).slice(0, 100);

  if (
    email.length > 254 ||
    !EMAIL_RE.test(email) ||
    typeof input.password !== "string" ||
    input.password.length < 8 ||
    input.password.length > 200 ||
    !VALID_LOCALES.has(input.language)
  ) {
    return { ok: false, reason: "invalid" };
  }

  const existing = await db
    .select({ id: schema.users.id })
    .from(schema.users)
    .where(eq(schema.users.email, email))
    .limit(1);

  if (existing.length) return { ok: false, reason: "taken" };

  const hash = await bcrypt.hash(input.password, 10);
  const id = uid();

  await db.insert(schema.users).values({
    id,
    email,
    passwordHash: hash,
    displayName,
    role: "student",
    language: input.language,
    region: capStr(input.region) ?? null,
    school: capStr(input.school) ?? null,
    under18: input.under18 ?? false,
    subjects: cleanSubjects(input.subjects) ?? [],
    grade: cleanGrade(input.grade) ?? null,
  });

  return { ok: true, userId: id };
}

export async function verifyCredentials(
  email: string,
  password: string
): Promise<{ ok: true; userId: string } | { ok: false }> {
  const norm = email.trim().toLowerCase();
  const rows = await db
    .select({ id: schema.users.id, hash: schema.users.passwordHash })
    .from(schema.users)
    .where(eq(schema.users.email, norm))
    .limit(1);
  // Always run a bcrypt comparison — even for unknown emails — so response
  // timing doesn't reveal whether an account exists (user enumeration).
  const hash = rows[0]?.hash ?? DUMMY_HASH;
  const ok = await bcrypt.compare(password, hash);
  if (!rows.length || !ok) return { ok: false };
  return { ok: true, userId: rows[0].id };
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
