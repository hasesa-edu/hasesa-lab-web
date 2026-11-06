import "server-only";
import { getAccess, type Access } from "@/lib/access";
import { getStudentState, type StudentState } from "@/lib/progress";

/** The current visitor's access level, plus their saved progress when signed in. */
export async function getViewer(): Promise<{ access: Access; state: StudentState | null }> {
  const access = await getAccess();
  const state = access.userId ? await getStudentState(access.userId) : null;
  return { access, state };
}
