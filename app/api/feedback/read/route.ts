import { NextRequest } from "next/server";
import { markFeedbackRead } from "@/lib/progress";
import { bad, guard } from "@/lib/api-guard";
import { dashboardViaApi } from "@/lib/auth/hasesa-api";
import { forward } from "@/lib/api-server";

export const runtime = "nodejs";

// POST /api/feedback/read  { id }
export async function POST(req: NextRequest) {
  const g = await guard(req, "feedback", "signed-in");
  if (!g.ok) return g.res;
  if (typeof g.body.id !== "string") return bad("Bad id");
  // The API answers 204; forward turns that into { ok: true }, as before.
  if (dashboardViaApi()) return forward(`/v1/me/feedback/${encodeURIComponent(g.body.id)}/read`, undefined);
  await markFeedbackRead(g.access.userId!, g.body.id);
  return Response.json({ ok: true });
}
