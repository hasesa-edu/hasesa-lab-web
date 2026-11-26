"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Admins signed in with Google sign out of the whole site (their Google
 * session is what makes them an admin); the admin password session only
 * drops its admin flag.
 */
export function AdminSignOutButton({ viaGoogle = false }: { viaGoogle?: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    setBusy(true);
    try {
      if (viaGoogle) {
        await fetch("/api/auth/signout", { method: "POST" });
        router.push("/");
      } else {
        await fetch("/api/admin/signout", { method: "POST" });
        router.push("/admin/login");
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={busy}
    >
      <LogOut aria-hidden />
      {busy ? "…" : "Sign out"}
    </Button>
  );
}
