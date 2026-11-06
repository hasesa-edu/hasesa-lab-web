import "server-only";
import { and, eq } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";
import { getConcept, getModule, getStep } from "@/lib/content";
import type { Concept } from "@/lib/content/types";
import { getAttempts, getStudentState } from "@/lib/progress";
import { moduleProgress } from "@/lib/summary";

/*
 * The assistant lives on course pages, and each page is a context:
 *   "m:<module>"          a module page
 *   "m:<module>/<step>"   a step page
 *   "c:<concept>"         a concept unit page
 * The page decides the context; the student never picks it.
 */

export function moduleContext(moduleId: string) {
  return `m:${moduleId}`;
}
export function stepContext(moduleId: string, stepId: string) {
  return `m:${moduleId}/${stepId}`;
}
export function conceptContext(conceptId: string) {
  return `c:${conceptId}`;
}

function conceptText(c: Concept): string {
  return `## Concept unit: ${c.title}\n${c.summary}\n\n${c.body}`;
}

type Parsed =
  | { kind: "concept"; conceptId: string }
  | { kind: "module"; moduleId: string }
  | { kind: "step"; moduleId: string; stepId: string };

function parse(value: unknown): Parsed | null {
  if (typeof value !== "string") return null;
  if (value.startsWith("c:")) return getConcept(value.slice(2)) ? { kind: "concept", conceptId: value.slice(2) } : null;
  if (value.startsWith("m:")) {
    const [moduleId, stepId] = value.slice(2).split("/");
    if (stepId === undefined) return getModule(moduleId) ? { kind: "module", moduleId } : null;
    return getStep(moduleId, stepId) ? { kind: "step", moduleId, stepId } : null;
  }
  return null;
}

export function isValidContext(value: unknown): value is string {
  return parse(value) !== null;
}

/** What the page is about, for the system prompt. Null for an unknown context. */
export function groundingFor(value: unknown): { title: string; text: string } | null {
  const p = parse(value);
  if (!p) return null;
  if (p.kind === "concept") {
    const c = getConcept(p.conceptId)!;
    return { title: `the concept unit "${c.title}"`, text: conceptText(c) };
  }
  const m = getModule(p.moduleId)!;
  const header = `# Module: ${m.title}: ${m.tagline}
The mystery: ${m.hook}
Goal: ${m.goal}
What they build: ${m.whatYouBuild}

## Safety rules for this module
${m.safety.map((s) => `- ${s}`).join("\n")}`;
  if (p.kind === "module") {
    const steps = m.steps.map((s, i) => `${i + 1}. ${s.title} (${s.minutes} min)`).join("\n");
    return { title: `the ${m.title} module`, text: `${header}\n\n## Steps\n${steps}\n\n## Overview\n${m.body}` };
  }
  const { step, index } = getStep(p.moduleId, p.stepId)!;
  const units = step.units.map((u) => conceptText(getConcept(u)!)).join("\n\n");
  return {
    title: `${m.title}, step ${index + 1} (${step.title})`,
    text: `${header}\n\n## Step ${index + 1} of ${m.steps.length}: ${step.title}\n${step.body}\n\n${units}`,
  };
}

/**
 * What this student has done on this page, so the assistant can meet them
 * where they are: their notebook notes on a step, the problems they're stuck
 * on in a unit, where they stopped in a module. Never includes answer keys.
 */
export async function studentContextFor(userId: string, value: unknown): Promise<string | null> {
  const p = parse(value);
  if (!p) return null;

  if (p.kind === "step") {
    const [row] = await db
      .select({ notes: schema.stepProgress.notes, done: schema.stepProgress.done })
      .from(schema.stepProgress)
      .where(
        and(
          eq(schema.stepProgress.userId, userId),
          eq(schema.stepProgress.moduleId, p.moduleId),
          eq(schema.stepProgress.stepId, p.stepId)
        )
      )
      .limit(1);
    const lines = [`- This step is ${row?.done ? "marked done" : "not marked done yet"}.`];
    if (row?.notes) lines.push(`- Their lab notebook for this step says:\n"""\n${row.notes.slice(0, 2000)}\n"""`);
    return lines.join("\n");
  }

  if (p.kind === "concept") {
    const c = getConcept(p.conceptId)!;
    const attempts = await getAttempts(userId, [c.id]);
    const stuck: string[] = [];
    for (const prob of c.problems) {
      const mine = attempts.filter((a) => a.questionId === prob.id);
      if (!mine.length || mine.some((a) => a.correct)) continue;
      const last = mine[mine.length - 1];
      const shown = prob.type === "mcq" ? prob.choices[Number(last.answer)] ?? last.answer : `${last.answer}${prob.unit ? ` ${prob.unit}` : ""}`;
      const n = c.problems.indexOf(prob) + 1;
      stuck.push(`- Problem ${n} ("${prob.q}"): ${mine.length} wrong ${mine.length === 1 ? "try" : "tries"}, last answer "${shown}".`);
    }
    const solved = c.problems.filter((prob) => attempts.some((a) => a.questionId === prob.id && a.correct)).length;
    return [`- They have solved ${solved} of ${c.problems.length} problems in this unit.`, ...stuck].join("\n");
  }

  const m = getModule(p.moduleId)!;
  const pr = moduleProgress(m, await getStudentState(userId));
  return `- Module status: ${pr.status}. ${pr.stepsDone} of ${pr.stepsTotal} steps done, ${pr.unitsDone} of ${pr.unitsTotal} concept units done.${
    pr.nextStep ? ` Next step: "${pr.nextStep.title}".` : ""
  }`;
}
