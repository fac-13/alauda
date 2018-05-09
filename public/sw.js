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
];


self.addEventListener('install', async event => {
  const cache = await caches.open('static');
  cache.addAll(staticAssets);
})

self.addEventListener('fetch', event => {
  const req = event.request;
  console.log("Req:", req);
  event.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
  const cachedResponse = await caches.match(req);
  return cachedResponse || fetch(req);
}