import "server-only";
import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db/client";
import { dashboardViaApi } from "@/lib/auth/hasesa-api";
import { ApiError, apiFetch, withDates } from "@/lib/api-server";

export type Certificate = { moduleId: string; signedAt: Date; note: string | null; code: string; student: string; guide: string };

export async function getCertificate(code: string): Promise<Certificate | null> {
  if (!/^[A-Z0-9]{4}-[A-Z0-9]{6}$/.test(code)) return null;
  if (dashboardViaApi()) {
    try {
      const c = await apiFetch<Record<string, unknown>>(`/v1/certificates/${code}`, { asStudent: false });
      return withDates<Certificate>(c);
    } catch (e) {
      if (e instanceof ApiError && e.status === 404) return null;
      console.error("certificate from hasesa-api failed, reading the database instead:", e);
    }
  }
  const rows = await db
    .select({
      moduleId: schema.signoffs.moduleId,
      signedAt: schema.signoffs.signedAt,
      note: schema.signoffs.note,
      code: schema.signoffs.certificateCode,
      student: schema.users.displayName,
      guideId: schema.signoffs.guideId,
    })
    .from(schema.signoffs)
    .innerJoin(schema.users, eq(schema.users.id, schema.signoffs.userId))
    .where(eq(schema.signoffs.certificateCode, code))
    .limit(1);
  const row = rows[0];
  if (!row) return null;
  const guide = await db.select({ name: schema.users.displayName }).from(schema.users).where(eq(schema.users.id, row.guideId)).limit(1);
  return { ...row, guide: guide[0]?.name ?? "Hasesa Academy guide" };
}
