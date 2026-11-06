import Link from "next/link";
import { ArrowRight, Clock, Hammer } from "lucide-react";
import type { ModuleSummary } from "@/lib/content/types";
import type { ModuleProgress } from "@/lib/summary";
import { cn } from "@/lib/utils";
import { SUBJECT_STYLES, SubjectLabel } from "@/components/Subject";
import { ProgressBar, StatusBadge } from "./ui";

export function ModuleCard({ m, progress, className }: { m: ModuleSummary; progress?: ModuleProgress; className?: string }) {
  const lead = m.disciplines[0];
  const pct = progress && progress.stepsTotal ? Math.round((progress.stepsDone / progress.stepsTotal) * 100) : 0;
  return (
    <Link
      href={`/modules/${m.id}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-card p-6 pt-7 shadow-card ring-1 ring-border transition outline-none hover:-translate-y-1 hover:shadow-pop focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
    >
      <span aria-hidden className={cn("absolute inset-x-0 top-0 h-1.5", SUBJECT_STYLES[lead].bg)} />
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {m.disciplines.map((d) => (
          <SubjectLabel key={d} subject={d} />
        ))}
      </div>
      <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground">{m.title}</h3>
      <p className="mt-1 font-semibold text-primary-strong dark:text-primary">{m.tagline}</p>
      <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">{m.hook}</p>
      <div className="mt-auto pt-5">
        {progress && progress.status !== "not-started" ? (
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
              <span>
                {progress.status === "completed" ? "Completed" : progress.status === "dropped" ? "Dropped" : "In progress"}
              </span>
              <span className="tabular-nums">
                {progress.stepsDone}/{progress.stepsTotal} steps
              </span>
            </div>
            <ProgressBar pct={pct} className="mt-2" />
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-subtle-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock aria-hidden className="size-4" /> About {m.hours} hours
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Hammer aria-hidden className="size-4" /> {m.stepCount} steps
            </span>
            {m.status === "ai-draft" && <StatusBadge status={m.status} />}
          </div>
        )}
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-strong dark:text-primary">
          {progress?.status === "active" ? "Continue" : "See the module"}
          <ArrowRight aria-hidden className="size-4 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
