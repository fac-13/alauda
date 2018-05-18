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
  './images/back_min.svg', 
  './images/back.svg',
  './images/gift_white.svg',
  './images/logo.svg',
  './images/bird.png',
  '/randomGift',
  '/randomContent',
  // '/tryContent',
  // '/profile/',
  // '/userContent/', 
];

/**
 * On install cache the static assets
 */
self.addEventListener('install', async (event) => {
  const cache = await caches.open('static');
  cache.addAll(staticAssets);
});

/**
 * Intercepts all fetch requests and respond with the appropriate caching strategy. 
 * Cache first for static assets and network first for dynamic content (e.g. api calls responses)
 */
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);
  //fetching from our own site (from our server) --> e.g. for static assets 
  //excluding fetch requests for api content 
  if (url.origin == location.origin && req.url.indexOf('api') == -1) {
    console.log("Caching URL", url)
    event.respondWith(cacheFirst(req));
  }
  //fetching from external sources (e.g. fontawesome, api calls)
  else {
    event.respondWith(networkFirst(req));
  }
});


/**
 * Checks if there is a match in the cache, if so returns the cached content, otherwise makes a network request
 */
async function cacheFirst(req) {
  console.log("Cache first reached")
  const cachedResponse = await caches.match(req);
  return cachedResponse || fetch(req);
}


/*
 * Check if the content can be fetched from the network, if so cache it and return the content,
 *  otherwise check if there is an existing match in the cache
 */
async function networkFirst(req) {
  console.log("Network first reached")
  const cache = await caches.open('content');
  try {
    const res = await fetch(req);
    cache.put(req, res.clone());
    return res;
  }
  catch (error) {
    const cachedResponse = await cache.match(req);
    return cachedResponse || await caches.match("./manifest.json");
  }
}



