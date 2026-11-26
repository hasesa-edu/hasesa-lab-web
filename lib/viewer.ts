import "server-only";
import { getAccess, type Access } from "@/lib/access";
import type { StudentState } from "@/lib/progress";
import { myStudentState } from "@/lib/my-progress";

/** The current visitor's access level, plus their saved progress when signed in. */
export async function getViewer(): Promise<{ access: Access; state: StudentState | null }> {
  const access = await getAccess();
  const state = access.userId ? await myStudentState(access.userId) : null;
  return { access, state };
}
