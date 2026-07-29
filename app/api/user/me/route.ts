import { requireSession } from "@/lib/auth/session";
import { getUserDTO, updateUserProfile } from "@/lib/auth/users";
import { readJsonLimited, BODY_LIMIT } from "@/lib/http";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const sess = await requireSession();
  if (!sess) return Response.json({ user: null });
  const user = await getUserDTO(sess.userId);
  return Response.json({ user });
}

export async function PATCH(req: NextRequest) {
  const sess = await requireSession();
  if (!sess) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = await readJsonLimited(req, BODY_LIMIT.small);
  if (!parsed.ok) return Response.json({ error: parsed.error }, { status: parsed.status });
  await updateUserProfile(sess.userId, parsed.data ?? {});
  const user = await getUserDTO(sess.userId);
  return Response.json({ user });
}
