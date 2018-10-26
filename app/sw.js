var CACHE = 'aresonline-v4';
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
  './css/bootstrap.min.css',
  './css/animations.css',
  './css/reset.css',
  './css/framework7.css',
  './css/swipebox.css',
  './css/colors/blue.css',
  './css/img/icons.png',
  './css/img/icons.svg',
  './css/img/loader.gif',
  './images/logoares.png',
  './images/404.png',
  './images/load_posts_disabled.png',
  './images/colors/blue/bg.jpg',
  './images/colors/blue/header.jpg',
  './images/icons/white/menu.png',
  './images/icons/white/home.png',
  './images/icons/white/briefcase.png',
  './images/icons/white/toogle.png',
  './images/icons/white/responsive.png',
  './images/icons/white/settings.png',
  './data/productos.json',
  './data/clientes.json',
  './sw.js'
];

self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(caches.open(CACHE).then(function (cache) {
    cache.addAll(staticAssets);
  }));
});

self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');
  evt.respondWith(fromCache(evt.request));
  evt.waitUntil(
    update(evt.request)
    .then(refresh)
  );
});

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request);
  });
}

function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response.clone()).then(function () {
        return response;
        console.log('Cache actualizado');
      });
    });
  });
}

function refresh(response) {
  return self.clients.matchAll().then(function (clients) {
    clients.forEach(function (client) {
      var message = {
        type: 'refresh',
        url: response.url,
        eTag: response.headers.get('ETag')
      };
      client.postMessage(JSON.stringify(message));
    });
  });
}