import { NextRequest } from "next/server";
import { getStep } from "@/lib/content";
import { saveStep } from "@/lib/progress";
import { bad, guard } from "@/lib/api-guard";
import { progressViaApi } from "@/lib/auth/hasesa-api";
import { forward } from "@/lib/api-server";

export const runtime = "nodejs";

// POST /api/steps  { moduleId, stepId, done?: boolean, notes?: string }
export async function POST(req: NextRequest) {
  const g = await guard(req, "steps", "full");
  if (!g.ok) return g.res;
  const { moduleId, stepId, done, notes } = g.body;
  if (progressViaApi()) return forward("/v1/me/steps", { moduleId, stepId, done, notes });
  if (typeof moduleId !== "string" || typeof stepId !== "string" || !getStep(moduleId, stepId)) return bad("Unknown step");
  if (done !== undefined && typeof done !== "boolean") return bad("Bad done");
  if (notes !== undefined && typeof notes !== "string") return bad("Bad notes");
  const row = await saveStep(g.access.userId!, moduleId, stepId, { done, notes });
  return Response.json({ step: { done: row.done, notes: row.notes } });
}
