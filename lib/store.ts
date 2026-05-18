"use client";

import type { Locale } from "./i18n";
import type { Subject } from "./lessons";
import { allTopicsForSubject, SUBJECTS } from "./lessons";

export type Role = "student" | "teacher";

export type User = {
  id: string;
  username: string;
  password: string; // DEMO ONLY — plaintext in localStorage
  role: Role;
  language: Locale;
  region?: string;
  school?: string;
  under18?: boolean;
  subjects: Subject[];
  createdAt: string;
  mastery: Record<Subject, Record<string, number>>;
  joinedClasses: string[];
};

export type ClassRoom = {
  code: string;
  name: string;
  teacherId: string;
  createdAt: string;
  mockStudents: { id: string; mastery: Record<Subject, Record<string, number>> }[];
  joinedUserIds: string[];
};

export type StoreShape = {
  users: Record<string, User>;
  currentUserId?: string;
  classes: Record<string, ClassRoom>;
};

const KEY = "ai-edu-store-v1";

function emptyStore(): StoreShape {
  return { users: {}, classes: {} };
}

export function readStore(): StoreShape {
  if (typeof window === "undefined") return emptyStore();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyStore();
    return JSON.parse(raw) as StoreShape;
  } catch {
    return emptyStore();
  }
}

export function writeStore(store: StoreShape) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(store));
  window.dispatchEvent(new Event("ai-edu-store-change"));
}

export function updateStore(updater: (store: StoreShape) => StoreShape) {
  const next = updater(readStore());
  writeStore(next);
  return next;
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

export function emptyMastery(): Record<Subject, Record<string, number>> {
  const out: Record<Subject, Record<string, number>> = {} as any;
  for (const s of SUBJECTS) {
    out[s.id] = {};
    for (const t of allTopicsForSubject(s.id)) {
      out[s.id][t.topic] = 50;
    }
  }
  return out;
}

export function createUser(input: {
  username: string;
  password: string;
  role: Role;
  language: Locale;
  region?: string;
  school?: string;
  under18?: boolean;
  subjects?: Subject[];
}): { ok: true; user: User } | { ok: false; reason: "taken" | "required" } {
  if (!input.username.trim() || !input.password.trim()) return { ok: false, reason: "required" };
  const store = readStore();
  const key = input.username.trim().toLowerCase();
  if (store.users[key]) return { ok: false, reason: "taken" };
  const user: User = {
    id: uid(),
    username: input.username.trim(),
    password: input.password,
    role: input.role,
    language: input.language,
    region: input.region,
    school: input.school,
    under18: input.under18,
    subjects: input.subjects ?? ["math", "physics", "chemistry", "biology"],
    createdAt: new Date().toISOString(),
    mastery: emptyMastery(),
    joinedClasses: [],
  };
  store.users[key] = user;
  store.currentUserId = user.id;
  writeStore(store);
  return { ok: true, user };
}

export function signIn(username: string, password: string): { ok: true; user: User } | { ok: false } {
  const store = readStore();
  const key = username.trim().toLowerCase();
  const user = store.users[key];
  if (!user || user.password !== password) return { ok: false };
  store.currentUserId = user.id;
  writeStore(store);
  return { ok: true, user };
}

export function signOut() {
  updateStore((s) => ({ ...s, currentUserId: undefined }));
}

export function currentUser(): User | undefined {
  const s = readStore();
  if (!s.currentUserId) return undefined;
  return Object.values(s.users).find((u) => u.id === s.currentUserId);
}

export function updateCurrentUser(updater: (u: User) => User) {
  const s = readStore();
  if (!s.currentUserId) return;
  const key = Object.keys(s.users).find((k) => s.users[k].id === s.currentUserId);
  if (!key) return;
  s.users[key] = updater(s.users[key]);
  writeStore(s);
}

export function bumpMastery(subject: Subject, topic: string, delta: number) {
  updateCurrentUser((u) => {
    const cur = u.mastery[subject]?.[topic] ?? 50;
    const next = Math.max(0, Math.min(100, cur + delta));
    return {
      ...u,
      mastery: {
        ...u.mastery,
        [subject]: { ...(u.mastery[subject] ?? {}), [topic]: next },
      },
    };
  });
}

export function setMastery(subject: Subject, topic: string, value: number) {
  updateCurrentUser((u) => ({
    ...u,
    mastery: {
      ...u.mastery,
      [subject]: { ...(u.mastery[subject] ?? {}), [topic]: Math.max(0, Math.min(100, value)) },
    },
  }));
}

// ----- Classes -----

function generateClassCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return out;
}

function seedMockStudents(count: number): ClassRoom["mockStudents"] {
  const out: ClassRoom["mockStudents"] = [];
  for (let i = 0; i < count; i++) {
    const mastery: Record<Subject, Record<string, number>> = {} as any;
    for (const s of SUBJECTS) {
      mastery[s.id] = {};
      for (const t of allTopicsForSubject(s.id)) {
        const base = 30 + Math.floor(Math.random() * 55); // 30..85
        mastery[s.id][t.topic] = base;
      }
    }
    out.push({ id: uid(), mastery });
  }
  return out;
}

export function createClass(name: string, teacherId: string): ClassRoom {
  let code = generateClassCode();
  const s = readStore();
  while (s.classes[code]) code = generateClassCode();
  const cls: ClassRoom = {
    code,
    name,
    teacherId,
    createdAt: new Date().toISOString(),
    mockStudents: seedMockStudents(8),
    joinedUserIds: [],
  };
  s.classes[code] = cls;
  writeStore(s);
  return cls;
}

export function classesForTeacher(teacherId: string): ClassRoom[] {
  return Object.values(readStore().classes).filter((c) => c.teacherId === teacherId);
}

export function joinClass(code: string, userId: string): ClassRoom | undefined {
  const s = readStore();
  const cls = s.classes[code.toUpperCase()];
  if (!cls) return undefined;
  if (!cls.joinedUserIds.includes(userId)) cls.joinedUserIds.push(userId);
  s.classes[code.toUpperCase()] = cls;
  const userKey = Object.keys(s.users).find((k) => s.users[k].id === userId);
  if (userKey && !s.users[userKey].joinedClasses.includes(cls.code)) {
    s.users[userKey].joinedClasses.push(cls.code);
  }
  writeStore(s);
  return cls;
}

export function aggregateMastery(cls: ClassRoom, subject: Subject): { topic: string; avg: number; weight: number; lessonId: string }[] {
  const topics = allTopicsForSubject(subject);
  const store = readStore();
  return topics.map((t) => {
    const values: number[] = [];
    for (const m of cls.mockStudents) {
      const v = m.mastery[subject]?.[t.topic];
      if (typeof v === "number") values.push(v);
    }
    for (const uid of cls.joinedUserIds) {
      const user = Object.values(store.users).find((u) => u.id === uid);
      const v = user?.mastery[subject]?.[t.topic];
      if (typeof v === "number") values.push(v);
    }
    const avg = values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0;
    return { topic: t.topic, avg, weight: t.weight, lessonId: t.lessonId };
  });
}
