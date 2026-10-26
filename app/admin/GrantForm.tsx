"use client";

import { useActionState } from "react";
import { grantPassAction, type GrantState } from "./actions";

export function GrantForm() {
  const [state, action, pending] = useActionState<GrantState, FormData>(grantPassAction, null);
  const input = "px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-hidden focus:border-primary";
  return (
    <form action={action} className="flex flex-wrap items-end gap-2">
      <label className="flex flex-col gap-1 text-xs text-muted-foreground">
        Student email
        <input name="email" type="email" required className={input + " w-64"} />
      </label>
      <label className="flex flex-col gap-1 text-xs text-muted-foreground">
        Days
        <input name="days" type="number" min={1} max={366} defaultValue={30} required className={input + " w-20"} />
      </label>
      <label className="flex flex-col gap-1 text-xs text-muted-foreground">
        Note
        <input name="note" placeholder="e.g. paid by bank transfer" className={input + " w-56"} />
      </label>
      <button type="submit" disabled={pending} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium disabled:opacity-60">
        {pending ? "Adding…" : "Add days"}
      </button>
      {state && (
        <p role="status" className={"w-full text-sm " + (state.ok ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300")}>
          {state.message}
        </p>
      )}
    </form>
  );
}
