import { NextResponse, type NextRequest } from "next/server";
import { sealData, unsealData } from "iron-session";
import { apiTokensNeeded, refreshTokens } from "@/lib/auth/hasesa-api";
import { getPassword, SESSION_COOKIE, sessionCookieOptions, type SessionData } from "@/lib/auth/session";

// Refresh the API access token a minute before it expires.
const MARGIN_MS = 60_000;

/**
 * Keeps the signed-in student's API access token fresh.
 *
 * Pages can't write cookies while they render, so the refresh happens here,
 * before the page or route runs: the new cookie goes to the browser and also
 * replaces the cookie in this request, so the page sees the fresh token.
 * Refresh tokens rotate on every use, which is why this has to save them.
 */
export async function proxy(req: NextRequest) {
  if (!apiTokensNeeded()) return NextResponse.next();
  const raw = req.cookies.get(SESSION_COOKIE)?.value;
  if (!raw) return NextResponse.next();

  const password = getPassword();
  let session: SessionData;
  try {
    session = await unsealData<SessionData>(raw, { password });
  } catch {
    return NextResponse.next();
  }
  if (!session.userId || !session.sid || !session.refreshToken) return NextResponse.next();
  if (session.accessToken && (session.accessExpiresAt ?? 0) - Date.now() > MARGIN_MS) return NextResponse.next();

  const r = await refreshTokens(session.refreshToken);
  // API down: carry on. Reads fall back to the website's own data; writes say "try again".
  if (r.kind === "unavailable") return NextResponse.next();

  const next: SessionData =
    r.kind === "ok"
      ? {
          ...session,
          refreshToken: r.tokens.refresh_token,
          accessToken: r.tokens.access_token,
          accessExpiresAt: Date.now() + r.tokens.expires_in * 1000,
        }
      : // The API session ended (signed out elsewhere, expired or revoked): sign out here too.
        {};
  const sealed = await sealData(next, { password });

  req.cookies.set(SESSION_COOKIE, sealed);
  const res = NextResponse.next({ request: { headers: req.headers } });
  res.cookies.set(SESSION_COOKIE, sealed, sessionCookieOptions());
  return res;
}

export const config = {
  // Pages and API routes. Not static files, and not sign-in/sign-out, which write the session themselves.
  matcher: ["/((?!_next/static|_next/image|api/auth/|favicon\\.ico|.*\\.(?:png|jpe?g|gif|svg|webp|ico|txt|xml|webmanifest|woff2?)$).*)"],
};
