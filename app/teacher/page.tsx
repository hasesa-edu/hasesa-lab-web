"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { SUBJECTS, type Subject } from "@/lib/lessons";
import { apiCreateClass, apiListClasses, type TeacherClass } from "@/lib/api";

export default function TeacherPage() {
  const { tr, locale } = useLocale();
  const { user, ready } = useUser();
  const router = useRouter();

  const [classes, setClasses] = useState<TeacherClass[]>([]);
  const [name, setName] = useState("");
  const [activeCode, setActiveCode] = useState<string | undefined>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (ready && !user) router.push("/login");
    if (ready && user && user.role !== "teacher") router.push("/dashboard");
  }, [ready, user, router]);

  async function loadClasses() {
    try {
      const list = await apiListClasses();
      setClasses(list);
      if (list.length && (!activeCode || !list.find((c) => c.code === activeCode))) {
        setActiveCode(list[0].code);
      }
    } catch (e: any) {
      setError(e?.message || "Failed to load");
    }
  }

  useEffect(() => {
    if (user?.role === "teacher") loadClasses();
  }, [user]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !name.trim()) return;
    setBusy(true);
    try {
      const cls = await apiCreateClass(name.trim());
      setName("");
      setActiveCode(cls.code);
      await loadClasses();
    } catch (e: any) {
      setError(e?.message || "Failed");
    } finally {
      setBusy(false);
    }
  }

  if (!ready || !user || user.role !== "teacher") {
    return <div className="max-w-3xl mx-auto px-4 py-10 text-ink-subtle">{tr("common.loading")}</div>;
  }

  const active = classes.find((c) => c.code === activeCode);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink">{tr("teacher.title")}</h1>
      <p className="text-ink-muted mt-1.5 text-sm max-w-2xl">{tr("teacher.subtitle")}</p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <aside className="md:col-span-1">
          <form onSubmit={handleCreate} className="rounded-xl border border-line bg-surface p-4 shadow-soft">
            <h2 className="font-semibold text-ink tracking-tight">{tr("teacher.createClass")}</h2>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={tr("teacher.className")}
              className="mt-3 w-full px-3.5 py-2 border border-line rounded-lg focus:outline-none focus:border-brand bg-canvas text-ink text-sm"
            />
            <button
              type="submit"
              disabled={!name.trim() || busy}
              className="mt-3 w-full px-3 py-2 bg-brand text-brand-on rounded-lg hover:bg-brand-hover disabled:opacity-40 text-sm font-medium shadow-soft transition"
            >
              {busy ? "…" : tr("teacher.create")}
            </button>
            {error && <p className="mt-2 text-xs text-red-700 dark:text-red-300">{error}</p>}
          </form>

          <h3 className="mt-6 text-xs font-semibold text-ink-subtle uppercase tracking-wider">
            {tr("teacher.title")}
          </h3>
          {classes.length === 0 ? (
            <p className="mt-2 text-sm text-ink-subtle">{tr("teacher.noClasses")}</p>
          ) : (
            <ul className="mt-2 space-y-1">
              {classes.map((c) => (
                <li key={c.code}>
                  <button
                    onClick={() => setActiveCode(c.code)}
                    className={
                      "w-full text-left px-3 py-2 rounded-lg text-sm border transition " +
                      (c.code === activeCode
                        ? "border-brand bg-brand-soft/40"
                        : "border-line bg-surface hover:border-brand/60")
                    }
                  >
                    <div className="font-medium text-ink">{c.name}</div>
                    <div className="text-xs text-ink-subtle">{c.code} · {c.memberCount} {tr("teacher.students")}</div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <section className="md:col-span-2">
          {!active ? (
            <div className="rounded-xl border border-dashed border-line-strong bg-surface p-10 text-center text-ink-subtle">
              {tr("teacher.noClasses")}
            </div>
          ) : (
            <ClassDetail cls={active} tr={tr} locale={locale} />
          )}
        </section>
      </div>
    </div>
  );
}

function ClassDetail({ cls, tr, locale }: { cls: TeacherClass; tr: (k: any) => string; locale: "en" | "am" | "om" }) {
  return (
    <div>
      <div className="rounded-xl border border-brand/25 bg-brand-soft/40 p-5">
        <div className="text-xs text-brand-hover dark:text-brand uppercase tracking-wider font-semibold">
          {tr("teacher.share")}
        </div>
        <div className="mt-1 text-3xl font-mono font-bold text-brand-hover dark:text-brand tracking-widest">
          {cls.code}
        </div>
        <div className="mt-1 text-xs text-ink-muted">{cls.memberCount} {tr("teacher.students")}</div>
      </div>

      {cls.memberCount === 0 && (
        <div className="mt-4 text-sm text-ink-muted bg-surface-2 border border-line px-3 py-2 rounded-lg">
          {tr("teacher.noStudents")}
        </div>
      )}

      <div className="mt-6 space-y-6">
        {SUBJECTS.map((s) => (
          <SubjectAggregate key={s.id} cls={cls} subject={s.id} tr={tr} locale={locale} />
        ))}
      </div>
    </div>
  );
}

function SubjectAggregate({
  cls,
  subject,
  tr,
  locale,
}: {
  cls: TeacherClass;
  subject: Subject;
  tr: (k: any) => string;
  locale: "en" | "am" | "om";
}) {
  const meta = SUBJECTS.find((s) => s.id === subject)!;
  const rows = cls.aggregate.filter((a) => a.subject === subject);
  const overall = rows.length ? Math.round(rows.reduce((a, b) => a + b.avg, 0) / rows.length) : 0;
  const weak = rows.slice().sort((a, b) => a.avg - b.avg).slice(0, 3);

  return (
    <div className="rounded-xl border border-line bg-surface p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-ink">
          {meta.emoji} {meta.label[locale]}
        </h3>
        <span className="text-sm text-ink-muted tabular-nums">
          {tr("teacher.aggregateMastery")}: {overall}/100
        </span>
      </div>
      <ul className="mt-3 space-y-2">
        {rows.map((r) => (
          <li key={r.topic}>
            <div className="flex justify-between text-xs text-ink-muted">
              <span>{r.topic}</span>
              <span className="tabular-nums">{r.avg}</span>
            </div>
            <div className="mt-1 h-1.5 bg-surface-2 rounded overflow-hidden">
              <div
                className={
                  "h-full " +
                  (r.avg >= 70 ? "bg-emerald-500" : r.avg >= 40 ? "bg-amber-500" : "bg-red-500")
                }
                style={{ width: `${r.avg}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 text-xs text-ink-subtle">
        {tr("teacher.weakest")}: {weak.map((w) => w.topic).join(" · ")}
      </div>
    </div>
  );
}
