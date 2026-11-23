import type { CatalogueItem } from "@/lib/catalogue";
import type { Discipline, Level } from "@/lib/content/types";

export type SearchModule = { id: string; title: string; tagline: string; mystery: string; disciplines: Discipline[]; level: Level; hours: number };
export type SearchUnit = { id: string; title: string; summary: string };
export type SearchIndex = { modules: SearchModule[]; units: SearchUnit[] };

/** The header search's index. Lists fields explicitly so nothing private slips in. */
export function searchIndex(modules: CatalogueItem[], concepts: { id: string; title: string; summary: string }[]): SearchIndex {
  return {
    modules: modules.map(({ id, title, tagline, mystery, disciplines, level, hours }) => ({ id, title, tagline, mystery, disciplines, level, hours })),
    units: concepts.map(({ id, title, summary }) => ({ id, title, summary })),
  };
}
