// Browsing the modules: search, filters, the Academy page's preview and the
// dashboard's suggestions. Pure functions, safe on the server and in the
// browser, built to stay usable with hundreds of modules.

import type { Discipline, Level, ModuleSummary } from "@/lib/content/types";
import { DISCIPLINES, LEVEL_ORDER } from "@/lib/disciplines";

/** The last sentence of a hook is the mystery itself. */
export function mysteryOf(m: { hook: string; tagline: string }) {
  return m.hook.match(/[^.!?…—]*\?\s*$/)?.[0].trim() || m.tagline;
}

/** What a row in a module list needs, and nothing more. */
export type CatalogueItem = {
  id: string;
  title: string;
  tagline: string;
  mystery: string;
  disciplines: Discipline[];
  level: Level;
  hours: number;
  stepCount: number;
  featured: boolean;
  /** Where Start takes a student. */
  firstStepId: string;
  /** The free public unit, for visitors. */
  sampleId: string;
};

export function catalogueItem(m: ModuleSummary): CatalogueItem {
  return {
    id: m.id,
    title: m.title,
    tagline: m.tagline,
    mystery: mysteryOf(m),
    disciplines: m.disciplines,
    level: m.level,
    hours: m.hours,
    stepCount: m.stepCount,
    featured: m.featured,
    firstStepId: m.steps[0]?.id ?? "",
    sampleId: m.publicSample.id,
  };
}

/** Length filters. */
export const LENGTHS = {
  short: { label: "Up to 8 h", fits: (h: number) => h <= 8 },
  medium: { label: "9–12 h", fits: (h: number) => h > 8 && h <= 12 },
  long: { label: "13 h or more", fits: (h: number) => h > 12 },
} as const;
export type Length = keyof typeof LENGTHS;

export type Filters = { q: string; level: Level | null; subject: Discipline | null; length: Length | null };
export const NO_FILTERS: Filters = { q: "", level: null, subject: null, length: null };

type Params = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const oneOf = <T extends string>(v: string, allowed: readonly T[]): T | null => (allowed.includes(v as T) ? (v as T) : null);

/** Filters from a URL's query (`?q=&level=&subject=&length=`). Unknown values are ignored. */
export function parseFilters(params: Params): Filters {
  return {
    q: first(params.q).trim().slice(0, 100),
    level: oneOf(first(params.level), LEVEL_ORDER),
    subject: oneOf(first(params.subject), Object.keys(DISCIPLINES) as Discipline[]),
    length: oneOf(first(params.length), Object.keys(LENGTHS) as Length[]),
  };
}

/** The query string for a set of filters, without empty values ("" when none). */
export function filtersQuery(f: Filters): string {
  const p = new URLSearchParams();
  if (f.q.trim()) p.set("q", f.q.trim());
  if (f.level) p.set("level", f.level);
  if (f.subject) p.set("subject", f.subject);
  if (f.length) p.set("length", f.length);
  const s = p.toString();
  return s ? `?${s}` : "";
}

export const isFiltered = (f: Filters) => !!(f.q.trim() || f.level || f.subject || f.length);

const fold = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");

/** Does a module match a search? Every word must appear in its title, tagline, mystery or subjects. */
export function matchesQuery(m: Pick<CatalogueItem, "title" | "tagline" | "mystery" | "disciplines">, q: string): boolean {
  const words = fold(q).split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  const text = fold([m.title, m.tagline, m.mystery, ...m.disciplines.map((d) => DISCIPLINES[d].label)].join(" "));
  return words.every((w) => text.includes(w));
}

/** The modules that match every filter, in the order given (content order: easiest first). */
export function filterModules<T extends CatalogueItem>(items: T[], f: Filters): T[] {
  return items.filter(
    (m) =>
      (!f.level || m.level === f.level) &&
      (!f.subject || m.disciplines.includes(f.subject)) &&
      (!f.length || LENGTHS[f.length].fits(m.hours)) &&
      matchesQuery(m, f.q)
  );
}

/** A few modules per level for a short preview: featured ones first, then content order. */
export function previewModules<T extends CatalogueItem>(items: T[], perLevel = 3): T[] {
  return LEVEL_ORDER.flatMap((level) => {
    const here = items.filter((m) => m.level === level);
    return [...here.filter((m) => m.featured), ...here.filter((m) => !m.featured)].slice(0, perLevel);
  });
}

export type Status = "not-started" | "active" | "dropped" | "completed";

/**
 * What to start next. Modules the student hasn't started, beginning at the
 * lowest level they haven't finished a module in (beginner for a new student)
 * and moving up; within a level, modules sharing a subject with what they've
 * already tried come first, then featured ones, then content order.
 */
export function suggestModules<T extends CatalogueItem>(items: T[], status: Record<string, Status>, count = 4): T[] {
  const rank = (l: Level) => LEVEL_ORDER.indexOf(l);
  const tried = items.filter((m) => (status[m.id] ?? "not-started") !== "not-started");
  const finished = new Set(items.filter((m) => status[m.id] === "completed").map((m) => m.level));
  const startIdx = LEVEL_ORDER.findIndex((l) => !finished.has(l));
  const start = startIdx === -1 ? LEVEL_ORDER.length - 1 : startIdx;
  const subjects = new Set(tried.flatMap((m) => m.disciplines));

  // Levels from the starting one upwards, then any easier ones left over.
  const levelOrder = (l: Level) => (rank(l) >= start ? rank(l) - start : LEVEL_ORDER.length + rank(l));
  const overlap = (m: T) => m.disciplines.filter((d) => subjects.has(d)).length;

  return items
    .map((m, i) => ({ m, i }))
    .filter(({ m }) => (status[m.id] ?? "not-started") === "not-started")
    .sort((a, b) => levelOrder(a.m.level) - levelOrder(b.m.level) || overlap(b.m) - overlap(a.m) || Number(b.m.featured) - Number(a.m.featured) || a.i - b.i)
    .slice(0, count)
    .map(({ m }) => m);
}

/** Catalogue sort orders. "suggested" is easiest first, featured first within a level. */
export const SORTS = { suggested: "Suggested", short: "Shortest first", az: "A–Z" } as const;
export type Sort = keyof typeof SORTS;

export function parseSort(params: Params): Sort {
  return oneOf(first(params.sort), Object.keys(SORTS) as Sort[]) ?? "suggested";
}

export function sortModules<T extends CatalogueItem>(items: T[], sort: Sort): T[] {
  const rank = (l: Level) => LEVEL_ORDER.indexOf(l);
  const indexed = items.map((m, i) => ({ m, i }));
  const by: Record<Sort, (a: { m: T; i: number }, b: { m: T; i: number }) => number> = {
    suggested: (a, b) => rank(a.m.level) - rank(b.m.level) || Number(b.m.featured) - Number(a.m.featured) || a.i - b.i,
    short: (a, b) => a.m.hours - b.m.hours || rank(a.m.level) - rank(b.m.level) || a.i - b.i,
    az: (a, b) => a.m.title.localeCompare(b.m.title),
  };
  return indexed.sort(by[sort]).map(({ m }) => m);
}

/** The catalogue's full query string: filters plus a sort other than the default. */
export function catalogueQuery(f: Filters, sort: Sort): string {
  const q = filtersQuery(f);
  if (sort === "suggested") return q;
  return `${q ? `${q}&` : "?"}sort=${sort}`;
}

/** Where a viewer stands with a module, for a card's button. */
export type CardState = {
  status: Status;
  stepsDone: number;
  stepsTotal: number;
  nextStepId: string | null;
  certificateCode: string | null;
};

/** Who is looking: a visitor, signed in without full access, or able to start modules. */
export type Viewer = "visitor" | "limited" | "full";

/** Generated cover designs. A module always gets the same one. */
export const COVER_PATTERNS = ["rings", "waves", "dots", "rays"] as const;
export type CoverPattern = (typeof COVER_PATTERNS)[number];

/** A small stable hash of a module id (FNV-1a). */
export function hashId(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function coverPattern(id: string): CoverPattern {
  return COVER_PATTERNS[hashId(id) % COVER_PATTERNS.length];
}
