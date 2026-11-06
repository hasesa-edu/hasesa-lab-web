import { describe, expect, it } from "vitest";
import { loadContent, moduleUnits } from "./load";

// Loads the real content/ folder: any invalid file fails here with its path.
const content = loadContent();

describe("content", () => {
  it("has modules", () => {
    expect(content.modules.length).toBeGreaterThan(0);
  });

  for (const m of content.modules) {
    describe(m.id, () => {
      it("is about 10 hours of steps", () => {
        const minutes = m.steps.reduce((n, s) => n + s.minutes, 0);
        expect(minutes).toBeGreaterThanOrEqual(m.hours * 60 * 0.75);
        expect(minutes).toBeLessThanOrEqual(m.hours * 60 * 1.25);
      });

      it("starts by doing and ends with a finish step", () => {
        expect(m.steps[0].kind).toBe("hook");
        expect(m.steps[m.steps.length - 1].kind).toBe("finish");
      });

      it("uses at least one concept unit, all of which resolve", () => {
        const units = moduleUnits(m);
        expect(units.length).toBeGreaterThan(0);
        for (const u of units) expect(content.concepts.has(u), u).toBe(true);
      });

      it("has unique sign-off ids", () => {
        expect(new Set(m.signoff.map((s) => s.id)).size).toBe(m.signoff.length);
      });
    });
  }

  it("every concept is used by some module", () => {
    const used = new Set(content.modules.flatMap(moduleUnits));
    const unused = [...content.concepts.keys()].filter((id) => !used.has(id));
    expect(unused).toEqual([]);
  });

  it("every concept has at least 3 problems", () => {
    for (const c of content.concepts.values()) expect(c.problems.length, c.id).toBeGreaterThanOrEqual(3);
  });
});
