self.addEventListener('push', (event) => {
  let data = { title: 'NUEVA LISTA', body: 'SE HA RECIBIDO UNA NUEVA LISTA' };
  try { if (event.data) data = event.data.json(); } catch (e) {}

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      vibrate: [300, 120, 300, 120, 300],
      tag: 'lista-bodega',
      renotify: true
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
