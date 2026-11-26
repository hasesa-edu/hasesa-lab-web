import { cookies } from "next/headers";
import { getIronSession, type SessionOptions } from "iron-session";
import { authViaApi } from "./hasesa-api";

export type SessionData = {
  userId?: string;
  /** Set when signed in through Hasesa Accounts (hasesa-api): the API session and its refresh token. */
  sid?: string;
  refreshToken?: string;
  /** A short-lived API access token and when it expires (ms since epoch). Kept fresh by proxy.ts. */
  accessToken?: string;
  accessExpiresAt?: number;
};

export const SESSION_COOKIE = "hasesa_lab_session";

export function getPassword(): string {
  const secret = process.env.SESSION_SECRET;
  if (secret && secret.length >= 32) return secret;
  // Dev fallback so the app can boot without setup. NEVER use in real prod.
  if (process.env.NODE_ENV !== "production") {
    return "dev-only-not-secure-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  }
  // In production: if env var is missing/short, throw at request time
  // (so the build itself doesn't fail when env vars aren't injected).
  throw new Error("SESSION_SECRET must be set and at least 32 chars in production");
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  };
}

function sessionOptions(): SessionOptions {
  return { password: getPassword(), cookieName: SESSION_COOKIE, cookieOptions: sessionCookieOptions() };
}

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions());
}

/**
 * The signed-in student, or null. With AUTH_VIA_API on, only sessions made
 * through Hasesa Accounts count: older cookies (no API session) are treated as
 * signed out, so everyone signs in once more after the switch.
 */
export function signedInUserId(session: SessionData): string | null {
  if (!session.userId) return null;
  if (authViaApi() && !session.sid) return null;
  return session.userId;
}

export async function requireSession(): Promise<{ userId: string } | null> {
  const userId = signedInUserId(await getSession());
  return userId ? { userId } : null;
}
