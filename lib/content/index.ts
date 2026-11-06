import "server-only";
import { loadContent, moduleCurriculum, moduleUnits, type Content } from "./load";
import type { Concept, ConceptSummary, Module, ModuleSummary, Problem, Step } from "./types";

export type * from "./types";
export { moduleUnits };
export { clientProblems } from "./grade";

// Parsed once per server instance. In development it's re-read on every call
// so edits to content/ show up without a restart.
let cache: Content | null = null;
function content(): Content {
  if (process.env.NODE_ENV === "development") return loadContent();
  return (cache ??= loadContent());
}

export function getModules(): Module[] {
  return content().modules;
}

export function getModule(id: string): Module | undefined {
  return content().modules.find((m) => m.id === id);
}

export function getStep(moduleId: string, stepId: string): { module: Module; step: Step; index: number } | undefined {
  const module = getModule(moduleId);
  if (!module) return undefined;
  const index = module.steps.findIndex((s) => s.id === stepId);
  if (index < 0) return undefined;
  return { module, step: module.steps[index], index };
}

export function getConcept(id: string): Concept | undefined {
  return content().concepts.get(id);
}

export function getConcepts(): Concept[] {
  return [...content().concepts.values()];
}

/** Modules (and their steps) that use a concept unit. */
export function conceptUsage(id: string): { module: Module; steps: Step[] }[] {
  return getModules()
    .map((module) => ({ module, steps: module.steps.filter((s) => s.units.includes(id)) }))
    .filter((u) => u.steps.length > 0);
}

export function getProblem(conceptId: string, problemId: string): Problem | undefined {
  return getConcept(conceptId)?.problems.find((p) => p.id === problemId);
}

export function summarize(m: Module): ModuleSummary {
  const sample = getConcept(m.publicSample)!;
  return {
    id: m.id,
    title: m.title,
    tagline: m.tagline,
    disciplines: m.disciplines,
    hook: m.hook,
    goal: m.goal,
    whatYouBuild: m.whatYouBuild,
    hours: m.hours,
    status: m.status,
    trailer: m.trailer,
    stepCount: m.steps.length,
    steps: m.steps.map((s) => ({ id: s.id, title: s.title, kind: s.kind, minutes: s.minutes })),
    curriculum: moduleCurriculum(m, content().concepts),
    publicSample: { id: sample.id, title: sample.title },
  };
}

export function conceptSummary(c: Concept): ConceptSummary {
  return { id: c.id, title: c.title, summary: c.summary, problemCount: c.problems.length };
}
