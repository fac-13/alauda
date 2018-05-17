const staticAssets = [
  './',
  './style.css',
  './index.js',
  './images/icons/icon-72x72.png',
  './images/icons/icon-96x96.png',
  './images/icons/icon-128x128.png',
  './images/icons/icon-144x144.png',
  './images/icons/icon-152x152.png',
  './images/icons/icon-192x192.png',
  './images/icons/icon-384x384.png',
  './images/icons/icon-512x512.png',
  './images/back.svg',
  './images/gift_white.svg',
  './images/logo.svg',
  './images/bird.png',
  '/try',
  '/randomContent',
  './firstContent',
];

/**
 * On install cache the static assets
 */
self.addEventListener('install', async (event) => {
  const cache = await caches.open('static');
  cache.addAll(staticAssets);
});

/**
 * Intercepts all fetch requests and respond with the cached content
 */
self.addEventListener('fetch', (event) => {
  const req = event.request;
  event.respondWith(cacheFirst(req));
});


/**
 * Checks if there is a match in the cache, if so returns the cached content, otherwise makes a network request
 */
async function cacheFirst(req) {
  const cachedResponse = await caches.match(req);
  return cachedResponse || fetch(req);
}
