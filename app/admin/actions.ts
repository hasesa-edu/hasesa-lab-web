"use server";

import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/auth/admin";
import { ApiError, apiFetch } from "@/lib/api-server";

export type GrantState = { ok: boolean; message: string } | null;

const failed = (e: unknown): GrantState => {
  if (e instanceof ApiError) return { ok: false, message: e.message };
  throw e;
};

/** Admin tool: enrol a student at the Academy (or extend), after they've paid. */
export async function grantPassAction(_prev: GrantState, form: FormData): Promise<GrantState> {
  if (!(await isAdmin())) return { ok: false, message: "Not authorized." };

  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const days = Number(form.get("days"));
  const note = String(form.get("note") ?? "").trim();
  if (!email || !Number.isInteger(days) || days < 1 || days > 366) {
    return { ok: false, message: "Enter an email and a number of days between 1 and 366." };
  }
  try {
    const r = await apiFetch<{ paidUntil: string | null }>("/v1/admin/enrolments", { method: "POST", body: { email, days, note } });
    revalidatePath("/admin");
    return { ok: true, message: `Enrolled ${email} for ${days} more days. Enrolment now ends ${r.paidUntil?.slice(0, 10) ?? "?"}.` };
  } catch (e) {
    return failed(e);
  }
}

/** Admin tool: make an account the Academy's guide, or back into a student. */
export async function setRoleAction(_prev: GrantState, form: FormData): Promise<GrantState> {
  if (!(await isAdmin())) return { ok: false, message: "Not authorized." };
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const role = form.get("role") === "guide" ? "guide" : "student";
  if (!email) return { ok: false, message: "Enter an email." };
  try {
    await apiFetch("/v1/admin/roles", { method: "PUT", body: { email, role } });
  } catch (e) {
    return failed(e);
  }
  revalidatePath("/admin");
  return { ok: true, message: role === "guide" ? `${email} is now a guide.` : `${email} is now a student.` };
}
