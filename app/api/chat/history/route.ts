import { requireSession } from "@/lib/auth/session";
import { db, schema } from "@/lib/db/client";
import { and, desc, eq, gte } from "drizzle-orm";
import { chatViaApi } from "@/lib/auth/hasesa-api";
import { forwardGet } from "@/lib/api-server";

export const runtime = "nodejs";

// GET /api/chat/history → recent conversations (90-day window or 365 if extendedRetention)
export async function GET() {
  if (chatViaApi()) return forwardGet("/v1/chat/conversations");
  const sess = await requireSession();
  if (!sess) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const user = (await db.select().from(schema.users).where(eq(schema.users.id, sess.userId)).limit(1))[0];
  if (!user) return Response.json({ error: "Unknown user" }, { status: 404 });
  const retentionDays = user.extendedRetention ? 365 : 90;
  const cutoff = new Date(Date.now() - retentionDays * 24 * 3600 * 1000);

  const convos = await db
    .select()
    .from(schema.conversations)
    .where(and(eq(schema.conversations.userId, sess.userId), gte(schema.conversations.updatedAt, cutoff)))
    .orderBy(desc(schema.conversations.updatedAt))
    .limit(50);

  return Response.json({ conversations: convos, retentionDays });
}
