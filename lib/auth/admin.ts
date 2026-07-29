import { timingSafeEqual } from "crypto";
import { getSession } from "./session";

const DEFAULT_ADMIN_USERNAME = "admin";

function adminPassword(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (pw && pw.length >= 8) return pw;
  // Dev fallback so the app can boot without setup. NEVER used in production.
  if (process.env.NODE_ENV !== "production") return "dev-only-admin-password";
  // Fail closed in production: no configured password means no admin access.
  throw new Error("ADMIN_PASSWORD must be set and at least 8 chars in production");
}

export function adminCredentials(): { username: string; password: string } {
  return {
    username: process.env.ADMIN_USERNAME || DEFAULT_ADMIN_USERNAME,
    password: adminPassword(),
  };
}

// Constant-time comparison that doesn't reveal length via an early return.
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) {
    timingSafeEqual(ab, ab); // keep timing uniform, then fail
    return false;
  }
  return timingSafeEqual(ab, bb);
}

export function verifyAdmin(username: string, password: string): boolean {
  const expected = adminCredentials();
  const userOk = safeEqual(username, expected.username);
  const passOk = safeEqual(password, expected.password);
  return userOk && passOk;
}

export async function isAdmin(): Promise<boolean> {
  const session = await getSession();
  return Boolean(session.isAdmin);
}
