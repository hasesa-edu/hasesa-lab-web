import { NextRequest } from "next/server";
import { getConcept } from "@/lib/content";
import { answerText, isCorrect } from "@/lib/content/grade";
import { hasFullAccess } from "@/lib/access";
import { recordAttempt } from "@/lib/progress";
import { bad, guard } from "@/lib/api-guard";

export const runtime = "nodejs";

// POST /api/attempts  { unitId, questionId, answer }
// Grades one practice answer on the server, so answers never reach the browser
// before the student has tried.
export async function POST(req: NextRequest) {
  const g = await guard(req, "attempts", "any", 120);
  if (!g.ok) return g.res;
  const { unitId, questionId, answer } = g.body;
  const concept = typeof unitId === "string" ? getConcept(unitId) : undefined;
  if (!concept) return bad("Unknown unit");
  if (!concept.public && !hasFullAccess(g.access)) return bad("Enrol at the Academy to unlock this.", 403);
  const problem = concept.problems.find((p) => p.id === questionId);
  if (!problem) return bad("Unknown question");
  if (typeof answer !== "string" || !answer.trim() || answer.length > 200) return bad("Enter an answer");

  const correct = isCorrect(problem, answer);
  const unit = g.access.userId ? await recordAttempt(g.access.userId, concept.id, problem.id, answer, correct) : null;
  return Response.json({
    correct,
    explanation: problem.explanation,
    answer: answerText(problem),
    unit: unit && { status: unit.status, score: unit.score },
  });
}
