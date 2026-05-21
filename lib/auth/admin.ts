import { getSession } from "./session";

const DEFAULT_ADMIN_USERNAME = "admin";
const DEFAULT_ADMIN_PASSWORD = "REDACTED";

export function adminCredentials(): { username: string; password: string } {
  return {
    username: process.env.ADMIN_USERNAME || DEFAULT_ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD,
  };
}

export function verifyAdmin(username: string, password: string): boolean {
  const expected = adminCredentials();
  return username === expected.username && password === expected.password;
}

export async function isAdmin(): Promise<boolean> {
  const session = await getSession();
  return Boolean(session.isAdmin);
}
