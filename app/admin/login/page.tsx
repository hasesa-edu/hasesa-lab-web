"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { LogIn, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <div className="relative isolate flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden bg-deep px-4 py-14 text-deep-foreground">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid text-primary-soft opacity-50" />
      <div aria-hidden className="absolute -top-32 -left-24 -z-10 size-96 rounded-full bg-primary/50 blur-3xl" />
      <div aria-hidden className="absolute -right-24 -bottom-24 -z-10 size-80 rounded-full bg-sun/20 blur-3xl" />

      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-sun text-deep shadow-pop">
            <ShieldCheck className="size-7" aria-hidden />
          </span>
          <p className="mt-4 text-xs font-bold tracking-[0.18em] text-sun uppercase">Admin</p>
        </div>

        <div className="rounded-[1.5rem] bg-card p-6 text-card-foreground shadow-pop ring-1 ring-white/10 sm:p-7">
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Admin sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">Restricted area — analytics and operations.</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="admin-username" className="text-foreground">Username</Label>
              <Input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                autoFocus
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="admin-password" className="text-foreground">Password</Label>
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" size="lg" disabled={busy} className="w-full font-semibold">
              <LogIn aria-hidden />
              {busy ? "…" : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
