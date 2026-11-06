import type { Locale } from "./i18n";

export type UserDTO = {
  id: string;
  email: string;
  displayName: string;
  language: Locale;
  region?: string | null;
  school?: string | null;
  under18: boolean;
  extendedRetention: boolean;
  avatarUrl: string | null;
  paidUntil: string | null;
  role: "student" | "guide";
  access: "signed-in" | "enrolled" | "guide";
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


async function post(url: string, body: unknown): Promise<any> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  return jsonOrThrow(res);
}

export type UnitStateDTO = { status: "started" | "completed" | "tested_out"; score: number } | null;

export function apiEnroll(moduleId: string, action: "start" | "drop"): Promise<{ status: string }> {
  return post("/api/modules/enroll", { moduleId, action });
}

export function apiSaveStep(input: { moduleId: string; stepId: string; done?: boolean; notes?: string }): Promise<{ step: { done: boolean; notes: string | null } }> {
  return post("/api/steps", input);
}

export function apiAttempt(input: { unitId: string; questionId: string; answer: string }): Promise<{
  correct: boolean;
  explanation: string;
  answer: string;
  unit: UnitStateDTO;
}> {
  return post("/api/attempts", input);
}

export function apiTestOut(input: { unitId: string; answers: Record<string, string> }): Promise<{
  score: number;
  passed: boolean;
  results: { id: string; correct: boolean; explanation: string; answer: string }[];
  unit: UnitStateDTO;
}> {
  return post("/api/attempts/testout", input);
}

export function apiFeedbackRead(id: string): Promise<{ ok: true }> {
  return post("/api/feedback/read", { id });
}
