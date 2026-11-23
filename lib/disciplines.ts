import type { Discipline, Level } from "@/lib/content/types";

export const DISCIPLINES: Record<Discipline, { label: string }> = {
  physics: { label: "Physics" },
  chemistry: { label: "Chemistry" },
  biology: { label: "Biology" },
  mathematics: { label: "Maths" },
  technology: { label: "Technology" },
};

export const STATUS_LABEL = {
  "ai-draft": "Draft",
  "expert-reviewed": "Expert reviewed",
  "classroom-tested": "Classroom tested",
} as const;

/** Levels, easiest first. Beginner modules are a suggested first step, not a requirement. */
export const LEVELS: Record<Level, { label: string; blurb: string }> = {
  beginner: { label: "Beginner", blurb: "Kitchen-table materials, simple measuring and arithmetic. A good first module." },
  intermediate: { label: "Intermediate", blurb: "Longer builds, formulas to rearrange, and data to collect and graph." },
  advanced: { label: "Advanced", blurb: "Electronics, heat or stronger chemicals with a guide, and more work on your own." },
};

export const LEVEL_ORDER: Level[] = ["beginner", "intermediate", "advanced"];
