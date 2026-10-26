/* Hasesa service worker */
const VERSION = "v4";
const APP_SHELL = "hasesa-shell-" + VERSION;
const STATIC = "hasesa-static-" + VERSION;
const PAGES = "hasesa-pages-" + VERSION;

// Precache only the home shell + essentials.
const PRECACHE_URLS = ["/", "/manifest.json", "/icon.svg"];

// Only public pages are kept for offline use. Signed-in pages (guides,
// dashboard, account, chat) are never cached, so paid content and personal
// details don't stay on a shared phone after sign-out or after a pass ends.
const PUBLIC_PAGES = ["/", "/terms", "/privacy", "/refund"];

// Bump VERSION when this list changes so old caches get evicted on activate.

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(APP_SHELL).then((cache) => cache.addAll(PRECACHE_URLS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== APP_SHELL && k !== STATIC && k !== PAGES)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Never cache API
  if (url.pathname.startsWith("/api/")) return;

  // Static assets — cache-first
  if (url.pathname.startsWith("/_next/static/") || /\.(svg|png|jpg|jpeg|webp|woff2?|css|js)$/.test(url.pathname)) {
    event.respondWith(
      caches.open(STATIC).then(async (cache) => {
        const hit = await cache.match(req);
        if (hit) return hit;
        try {
          const res = await fetch(req);
          if (res.ok) cache.put(req, res.clone());
          return res;
        } catch {
          return hit || Response.error();
        }
      })
    );
    return;
  }

  // HTML / navigation — network-first, fall back to cache (public pages only)
  if (!PUBLIC_PAGES.includes(url.pathname)) return;
  if (req.mode === "navigate" || req.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(req);
          if (res.ok && !res.redirected) {
            const copy = res.clone();
            caches.open(PAGES).then((c) => c.put(req, copy));
          }
          return res;
        } catch {
          const hit = (await caches.match(req)) || (await caches.match("/"));
          return hit || new Response("Offline", { status: 503, headers: { "content-type": "text/plain" } });
        }
      })()
    );
  }
});
