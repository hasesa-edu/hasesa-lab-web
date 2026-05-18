import type { Locale } from "./i18n";
import type { Subject } from "./lessons";

export type Role = "student" | "teacher";

export type UserDTO = {
  id: string;
  email: string;
  displayName: string;
  role: Role;
  language: Locale;
  region?: string | null;
  school?: string | null;
  under18: boolean;
  extendedRetention: boolean;
  subjects: Subject[];
  joinedClasses: string[];
};

async function jsonOrThrow(res: Response): Promise<any> {
  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    /* keep null */
  }
  if (!res.ok) {
    const msg = data?.error || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

export async function apiSignup(input: {
  email: string;
  password: string;
  displayName: string;
  role: Role;
  language: Locale;
  region?: string;
  school?: string;
  under18?: boolean;
  subjects?: Subject[];
}) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  return jsonOrThrow(res);
}

export async function apiSignin(email: string, password: string) {
  const res = await fetch("/api/auth/signin", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return jsonOrThrow(res);
}

export async function apiSignout() {
  await fetch("/api/auth/signout", { method: "POST" });
}

export async function apiMe(): Promise<UserDTO | null> {
  const res = await fetch("/api/user/me");
  const data = await jsonOrThrow(res);
  return data.user ?? null;
}

export async function apiPatchMe(patch: Partial<UserDTO>): Promise<UserDTO> {
  const res = await fetch("/api/user/me", {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(patch),
  });
  const data = await jsonOrThrow(res);
  return data.user;
}

export async function apiGetMastery(): Promise<Record<string, Record<string, number>>> {
  const res = await fetch("/api/mastery");
  const data = await jsonOrThrow(res);
  return data.mastery ?? {};
}

export async function apiBumpMastery(subject: Subject, topic: string, delta: number): Promise<number> {
  const res = await fetch("/api/mastery", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ subject, topic, delta }),
  });
  const data = await jsonOrThrow(res);
  return data.value;
}

export async function apiSetMastery(subject: Subject, topic: string, value: number): Promise<number> {
  const res = await fetch("/api/mastery", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ subject, topic, value }),
  });
  const data = await jsonOrThrow(res);
  return data.value;
}

export type TeacherClass = {
  code: string;
  name: string;
  memberCount: number;
  aggregate: {
    subject: string;
    topic: string;
    avg: number;
    weight: number;
    lessonId: string;
    n: number;
  }[];
};

export async function apiListClasses(): Promise<TeacherClass[]> {
  const res = await fetch("/api/classes");
  const data = await jsonOrThrow(res);
  return data.classes ?? [];
}

export async function apiCreateClass(name: string): Promise<{ code: string; name: string }> {
  const res = await fetch("/api/classes", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return jsonOrThrow(res);
}

export async function apiJoinClass(code: string): Promise<{ code: string; name: string }> {
  const res = await fetch(`/api/classes/${encodeURIComponent(code)}/join`, { method: "POST" });
  return jsonOrThrow(res);
}
