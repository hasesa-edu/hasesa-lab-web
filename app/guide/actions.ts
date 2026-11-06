"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { getAccess } from "@/lib/access";
import { db, schema } from "@/lib/db/client";
import { getConcept, getModule } from "@/lib/content";

export type ActionState = { ok: boolean; message: string } | null;

async function guideId(): Promise<string | null> {
  const a = await getAccess();
  return a.level === "guide" ? a.userId : null;
}

async function studentExists(id: string): Promise<boolean> {
  const rows = await db.select({ id: schema.users.id }).from(schema.users).where(eq(schema.users.id, id)).limit(1);
  return rows.length > 0;
}

const str = (form: FormData, k: string, max = 2000) => String(form.get(k) ?? "").trim().slice(0, max);

function done(studentId: string, message: string): ActionState {
  revalidatePath(`/guide/students/${studentId}`);
  revalidatePath("/guide");
  return { ok: true, message };
}

export async function giveFeedbackAction(_prev: ActionState, form: FormData): Promise<ActionState> {
  const guide = await guideId();
  if (!guide) return { ok: false, message: "Only the guide can do this." };
  const studentId = str(form, "studentId", 100);
  const body = str(form, "body");
  const [moduleId, stepId] = str(form, "where", 200).split("/");
  if (!body) return { ok: false, message: "Write some feedback first." };
  if (!(await studentExists(studentId))) return { ok: false, message: "Student not found." };
  const m = moduleId ? getModule(moduleId) : undefined;
  const step = m && stepId ? m.steps.find((s) => s.id === stepId) : undefined;
  await db.insert(schema.guideFeedback).values({
    id: crypto.randomUUID(),
    studentId,
    guideId: guide,
    moduleId: m?.id ?? null,
    stepId: step?.id ?? null,
    body,
  });
  return done(studentId, "Feedback sent. The student sees it on their dashboard.");
}

export async function assignUnitAction(_prev: ActionState, form: FormData): Promise<ActionState> {
  const guide = await guideId();
  if (!guide) return { ok: false, message: "Only the guide can do this." };
  const studentId = str(form, "studentId", 100);
  const unitId = str(form, "unitId", 100);
  const note = str(form, "note", 500);
  if (!getConcept(unitId)) return { ok: false, message: "Pick a concept unit." };
  if (!(await studentExists(studentId))) return { ok: false, message: "Student not found." };
  await db.insert(schema.unitAssignments).values({ id: crypto.randomUUID(), studentId, unitId, note: note || null, guideId: guide });
  return done(studentId, `Assigned "${getConcept(unitId)!.title}".`);
}

export async function removeAssignmentAction(form: FormData): Promise<void> {
  const guide = await guideId();
  if (!guide) return;
  const id = str(form, "id", 100);
  const studentId = str(form, "studentId", 100);
  await db.delete(schema.unitAssignments).where(and(eq(schema.unitAssignments.id, id), eq(schema.unitAssignments.studentId, studentId)));
  done(studentId, "");
}

export async function setFlagAction(_prev: ActionState, form: FormData): Promise<ActionState> {
  const guide = await guideId();
  if (!guide) return { ok: false, message: "Only the guide can do this." };
  const studentId = str(form, "studentId", 100);
  const moduleId = str(form, "moduleId", 100);
  const flagged = form.get("flagged") === "1";
  const note = str(form, "note", 300);
  if (!getModule(moduleId)) return { ok: false, message: "Unknown module." };
  const updated = await db
    .update(schema.moduleEnrollments)
    .set({ flagged, flagNote: flagged ? note || null : null })
    .where(and(eq(schema.moduleEnrollments.userId, studentId), eq(schema.moduleEnrollments.moduleId, moduleId)))
    .returning({ userId: schema.moduleEnrollments.userId });
  if (!updated.length) return { ok: false, message: "The student hasn't started this module." };
  return done(studentId, flagged ? "Flagged." : "Flag cleared.");
}

function certificateCode(): string {
  // 10 characters without look-alikes (0/O, 1/I/L), e.g. "HX7K-MP3Q9R".
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(10));
  const s = [...bytes].map((b) => alphabet[b % alphabet.length]).join("");
  return `${s.slice(0, 4)}-${s.slice(4)}`;
}

export async function signOffAction(_prev: ActionState, form: FormData): Promise<ActionState> {
  const guide = await guideId();
  if (!guide) return { ok: false, message: "Only the guide can do this." };
  const studentId = str(form, "studentId", 100);
  const m = getModule(str(form, "moduleId", 100));
  if (!m) return { ok: false, message: "Unknown module." };
  if (!(await studentExists(studentId))) return { ok: false, message: "Student not found." };
  const checks = form.getAll("check").map(String);
  const missing = m.signoff.filter((s) => !checks.includes(s.id));
  if (missing.length) return { ok: false, message: `Tick every item before signing off (${missing.length} left).` };

  const now = new Date();
  await db
    .insert(schema.signoffs)
    .values({ userId: studentId, moduleId: m.id, checks: m.signoff.map((s) => s.id), note: str(form, "note", 1000) || null, guideId: guide, signedAt: now, certificateCode: certificateCode() })
    .onConflictDoNothing();
  await db
    .insert(schema.moduleEnrollments)
    .values({ userId: studentId, moduleId: m.id, status: "completed", startedAt: now, updatedAt: now, completedAt: now })
    .onConflictDoUpdate({
      target: [schema.moduleEnrollments.userId, schema.moduleEnrollments.moduleId],
      set: { status: "completed", completedAt: now, updatedAt: now, flagged: false, flagNote: null },
    });
  return done(studentId, `Signed off ${m.title}. The certificate is ready.`);
}

export async function undoSignOffAction(form: FormData): Promise<void> {
  const guide = await guideId();
  if (!guide) return;
  const studentId = str(form, "studentId", 100);
  const moduleId = str(form, "moduleId", 100);
  await db.delete(schema.signoffs).where(and(eq(schema.signoffs.userId, studentId), eq(schema.signoffs.moduleId, moduleId)));
  await db
    .update(schema.moduleEnrollments)
    .set({ status: "active", completedAt: null, updatedAt: new Date() })
    .where(and(eq(schema.moduleEnrollments.userId, studentId), eq(schema.moduleEnrollments.moduleId, moduleId)));
  done(studentId, "");
}
