import { NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";
import { db, schema } from "@/lib/db/client";
import { lt, sql } from "drizzle-orm";

export const runtime = "nodejs";

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) {
    timingSafeEqual(ab, ab);
    return false;
  }
  return timingSafeEqual(ab, bb);
}

/**
 * Daily cleanup of messages past their retention window.
 * Per NFR-12:
 *   - default retention: 90 days
 *   - extended retention (per-user opt-in): 365 days
 * Derived signals (mastery) are retained forever.
 *
 * Triggered by Vercel Cron. Requires header `Authorization: Bearer ${CRON_SECRET}`.
 */
export async function GET(req: NextRequest) {
  const expected = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");
  if (!expected || !auth || !safeEqual(auth, `Bearer ${expected}`)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  // Delete messages from default-retention users older than 90 days, and from
  // extended-retention users older than 365 days. One SQL query covers both.
  const result = await db.execute(sql`
    DELETE FROM messages m
    USING conversations c, users u
    WHERE m.conversation_id = c.id
      AND c.user_id = u.id
      AND (
        (u.extended_retention = false AND m.created_at < NOW() - INTERVAL '90 days')
        OR
        (u.extended_retention = true  AND m.created_at < NOW() - INTERVAL '365 days')
      )
  `);

  // Also drop empty conversations
  await db.execute(sql`
    DELETE FROM conversations c
    WHERE NOT EXISTS (SELECT 1 FROM messages m WHERE m.conversation_id = c.id)
      AND c.updated_at < NOW() - INTERVAL '7 days'
  `);

  return Response.json({ ok: true, deleted: (result as any)?.rowCount ?? null });
}
