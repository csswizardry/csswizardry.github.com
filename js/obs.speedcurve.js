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

  // Send HTTP Protocol if available via Server-Timing header.
  const navEntry = performance.getEntriesByType('navigation')[0];
  if (!navEntry || !Array.isArray(navEntry.serverTiming)) {
    return;
  }

  const protocol = navEntry.serverTiming.find(t => t.name === 'protocol');

  if (!protocol || !protocol.description) {
    return;
  }

  LUX.addData('Protocol', protocol.description);

})();
