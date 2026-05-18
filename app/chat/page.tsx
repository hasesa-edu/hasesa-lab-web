"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { getLesson } from "@/lib/lessons";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS: { en: string; am: string; om: string }[] = [
  {
    en: "Explain Newton's second law with a simple example.",
    am: "የኒውተንን ሁለተኛ ህግ በቀላል ምሳሌ ያስረዱኝ።",
    om: "Seera lammaffaa Niwutan fakkeenya salphaadhaan ibsi.",
  },
  {
    en: "What's the difference between speed and velocity?",
    am: "ፍጥነትና ቬሎሲቲ መካከል ያለው ልዩነት ምንድነው?",
    om: "Garaagarummaan saffisaa fi velocity gidduu jiru maali?",
  },
  {
    en: "How do I balance a chemistry equation? Walk me through one.",
    am: "የኬሚስትሪ እኩልታ እንዴት ሚዛናዊ ማድረግ እችላለሁ? በአንዱ ይምሩኝ።",
    om: "Wal-qixxata keemistirii akkamiin wal-qixxeessuun danda'a? Tokko qajeelchaan natti agarsiisi.",
  },
];

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto px-4 py-10 text-stone-500">Loading…</div>}>
      <ChatInner />
    </Suspense>
  );
}

function ChatInner() {
  const params = useSearchParams();
  const lessonId = params.get("lesson") || undefined;
  const lesson = lessonId ? getLesson(lessonId) : undefined;

  const { locale, tr } = useLocale();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  async function send(text: string) {
    if (!text.trim() || busy) return;
    setError(null);
    const newMessages: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: newMessages, locale, lessonId }),
      });

      if (!res.ok || !res.body) {
        const errText = await res.text().catch(() => "");
        throw new Error(errText || `HTTP ${res.status}`);
      }

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
      setError(tr("chat.error"));
      setMessages((m) => m.filter((msg, i, arr) => !(i === arr.length - 1 && msg.role === "assistant" && msg.content === "")));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header>
        <h1 className="text-2xl font-bold text-stone-900">{tr("chat.title")}</h1>
        <p className="text-stone-600 mt-1 text-sm">{tr("chat.subtitle")}</p>
        {lesson && (
          <div className="mt-3 inline-flex items-center gap-2 text-xs bg-brand/10 text-brand-dark px-3 py-1.5 rounded-full">
            <span>📖</span>
            <span>Grounded in: {lesson.title[locale]}</span>
            <Link href={`/lessons/${lesson.id}`} className="underline ml-1">view</Link>
          </div>
        )}
      </header>

      <div className="mt-6 min-h-[280px]">
        {messages.length === 0 ? (
          <div className="rounded-lg border border-dashed border-stone-300 bg-white p-6">
            <p className="font-medium text-stone-900">{tr("chat.empty.title")}</p>
            <p className="text-sm text-stone-600 mt-1">{tr("chat.empty.body")}</p>
            <div className="mt-4 grid gap-2">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => send(s[locale])}
                  className="text-left text-sm px-3 py-2 rounded border border-stone-200 hover:border-brand hover:bg-brand/5 transition"
                >
                  {s[locale]}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <ul className="space-y-4">
            {messages.map((m, i) => (
              <li
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto max-w-[85%] bg-brand text-white px-4 py-2.5 rounded-2xl rounded-br-md"
                    : "mr-auto max-w-[90%] bg-white border border-stone-200 px-4 py-3 rounded-2xl rounded-bl-md text-stone-900 whitespace-pre-wrap"
                }
              >
                {m.content || (busy && i === messages.length - 1 ? <span className="text-stone-400">{tr("chat.thinking")}</span> : null)}
              </li>
            ))}
          </ul>
        )}
        <div ref={endRef} />
      </div>

      {error && (
        <div className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded">
          {error}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="mt-6 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={tr("chat.placeholder")}
          className="flex-1 px-4 py-2.5 rounded-md border border-stone-300 bg-white focus:outline-none focus:border-brand"
          disabled={busy}
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="px-5 py-2.5 bg-brand text-white rounded-md hover:bg-brand-dark disabled:opacity-40 disabled:cursor-not-allowed font-medium"
        >
          {busy ? tr("chat.thinking") : tr("chat.send")}
        </button>
      </form>

      <p className="mt-3 text-xs text-stone-500">{tr("chat.disclaimer")}</p>
    </div>
  );
}
