import { getConcepts, getModules } from "@/lib/content";
import { ORG_DESCRIPTION, SITE_URL } from "@/lib/seo";

// A plain-text guide to the site for AI tools (https://llmstxt.org). Built from content/ at build time.
export const dynamic = "force-static";

export function GET() {
  const modules = getModules()
    .map((m) => `- [${m.title}](${SITE_URL}/modules/${m.id}): ${m.tagline}. About ${m.hours} hours.`)
    .join("\n");
  const samples = getConcepts()
    .filter((c) => c.public)
    .map((c) => `- [${c.title}](${SITE_URL}/concepts/${c.id}): ${c.summary}`)
    .join("\n");

  const body = `# Hasesa

> ${ORG_DESCRIPTION}

Key facts:
- Hasesa means "exploration" in Amharic (ሐሰሳ).
- It is building an education system for the AI era: it tries new ways of learning with real students, keeps what works and brings it to schools in Ethiopia and beyond.
- Hasesa Academy is its first program: hands-on science modules for teenagers aged 13 to 18. Students build at partner schools with a guide and study short concept units at home.
- The Academy is free during the pilot, which runs to the end of 2027.
- Content is in English. All modules are drafts being checked by subject experts.

## Pages
- [Hasesa](${SITE_URL}/): the thesis, the questions Hasesa is exploring and how it works.
- [Hasesa Academy](${SITE_URL}/academy): how a module works, what parents should know, and frequently asked questions.
- [All modules](${SITE_URL}/modules)

## Modules
${modules}

## Free sample concept units
${samples}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
