import type { ClientProblem, Concept, Problem } from "./types";

/** Pass mark for testing out of a concept unit. */
export const TEST_OUT_PASS = 0.8;

/**
 * Read a number the way students type it: "1500", "1,500", "1.5e3",
 * "1.5 x 10^3" or "1.5×10^3". Returns null when it isn't a number.
 */
export function parseNumber(raw: string): number | null {
  const s = raw.trim().replace(/,/g, "").replace(/\s+/g, " ");
  if (!s) return null;
  const sci = s.match(/^([-+]?\d*\.?\d+)\s*[x×*]\s*10\s*\^\s*([-+]?\d+)$/i);
  if (sci) return Number(sci[1]) * 10 ** Number(sci[2]);
  if (!/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(s)) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

export function isCorrect(p: Problem, answer: string): boolean {
  if (p.type === "mcq") {
    return /^\d+$/.test(answer.trim()) && Number(answer) === p.answerIndex;
  }
  const n = parseNumber(answer);
  if (n === null) return false;
  if (p.answer === 0) return Math.abs(n) < 1e-9;
  return (Math.abs(n - p.answer) / Math.abs(p.answer)) * 100 <= p.tolerancePct + 1e-9;
}

/** The answer to show once a student has seen the explanation. */
export function answerText(p: Problem): string {
  if (p.type === "mcq") return p.choices[p.answerIndex];
  return `${formatNumber(p.answer)}${p.unit ? ` ${p.unit}` : ""}`;
}

function formatNumber(n: number): string {
  const a = Math.abs(n);
  if (a !== 0 && (a >= 1e6 || a < 1e-3)) return n.toExponential(2).replace("e+", " × 10^").replace("e-", " × 10^-");
  return String(Number(n.toPrecision(4)));
}

export type AttemptLike = { questionId: string; correct: boolean; createdAt: Date };

/**
 * Score a unit from a student's attempts: the share of problems they got right
 * on their first try, and whether every problem has been answered correctly at
 * some point (which is what "completed" means).
 */
export function scoreUnit(problemIds: string[], attempts: AttemptLike[]): { firstTryPct: number; allCorrect: boolean; answered: number } {
  const byQ = new Map<string, AttemptLike[]>();
  for (const a of attempts) {
    if (!problemIds.includes(a.questionId)) continue;
    const list = byQ.get(a.questionId) ?? [];
    list.push(a);
    byQ.set(a.questionId, list);
  }
  let firstRight = 0;
  let everRight = 0;
  for (const id of problemIds) {
    const list = (byQ.get(id) ?? []).sort((x, y) => x.createdAt.getTime() - y.createdAt.getTime());
    if (list[0]?.correct) firstRight++;
    if (list.some((a) => a.correct)) everRight++;
  }
  const n = problemIds.length || 1;
  return {
    firstTryPct: Math.round((firstRight / n) * 100),
    allCorrect: problemIds.length > 0 && everRight === problemIds.length,
    answered: byQ.size,
  };
}

/** Problems with answers and explanations removed, for the browser. */
export function clientProblems(c: Pick<Concept, "problems">): ClientProblem[] {
  return c.problems.map((p) =>
    p.type === "mcq" ? { id: p.id, type: "mcq", q: p.q, choices: p.choices } : { id: p.id, type: "numeric", q: p.q, unit: p.unit }
  );
}
