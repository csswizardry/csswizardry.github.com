/**
 * All the data previously captured by Obs.js is now sent to SpeedCurve!
 *
 * I ❤️ SpeedCurve!
 */

(() => {
  // Bail out if SpeedCurve is not available.
  if (!window.LUX || typeof window.LUX.addData !== 'function') return;

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
      window.LUX.addData(key, obs[key]);
    }
  }

  // Was the response from HTTP cache or the network?
  const navigation = performance.getEntriesByType('navigation')[0];

  if (!navigation) return;

  const { transferSize } = navigation;

  if (transferSize === 0) {
    LUX.addData('fromCache', true);
  } else if (transferSize > 0) {
    LUX.addData('fromCache', false);
  }

  // Was the response from the back–forward cache?
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      LUX.addData('frombfCache', true);
    } else {
      LUX.addData('frombfCache', false);
    }
  });

  if (document.prerendering) {
  } else if (performance.getEntriesByType("navigation")[0]?.activationStart > 0) {
    LUX.addData('fromPrerender', true);
  } else {
    LUX.addData('fromPrerender', false);
  }

  // Time to Last Byte (TTLB)
  if (navigation.responseEnd && navigation.startTime >= 0) {
    const ttlb = Math.round(navigation.responseEnd - navigation.startTime);
    if (Number.isFinite(ttlb) && ttlb >= 0) {
      LUX.addData('ttlb', ttlb);
    }
  }

  // First Potential Paint (FPP)
  if (navigation.startTime >= 0) {
    const headEnd = performance.getEntriesByName('HEAD_End')[0];
    const fpp = Math.round(headEnd.startTime - navigation.startTime);
    if (Number.isFinite(fpp) && fpp >= 0) {
      LUX.addData('fpp', fpp);
    }
  }


})();
