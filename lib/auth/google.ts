import { Google } from "arctic";

export const OAUTH_STATE_COOKIE = "hl_oauth_state";
export const OAUTH_VERIFIER_COOKIE = "hl_oauth_verifier";
export const OAUTH_NEXT_COOKIE = "hl_oauth_next";

/** Google OAuth client. The redirect URI must be registered in Google Cloud for every origin used. */
export function googleClient(origin: string): Google {
  const id = process.env.GOOGLE_CLIENT_ID;
  const secret = process.env.GOOGLE_CLIENT_SECRET;
  if (!id || !secret) throw new Error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set");
  return new Google(id, secret, `${origin}/api/auth/google/callback`);
}

export { safeNext } from "@/lib/safe-next";
