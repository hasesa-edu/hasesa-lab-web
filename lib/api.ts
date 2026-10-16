import type { Locale } from "./i18n";
import type { Grade, Subject } from "./experiments";

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
  grade: Grade | null;
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
  language: Locale;
  region?: string;
  school?: string;
  under18?: boolean;
  subjects?: Subject[];
  grade?: Grade | null;
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

export type ProgressDTO = {
  experimentId: string;
  status: "started" | "done";
  observations: string | null;
  updatedAt: string;
  completedAt: string | null;
};

export async function apiGetProgress(): Promise<ProgressDTO[]> {
  const res = await fetch("/api/progress");
  const data = await jsonOrThrow(res);
  return data.progress ?? [];
}

export async function apiSaveProgress(input: {
  experimentId: string;
  status?: "started" | "done";
  observations?: string;
}): Promise<ProgressDTO> {
  const res = await fetch("/api/progress", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = await jsonOrThrow(res);
  return data.progress;
}
