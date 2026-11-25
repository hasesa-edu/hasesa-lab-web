import { NextRequest, NextResponse } from "next/server";
import { generateCodeVerifier, generateState } from "arctic";
import { googleClient, safeNext, OAUTH_NEXT_COOKIE, OAUTH_STATE_COOKIE, OAUTH_VERIFIER_COOKIE } from "@/lib/auth/google";
import { authViaApi, pkcePair, startUrl } from "@/lib/auth/hasesa-api";

export const runtime = "nodejs";

// Starts "Continue with Google": stores state + PKCE verifier in short-lived
// cookies, then sends the browser to Google's consent screen (or, with
// AUTH_VIA_API=1, to Hasesa Accounts, which handles Google for us).
export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const state = generateState();
  let url: URL;
  let verifier: string;
  if (authViaApi()) {
    const pkce = pkcePair();
    verifier = pkce.verifier;
    url = new URL(startUrl(origin, state, pkce.challenge));
  } else {
    verifier = generateCodeVerifier();
    try {
      url = googleClient(origin).createAuthorizationURL(state, verifier, ["openid", "email", "profile"]);
    } catch (e) {
      console.error(e);
      return NextResponse.redirect(new URL("/login?error=config", origin));
    }
    url.searchParams.set("prompt", "select_account");
  }

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
