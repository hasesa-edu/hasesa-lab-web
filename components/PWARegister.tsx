"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
    <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-4 sm:bottom-4 sm:max-w-sm z-30 bg-surface border border-brand/30 rounded-xl shadow-pop p-3 flex items-start gap-3">
      <div className="text-2xl">📱</div>
      <div className="flex-1">
        <div className="font-medium text-sm text-ink">Install Personal AI Tutor</div>
        <div className="text-xs text-ink-muted mt-0.5">
          Add to your home screen for faster, offline-capable access.
        </div>
        <div className="mt-2 flex gap-2">
          <button
            onClick={async () => {
              await installEvent.prompt();
              setInstallEvent(null);
            }}
            className="text-xs px-3 py-1 rounded-lg bg-brand text-brand-on hover:bg-brand-hover font-medium"
          >
            Install
          </button>
          <button
            onClick={() => {
              localStorage.setItem("pwa-install-dismissed", "1");
              setDismissed(true);
            }}
            className="text-xs px-3 py-1 rounded-lg text-ink-muted hover:text-ink"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
