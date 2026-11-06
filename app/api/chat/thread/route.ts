import { NextRequest } from "next/server";
import { and, desc, eq } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";
import { getAccess, hasFullAccess } from "@/lib/access";
import { isValidContext } from "@/lib/chat-context";
import { CAPS, getCurrentUsage } from "@/lib/usage";

export const runtime = "nodejs";

// GET /api/chat/thread?context=m:radio/antenna
// The student's latest conversation on this page (one thread per page), plus
// how many assistant messages they have left today.
export async function GET(req: NextRequest) {
  const access = await getAccess();
  if (!access.userId) return Response.json({ error: "Please sign in." }, { status: 401 });
  if (!hasFullAccess(access)) return Response.json({ error: "The lab assistant is for students enrolled at the Academy." }, { status: 403 });
  const context = req.nextUrl.searchParams.get("context");
  if (!isValidContext(context)) return Response.json({ error: "Unknown page" }, { status: 400 });

  const [convo] = await db
    .select({ id: schema.conversations.id })
    .from(schema.conversations)
    .where(and(eq(schema.conversations.userId, access.userId), eq(schema.conversations.lessonId, context)))
    .orderBy(desc(schema.conversations.updatedAt))
    .limit(1);
  const messages = convo
    ? await db
        .select({ role: schema.messages.role, content: schema.messages.content })
        .from(schema.messages)
        .where(eq(schema.messages.conversationId, convo.id))
        .orderBy(schema.messages.createdAt)
        .limit(60)
    : [];
  const used = (await getCurrentUsage(access.userId)).chatTurns;
  return Response.json({
    conversationId: convo?.id ?? null,
    messages,
    remaining: Math.max(0, CAPS.chatTurns - used),
    cap: CAPS.chatTurns,
  });
}
