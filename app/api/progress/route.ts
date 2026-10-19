import { NextRequest } from "next/server";
import { requireSession } from "@/lib/auth/session";
import { db, schema } from "@/lib/db/client";
import { and, eq } from "drizzle-orm";
import { getExperiment } from "@/lib/experiments";
import { readJsonLimited, BODY_LIMIT } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_OBSERVATIONS = 4000;

// GET /api/progress → { progress: { experimentId, status, observations, updatedAt, completedAt }[] }
export async function GET() {
  const sess = await requireSession();
  if (!sess) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const rows = await db
    .select()
    .from(schema.experimentProgress)
    .where(eq(schema.experimentProgress.userId, sess.userId));

  const progress = rows
    .filter((r) => getExperiment(r.experimentId))
    .map((r) => ({
      experimentId: r.experimentId,
      status: r.status,
      observations: r.observations,
      updatedAt: r.updatedAt.toISOString(),
      completedAt: r.completedAt?.toISOString() ?? null,
    }));
  return Response.json({ progress });
}

// POST /api/progress
//   body: { experimentId, status?: "started" | "done", observations?: string }
export async function POST(req: NextRequest) {
  const sess = await requireSession();
  if (!sess) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const limit = rateLimit(`progress:${sess.userId}`, 60, 5 * 60 * 1000);
  if (!limit.ok) {
    return Response.json(
      { error: "Too many requests. Try again later." },
      { status: 429, headers: { "retry-after": String(limit.retryAfter) } }
    );
  }

  const parsed = await readJsonLimited(req, BODY_LIMIT.small);
  if (!parsed.ok) return Response.json({ error: parsed.error }, { status: parsed.status });
  const { experimentId, status, observations } = parsed.data ?? {};

  if (typeof experimentId !== "string" || !getExperiment(experimentId)) {
    return Response.json({ error: "Unknown experiment" }, { status: 400 });
  }
  if (status !== undefined && status !== "started" && status !== "done") {
    return Response.json({ error: "Bad status" }, { status: 400 });
  }
  if (observations !== undefined && typeof observations !== "string") {
    return Response.json({ error: "Bad observations" }, { status: 400 });
  }

  const [existing] = await db
    .select()
    .from(schema.experimentProgress)
    .where(
      and(
        eq(schema.experimentProgress.userId, sess.userId),
        eq(schema.experimentProgress.experimentId, experimentId)
      )
    )
    .limit(1);

  const nextStatus: "started" | "done" = status ?? existing?.status ?? "started";
  const nextObservations =
    observations !== undefined ? observations.trim().slice(0, MAX_OBSERVATIONS) || null : existing?.observations ?? null;
  const now = new Date();
  const completedAt = nextStatus === "done" ? existing?.completedAt ?? now : null;

  await db
    .insert(schema.experimentProgress)
    .values({
      userId: sess.userId,
      experimentId,
      status: nextStatus,
      observations: nextObservations,
      updatedAt: now,
      completedAt,
    })
    .onConflictDoUpdate({
      target: [schema.experimentProgress.userId, schema.experimentProgress.experimentId],
      set: { status: nextStatus, observations: nextObservations, updatedAt: now, completedAt },
    });

  return Response.json({
    progress: {
      experimentId,
      status: nextStatus,
      observations: nextObservations,
      updatedAt: now.toISOString(),
      completedAt: completedAt?.toISOString() ?? null,
    },
  });
}
