import type { Discipline, Level } from "@/lib/content/types";
import { coverPattern, hashId } from "@/lib/catalogue";
import { LEVELS } from "@/lib/disciplines";
import { cn } from "@/lib/utils";
import { SubjectIcon } from "@/components/Subject";

// Each subject's ink and soft background, as theme tokens, so covers follow light and dark mode.
const COLOURS: Record<Discipline, { ink: string; soft: string }> = {
  physics: { ink: "var(--physics)", soft: "var(--physics-soft)" },
  chemistry: { ink: "var(--chemistry)", soft: "var(--chemistry-soft)" },
  biology: { ink: "var(--biology)", soft: "var(--biology-soft)" },
  mathematics: { ink: "var(--primary)", soft: "var(--primary-soft)" },
  technology: { ink: "var(--muted-foreground)", soft: "var(--muted)" },
};

/**
 * A module's cover, drawn in code: the first subject's colours, one of a few
 * patterns (always the same one for a module), the subject icons and the
 * level. No image files, so every new module gets a cover for free.
 */
export function ModuleCover({
  id,
  disciplines,
  level,
  size = "md",
  className,
}: {
  id: string;
  disciplines: Discipline[];
  level: Level;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const main = COLOURS[disciplines[0]];
  const accent = COLOURS[disciplines[1] ?? disciplines[0]];
  const h = hashId(id);
  // Where the pattern sits and how it leans, from the id, so covers of the same design still differ.
  const cx = 30 + (h % 100);
  const cy = 15 + ((h >> 8) % 60);
  const tilt = ((h >> 16) % 50) - 25;

  return (
    <div
      aria-hidden
      className={cn("relative isolate overflow-hidden", size === "sm" ? "aspect-[4/3]" : "aspect-[16/9]", className)}
      style={{ backgroundColor: main.soft, color: main.ink }}
    >
      <svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        <Pattern kind={coverPattern(id)} cx={cx} cy={cy} tilt={tilt} />
        <circle cx={160 - cx / 2} cy={90 - cy / 3} r={14 + (h % 10)} fill={accent.ink} opacity={0.16} />
      </svg>
      {size !== "sm" && (
        <>
          <div className="absolute top-3 left-3 flex gap-1.5">
            {disciplines.map((d) => (
              <span key={d} className="inline-flex size-8 items-center justify-center rounded-lg bg-card/85 [&_svg]:size-4" style={{ color: COLOURS[d].ink }}>
                <SubjectIcon subject={d} />
              </span>
            ))}
          </div>
          <span className="absolute bottom-3 left-3 rounded-full bg-card/90 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.08em] text-foreground uppercase">
            {LEVELS[level].label}
          </span>
        </>
      )}
    </div>
  );
}

function Pattern({ kind, cx, cy, tilt }: { kind: ReturnType<typeof coverPattern>; cx: number; cy: number; tilt: number }) {
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, opacity: 0.45 } as const;
  switch (kind) {
    case "rings":
      return (
        <g {...stroke}>
          {[10, 20, 30, 40, 52, 66].map((r) => (
            <circle key={r} cx={cx} cy={cy} r={r} />
          ))}
        </g>
      );
    case "waves":
      return (
        <g {...stroke} transform={`rotate(${tilt / 2} 80 45)`}>
          {[-20, -6, 8, 22, 36, 50, 64, 78, 92, 106].map((y) => (
            <path key={y} d={`M -20 ${y} q 15 -10 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0`} />
          ))}
        </g>
      );
    case "dots":
      return (
        <g fill="currentColor" opacity={0.4} transform={`rotate(${tilt} 80 45)`}>
          {Array.from({ length: 12 }, (_, i) =>
            Array.from({ length: 8 }, (_, j) => {
              const d = Math.hypot(i * 16 - cx, j * 16 - cy);
              return <circle key={`${i}-${j}`} cx={i * 16 - 8} cy={j * 16 - 12} r={Math.max(0.8, 3.6 - d / 30)} />;
            })
          )}
        </g>
      );
    case "rays":
      return (
        <g {...stroke}>
          {Array.from({ length: 18 }, (_, i) => {
            const a = ((i * 20 + tilt) * Math.PI) / 180;
            return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * 200} y2={cy + Math.sin(a) * 200} />;
          })}
          <circle cx={cx} cy={cy} r={9} fill="currentColor" opacity={0.5} />
        </g>
      );
  }
}
