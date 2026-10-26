import { NextRequest, NextResponse } from "next/server";
import { decodeIdToken } from "arctic";
import { googleClient, safeNext, OAUTH_NEXT_COOKIE, OAUTH_STATE_COOKIE, OAUTH_VERIFIER_COOKIE } from "@/lib/auth/google";
import { EmailTakenError, upsertGoogleUser } from "@/lib/auth/users";
import { getSession } from "@/lib/auth/session";

export const runtime = "nodejs";

type GoogleClaims = {
  sub: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
};

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const fail = (reason: string) => {
    const res = NextResponse.redirect(new URL(`/login?error=${reason}`, origin));
    clearOAuthCookies(res);
    return res;
  };

  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const storedState = req.cookies.get(OAUTH_STATE_COOKIE)?.value;
  const verifier = req.cookies.get(OAUTH_VERIFIER_COOKIE)?.value;
  if (req.nextUrl.searchParams.get("error")) return fail("cancelled");
  if (!code || !state || !storedState || !verifier || state !== storedState) return fail("state");

  let claims: GoogleClaims;
  try {
    const tokens = await googleClient(origin).validateAuthorizationCode(code, verifier);
    // The ID token comes straight from Google's token endpoint over TLS, so
    // decoding without re-verifying the signature is safe here.
    claims = decodeIdToken(tokens.idToken()) as GoogleClaims;
  } catch (e) {
    console.error("google oauth exchange failed:", e);
    return fail("google");
  }
  if (!claims.sub || !claims.email || claims.email_verified !== true) return fail("email");

  let account: { userId: string; isNew: boolean };
  try {
    account = await upsertGoogleUser({
      sub: claims.sub,
      email: claims.email,
      name: claims.name,
      picture: claims.picture,
    });
  } catch (e) {
    if (e instanceof EmailTakenError) return fail("taken");
    console.error("google sign-in: account upsert failed:", e);
    return fail("google");
  }
  const { userId, isNew } = account;

  const session = await getSession();
  session.userId = userId;
  await session.save();

  const next = safeNext(req.cookies.get(OAUTH_NEXT_COOKIE)?.value);
  const dest = isNew ? `/onboarding${next ? `?next=${encodeURIComponent(next)}` : ""}` : next || "/dashboard";
  const res = NextResponse.redirect(new URL(dest, origin));
  clearOAuthCookies(res);
  return res;
}

function clearOAuthCookies(res: NextResponse) {
  res.cookies.delete(OAUTH_STATE_COOKIE);
  res.cookies.delete(OAUTH_VERIFIER_COOKIE);
  res.cookies.delete(OAUTH_NEXT_COOKIE);
}
