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
    'dataSaver',
    'rttBucket',
    'rttCategory',
    'downlinkBucket',
    'downlinkCategory',
    'downlinkMax',
    'batteryCritical',
    'batteryLow',
    'batteryCharging',
  ];

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(obs, key)) {
      window.LUX.addData(key, obs[key]);
    }
  }
})();
