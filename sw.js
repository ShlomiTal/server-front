const CACHE_NAME = 'crypto-signal-v1';
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(['/', '/index.html', '/styles.css', '/app.js']))
  );
});
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request) || fetch(e.request));
});