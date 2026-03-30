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

  const addData = (key, value) => {
    lux.addData(key, value);
  };

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
      addData(key, obs[key]);
    }
  }

  if (!navigation) return;

  // Was the response from HTTP cache or the network?
  const { transferSize } = navigation;

  if (transferSize === 0) {
    addData('fromCache', true);
  } else if (transferSize > 0) {
    addData('fromCache', false);
  }

  // Was the response from the back–forward cache?
  window.addEventListener('pageshow', (event) => {
    addData('frombfCache', event.persisted);
  });

  if (!document.prerendering) {
    addData('fromPrerender', navigation.activationStart > 0);
  }

  // Time to Last Byte (TTLB)
  if (navigation.responseEnd && navigation.startTime >= 0) {
    const ttlb = Math.round(navigation.responseEnd - navigation.startTime);
    if (Number.isFinite(ttlb) && ttlb >= 0) {
      addData('ttlb', ttlb);
    }
  }

  // First Potential Paint (FPP)
  const headEnd = performance.getEntriesByName('HEAD_End')[0];

  if (headEnd && navigation.startTime >= 0) {
    const fpp = Math.round(headEnd.startTime - navigation.startTime);
    if (Number.isFinite(fpp) && fpp >= 0) {
      addData('fpp', fpp);
    }
  }
})();
