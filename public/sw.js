const staticAssets = [
  "./",
  "./style.css",
  "./index.js",
];


self.addEventListener('install', async event => {
  const cache = await caches.open('static');
  cache.addAll(staticAssets);
})

self.addEventListener('fetch', function(event) {

  console.log(event.request.url);
  
  });