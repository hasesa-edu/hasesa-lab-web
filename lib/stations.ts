import type { ModuleSummary } from "@/lib/content/types";

// Every module has a station on the medium-wave dial: the brand's radio idea,
// shared by the landing page, the module list and module pages.
const FREQS = [1040, 700, 1420, 880, 1260, 1580];

export type Station = { khz: number; module: ModuleSummary };

/** Radio goes first (it's the radio); the rest keep content order. */
export function assignStations(modules: ModuleSummary[]): Station[] {
  const ordered = [...modules].sort((a, b) => Number(b.id === "radio") - Number(a.id === "radio"));
  return ordered.slice(0, FREQS.length).map((module, i) => ({ khz: FREQS[i], module }));
}

/** The station frequency for one module, given every module id in content order. */
export function stationFor(moduleId: string, allIds: string[]): number | undefined {
  const ordered = [...allIds].sort((a, b) => Number(b === "radio") - Number(a === "radio"));
  const i = ordered.indexOf(moduleId);
  return i >= 0 && i < FREQS.length ? FREQS[i] : undefined;
}

/** The last sentence of a hook is the mystery itself. */
export function mysteryOf(m: { hook: string; tagline: string }) {
  return m.hook.match(/[^.!?…—]*\?\s*$/)?.[0].trim() || m.tagline;
}
