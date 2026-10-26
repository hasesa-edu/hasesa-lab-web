import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { GoogleButton } from "@/components/GoogleButton";
import { requireSession } from "@/lib/auth/session";
import { safeNext } from "@/lib/safe-next";
import { BRAND, MOTTO } from "@/lib/brand";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogoMark } from "@/components/Logo";
import { SubjectTile } from "@/components/Subject";
import { SUBJECTS } from "@/lib/subjects";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const metadata: Metadata = { title: `Sign in · ${BRAND}` };

const ERRORS: Record<string, string> = {
  cancelled: "Google sign-in was cancelled. Try again when you're ready.",
  state: "Your sign-in session expired. Please try again.",
  google: "We couldn't reach Google. Please try again.",
  email: "Your Google account needs a verified email address.",
  config: "Google sign-in isn't set up yet. Please try again later.",
  taken: "This email is already linked to a different Google account. Sign in with that account instead.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const sp = await searchParams;
  const next = safeNext(sp.next) ?? undefined;
  if (await requireSession()) redirect(next ?? "/dashboard");
  const error = sp.error ? ERRORS[sp.error] ?? ERRORS.google : null;

  return (
    <div className="relative isolate flex min-h-[calc(100svh-61px)] items-center justify-center overflow-hidden bg-deep px-4 py-12 text-deep-foreground sm:py-16">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid text-primary-soft opacity-50" />
      <div aria-hidden className="absolute -top-40 -left-32 -z-10 size-[28rem] rounded-full bg-primary/50 blur-3xl" />
      <div aria-hidden className="absolute -right-24 -bottom-24 -z-10 size-80 rounded-full bg-sun/25 blur-3xl" />

      <div className="w-full max-w-md">
        <Card className="relative overflow-hidden rounded-[1.75rem] bg-card text-center shadow-pop ring-1 ring-white/10 [--card-spacing:--spacing(7)]">
          {/* Notebook page: subject-colored binding along the top, faint ruled dots behind. */}
          <div aria-hidden className="absolute inset-x-0 top-0 flex h-1.5">
            <span className="flex-1 bg-physics" />
            <span className="flex-1 bg-chemistry" />
            <span className="flex-1 bg-biology" />
          </div>
          <div aria-hidden className="absolute inset-0 bg-dots text-primary opacity-30" />
          <CardHeader className="relative gap-2 pt-3">
            <LogoMark size={88} className="mx-auto mb-3" />
            <CardTitle>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">Welcome to {BRAND}</h1>
            </CardTitle>
            <CardDescription className="text-base">{MOTTO}</CardDescription>
            <div aria-hidden className="mx-auto mt-3 flex gap-2">
              {SUBJECTS.map((s) => (
                <SubjectTile key={s.id} subject={s.id} size="sm" />
              ))}
            </div>
          </CardHeader>
          <CardContent className="relative flex flex-col gap-5">
            {error && (
              <Alert variant="destructive" className="text-center">
                <AlertDescription className="text-destructive">{error}</AlertDescription>
              </Alert>
            )}
            <GoogleButton next={next} className="w-full" />
            <p className="text-xs text-subtle-foreground leading-relaxed">
              New here? Continuing with Google creates your account. By continuing you agree to our{" "}
              <Link href="/terms" className="underline hover:text-primary">Terms</Link> and{" "}
              <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
