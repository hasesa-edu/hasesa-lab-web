"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { apiSignin, apiMe } from "@/lib/api";

export default function LoginPage() {
  const { tr } = useLocale();
  const { refresh } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await apiSignin(email, password);
      const u = await apiMe();
      await refresh();
      router.push(u?.role === "teacher" ? "/teacher" : "/dashboard");
    } catch (e: any) {
      console.error("signin failed:", e);
      setError(tr("auth.err.wrong"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <div className="rounded-2xl border border-line bg-surface p-7 shadow-card">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">{tr("auth.signin.title")}</h1>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-ink block">{tr("auth.email")}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
              required
              className="mt-1.5 w-full px-3.5 py-2.5 border border-line rounded-lg focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 bg-canvas text-ink"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink block">{tr("auth.password")}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="mt-1.5 w-full px-3.5 py-2.5 border border-line rounded-lg focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 bg-canvas text-ink"
            />
          </div>
          {error && <div className="text-sm text-red-700 dark:text-red-300">{error}</div>}
          <button
            type="submit"
            disabled={busy}
            className="w-full px-4 py-2.5 bg-brand text-brand-on rounded-lg hover:bg-brand-hover disabled:opacity-50 font-medium shadow-soft transition"
          >
            {busy ? "…" : tr("auth.signin.cta")}
          </button>
          <p className="text-sm text-ink-muted text-center">
            {tr("auth.signup.alt")}{" "}
            <Link href="/signup" className="text-brand hover:underline font-medium">
              {tr("auth.signup.cta")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
