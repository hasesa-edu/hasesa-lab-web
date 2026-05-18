"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function PWARegister() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {});
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

  if (!installEvent || dismissed) return null;

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-4 sm:bottom-4 sm:max-w-sm z-30 bg-white border border-brand/30 rounded-lg shadow-lg p-3 flex items-start gap-3">
      <div className="text-2xl">📱</div>
      <div className="flex-1">
        <div className="font-medium text-sm text-stone-900">Install Personal AI Tutor</div>
        <div className="text-xs text-stone-600 mt-0.5">
          Add to your home screen for faster, offline-capable access.
        </div>
        <div className="mt-2 flex gap-2">
          <button
            onClick={async () => {
              await installEvent.prompt();
              setInstallEvent(null);
            }}
            className="text-xs px-3 py-1 rounded bg-brand text-white hover:bg-brand-dark"
          >
            Install
          </button>
          <button
            onClick={() => {
              localStorage.setItem("pwa-install-dismissed", "1");
              setDismissed(true);
            }}
            className="text-xs px-3 py-1 rounded text-stone-600 hover:text-stone-900"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
