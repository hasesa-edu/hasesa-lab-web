import { NextRequest } from "next/server";
import { isValidWebhookSignature } from "@/lib/billing/chapa";
import { verifyAndApply } from "@/lib/billing/payments";

export const runtime = "nodejs";

// Chapa webhook (POST, signed) and callback_url (GET with ?trx_ref=). Neither
// payload is trusted on its own: both just trigger a fresh verify call to Chapa.
export async function POST(req: NextRequest) {
  const raw = await req.text();
  if (raw.length > 64 * 1024) return new Response("Payload too large", { status: 413 });
  if (!isValidWebhookSignature(raw, req.headers)) return new Response("Invalid signature", { status: 401 });

  let body: any;
  try {
    body = JSON.parse(raw);
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }
  const txRef = typeof body?.tx_ref === "string" ? body.tx_ref : null;
  // Only our own transaction references; ignore transfers and other events.
  if (!txRef || !txRef.startsWith("hl-")) return Response.json({ ok: true, ignored: true });

  const result = await verifyAndApply(txRef);
  return Response.json({ ok: true, state: result.state });
}

export async function GET(req: NextRequest) {
  const txRef = req.nextUrl.searchParams.get("trx_ref") || req.nextUrl.searchParams.get("tx_ref");
  if (!txRef || !txRef.startsWith("hl-")) return Response.json({ ok: true, ignored: true });
  const result = await verifyAndApply(txRef);
  return Response.json({ ok: true, state: result.state });
}
