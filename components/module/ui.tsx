import Link from "next/link";
import { Clapperboard, Lock, Sparkles, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { STATUS_LABEL } from "@/lib/disciplines";
import { CONTACT_EMAIL } from "@/lib/brand";
import type { ContentStatus, StepKind, Video } from "@/lib/content/types";
import { Button } from "@/components/ui/button";
import { GoogleIcon, googleSignInHref } from "@/components/GoogleButton";

export function SectionTitle({ icon: Icon, children, className }: { icon: LucideIcon; children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn("flex items-center gap-2.5 text-xl font-bold tracking-tight text-foreground sm:text-2xl", className)}>
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-strong dark:text-primary">
        <Icon aria-hidden className="size-5" />
      </span>
      {children}
    </h2>
  );
}

export function ProgressBar({ pct, className }: { pct: number; className?: string }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-2 overflow-hidden rounded-full bg-muted", className)}
    >
      <div
        className={cn("h-full rounded-full transition-[width] duration-500", pct >= 100 ? "bg-emerald-500" : "bg-primary")}
        style={{ width: `${Math.min(100, pct)}%` }}
      />
    </div>
  );
}

/** Shows whether content has been checked by an expert. Drafts get a quiet amber badge. */
export function StatusBadge({ status, className, onDark }: { status: ContentStatus; className?: string; onDark?: boolean }) {
  return (
    <span
      title={status === "ai-draft" ? "Written with AI and not yet checked by a subject expert." : undefined}
      className={cn(
        "inline-flex h-6 items-center rounded-full px-2.5 text-xs font-semibold",
        status === "ai-draft"
          ? onDark
            ? "bg-white/10 text-sun ring-1 ring-sun/40"
            : "bg-sun-soft text-amber-800 dark:text-sun"
          : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
        className
      )}
    >
      {STATUS_LABEL[status]}
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
    <span className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm text-deep-foreground ring-1 ring-white/15">
      <Icon aria-hidden className="size-4 shrink-0 text-sun" />
      {children}
    </span>
  );
}

export function VideoEmbed({ video, title }: { video?: Video; title: string }) {
  const frame = "relative aspect-video overflow-hidden rounded-xl bg-black";
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
      <div className="relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-xl bg-deep px-6 text-center text-deep-foreground">
        <div aria-hidden className="absolute inset-0 bg-grid text-primary-soft opacity-40" />
        <span className="relative inline-flex size-12 items-center justify-center rounded-2xl bg-sun text-deep">
          <Clapperboard aria-hidden className="size-6" />
        </span>
        <p className="relative mt-3 font-heading text-lg font-bold">Video coming soon</p>
        <p className="relative mt-1 max-w-sm text-sm text-deep-foreground/75">We&apos;re recording this at the Academy.</p>
      </div>
    );
  }
  return (
    <div className="rounded-[1.25rem] bg-card p-1.5 shadow-pop ring-1 ring-border sm:p-2">
      {inner}
      {video?.credit && <p className="px-2 pt-2 text-xs text-subtle-foreground">Video by {video.credit}</p>}
    </div>
  );
}

/**
 * Shown where enrolled-only content would be. Signed-out visitors are asked to
 * sign up; signed-up students are told how to enrol.
 */
export function EnrolCard({ signedIn, next, className }: { signedIn: boolean; next?: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[1.5rem] bg-deep p-6 text-deep-foreground shadow-pop sm:p-8", className)}>
      <div aria-hidden className="absolute inset-0 bg-grid text-primary-soft opacity-40" />
      <div aria-hidden className="absolute -top-16 -right-16 size-48 rounded-full bg-primary/40 blur-3xl" />
      <div className="relative">
        <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-sun text-deep">
          <Lock aria-hidden className="size-5" />
        </span>
        <h2 className="mt-4 text-2xl font-extrabold tracking-tight">
          {signedIn ? "Enrol at the Academy to unlock everything" : "Sign up, then enrol at the Academy"}
        </h2>
        <p className="mt-2 max-w-xl text-deep-foreground/80">
          Enrolled students get every step, every concept unit and its problems, the lab assistant, a guide who tracks their
          progress, and a certificate for each finished module.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {!signedIn && (
            <Button asChild size="lg" className="bg-white font-semibold text-[#1f1f1f] hover:bg-white/90">
              <a href={googleSignInHref(next ?? null)}>
                <GoogleIcon size={16} /> Sign up with Google
              </a>
            </Button>
          )}
          {CONTACT_EMAIL && (
            <Button asChild size="lg" variant={signedIn ? "default" : "outline"} className={cn("font-semibold", !signedIn && "border-white/30 bg-transparent text-deep-foreground hover:bg-white/10 hover:text-deep-foreground")}>
              <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Enrolling at Hasesa Academy")}`}>
                <Sparkles aria-hidden /> Contact us to enrol
              </a>
            </Button>
          )}
        </div>
        {signedIn && (
          <p className="mt-4 text-sm text-deep-foreground/70">
            Already paid? Your access opens as soon as the Academy marks you enrolled. Refresh this page after that.
          </p>
        )}
      </div>
    </div>
  );
}

export function UnitStatusPill({ status }: { status?: "started" | "completed" | "tested_out" }) {
  if (!status) return null;
  const map = {
    started: { label: "In progress", cls: "bg-primary-soft text-primary-strong dark:text-primary" },
    completed: { label: "Completed", cls: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300" },
    tested_out: { label: "Tested out", cls: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300" },
  } as const;
  const m = map[status];
  return <span className={cn("inline-flex h-6 shrink-0 items-center rounded-full px-2.5 text-xs font-semibold", m.cls)}>{m.label}</span>;
}

export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-10 items-center rounded-full text-sm font-medium text-deep-foreground/75 outline-none hover:text-deep-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {children}
    </Link>
  );
}
