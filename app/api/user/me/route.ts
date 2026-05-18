import { requireSession } from "@/lib/auth/session";
import { getUserDTO, updateUserProfile } from "@/lib/auth/users";
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
  let body: any;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  await updateUserProfile(sess.userId, body);
  const user = await getUserDTO(sess.userId);
  return Response.json({ user });
}
