"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, SearchIcon } from "lucide-react";
import { matchesQuery } from "@/lib/catalogue";
import type { SearchIndex } from "@/lib/search-index";
import { DISCIPLINES, LEVELS } from "@/lib/disciplines";
import { cn } from "@/lib/utils";
import { ModuleCover } from "@/components/module/ModuleCover";

// The index is the same for everyone and every page: fetch it once per visit.
let indexPromise: Promise<SearchIndex> | null = null;
function loadIndex() {
  indexPromise ??= fetch("/api/search-index")
    .then((r) => (r.ok ? (r.json() as Promise<SearchIndex>) : Promise.reject(new Error(String(r.status)))))
    .catch((e) => {
      indexPromise = null;
      throw e;
    });
  return indexPromise;
}

type Option = { key: string; href: string; kind: "module" | "unit"; title: string; sub: string; module?: SearchIndex["modules"][number] };

/**
 * Search modules and concept units from anywhere. Suggestions appear as you
 * type (arrow keys to move, Enter to open, Esc to close); Enter with nothing
 * picked shows every match in the catalogue.
 */
export function HeaderSearch({
  size = "md",
  autoFocus = false,
  shortcut = false,
  onNavigate,
  className,
}: {
  size?: "md" | "lg";
  autoFocus?: boolean;
  /** Focus with the "/" key. Only one search on the page should take it. */
  shortcut?: boolean;
  /** Called after a result is opened, e.g. to close a sheet. */
  onNavigate?: () => void;
  className?: string;
}) {
  const router = useRouter();
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [index, setIndex] = useState<SearchIndex | null>(null);

  const prime = () => {
    if (!index) loadIndex().then(setIndex, () => {});
  };

  useEffect(() => {
    if (autoFocus) prime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFocus]);

  useEffect(() => {
    if (!shortcut) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      if (t && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName))) return;
      e.preventDefault();
      input.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shortcut]);

  const options = useMemo<Option[]>(() => {
    if (!index || !q.trim()) return [];
    const modules = index.modules.filter((m) => matchesQuery(m, q)).slice(0, 5);
    const units = index.units.filter((u) => matchesQuery({ title: u.title, tagline: u.summary, mystery: "", disciplines: [] }, q)).slice(0, 3);
    return [
      ...modules.map((m) => ({
        key: `m-${m.id}`,
        href: `/modules/${m.id}`,
        kind: "module" as const,
        title: m.title,
        sub: `${LEVELS[m.level].label} · ${m.disciplines.map((d) => DISCIPLINES[d].label).join(", ")} · ~${m.hours} h`,
        module: m,
      })),
      ...units.map((u) => ({ key: `u-${u.id}`, href: `/concepts/${u.id}`, kind: "unit" as const, title: u.title, sub: u.summary })),
    ];
  }, [index, q]);

  const showList = open && q.trim().length > 0;

  function go(href: string) {
    setOpen(false);
    setActive(-1);
    router.push(href);
    onNavigate?.();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, -1));
    } else if (e.key === "Escape") {
      if (showList) setOpen(false);
      else input.current?.blur();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (active >= 0 && options[active]) go(options[active].href);
      else if (q.trim()) go(`/modules?q=${encodeURIComponent(q.trim())}`);
    }
  }

  const listId = `${id}-list`;
  const optId = (i: number) => `${id}-opt-${i}`;
  const firstUnit = options.findIndex((o) => o.kind === "unit");

  return (
    <div className={cn("relative", className)}>
      <label className="relative block">
        <span className="sr-only">Search modules and units</span>
        <SearchIcon
          aria-hidden
          className={cn("pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted-foreground", size === "lg" ? "left-4 size-5" : "left-3 size-4")}
        />
        <input
          ref={input}
          type="search"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={showList && active >= 0 ? optId(active) : undefined}
          autoFocus={autoFocus}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => {
            prime();
            setOpen(true);
          }}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          onKeyDown={onKeyDown}
          placeholder={size === "lg" ? "What do you want to build or find out?" : "Search modules"}
          className={cn(
            "w-full rounded-lg border border-input bg-background text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
            size === "lg" ? "h-14 pr-4 pl-12 text-lg shadow-soft" : "h-10 pr-8 pl-9 text-sm"
          )}
        />
        {shortcut && !q && (
          <kbd aria-hidden className="pointer-events-none absolute top-1/2 right-2.5 hidden -translate-y-1/2 rounded border border-border px-1.5 font-mono text-[11px] text-muted-foreground lg:block">
            /
          </kbd>
        )}
      </label>

      {showList && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-popover shadow-pop">
          <ul id={listId} role="listbox" aria-label="Suggestions" className="max-h-[70vh] overflow-y-auto py-1.5">
            {!index && <li className="px-4 py-3 text-sm text-muted-foreground">Loading…</li>}
            {index && options.length === 0 && <li className="px-4 py-3 text-sm text-muted-foreground">No matches. Press Enter to search the catalogue.</li>}
            {options.map((o, i) => (
              <li key={o.key} role="presentation">
                {i === 0 && o.kind === "module" && <p className="px-4 pt-2 pb-1 font-mono text-[10px] tracking-[0.08em] text-muted-foreground uppercase">Modules</p>}
                {i === firstUnit && <p className="px-4 pt-3 pb-1 font-mono text-[10px] tracking-[0.08em] text-muted-foreground uppercase">Concept units</p>}
                <div
                  id={optId(i)}
                  role="option"
                  aria-selected={i === active}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => go(o.href)}
                  onMouseEnter={() => setActive(i)}
                  className={cn("flex cursor-pointer items-center gap-3 px-4 py-2", i === active && "bg-muted")}
                >
                  {o.module ? (
                    <ModuleCover id={o.module.id} disciplines={o.module.disciplines} level={o.module.level} size="sm" className="w-14 shrink-0 rounded-md" />
                  ) : (
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <BookOpen aria-hidden className="size-4" />
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-foreground">{o.title}</span>
                    <span className="block truncate text-xs text-muted-foreground">{o.sub}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
          {q.trim() && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => go(`/modules?q=${encodeURIComponent(q.trim())}`)}
              className="flex w-full items-center gap-2 border-t border-border px-4 py-2.5 text-left text-sm font-medium text-primary hover:bg-muted"
            >
              <SearchIcon aria-hidden className="size-4" /> See all results for “{q.trim()}”
            </button>
          )}
        </div>
      )}
    </div>
  );
}
