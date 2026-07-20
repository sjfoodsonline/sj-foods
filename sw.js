// Minimal service worker — required so the browser treats this site as an installable app.
self.addEventListener("install", (e) => { self.skipWaiting(); });
self.addEventListener("activate", (e) => { self.clients.claim(); });
self.addEventListener("fetch", (e) => {
  // Network-first: always try the real network so rates/prices never go stale.
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
