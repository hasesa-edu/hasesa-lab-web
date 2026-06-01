"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { apiJoinClass } from "@/lib/api";

export default function JoinPage() {
  const { tr } = useLocale();
  const { user, refresh, ready } = useUser();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [joined, setJoined] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (ready && !user) router.push("/login");
  }, [ready, user, router]);

  async function onJoin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!user) return;
    setBusy(true);
    try {
      const cls = await apiJoinClass(code.trim());
      setJoined(cls.name);
      await refresh();
    } catch (e: any) {
      console.error("join class failed:", e);
      setError(tr("student.joinErr"));
    } finally {
      setBusy(false);
    }
  }

  if (!ready || !user) {
    return <div className="max-w-md mx-auto px-4 py-10 text-ink-subtle">{tr("common.loading")}</div>;
  }

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <div className="rounded-2xl border border-line bg-surface p-7 shadow-card">
        <h1 className="text-2xl font-bold tracking-tight text-ink">{tr("student.joinClass")}</h1>
        <p className="text-sm text-ink-muted mt-2">{tr("student.joinCode")}</p>

        <form onSubmit={onJoin} className="mt-6 space-y-3">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="ABC123"
            maxLength={8}
            autoFocus
            required
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck={false}
            inputMode="text"
            aria-label={tr("student.joinCode")}
            className="w-full px-3 py-3 border border-line rounded-lg focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 bg-canvas text-center tracking-widest font-mono uppercase text-ink text-lg"
          />
          {error && <div className="text-sm text-red-700 dark:text-red-300">{error}</div>}
          {joined && (
            <div className="text-sm text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 px-3 py-2 rounded-lg">
              ✓ Joined {joined}
            </div>
          )}
          <button
            type="submit"
            disabled={!code.trim() || busy}
            className="w-full px-4 py-2.5 bg-brand text-brand-on rounded-lg hover:bg-brand-hover disabled:opacity-40 font-medium shadow-soft transition"
          >
            {busy ? "…" : tr("student.join")}
          </button>
        </form>

        {user.joinedClasses.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xs font-semibold text-ink-subtle uppercase tracking-wider">
              {tr("student.joined")}
            </h2>
            <ul className="mt-2 space-y-1 text-sm">
              {user.joinedClasses.map((c) => (
                <li
                  key={c}
                  className="px-3 py-2 rounded-lg border border-line bg-canvas font-mono text-ink-muted"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Link href="/dashboard" className="mt-6 inline-block text-sm text-brand hover:underline">
          ← {tr("nav.dashboard")}
        </Link>
      </div>
    </div>
  );
}
