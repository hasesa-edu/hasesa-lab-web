import "server-only";
import { desc, eq, gt, inArray, or } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";
import { getModules } from "@/lib/content";
import { isInactive, moduleProgress, struggling, type ModuleProgress } from "@/lib/summary";
import type { AttemptRow, StudentState } from "@/lib/progress";

export type RosterStudent = {
  id: string;
  displayName: string;
  email: string;
  enrolledUntil: Date | null;
  modules: (ModuleProgress & { title: string })[];
  unitsDone: number;
  avgScore: number | null;
  lastActivity: Date | null;
  flags: string[];
};

/**
 * Every student the guide should see: anyone currently enrolled, plus anyone
 * who has started a module (so lapsed students don't vanish mid-module).
 */
export async function loadRoster(now = new Date()): Promise<RosterStudent[]> {
  const started = db.select({ id: schema.moduleEnrollments.userId }).from(schema.moduleEnrollments);
  const users = await db
    .select({ id: schema.users.id, displayName: schema.users.displayName, email: schema.users.email, paidUntil: schema.users.paidUntil, role: schema.users.role })
    .from(schema.users)
    .where(or(gt(schema.users.paidUntil, now), inArray(schema.users.id, started)))
    .orderBy(schema.users.displayName);
  const students = users.filter((u) => u.role !== "guide");
  if (!students.length) return [];
  const ids = students.map((u) => u.id);

  const [enrollments, steps, units, signoffs, attempts] = await Promise.all([
    db.select().from(schema.moduleEnrollments).where(inArray(schema.moduleEnrollments.userId, ids)),
    db.select().from(schema.stepProgress).where(inArray(schema.stepProgress.userId, ids)),
    db.select().from(schema.unitProgress).where(inArray(schema.unitProgress.userId, ids)),
    db.select().from(schema.signoffs).where(inArray(schema.signoffs.userId, ids)),
    db
      .select({
        userId: schema.questionAttempts.userId,
        unitId: schema.questionAttempts.unitId,
        questionId: schema.questionAttempts.questionId,
        correct: schema.questionAttempts.correct,
        createdAt: schema.questionAttempts.createdAt,
      })
      .from(schema.questionAttempts)
      .where(inArray(schema.questionAttempts.userId, ids)),
  ]);

  const modules = getModules();
  const roster = students.map((u) => {
    const mine = <T extends { userId: string }>(rows: T[]) => rows.filter((r) => r.userId === u.id);
    const state = { enrollments: mine(enrollments), steps: mine(steps), units: mine(units), signoffs: mine(signoffs) };
    const progress = modules
      .map((m) => ({ ...moduleProgress(m, state), title: m.title }))
      .filter((p) => p.status !== "not-started" || p.stepsDone > 0);
    const myAttempts = mine(attempts);
    const lastActivity = [
      ...progress.map((p) => p.lastActivity),
      ...myAttempts.map((a) => a.createdAt),
    ].reduce<Date | null>((acc, d) => (d && (!acc || d > acc) ? d : acc), null);

    const flags: string[] = [];
    for (const p of progress) if (p.flagged) flags.push(p.flagNote ? `${p.title}: ${p.flagNote}` : `Flagged in ${p.title}`);
    if (progress.some((p) => p.status === "active") && isInactive(lastActivity, now)) flags.push("No activity for over a week");
    const stuck = struggling(myAttempts);
    if (stuck.length) flags.push(`Stuck on ${stuck.length} question${stuck.length > 1 ? "s" : ""} (3+ wrong tries)`);

    return {
      id: u.id,
      displayName: u.displayName,
      email: u.email,
      enrolledUntil: u.paidUntil,
      modules: progress,
      unitsDone: state.units.filter((x) => x.status !== "started").length,
      avgScore: state.units.length ? Math.round(state.units.reduce((n, x) => n + x.score, 0) / state.units.length) : null,
      lastActivity,
      flags,
    };
  });

  // Students who need attention first, then most recently active.
  return roster.sort((a, b) => b.flags.length - a.flags.length || (b.lastActivity?.getTime() ?? 0) - (a.lastActivity?.getTime() ?? 0));
}

export async function loadStudentAttempts(userId: string): Promise<AttemptRow[]> {
  return db
    .select()
    .from(schema.questionAttempts)
    .where(eq(schema.questionAttempts.userId, userId))
    .orderBy(desc(schema.questionAttempts.createdAt));
}

export type { StudentState };
