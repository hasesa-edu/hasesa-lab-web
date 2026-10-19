import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { GoogleButton } from "@/components/GoogleButton";
import { requireSession } from "@/lib/auth/session";
import { safeNext } from "@/lib/safe-next";
import { BRAND, MOTTO } from "@/lib/brand";
import Link from "next/link";

export const metadata: Metadata = { title: `Sign in · ${BRAND}` };

const ERRORS: Record<string, string> = {
  cancelled: "Google sign-in was cancelled. Try again when you're ready.",
  state: "Your sign-in session expired. Please try again.",
  google: "We couldn't reach Google. Please try again.",
  email: "Your Google account needs a verified email address.",
  config: "Google sign-in isn't set up yet. Please try again later.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const sp = await searchParams;
  const next = safeNext(sp.next) ?? undefined;
  if (await requireSession()) redirect(next ?? "/dashboard");
  const error = sp.error ? ERRORS[sp.error] ?? ERRORS.google : null;

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <div className="rounded-2xl border border-line bg-surface p-7 shadow-card text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">Welcome to {BRAND}</h1>
        <p className="mt-2 text-sm text-ink-muted">{MOTTO}</p>
        {error && (
          <div role="alert" className="mt-5 text-sm text-red-700 dark:text-red-300">
            {error}
          </div>
        )}
        <GoogleButton next={next} className="mt-6 w-full" />
        <p className="mt-5 text-xs text-ink-subtle leading-relaxed">
          New here? Continuing with Google creates your account. By continuing you agree to our{" "}
          <Link href="/terms" className="underline hover:text-brand">Terms</Link> and{" "}
          <Link href="/privacy" className="underline hover:text-brand">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
