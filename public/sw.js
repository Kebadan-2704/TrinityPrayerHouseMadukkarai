const CACHE_NAME = 'tph-cache-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/manifest.json',
  '/logo-black.png',
  '/prayer.png',
  '/youth.png',
  '/church-interior.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then((response) => {
        if (response) return response;
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
      });
    })
  );
});

self.addEventListener('push', (event) => {
  event.waitUntil(
    (async () => {
      let data = {};
      try {
        data = event.data ? await event.data.json() : {};
      } catch (_) { /* ignore malformed push payload */ }

      try {
        await self.registration.showNotification(
          data.title || 'Trinity Prayer House',
          {
            body: data.body || 'We will have a meet in 10 minutes. Join us!',
            icon: '/tph-icon-192.png',
            badge: '/tph-icon-192.png',
            data: { url: data.url || '/online-meet' }
          }
        );
      } catch (_) { /* ignore notification permission errors */ }
    })()
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    (async () => {
      try {
        const allClients = await clients.matchAll({ type: 'window', includeUncontrolled: true });
        for (const client of allClients) {
          if (client.url === event.notification.data.url && 'focus' in client) {
            return client.focus();
          }
        }
        await clients.openWindow(event.notification.data.url);
      } catch (_) { /* ignore */ }
    })()
  );
});
