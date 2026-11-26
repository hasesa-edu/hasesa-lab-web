import "server-only";
import { dashboardViaApi } from "@/lib/auth/hasesa-api";
import { apiFetch, withDates } from "@/lib/api-server";
import {
  getAttempts,
  getStudentState,
  type AssignmentRow,
  type AttemptRow,
  type EnrollmentRow,
  type FeedbackRow,
  type SignoffRow,
  type StepRow,
  type StudentState,
  type UnitRow,
} from "@/lib/progress";

// The signed-in student's own progress. With DASHBOARD_VIA_API on it comes
// from hasesa-api; if the API fails, the page still renders from the website's
// own database connection (both read the same tables until phase 7).

type Rows = Record<string, Record<string, unknown>[]>;

/** Everything about the signed-in student's progress. `userId` must be the signed-in student. */
export async function myStudentState(userId: string): Promise<StudentState> {
  if (dashboardViaApi()) {
    try {
      const r = await apiFetch<Rows>("/v1/me/progress");
      return {
        enrollments: r.enrollments.map((x) => withDates<EnrollmentRow>(x)),
        steps: r.steps.map((x) => withDates<StepRow>(x)),
        units: r.units.map((x) => withDates<UnitRow>(x)),
        signoffs: r.signoffs.map((x) => withDates<SignoffRow>(x)),
        feedback: r.feedback.map((x) => withDates<FeedbackRow>(x)),
        assignments: r.assignments.map((x) => withDates<AssignmentRow>(x)),
      };
    } catch (e) {
      console.error("progress from hasesa-api failed, reading the database instead:", e);
    }
  }
  return getStudentState(userId);
}

/** The signed-in student's answers, oldest first. `userId` must be the signed-in student. */
export async function myAttempts(userId: string, unitIds?: string[]): Promise<AttemptRow[]> {
  if (dashboardViaApi()) {
    try {
      const q = new URLSearchParams((unitIds ?? []).map((id) => ["unitId", id]));
      const rows = await apiFetch<Record<string, unknown>[]>(`/v1/me/attempts${unitIds?.length ? `?${q}` : ""}`);
      return rows.map((x) => withDates<AttemptRow>(x));
    } catch (e) {
      console.error("attempts from hasesa-api failed, reading the database instead:", e);
    }
  }
  return getAttempts(userId, unitIds);
}
