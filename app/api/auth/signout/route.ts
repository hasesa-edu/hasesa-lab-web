import { getSession } from "@/lib/auth/session";
import { revokeSession } from "@/lib/auth/hasesa-api";

export const runtime = "nodejs";

export async function POST() {
  const session = await getSession();
  // End the Hasesa Accounts session too, so its refresh token stops working.
  if (session.refreshToken) await revokeSession(session.refreshToken);
  session.destroy();
  return Response.json({ ok: true });
}
