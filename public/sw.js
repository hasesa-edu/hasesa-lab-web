/* AI-Edu Ethiopia — minimal demo service worker */
const VERSION = "v1";
const APP_SHELL = "ai-edu-shell-" + VERSION;
const STATIC = "ai-edu-static-" + VERSION;
const PAGES = "ai-edu-pages-" + VERSION;

const PRECACHE_URLS = ["/", "/lessons", "/chat", "/manifest.json", "/icon.svg"];

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

  // HTML / navigation — network-first, fall back to cache
  if (req.mode === "navigate" || req.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(req);
          if (res.ok) {
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
