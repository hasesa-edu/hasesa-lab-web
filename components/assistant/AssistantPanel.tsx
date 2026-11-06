"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { NotebookPen, Quote, SendHorizontal, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NotebookPane, type NotebookProps } from "@/components/module/NotebookPane";

type Msg = { role: "user" | "assistant"; content: string };
type Tab = "notebook" | "assistant";
type OpenDetail = { tab?: Tab; quote?: string; prompt?: string };

/** Open the workbench panel from anywhere on the page: a tab, and optionally a quote or a question to start with. */
export function openWorkbench(detail: OpenDetail = {}) {
  window.dispatchEvent(new CustomEvent("hasesa:ask", { detail }));
}

/** Open the lab assistant tab. */
export function openAssistant(detail: { quote?: string; prompt?: string } = {}) {
  openWorkbench({ ...detail, tab: "assistant" });
}

// Wide tables scroll sideways inside the bubble instead of stretching it.
const MD_COMPONENTS = {
  table: ({ node: _node, ...props }: React.ComponentProps<"table"> & { node?: unknown }) => (
    <div className="chat-table-wrap">
      <table {...props} />
    </div>
  ),
};

const PANEL_W = 420;
const DESKTOP = "(min-width: 1024px)";

/**
 * The workbench panel on course pages: the lab notebook (on steps) and the lab
 * assistant, as two tabs of one panel. On desktop it docks on the right and the
 * page shifts over; on phones it is a bottom sheet.
 *
 * The assistant tab: the page passes its context ("m:radio/antenna",
 * "c:density", "m:radio"), so it already knows where the student is and what
 * they've done there. One thread per page. Selecting text in the page's
 * [data-ask-scope] offers "Ask about this".
 */
export function AssistantPanel({
  context,
  about,
  suggestions,
  notebook,
}: {
  context: string;
  about: string;
  suggestions: string[];
  /** On step pages: the step's lab notebook, shown as a second tab. */
  notebook?: NotebookProps;
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("assistant");
  const [loaded, setLoaded] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [quote, setQuote] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [cap, setCap] = useState(30);
  const conversationId = useRef<string | undefined>(undefined);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [selection, setSelection] = useState<{ text: string; x: number; y: number } | null>(null);

  // Load this page's thread the first time the panel opens.
  useEffect(() => {
    if (!open || tab !== "assistant" || loaded) return;
    setLoaded(true);
    fetch(`/api/chat/thread?context=${encodeURIComponent(context)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) return setError(d.error);
        conversationId.current = d.conversationId ?? undefined;
        setMessages(d.messages ?? []);
        setRemaining(d.remaining);
        setCap(d.cap);
      })
      .catch(() => setError("Couldn't load the assistant. Try again."));
  }, [open, tab, loaded, context]);

  // Dock on desktop: make room on the right so the page and the chat sit side by side.
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    const apply = () => {
      document.body.style.paddingRight = open && mq.matches ? `${PANEL_W}px` : "";
    };
    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      document.body.style.paddingRight = "";
    };
  }, [open]);

  // Opened from elsewhere on the page.
  useEffect(() => {
    function onAsk(e: Event) {
      const d = (e as CustomEvent<OpenDetail>).detail ?? {};
      if (d.quote) setQuote(d.quote);
      if (d.prompt) setInput(d.prompt);
      setTab(d.tab === "notebook" && notebook ? "notebook" : "assistant");
      setOpen(true);
    }
    window.addEventListener("hasesa:ask", onAsk);
    return () => window.removeEventListener("hasesa:ask", onAsk);
  }, [notebook]);

  useEffect(() => {
    if (open && tab === "assistant") setTimeout(() => inputRef.current?.focus(), 50);
  }, [open, quote, tab]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  // "Ask about this": offer to quote text the student selects in the page.
  useEffect(() => {
    function onUp() {
      setTimeout(() => {
        const sel = window.getSelection();
        const text = sel?.toString().trim() ?? "";
        const scope = sel?.anchorNode ? (sel.anchorNode.nodeType === 1 ? (sel.anchorNode as Element) : sel.anchorNode.parentElement) : null;
        if (!sel || sel.isCollapsed || text.length < 3 || !scope?.closest("[data-ask-scope]")) return setSelection(null);
        const rect = sel.getRangeAt(0).getBoundingClientRect();
        setSelection({ text: text.slice(0, 600), x: rect.left + rect.width / 2, y: rect.top });
      }, 0);
    }
    const clear = () => setSelection(null);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchend", onUp);
    window.addEventListener("scroll", clear, { passive: true });
    return () => {
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchend", onUp);
      window.removeEventListener("scroll", clear);
    };
  }, []);

  const send = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || busy) return;
      const content = quote ? `> ${quote.replace(/\n+/g, " ")}\n\n${question}` : question;
      const next: Msg[] = [...messages, { role: "user", content }];
      setMessages(next);
      setInput("");
      setQuote(null);
      setError(null);
      setBusy(true);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: next.slice(-20), locale: "en", context, conversationId: conversationId.current }),
        });
        if (!res.ok || !res.body) {
          const d = await res.json().catch(() => null);
          if (res.status === 429 && d?.code === "daily_cap") setRemaining(0);
          throw new Error(d?.error || "Couldn't reach the lab assistant. Try again.");
        }
        conversationId.current = res.headers.get("x-conversation-id") ?? conversationId.current;
        const left = res.headers.get("x-chat-remaining");
        if (left !== null) setRemaining(Number(left));
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        setMessages((m) => [...m, { role: "assistant", content: "" }]);
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setMessages((m) => {
            const copy = m.slice();
            copy[copy.length - 1] = { role: "assistant", content: acc };
            return copy;
          });
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Couldn't reach the lab assistant. Try again.");
        setMessages((m) => m.filter((msg, i, arr) => !(i === arr.length - 1 && msg.role === "assistant" && !msg.content)));
      } finally {
        setBusy(false);
      }
    },
    [busy, messages, quote, context]
  );

  const out = remaining === 0;

  return (
    <>
      {selection && !busy && (
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            setQuote(selection.text);
            setSelection(null);
            setTab("assistant");
            setOpen(true);
            window.getSelection()?.removeAllRanges();
          }}
          className="fixed z-40 inline-flex -translate-x-1/2 -translate-y-full items-center gap-1.5 rounded-full bg-enamel px-3 py-1.5 text-sm font-bold text-white shadow-pop"
          style={{ left: selection.x, top: selection.y - 8 }}
        >
          <Sparkles aria-hidden className="size-4 text-sun" /> Ask about this
        </button>
      )}

      {/* Room at the end of the page so the phone launcher bar never covers content. */}
      <div aria-hidden className="h-20 lg:hidden" />
      {!open && (
        // Phones: a bar across the bottom. Desktop: a pair of buttons bottom-right.
        <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-ink/10 bg-lab/95 p-3 backdrop-blur lg:inset-x-auto lg:right-4 lg:bottom-4 lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
          {notebook && (
            <button
              type="button"
              onClick={() => {
                setTab("notebook");
                setOpen(true);
              }}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-white px-5 font-bold text-ink shadow-pop ring-1 ring-ink/15 outline-none hover:ring-signal focus-visible:ring-3 focus-visible:ring-signal/50 lg:flex-none"
            >
              <NotebookPen aria-hidden className="size-5 text-primary" /> Notebook
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setTab("assistant");
              setOpen(true);
            }}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-enamel px-5 font-bold text-white shadow-pop ring-1 ring-white/10 outline-none hover:bg-enamel/90 focus-visible:ring-3 focus-visible:ring-sun/60 lg:flex-none"
          >
            <Sparkles aria-hidden className="size-5 text-sun" /> {notebook ? "Ask" : "Ask the lab assistant"}
          </button>
        </div>
      )}

      {open && (
        <>
          {/* Phones: dim the page behind the sheet. */}
          <div aria-hidden className="fixed inset-0 z-30 bg-ink/30 lg:hidden" onClick={() => setOpen(false)} />
          <aside
            role="dialog"
            aria-label="Lab assistant"
            className={cn(
              "fixed z-40 flex flex-col bg-white shadow-pop dark:bg-card",
              "inset-x-0 bottom-0 h-[85svh] rounded-t-2xl",
              "lg:inset-x-auto lg:top-0 lg:right-0 lg:h-auto lg:w-[420px] lg:rounded-none lg:border-l lg:border-ink/10"
            )}
          >
            <div className="flex shrink-0 items-start gap-3 bg-enamel px-5 pt-4 text-enamel-foreground lg:min-h-[61px]">
              <div className="min-w-0 flex-1">
                {notebook ? (
                  <div role="tablist" aria-label="Workbench" className="flex gap-1">
                    {(["notebook", "assistant"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        role="tab"
                        aria-selected={tab === t}
                        onClick={() => setTab(t)}
                        className={cn(
                          "relative pb-3 font-dial text-2xl leading-none font-bold transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:rounded-full after:bg-signal",
                          tab === t ? "text-white after:scale-x-100" : "text-enamel-foreground/55 after:scale-x-0 hover:text-white"
                        )}
                      >
                        <span className="mr-4">{t === "notebook" ? "Notebook" : "Lab assistant"}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="pb-1 font-dial text-2xl leading-none font-bold text-white">Lab assistant</p>
                )}
                {(!notebook || tab === "assistant") && (
                  <p className="truncate pb-3 text-sm text-enamel-foreground/75">Knows you&apos;re on {about}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close the lab assistant"
                className="inline-flex size-9 items-center justify-center rounded-full text-enamel-foreground/80 hover:bg-white/10 hover:text-white"
              >
                <X aria-hidden className="size-5" />
              </button>
            </div>

            {notebook && tab === "notebook" ? (
              <div className="min-h-0 flex-1">
                <NotebookPane {...notebook} />
              </div>
            ) : (
            <>
            <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
              {messages.length === 0 ? (
                <div>
                  <p className="text-ink/75">
                    Ask about anything on this page. I can see where you are and what you&apos;ve done here, and I&apos;ll give hints, not answers.
                  </p>
                  <ul className="mt-4 space-y-2">
                    {suggestions.map((s) => (
                      <li key={s}>
                        <button
                          type="button"
                          disabled={busy || out || remaining === null}
                          onClick={() => void send(s)}
                          className="w-full rounded-xl border-2 border-ink/10 px-3.5 py-2.5 text-left text-sm hover:border-signal disabled:opacity-60"
                        >
                          {s}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <ul className="space-y-4">
                  {messages.map((m, i) =>
                    m.role === "user" ? (
                      <li key={i} className="ml-auto w-fit max-w-[88%] rounded-2xl rounded-br-md bg-enamel px-4 py-2.5 text-white">
                        <div className="chat-prose text-white [&_blockquote]:border-sun/60 [&_blockquote]:text-white/80">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                        </div>
                      </li>
                    ) : (
                      <li key={i} className="max-w-[95%] rounded-2xl rounded-tl-md bg-lab px-4 py-3">
                        {m.content ? (
                          <div className="chat-prose text-ink">
                            <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} components={MD_COMPONENTS}>
                              {m.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <span className="inline-flex items-center" aria-label="Thinking">
                            <span className="chat-typing-dot" />
                            <span className="chat-typing-dot" />
                            <span className="chat-typing-dot" />
                          </span>
                        )}
                      </li>
                    )
                  )}
                </ul>
              )}
              {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            </div>

            <form
              className="shrink-0 border-t border-ink/10 p-3"
              onSubmit={(e) => {
                e.preventDefault();
                void send(input);
              }}
            >
              {quote && (
                <div className="mb-2 flex items-start gap-2 rounded-lg bg-sun-soft px-3 py-2 text-sm">
                  <Quote aria-hidden className="mt-0.5 size-4 shrink-0 text-chemistry" />
                  <span className="line-clamp-3 flex-1 text-ink/80">{quote}</span>
                  <button type="button" onClick={() => setQuote(null)} aria-label="Remove quote" className="text-ink/50 hover:text-ink">
                    <X aria-hidden className="size-4" />
                  </button>
                </div>
              )}
              <div className="flex items-end gap-2 rounded-2xl border-2 border-ink/15 bg-white p-1.5 focus-within:border-signal">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void send(input);
                    }
                  }}
                  rows={1}
                  maxLength={2000}
                  disabled={out}
                  placeholder={quote ? "What do you want to know about this?" : "Ask a question"}
                  aria-label="Your question"
                  className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2.5 py-2 text-[0.95rem] outline-none [field-sizing:content]"
                />
                <Button type="submit" size="icon" disabled={busy || out || !input.trim()} aria-label="Send" className="size-10 rounded-xl">
                  <SendHorizontal aria-hidden />
                </Button>
              </div>
              <p className="mt-1.5 px-1 text-xs text-ink/55">
                {remaining === null
                  ? "AI can make mistakes. Follow the safety notes and your guide."
                  : out
                    ? `You've used all ${cap} messages for today. They reset at midnight.`
                    : `${remaining} of ${cap} messages left today. AI can make mistakes; follow the safety notes.`}
              </p>
            </form>
            </>
            )}
          </aside>
        </>
      )}
    </>
  );
}
