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
import { ArrowDown, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  return <div className="max-w-3xl mx-auto px-4 py-10 text-subtle-foreground">{tr("common.loading")}</div>;
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
    <div className="max-w-3xl mx-auto px-4 py-10">
      <header>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">{tr("chat.title")}</h1>
        <p className="text-muted-foreground mt-1.5 text-sm">{tr("chat.subtitle")}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Label htmlFor="experiment-picker" className="text-xs text-subtle-foreground">
            {tr("chat.pickLabel")}
          </Label>
          <NativeSelect
            id="experiment-picker"
            value={experimentId ?? ""}
            onChange={(e) => pickExperiment(e.target.value)}
            disabled={busy}
            className="max-w-full"
          >
            <NativeSelectOption value="">{tr("chat.pickNone")}</NativeSelectOption>
            {catalog.map((e) => (
              <NativeSelectOption key={e.id} value={e.id}>
                G{e.grade} · {e.title}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          {experiment && (
            <Button asChild variant="link" className="px-1 text-xs underline">
              <Link href={`/experiments/${experiment.id}`}>{tr("chat.viewExperiment")}</Link>
            </Button>
          )}
        </div>
      </header>

      <div className="mt-6 min-h-[280px]">
        {messages.length === 0 ? (
          <Card className="gap-5 py-6 sm:py-7 shadow-soft">
            <CardHeader className="px-6 sm:px-7 gap-1.5">
              <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {tr("chat.empty.title")}
              </CardTitle>
              <CardDescription>{tr("chat.empty.body")}</CardDescription>
            </CardHeader>
            <CardContent className="px-6 sm:px-7 grid gap-2.5">
              {suggestions.map((s, i) => (
                <Button
                  key={i}
                  variant="outline"
                  onClick={() => send(s.text)}
                  className="group h-auto items-start justify-start gap-3 whitespace-normal text-left font-normal px-4 py-3 rounded-xl bg-card text-foreground hover:border-primary/60 hover:bg-primary-soft/30 hover:shadow-soft"
                >
                  <span className="text-lg leading-none mt-0.5">{s.emoji}</span>
                  <span className="flex-1 leading-relaxed">{s.text}</span>
                  <ArrowRight className="mt-0.5 text-primary opacity-0 group-hover:opacity-100 transition" aria-hidden />
                </Button>
              ))}
            </CardContent>
          </Card>
        ) : (
          <ul className="space-y-4">
            {messages.map((m, i) => {
              const isUser = m.role === "user";
              const isLast = i === messages.length - 1;
              return (
                <li
                  key={i}
                  className={
                    isUser
                      ? "ml-auto max-w-[85%] bg-primary text-primary-foreground px-4 py-2.5 rounded-2xl rounded-br-md shadow-soft whitespace-pre-wrap"
                      : "mr-auto max-w-[90%] bg-card border border-border px-4 py-3 rounded-2xl rounded-bl-md text-foreground shadow-soft"
                  }
                >
                  {isUser ? (
                    m.content
                  ) : m.content ? (
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
          className="fixed left-1/2 -translate-x-1/2 bottom-24 z-30 rounded-full shadow-pop text-xs"
          aria-label={tr("chat.newMessage")}
        >
          <ArrowDown aria-hidden />
          <span>{tr("chat.newMessage")}</span>
        </Button>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="mt-6 flex gap-2"
      >
        <Input
          value={input}
          maxLength={2000}
          onChange={(e) => setInput(e.target.value)}
          placeholder={tr("chat.placeholder")}
          className="flex-1"
          disabled={busy || remaining <= 0}
        />
        <Button type="submit" disabled={busy || !input.trim() || remaining <= 0}>
          {busy ? tr("chat.thinking") : tr("chat.send")}
        </Button>
      </form>

      <p className="mt-3 text-xs text-subtle-foreground">
        <span className={remaining <= 5 ? "font-semibold text-amber-700 dark:text-amber-300" : ""}>
          {remaining > 0 ? `${remaining} of ${dailyCap} messages left today.` : `You've used all ${dailyCap} messages for today. They reset at midnight.`}
        </span>{" "}
        {tr("chat.disclaimer")}
      </p>
    </div>
  );
}
