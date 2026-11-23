import { describe, expect, it } from "vitest";
import { searchIndex } from "./search-index";
import { mysteryOf } from "./catalogue";
import { loadContent } from "./content/load";

const content = loadContent();
const modules = content.modules;
const concepts = [...content.concepts.values()];

describe("search index", () => {
  // The same fields catalogueItem() gives (summarize() is server-only, so build them here).
  const items = modules.map((m) => ({
    id: m.id,
    title: m.title,
    tagline: m.tagline,
    mystery: mysteryOf(m),
    disciplines: m.disciplines,
    level: m.level,
    hours: m.hours,
    stepCount: m.steps.length,
    featured: m.featured,
    firstStepId: m.steps[0].id,
    sampleId: m.publicSample,
  }));
  const index = searchIndex(items, concepts);

  it("has every module and unit", () => {
    expect(index.modules.map((m) => m.id).sort()).toEqual(modules.map((m) => m.id).sort());
    expect(index.units).toHaveLength(concepts.length);
  });

  it("carries only public fields", () => {
    for (const m of index.modules) expect(Object.keys(m).sort()).toEqual(["disciplines", "hours", "id", "level", "mystery", "tagline", "title"]);
    for (const u of index.units) expect(Object.keys(u).sort()).toEqual(["id", "summary", "title"]);
    const text = JSON.stringify(index);
    for (const m of modules) expect(text).not.toContain(m.guide.slice(0, 80));
  });
});
