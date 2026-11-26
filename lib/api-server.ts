import "server-only";
import { apiBaseUrl } from "@/lib/auth/hasesa-api";
import { getSession, signedInUserId } from "@/lib/auth/session";

/** An error from hasesa-api, with a message that is safe to show to students. */
export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const UNREACHABLE = "Couldn't reach the server. Try again.";

type Options = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  /**
   * Call as the signed-in student. When the visitor is signed in but has no
   * access token (the API was down when it was due a refresh), the call fails
   * instead of quietly running signed out.
   */
  asStudent?: boolean;
};

/**
 * Call hasesa-api from the website's server. The browser never sees the
 * access token: it lives in the encrypted session cookie (kept fresh by proxy.ts).
 */
export async function apiFetch<T>(path: string, { method = "GET", body, asStudent = true }: Options = {}): Promise<T> {
  const headers: Record<string, string> = { accept: "application/json" };
  if (body !== undefined) headers["content-type"] = "application/json";
  if (asStudent) {
    const session = await getSession();
    if (signedInUserId(session)) {
      if (!session.accessToken) throw new ApiError(503, UNREACHABLE);
      headers.authorization = `Bearer ${session.accessToken}`;
    }
  }

  let res: Response;
  try {
    res = await fetch(`${apiBaseUrl()}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
  } catch (e) {
    console.error(`hasesa-api ${method} ${path} failed:`, e);
    throw new ApiError(503, UNREACHABLE);
  }
  if (res.status === 204) return undefined as T;
  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    /* keep null */
  }
  if (!res.ok) {
    // FastAPI puts the message in "detail"; validation errors (422) are a list.
    const detail = typeof data?.detail === "string" ? data.detail : res.status === 422 ? "Bad request" : null;
    if (res.status >= 500 || !detail) console.error(`hasesa-api ${method} ${path} -> ${res.status}: ${text.slice(0, 300)}`);
    throw new ApiError(res.status >= 500 ? 502 : res.status, detail ?? "Something went wrong. Try again.");
  }
  return data as T;
}

/** Answer a website API route by passing the API's answer (or its error) straight through. */
export async function forward(path: string, body: unknown): Promise<Response> {
  try {
    const data = await apiFetch<unknown>(path, { method: "POST", body });
    return Response.json(data ?? { ok: true });
  } catch (e) {
    if (e instanceof ApiError) return Response.json({ error: e.message }, { status: e.status });
    throw e;
  }
}

/** Answer a website GET route with the API's answer (or its error). */
export async function forwardGet(path: string): Promise<Response> {
  try {
    return Response.json(await apiFetch<unknown>(path));
  } catch (e) {
    if (e instanceof ApiError) return Response.json({ error: e.message }, { status: e.status });
    throw e;
  }
}

/** Turn the API's ISO date strings back into Dates, for every field ending in "At". */
export function withDates<T>(row: Record<string, unknown>): T {
  const out: Record<string, unknown> = { ...row };
  for (const [k, v] of Object.entries(out)) {
    if (k.endsWith("At") && typeof v === "string") out[k] = new Date(v);
  }
  return out as T;
}
