"use client";

import { useActionState } from "react";
import { Award, Flag, MessageSquarePlus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { assignUnitAction, giveFeedbackAction, setFlagAction, signOffAction, type ActionState } from "./actions";

const LABEL = "flex-col items-start gap-1.5 text-xs font-semibold text-foreground/80";

function Status({ state }: { state: ActionState }) {
  if (!state?.message) return null;
  return (
    <p role="status" className={"text-sm " + (state.ok ? "font-medium text-biology" : "text-destructive")}>
      {state.message}
    </p>
  );
}

export function FeedbackForm({ studentId, places }: { studentId: string; places: { value: string; label: string }[] }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(giveFeedbackAction, null);
  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="studentId" value={studentId} />
      <Label className={LABEL}>
        About
        <NativeSelect name="where" className="w-full">
          <NativeSelectOption value="">General</NativeSelectOption>
          {places.map((p) => (
            <NativeSelectOption key={p.value} value={p.value}>
              {p.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </Label>
      <Label className={LABEL}>
        Feedback
        <Textarea name="body" required maxLength={2000} rows={3} placeholder="What went well, and one thing to try next…" />
      </Label>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={pending}>
          <Send aria-hidden /> {pending ? "Sending…" : "Send feedback"}
        </Button>
        <Status state={state} />
      </div>
    </form>
  );
}

export function AssignForm({ studentId, units }: { studentId: string; units: { id: string; title: string }[] }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(assignUnitAction, null);
  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="studentId" value={studentId} />
      <Label className={LABEL}>
        Concept unit
        <NativeSelect name="unitId" required className="w-full">
          <NativeSelectOption value="">Choose…</NativeSelectOption>
          {units.map((u) => (
            <NativeSelectOption key={u.id} value={u.id}>
              {u.title}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </Label>
      <Label className={LABEL}>
        Note (optional)
        <Input name="note" maxLength={500} placeholder="e.g. Before Saturday's build session" />
      </Label>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant="soft" disabled={pending}>
          <MessageSquarePlus aria-hidden /> {pending ? "Assigning…" : "Assign"}
        </Button>
        <Status state={state} />
      </div>
    </form>
  );
}

export function FlagForm({ studentId, moduleId, flagged, note }: { studentId: string; moduleId: string; flagged: boolean; note: string | null }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(setFlagAction, null);
  return (
    <form action={action} className="flex flex-wrap items-end gap-2">
      <input type="hidden" name="studentId" value={studentId} />
      <input type="hidden" name="moduleId" value={moduleId} />
      <input type="hidden" name="flagged" value={flagged ? "0" : "1"} />
      {!flagged && (
        <Label className={LABEL + " min-w-0 flex-1"}>
          Flag note
          <Input name="note" maxLength={300} placeholder="Why does this student need attention?" />
        </Label>
      )}
      <Button type="submit" variant={flagged ? "outline" : "soft"} disabled={pending}>
        <Flag aria-hidden /> {flagged ? "Clear flag" : "Flag"}
      </Button>
      <div className="w-full">
        <Status state={state} />
      </div>
    </form>
  );
}

export function SignoffForm({ studentId, moduleId, items }: { studentId: string; moduleId: string; items: { id: string; text: string }[] }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(signOffAction, null);
  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="studentId" value={studentId} />
      <input type="hidden" name="moduleId" value={moduleId} />
      <ul className="space-y-2">
        {items.map((s) => (
          <li key={s.id}>
            <label className="flex cursor-pointer gap-3 rounded-xl bg-card p-3 text-sm ring-1 ring-border hover:ring-primary/40">
              <Checkbox name="check" value={s.id} className="mt-0.5 size-5" />
              <span className="text-foreground">{s.text}</span>
            </label>
          </li>
        ))}
      </ul>
      <Label className={LABEL}>
        Note on the certificate (optional)
        <Input name="note" maxLength={1000} placeholder="e.g. Received three stations from Addis" />
      </Label>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={pending}>
          <Award aria-hidden /> {pending ? "Signing off…" : "Sign off and issue certificate"}
        </Button>
        <Status state={state} />
      </div>
    </form>
  );
}
