"use client";

import { useEffect, useRef, useState } from "react";
import { googleSignInHref } from "./GoogleButton";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

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
      window.location.href = googleSignInHref("/account?buy=1");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/billing/checkout", { method: "POST" });
      const data = await res.json().catch(() => null);
      if (res.status === 401) {
        window.location.href = googleSignInHref("/account?buy=1");
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
      // Replace /account?buy=1 in history so pressing Back from Chapa
      // doesn't start another checkout.
      const url = new URL(window.location.href);
      url.searchParams.delete("buy");
      window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, signedIn]);

  return (
    <div>
      <Button
        type="button"
        size="lg"
        onClick={start}
        disabled={busy}
        className={cn("px-5 font-semibold disabled:opacity-60", className)}
      >
        {busy ? "Opening Chapa…" : label}
      </Button>
      {error && (
        <Alert variant="destructive" className="mt-2">
          <AlertDescription className="text-destructive">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
