import "server-only";
import { and, desc, eq, inArray } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";
import { getConcept } from "@/lib/content";
import { isCorrect, scoreUnit, TEST_OUT_PASS } from "@/lib/content/grade";

export const MAX_NOTES = 4000;

export type EnrollmentRow = typeof schema.moduleEnrollments.$inferSelect;
export type StepRow = typeof schema.stepProgress.$inferSelect;
export type UnitRow = typeof schema.unitProgress.$inferSelect;
export type AttemptRow = typeof schema.questionAttempts.$inferSelect;
export type SignoffRow = typeof schema.signoffs.$inferSelect;
export type FeedbackRow = typeof schema.guideFeedback.$inferSelect;
export type AssignmentRow = typeof schema.unitAssignments.$inferSelect;

export type StudentState = {
  enrollments: EnrollmentRow[];
  steps: StepRow[];
  units: UnitRow[];
  signoffs: SignoffRow[];
  feedback: FeedbackRow[];
  assignments: AssignmentRow[];
};

/** Everything about one student's progress, in a handful of queries. */
export async function getStudentState(userId: string): Promise<StudentState> {
  const [enrollments, steps, units, signoffs, feedback, assignments] = await Promise.all([
    db.select().from(schema.moduleEnrollments).where(eq(schema.moduleEnrollments.userId, userId)),
    db.select().from(schema.stepProgress).where(eq(schema.stepProgress.userId, userId)),
    db.select().from(schema.unitProgress).where(eq(schema.unitProgress.userId, userId)),
    db.select().from(schema.signoffs).where(eq(schema.signoffs.userId, userId)),
    db
      .select()
      .from(schema.guideFeedback)
      .where(eq(schema.guideFeedback.studentId, userId))
      .orderBy(desc(schema.guideFeedback.createdAt))
      .limit(50),
    db
      .select()
      .from(schema.unitAssignments)
      .where(eq(schema.unitAssignments.studentId, userId))
      .orderBy(desc(schema.unitAssignments.createdAt)),
  ]);
  return { enrollments, steps, units, signoffs, feedback, assignments };
}

export async function getAttempts(userId: string, unitIds?: string[]): Promise<AttemptRow[]> {
  const where = unitIds?.length
    ? and(eq(schema.questionAttempts.userId, userId), inArray(schema.questionAttempts.unitId, unitIds))
    : eq(schema.questionAttempts.userId, userId);
  return db.select().from(schema.questionAttempts).where(where).orderBy(schema.questionAttempts.createdAt);
}

export async function setEnrollment(userId: string, moduleId: string, status: "active" | "dropped") {
  const now = new Date();
  const [existing] = await db
    .select()
    .from(schema.moduleEnrollments)
    .where(and(eq(schema.moduleEnrollments.userId, userId), eq(schema.moduleEnrollments.moduleId, moduleId)))
    .limit(1);
  // A signed-off module stays completed; dropping or restarting it changes nothing.
  if (existing?.status === "completed") return existing;
  await db
    .insert(schema.moduleEnrollments)
    .values({ userId, moduleId, status, startedAt: now, updatedAt: now })
    .onConflictDoUpdate({
      target: [schema.moduleEnrollments.userId, schema.moduleEnrollments.moduleId],
      set: { status, updatedAt: now },
    });
  return { ...(existing ?? {}), userId, moduleId, status };
}

export async function saveStep(
  userId: string,
  moduleId: string,
  stepId: string,
  patch: { done?: boolean; notes?: string }
): Promise<StepRow> {
  const now = new Date();
  const [existing] = await db
    .select()
    .from(schema.stepProgress)
    .where(
      and(
        eq(schema.stepProgress.userId, userId),
        eq(schema.stepProgress.moduleId, moduleId),
        eq(schema.stepProgress.stepId, stepId)
      )
    )
    .limit(1);
  const done = patch.done ?? existing?.done ?? false;
  const notes = patch.notes !== undefined ? patch.notes.trim().slice(0, MAX_NOTES) || null : existing?.notes ?? null;
  const completedAt = done ? existing?.completedAt ?? now : null;
  const row = { userId, moduleId, stepId, done, notes, updatedAt: now, completedAt };
  await db
    .insert(schema.stepProgress)
    .values(row)
    .onConflictDoUpdate({
      target: [schema.stepProgress.userId, schema.stepProgress.moduleId, schema.stepProgress.stepId],
      set: { done, notes, updatedAt: now, completedAt },
    });
  // Working on a step means the student is in the module, even if they never pressed "Start".
  await db
    .insert(schema.moduleEnrollments)
    .values({ userId, moduleId, status: "active", startedAt: now, updatedAt: now })
    .onConflictDoUpdate({
      target: [schema.moduleEnrollments.userId, schema.moduleEnrollments.moduleId],
      set: { updatedAt: now },
    });
  return row;
}

/** Recompute a unit's status and score from every attempt the student has made. */
async function refreshUnit(userId: string, unitId: string, testOutScore?: number): Promise<UnitRow> {
  const concept = getConcept(unitId)!;
  const attempts = await getAttempts(userId, [unitId]);
  const { firstTryPct, allCorrect } = scoreUnit(
    concept.problems.map((p) => p.id),
    attempts
  );
  const [existing] = await db
    .select()
    .from(schema.unitProgress)
    .where(and(eq(schema.unitProgress.userId, userId), eq(schema.unitProgress.unitId, unitId)))
    .limit(1);

  const now = new Date();
  let status: UnitRow["status"] = existing?.status ?? "started";
  let score = firstTryPct;
  if (testOutScore !== undefined && testOutScore >= TEST_OUT_PASS * 100 && status !== "completed") {
    status = "tested_out";
    score = testOutScore;
  } else if (status === "tested_out") {
    score = existing!.score;
  } else if (allCorrect) {
    status = "completed";
  }
  const completedAt = status === "started" ? null : existing?.completedAt ?? now;
  const row: UnitRow = { userId, unitId, status, score, updatedAt: now, completedAt };
  await db
    .insert(schema.unitProgress)
    .values(row)
    .onConflictDoUpdate({
      target: [schema.unitProgress.userId, schema.unitProgress.unitId],
      set: { status, score, updatedAt: now, completedAt },
    });
  return row;
}

export async function recordAttempt(userId: string, unitId: string, questionId: string, answer: string, correct: boolean) {
  await db.insert(schema.questionAttempts).values({
    id: crypto.randomUUID(),
    userId,
    unitId,
    questionId,
    answer: answer.slice(0, 200),
    correct,
    mode: "practice",
  });
  return refreshUnit(userId, unitId);
}

/** Grade a full test-out. Records every answer when a user is given. */
export async function testOut(userId: string | undefined, unitId: string, answers: Record<string, string>) {
  const concept = getConcept(unitId)!;
  const results = concept.problems.map((p) => {
    const answer = typeof answers[p.id] === "string" ? answers[p.id] : "";
    return { problem: p, answer, correct: answer !== "" && isCorrect(p, answer) };
  });
  const score = Math.round((results.filter((r) => r.correct).length / results.length) * 100);
  let unit: UnitRow | null = null;
  if (userId) {
    const now = Date.now();
    await db.insert(schema.questionAttempts).values(
      results.map((r, i) => ({
        id: crypto.randomUUID(),
        userId,
        unitId,
        questionId: r.problem.id,
        answer: r.answer.slice(0, 200),
        correct: r.correct,
        mode: "testout" as const,
        // Keep the order stable for first-try scoring.
        createdAt: new Date(now + i),
      }))
    );
    unit = await refreshUnit(userId, unitId, score);
  }
  return { score, passed: score >= TEST_OUT_PASS * 100, results, unit };
}

export async function markFeedbackRead(userId: string, id: string) {
  await db
    .update(schema.guideFeedback)
    .set({ readAt: new Date() })
    .where(and(eq(schema.guideFeedback.id, id), eq(schema.guideFeedback.studentId, userId)));
}
