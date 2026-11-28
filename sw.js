// Minimal service worker: lets Android Chrome show ride reminders as system notifications while the app is open
// or just backgrounded. No caching, so the live site always serves the latest index.html.
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(cs=>cs.length?cs[0].focus():self.clients.openWindow("./")))});
