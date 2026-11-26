import { NextRequest, NextResponse } from "next/server";
import { safeNext, OAUTH_NEXT_COOKIE, OAUTH_STATE_COOKIE, OAUTH_VERIFIER_COOKIE } from "@/lib/auth/google";
import { authViaApi, redeemCode, type ApiTokens } from "@/lib/auth/hasesa-api";
import { getSession } from "@/lib/auth/session";

export const runtime = "nodejs";

// Reasons Hasesa Accounts may send back; the login page has a message for each.
const API_ERRORS = new Set(["cancelled", "state", "email", "google", "taken"]);

// Hasesa Accounts sends the browser back here after Google, with a one-time code.
export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const fail = (reason: string) => {
    const res = NextResponse.redirect(new URL(`/login?error=${reason}`, origin));
    clearOAuthCookies(res);
    return res;
  };
  if (!authViaApi()) return fail("config");

  const params = req.nextUrl.searchParams;
  const state = params.get("state");
  const storedState = req.cookies.get(OAUTH_STATE_COOKIE)?.value;
  const verifier = req.cookies.get(OAUTH_VERIFIER_COOKIE)?.value;
  if (!state || !storedState || !verifier || state !== storedState) return fail("state");

  const apiError = params.get("error");
  if (apiError) return fail(API_ERRORS.has(apiError) ? apiError : "google");
  const code = params.get("code");
  if (!code) return fail("state");

  let tokens: ApiTokens;
  try {
    tokens = await redeemCode(origin, code, verifier);
  } catch (e) {
    console.error("hasesa-api sign-in failed:", e);
    return fail("google");
  }

  const session = await getSession();
  session.userId = tokens.user_id;
  session.sid = tokens.session_id;
  session.refreshToken = tokens.refresh_token;
  session.accessToken = tokens.access_token;
  session.accessExpiresAt = Date.now() + tokens.expires_in * 1000;
  await session.save();

  const next = safeNext(req.cookies.get(OAUTH_NEXT_COOKIE)?.value);
  const res = NextResponse.redirect(new URL(next || (tokens.is_new_user ? "/modules" : "/dashboard"), origin));
  clearOAuthCookies(res);
  return res;
}

function clearOAuthCookies(res: NextResponse) {
  res.cookies.delete(OAUTH_STATE_COOKIE);
  res.cookies.delete(OAUTH_VERIFIER_COOKIE);
  res.cookies.delete(OAUTH_NEXT_COOKIE);
}
