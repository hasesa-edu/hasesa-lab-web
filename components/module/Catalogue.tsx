"use client";

import { useEffect, useMemo, useState } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import { type CatalogueItem, type Filters, LENGTHS, type Length, NO_FILTERS, filterModules, filtersQuery, isFiltered } from "@/lib/catalogue";
import type { Discipline, Level } from "@/lib/content/types";
import { DISCIPLINES, LEVELS, LEVEL_ORDER } from "@/lib/disciplines";
import { cn } from "@/lib/utils";
import { LevelHeading, ModuleRows, type RowProgress } from "./ModuleRows";

/** How many modules each level shows before "Show all". */
const PER_LEVEL = 6;

/**
 * The module catalogue: search, filter chips and the results. Filters live in
 * the URL (`?q=&level=&subject=&length=`) so they can be linked and shared.
 * With no filters, modules are grouped by level and each level is trimmed to
 * a few; with any filter, matches are listed together, easiest first.
 */
export function Catalogue({ items, progress, initial }: { items: CatalogueItem[]; progress?: Record<string, RowProgress>; initial: Filters }) {
  const [f, setF] = useState<Filters>(initial);
  const [open, setOpen] = useState<Partial<Record<Level, boolean>>>({});
  const results = useMemo(() => filterModules(items, f), [items, f]);
  const filtered = isFiltered(f);

  // Keep the address bar in step, without a navigation or a history entry per keystroke.
  useEffect(() => {
    const url = `${window.location.pathname}${filtersQuery(f)}`;
    if (url !== `${window.location.pathname}${window.location.search}`) window.history.replaceState(window.history.state, "", url);
  }, [f]);

  // A chip toggles its value on and off.
  const set = (k: "level" | "subject" | "length", v: string) => setF((prev) => ({ ...prev, [k]: prev[k] === v ? null : v }) as Filters);

  return (
    <div>
      <div className="space-y-4">
        <label className="relative block max-w-xl">
          <span className="sr-only">Search modules</span>
          <SearchIcon aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={f.q}
            onChange={(e) => setF((prev) => ({ ...prev, q: e.target.value }))}
            placeholder="Search: rocket, coffee, electricity, DNA…"
            className="h-12 w-full rounded-lg border border-input bg-card pr-3 pl-10 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </label>

        <ChipGroup label="Level">
          {LEVEL_ORDER.map((l) => (
            <Chip key={l} on={f.level === l} onClick={() => set("level", l)}>
              {LEVELS[l].label}
            </Chip>
          ))}
        </ChipGroup>
        <ChipGroup label="Subject">
          {(Object.keys(DISCIPLINES) as Discipline[]).map((d) => (
            <Chip key={d} on={f.subject === d} onClick={() => set("subject", d)}>
              {DISCIPLINES[d].label}
            </Chip>
          ))}
        </ChipGroup>
        <ChipGroup label="Length">
          {(Object.keys(LENGTHS) as Length[]).map((l) => (
            <Chip key={l} on={f.length === l} onClick={() => set("length", l)}>
              {LENGTHS[l].label}
            </Chip>
          ))}
        </ChipGroup>
      </div>

      <div className="mt-6 flex min-h-9 flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <p className="font-mono text-xs tracking-[0.06em] text-muted-foreground uppercase" aria-live="polite">
          {filtered ? `${results.length} of ${items.length} modules` : `${items.length} modules`}
        </p>
        {filtered && (
          <button
            type="button"
            onClick={() => setF(NO_FILTERS)}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-primary hover:bg-muted"
          >
            <XIcon aria-hidden className="size-4" /> Clear filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg font-semibold">No modules match.</p>
          <p className="mt-1 text-muted-foreground">Try fewer words, or clear a filter.</p>
        </div>
      ) : filtered ? (
        <ModuleRows items={results} progress={progress} className="border-t-0" />
      ) : (
        <div className="mt-10 space-y-14">
          {LEVEL_ORDER.map((level) => {
            const here = results.filter((m) => m.level === level);
            if (!here.length) return null;
            const shown = open[level] ? here : here.slice(0, PER_LEVEL);
            return (
              <section key={level} aria-labelledby={`level-${level}`}>
                <LevelHeading level={level} count={here.length} />
                <ModuleRows items={shown} progress={progress} showLevel={false} />
                {here.length > PER_LEVEL && (
                  <button
                    type="button"
                    aria-expanded={!!open[level]}
                    onClick={() => setOpen((o) => ({ ...o, [level]: !o[level] }))}
                    className="mt-4 rounded-md px-2 py-1 text-sm font-medium text-primary hover:bg-muted"
                  >
                    {open[level] ? `Show fewer` : `Show all ${here.length} ${LEVELS[level].label.toLowerCase()} modules`}
                  </button>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ChipGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2">
      <span className="w-16 shrink-0 font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">{label}</span>
      {children}
    </div>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        "min-h-9 rounded-full border px-3.5 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        on ? "border-foreground bg-foreground text-background" : "border-border bg-card text-foreground hover:border-foreground/40"
      )}
    >
      {children}
    </button>
  );
}
