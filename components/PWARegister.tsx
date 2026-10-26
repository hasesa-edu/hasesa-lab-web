"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SmartphoneIcon } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function PWARegister() {
  const pathname = usePathname();
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    // Defer SW registration until the page has finished its first paint, so it
    // doesn't compete with hero rendering for the browser's main thread.
    function register() {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    if (document.readyState === "complete") {
      setTimeout(register, 500);
    } else {
      window.addEventListener("load", () => setTimeout(register, 500), { once: true });
    }
  }, []);

  useEffect(() => {
    function onPrompt(e: Event) {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    }
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  useEffect(() => {
    setDismissed(localStorage.getItem("pwa-install-dismissed") === "1");
  }, []);

  // The install card only appears on the marketing home page so it doesn't
  // overlap content on task-focused pages (chat, dashboard, etc.).
  if (pathname !== "/" || !installEvent || dismissed) return null;

  return (
    <Card className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-4 sm:bottom-4 sm:max-w-sm z-30 ring-primary/30 shadow-pop p-3 flex-row items-start gap-3">
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-strong dark:text-primary">
        <SmartphoneIcon aria-hidden className="size-5" />
      </span>
      <div className="flex-1">
        <div className="font-heading font-bold text-foreground">Install {BRAND}</div>
        <div className="text-xs text-muted-foreground mt-0.5">
          Add to your home screen for faster, offline-capable access.
        </div>
        <div className="mt-2 flex gap-2">
          <Button
            className="font-semibold"
            onClick={async () => {
              await installEvent.prompt();
              setInstallEvent(null);
            }}
          >
            Install
          </Button>
          <Button
            variant="ghost"
            className="text-muted-foreground"
            onClick={() => {
              localStorage.setItem("pwa-install-dismissed", "1");
              setDismissed(true);
            }}
          >
            Not now
          </Button>
        </div>
      </div>
    </Card>
  );
}
