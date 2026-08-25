/**
 * All the data previously captured by Obs.js is now sent to SpeedCurve!
 *
 * I ❤️ SpeedCurve!
 */

(() => {
  const lux = window.LUX;

  // Bail out if SpeedCurve is not available.
  if (!lux || typeof lux.addData !== 'function') return;

  const obs = window.obs || Object.create(null);

  // Keys we intend to send. Keep in sync with obs.js
  const keys = [
    'canShowRichMedia',
    'connectionCapability',
    'conservationPreference',
    'cpuBucket',
    'cpuCategory',
    'dataSaver',
    'deliveryMode',
    'deviceCapability',
    'downlinkBucket',
    'downlinkCategory',
    'ramBucket',
    'ramCategory',
    'rttBucket',
    'rttCategory',
    'shouldAvoidRichMedia'
  ];

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(obs, key)) {
      lux.addData(key, obs[key]);
    }
  }

  // Keep source identifiers descriptive while limiting their beacon cost.
  const CUSTOM_DATA_KEYS = {
    cpuTier: 'cpu',
    lcpContentType: 'lcpt',
    fromCache: 'fc',
    contentEncoding: 'ce',
    responseStatus: 'rs',
    viaServiceWorker: 'sw',
    serviceWorkerStartupTime: 'sws',
    fromBackForwardCache: 'bfc',
    blockedFromBackForwardCache: 'bfcb',
    fromPrerender: 'pr',
    compressionDelta: 'cd',
    unattributedNavigationOverhead: 'uno',
    timeToLastByte: 'ttlb',
  };

  // Surface the browser-reported static CPU performance tier.
  if ('cpuPerformance' in navigator) {
    const { cpuPerformance } = navigator;
    if (
      typeof cpuPerformance === 'number' &&
      Number.isFinite(cpuPerformance) &&
      Number.isInteger(cpuPerformance) &&
      cpuPerformance >= 0
    ) {
      lux.addData(CUSTOM_DATA_KEYS.cpuTier, cpuPerformance);
    }
  }

  // Record whether the latest Largest Contentful Paint candidate has a URL.
  if (
    typeof PerformanceObserver === 'function' &&
    Array.isArray(PerformanceObserver.supportedEntryTypes) &&
    PerformanceObserver.supportedEntryTypes.indexOf(
      'largest-contentful-paint'
    ) !== -1
  ) {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const entry = entries[entries.length - 1];
      if (entry) {
        lux.addData(
          CUSTOM_DATA_KEYS.lcpContentType,
          entry.url ? 'image' : 'text'
        );
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  }

  const navigation = performance.getEntriesByType('navigation')[0];

  if (!navigation) return;

  // Separate locally served documents from those that required network
  // transfer.
  const { transferSize } = navigation;

  if (transferSize === 0) {
    lux.addData(CUSTOM_DATA_KEYS.fromCache, true);
  } else if (transferSize > 0) {
    lux.addData(CUSTOM_DATA_KEYS.fromCache, false);
  }

  // Preserve the content coding reported for the navigation response.
  if ('contentEncoding' in navigation) {
    const { contentEncoding } = navigation;
    if (typeof contentEncoding === 'string' && contentEncoding.length > 0) {
      lux.addData(CUSTOM_DATA_KEYS.contentEncoding, contentEncoding);
    }
  }

  // Record the final HTTP response status exposed for the navigation.
  if ('responseStatus' in navigation) {
    const { responseStatus } = navigation;
    if (
      typeof responseStatus === 'number' &&
      Number.isFinite(responseStatus) &&
      Number.isInteger(responseStatus) &&
      responseStatus > 0
    ) {
      lux.addData(CUSTOM_DATA_KEYS.responseStatus, responseStatus);
    }
  }

  // Identify navigations intercepted by a service worker.
  if ('workerStart' in navigation) {
    const { workerStart } = navigation;
    if (typeof workerStart === 'number' && Number.isFinite(workerStart)) {
      if (workerStart > 0) {
        lux.addData(CUSTOM_DATA_KEYS.viaServiceWorker, true);
      } else if (workerStart === 0) {
        lux.addData(CUSTOM_DATA_KEYS.viaServiceWorker, false);
      }
    }
  }

  // Approximate the time spent starting or activating the service worker.
  if ('workerStart' in navigation) {
    const { fetchStart, workerStart } = navigation;
    if (
      typeof fetchStart === 'number' &&
      Number.isFinite(fetchStart) &&
      typeof workerStart === 'number' &&
      Number.isFinite(workerStart) &&
      workerStart > 0 &&
      fetchStart >= workerStart
    ) {
      const swStartupTime = Math.round(fetchStart - workerStart);
      if (Number.isFinite(swStartupTime) && swStartupTime >= 0) {
        lux.addData(CUSTOM_DATA_KEYS.serviceWorkerStartupTime, swStartupTime);
      }
    }
  }

  // Keep restored views distinct from conventional navigations in RUM analysis.
  window.addEventListener('pageshow', (event) => {
    if (!event.persisted) {
      lux.addData(CUSTOM_DATA_KEYS.fromBackForwardCache, false);
      return;
    }

    // Let LUX initialise its optional restored-view beacon before adding data.
    Promise.resolve().then(() => {
      lux.addData(CUSTOM_DATA_KEYS.fromBackForwardCache, true);
      lux.addData(CUSTOM_DATA_KEYS.blockedFromBackForwardCache, false);
    });
  });

  // Identify history navigations that had to reload instead of using bfcache.
  if ('notRestoredReasons' in navigation && navigation.notRestoredReasons) {
    lux.addData(CUSTOM_DATA_KEYS.blockedFromBackForwardCache, true);
  }

  // Preserve prerender history so pre-activation timings remain interpretable.
  lux.addData(
    CUSTOM_DATA_KEYS.fromPrerender,
    document.prerendering || navigation.activationStart > 0
  );

  // Measure the proportion of HTML body bytes saved by content encoding.
  const { decodedBodySize, encodedBodySize } = navigation;
  if (
    typeof decodedBodySize === 'number' &&
    Number.isFinite(decodedBodySize) &&
    decodedBodySize > 0 &&
    typeof encodedBodySize === 'number' &&
    Number.isFinite(encodedBodySize) &&
    encodedBodySize > 0
  ) {
    const compressionDelta =
      Math.round((1 - encodedBodySize / decodedBodySize) * 100) / 100;
    if (Number.isFinite(compressionDelta)) {
      lux.addData(CUSTOM_DATA_KEYS.compressionDelta, compressionDelta);
    }
  }

  // Unattributed Navigation Overhead (UNO): TTFB not covered by named phases.
  // https://calendar.perfplanet.com/2024/uno/
  const span = (end, start) => Math.max(0, end - start);
  const uno = Math.round(
    (navigation.responseStart - navigation.startTime) -
      span(navigation.redirectEnd, navigation.redirectStart) -
      span(navigation.domainLookupEnd, navigation.domainLookupStart) -
      span(navigation.connectEnd, navigation.connectStart) -
      span(navigation.responseStart, navigation.requestStart)
  );

  if (Number.isFinite(uno) && uno >= 0) {
    lux.addData(CUSTOM_DATA_KEYS.unattributedNavigationOverhead, uno);
  }

  // Capture the full document response time, beyond the first byte as captured
  // by TTFB.
  if (navigation.responseEnd && navigation.startTime >= 0) {
    const ttlb = Math.round(navigation.responseEnd - navigation.startTime);
    if (Number.isFinite(ttlb) && ttlb >= 0) {
      lux.addData(CUSTOM_DATA_KEYS.timeToLastByte, ttlb);
    }
  }
})();
