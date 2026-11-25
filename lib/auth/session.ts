import { cookies } from "next/headers";
import { getIronSession, type SessionOptions } from "iron-session";
import { authViaApi } from "./hasesa-api";

export type SessionData = {
  userId?: string;
  isAdmin?: boolean;
  /** Set when signed in through Hasesa Accounts (hasesa-api): the API session and its refresh token. */
  sid?: string;
  refreshToken?: string;
};

function getPassword(): string {
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

function options(): SessionOptions {
  return {
    password: getPassword(),
    cookieName: "hasesa_lab_session",
    cookieOptions: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    },
  };
}

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, options());
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
