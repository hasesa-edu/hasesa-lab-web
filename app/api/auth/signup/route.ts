import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth/session";
import { createUserAccount } from "@/lib/auth/users";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

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
      { error: result.reason === "taken" ? "Email already in use" : "Invalid email or password (min 6 chars)" },
      { status: 400 }
    );
  }

  const session = await getSession();
  session.userId = result.userId;
  await session.save();

  return Response.json({ ok: true, userId: result.userId });
}
