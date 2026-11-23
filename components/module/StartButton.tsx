"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Play } from "lucide-react";
import { apiEnroll } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/** Start (or restart) a module and go straight to its first step. */
export function StartButton({
  moduleId,
  firstStepId,
  restart = false,
  size = "default",
  className,
}: {
  moduleId: string;
  firstStepId: string;
  restart?: boolean;
  size?: "sm" | "default" | "lg";
  className?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function start() {
    setBusy(true);
    setError(null);
    try {
      await apiEnroll(moduleId, "start");
      router.push(`/modules/${moduleId}/${firstStepId}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't start. Try again.");
      setBusy(false);
    }
  }

  return (
    <span className={cn("relative z-10 inline-flex flex-col gap-1", className)}>
      <Button type="button" size={size} variant="ink" onClick={start} disabled={busy} className="w-full">
        <Play aria-hidden /> {busy ? "Starting…" : restart ? "Restart" : "Start"}
      </Button>
      {error && (
        <span role="status" className="text-xs text-destructive">
          {error}
        </span>
      )}
    </span>
  );
}
