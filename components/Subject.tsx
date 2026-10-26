import { Atom, Dna, FlaskConical, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { subjectMeta, type Subject } from "@/lib/subjects";

const ICONS: Record<Subject, LucideIcon> = {
  physics: Atom,
  chemistry: FlaskConical,
  biology: Dna,
};

/** Tailwind classes for each subject's color. Use these instead of hard-coding colors. */
export const SUBJECT_STYLES: Record<Subject, { text: string; bg: string; soft: string; ring: string; border: string }> = {
  physics: { text: "text-physics", bg: "bg-physics", soft: "bg-physics-soft", ring: "ring-physics/30", border: "border-physics" },
  chemistry: { text: "text-chemistry", bg: "bg-chemistry", soft: "bg-chemistry-soft", ring: "ring-chemistry/30", border: "border-chemistry" },
  biology: { text: "text-biology", bg: "bg-biology", soft: "bg-biology-soft", ring: "ring-biology/30", border: "border-biology" },
};

export function SubjectIcon({ subject, className }: { subject: Subject; className?: string }) {
  const Icon = ICONS[subject];
  return <Icon aria-hidden className={className} />;
}

/** Rounded tile with the subject's icon on its soft color. */
export function SubjectTile({ subject, size = "md", className }: { subject: Subject; size?: "sm" | "md" | "lg"; className?: string }) {
  const s = SUBJECT_STYLES[subject];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-xl",
        s.soft,
        s.text,
        size === "sm" && "size-8 [&_svg]:size-4",
        size === "md" && "size-10 [&_svg]:size-5",
        size === "lg" && "size-14 rounded-2xl [&_svg]:size-7",
        className
      )}
    >
      <SubjectIcon subject={subject} />
    </span>
  );
}

/** Small colored label: icon + subject name. */
export function SubjectLabel({ subject, className }: { subject: Subject; className?: string }) {
  const s = SUBJECT_STYLES[subject];
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide", s.text, className)}>
      <SubjectIcon subject={subject} className="size-3.5" />
      {subjectMeta(subject).label}
    </span>
  );
}
