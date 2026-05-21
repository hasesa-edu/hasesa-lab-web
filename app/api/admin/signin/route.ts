import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth/session";
import { verifyAdmin } from "@/lib/auth/admin";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { username, password } = body ?? {};
  if (!username || !password) return Response.json({ error: "Missing credentials" }, { status: 400 });

  if (!verifyAdmin(username, password)) {
    return Response.json({ error: "Wrong username or password" }, { status: 401 });
  }

  const session = await getSession();
  session.isAdmin = true;
  await session.save();

  return Response.json({ ok: true });
}
