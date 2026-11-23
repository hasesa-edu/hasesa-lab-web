import type { Level, ModuleSummary } from "@/lib/content/types";
import { LEVEL_ORDER } from "@/lib/disciplines";

// Every module has a station on the medium-wave dial (530–1700 kHz): the
// brand's radio idea, shared by the landing page, the module list and module
// pages. The band reads like a path: beginner modules at the low end,
// advanced ones at the top, each level spread evenly across its own stretch.
export const LEVEL_BANDS: Record<Level, [number, number]> = {
  beginner: [560, 920],
  intermediate: [980, 1320],
  advanced: [1380, 1680],
};

export type Station = { khz: number; module: ModuleSummary };

type Tunable = { id: string; level: Level };

/** Each module's frequency, by its level and its place in content order. */
function frequencies(modules: Tunable[]): Map<string, number> {
  const out = new Map<string, number>();
  for (const level of LEVEL_ORDER) {
    const inBand = modules.filter((m) => m.level === level);
    const [lo, hi] = LEVEL_BANDS[level];
    inBand.forEach((m, i) => {
      const khz = inBand.length === 1 ? (lo + hi) / 2 : lo + (i * (hi - lo)) / (inBand.length - 1);
      out.set(m.id, Math.round(khz / 10) * 10);
    });
  }
  return out;
}

/** Radio goes first (it's the radio, and the dial sweeps to it on load); the rest keep content order. */
export function assignStations(modules: ModuleSummary[]): Station[] {
  const khz = frequencies(modules);
  return [...modules]
    .sort((a, b) => Number(b.id === "radio") - Number(a.id === "radio"))
    .map((module) => ({ khz: khz.get(module.id)!, module }));
}

/** The station frequency for one module, given every module in content order. */
export function stationFor(moduleId: string, all: Tunable[]): number | undefined {
  return frequencies(all).get(moduleId);
}

/** The last sentence of a hook is the mystery itself. */
export function mysteryOf(m: { hook: string; tagline: string }) {
  return m.hook.match(/[^.!?…—]*\?\s*$/)?.[0].trim() || m.tagline;
}
