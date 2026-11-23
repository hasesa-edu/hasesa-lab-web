import { cn } from "@/lib/utils";

/** The small mono label that opens each marketing section: "01 — What we're exploring". */
export function SectionLabel({ n, children, className }: { n: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase", className)}>
      {n} — {children}
    </p>
  );
}
