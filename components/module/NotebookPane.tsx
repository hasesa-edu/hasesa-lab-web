"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { apiSaveStep } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type NotebookProps = {
  moduleId: string;
  stepId: string;
  initial: { done: boolean; notes: string | null };
  /** What to write about, depending on the kind of step. */
  prompt: string;
};

type SaveState = "idle" | "saving" | "saved" | "error";

/**
 * The lab notebook for one step, inside the workbench panel. Notes save as you
 * type (no Save button); the guide can read them. One button marks the step done.
 */
export function NotebookPane({ moduleId, stepId, initial, prompt }: NotebookProps) {
  const router = useRouter();
  const [notes, setNotes] = useState(initial.notes ?? "");
  const [done, setDone] = useState(initial.done);
  const [save, setSave] = useState<SaveState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSaved = useRef(initial.notes ?? "");

  async function persist(patch: { notes?: string; done?: boolean }) {
    setSave("saving");
    try {
      const { step } = await apiSaveStep({ moduleId, stepId, ...patch });
      if (patch.notes !== undefined) lastSaved.current = patch.notes;
      setDone(step.done);
      setSave("saved");
      if (patch.done !== undefined) router.refresh();
    } catch {
      setSave("error");
    }
  }

  // Autosave a second after the student stops typing.
  useEffect(() => {
    if (notes === lastSaved.current) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => void persist({ notes }), 1000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes]);

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
        <p className="text-ink/75">{prompt} Your guide can read this.</p>
        <label htmlFor={`notes-${stepId}`} className="sr-only">
          Your notes for this step
        </label>
        <textarea
          id={`notes-${stepId}`}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          maxLength={4000}
          placeholder="What did you do, measure and notice? What surprised you?"
          className="mt-4 min-h-64 w-full resize-y rounded-xl border-2 border-ink/15 bg-white p-4 text-[0.95rem] leading-relaxed outline-none focus:border-signal"
        />
        <p className="mt-2 text-sm text-ink/55" role="status">
          {save === "saving" ? "Saving…" : save === "saved" ? "Saved" : save === "error" ? "Couldn't save. Keep typing to try again." : "Saves as you type"}
        </p>
      </div>
      <div className="shrink-0 border-t border-ink/10 p-4">
        {done ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="flex items-center gap-2 font-bold text-primary">
              <span className="flex size-6 items-center justify-center rounded-full bg-signal text-white">
                <Check aria-hidden className="size-4" strokeWidth={3} />
              </span>
              Step done
            </span>
            <button type="button" onClick={() => void persist({ done: false, notes })} className="text-sm text-ink/60 underline hover:text-ink">
              Mark as not done
            </button>
          </div>
        ) : (
          <Button size="lg" onClick={() => void persist({ done: true, notes })} disabled={save === "saving"} className={cn("w-full bg-ink font-bold text-white hover:bg-ink/90")}>
            Mark this step done
          </Button>
        )}
      </div>
    </div>
  );
}
