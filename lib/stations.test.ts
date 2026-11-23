import { describe, expect, it } from "vitest";
import { LEVEL_BANDS, stationFor } from "./stations";
import { loadContent } from "./content/load";

const modules = loadContent().modules;

describe("stations", () => {
  const khz = modules.map((m) => ({ id: m.id, level: m.level, khz: stationFor(m.id, modules)! }));

  it("gives every module its own frequency inside its level's band", () => {
    expect(new Set(khz.map((k) => k.khz)).size).toBe(modules.length);
    for (const k of khz) {
      const [lo, hi] = LEVEL_BANDS[k.level];
      expect(k.khz, k.id).toBeGreaterThanOrEqual(lo);
      expect(k.khz, k.id).toBeLessThanOrEqual(hi);
    }
  });

  it("keeps stations far enough apart to tune between them", () => {
    const sorted = khz.map((k) => k.khz).sort((a, b) => a - b);
    for (let i = 1; i < sorted.length; i++) expect(sorted[i] - sorted[i - 1]).toBeGreaterThanOrEqual(60);
  });
});
