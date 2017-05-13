var cacheName = 'csswizardry:0044';
var cacheFiles = [
  '/',
  '/about/',
  '/services/',
  '/contact/',
  '/offline/',
  '/case-studies/ocado-workshop/',
  '/2015/03/more-transparent-ui-code-with-namespaces/',
  '/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/',
  '/2016/02/mixins-better-for-performance/',
  '/2016/10/pragmatic-practical-progressive-theming-with-custom-properties/',
];





self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        //console.log('Opened cache');
        return cache.addAll(cacheFiles);
      })
  );
});





self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Grab the asset from SW cache.
        if (response) {
          return response;
        }
        return fetch(event.request);
    }).catch(function() {
      // Can't access the network return an offline page from the cache
      return caches.match('/offline/');
    })
  );
});





// Empty out any caches that don’t match the ones listed.
self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['csswizardry:0044'];

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
