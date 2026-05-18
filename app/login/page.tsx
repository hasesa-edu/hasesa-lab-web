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
      setError(e?.message || tr("auth.err.wrong"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-stone-900">{tr("auth.signin.title")}</h1>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-stone-700 block">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="mt-1 w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-brand bg-white"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-stone-700 block">{tr("auth.password")}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="mt-1 w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-brand bg-white"
          />
        </div>
        {error && <div className="text-sm text-red-700">{error}</div>}
        <button
          type="submit"
          disabled={busy}
          className="w-full px-4 py-2.5 bg-brand text-white rounded-md hover:bg-brand-dark disabled:opacity-50 font-medium"
        >
          {busy ? "…" : tr("auth.signin.cta")}
        </button>
        <p className="text-sm text-stone-600 text-center">
          {tr("auth.signup.alt")}{" "}
          <Link href="/signup" className="text-brand underline">{tr("auth.signup.cta")}</Link>
        </p>
      </form>
    </div>
  );
}
