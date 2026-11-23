import type { Level } from "@/lib/content/types";
import { LEVELS } from "@/lib/disciplines";

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
