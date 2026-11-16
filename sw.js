
const CACHE_NAME = "student-hub-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.min.css",
    "./script.min.js"
];

// Install and save files in cache
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Remove old cache
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (names) {
            return Promise.all(
                names.map(function (name) {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});

// Load cached files when available
self.addEventListener("fetch", function (event) {
    if (event.request.method !== "GET") return;

    const url = new URL(event.request.url);

    if (url.origin !== self.location.origin) return;

    event.respondWith(
        caches.match(event.request).then(function (cachedFile) {
            if (cachedFile) {
                return cachedFile;
            }

            return fetch(event.request);
        })
    );
});
