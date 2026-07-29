import { NextRequest } from "next/server";
import { requireSession } from "@/lib/auth/session";
import { db, schema } from "@/lib/db/client";
import { eq } from "drizzle-orm";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const sess = await requireSession();
  if (!sess) return Response.json({ error: "Unauthorized" }, { status: 401 });

  // Throttle joins so class codes can't be brute-force enumerated.
  const limit = rateLimit(`join:${sess.userId}:${clientIp(req)}`, 15, 10 * 60 * 1000);
  if (!limit.ok) {
    return Response.json(
      { error: "Too many attempts. Try again later." },
      { status: 429, headers: { "retry-after": String(limit.retryAfter) } }
    );
  }

  const { code: rawCode } = await params;
  const code = (rawCode || "").toUpperCase().slice(0, 12);

  const cls = (await db.select().from(schema.classes).where(eq(schema.classes.code, code)).limit(1))[0];
  if (!cls) return Response.json({ error: "No such class" }, { status: 404 });

  await db
    .insert(schema.classMembers)
    .values({ classCode: code, userId: sess.userId })
    .onConflictDoNothing();

  return Response.json({ code, name: cls.name });
}
