import { NextRequest } from "next/server";
import { getConcept } from "@/lib/content";
import { answerText } from "@/lib/content/grade";
import { hasFullAccess } from "@/lib/access";
import { testOut } from "@/lib/progress";
import { bad, guard } from "@/lib/api-guard";

export const runtime = "nodejs";

// POST /api/attempts/testout  { unitId, answers: { [questionId]: answer } }
export async function POST(req: NextRequest) {
  const g = await guard(req, "testout", "any", 20);
  if (!g.ok) return g.res;
  const { unitId, answers } = g.body;
  const concept = typeof unitId === "string" ? getConcept(unitId) : undefined;
  if (!concept) return bad("Unknown unit");
  if (!concept.public && !hasFullAccess(g.access)) return bad("Enrol at the Academy to unlock this.", 403);
  if (!answers || typeof answers !== "object" || Array.isArray(answers)) return bad("Bad answers");

  const r = await testOut(g.access.userId, concept.id, answers);
  return Response.json({
    score: r.score,
    passed: r.passed,
    results: r.results.map((x) => ({ id: x.problem.id, correct: x.correct, explanation: x.problem.explanation, answer: answerText(x.problem) })),
    unit: r.unit && { status: r.unit.status, score: r.unit.score },
  });
}
