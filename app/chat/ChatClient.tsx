"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { useLocale } from "@/components/LocaleProvider";
import type { CatalogItem } from "@/lib/subjects";
import { ArrowDown, ArrowRight, FlaskConical, SendHorizontal, Sparkles } from "lucide-react";
import { SubjectIcon } from "@/components/Subject";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

type Msg = { role: "user" | "assistant"; content: string };

class ChatError extends Error {}

const GENERAL_SUGGESTIONS: { emoji: string; text: string }[] = [
  { emoji: "🍓", text: "My strawberry DNA isn't clumping. What could have gone wrong?" },
  { emoji: "🔋", text: "Why does a lemon battery need two different metals?" },
  { emoji: "🧪", text: "What household things can I safely use as a pH indicator?" },
];

function experimentSuggestions(title: string): { emoji: string; text: string }[] {
  return [
    { emoji: "💡", text: `Explain the science behind "${title}" in simple words.` },
    { emoji: "🛠️", text: "My result doesn't match what the guide says. Help me figure out why." },
    { emoji: "🔁", text: "What could I change to turn this into my own fair test?" },
  ];
}

export function ChatClient({ catalog, remainingToday, dailyCap }: { catalog: CatalogItem[]; remainingToday: number; dailyCap: number }) {
  return (
    <Suspense fallback={<ChatLoading />}>
      <ChatInner catalog={catalog} initialRemaining={remainingToday} dailyCap={dailyCap} />
    </Suspense>
  );
}

function ChatLoading() {
  const { tr } = useLocale();
  return (
    <div>
      <div aria-hidden className="h-[132px] bg-deep sm:h-[140px]" />
      <div className="max-w-3xl mx-auto px-4 py-10 text-subtle-foreground">{tr("common.loading")}</div>
    </div>
  );
}

function ChatInner({ catalog, initialRemaining, dailyCap }: { catalog: CatalogItem[]; initialRemaining: number; dailyCap: number }) {
  const params = useSearchParams();
  const router = useRouter();
  const wanted = params.get("experiment") || params.get("lesson") || "";
  const experiment = catalog.find((e) => e.id === wanted);
  const [remaining, setRemaining] = useState(initialRemaining);
  const experimentId = experiment?.id;
  const suggestions = experiment ? experimentSuggestions(experiment.title) : GENERAL_SUGGESTIONS;

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

  // Switching experiment starts a fresh conversation with new grounding.
  useEffect(() => {
    setMessages([]);
    setError(null);
    conversationIdRef.current = undefined;
  }, [experimentId]);

  function pickExperiment(id: string) {
    router.replace(id ? `/chat?experiment=${encodeURIComponent(id)}` : "/chat", { scroll: false });
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
          experimentId,
          conversationId: conversationIdRef.current,
        }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        if (res.status === 429 && data?.code === "daily_cap") setRemaining(0);
        if (data?.code === "plan_required" || data?.code === "signin") {
          // Pass ran out mid-session: reload to show the paywall.
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
        <div aria-hidden className="absolute inset-0 bg-grid text-primary-soft opacity-50" />
        <div aria-hidden className="absolute -top-20 -right-16 size-60 rounded-full bg-primary/40 blur-3xl" />
        <div aria-hidden className="absolute -bottom-24 left-1/4 size-48 rounded-full bg-sun/15 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 py-5 sm:py-6">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sun text-deep shadow-pop">
              <Sparkles className="size-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <h1 className="text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl">{tr("chat.title")}</h1>
              <p className="text-sm text-deep-foreground/75">{tr("chat.subtitle")}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5">
            <Label htmlFor="experiment-picker" className="text-xs font-semibold text-deep-foreground/80">
              {experiment ? (
                <SubjectIcon subject={experiment.subject} className="size-3.5 text-sun" />
              ) : (
                <FlaskConical className="size-3.5 text-sun" aria-hidden />
              )}
              {tr("chat.pickLabel")}
            </Label>
            <NativeSelect
              id="experiment-picker"
              value={experimentId ?? ""}
              onChange={(e) => pickExperiment(e.target.value)}
              disabled={busy}
              className="w-full max-w-full sm:w-auto sm:max-w-md"
            >
              <NativeSelectOption value="">{tr("chat.pickNone")}</NativeSelectOption>
              {catalog.map((e) => (
                <NativeSelectOption key={e.id} value={e.id}>
                  G{e.grade} · {e.title}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            {experiment && (
              <Button
                asChild
                variant="link"
                className="px-1 text-xs text-sun underline hover:text-sun/80"
              >
                <Link href={`/experiments/${experiment.id}`}>
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
                        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
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
