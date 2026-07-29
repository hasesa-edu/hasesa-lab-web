import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth/session";
import { verifyAdmin } from "@/lib/auth/admin";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { readJsonLimited, BODY_LIMIT } from "@/lib/http";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // 5 admin login attempts per IP per 10 minutes.
  const limit = rateLimit(`admin-signin:${clientIp(req)}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return Response.json(
      { error: "Too many attempts. Try again later." },
      { status: 429, headers: { "retry-after": String(limit.retryAfter) } }
    );
  }

  const parsed = await readJsonLimited(req, BODY_LIMIT.small);
  if (!parsed.ok) return Response.json({ error: parsed.error }, { status: parsed.status });
  const { username, password } = parsed.data ?? {};
  if (!username || !password) return Response.json({ error: "Missing credentials" }, { status: 400 });

  if (!verifyAdmin(username, password)) {
    return Response.json({ error: "Wrong username or password" }, { status: 401 });
  }

  const session = await getSession();
  session.isAdmin = true;
  await session.save();

  return Response.json({ ok: true });
}
