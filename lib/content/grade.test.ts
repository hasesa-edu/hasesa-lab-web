import { describe, expect, it } from "vitest";
import { answerText, clientProblems, isCorrect, parseNumber, scoreUnit } from "./grade";
import type { Problem } from "./types";

const numeric: Problem = { id: "f", type: "numeric", q: "f?", answer: 1.027e6, tolerancePct: 2, unit: "Hz", explanation: "…" };
const mcq: Problem = { id: "m", type: "mcq", q: "?", choices: ["a", "b", "c"], answerIndex: 1, explanation: "…" };

describe("parseNumber", () => {
  it.each([
    ["1500", 1500],
    ["1,500", 1500],
    [" 1.5e3 ", 1500],
    ["1.5 x 10^3", 1500],
    ["1.5×10^-3", 0.0015],
    ["-0.25", -0.25],
    [".5", 0.5],
  ])("reads %s", (raw, n) => expect(parseNumber(raw)).toBeCloseTo(n));

  it.each(["", "abc", "12abc", "1.2.3", "e5"])("rejects %j", (raw) => expect(parseNumber(raw)).toBeNull());
});

describe("isCorrect", () => {
  it("accepts numeric answers within tolerance", () => {
    expect(isCorrect(numeric, "1.03e6")).toBe(true);
    expect(isCorrect(numeric, "1,010,000")).toBe(true); // 1.7% off
  });
  it("rejects numeric answers outside tolerance", () => {
    expect(isCorrect(numeric, "1.1e6")).toBe(false);
    expect(isCorrect(numeric, "1,000,000")).toBe(false); // 2.6% off
    expect(isCorrect(numeric, "lots")).toBe(false);
  });
  it("checks multiple choice by index", () => {
    expect(isCorrect(mcq, "1")).toBe(true);
    expect(isCorrect(mcq, "0")).toBe(false);
    expect(isCorrect(mcq, "b")).toBe(false);
  });
  it("handles an answer of zero", () => {
    expect(isCorrect({ ...numeric, answer: 0 } as Problem, "0")).toBe(true);
    expect(isCorrect({ ...numeric, answer: 0 } as Problem, "0.1")).toBe(false);
  });
});

describe("answerText", () => {
  it("shows the choice or the number with its unit", () => {
    expect(answerText(mcq)).toBe("b");
    expect(answerText(numeric)).toBe("1.03 × 10^6 Hz");
  });
});

describe("clientProblems", () => {
  it("never includes answers or explanations", () => {
    const out = JSON.stringify(clientProblems({ problems: [mcq, numeric] }));
    expect(out).not.toContain("answerIndex");
    expect(out).not.toContain("explanation");
    expect(out).not.toContain("1027000");
  });
});

describe("scoreUnit", () => {
  const t = (s: number) => new Date(2026, 10, 6, 12, 0, s);
  it("scores first tries and tracks completion", () => {
    const r = scoreUnit(
      ["a", "b"],
      [
        { questionId: "a", correct: false, createdAt: t(1) },
        { questionId: "a", correct: true, createdAt: t(2) },
        { questionId: "b", correct: true, createdAt: t(3) },
      ]
    );
    expect(r).toEqual({ firstTryPct: 50, allCorrect: true, answered: 2 });
  });
  it("is not complete until every problem is right", () => {
    const r = scoreUnit(["a", "b"], [{ questionId: "a", correct: true, createdAt: t(1) }]);
    expect(r.allCorrect).toBe(false);
    expect(r.firstTryPct).toBe(50);
  });
  it("ignores attempts on removed problems", () => {
    const r = scoreUnit(["a"], [{ questionId: "gone", correct: true, createdAt: t(1) }]);
    expect(r).toEqual({ firstTryPct: 0, allCorrect: false, answered: 0 });
  });
});
