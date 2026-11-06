"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Play, X } from "lucide-react";
import { apiEnroll } from "@/lib/api";
import { Button } from "@/components/ui/button";

/** Start a module, or drop it. Students can come back any time; progress is kept. */
export function EnrollButton({ moduleId, status }: { moduleId: string; status: "not-started" | "active" | "dropped" | "completed" }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (status === "completed") return null;

  async function go(action: "start" | "drop") {
    if (action === "drop" && !confirm("Drop this module? Your notes and progress are kept, and you can restart any time.")) return;
    setBusy(true);
    setError(null);
    try {
      await apiEnroll(moduleId, action);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't save. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {status === "active" ? (
        <Button variant="ghost" size="sm" onClick={() => go("drop")} disabled={busy} className="text-deep-foreground/70 hover:bg-white/10 hover:text-deep-foreground">
          <X aria-hidden /> Drop module
        </Button>
      ) : (
        <Button size="lg" onClick={() => go("start")} disabled={busy} className="bg-sun font-semibold text-deep shadow-pop hover:bg-sun/90">
          <Play aria-hidden /> {status === "dropped" ? "Restart module" : "Start module"}
        </Button>
      )}
      {error && <span role="status" className="text-sm text-red-200">{error}</span>}
    </div>
  );
}
