/** Only allow same-site relative paths as a post-login destination (no open redirects). */
export function safeNext(v: string | null | undefined): string | null {
  if (!v || !v.startsWith("/") || v.startsWith("//") || v.startsWith("/\\")) return null;
  return v.slice(0, 300);
}
