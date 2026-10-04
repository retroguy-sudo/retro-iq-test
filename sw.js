const C='retro-iq-test-gh-v1';
const ROOT=new URL('./',self.location).href;
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll([ROOT,'iq-192.png','iq-512.png','iq-apple-touch-icon.png','manifest.webmanifest'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);if(u.origin!==location.origin)return;
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(ROOT,cp))}return r}).catch(()=>caches.match(ROOT)));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
