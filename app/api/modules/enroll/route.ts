import { NextRequest } from "next/server";
import { getModule } from "@/lib/content";
import { setEnrollment } from "@/lib/progress";
import { bad, guard } from "@/lib/api-guard";

export const runtime = "nodejs";

// POST /api/modules/enroll  { moduleId, action: "start" | "drop" }
export async function POST(req: NextRequest) {
  const g = await guard(req, "enroll", "full", 30);
  if (!g.ok) return g.res;
  const { moduleId, action } = g.body;
  if (typeof moduleId !== "string" || !getModule(moduleId)) return bad("Unknown module");
  if (action !== "start" && action !== "drop") return bad("Bad action");
  const row = await setEnrollment(g.access.userId!, moduleId, action === "start" ? "active" : "dropped");
  return Response.json({ status: row.status });
}
