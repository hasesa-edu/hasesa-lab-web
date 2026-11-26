import { createHash, randomBytes } from "node:crypto";

// Hasesa Accounts (hasesa-api) for the website. The site is the confidential
// client "hasesa-web": its server redeems sign-in codes with a client secret,
// and the browser only ever holds the encrypted session cookie.

export const CLIENT_ID = "hasesa-web";

/** An on/off env switch: on when set to 1, true, yes or on. Off by default. */
export function envSwitch(name: string): boolean {
  return ["1", "true", "yes", "on"].includes((process.env[name] ?? "").trim().toLowerCase());
}

/** Sign-in goes through Hasesa Accounts when AUTH_VIA_API is on. */
export function authViaApi(): boolean {
  return envSwitch("AUTH_VIA_API");
}

// Phase 3 switches. Each one moves one part of learning to the API; turning it
// off goes back to the website's own code at once.
/** Practice answers and test-outs are checked by the API. */
export const answersViaApi = () => authViaApi() && envSwitch("ANSWERS_VIA_API");
/** Step ticks, notebook notes and module start/drop are saved by the API. */
export const progressViaApi = () => authViaApi() && envSwitch("PROGRESS_VIA_API");
/** Progress on pages, the dashboard, guide-note read receipts and certificates come from the API. */
export const dashboardViaApi = () => authViaApi() && envSwitch("DASHBOARD_VIA_API");

// Phase 4 switches.
/** The guide's tracker, student pages and tools use the API. */
export const guideViaApi = () => authViaApi() && envSwitch("GUIDE_VIA_API");

// Phase 5 switch.
/** Chapa checkouts start in the API (and its webhook), and the return page checks payments through it. */
export const billingViaApi = () => authViaApi() && envSwitch("BILLING_VIA_API");

// Phase 6 switch.
/** The lab assistant (chat, threads, history) runs in the API. */
export const chatViaApi = () => authViaApi() && envSwitch("CHAT_VIA_API");

/**
 * Whether the website's server needs API access tokens (see proxy.ts): always
 * with Hasesa Accounts on, since admins (and every switch above) call the API.
 */
export function apiTokensNeeded(): boolean {
  return authViaApi();
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
  access_token: string;
  /** Seconds until access_token expires. */
  expires_in: number;
  is_new_user: boolean;
};

function clientSecret(): string {
  const secret = process.env.HASESA_CLIENT_SECRET;
  if (!secret) throw new Error("HASESA_CLIENT_SECRET must be set when AUTH_VIA_API=1");
  return secret;
}

function readTokens(body: Partial<ApiTokens>): ApiTokens {
  if (!body.user_id || !body.session_id || !body.refresh_token || !body.access_token) throw new Error("token response is incomplete");
  return {
    user_id: body.user_id,
    session_id: body.session_id,
    refresh_token: body.refresh_token,
    access_token: body.access_token,
    expires_in: typeof body.expires_in === "number" ? body.expires_in : 900,
    is_new_user: !!body.is_new_user,
  };
}

/** Redeem the one-time code from the API's redirect. Throws on any failure. */
export async function redeemCode(origin: string, code: string, verifier: string): Promise<ApiTokens> {
  const res = await fetch(`${apiBaseUrl()}/v1/auth/token`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: CLIENT_ID,
      client_secret: clientSecret(),
      code,
      redirect_uri: callbackUrl(origin),
      code_verifier: verifier,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`token exchange failed (${res.status}): ${await res.text().catch(() => "")}`);
  return readTokens((await res.json()) as Partial<ApiTokens>);
}

export type RefreshResult =
  | { kind: "ok"; tokens: ApiTokens }
  /** The API session is over (signed out, expired or revoked): the student must sign in again. */
  | { kind: "ended" }
  /** The API couldn't be reached or failed. Try again on the next request. */
  | { kind: "unavailable" };

/**
 * Swap a refresh token for new tokens. The refresh token rotates: always keep
 * the new one. Parallel refreshes with the same token get the same answer.
 */
export async function refreshTokens(refreshToken: string): Promise<RefreshResult> {
  let res: Response;
  try {
    res = await fetch(`${apiBaseUrl()}/v1/auth/token`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ grant_type: "refresh_token", client_id: CLIENT_ID, client_secret: clientSecret(), refresh_token: refreshToken }),
      cache: "no-store",
      signal: AbortSignal.timeout(4_000),
    });
  } catch (e) {
    console.error("hasesa-api refresh failed:", e);
    return { kind: "unavailable" };
  }
  // 400 invalid_grant: the session ended. 401 is a wrong client secret, which is our mistake, not the student's.
  if (res.status === 400) return { kind: "ended" };
  if (!res.ok) {
    console.error(`hasesa-api refresh failed (${res.status}): ${await res.text().catch(() => "")}`);
    return { kind: "unavailable" };
  }
  try {
    return { kind: "ok", tokens: readTokens((await res.json()) as Partial<ApiTokens>) };
  } catch (e) {
    console.error("hasesa-api refresh failed:", e);
    return { kind: "unavailable" };
  }
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
