self.addEventListener('install', function(e) {
  console.log('Service Worker: Installed');
  e.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './css/home.css',
        './css/loader.css',
        './js/main.js',
        './componentes/index.js',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
        'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css'
      ]);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
