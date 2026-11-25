import { createHash, randomBytes } from "node:crypto";

// Hasesa Accounts (hasesa-api) for the website. The site is the confidential
// client "hasesa-web": its server redeems sign-in codes with a client secret,
// and the browser only ever holds the encrypted session cookie.

export const CLIENT_ID = "hasesa-web";

/** Sign-in goes through Hasesa Accounts when AUTH_VIA_API=1. Off by default. */
export function authViaApi(): boolean {
  return process.env.AUTH_VIA_API === "1";
}

export function apiBaseUrl(): string {
  return (process.env.HASESA_API_URL || "https://hasesa-api.vercel.app").replace(/\/+$/, "");
}

/** Where the API sends the browser back after Google, for this origin. */
export function callbackUrl(origin: string): string {
  return `${origin}/api/auth/callback`;
}

/** PKCE: a random verifier and its S256 challenge. */
export function pkcePair(): { verifier: string; challenge: string } {
  const verifier = randomBytes(48).toString("base64url");
  const challenge = createHash("sha256").update(verifier).digest("base64url");
  return { verifier, challenge };
}

export function startUrl(origin: string, state: string, challenge: string): string {
  const url = new URL(`${apiBaseUrl()}/v1/auth/google/start`);
  url.searchParams.set("client_id", CLIENT_ID);
  url.searchParams.set("redirect_uri", callbackUrl(origin));
  url.searchParams.set("state", state);
  url.searchParams.set("code_challenge", challenge);
  url.searchParams.set("code_challenge_method", "S256");
  return url.toString();
}

export type ApiTokens = {
  user_id: string;
  session_id: string;
  refresh_token: string;
  is_new_user: boolean;
};

/** Redeem the one-time code from the API's redirect. Throws on any failure. */
export async function redeemCode(origin: string, code: string, verifier: string): Promise<ApiTokens> {
  const secret = process.env.HASESA_CLIENT_SECRET;
  if (!secret) throw new Error("HASESA_CLIENT_SECRET must be set when AUTH_VIA_API=1");
  const res = await fetch(`${apiBaseUrl()}/v1/auth/token`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: CLIENT_ID,
      client_secret: secret,
      code,
      redirect_uri: callbackUrl(origin),
      code_verifier: verifier,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`token exchange failed (${res.status}): ${await res.text().catch(() => "")}`);
  const body = (await res.json()) as Partial<ApiTokens>;
  if (!body.user_id || !body.session_id || !body.refresh_token) throw new Error("token response is incomplete");
  return { user_id: body.user_id, session_id: body.session_id, refresh_token: body.refresh_token, is_new_user: !!body.is_new_user };
}

/** End the API session. Best effort: signing out of the site never waits long on the API. */
export async function revokeSession(refreshToken: string): Promise<void> {
  try {
    await fetch(`${apiBaseUrl()}/v1/auth/logout`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
      cache: "no-store",
      signal: AbortSignal.timeout(3_000),
    });
  } catch (e) {
    console.error("hasesa-api logout failed:", e);
  }
}
