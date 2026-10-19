export type Subject = "physics" | "chemistry" | "biology";
export type Grade = 9 | 10 | 11 | 12;

export const SUBJECTS: { id: Subject; label: string; emoji: string }[] = [
  { id: "physics", label: "Physics", emoji: "⚛️" },
  { id: "chemistry", label: "Chemistry", emoji: "🧪" },
  { id: "biology", label: "Biology", emoji: "🧬" },
];

export const GRADES: Grade[] = [9, 10, 11, 12];

export function subjectMeta(id: Subject) {
  return SUBJECTS.find((s) => s.id === id)!;
}

export function isSubject(v: unknown): v is Subject {
  return typeof v === "string" && SUBJECTS.some((s) => s.id === v);
}

export function isGrade(v: unknown): v is Grade {
  return typeof v === "number" && (GRADES as number[]).includes(v);
}

/** Client-safe summary of an experiment, used by the catalog, dashboard and chat picker. */
export type CatalogItem = {
  id: string;
  subject: Subject;
  grade: Grade;
  unit: string;
  title: string;
  summary: string;
  estimatedMinutes: number;
  difficulty: "easy" | "medium";
  hasVideo: boolean;
  materialsCount: number;
  /** Free sample guide anyone can read. */
  free: boolean;
};
