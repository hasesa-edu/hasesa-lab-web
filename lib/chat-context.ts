import "server-only";
import { getConcept, getConcepts, getModules, getStep } from "@/lib/content";
import type { Concept } from "@/lib/content/types";

/** "m:<module>/<step>" grounds the assistant in a step; "c:<concept>" in a concept unit. */
export type ChatContextOption = { value: string; label: string; href: string; group: string };

export function chatContextOptions(): ChatContextOption[] {
  const steps = getModules().flatMap((m) =>
    m.steps.map((s, i) => ({ value: `m:${m.id}/${s.id}`, label: `${i + 1}. ${s.title}`, href: `/modules/${m.id}/${s.id}`, group: m.title }))
  );
  const concepts = getConcepts()
    .map((c) => ({ value: `c:${c.id}`, label: c.title, href: `/concepts/${c.id}`, group: "Concept units" }))
    .sort((a, b) => a.label.localeCompare(b.label));
  return [...steps, ...concepts];
}

export function contextFromParams(sp: { module?: string; step?: string; concept?: string }): string {
  if (sp.module && sp.step && getStep(sp.module, sp.step)) return `m:${sp.module}/${sp.step}`;
  if (sp.concept && getConcept(sp.concept)) return `c:${sp.concept}`;
  return "";
}

function conceptText(c: Concept): string {
  return `## Concept unit: ${c.title}\n${c.summary}\n\n${c.body}`;
}

/** The grounding block for the system prompt, or null for an unknown/empty context. */
export function groundingFor(value: unknown): { title: string; text: string } | null {
  if (typeof value !== "string") return null;
  if (value.startsWith("c:")) {
    const c = getConcept(value.slice(2));
    return c ? { title: c.title, text: conceptText(c) } : null;
  }
  if (value.startsWith("m:")) {
    const [moduleId, stepId] = value.slice(2).split("/");
    const found = getStep(moduleId, stepId ?? "");
    if (!found) return null;
    const { module: m, step, index } = found;
    const units = step.units.map((u) => getConcept(u)!).map(conceptText).join("\n\n");
    const text = `# Module: ${m.title}: ${m.tagline}
The mystery: ${m.hook}
Goal: ${m.goal}

## Safety rules for this module
${m.safety.map((s) => `- ${s}`).join("\n")}

## Step ${index + 1} of ${m.steps.length}: ${step.title}
${step.body}

${units}`;
    return { title: `${m.title}, step ${index + 1} (${step.title})`, text };
  }
  return null;
}
