import { createHmac, timingSafeEqual } from "node:crypto";
import { BRAND } from "@/lib/brand";

const CHAPA_API = "https://api.chapa.co/v1";

function secretKey(): string {
  const k = process.env.CHAPA_SECRET_KEY;
  if (!k) throw new Error("CHAPA_SECRET_KEY is not set");
  return k;
}

export async function initializeCheckout(input: {
  txRef: string;
  amountEtb: number;
  email: string;
  firstName?: string;
  lastName?: string;
  returnUrl: string;
  callbackUrl: string;
}): Promise<{ ok: true; checkoutUrl: string } | { ok: false; error: string }> {
  const res = await fetch(`${CHAPA_API}/transaction/initialize`, {
    method: "POST",
    headers: { authorization: `Bearer ${secretKey()}`, "content-type": "application/json" },
    body: JSON.stringify({
      amount: String(input.amountEtb),
      currency: "ETB",
      email: input.email,
      first_name: input.firstName,
      last_name: input.lastName,
      tx_ref: input.txRef,
      return_url: input.returnUrl,
      callback_url: input.callbackUrl,
      // Chapa only allows letters, numbers, spaces, dots, hyphens and underscores here.
      customization: { title: BRAND, description: "30 day pass" },
      meta: { payment_reason: `${BRAND} 30 day pass` },
    }),
  });
  const data = await res.json().catch(() => null);
  const url = data?.data?.checkout_url;
  if (!res.ok || data?.status !== "success" || typeof url !== "string") {
    console.error("chapa initialize failed:", res.status, JSON.stringify(data?.message ?? data).slice(0, 300));
    return { ok: false, error: "Couldn't start the payment. Please try again." };
  }
  return { ok: true, checkoutUrl: url };
}

export type VerifiedTx = { status: "success" | "failed" | "pending"; amount: number; currency: string; reference: string | null };

/** Asks Chapa for the real status of a transaction. The only thing we trust to mark a payment paid. */
export async function verifyTransaction(txRef: string): Promise<VerifiedTx | null> {
  const res = await fetch(`${CHAPA_API}/transaction/verify/${encodeURIComponent(txRef)}`, {
    headers: { authorization: `Bearer ${secretKey()}` },
    cache: "no-store",
  });
  const data = await res.json().catch(() => null);
  const tx = data?.data;
  if (!res.ok || !tx) {
    // Chapa answers 4xx for references it hasn't seen paid yet.
    console.warn("chapa verify:", res.status, JSON.stringify(data?.message ?? data).slice(0, 200));
    return null;
  }
  const status = tx.status === "success" ? "success" : tx.status === "failed" ? "failed" : "pending";
  return {
    status,
    amount: Number(tx.amount),
    currency: String(tx.currency ?? ""),
    reference: typeof tx.reference === "string" ? tx.reference : null,
  };
}

function hmacHex(key: string, data: string): string {
  return createHmac("sha256", key).update(data).digest("hex");
}

function sameHex(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/**
 * Checks a webhook really came from Chapa. Chapa sends `x-chapa-signature`
 * (HMAC-SHA256 of the payload) and `chapa-signature` (HMAC-SHA256 of the
 * secret itself); one valid header is enough. The webhook secret set in the
 * Chapa dashboard is used when present, otherwise the API secret key.
 */
export function isValidWebhookSignature(rawBody: string, headers: Headers): boolean {
  const keys = [process.env.CHAPA_WEBHOOK_SECRET, process.env.CHAPA_SECRET_KEY].filter((k): k is string => !!k);
  const payloadSig = headers.get("x-chapa-signature");
  const secretSig = headers.get("chapa-signature");
  return keys.some(
    (k) => (!!payloadSig && sameHex(payloadSig, hmacHex(k, rawBody))) || (!!secretSig && sameHex(secretSig, hmacHex(k, k)))
  );
}
