"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminSignOutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    setBusy(true);
    try {
      await fetch("/api/admin/signout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      disabled={busy}
      className="bg-white/10 text-deep-foreground ring-1 ring-white/15 hover:bg-white/20 hover:text-deep-foreground dark:hover:bg-white/20"
    >
      <LogOut aria-hidden />
      {busy ? "…" : "Sign out"}
    </Button>
  );
}
