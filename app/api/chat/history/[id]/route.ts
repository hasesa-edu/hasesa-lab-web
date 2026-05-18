import { NextRequest } from "next/server";
import { requireSession } from "@/lib/auth/session";
import { db, schema } from "@/lib/db/client";
import { and, asc, eq, gte } from "drizzle-orm";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const sess = await requireSession();
  if (!sess) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const convo = (await db.select().from(schema.conversations).where(eq(schema.conversations.id, id)).limit(1))[0];
  if (!convo || convo.userId !== sess.userId) return Response.json({ error: "Not found" }, { status: 404 });

  const user = (await db.select().from(schema.users).where(eq(schema.users.id, sess.userId)).limit(1))[0];
  const retentionDays = user?.extendedRetention ? 365 : 90;
  const cutoff = new Date(Date.now() - retentionDays * 24 * 3600 * 1000);

  const messages = await db
    .select({
      id: schema.messages.id,
      role: schema.messages.role,
      content: schema.messages.content,
      createdAt: schema.messages.createdAt,
    })
    .from(schema.messages)
    .where(and(eq(schema.messages.conversationId, id), gte(schema.messages.createdAt, cutoff)))
    .orderBy(asc(schema.messages.createdAt));

  return Response.json({ conversation: convo, messages });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const sess = await requireSession();
  if (!sess) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const convo = (await db.select().from(schema.conversations).where(eq(schema.conversations.id, id)).limit(1))[0];
  if (!convo || convo.userId !== sess.userId) return Response.json({ error: "Not found" }, { status: 404 });

  await db.delete(schema.conversations).where(eq(schema.conversations.id, id));
  return Response.json({ ok: true });
}
