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

  // Surface the browser-reported static CPU performance tier.
  if ('cpuPerformance' in navigator) {
    const { cpuPerformance } = navigator;
    if (
      typeof cpuPerformance === 'number' &&
      Number.isFinite(cpuPerformance) &&
      Number.isInteger(cpuPerformance) &&
      cpuPerformance >= 0
    ) {
      lux.addData('cpu', cpuPerformance);
    }
  }

  const navigation = performance.getEntriesByType('navigation')[0];

  if (!navigation) return;

  // Separate locally served documents from those that required network
  // transfer.
  const { transferSize } = navigation;

  if (transferSize === 0) {
    lux.addData('fromCache', true);
  } else if (transferSize > 0) {
    lux.addData('fromCache', false);
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
      lux.addData('rs', responseStatus);
    }
  }

  // Identify navigations intercepted by a service worker.
  if ('workerStart' in navigation) {
    const { workerStart } = navigation;
    if (typeof workerStart === 'number' && Number.isFinite(workerStart)) {
      if (workerStart > 0) {
        lux.addData('viaSW', true);
      } else if (workerStart === 0) {
        lux.addData('sw', false);
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
        lux.addData('sws', swStartupTime);
      }
    }
  }

  // Keep restored views distinct from conventional navigations in RUM analysis.
  window.addEventListener('pageshow', (event) => {
    lux.addData('frombfCache', event.persisted);
  });

  // Preserve prerender history so pre-activation timings remain interpretable.
  lux.addData(
    'fromPrerender',
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
    const compressionDelta = Math.round((1 - encodedBodySize / decodedBodySize) * 100) / 100;
    if (Number.isFinite(compressionDelta)) {
      lux.addData('cd', compressionDelta);
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
    lux.addData('uno', uno);
  }

  // Capture the full document response time, beyond the first byte as captured
  // by TTFB.
  if (navigation.responseEnd && navigation.startTime >= 0) {
    const ttlb = Math.round(navigation.responseEnd - navigation.startTime);
    if (Number.isFinite(ttlb) && ttlb >= 0) {
      lux.addData('ttlb', ttlb);
    }
  }

  // First Potential Paint (FPP)
  const headEnd = performance.getEntriesByName('HEAD_End')[0];

  if (navigation && headEnd && navigation.startTime >= 0) {
    const fpp = Math.round(headEnd.startTime - navigation.startTime);
    if (Number.isFinite(fpp) && fpp >= 0) {
      lux.addData('fpp', fpp);
    }
  }
})();
