import { cn } from "@/lib/utils";

/** Mono status tag: teal for something being tested or running, amber outline for an open question. */
export function StatusTag({ tone, children }: { tone: "teal" | "open"; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 w-fit shrink-0 items-center gap-1.5 rounded-full px-2.5 font-mono text-[11px] tracking-[0.08em] uppercase",
        tone === "teal" ? "bg-accent text-accent-foreground" : "border border-sun/60 text-sun-strong"
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", tone === "teal" ? "bg-primary" : "bg-sun")} />
      {children}
    </span>
  );
}
