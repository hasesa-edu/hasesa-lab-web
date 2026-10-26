/** Only allow same-site relative paths as a post-login destination (no open redirects). */
export function safeNext(v: string | null | undefined): string | null {
  if (!v || !v.startsWith("/") || v.length > 300) return null;
  // URL parsers drop tabs/newlines and treat "\\" like "/", so "/\t/evil.com"
  // would become "//evil.com". Reject control characters, then check that the
  // path really resolves on our own origin.
  if (/[\u0000-\u001f\u007f\\]/.test(v)) return null;
  const base = "https://same.origin";
  let url: URL;
  try {
    url = new URL(v, base);
  } catch {
    return null;
  }
  if (url.origin !== base) return null;
  return url.pathname + url.search + url.hash;
}
