import Link from "next/link";
import { Clapperboard, Lock, Sparkles, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { STATUS_LABEL } from "@/lib/disciplines";
import { CONTACT_EMAIL } from "@/lib/brand";
import type { ContentStatus, StepKind, Video } from "@/lib/content/types";
import { Button } from "@/components/ui/button";
import { GoogleIcon, googleSignInHref } from "@/components/GoogleButton";

/**
 * Section headings: Geist, semibold, tightly tracked. `icon` is still accepted from
 * older call sites but no longer drawn: icon tiles beside every heading read
 * as template chrome.
 */
export function SectionTitle({ children, className }: { icon?: LucideIcon; children: React.ReactNode; className?: string }) {
  return <h2 className={cn("text-2xl leading-tight font-semibold text-foreground sm:text-3xl", className)}>{children}</h2>;
}

export function ProgressBar({ pct, className }: { pct: number; className?: string }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-1 overflow-hidden rounded-full bg-border", className)}
    >
      <div
        className={cn("h-full rounded-full transition-[width] duration-500", pct >= 100 ? "bg-emerald-500" : "bg-primary")}
        style={{ width: `${Math.min(100, pct)}%` }}
      />
    </div>
  );
}

/** One quiet line saying whether content has been checked by a subject expert. */
export function StatusBadge({ status, className }: { status: ContentStatus; className?: string }) {
  const draft = status === "ai-draft";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-sm text-muted-foreground",
        className
      )}
    >
      <span aria-hidden className={cn("size-2 rounded-full", draft ? "bg-sun" : "bg-primary")} />
      {draft ? "Draft: being checked by subject experts" : STATUS_LABEL[status]}
    </span>
  );
}

export const KIND_LABEL: Record<StepKind, string> = {
  hook: "The mystery",
  investigate: "Investigate",
  build: "Build",
  finish: "Finish",
};

export function HeaderChip({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <span className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground">
      <Icon aria-hidden className="size-4 shrink-0 text-muted-foreground" />
      {children}
    </span>
  );
}

export function VideoEmbed({ video, title }: { video?: Video; title: string }) {
  const frame = "relative aspect-video overflow-hidden rounded-md bg-black";
  let inner: React.ReactNode;
  if (video?.src) {
    inner = (
      <div className={frame}>
        <video src={video.src} controls preload="metadata" playsInline className="absolute inset-0 h-full w-full" />
      </div>
    );
  } else if (video?.youtubeId) {
    inner = (
      <div className={frame}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
          title={title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  } else {
    inner = (
      <div className="relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-md bg-muted px-6 text-center">
        <span className="relative inline-flex size-12 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground">
          <Clapperboard aria-hidden className="size-6" />
        </span>
        <p className="relative mt-3 text-xl font-semibold">Video coming soon</p>
        <p className="relative mt-1 max-w-sm text-sm text-muted-foreground">We&apos;re recording this at the Academy.</p>
      </div>
    );
  }
  return (
    <div className="rounded-lg border border-border bg-card p-1.5 sm:p-2">
      {inner}
      {video?.credit && <p className="px-2 pt-2 font-mono text-[11px] text-muted-foreground">Video by {video.credit}</p>}
    </div>
  );
}

/**
 * Shown where enrolled-only content would be. Signed-out visitors are asked to
 * sign up; signed-up students are told how to enrol.
 */
export function EnrolCard({ signedIn, next, className }: { signedIn: boolean; next?: string; className?: string }) {
  return (
    <div className={cn("rounded-lg border border-border bg-accent p-6 sm:p-8", className)}>
      <div>
        <span className="inline-flex size-10 items-center justify-center rounded-lg bg-foreground text-background">
          <Lock aria-hidden className="size-5" />
        </span>
        <h2 className="mt-4 text-2xl font-semibold">
          {signedIn ? "Your access isn't active" : "Sign up free to unlock everything"}
        </h2>
        <p className="mt-2 max-w-xl text-foreground/75">
          {signedIn
            ? "Contact us and we'll open it."
            : "During the pilot, signing up opens every step, every concept unit and its problems, the lab assistant, a guide who tracks your progress, and a certificate for each finished module."}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {!signedIn && (
            <Button asChild size="lg" variant="ink">
              <a href={googleSignInHref(next ?? null)}>
                <GoogleIcon size={16} /> Sign up with Google
              </a>
            </Button>
          )}
          {signedIn && CONTACT_EMAIL && (
            <Button asChild size="lg" variant="ink">
              <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Opening my Hasesa Academy access")}`}>
                <Sparkles aria-hidden /> Contact us
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function UnitStatusPill({ status }: { status?: "started" | "completed" | "tested_out" }) {
  if (!status) return null;
  const map = {
    started: { label: "In progress", cls: "border border-input text-foreground" },
    completed: { label: "Completed", cls: "bg-accent text-accent-foreground" },
    tested_out: { label: "Tested out", cls: "bg-accent text-accent-foreground" },
  } as const;
  const m = map[status];
  return <span className={cn("inline-flex h-6 shrink-0 items-center rounded-full px-2.5 font-mono text-[11px] tracking-[0.06em] uppercase", m.cls)}>{m.label}</span>;
}

export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-10 items-center rounded-md text-sm font-medium text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/40"
    >
      {children}
    </Link>
  );
}
