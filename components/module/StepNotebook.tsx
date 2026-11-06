"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, NotebookPen } from "lucide-react";
import { apiSaveStep } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionTitle } from "./ui";

/** The lab notebook page for one step: notes the guide can read, and a "done" mark. */
export function StepNotebook({
  moduleId,
  stepId,
  initial,
  prompt,
}: {
  moduleId: string;
  stepId: string;
  initial: { done: boolean; notes: string | null };
  prompt: string;
}) {
  const router = useRouter();
  const [done, setDone] = useState(initial.done);
  const [notes, setNotes] = useState(initial.notes ?? "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function save(nextDone?: boolean) {
    setSaving(true);
    setMessage(null);
    try {
      const { step } = await apiSaveStep({ moduleId, stepId, notes, done: nextDone });
      setDone(step.done);
      setMessage(nextDone === true ? "Step done. Nice work." : "Saved.");
      router.refresh();
    } catch {
      setMessage("Couldn't save. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section id="notebook" className="mt-12 scroll-mt-24">
      <div className="relative overflow-hidden rounded-2xl bg-card shadow-pop ring-1 ring-border">
        <div aria-hidden className="h-2.5 bg-primary" />
        <div aria-hidden className="absolute inset-0 top-2.5 bg-grid text-primary opacity-50" />
        <div aria-hidden className="absolute inset-y-0 left-7 w-px bg-red-300/80 sm:left-11 dark:bg-red-800/80" />
        <div className="relative py-5 pr-5 pl-11 sm:py-6 sm:pr-6 sm:pl-16">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SectionTitle icon={NotebookPen}>Lab notebook</SectionTitle>
            {done && (
              <Badge variant="success" className="h-6 px-2.5 font-semibold">
                <Check aria-hidden /> Done
              </Badge>
            )}
          </div>
          <Label htmlFor={`notes-${stepId}`} className="mt-3 block leading-normal font-normal text-muted-foreground">
            {prompt} Your guide can read this.
          </Label>
          <Textarea
            id={`notes-${stepId}`}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            maxLength={4000}
            rows={6}
            placeholder="What did you do, measure and notice? What surprised you?"
            className="mt-3 min-h-36 bg-card/85 text-[0.95rem] leading-relaxed"
          />
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {!done && (
              <Button onClick={() => save(true)} disabled={saving}>
                <Check aria-hidden /> Save and mark step done
              </Button>
            )}
            <Button variant="soft" onClick={() => save()} disabled={saving}>
              Save notes
            </Button>
            {done && (
              <Button variant="link" size="sm" onClick={() => save(false)} disabled={saving} className="h-10 text-xs text-subtle-foreground underline">
                Mark as not done
              </Button>
            )}
            {message && (
              <span className="text-xs text-muted-foreground" role="status">
                {message}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
