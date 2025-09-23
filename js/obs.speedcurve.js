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

})();
