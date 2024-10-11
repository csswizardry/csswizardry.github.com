var cacheName = 'csswizardry:0156';
var cacheFiles = [
  '/',
  '/about/',
  '/services/',
  '/contact/',
  '/sentinel/',
  '/offline/',
  '/case-studies/ocado-workshop/',
  '/2015/03/more-transparent-ui-code-with-namespaces/',
  '/2018/06/image-inconsistencies-how-and-when-browsers-download-images/',
  '/2018/11/css-and-network-performance/',
  '/2019/03/cache-control-for-civilians/',
  '/2019/08/time-to-first-byte-what-it-is-and-why-it-matters/',
  '/2020/05/the-fastest-google-fonts/',
  '/2021/02/measuring-network-performance-in-mobile-safari/',
  '/2022/03/optimising-largest-contentful-paint/',
  '/2023/07/core-web-vitals-for-search-engine-optimisation/',
  '/2023/07/in-defence-of-domcontentloaded/',
  '/2023/09/the-ultimate-lqip-lcp-technique/',
  '/2023/10/the-three-c-concatenate-compress-cache/',
  '/2023/10/what-is-the-maximum-max-age/'
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

  var cacheWhitelist = ['csswizardry:0156'];

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
