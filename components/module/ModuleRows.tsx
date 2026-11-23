import Link from "next/link";
import type { CatalogueItem } from "@/lib/catalogue";
import type { Level } from "@/lib/content/types";
import { DISCIPLINES, LEVELS } from "@/lib/disciplines";
import { cn } from "@/lib/utils";
import { SUBJECT_STYLES } from "@/components/Subject";

export type RowProgress = { label: string; pct: number };

/**
 * Modules as compact rows: title and tagline, the mystery, then subjects,
 * level and length. Used by the catalogue, the Academy page's preview and
 * the dashboard, so every list reads the same way.
 */
export function ModuleRows({
  items,
  progress,
  showLevel = true,
  className,
}: {
  items: CatalogueItem[];
  progress?: Record<string, RowProgress>;
  /** Off when the rows already sit under a level heading. */
  showLevel?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn("border-t border-border", className)}>
      {items.map((m) => {
        const p = progress?.[m.id];
        return (
          <li key={m.id} className="border-b border-border">
            <Link
              href={`/modules/${m.id}`}
              className="group grid gap-x-8 gap-y-2 py-5 outline-none focus-visible:bg-muted md:grid-cols-[1fr_1.15fr] lg:grid-cols-[1fr_1.15fr_12rem] lg:items-baseline"
            >
              <span className="min-w-0">
                <span className="block font-display text-xl leading-tight font-semibold tracking-[-0.02em] transition-colors group-hover:text-primary sm:text-2xl">
                  {m.title}
                </span>
                <span className="mt-0.5 block text-sm text-muted-foreground">{m.tagline}</span>
              </span>
              <span className="line-clamp-3 font-legible text-[15px] leading-snug text-foreground/80">“{m.mystery}”</span>
              <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1 md:col-span-2 lg:col-span-1 lg:justify-end lg:text-right">
                {m.disciplines.map((d) => (
                  <span key={d} className={cn("font-mono text-xs tracking-[0.06em] uppercase", SUBJECT_STYLES[d].text)}>
                    {DISCIPLINES[d].label}
                  </span>
                ))}
                <span className="font-mono text-xs text-muted-foreground lg:w-full">
                  {showLevel && `${LEVELS[m.level].label} · `}
                  {m.stepCount} steps · ~{m.hours} h
                </span>
                {p && (
                  <span className="w-full">
                    <span className="text-sm font-medium text-primary">{p.label}</span>
                    <span aria-hidden className="mt-1.5 block h-1 w-full max-w-40 overflow-hidden rounded-full bg-border lg:ml-auto">
                      <span className="block h-full rounded-full bg-primary" style={{ width: `${p.pct}%` }} />
                    </span>
                  </span>
                )}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** A level's title, how many modules it has, and what it asks of a student. */
export function LevelHeading({
  level,
  count,
  as: Heading = "h2",
  children,
}: {
  level: Level;
  count: number;
  as?: "h2" | "h3";
  /** Extra on the right, e.g. a "See all" link. */
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
      <div className="min-w-0">
        <Heading id={`level-${level}`} className="font-mono text-sm tracking-[0.08em] uppercase">
          {LEVELS[level].label}
          <span className="ml-3 text-muted-foreground tabular-nums">{count}</span>
        </Heading>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">{LEVELS[level].blurb}</p>
      </div>
      {children}
    </div>
  );
}
