import { describe, expect, it } from "vitest";
import { accessFrom, hasFullAccess } from "./access-rules";
import { isInactive, moduleProgress, struggling } from "./summary";
import type { Module } from "./content/types";

const m = {
  id: "radio",
  steps: [
    { id: "hook", title: "Hook", units: [] },
    { id: "waves", title: "Waves", units: ["waves", "freq"] },
    { id: "tune", title: "Tune", units: ["freq", "resonance"] },
  ],
} as unknown as Module;

const d = (day: number) => new Date(2026, 10, day);

describe("moduleProgress", () => {
  it("summarises steps, units and where the student stopped", () => {
    const p = moduleProgress(m, {
      enrollments: [{ moduleId: "radio", status: "active", updatedAt: d(1), flagged: false, flagNote: null }],
      steps: [{ moduleId: "radio", stepId: "hook", done: true, notes: null, updatedAt: d(2) }],
      units: [
        { unitId: "waves", status: "completed", score: 80, updatedAt: d(3) },
        { unitId: "freq", status: "started", score: 40, updatedAt: d(4) },
        { unitId: "other", status: "completed", score: 100, updatedAt: d(5) },
      ],
      signoffs: [],
    });
    expect(p).toMatchObject({ status: "active", stepsDone: 1, stepsTotal: 3, unitsDone: 1, unitsTotal: 3, avgScore: 60 });
    expect(p.nextStep).toEqual({ id: "waves", title: "Waves" });
    expect(p.lastActivity).toEqual(d(4));
  });

  it("is completed once signed off", () => {
    const p = moduleProgress(m, {
      enrollments: [],
      steps: [],
      units: [],
      signoffs: [{ moduleId: "radio", certificateCode: "ABCD-EFGHJK", signedAt: d(9) }],
    });
    expect(p.status).toBe("completed");
    expect(p.certificateCode).toBe("ABCD-EFGHJK");
  });
});

describe("struggling", () => {
  it("flags questions wrong three times and never right", () => {
    const wrong = (q: string) => ({ unitId: "u", questionId: q, correct: false, createdAt: d(1) });
    expect(struggling([wrong("a"), wrong("a"), wrong("a"), wrong("b"), wrong("b")])).toEqual([{ unitId: "u", questionId: "a", wrong: 3 }]);
    expect(struggling([wrong("a"), wrong("a"), wrong("a"), { ...wrong("a"), correct: true }])).toEqual([]);
  });
});

describe("isInactive", () => {
  it("is true after more than a week", () => {
    expect(isInactive(d(1), d(9))).toBe(true);
    expect(isInactive(d(3), d(9))).toBe(false);
    expect(isInactive(null, d(9))).toBe(false);
  });
});

describe("accessFrom", () => {
  const now = d(10);
  it("gives guides and enrolled students full access", () => {
    expect(accessFrom({ id: "g", role: "guide", paidUntil: null }, now).level).toBe("guide");
    expect(accessFrom({ id: "s", role: "student", paidUntil: d(20) }, now).level).toBe("enrolled");
    expect(hasFullAccess(accessFrom({ id: "s", role: "student", paidUntil: d(20) }, now))).toBe(true);
  });
  it("treats lapsed or unpaid students as signed in only", () => {
    expect(accessFrom({ id: "s", role: "student", paidUntil: d(5) }, now).level).toBe("signed-in");
    expect(accessFrom({ id: "s", role: "student", paidUntil: null }, now).level).toBe("signed-in");
    expect(hasFullAccess(accessFrom({ id: "s", role: null, paidUntil: null }, now))).toBe(false);
  });
});
