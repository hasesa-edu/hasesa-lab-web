import Link from "next/link";
import { GraduationCap } from "lucide-react";
import type { ContentStatus } from "@/lib/content/types";
import type { CardState, CatalogueItem, Viewer } from "@/lib/catalogue";
import { Button } from "@/components/ui/button";
import { EnrollButton } from "./EnrollButton";
import { ModuleAction } from "./ModuleCard";
import { StatusBadge } from "./ui";

type Props = {
  moduleId: string;
  hours: number;
  steps: number;
  units: number;
  materials: number;
  status: ContentStatus;
  /** The student's status with this module (students only). */
  progress: CardState["status"] | null;
  guide: boolean;
};

/**
 * The module page's side card: what the module includes, at a glance. The one
 * thing to do next (sign up, start, continue) lives in the banner above, so
 * this card carries no main action; only links that belong nowhere else.
 */
export function ModuleIncludes({ moduleId, hours, steps, units, materials, status, progress, guide }: Props) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <p className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">This module includes</p>
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4">
        {[
          [`~${hours}`, "hours"],
          [steps, "steps"],
          [units, "concept units"],
          [materials, "materials provided"],
        ].map(([n, label]) => (
          <div key={label}>
            <dt className="sr-only">{label}</dt>
            <dd className="font-mono text-2xl tabular-nums">{n}</dd>
            <dd className="text-xs text-muted-foreground">{label}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 border-t border-border pt-4">
        <StatusBadge status={status} />
      </div>

      {(guide || progress === "active") && (
        <div className="mt-4 space-y-2 border-t border-border pt-4">
          {guide && (
            <Button asChild variant="outline" className="w-full">
              <Link href={`/modules/${moduleId}/guide`}>
                <GraduationCap aria-hidden /> Guide&apos;s version
              </Link>
            </Button>
          )}
          {progress === "active" && <EnrollButton moduleId={moduleId} status="active" />}
        </div>
      )}
    </div>
  );
}

/** Phones, visitors and limited users: the banner's sign-up action pinned to the bottom of the screen. */
export function ModuleMobileBar({ item, viewer }: { item: Pick<CatalogueItem, "id" | "firstStepId" | "sampleId">; viewer: Viewer }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden">
      <ModuleAction item={item} viewer={viewer} className="w-full flex-nowrap [&>*]:flex-1" />
    </div>
  );
}
