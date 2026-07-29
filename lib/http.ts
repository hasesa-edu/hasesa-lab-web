import { NextRequest } from "next/server";

// Next.js Route Handlers have no built-in request body size limit, so a large
// payload can be streamed in to exhaust memory during parse. These helpers cap
// the body before it is fully buffered (aborting the stream past the limit) and
// then JSON-parse it.

type ReadOk = { ok: true; data: any };
type ReadErr = { ok: false; status: number; error: string };

async function readBodyLimited(
  req: NextRequest,
  maxBytes: number
): Promise<{ ok: true; text: string } | ReadErr> {
  const len = req.headers.get("content-length");
  if (len && Number.isFinite(Number(len)) && Number(len) > maxBytes) {
    return { ok: false, status: 413, error: "Payload too large" };
  }
  const reader = req.body?.getReader();
  if (!reader) return { ok: true, text: "" };

  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!value) continue;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      return { ok: false, status: 413, error: "Payload too large" };
    }
    chunks.push(value);
  }
  const buf = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    buf.set(c, offset);
    offset += c.byteLength;
  }
  return { ok: true, text: new TextDecoder().decode(buf) };
}

/**
 * Read and JSON-parse a request body, rejecting anything larger than maxBytes.
 * Returns a discriminated result so callers can respond with the right status.
 */
export async function readJsonLimited(
  req: NextRequest,
  maxBytes: number
): Promise<ReadOk | ReadErr> {
  const body = await readBodyLimited(req, maxBytes);
  if (!body.ok) return body;
  if (!body.text) return { ok: true, data: {} };
  try {
    return { ok: true, data: JSON.parse(body.text) };
  } catch {
    return { ok: false, status: 400, error: "Invalid JSON" };
  }
}

// Common body-size ceilings (bytes).
export const BODY_LIMIT = {
  small: 16 * 1024, // auth, profile, mastery, classes
  tiny: 8 * 1024, // analytics pings
  chat: 256 * 1024, // chat history array
} as const;
