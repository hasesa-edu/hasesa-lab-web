import Link from "next/link";
import { Award, ChevronRight } from "lucide-react";
import type { CardState, CatalogueItem, Viewer } from "@/lib/catalogue";
import { DISCIPLINES, LEVELS } from "@/lib/disciplines";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { GoogleIcon, googleSignInHref } from "@/components/GoogleButton";
import { ModuleCover } from "./ModuleCover";
import { StartButton } from "./StartButton";
import { ProgressBar } from "./ui";

/**
 * What a viewer can do with a module right now: sign up (visitors), start,
 * continue, restart or see the certificate. Shared by the cards and the
 * module page's banner so both offer the same thing.
 */
export function ModuleAction({
  item,
  state,
  viewer,
  size = "default",
  className,
}: {
  item: Pick<CatalogueItem, "id" | "firstStepId" | "sampleId">;
  state?: CardState;
  viewer: Viewer;
  size?: "sm" | "default" | "lg";
  className?: string;
}) {
  const btn = (variant: "ink" | "outline") => cn(buttonVariants({ size, variant }), "relative z-10");

  if (viewer !== "full") {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        {viewer === "visitor" && (
          <a href={googleSignInHref(`/modules/${item.id}`)} className={btn("ink")}>
            <GoogleIcon size={14} /> Sign up to start
          </a>
        )}
        <Link href={`/concepts/${item.sampleId}?from=${item.id}`} className={btn("outline")}>
          Try a free unit
        </Link>
      </div>
    );
  }

  const status = state?.status ?? "not-started";
  if (status === "completed") {
    return state?.certificateCode ? (
      <Link href={`/certificates/${state.certificateCode}`} className={cn(btn("outline"), className)}>
        <Award aria-hidden /> Certificate
      </Link>
    ) : (
      <span className={cn("text-sm font-medium text-primary", className)}>Signed off</span>
    );
  }
  if (status === "active") {
    const pct = state && state.stepsTotal ? Math.round((state.stepsDone / state.stepsTotal) * 100) : 0;
    return (
      <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-2", className)}>
        <Link href={`/modules/${item.id}/${state?.nextStepId ?? item.firstStepId}`} className={btn("ink")}>
          {state?.stepsDone ? "Continue" : "Begin"} <ChevronRight aria-hidden />
        </Link>
        <span className="min-w-28 flex-1">
          <span className="block text-xs text-muted-foreground tabular-nums">
            {state?.stepsDone ?? 0} of {state?.stepsTotal ?? 0} steps
          </span>
          <ProgressBar pct={pct} className="mt-1" />
        </span>
      </div>
    );
  }
  return <StartButton moduleId={item.id} firstStepId={item.firstStepId} restart={status === "dropped"} size={size} className={className} />;
}

/** A module as a card: cover, title, mystery, level, length and subjects, and what you can do next. */
export function ModuleCard({ item, state, viewer, className }: { item: CatalogueItem; state?: CardState; viewer: Viewer; className?: string }) {
  return (
    <article className={cn("group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:border-foreground/25 hover:shadow-card", className)}>
      <ModuleCover id={item.id} disciplines={item.disciplines} level={item.level} />
      <div className="flex flex-1 flex-col p-4">
        <p className="font-mono text-[11px] tracking-[0.06em] text-muted-foreground uppercase">
          {item.disciplines.map((d) => DISCIPLINES[d].label).join(" · ")}
        </p>
        <h3 className="mt-1.5 font-display text-lg leading-snug font-semibold tracking-[-0.01em]">
          {/* The title's link covers the whole card; the buttons sit above it. */}
          <Link href={`/modules/${item.id}`} className="outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-3 focus-visible:after:ring-ring/50 group-hover:text-primary">
            {item.title}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.mystery}</p>
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          {LEVELS[item.level].label} · {item.stepCount} steps · ~{item.hours} h
        </p>
        <div className="mt-auto pt-4">
          <ModuleAction item={item} state={state} viewer={viewer} size="sm" />
        </div>
      </div>
    </article>
  );
}

/** Cards in a responsive grid. */
export function CardGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return <ul className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}>{children}</ul>;
}
