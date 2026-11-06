import "server-only";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth/session";
import { db, schema } from "@/lib/db/client";
import { accessFrom, type Access } from "./access-rules";

export type { Access, AccessLevel } from "./access-rules";
export { hasFullAccess } from "./access-rules";

/** Who is asking: signed out, signed up, enrolled at the Academy, or the guide. */
export async function getAccess(): Promise<Access> {
  const session = await getSession();
  if (!session.userId) return { level: "public" };
  const rows = await db
    .select({ id: schema.users.id, role: schema.users.role, paidUntil: schema.users.paidUntil })
    .from(schema.users)
    .where(eq(schema.users.id, session.userId))
    .limit(1);
  if (!rows.length) return { level: "public" };
  return accessFrom(rows[0]);
}
