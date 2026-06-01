"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { apiSignup } from "@/lib/api";
import { SUBJECTS, type Subject } from "@/lib/lessons";

type Role = "student" | "teacher";

export default function SignupPage() {
  const { tr, locale } = useLocale();
  const { refresh } = useUser();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [region, setRegion] = useState("");
  const [school, setSchool] = useState("");
  const [under18, setUnder18] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>(["math", "physics", "chemistry", "biology"]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function toggleSubject(s: Subject) {
    setSubjects((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await apiSignup({
        email,
        password,
        displayName: displayName || email.split("@")[0],
        role,
        language: locale,
        region: region || undefined,
        school: school || undefined,
        under18,
        subjects: role === "student" ? subjects : [],
      });
      await refresh();
      router.push(role === "teacher" ? "/teacher" : "/onboarding");
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
          <div>
            <label className="text-sm font-medium text-ink">{tr("auth.role")}</label>
            <div className="mt-1.5 flex gap-2">
              {(["student", "teacher"] as Role[]).map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRole(r)}
                  className={
                    "flex-1 px-3 py-2 rounded-lg border text-sm font-medium transition " +
                    (role === r
                      ? "bg-brand text-brand-on border-brand shadow-soft"
                      : "bg-canvas text-ink border-line hover:border-brand/60")
                  }
                >
                  {tr(r === "student" ? "auth.role.student" : "auth.role.teacher")}
                </button>
              ))}
            </div>
          </div>

          <Field label={tr("auth.email")} type="email" value={email} onChange={setEmail} autoComplete="email" autoFocus required />
          <Field label={tr("auth.displayName")} value={displayName} onChange={setDisplayName} autoComplete="nickname" />
          <Field label={tr("auth.password")} value={password} onChange={setPassword} type="password" autoComplete="new-password" required minLength={6} />
          <p className="text-xs text-ink-subtle -mt-2">{tr("auth.passwordRule")}</p>

          {role === "student" && (
            <div>
              <label className="text-sm font-medium text-ink">{tr("common.subjects")}</label>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                {SUBJECTS.map((s) => (
                  <label
                    key={s.id}
                    className={
                      "flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm transition " +
                      (subjects.includes(s.id)
                        ? "border-brand bg-brand-soft/40 text-ink"
                        : "border-line bg-canvas text-ink hover:border-brand/60")
                    }
                  >
                    <input
                      type="checkbox"
                      checked={subjects.includes(s.id)}
                      onChange={() => toggleSubject(s.id)}
                      className="accent-brand"
                    />
                    <span>{s.emoji} {s.label[locale]}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

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
