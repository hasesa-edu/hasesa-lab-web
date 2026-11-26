import { redirect } from "next/navigation";

// Admins sign in with Google now; keep old bookmarks working.
export default function AdminLoginPage() {
  redirect("/login?next=/admin");
}
