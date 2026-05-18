"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { createUser } from "@/lib/store";
import { SUBJECTS, type Subject } from "@/lib/lessons";
import type { Role } from "@/lib/store";

export default function SignupPage() {
  const { tr, locale } = useLocale();
  const { refresh } = useUser();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [region, setRegion] = useState("");
  const [school, setSchool] = useState("");
  const [under18, setUnder18] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>(["math", "physics", "chemistry", "biology"]);
  const [error, setError] = useState<string | null>(null);

  function toggleSubject(s: Subject) {
    setSubjects((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = createUser({
      username,
      password,
      role,
      language: locale,
      region: region || undefined,
      school: school || undefined,
      under18,
      subjects: role === "student" ? subjects : [],
    });
    if (!res.ok) {
      setError(res.reason === "taken" ? tr("auth.err.takenUsername") : tr("auth.err.required"));
      return;
    }
    refresh();
    if (role === "teacher") {
      router.push("/teacher");
    } else {
      router.push("/onboarding");
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-stone-900">{tr("auth.signup.title")}</h1>
      <p className="text-sm text-stone-600 mt-1">{tr("auth.signup.tagline")}</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-stone-700">{tr("auth.role")}</label>
          <div className="mt-1 flex gap-2">
            {(["student", "teacher"] as Role[]).map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setRole(r)}
                className={
                  "flex-1 px-3 py-2 rounded border text-sm " +
                  (role === r ? "bg-brand text-white border-brand" : "bg-white border-stone-300")
                }
              >
                {tr(r === "student" ? "auth.role.student" : "auth.role.teacher")}
              </button>
            ))}
          </div>
        </div>

        <Field label={tr("auth.username")} value={username} onChange={setUsername} autoComplete="username" />
        <Field label={tr("auth.password")} value={password} onChange={setPassword} type="password" autoComplete="new-password" />

        {role === "student" && (
          <>
            <div>
              <label className="text-sm font-medium text-stone-700">{tr("common.subjects")}</label>
              <div className="mt-1 grid grid-cols-2 gap-2">
                {SUBJECTS.map((s) => (
                  <label
                    key={s.id}
                    className={
                      "flex items-center gap-2 px-3 py-2 rounded border cursor-pointer text-sm " +
                      (subjects.includes(s.id) ? "border-brand bg-brand/5" : "border-stone-300")
                    }
                  >
                    <input
                      type="checkbox"
                      checked={subjects.includes(s.id)}
                      onChange={() => toggleSubject(s.id)}
                    />
                    <span>{s.emoji} {s.label[locale]}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        <Field label={tr("auth.region")} value={region} onChange={setRegion} />
        <Field label={tr("auth.school")} value={school} onChange={setSchool} />

        <label className="flex items-start gap-2 text-sm text-stone-700">
          <input type="checkbox" checked={under18} onChange={(e) => setUnder18(e.target.checked)} className="mt-0.5" />
          <span>{tr("auth.under18")}</span>
        </label>

        {under18 && (
          <div className="text-xs text-amber-800 bg-amber-50 border border-amber-200 px-3 py-2 rounded">
            We collect only your username, language, and learning progress. We never share data with third parties.
            (Demo notice — a production version would meet Ethiopia's data protection guidelines.)
          </div>
        )}

        <div className="text-xs text-stone-500 bg-stone-50 border border-stone-200 px-3 py-2 rounded">
          {tr("auth.privacy")}
        </div>

        {error && <div className="text-sm text-red-700">{error}</div>}

        <button
          type="submit"
          className="w-full px-4 py-2.5 bg-brand text-white rounded-md hover:bg-brand-dark font-medium"
        >
          {tr("auth.signup.cta")}
        </button>

        <p className="text-sm text-stone-600 text-center">
          {tr("auth.signin.alt")}{" "}
          <Link href="/login" className="text-brand underline">{tr("auth.signin.cta")}</Link>
        </p>
      </form>
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-stone-700 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className="mt-1 w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-brand bg-white"
      />
    </div>
  );
}
