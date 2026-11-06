/* Hasesa service worker */
const VERSION = "v7";
const APP_SHELL = "hasesa-shell-" + VERSION;
const STATIC = "hasesa-static-" + VERSION;
const PAGES = "hasesa-pages-" + VERSION;

// Precache only the home shell + essentials.
const PRECACHE_URLS = ["/", "/manifest.json", "/icon.svg"];

// Only public pages are kept for offline use. Signed-in pages (guides,
// dashboard, account, chat) are never cached, so guides and personal
// details don't stay on a shared phone after sign-out.
const PUBLIC_PAGES = ["/", "/terms", "/privacy"];

// Bump VERSION when this list changes so old caches get evicted on activate.

// On localhost (development) this worker removes itself and its caches, so
// it can never serve old JS or CSS while the app is being edited.
const IS_LOCAL = ["localhost", "127.0.0.1"].includes(self.location.hostname);

self.addEventListener("install", (event) => {
  if (IS_LOCAL) {
    self.skipWaiting();
    return;
  }
  event.waitUntil(
    caches.open(APP_SHELL).then((cache) => cache.addAll(PRECACHE_URLS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  if (IS_LOCAL) {
    event.waitUntil(
      (async () => {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
        await self.registration.unregister();
        // Reload open tabs so they fetch fresh code from the dev server.
        const tabs = await self.clients.matchAll({ type: "window" });
        tabs.forEach((t) => t.navigate(t.url));
      })()
    );
    return;
  }
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
  if (IS_LOCAL) return;
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Never cache API
  if (url.pathname.startsWith("/api/")) return;

  // Build assets — cache-first. Only /_next/static: its file names change with
  // every build, so a cached copy can never be stale. Other files (public/
  // images, dev-server chunks) go to the network so edits always show up.
  if (url.pathname.startsWith("/_next/static/")) {
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
