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

  const navigation = performance.getEntriesByType('navigation')[0];

  const { connection } = navigator;

  if (connection && 'rtt' in connection) {
    lux.addData('rtt', connection.rtt);
  }

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

  if (!navigation) return;

  // Was the response from HTTP cache or the network?
  const { transferSize } = navigation;

  if (transferSize === 0) {
    lux.addData('fromCache', true);
  } else if (transferSize > 0) {
    lux.addData('fromCache', false);
  }

  // Was the response from the back–forward cache?
  window.addEventListener('pageshow', (event) => {
    lux.addData('frombfCache', event.persisted);
  });

  lux.addData(
    'fromPrerender',
    document.prerendering || navigation.activationStart > 0
  );

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

  // Time to Last Byte (TTLB)
  if (navigation.responseEnd && navigation.startTime >= 0) {
    const ttlb = Math.round(navigation.responseEnd - navigation.startTime);
    if (Number.isFinite(ttlb) && ttlb >= 0) {
      lux.addData('ttlb', ttlb);
    }
  }

  // First Potential Paint (FPP)
  const headEnd = performance.getEntriesByName('HEAD_End')[0];

  if (headEnd && navigation.startTime >= 0) {
    const fpp = Math.round(headEnd.startTime - navigation.startTime);
    if (Number.isFinite(fpp) && fpp >= 0) {
      lux.addData('fpp', fpp);
    }
  }
})();
