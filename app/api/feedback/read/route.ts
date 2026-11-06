import { NextRequest } from "next/server";
import { markFeedbackRead } from "@/lib/progress";
import { bad, guard } from "@/lib/api-guard";

export const runtime = "nodejs";

// POST /api/feedback/read  { id }
export async function POST(req: NextRequest) {
  const g = await guard(req, "feedback", "signed-in");
  if (!g.ok) return g.res;
  if (typeof g.body.id !== "string") return bad("Bad id");
  await markFeedbackRead(g.access.userId!, g.body.id);
  return Response.json({ ok: true });
}
