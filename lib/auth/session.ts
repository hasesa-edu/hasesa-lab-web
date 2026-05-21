import { cookies } from "next/headers";
import { getIronSession, type SessionOptions } from "iron-session";

export type SessionData = {
  userId?: string;
  isAdmin?: boolean;
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
    cookieName: "ai_edu_session",
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

export async function requireSession(): Promise<{ userId: string } | null> {
  const session = await getSession();
  if (!session.userId) return null;
  return { userId: session.userId };
}
