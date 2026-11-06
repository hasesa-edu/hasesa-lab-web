"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { useLocale } from "@/components/LocaleProvider";
import { ArrowDown, ArrowRight, FlaskConical, SendHorizontal, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "@/components/ui/native-select";

type Msg = { role: "user" | "assistant"; content: string };

class ChatError extends Error {}

type ContextOption = { value: string; label: string; href: string; group: string };

const GENERAL_SUGGESTIONS: { emoji: string; text: string }[] = [
  { emoji: "📻", text: "How can a crystal radio play sound without a battery?" },
  { emoji: "💪", text: "How does my brain tell a muscle to move?" },
  { emoji: "🍯", text: "How can density tell real honey from fake honey?" },
];

// Wide tables scroll sideways inside the bubble instead of stretching it.
const MD_COMPONENTS = {
  table: ({ node: _node, ...props }: React.ComponentProps<"table"> & { node?: unknown }) => (
    <div className="chat-table-wrap">
      <table {...props} />
    </div>
  ),
};

function contextSuggestions(opt: ContextOption): { emoji: string; text: string }[] {
  if (opt.value.startsWith("c:")) {
    return [
      { emoji: "💡", text: `Explain "${opt.label}" in simple words, with an everyday example.` },
      { emoji: "🧩", text: "I'm stuck on one of the problems. Can you give me a hint, not the answer?" },
      { emoji: "🔗", text: "Where does this show up in real life and in my module?" },
    ];
  }
  return [
    { emoji: "💡", text: `Explain the science behind "${opt.label.replace(/^\d+\.\s*/, "")}" in simple words.` },
    { emoji: "🛠️", text: "My build isn't working the way the step says. Help me figure out why." },
    { emoji: "🔁", text: "What could I change to make this work better?" },
  ];
}

function hrefFor(value: string): string {
  if (value.startsWith("m:")) {
    const [m, s] = value.slice(2).split("/");
    return `/chat?module=${encodeURIComponent(m)}&step=${encodeURIComponent(s)}`;
  }
  if (value.startsWith("c:")) return `/chat?concept=${encodeURIComponent(value.slice(2))}`;
  return "/chat";
}

export function ChatClient({
  options,
  initialContext,
  remainingToday,
  dailyCap,
}: {
  options: ContextOption[];
  initialContext: string;
  remainingToday: number;
  dailyCap: number;
}) {
  const router = useRouter();
  const [context, setContext] = useState(initialContext);
  const selected = options.find((o) => o.value === context);
  const [remaining, setRemaining] = useState(remainingToday);
  const suggestions = selected ? contextSuggestions(selected) : GENERAL_SUGGESTIONS;
  const groups = [...new Set(options.map((o) => o.group))];

  const { locale, tr } = useLocale();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNewPill, setShowNewPill] = useState(false);
  const conversationIdRef = useRef<string | undefined>(undefined);
  const endRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef(true);

  useEffect(() => {
    function onScroll() {
      const fromBottom = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
      stickRef.current = fromBottom < 120;
      if (stickRef.current) setShowNewPill(false);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;
    if (stickRef.current) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      setShowNewPill(true);
    }
  }, [messages]);

  // Switching context starts a fresh conversation with new grounding.
  useEffect(() => {
    setMessages([]);
    setError(null);
    conversationIdRef.current = undefined;
  }, [context]);

  function pickContext(value: string) {
    setContext(value);
    router.replace(hrefFor(value), { scroll: false });
  }

  function jumpToBottom() {
    stickRef.current = true;
    setShowNewPill(false);
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  async function send(text: string) {
    if (!text.trim() || busy) return;
    setError(null);
    stickRef.current = true;
    setShowNewPill(false);
    const newMessages: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          locale,
          context: context || undefined,
          conversationId: conversationIdRef.current,
        }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        if (res.status === 429 && data?.code === "daily_cap") setRemaining(0);
        if (data?.code === "signin") {
          // Session ended mid-chat: reload so the page redirects to login.
          router.refresh();
        }
        throw new ChatError(data?.error || tr("chat.error"));
      }

      conversationIdRef.current = res.headers.get("x-conversation-id") ?? conversationIdRef.current;
      const left = res.headers.get("x-chat-remaining");
      if (left !== null && Number.isFinite(Number(left))) setRemaining(Number(left));

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
      console.error(e);
      setError(e instanceof ChatError ? e.message : tr("chat.error"));
      setMessages((m) => m.filter((msg, i, arr) => !(i === arr.length - 1 && msg.role === "assistant" && msg.content === "")));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <header className="relative overflow-hidden bg-deep text-deep-foreground">
        <div className="relative mx-auto max-w-3xl px-4 py-5 sm:py-6">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sun text-deep shadow-pop">
              <Sparkles className="size-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <h1 className="font-dial text-3xl leading-[0.95] font-extrabold sm:text-4xl">{tr("chat.title")}</h1>
              <p className="text-sm text-deep-foreground/75">{tr("chat.subtitle")}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5">
            <Label htmlFor="context-picker" className="text-xs font-semibold text-deep-foreground/80">
              <FlaskConical className="size-3.5 text-sun" aria-hidden />
              {tr("chat.pickLabel")}
            </Label>
            <NativeSelect
              id="context-picker"
              value={context}
              onChange={(e) => pickContext(e.target.value)}
              disabled={busy}
              className="w-full max-w-full sm:w-auto sm:max-w-md"
            >
              <NativeSelectOption value="">{tr("chat.pickNone")}</NativeSelectOption>
              {groups.map((g) => (
                <NativeSelectOptGroup key={g} label={g}>
                  {options
                    .filter((o) => o.group === g)
                    .map((o) => (
                      <NativeSelectOption key={o.value} value={o.value}>
                        {o.label}
                      </NativeSelectOption>
                    ))}
                </NativeSelectOptGroup>
              ))}
            </NativeSelect>
            {selected && (
              <Button
                asChild
                variant="link"
                className="px-1 text-xs text-sun underline hover:text-sun/80"
              >
                <Link href={selected.href}>
                  {tr("chat.viewExperiment")} <ArrowRight aria-hidden />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4">
      <div className="mt-6 min-h-[280px]">
        {messages.length === 0 ? (
          <div className="relative overflow-hidden rounded-[1.5rem] bg-primary-soft/40 p-5 ring-1 ring-primary/15 sm:p-7">
            <div aria-hidden className="absolute inset-0 bg-dots text-primary opacity-30" />
            <div className="relative">
              <div className="flex items-start gap-3">
                <AssistantAvatar />
                <div className="min-w-0">
                  <h2 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">{tr("chat.empty.title")}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{tr("chat.empty.body")}</p>
                </div>
              </div>
              <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => send(s.text)}
                    className="group flex min-h-12 items-start gap-3 rounded-2xl bg-card p-4 text-left text-sm text-foreground shadow-card ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-pop hover:ring-primary/40 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:flex-col"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-xl text-lg leading-none",
                        CHIP_TONES[i % CHIP_TONES.length]
                      )}
                    >
                      {s.emoji}
                    </span>
                    <span className="flex-1 leading-relaxed">{s.text}</span>
                    <ArrowRight
                      className="mt-0.5 size-4 shrink-0 text-primary opacity-60 transition group-hover:translate-x-0.5 group-hover:opacity-100 sm:hidden"
                      aria-hidden
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <ul className="space-y-4">
            {messages.map((m, i) => {
              const isUser = m.role === "user";
              const isLast = i === messages.length - 1;
              if (isUser) {
                return (
                  <li
                    key={i}
                    className="ml-auto max-w-[85%] w-fit bg-primary text-primary-foreground px-4 py-2.5 rounded-2xl rounded-br-md shadow-soft whitespace-pre-wrap"
                  >
                    {m.content}
                  </li>
                );
              }
              return (
                <li key={i} className="mr-auto flex max-w-[95%] items-start gap-2 sm:max-w-[90%]">
                  <AssistantAvatar small />
                  <div className="min-w-0 bg-card ring-1 ring-border px-4 py-3 rounded-2xl rounded-tl-md text-foreground shadow-card">
                    {m.content ? (
                      <div className="chat-prose text-foreground">
                        <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} components={MD_COMPONENTS}>
                          {m.content}
                        </ReactMarkdown>
                      </div>
                    ) : busy && isLast ? (
                      <span className="inline-flex items-center" aria-label={tr("chat.thinking")}>
                        <span className="chat-typing-dot" />
                        <span className="chat-typing-dot" />
                        <span className="chat-typing-dot" />
                      </span>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <div ref={endRef} />
      </div>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {showNewPill && (
        <Button
          type="button"
          onClick={jumpToBottom}
          className="fixed left-1/2 -translate-x-1/2 bottom-36 z-30 rounded-full shadow-pop text-xs"
          aria-label={tr("chat.newMessage")}
        >
          <ArrowDown aria-hidden />
          <span>{tr("chat.newMessage")}</span>
        </Button>
      )}

      <div className="sticky bottom-0 z-20 -mx-4 mt-6 border-t border-border/60 bg-background/90 px-4 pt-3 pb-3 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex gap-2 rounded-2xl bg-card p-1.5 shadow-card ring-1 ring-border focus-within:ring-2 focus-within:ring-primary/50"
        >
          <Input
            value={input}
            maxLength={2000}
            onChange={(e) => setInput(e.target.value)}
            placeholder={tr("chat.placeholder")}
            aria-label={tr("chat.placeholder")}
            className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent"
            disabled={busy || remaining <= 0}
          />
          <Button
            type="submit"
            disabled={busy || !input.trim() || remaining <= 0}
            className="rounded-xl px-4 font-semibold"
          >
            <SendHorizontal aria-hidden />
            <span className="sr-only sm:not-sr-only">{busy ? tr("chat.thinking") : tr("chat.send")}</span>
          </Button>
        </form>

        <p className="mt-2 text-xs text-subtle-foreground">
          <span className={remaining <= 5 ? "font-semibold text-amber-700 dark:text-amber-300" : ""}>
            {remaining > 0 ? `${remaining} of ${dailyCap} messages left today.` : `You've used all ${dailyCap} messages for today. They reset at midnight.`}
          </span>{" "}
          {tr("chat.disclaimer")}
        </p>
      </div>
      </div>
    </div>
  );
}

const CHIP_TONES = ["bg-primary-soft", "bg-sun-soft", "bg-physics-soft"];

function AssistantAvatar({ small }: { small?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-sun text-deep shadow-soft",
        small ? "mt-0.5 size-8" : "size-10"
      )}
    >
      <Sparkles className={small ? "size-4" : "size-5"} />
    </span>
  );
}
