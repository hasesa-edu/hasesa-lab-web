"use client";

import { useActionState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { grantPassAction, setRoleAction, type GrantState } from "./actions";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

export function GrantForm() {
  const [state, action, pending] = useActionState<GrantState, FormData>(grantPassAction, null);
  const label = "flex-col items-start gap-1 text-xs font-semibold text-foreground/80";
  return (
    <form action={action} className="flex flex-wrap items-end gap-2">
      <Label className={label + " w-full sm:w-64"}>
        Student email
        <Input name="email" type="email" required />
      </Label>
      <Label className={label + " w-20"}>
        Days
        <Input name="days" type="number" min={1} max={366} defaultValue={30} required />
      </Label>
      <Label className={label + " min-w-0 flex-1 sm:w-56 sm:flex-none"}>
        Note
        <Input name="note" placeholder="e.g. paid cash, receipt 104" />
      </Label>
      <Button type="submit" disabled={pending} className="font-semibold">
        <Plus aria-hidden />
        {pending ? "Enrolling…" : "Enrol"}
      </Button>
      {state && (
        <p role="status" className={"w-full text-sm " + (state.ok ? "font-medium text-biology" : "text-destructive")}>
          {state.message}
        </p>
      )}
    </form>
  );
}

export function RoleForm() {
  const [state, action, pending] = useActionState<GrantState, FormData>(setRoleAction, null);
  const label = "flex-col items-start gap-1 text-xs font-semibold text-foreground/80";
  return (
    <form action={action} className="flex flex-wrap items-end gap-2">
      <Label className={label + " w-full sm:w-64"}>
        Email
        <Input name="email" type="email" required />
      </Label>
      <Label className={label + " w-32"}>
        Role
        <NativeSelect name="role" defaultValue="guide">
          <NativeSelectOption value="guide">Guide</NativeSelectOption>
          <NativeSelectOption value="student">Student</NativeSelectOption>
        </NativeSelect>
      </Label>
      <Button type="submit" variant="soft" disabled={pending} className="font-semibold">
        {pending ? "Saving…" : "Set role"}
      </Button>
      {state && (
        <p role="status" className={"w-full text-sm " + (state.ok ? "font-medium text-biology" : "text-destructive")}>
          {state.message}
        </p>
      )}
    </form>
  );
}
