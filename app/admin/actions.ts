"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth/session";
import { db, schema } from "@/lib/db/client";
import { grantDays } from "@/lib/billing/payments";
import { isApiAdmin } from "@/lib/auth/admin";
import { ApiError, apiFetch } from "@/lib/api-server";

export type GrantState = { ok: boolean; message: string } | null;

/**
 * Who is acting: an admin signed in with Google (tools go through the API as
 * them), the admin password session (this site's own code), or nobody.
 */
async function adminMode(): Promise<"api" | "password" | null> {
  if (await isApiAdmin()) return "api";
  return (await getSession()).isAdmin ? "password" : null;
}

const failed = (e: unknown): GrantState => {
  if (e instanceof ApiError) return { ok: false, message: e.message };
  throw e;
};

/** Admin tool: enrol a student at the Academy (or extend), after they've paid. */
export async function grantPassAction(_prev: GrantState, form: FormData): Promise<GrantState> {
  const mode = await adminMode();
  if (!mode) return { ok: false, message: "Not authorized." };

  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const days = Number(form.get("days"));
  const note = String(form.get("note") ?? "").trim();
  if (!email || !Number.isInteger(days) || days < 1 || days > 366) {
    return { ok: false, message: "Enter an email and a number of days between 1 and 366." };
  }

  if (mode === "api") {
    try {
      const r = await apiFetch<{ paidUntil: string | null }>("/v1/admin/enrolments", { method: "POST", body: { email, days, note } });
      revalidatePath("/admin");
      return { ok: true, message: `Enrolled ${email} for ${days} more days. Enrolment now ends ${r.paidUntil?.slice(0, 10) ?? "?"}.` };
    } catch (e) {
      return failed(e);
    }
  }

  const rows = await db.select({ id: schema.users.id }).from(schema.users).where(eq(schema.users.email, email)).limit(1);
  if (!rows.length) return { ok: false, message: `No one has signed up with ${email} yet. Ask them to sign up first.` };

  const until = await grantDays(rows[0].id, days, note || "admin enrolment");
  revalidatePath("/admin");
  return { ok: true, message: `Enrolled ${email} for ${days} more days. Enrolment now ends ${until?.toISOString().slice(0, 10) ?? "?"}.` };
}

/** Admin tool: make an account the Academy's guide, or back into a student. */
export async function setRoleAction(_prev: GrantState, form: FormData): Promise<GrantState> {
  const mode = await adminMode();
  if (!mode) return { ok: false, message: "Not authorized." };
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const role = form.get("role") === "guide" ? "guide" : "student";
  if (!email) return { ok: false, message: "Enter an email." };
  if (mode === "api") {
    try {
      await apiFetch("/v1/admin/roles", { method: "PUT", body: { email, role } });
    } catch (e) {
      return failed(e);
    }
    revalidatePath("/admin");
    return { ok: true, message: role === "guide" ? `${email} is now a guide.` : `${email} is now a student.` };
  }
  const updated = await db.update(schema.users).set({ role }).where(eq(schema.users.email, email)).returning({ id: schema.users.id });
  if (!updated.length) return { ok: false, message: `No one has signed up with ${email} yet. Ask them to sign in with Google first.` };
  revalidatePath("/admin");
  return { ok: true, message: role === "guide" ? `${email} is now a guide.` : `${email} is now a student.` };
}
