"use client";

import { useEffect, useMemo, useState } from "react";
import { SearchIcon, SlidersHorizontal, XIcon } from "lucide-react";
import {
  type CardState,
  type CatalogueItem,
  type Filters,
  LENGTHS,
  type Length,
  NO_FILTERS,
  PROGRESS,
  type Progress,
  SORTS,
  type Sort,
  type Viewer,
  catalogueQuery,
  filterModules,
  isFiltered,
  sortModules,
} from "@/lib/catalogue";
import type { Discipline, Level } from "@/lib/content/types";
import { DISCIPLINES, LEVELS, LEVEL_ORDER } from "@/lib/disciplines";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GoogleIcon, googleSignInHref } from "@/components/GoogleButton";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CardGrid, ModuleCard } from "./ModuleCard";

/** Cards shown at first, and added by each "Show more". */
const PAGE = 12;

type Facet = "level" | "subject" | "length" | "progress";
const FACETS: { key: Facet; label: string; options: { value: string; label: string }[] }[] = [
  // Students only: shown when the viewer can start modules.
  { key: "progress", label: "Your progress", options: (Object.keys(PROGRESS) as Progress[]).map((p) => ({ value: p, label: PROGRESS[p] })) },
  { key: "level", label: "Level", options: LEVEL_ORDER.map((l) => ({ value: l, label: LEVELS[l].label })) },
  { key: "subject", label: "Subject", options: (Object.keys(DISCIPLINES) as Discipline[]).map((d) => ({ value: d, label: DISCIPLINES[d].label })) },
  { key: "length", label: "Length", options: (Object.keys(LENGTHS) as Length[]).map((l) => ({ value: l, label: LENGTHS[l].label })) },
];

/**
 * The catalogue: a search box, filters (a sidebar on desktop, a sheet on
 * phones), sort, and the matching modules as cards. Every choice is kept in
 * the URL, so a filtered view can be linked and shared.
 */
export function Catalogue({
  items,
  states,
  viewer,
  initial,
  initialSort,
}: {
  items: CatalogueItem[];
  states: Record<string, CardState>;
  viewer: Viewer;
  initial: Filters;
  initialSort: Sort;
}) {
  const [f, setF] = useState<Filters>(initial);
  const [sort, setSort] = useState<Sort>(initialSort);
  const [shown, setShown] = useState(PAGE);
  const [sheet, setSheet] = useState(false);
  // What's typed in the search box; it filters a moment after typing stops.
  const [typed, setTyped] = useState(initial.q);

  const facets = FACETS.filter((x) => x.key !== "progress" || viewer === "full");
  const results = useMemo(() => sortModules(filterModules(items, f, states), sort), [items, f, states, sort]);
  const active = facets.filter(({ key }) => f[key]).length + (f.q.trim() ? 1 : 0);

  useEffect(() => {
    if (typed === f.q) return;
    const t = setTimeout(() => {
      setF((cur) => ({ ...cur, q: typed }));
      setShown(PAGE);
    }, 150);
    return () => clearTimeout(t);
  }, [typed, f.q]);

  // Keep the address bar in step, without a navigation or a history entry per click.
  useEffect(() => {
    const url = `${window.location.pathname}${catalogueQuery(f, sort)}`;
    if (url !== `${window.location.pathname}${window.location.search}`) window.history.replaceState(window.history.state, "", url);
  }, [f, sort]);

  const update = (next: Filters) => {
    setF(next);
    setTyped(next.q);
    setShown(PAGE);
  };
  const toggle = (k: Facet, v: string) => update({ ...f, [k]: f[k] === v ? null : v } as Filters);
  /** How many modules an option would show, given the other filters. */
  const count = (k: Facet, v: string) => filterModules(items, { ...f, [k]: v } as Filters, states).length;

  const panel = (
    <div className="space-y-7">
      {facets.map((facet) => (
        <fieldset key={facet.key}>
          <legend className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">{facet.label}</legend>
          <ul className="mt-2 space-y-0.5">
            {facet.options.map((o) => {
              const on = f[facet.key] === o.value;
              const n = count(facet.key, o.value);
              return (
                <li key={o.value}>
                  <button
                    type="button"
                    aria-pressed={on}
                    disabled={!n && !on}
                    onClick={() => toggle(facet.key, o.value)}
                    className={cn(
                      "flex min-h-9 w-full items-center gap-2.5 rounded-md px-2 text-left text-sm transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40",
                      on && "font-semibold"
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn("inline-flex size-4 shrink-0 items-center justify-center rounded-full border", on ? "border-foreground" : "border-input")}
                    >
                      {on && <span className="size-2 rounded-full bg-foreground" />}
                    </span>
                    <span className="flex-1">{o.label}</span>
                    <span className="font-mono text-xs text-muted-foreground tabular-nums">{n}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </fieldset>
      ))}
    </div>
  );

  const chips: { key: string; label: string; clear: () => void }[] = [
    ...(f.q.trim() ? [{ key: "q", label: `“${f.q.trim()}”`, clear: () => update({ ...f, q: "" }) }] : []),
    ...(f.level ? [{ key: "level", label: LEVELS[f.level as Level].label, clear: () => update({ ...f, level: null }) }] : []),
    ...(f.subject ? [{ key: "subject", label: DISCIPLINES[f.subject].label, clear: () => update({ ...f, subject: null }) }] : []),
    ...(f.length ? [{ key: "length", label: LENGTHS[f.length].label, clear: () => update({ ...f, length: null }) }] : []),
    ...(f.progress ? [{ key: "progress", label: PROGRESS[f.progress], clear: () => update({ ...f, progress: null }) }] : []),
  ];

  return (
    <div className="grid gap-8 md:grid-cols-[13rem_minmax(0,1fr)] lg:gap-10">
      <aside aria-label="Filters" className="hidden md:block">
        <div className="sticky top-24">{panel}</div>
      </aside>

      <div className="min-w-0">
        <form role="search" onSubmit={(e) => e.preventDefault()} className="relative mb-5">
          <label htmlFor="catalogue-q" className="sr-only">
            Search modules
          </label>
          <SearchIcon aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="catalogue-q"
            type="search"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder="Search modules: rocket, coffee, DNA…"
            autoComplete="off"
            className="h-12 w-full rounded-xl border border-input bg-card pr-11 pl-10 text-base outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-search-cancel-button]:hidden"
          />
          {typed && (
            <button
              type="button"
              onClick={() => update({ ...f, q: "" })}
              aria-label="Clear search"
              className="absolute top-1/2 right-2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <XIcon aria-hidden className="size-4" />
            </button>
          )}
        </form>

        {viewer === "visitor" && (
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-accent px-4 py-3">
            <p className="text-sm">
              <span className="font-semibold">Free during the pilot.</span>{" "}
              <span className="text-foreground/75">Sign up to open every step and concept unit.</span>
            </p>
            <a href={googleSignInHref("/modules")} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              <GoogleIcon size={14} /> Sign up free
            </a>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            <span className="font-semibold text-foreground tabular-nums">{results.length}</span>{" "}
            {results.length === 1 ? "module" : "modules"}
            {isFiltered(f) && ` of ${items.length}`}
          </p>
          <div className="flex items-center gap-2">
            <Sheet open={sheet} onOpenChange={setSheet}>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <SlidersHorizontal aria-hidden /> Filters{active ? ` (${active})` : ""}
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="max-h-[85dvh] overflow-y-auto rounded-t-2xl bg-background px-5 pt-6 pb-5">
                <SheetHeader className="p-0">
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription className="sr-only">Narrow the modules by level, subject, length and progress</SheetDescription>
                </SheetHeader>
                {panel}
                <div className="sticky bottom-0 flex gap-2 bg-background pt-3">
                  <Button variant="outline" className="flex-1" onClick={() => update({ ...NO_FILTERS, q: f.q })}>
                    Reset
                  </Button>
                  <Button variant="ink" className="flex-1" onClick={() => setSheet(false)}>
                    Show {results.length} {results.length === 1 ? "module" : "modules"}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="h-10 rounded-lg border border-input bg-card px-2.5 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {(Object.keys(SORTS) as Sort[]).map((s) => (
                  <option key={s} value={s}>
                    {SORTS[s]}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {chips.length > 0 && (
          <ul className="mt-4 flex flex-wrap items-center gap-2">
            {chips.map((c) => (
              <li key={c.key}>
                <button
                  type="button"
                  onClick={c.clear}
                  aria-label={`Remove filter ${c.label}`}
                  className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-foreground py-1 pr-2.5 pl-3 text-sm text-background"
                >
                  {c.label} <XIcon aria-hidden className="size-3.5" />
                </button>
              </li>
            ))}
            <li>
              <button type="button" onClick={() => update(NO_FILTERS)} className="rounded-md px-2 py-1 text-sm font-medium text-primary hover:bg-muted">
                Clear all
              </button>
            </li>
          </ul>
        )}

        {results.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-border py-16 text-center">
            <p className="text-lg font-semibold">No modules match.</p>
            <p className="mt-1 text-muted-foreground">Try other words, or remove a filter.</p>
          </div>
        ) : (
          <>
            <CardGrid className="mt-6">
              {results.slice(0, shown).map((m) => (
                <li key={m.id}>
                  <ModuleCard item={m} state={states[m.id]} viewer={viewer} />
                </li>
              ))}
            </CardGrid>
            {results.length > shown && (
              <div className="mt-8 text-center">
                <Button variant="outline" size="lg" onClick={() => setShown((n) => n + PAGE)}>
                  Show more ({results.length - shown} left)
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
