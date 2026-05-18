import { NextRequest } from "next/server";
import { requireSession } from "@/lib/auth/session";
import { db, schema } from "@/lib/db/client";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

export async function POST(_req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const sess = await requireSession();
  if (!sess) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { code: rawCode } = await params;
  const code = rawCode.toUpperCase();

  const cls = (await db.select().from(schema.classes).where(eq(schema.classes.code, code)).limit(1))[0];
  if (!cls) return Response.json({ error: "No such class" }, { status: 404 });

  await db
    .insert(schema.classMembers)
    .values({ classCode: code, userId: sess.userId })
    .onConflictDoNothing();

  return Response.json({ code, name: cls.name });
}
