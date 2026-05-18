"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { useUser } from "@/components/UserProvider";
import { SUBJECTS, type Subject } from "@/lib/lessons";
import { aggregateMastery, classesForTeacher, createClass, type ClassRoom } from "@/lib/store";

export default function TeacherPage() {
  const { tr, locale } = useLocale();
  const { user, refresh, ready } = useUser();
  const router = useRouter();

  const [classes, setClasses] = useState<ClassRoom[]>([]);
  const [name, setName] = useState("");
  const [activeCode, setActiveCode] = useState<string | undefined>();

  useEffect(() => {
    if (ready && !user) router.push("/login");
    if (ready && user && user.role !== "teacher") router.push("/dashboard");
  }, [ready, user, router]);

  useEffect(() => {
    if (user?.role === "teacher") {
      const list = classesForTeacher(user.id);
      setClasses(list);
      if (list.length && !activeCode) setActiveCode(list[0].code);
    }
  }, [user, activeCode]);

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !name.trim()) return;
    const cls = createClass(name.trim(), user.id);
    setClasses(classesForTeacher(user.id));
    setActiveCode(cls.code);
    setName("");
    refresh();
  }

  if (!ready || !user || user.role !== "teacher") {
    return <div className="max-w-3xl mx-auto px-4 py-10 text-stone-500">{tr("common.loading")}</div>;
  }

  const active = classes.find((c) => c.code === activeCode);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-stone-900">{tr("teacher.title")}</h1>
      <p className="text-stone-600 mt-1 text-sm max-w-2xl">{tr("teacher.subtitle")}</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <aside className="md:col-span-1">
          <form onSubmit={handleCreate} className="rounded-lg border border-stone-200 bg-white p-4">
            <h2 className="font-semibold text-stone-900">{tr("teacher.createClass")}</h2>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={tr("teacher.className")}
              className="mt-3 w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-brand bg-white text-sm"
            />
            <button
              type="submit"
              disabled={!name.trim()}
              className="mt-3 w-full px-3 py-2 bg-brand text-white rounded-md hover:bg-brand-dark disabled:opacity-40 text-sm"
            >
              {tr("teacher.create")}
            </button>
          </form>

          <h3 className="mt-6 text-sm font-medium text-stone-500 uppercase tracking-wider">
            {tr("teacher.title")}
          </h3>
          {classes.length === 0 ? (
            <p className="mt-2 text-sm text-stone-500">{tr("teacher.noClasses")}</p>
          ) : (
            <ul className="mt-2 space-y-1">
              {classes.map((c) => (
                <li key={c.code}>
                  <button
                    onClick={() => setActiveCode(c.code)}
                    className={
                      "w-full text-left px-3 py-2 rounded text-sm border " +
                      (c.code === activeCode
                        ? "border-brand bg-brand/5"
                        : "border-stone-200 hover:border-brand")
                    }
                  >
                    <div className="font-medium text-stone-900">{c.name}</div>
                    <div className="text-xs text-stone-500">
                      {c.code} · {c.mockStudents.length + c.joinedUserIds.length} {tr("teacher.students")}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <section className="md:col-span-2">
          {!active ? (
            <div className="rounded-lg border border-dashed border-stone-300 bg-white p-10 text-center text-stone-500">
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

function ClassDetail({ cls, tr, locale }: { cls: ClassRoom; tr: (k: any) => string; locale: "en" | "am" | "om" }) {
  const total = cls.mockStudents.length + cls.joinedUserIds.length;
  return (
    <div>
      <div className="rounded-lg border border-brand/20 bg-brand/5 p-4">
        <div className="text-xs text-brand-dark uppercase tracking-wider font-medium">{tr("teacher.share")}</div>
        <div className="mt-1 text-3xl font-mono font-bold text-brand-dark tracking-widest">{cls.code}</div>
        <div className="mt-1 text-xs text-stone-600">{total} {tr("teacher.students")}</div>
      </div>

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
  cls: ClassRoom;
  subject: Subject;
  tr: (k: any) => string;
  locale: "en" | "am" | "om";
}) {
  const meta = SUBJECTS.find((s) => s.id === subject)!;
  const rows = aggregateMastery(cls, subject);
  const overall = rows.length ? Math.round(rows.reduce((a, b) => a + b.avg, 0) / rows.length) : 0;
  const weak = rows.slice().sort((a, b) => a.avg - b.avg).slice(0, 3);

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-stone-900">
          {meta.emoji} {meta.label[locale]}
        </h3>
        <span className="text-sm text-stone-600">{tr("teacher.aggregateMastery")}: {overall}/100</span>
      </div>
      <ul className="mt-3 space-y-2">
        {rows.map((r) => (
          <li key={r.topic}>
            <div className="flex justify-between text-xs text-stone-600">
              <span>{r.topic}</span>
              <span>{r.avg}</span>
            </div>
            <div className="mt-0.5 h-1.5 bg-stone-100 rounded overflow-hidden">
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
      <div className="mt-3 text-xs text-stone-500">
        {tr("teacher.weakest")}: {weak.map((w) => w.topic).join(" · ")}
      </div>
    </div>
  );
}
