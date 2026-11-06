import Link from "next/link";
import type { Station } from "@/lib/stations";
import { mysteryOf } from "@/lib/stations";
import { DISCIPLINES } from "@/lib/disciplines";
import { cn } from "@/lib/utils";
import { SUBJECT_STYLES } from "@/components/Subject";

export type RowProgress = { label: string; pct: number };

/**
 * Modules as case files, filed by their station on the dial. Used by the
 * landing page and the module list, so both read the same way.
 */
export function StationRows({ stations, progress }: { stations: Station[]; progress?: Record<string, RowProgress> }) {
  return (
    <ul className="border-t-2 border-ink">
      {stations.map(({ khz, module: m }) => {
        const p = progress?.[m.id];
        return (
          <li key={m.id} className="border-b-2 border-ink/15">
            <Link
              href={`/modules/${m.id}`}
              className="group grid gap-x-8 gap-y-3 py-8 outline-none focus-visible:bg-lab sm:grid-cols-[7rem_1fr] lg:grid-cols-[7rem_1.1fr_1fr_auto] lg:items-baseline"
            >
              <span className="font-dial text-4xl font-bold text-primary tabular-nums">
                {khz}
                <span className="ml-1 text-base font-medium text-ink/50">kHz</span>
              </span>
              <span>
                <span className="block font-dial text-4xl leading-none font-bold transition-colors group-hover:text-primary sm:text-5xl">
                  {m.title}
                </span>
                <span className="mt-2 block text-ink/75">{m.tagline}</span>
              </span>
              <span className="text-lg leading-snug italic sm:col-start-2 lg:col-start-auto">“{mysteryOf(m)}”</span>
              <span className="flex flex-wrap gap-x-3 gap-y-1 sm:col-start-2 lg:col-start-auto lg:justify-end">
                {m.disciplines.map((d) => (
                  <span key={d} className={cn("text-sm font-bold", SUBJECT_STYLES[d].text)}>
                    {DISCIPLINES[d].label}
                  </span>
                ))}
                <span className="w-full text-sm text-ink/55 lg:text-right">
                  {m.stepCount} steps, about {m.hours} hours
                </span>
                {p && (
                  <span className="mt-1 w-full lg:text-right">
                    <span className="text-sm font-bold text-primary">{p.label}</span>
                    <span aria-hidden className="mt-1.5 block h-1 w-full overflow-hidden rounded-full bg-ink/10 lg:ml-auto lg:w-40">
                      <span className="block h-full rounded-full bg-signal" style={{ width: `${p.pct}%` }} />
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
