// Pure progress summaries, shared by the student dashboard, module pages and
// the guide's tracker. No database access here.

import type { Module } from "@/lib/content/types";
import { moduleUnits } from "@/lib/content/load";

type EnrollmentLike = { moduleId: string; status: "active" | "dropped" | "completed"; updatedAt: Date; flagged: boolean; flagNote: string | null };
type StepLike = { moduleId: string; stepId: string; done: boolean; notes: string | null; updatedAt: Date };
type UnitLike = { unitId: string; status: "started" | "completed" | "tested_out"; score: number; updatedAt: Date };
type SignoffLike = { moduleId: string; certificateCode: string; signedAt: Date };
type AttemptLike = { unitId: string; questionId: string; correct: boolean; createdAt: Date };

export type StateLike = {
  enrollments: EnrollmentLike[];
  steps: StepLike[];
  units: UnitLike[];
  signoffs: SignoffLike[];
};

export type ModuleProgress = {
  moduleId: string;
  status: "not-started" | "active" | "dropped" | "completed";
  stepsDone: number;
  stepsTotal: number;
  unitsDone: number;
  unitsTotal: number;
  /** First step not yet marked done: where the student stopped. */
  nextStep: { id: string; title: string } | null;
  lastActivity: Date | null;
  certificateCode: string | null;
  flagged: boolean;
  flagNote: string | null;
  /** Average unit score across the units this module uses that the student has tried. */
  avgScore: number | null;
};

export const isUnitDone = (s?: string) => s === "completed" || s === "tested_out";

function latest(dates: (Date | null | undefined)[]): Date | null {
  let out: Date | null = null;
  for (const d of dates) if (d && (!out || d > out)) out = d;
  return out;
}

export function moduleProgress(m: Module, state: StateLike): ModuleProgress {
  const enrollment = state.enrollments.find((e) => e.moduleId === m.id);
  const steps = state.steps.filter((s) => s.moduleId === m.id);
  const doneIds = new Set(steps.filter((s) => s.done).map((s) => s.stepId));
  const unitIds = moduleUnits(m);
  const units = state.units.filter((u) => unitIds.includes(u.unitId));
  const signoff = state.signoffs.find((s) => s.moduleId === m.id);
  const next = m.steps.find((s) => !doneIds.has(s.id)) ?? null;

  return {
    moduleId: m.id,
    status: signoff ? "completed" : enrollment?.status ?? "not-started",
    stepsDone: m.steps.filter((s) => doneIds.has(s.id)).length,
    stepsTotal: m.steps.length,
    unitsDone: units.filter((u) => isUnitDone(u.status)).length,
    unitsTotal: unitIds.length,
    nextStep: next && { id: next.id, title: next.title },
    lastActivity: latest([enrollment?.updatedAt, ...steps.map((s) => s.updatedAt), ...units.map((u) => u.updatedAt)]),
    certificateCode: signoff?.certificateCode ?? null,
    flagged: enrollment?.flagged ?? false,
    flagNote: enrollment?.flagNote ?? null,
    avgScore: units.length ? Math.round(units.reduce((n, u) => n + u.score, 0) / units.length) : null,
  };
}

/** Questions the student has got wrong three or more times without ever getting right. */
export function struggling(attempts: AttemptLike[]): { unitId: string; questionId: string; wrong: number }[] {
  const by = new Map<string, { unitId: string; questionId: string; wrong: number; right: boolean }>();
  for (const a of attempts) {
    const k = `${a.unitId}/${a.questionId}`;
    const e = by.get(k) ?? { unitId: a.unitId, questionId: a.questionId, wrong: 0, right: false };
    if (a.correct) e.right = true;
    else e.wrong++;
    by.set(k, e);
  }
  return [...by.values()].filter((e) => !e.right && e.wrong >= 3).map(({ right: _r, ...e }) => e);
}

export const INACTIVE_DAYS = 7;

export function isInactive(last: Date | null, now = new Date()): boolean {
  return !!last && now.getTime() - last.getTime() > INACTIVE_DAYS * 86_400_000;
}
