/* SJ Online PWA — SWR + cache expiry (TTL) */
const CACHE_SHELL = "sj-shell-v5";
const CACHE_DATA = "sj-data-v5";

/* ---- Expiry (seconds) ---- */
const TTL = {
  json: 5 * 60,          // قیمتیں / کیٹلاگ: 5 منٹ
  html: 60 * 60,         // صفحات: 1 گھنٹہ
  image: 7 * 24 * 60 * 60, // تصاویر: 7 دن
  shell: 24 * 60 * 60,   // آئیکن / manifest: 24 گھنٹے
  default: 60 * 60       // باقی: 1 گھنٹہ
};

const SHELL_URLS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./offline.html",
  "./vendor.html",
  "./vendor-register.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_SHELL).then((cache) =>
      Promise.all(SHELL_URLS.map((u) => cache.add(u).catch(() => null)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_SHELL && k !== CACHE_DATA)
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/** Response کو timestamp کے ساتھ کیش میں رکھیں */
async function putWithTimestamp(cache, req, res) {
  if (!res || !res.ok) return;
  const headers = new Headers(res.headers);
  headers.set("sw-cached-at", String(Date.now()));
  const body = await res.clone().blob();
  await cache.put(req, new Response(body, {
    status: res.status,
    statusText: res.statusText,
    headers
  }));
}

/** کیش شدہ جواب کی عمر چیک — ختم ہو تو null */
function isFresh(res, maxAgeSec) {
  if (!res) return false;
  const t = res.headers.get("sw-cached-at");
  if (!t) return true; // پرانی entries بغیر timestamp — ایک بار استعمال
  const age = (Date.now() - parseInt(t, 10)) / 1000;
  return age <= maxAgeSec;
}

/** Stale-While-Revalidate + TTL */
function staleWhileRevalidate(req, cacheName, maxAgeSec) {
  return caches.open(cacheName).then(async (cache) => {
    const cached = await cache.match(req);
    const fresh = isFresh(cached, maxAgeSec);

    const networkPromise = fetch(req)
      .then(async (res) => {
        if (res && res.ok) await putWithTimestamp(cache, req, res);
        return res;
      })
      .catch(() => null);

    // تازہ کیش → فوراً دو + پس منظر میں اپڈیٹ
    if (cached && fresh) {
      networkPromise.catch(() => {});
      return cached;
    }

    // پرانی / بغیر کیش → نیٹ ورک ترجیح؛ فیل ہو تو پرانی کیش (اگر ہو)
    const net = await networkPromise;
    if (net) return net;
    if (cached) return cached;

    if (req.mode === "navigate") {
      return (await cache.match("./offline.html")) || (await cache.match("./index.html"));
    }
    return new Response("", { status: 503, statusText: "Offline" });
  });
}

/** Network First + TTL cache store */
function networkFirst(req, cacheName, maxAgeSec) {
  return fetch(req, { cache: "no-store" })
    .then(async (res) => {
      if (res && res.ok) {
        const cache = await caches.open(cacheName);
        await putWithTimestamp(cache, req, res);
      }
      return res;
    })
    .catch(async () => {
      const cached = await caches.match(req);
      if (cached && isFresh(cached, maxAgeSec * 12)) return cached; // آف لائن: JSON 1 گھنٹہ تک بیک اپ
      if (cached) return cached;
      if (/\.json(\?|$)/i.test(req.url)) {
        return new Response(JSON.stringify({ offline: true }), {
          headers: { "Content-Type": "application/json" }
        });
      }
      return caches.match("./offline.html");
    });
}

function isJson(url) {
  return /\.json(\?|$)/i.test(url);
}
function isNavigate(req) {
  return req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html");
}
function isImage(url) {
  return /\.(png|jpg|jpeg|gif|webp|svg)(\?|$)/i.test(url);
}
function isShellAsset(url) {
  return /manifest\.json|icon-\d+\.png/i.test(url);
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = req.url;

  if (/firebaseio\.com|googleapis\.com|gstatic\.com/i.test(url)) {
    return;
  }

  if (isJson(url)) {
    event.respondWith(networkFirst(req, CACHE_DATA, TTL.json));
    return;
  }

  if (isNavigate(req)) {
    event.respondWith(staleWhileRevalidate(req, CACHE_SHELL, TTL.html));
    return;
  }

  if (isImage(url)) {
    event.respondWith(staleWhileRevalidate(req, CACHE_DATA, TTL.image));
    return;
  }

  if (isShellAsset(url)) {
    event.respondWith(staleWhileRevalidate(req, CACHE_SHELL, TTL.shell));
    return;
  }

  event.respondWith(staleWhileRevalidate(req, CACHE_SHELL, TTL.default));
});
