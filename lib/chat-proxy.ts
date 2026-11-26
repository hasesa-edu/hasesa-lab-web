import "server-only";
import { apiBaseUrl } from "@/lib/auth/hasesa-api";
import { getSession, signedInUserId } from "@/lib/auth/session";

// The lab assistant through hasesa-api (CHAT_VIA_API). The API streams
// Server-Sent Events; the chat panel reads plain text with the conversation id
// and messages left in headers, so this turns one into the other.

type SseEvent = { event: string; data: string };

/** Split an SSE byte stream into events. */
async function* sseEvents(body: ReadableStream<Uint8Array>): AsyncGenerator<SseEvent> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let finished = false;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        finished = true;
        break;
      }
      buffer += decoder.decode(value, { stream: true }).replace(/\r\n?/g, "\n");
      let end: number;
      while ((end = buffer.indexOf("\n\n")) >= 0) {
        const block = buffer.slice(0, end);
        buffer = buffer.slice(end + 2);
        let event = "message";
        const data: string[] = [];
        for (const line of block.split("\n")) {
          if (line.startsWith("event:")) event = line.slice(6).trim();
          else if (line.startsWith("data:")) data.push(line.slice(5).replace(/^ /, ""));
        }
        if (data.length) yield { event, data: data.join("\n") };
      }
    }
  } finally {
    // Stopped early (the student left): close the API's stream too, which
    // still saves the part of the answer already written.
    if (!finished) await reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}

function jsonError(status: number, error: string, code?: string | null) {
  return Response.json(code ? { error, code } : { error }, { status });
}

const UNAVAILABLE = "The lab assistant is temporarily unavailable. Please try again.";

/** POST /api/chat through the API. `body` is the already-parsed request body. */
export async function chatViaApiResponse(body: unknown): Promise<Response> {
  const session = await getSession();
  if (!signedInUserId(session)) return jsonError(401, "Please sign in to use the lab assistant.", "signin");
  if (!session.accessToken) return jsonError(503, "Couldn't reach the server. Try again.");

  // Aborted if the student leaves, so the API stops streaming (and saves what it wrote).
  const upstream = new AbortController();
  let res: Response;
  try {
    res = await fetch(`${apiBaseUrl()}/v1/chat`, {
      signal: upstream.signal,
      method: "POST",
      headers: { "content-type": "application/json", accept: "text/event-stream", authorization: `Bearer ${session.accessToken}` },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch (e) {
    console.error("hasesa-api chat unreachable:", e);
    return jsonError(502, UNAVAILABLE);
  }
  if (!res.ok || !res.body) {
    const data = await res.json().catch(() => null);
    const detail = typeof data?.detail === "string" ? data.detail : UNAVAILABLE;
    if (res.status === 401) return jsonError(401, "Please sign in to use the lab assistant.", "signin");
    return jsonError(res.status >= 500 ? 502 : res.status, detail, res.headers.get("x-error-code"));
  }

  const events = sseEvents(res.body);
  const first = await events.next().catch(() => null);
  if (!first || first.done || first.value.event !== "meta") return jsonError(502, UNAVAILABLE);
  let meta: { conversationId: string; remaining: number };
  try {
    meta = JSON.parse(first.value.data);
  } catch {
    await events.return(undefined);
    return jsonError(502, UNAVAILABLE);
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const ev of events) {
          if (ev.event === "delta") controller.enqueue(encoder.encode(String((JSON.parse(ev.data) as { text: string }).text ?? "")));
          else if (ev.event === "error") throw new Error(String((JSON.parse(ev.data) as { error: string }).error ?? UNAVAILABLE));
          else if (ev.event === "done") break;
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
    cancel() {
      upstream.abort();
    },
  });
  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-cache",
      "x-conversation-id": meta.conversationId,
      "x-chat-remaining": String(meta.remaining),
    },
  });
}
