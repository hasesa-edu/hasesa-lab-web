import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { GoogleButton } from "@/components/GoogleButton";
import { requireSession } from "@/lib/auth/session";
import { safeNext } from "@/lib/safe-next";
import { BRAND, MOTTO } from "@/lib/brand";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogoMark } from "@/components/Logo";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const metadata: Metadata = { title: `Sign in · ${BRAND}`, alternates: { canonical: "/login" } };

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
    <div className="flex min-h-[calc(100svh-61px)] items-center justify-center bg-background px-4 py-12 sm:py-16">

      <div className="w-full max-w-md">
        <Card className="text-center [--card-spacing:--spacing(8)]">
          <CardHeader className="gap-2">
            <LogoMark size={72} className="mx-auto mb-4" />
            <CardTitle>
              <h1 className="text-3xl leading-tight font-semibold text-foreground sm:text-4xl">Welcome to {BRAND}</h1>
            </CardTitle>
            <CardDescription className="font-mono text-xs tracking-[0.08em] uppercase">{MOTTO}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {error && (
              <Alert variant="destructive" className="text-center">
                <AlertDescription className="text-destructive">{error}</AlertDescription>
              </Alert>
            )}
            <GoogleButton next={next} className="w-full" />
            <p className="text-xs leading-relaxed text-muted-foreground">
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
