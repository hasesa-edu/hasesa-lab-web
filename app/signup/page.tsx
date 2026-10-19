import { redirect } from "next/navigation";

// Google sign-in creates the account, so sign-up and sign-in are the same page.
export default async function SignupPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  redirect(next ? `/login?next=${encodeURIComponent(next)}` : "/login");
}
