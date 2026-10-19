"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Starts a Chapa checkout. Signed-out visitors are sent to Google sign-in
 * first and come back to /account?buy=1, which starts checkout automatically.
 */
export function CheckoutButton({
  signedIn,
  label,
  auto = false,
  className = "",
}: {
  signedIn: boolean;
  label: string;
  auto?: boolean;
  className?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const started = useRef(false);

  async function start() {
    if (!signedIn) {
      window.location.href = "/login?next=" + encodeURIComponent("/account?buy=1");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/billing/checkout", { method: "POST" });
      const data = await res.json().catch(() => null);
      if (res.status === 401) {
        window.location.href = "/login?next=" + encodeURIComponent("/account?buy=1");
        return;
      }
      if (!res.ok || !data?.checkoutUrl) throw new Error(data?.error || "Couldn't start the payment.");
      window.location.href = data.checkoutUrl;
    } catch (e: any) {
      setError(e?.message || "Couldn't start the payment.");
      setBusy(false);
    }
  }

  useEffect(() => {
    if (auto && signedIn && !started.current) {
      started.current = true;
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, signedIn]);

  return (
    <div>
      <button
        type="button"
        onClick={start}
        disabled={busy}
        className={
          "inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-brand text-brand-on hover:bg-brand-hover disabled:opacity-60 font-semibold shadow-soft transition " +
          className
        }
      >
        {busy ? "Opening Chapa…" : label}
      </button>
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-700 dark:text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
