import { clientProblems, getConcept, getModule, getModules, summarize } from "@/lib/content";
import type { Challenge } from "../landing/SolveIt";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { t } from "@/lib/i18n";
import { FAQ_KEYS } from "./faq";
import { AcademyClient } from "./AcademyClient";

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

const TITLE = "Hasesa Academy · Hands-on science for teenagers";
const DESCRIPTION =
  "Hands-on modules at Hasesa Academy: build a radio, control a robot claw with your muscles, catch food fakers. Students start by doing and learn the science and maths when the project needs it.";

export const metadata: Metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: "/academy" });

// The FAQ as structured data, from the same wording the page shows.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_KEYS.map((k) => ({
    "@type": "Question",
    name: t[`faq.${k}.q`].en,
    acceptedAnswer: { "@type": "Answer", text: t[`faq.${k}.a`].en },
  })),
};

// Server wrapper: passes module summaries and one answer-free problem to the Academy page.
export default function AcademyPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <AcademyClient modules={getModules().map(summarize)} challenge={pickChallenge()} />
    </>
  );
}
