import { NextRequest } from "next/server";
import { requireSession } from "@/lib/auth/session";
import { db, schema } from "@/lib/db/client";
import { eq } from "drizzle-orm";
import { initializeCheckout } from "@/lib/billing/chapa";
import { createPendingPayment } from "@/lib/billing/payments";
import { PLAN } from "@/lib/billing/plan";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { billingViaApi } from "@/lib/auth/hasesa-api";
import { ApiError, apiFetch } from "@/lib/api-server";

export const runtime = "nodejs";

// Starts a Chapa checkout for one 30-day pass and returns the hosted checkout URL.
export async function POST(req: NextRequest) {
  const sess = await requireSession();
  if (!sess) return Response.json({ error: "Please sign in first.", code: "signin" }, { status: 401 });

  const limit = rateLimit(`checkout:${sess.userId}:${clientIp(req)}`, 10, 10 * 60 * 1000);
  if (!limit.ok) return Response.json({ error: "Too many attempts. Please wait a few minutes." }, { status: 429 });

  if (billingViaApi()) {
    // The API starts the checkout; Chapa then reports to the API's webhook.
    try {
      const r = await apiFetch<{ checkoutUrl: string }>("/v1/billing/checkout", {
        method: "POST",
        body: { returnUrl: `${req.nextUrl.origin}/billing/return` },
      });
      return Response.json({ checkoutUrl: r.checkoutUrl });
    } catch (e) {
      if (!(e instanceof ApiError)) throw e;
      if (e.status === 401) return Response.json({ error: "Please sign in first.", code: "signin" }, { status: 401 });
      return Response.json({ error: e.message }, { status: e.status >= 500 ? 502 : e.status });
    }
  }

  const rows = await db
    .select({ email: schema.users.email, displayName: schema.users.displayName })
    .from(schema.users)
    .where(eq(schema.users.id, sess.userId))
    .limit(1);
  if (!rows.length) return Response.json({ error: "Please sign in first.", code: "signin" }, { status: 401 });

  // Send the student back to the origin they paid from (where their session
  // cookie lives); the server-to-server callback goes to the public site.
  const origin = req.nextUrl.origin;
  const site = (process.env.NEXT_PUBLIC_SITE_URL || origin).replace(/\/+$/, "");
  const txRef = await createPendingPayment(sess.userId);
  const [firstName, ...rest] = rows[0].displayName.split(/\s+/);
  const result = await initializeCheckout({
    txRef,
    amountEtb: PLAN.priceEtb,
    email: rows[0].email,
    firstName: firstName || undefined,
    lastName: rest.join(" ") || undefined,
    returnUrl: `${origin}/billing/return?tx_ref=${encodeURIComponent(txRef)}`,
    callbackUrl: `${site}/api/billing/webhook`,
  });
  if (!result.ok) return Response.json({ error: result.error }, { status: 502 });
  return Response.json({ checkoutUrl: result.checkoutUrl });
}
