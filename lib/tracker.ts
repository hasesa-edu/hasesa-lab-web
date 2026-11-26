import "server-only";
import { desc, eq, gt, inArray, or } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";
import { getModules } from "@/lib/content";
import { isInactive, moduleProgress, struggling, type ModuleProgress } from "@/lib/summary";
import {
  getStudentState,
  type AssignmentRow,
  type AttemptRow,
  type EnrollmentRow,
  type FeedbackRow,
  type SignoffRow,
  type StepRow,
  type StudentState,
  type UnitRow,
} from "@/lib/progress";
import { getUserDTO } from "@/lib/auth/users";
import { guideViaApi } from "@/lib/auth/hasesa-api";
import { ApiError, apiFetch, withDates } from "@/lib/api-server";
import type { UserDTO } from "@/lib/api";

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

type RosterAttempt = Pick<AttemptRow, "userId" | "unitId" | "questionId" | "correct" | "createdAt">;

type RosterData = {
  students: { id: string; displayName: string; email: string; paidUntil: Date | null }[];
  enrollments: EnrollmentRow[];
  steps: StepRow[];
  units: UnitRow[];
  signoffs: SignoffRow[];
  attempts: RosterAttempt[];
};

/**
 * Every student the guide should see: anyone currently enrolled, plus anyone
 * who has started a module (so lapsed students don't vanish mid-module).
 * With GUIDE_VIA_API on, the data comes from hasesa-api (the database is the fallback).
 */
export async function loadRoster(now = new Date()): Promise<RosterStudent[]> {
  let data: RosterData | null = null;
  if (guideViaApi()) {
    try {
      data = await rosterFromApi();
    } catch (e) {
      console.error("roster from hasesa-api failed, reading the database instead:", e);
    }
  }
  return buildRoster(data ?? (await rosterFromDb(now)), now);
}

type Rows = Record<string, Record<string, unknown>[]>;

async function rosterFromApi(): Promise<RosterData> {
  const r = await apiFetch<Rows>("/v1/guide/roster");
  return {
    students: r.students.map((x) => ({ ...(x as { id: string; displayName: string; email: string }), paidUntil: x.paidUntil ? new Date(String(x.paidUntil)) : null })),
    enrollments: r.enrollments.map((x) => withDates<EnrollmentRow>(x)),
    steps: r.steps.map((x) => withDates<StepRow>(x)),
    units: r.units.map((x) => withDates<UnitRow>(x)),
    signoffs: r.signoffs.map((x) => withDates<SignoffRow>(x)),
    attempts: r.attempts.map((x) => withDates<RosterAttempt>(x)),
  };
}

async function rosterFromDb(now: Date): Promise<RosterData> {
  const started = db.select({ id: schema.moduleEnrollments.userId }).from(schema.moduleEnrollments);
  const users = await db
    .select({ id: schema.users.id, displayName: schema.users.displayName, email: schema.users.email, paidUntil: schema.users.paidUntil, role: schema.users.role })
    .from(schema.users)
    .where(or(gt(schema.users.paidUntil, now), inArray(schema.users.id, started)))
    .orderBy(schema.users.displayName);
  const students = users.filter((u) => u.role !== "guide");
  if (!students.length) return { students: [], enrollments: [], steps: [], units: [], signoffs: [], attempts: [] };
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
  return { students, enrollments, steps, units, signoffs, attempts };
}

function buildRoster({ students, enrollments, steps, units, signoffs, attempts }: RosterData, now: Date): RosterStudent[] {
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

/** One student, for the guide: their account, progress and answers (newest first). */
export async function loadStudent(id: string): Promise<{ user: UserDTO | null; state: StudentState; attempts: AttemptRow[] }> {
  if (guideViaApi()) {
    try {
      const r = await apiFetch<{ user: UserDTO; progress: Rows; attempts: Record<string, unknown>[] }>(`/v1/guide/students/${encodeURIComponent(id)}`);
      const p = r.progress;
      return {
        user: r.user,
        state: {
          enrollments: p.enrollments.map((x) => withDates<EnrollmentRow>(x)),
          steps: p.steps.map((x) => withDates<StepRow>(x)),
          units: p.units.map((x) => withDates<UnitRow>(x)),
          signoffs: p.signoffs.map((x) => withDates<SignoffRow>(x)),
          feedback: p.feedback.map((x) => withDates<FeedbackRow>(x)),
          assignments: p.assignments.map((x) => withDates<AssignmentRow>(x)),
        },
        attempts: r.attempts.map((x) => withDates<AttemptRow>(x)),
      };
    } catch (e) {
      if (e instanceof ApiError && e.status === 404) return { user: null, state: emptyState(), attempts: [] };
      console.error("student from hasesa-api failed, reading the database instead:", e);
    }
  }
  const [user, state, attempts] = await Promise.all([getUserDTO(id), getStudentState(id), loadStudentAttempts(id)]);
  return { user, state, attempts };
}

function emptyState(): StudentState {
  return { enrollments: [], steps: [], units: [], signoffs: [], feedback: [], assignments: [] };
}

export type { StudentState };
