"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, SearchIcon } from "lucide-react";
import { type CatalogueItem, matchesQuery } from "@/lib/catalogue";
import { DISCIPLINES, LEVEL_ORDER } from "@/lib/disciplines";
import { LevelHeading } from "@/components/module/LevelHeading";

export function GuideIndex({ items }: { items: CatalogueItem[] }) {
  const [q, setQ] = useState("");
  const results = items.filter((m) => matchesQuery(m, q));

  return (
    <div>
      <label className="relative block max-w-xl">
        <span className="sr-only">Search modules</span>
        <SearchIcon aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search modules"
          className="h-11 w-full rounded-lg border border-input bg-card pr-3 pl-10 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </label>

      {results.length === 0 && <p className="mt-10 text-muted-foreground">No modules match.</p>}

      <div className="mt-8 space-y-10">
        {LEVEL_ORDER.map((level) => {
          const here = results.filter((m) => m.level === level);
          if (!here.length) return null;
          return (
            <section key={level} aria-labelledby={`level-${level}`}>
              <LevelHeading level={level} count={here.length} />
              <ul className="grid gap-2 sm:grid-cols-2">
                {here.map((m) => (
                  <li key={m.id}>
                    <Link
                      href={`/modules/${m.id}/guide`}
                      className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-card ring-1 ring-border transition hover:ring-primary/50"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-foreground">{m.title}</span>
                        <span className="block truncate text-sm text-muted-foreground">
                          {m.disciplines.map((d) => DISCIPLINES[d].label).join(" · ")} · ~{m.hours} h
                        </span>
                      </span>
                      <ChevronRight aria-hidden className="size-4 shrink-0 text-subtle-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
