"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth/session";
import { db, schema } from "@/lib/db/client";
import { grantDays } from "@/lib/billing/payments";

export type GrantState = { ok: boolean; message: string } | null;

/** Admin tool: add days to a student's pass (comps, or fixing a payment Chapa confirmed late). */
export async function grantPassAction(_prev: GrantState, form: FormData): Promise<GrantState> {
  const session = await getSession();
  if (!session.isAdmin) return { ok: false, message: "Not authorized." };

  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const days = Number(form.get("days"));
  const note = String(form.get("note") ?? "").trim();
  if (!email || !Number.isInteger(days) || days < 1 || days > 366) {
    return { ok: false, message: "Enter an email and a number of days between 1 and 366." };
  }

  const rows = await db.select({ id: schema.users.id }).from(schema.users).where(eq(schema.users.email, email)).limit(1);
  if (!rows.length) return { ok: false, message: `No student signed in with ${email} yet.` };

  const until = await grantDays(rows[0].id, days, note || "admin grant");
  revalidatePath("/admin");
  return { ok: true, message: `Added ${days} days to ${email}. Pass now ends ${until?.toISOString().slice(0, 10) ?? "?"}.` };
}
