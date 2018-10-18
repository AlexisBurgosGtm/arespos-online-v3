const cacheName = 'aresonline-v2';

const staticAssets = [
  './',
  './app.js',
  './style.css',
  './js/funciones.js',
  './js/framework7.js',
  './js/jquery-1.10.1.min.js',
  './js/jquery.swipebox.js',
  './js/my-app.js',
  './index.html',
  './precios.html',
  './ventas.html',
  './manifest.json',
  './css/animations.css',
  './css/reset.css',
  './css/framework7.css',
  './css/swipebox.css',
  './css/colors/blue.css',
  './css/img/icons.png',
  './css/img/icons.svg',
  './images/logoares.png',
  './images/colors/blue/bg.jpg',
  './images/colors/blue/header.jpg',
  './fallback.json',
  './images/icons/white/menu.png',
  './images/icons/white/home.png',
  './images/icons/white/briefcase.png',
  './images/icons/white/toogle.png',
  './images/icons/white/responsive.png',
  './sw.js'
];

// './css/img/icons.png',
// './css/img/icons.svg',
// './css/img/loader.git',
// './images/colors/blue/bg.jpg',
// './images/colors/blue/header.jpg',

self.addEventListener('install', async function () {
  const cache = await caches.open(cacheName);
  cache.addAll(staticAssets);
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  return cachedResponse || fetch(request);
}

async function networkFirst(request) {
  const dynamicCache = await caches.open('news-dynamic');
  try {
    const networkResponse = await fetch(request);
    dynamicCache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (err) {
    const cachedResponse = await dynamicCache.match(request);
    return cachedResponse || await caches.match('./fallback.json');
  }
}