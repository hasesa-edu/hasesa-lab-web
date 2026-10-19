"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { apiSignup } from "@/lib/api";
import { GRADES, type Grade } from "@/lib/experiments";

export default function SignupPage() {
  const { tr, locale } = useLocale();
  const { refresh } = useUser();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [region, setRegion] = useState("");
  const [school, setSchool] = useState("");
  const [under18, setUnder18] = useState(false);
  const [grade, setGrade] = useState<Grade | "">("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await apiSignup({
        email,
        password,
        displayName: displayName || email.split("@")[0],
        language: locale,
        region: region || undefined,
        school: school || undefined,
        under18,
        grade: grade || null,
      });
      await refresh();
      router.push("/onboarding");
    } catch (e: any) {
      console.error("signup failed:", e);
      setError(e?.message === "username-taken" ? tr("auth.err.takenUsername") : tr("auth.err.signup"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <div className="rounded-2xl border border-line bg-surface p-7 shadow-card">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">{tr("auth.signup.title")}</h1>
        <p className="text-sm text-ink-muted mt-1.5">{tr("auth.signup.tagline")}</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <Field label={tr("auth.email")} type="email" value={email} onChange={setEmail} autoComplete="email" autoFocus required />
          <Field label={tr("auth.displayName")} value={displayName} onChange={setDisplayName} autoComplete="nickname" />
          <Field label={tr("auth.password")} value={password} onChange={setPassword} type="password" autoComplete="new-password" required minLength={8} />
          <p className="text-xs text-ink-subtle -mt-2">{tr("auth.passwordRule")}</p>

          <div>
            <label htmlFor="grade" className="text-sm font-medium text-ink block">{tr("auth.grade")}</label>
            <select
              id="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value ? (Number(e.target.value) as Grade) : "")}
              className="mt-1.5 w-full px-3.5 py-2.5 border border-line rounded-lg focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 bg-canvas text-ink"
            >
              <option value="">{tr("auth.grade.none")}</option>
              {GRADES.map((g) => (
                <option key={g} value={g}>
                  {tr("experiments.grade")} {g}
                </option>
              ))}
            </select>
          </div>

          <Field label={tr("auth.region")} value={region} onChange={setRegion} />
          <Field label={tr("auth.school")} value={school} onChange={setSchool} />

          <label className="flex items-start gap-2 text-sm text-ink">
            <input
              type="checkbox"
              checked={under18}
              onChange={(e) => setUnder18(e.target.checked)}
              className="mt-0.5 accent-brand"
            />
            <span>{tr("auth.under18")}</span>
          </label>

          {under18 && (
            <div className="text-xs text-amber-900 dark:text-amber-200 bg-sun-soft border border-amber-200 dark:border-amber-900/50 px-3 py-2 rounded-lg">
              {tr("auth.under18.notice")}
            </div>
          )}

          {error && <div className="text-sm text-red-700 dark:text-red-300">{error}</div>}

          <button
            type="submit"
            disabled={busy}
            className="w-full px-4 py-2.5 bg-brand text-brand-on rounded-lg hover:bg-brand-hover disabled:opacity-50 font-medium shadow-soft transition"
          >
            {busy ? "…" : tr("auth.signup.cta")}
          </button>

          <p className="text-sm text-ink-muted text-center">
            {tr("auth.signin.alt")}{" "}
            <Link href="/login" className="text-brand hover:underline font-medium">
              {tr("auth.signin.cta")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", autoComplete, autoFocus, required, minLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-ink block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        required={required}
        minLength={minLength}
        className="mt-1.5 w-full px-3.5 py-2.5 border border-line rounded-lg focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 bg-canvas text-ink"
      />
    </div>
  );
}
