//Asignar nombre y version de la cache
const CACHE_NAME = 'v1_cache_JBN_PWA';

//configuracion de los ficheros
var urlsToCache = [
    '/index.html',
    '/sw.js',
    '/main.js',
    '/manifest.js',
    '/windows11/StoreLogo.scale-125.png',
    '/windows11/StoreLogo.scale-150.png',
    '/windows11/StoreLogo.scale-200.png',
    '/windows11/Square44x44Logo.targetsize-256.png'
];

// Instala el Service Worker y almacena los archivos en cache
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache abierta');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta las solicitudes de red y devuelve los archivos almacenados en cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Devuelve la respuesta almacenada en cache, si existe
        if (response) {
          return response;
        }
        // Si no, solicita la respuesta a la red
        return fetch(event.request);
      })
  );
});

// Elimina caches antiguas
self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['my-pwa-cache'];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});