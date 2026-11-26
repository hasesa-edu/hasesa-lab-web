import "server-only";
import { apiFetch } from "@/lib/api-server";
import { authViaApi } from "./hasesa-api";
import { getSession, signedInUserId } from "./session";

/**
 * Admins sign in with Google like everyone else; the API decides who is one
 * (emails in its ADMIN_EMAILS). Admin tools then go through the API as them.
 */
export async function isAdmin(): Promise<boolean> {
  if (!authViaApi()) return false;
  if (!signedInUserId(await getSession())) return false;
  try {
    return (await apiFetch<{ admin?: boolean }>("/v1/me")).admin === true;
  } catch (e) {
    console.error("admin check through hasesa-api failed:", e);
    return false;
  }
}
