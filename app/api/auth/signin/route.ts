import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth/session";
import { verifyCredentials } from "@/lib/auth/users";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // 10 login attempts per IP per 10 minutes.
  const limit = rateLimit(`signin:${clientIp(req)}`, 10, 10 * 60 * 1000);
  if (!limit.ok) {
    return Response.json(
      { error: "Too many attempts. Try again later." },
      { status: 429, headers: { "retry-after": String(limit.retryAfter) } }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { email, password } = body ?? {};
  if (!email || !password) return Response.json({ error: "Missing credentials" }, { status: 400 });

  const result = await verifyCredentials(email, password);
  if (!result.ok) return Response.json({ error: "Wrong email or password" }, { status: 401 });

  const session = await getSession();
  session.userId = result.userId;
  await session.save();

  return Response.json({ ok: true, userId: result.userId });
}
