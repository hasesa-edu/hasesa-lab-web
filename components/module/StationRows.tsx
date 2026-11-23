import Link from "next/link";
import type { Station } from "@/lib/stations";
import { mysteryOf } from "@/lib/stations";
import { DISCIPLINES, LEVELS, LEVEL_ORDER } from "@/lib/disciplines";
import { cn } from "@/lib/utils";
import { SUBJECT_STYLES } from "@/components/Subject";

export type RowProgress = { label: string; pct: number };

/**
 * Modules as case files, filed by their station on the dial. Used by the
 * landing page and the module list, so both read the same way.
 */
export function StationRows({
  stations,
  progress,
  showLevel = true,
}: {
  stations: Station[];
  progress?: Record<string, RowProgress>;
  /** Off when the rows already sit under a level heading. */
  showLevel?: boolean;
}) {
  return (
    <ul className="border-t border-border">
      {stations.map(({ khz, module: m }) => {
        const p = progress?.[m.id];
        return (
          <li key={m.id} className="border-b border-border">
            <Link
              href={`/modules/${m.id}`}
              className="group grid gap-x-8 gap-y-2 py-7 outline-none focus-visible:bg-muted sm:grid-cols-[7rem_1fr] lg:grid-cols-[7rem_1.1fr_1fr_auto] lg:items-baseline"
            >
              <span className="font-mono text-sm text-primary tabular-nums">
                {khz} kHz
              </span>
              <span>
                <span className="block font-display text-2xl leading-tight font-semibold tracking-[-0.02em] transition-colors group-hover:text-primary sm:text-3xl">
                  {m.title}
                </span>
                <span className="mt-1 block text-muted-foreground">{m.tagline}</span>
              </span>
              <span className="font-legible text-base leading-snug text-foreground/85 sm:col-start-2 lg:col-start-auto">“{mysteryOf(m)}”</span>
              <span className="flex flex-wrap gap-x-3 gap-y-1 sm:col-start-2 lg:col-start-auto lg:justify-end">
                {m.disciplines.map((d) => (
                  <span key={d} className={cn("font-mono text-xs tracking-[0.06em] uppercase", SUBJECT_STYLES[d].text)}>
                    {DISCIPLINES[d].label}
                  </span>
                ))}
                <span className="w-full font-mono text-xs text-muted-foreground lg:text-right">
                  {showLevel && `${LEVELS[m.level].label} · `}
                  {m.stepCount} steps · ~{m.hours} h
                </span>
                {p && (
                  <span className="mt-1 w-full lg:text-right">
                    <span className="text-sm font-medium text-primary">{p.label}</span>
                    <span aria-hidden className="mt-1.5 block h-1 w-full overflow-hidden rounded-full bg-border lg:ml-auto lg:w-40">
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

/**
 * The same rows, filed under Beginner, Intermediate and Advanced, lowest
 * station first. Levels are a suggestion: any module can be started.
 */
export function LevelledStations({
  stations,
  progress,
  heading: Heading = "h2",
}: {
  stations: Station[];
  progress?: Record<string, RowProgress>;
  /** The level titles' heading tag, one below the section they sit in. */
  heading?: "h2" | "h3";
}) {
  return (
    <div className="space-y-14">
      {LEVEL_ORDER.map((level) => {
        const here = stations.filter((s) => s.module.level === level).sort((a, b) => a.khz - b.khz);
        if (!here.length) return null;
        return (
          <section key={level} aria-labelledby={`level-${level}`}>
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <Heading id={`level-${level}`} className="font-mono text-sm tracking-[0.08em] uppercase">
                {LEVELS[level].label}
                <span className="ml-3 text-muted-foreground tabular-nums">{here.length}</span>
              </Heading>
              <p className="max-w-xl text-sm text-muted-foreground">{LEVELS[level].blurb}</p>
            </div>
            <StationRows stations={here} progress={progress} showLevel={false} />
          </section>
        );
      })}
    </div>
  );
}
