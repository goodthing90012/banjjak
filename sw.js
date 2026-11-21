// 반짝 수집장 서비스 워커 — 업데이트할 때마다 VERSION을 올리세요.
const VERSION = 'banjjak-v13';
const FONTS = 'banjjak-fonts';
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './manifest.webmanifest',
  './vendor/three.module.min.js',
  './vendor/jsm/environments/RoomEnvironment.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', e => {
  // cache: 'reload' — GitHub Pages의 10분 캐시를 건너뛰고 원본을 받아옴
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('message', e => { if (e.data === 'skipWaiting') self.skipWaiting(); });

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== FONTS).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // 구글 폰트: 캐시를 먼저 보여주고 뒤에서 갱신
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(FONTS).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }

  if (url.origin !== location.origin) return;

  // 페이지 이동: 오프라인이면 캐시된 index.html
  if (req.mode === 'navigate') {
    e.respondWith(caches.match('./index.html').then(hit => hit || fetch(req)));
    return;
  }

  // 나머지: 캐시 먼저, 없으면 받아서 저장
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(r => {
    if (r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return r;
  })));
});
