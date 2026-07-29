import { NextRequest } from "next/server";
import { db, schema } from "@/lib/db/client";
import { getSession } from "@/lib/auth/session";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { readJsonLimited, BODY_LIMIT } from "@/lib/http";

export const runtime = "nodejs";

function newId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-6);
}

function truncate(s: string | null | undefined, max: number): string | null {
  if (!s) return null;
  return s.length > max ? s.slice(0, max) : s;
}

export async function POST(req: NextRequest) {
  // Cap analytics write rate per IP so page_views can't be flooded.
  const limit = rateLimit(`track:${clientIp(req)}`, 60, 60 * 1000);
  if (!limit.ok) return Response.json({ ok: false }, { status: 429 });

  const parsed = await readJsonLimited(req, BODY_LIMIT.tiny);
  if (!parsed.ok) return Response.json({ ok: false }, { status: parsed.status });
  const body = (parsed.data ?? {}) as { path?: string; referrer?: string };

  const path = truncate(body.path, 512);
  if (!path) return Response.json({ ok: false }, { status: 400 });

  // Don't record admin's own pageviews so the analytics aren't polluted.
  const session = await getSession();
  if (session.isAdmin) return Response.json({ ok: true, skipped: "admin" });

  // Skip admin pages even if the visitor somehow lands there without a session.
  if (path.startsWith("/admin")) return Response.json({ ok: true, skipped: "admin-path" });

  const h = req.headers;
  const country = truncate(h.get("x-vercel-ip-country"), 8);
  const region = truncate(h.get("x-vercel-ip-country-region"), 16);
  const city = truncate(h.get("x-vercel-ip-city"), 128);
  const referrer = truncate(body.referrer ?? h.get("referer"), 512);
  const userAgent = truncate(h.get("user-agent"), 512);

  try {
    await db.insert(schema.pageViews).values({
      id: newId(),
      path,
      country,
      region,
      city,
      referrer,
      userAgent,
      userId: session.userId ?? null,
    });
  } catch (err) {
    console.error("track-view insert failed:", err);
    return Response.json({ ok: false }, { status: 500 });
  }

  return Response.json({ ok: true });
}
