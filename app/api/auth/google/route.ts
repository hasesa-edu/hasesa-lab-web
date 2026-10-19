import { NextRequest, NextResponse } from "next/server";
import { generateCodeVerifier, generateState } from "arctic";
import { googleClient, safeNext, OAUTH_NEXT_COOKIE, OAUTH_STATE_COOKIE, OAUTH_VERIFIER_COOKIE } from "@/lib/auth/google";

export const runtime = "nodejs";

// Starts "Continue with Google": stores state + PKCE verifier in short-lived
// cookies, then sends the browser to Google's consent screen.
export async function GET(req: NextRequest) {
  const state = generateState();
  const verifier = generateCodeVerifier();
  let url: URL;
  try {
    url = googleClient(req.nextUrl.origin).createAuthorizationURL(state, verifier, ["openid", "email", "profile"]);
  } catch (e) {
    console.error(e);
    return NextResponse.redirect(new URL("/login?error=config", req.nextUrl.origin));
  }
  url.searchParams.set("prompt", "select_account");

  const res = NextResponse.redirect(url);
  const cookie = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  };
  res.cookies.set(OAUTH_STATE_COOKIE, state, cookie);
  res.cookies.set(OAUTH_VERIFIER_COOKIE, verifier, cookie);
  const next = safeNext(req.nextUrl.searchParams.get("next"));
  if (next) res.cookies.set(OAUTH_NEXT_COOKIE, next, cookie);
  else res.cookies.delete(OAUTH_NEXT_COOKIE);
  return res;
}
