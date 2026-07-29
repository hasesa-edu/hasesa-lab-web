import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth/session";
import { createUserAccount } from "@/lib/auth/users";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { readJsonLimited, BODY_LIMIT } from "@/lib/http";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // 5 account creations per IP per 10 minutes (also limits bcrypt CPU spend).
  const limit = rateLimit(`signup:${clientIp(req)}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return Response.json(
      { error: "Too many attempts. Try again later." },
      { status: 429, headers: { "retry-after": String(limit.retryAfter) } }
    );
  }

  const parsed = await readJsonLimited(req, BODY_LIMIT.small);
  if (!parsed.ok) return Response.json({ error: parsed.error }, { status: parsed.status });
  const body = parsed.data;

  const { email, password, displayName, role, language, region, school, under18, subjects } = body ?? {};
  if (!email || !password || !role || !language || !displayName) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (role !== "student" && role !== "teacher") {
    return Response.json({ error: "Invalid role" }, { status: 400 });
  }

  const result = await createUserAccount({
    email,
    password,
    displayName,
    role,
    language,
    region,
    school,
    under18: !!under18,
    subjects: Array.isArray(subjects) ? subjects : [],
  });

  if (!result.ok) {
    return Response.json(
      { error: result.reason === "taken" ? "Email already in use" : "Invalid email or password (min 8 chars)" },
      { status: 400 }
    );
  }

  const session = await getSession();
  session.userId = result.userId;
  await session.save();

  return Response.json({ ok: true, userId: result.userId });
}
