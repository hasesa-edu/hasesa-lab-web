import Link from "next/link";
import { Award, GraduationCap } from "lucide-react";
import type { ContentStatus } from "@/lib/content/types";
import type { ModuleProgress } from "@/lib/summary";
import { Button } from "@/components/ui/button";
import { GoogleIcon, googleSignInHref } from "@/components/GoogleButton";
import { EnrollButton } from "./EnrollButton";
import { ProgressBar, StatusBadge } from "./ui";

type Props = {
  moduleId: string;
  hours: number;
  steps: number;
  units: number;
  khz?: number;
  status: ContentStatus;
  full: boolean;
  signedIn: boolean;
  guide: boolean;
  progress: ModuleProgress | null;
  sample: { id: string; title: string };
};

/**
 * The module page's action panel: the one thing to do next, plus the facts.
 * It sits beside the story on desktop and stays in view while scrolling.
 */
export function ModuleActions({ moduleId, hours, steps, units, khz, status, full, signedIn, guide, progress, sample }: Props) {
  const pct = progress && progress.stepsTotal ? Math.round((progress.stepsDone / progress.stepsTotal) * 100) : 0;

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      {!full ? (
        <div className="space-y-2">
          <p className="font-semibold">Free during the pilot</p>
          <p className="text-sm text-muted-foreground">Sign up to open every step, concept unit and the lab assistant.</p>
          {!signedIn && (
            <Button asChild size="lg" variant="ink" className="mt-2 w-full">
              <a href={googleSignInHref(`/modules/${moduleId}`)}>
                <GoogleIcon size={16} /> Sign up free
              </a>
            </Button>
          )}
          <Button asChild size="lg" variant="outline" className="w-full">
            <Link href={`/concepts/${sample.id}?from=${moduleId}`}>Try a free unit</Link>
          </Button>
        </div>
      ) : progress?.status === "completed" ? (
        <div className="space-y-3">
          <p className="flex items-center gap-2 font-semibold">
            <Award aria-hidden className="size-5 text-primary" /> Module complete
          </p>
          {progress.certificateCode && (
            <Button asChild size="lg" variant="ink" className="w-full">
              <Link href={`/certificates/${progress.certificateCode}`}>View your certificate</Link>
            </Button>
          )}
        </div>
      ) : progress?.status === "active" ? (
        <div className="space-y-3">
          {progress.nextStep && (
            <Button asChild size="lg" variant="ink" className="h-auto w-full justify-start py-2.5 text-left whitespace-normal">
              <Link href={`/modules/${moduleId}/${progress.nextStep.id}`}>
                {progress.stepsDone ? "Continue" : "Begin"}: {progress.nextStep.title}
              </Link>
            </Button>
          )}
          <div>
            <p className="text-sm text-muted-foreground">
              {progress.stepsDone} of {progress.stepsTotal} steps · {progress.unitsDone} of {progress.unitsTotal} units
            </p>
            <ProgressBar pct={pct} className="mt-2" />
          </div>
          <EnrollButton moduleId={moduleId} status="active" />
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Start the module to track your steps and units.</p>
          <EnrollButton moduleId={moduleId} status={progress?.status ?? "not-started"} />
        </div>
      )}

      {guide && (
        <Button asChild variant="outline" className="mt-3 w-full">
          <Link href={`/modules/${moduleId}/guide`}>
            <GraduationCap aria-hidden /> Guide&apos;s version
          </Link>
        </Button>
      )}

      <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
        {[
          [hours, "hours"],
          [steps, "steps"],
          [units, "units"],
        ].map(([n, label]) => (
          <div key={label}>
            <dt className="sr-only">{label}</dt>
            <dd className="font-mono text-2xl tabular-nums">{n}</dd>
            <dd className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">{label}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
        <StatusBadge status={status} />
        {khz && (
          <span className="font-mono text-sm text-muted-foreground tabular-nums" aria-label={`Station ${khz} kilohertz`}>
            {khz} kHz
          </span>
        )}
      </div>
    </div>
  );
}

/** Phones, visitors only: the sign-up action pinned to the bottom of the screen. */
export function ModuleMobileBar({ moduleId, signedIn, sample }: { moduleId: string; signedIn: boolean; sample: { id: string } }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden">
      {!signedIn && (
        <Button asChild variant="ink" className="flex-1">
          <a href={googleSignInHref(`/modules/${moduleId}`)}>
            <GoogleIcon size={16} /> Sign up free
          </a>
        </Button>
      )}
      <Button asChild variant="outline" className="flex-1">
        <Link href={`/concepts/${sample.id}?from=${moduleId}`}>Try a free unit</Link>
      </Button>
    </div>
  );
}
