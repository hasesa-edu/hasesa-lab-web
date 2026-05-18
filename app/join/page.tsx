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
      setError(e?.message || tr("student.joinErr"));
    } finally {
      setBusy(false);
    }
  }

  if (!ready || !user) {
    return <div className="max-w-md mx-auto px-4 py-10 text-stone-500">{tr("common.loading")}</div>;
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-stone-900">{tr("student.joinClass")}</h1>
      <p className="text-sm text-stone-600 mt-2">{tr("student.joinCode")}</p>

      <form onSubmit={onJoin} className="mt-6 space-y-3">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="ABC123"
          maxLength={8}
          className="w-full px-3 py-2.5 border border-stone-300 rounded-md focus:outline-none focus:border-brand bg-white text-center tracking-widest font-mono uppercase"
        />
        {error && <div className="text-sm text-red-700">{error}</div>}
        {joined && (
          <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded">
            ✓ Joined {joined}
          </div>
        )}
        <button
          type="submit"
          disabled={!code.trim() || busy}
          className="w-full px-4 py-2.5 bg-brand text-white rounded-md hover:bg-brand-dark disabled:opacity-40 font-medium"
        >
          {busy ? "…" : tr("student.join")}
        </button>
      </form>

      {user.joinedClasses.length > 0 && (
        <div className="mt-8">
          <h2 className="text-sm font-medium text-stone-500 uppercase tracking-wider">{tr("student.joined")}</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {user.joinedClasses.map((c) => (
              <li key={c} className="px-3 py-2 rounded border border-stone-200 bg-white font-mono text-stone-700">
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link href="/dashboard" className="mt-6 inline-block text-sm text-brand">← {tr("nav.dashboard")}</Link>
    </div>
  );
}
