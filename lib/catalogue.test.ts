import { describe, expect, it } from "vitest";
import { type CatalogueItem, NO_FILTERS, filterModules, filtersQuery, mysteryOf, parseFilters, previewModules, suggestModules } from "./catalogue";
import { loadContent } from "./content/load";

const item = (id: string, level: CatalogueItem["level"], disciplines: CatalogueItem["disciplines"], hours = 10, featured = false): CatalogueItem => ({
  id,
  title: id.replace(/-/g, " "),
  tagline: `${id} tagline`,
  mystery: `What is ${id}?`,
  disciplines,
  level,
  hours,
  stepCount: 7,
  featured,
});

const items = [
  item("rocket", "beginner", ["physics", "mathematics"], 8, true),
  item("water", "beginner", ["biology", "chemistry"], 8),
  item("seeds", "beginner", ["biology"], 10),
  item("injera", "intermediate", ["biology", "chemistry"], 10),
  item("radio", "intermediate", ["physics", "technology"], 10, true),
  item("dna", "advanced", ["biology"], 12),
  item("wind", "advanced", ["physics", "technology"], 14, true),
];
const ids = (xs: CatalogueItem[]) => xs.map((m) => m.id);

describe("filters", () => {
  it("reads only known values from the URL", () => {
    expect(parseFilters({ q: "  rocket ", level: "beginner", subject: "physics", length: "short" })).toEqual({
      q: "rocket",
      level: "beginner",
      subject: "physics",
      length: "short",
    });
    expect(parseFilters({ level: "expert", subject: ["chemistry", "physics"], length: "huge" })).toEqual({ ...NO_FILTERS, subject: "chemistry" });
  });

  it("round-trips through the query string", () => {
    const f = { q: "wind power", level: "advanced", subject: null, length: "long" } as const;
    expect(parseFilters(Object.fromEntries(new URLSearchParams(filtersQuery(f))))).toEqual(f);
    expect(filtersQuery(NO_FILTERS)).toBe("");
  });

  it("combines search, level, subject and length", () => {
    expect(ids(filterModules(items, NO_FILTERS))).toEqual(ids(items));
    expect(ids(filterModules(items, { ...NO_FILTERS, level: "beginner" }))).toEqual(["rocket", "water", "seeds"]);
    expect(ids(filterModules(items, { ...NO_FILTERS, subject: "technology" }))).toEqual(["radio", "wind"]);
    expect(ids(filterModules(items, { ...NO_FILTERS, length: "short" }))).toEqual(["rocket", "water"]);
    expect(ids(filterModules(items, { ...NO_FILTERS, length: "long" }))).toEqual(["wind"]);
    expect(ids(filterModules(items, { ...NO_FILTERS, q: "BIOLOGY", level: "advanced" }))).toEqual(["dna"]);
    expect(ids(filterModules(items, { ...NO_FILTERS, q: "physics radio" }))).toEqual(["radio"]);
    expect(filterModules(items, { ...NO_FILTERS, q: "volcano" })).toEqual([]);
  });
});

describe("previewModules", () => {
  it("takes a few per level, featured first", () => {
    expect(ids(previewModules(items, 2))).toEqual(["rocket", "water", "radio", "injera", "wind", "dna"]);
  });
});

describe("suggestModules", () => {
  it("starts a new student at beginner", () => {
    expect(ids(suggestModules(items, {}, 4))).toEqual(["rocket", "water", "seeds", "radio"]);
  });

  it("moves up a level once one is finished, preferring familiar subjects", () => {
    expect(ids(suggestModules(items, { water: "completed" }, 3))).toEqual(["injera", "radio", "dna"]);
  });

  it("never suggests a module already started, and runs out gracefully", () => {
    const all = Object.fromEntries(items.map((m) => [m.id, "active" as const]));
    expect(suggestModules(items, all)).toEqual([]);
    expect(ids(suggestModules(items, { ...all, seeds: "not-started" }))).toEqual(["seeds"]);
  });

  it("comes back down when the higher levels are used up", () => {
    const s = { dna: "completed", wind: "active", injera: "active", radio: "active" } as const;
    expect(ids(suggestModules(items, { ...s, rocket: "completed" }))).toEqual(["water", "seeds"]);
  });
});

describe("content", () => {
  it("finds every module's mystery in its hook", () => {
    for (const m of loadContent().modules) expect(mysteryOf(m), m.id).toMatch(/\?$/);
  });
});
