import "server-only";
import { NextRequest } from "next/server";
import { getAccess, hasFullAccess, type Access } from "@/lib/access";
import { readJsonLimited, BODY_LIMIT } from "@/lib/http";
import { clientIp, rateLimit } from "@/lib/rate-limit";

type Ok = { ok: true; access: Access; body: any };
type Fail = { ok: false; res: Response };

/**
 * Shared front door for the module APIs: rate limit, read the JSON body and
 * check access. `need` is the minimum: "any" lets signed-out visitors through.
 */
export async function guard(req: NextRequest, name: string, need: "any" | "signed-in" | "full", limit = 60): Promise<Ok | Fail> {
  const access = await getAccess();
  if (need !== "any" && !access.userId) {
    return { ok: false, res: Response.json({ error: "Please sign in." }, { status: 401 }) };
  }
  if (need === "full" && !hasFullAccess(access)) {
    return { ok: false, res: Response.json({ error: "Enrol at the Academy to unlock this." }, { status: 403 }) };
  }
  const rl = rateLimit(`${name}:${access.userId ?? clientIp(req)}`, limit, 5 * 60 * 1000);
  if (!rl.ok) {
    return {
      ok: false,
      res: Response.json({ error: "Too many requests. Try again later." }, { status: 429, headers: { "retry-after": String(rl.retryAfter) } }),
    };
  }
  const parsed = await readJsonLimited(req, BODY_LIMIT.small);
  if (!parsed.ok) return { ok: false, res: Response.json({ error: parsed.error }, { status: parsed.status }) };
  return { ok: true, access, body: parsed.data ?? {} };
}

export const bad = (error: string, status = 400) => Response.json({ error }, { status });
