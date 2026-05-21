import { getSession } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST() {
  const session = await getSession();
  session.isAdmin = false;
  await session.save();
  return Response.json({ ok: true });
}
