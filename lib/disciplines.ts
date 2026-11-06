import type { Discipline } from "@/lib/content/types";

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
