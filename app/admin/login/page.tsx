"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/admin/signin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Sign in failed");
      }
      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Sign in failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <div className="rounded-2xl border border-line bg-surface p-7 shadow-card">
        <h1 className="text-2xl font-bold tracking-tight text-ink">Admin sign in</h1>
        <p className="mt-2 text-sm text-ink-muted">Restricted area — analytics and operations.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-ink block">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
              required
              className="mt-1.5 w-full px-3.5 py-2.5 border border-line rounded-lg focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 bg-canvas text-ink"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink block">Password</label>
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
            {busy ? "…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
