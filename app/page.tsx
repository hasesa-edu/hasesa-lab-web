import { clientProblems, getConcept, getModule, getModules, summarize } from "@/lib/content";
import type { Challenge } from "./landing/SolveIt";
import { LandingClient } from "./LandingClient";

// The hero's "Can you solve it?" problem: the honey case from Market Detective.
const CHALLENGE = { unitId: "density", problemId: "honey-density", moduleId: "market-detective", hint: "Density = mass ÷ volume." };

function pickChallenge(): Challenge | null {
  const preferred = getConcept(CHALLENGE.unitId);
  const module = getModule(CHALLENGE.moduleId);
  const problem = preferred && clientProblems(preferred).find((p) => p.id === CHALLENGE.problemId);
  if (preferred?.public && module && problem) {
    return { unitId: preferred.id, unitTitle: preferred.title, problem, moduleId: module.id, moduleTitle: module.title, hint: CHALLENGE.hint };
  }
  // Fallback: the first numeric problem of the first module's free sample unit.
  const m = getModules()[0];
  const c = m && getConcept(m.publicSample);
  const p = c && (clientProblems(c).find((x) => x.type === "numeric") ?? clientProblems(c)[0]);
  return m && c && p ? { unitId: c.id, unitTitle: c.title, problem: p, moduleId: m.id, moduleTitle: m.title } : null;
}

// Server wrapper: passes module summaries and one answer-free problem to the landing page.
export default function Home() {
  return <LandingClient modules={getModules().map(summarize)} challenge={pickChallenge()} />;
}
