export const canUseDOM = !!(
  typeof window !== 'undefined' && window.document && window.document.createElement
);

export const addEventListener = (node: HTMLElement | Window, event: any, listener: any) => (
  node.addEventListener
    ? node.addEventListener(event, listener, false)
    : (node as any).attachEvent('on' + event, listener)
);

export const removeEventListener = (node: HTMLElement | Window, event: any, listener: any) => (
  node.removeEventListener
    ? node.removeEventListener(event, listener, false)
    : (node as any).detachEvent('on' + event, listener)
);

export const getConfirmation = (message: string, callback: (confirmed: boolean) => {}) => (
  callback(window.confirm(message))
);

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */
export const supportsHistory = () => {
  const ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false;
  }

  return window.history && 'pushState' in window.history;
};

/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */
export const supportsPopStateOnHashChange = () => (
  window.navigator.userAgent.indexOf('Trident') === -1
);

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */
export const supportsGoWithoutReloadUsingHash = () => (
  window.navigator.userAgent.indexOf('Firefox') === -1
);

export const isExtraneousPopstateEvent = (event: any) => (
  event.state === undefined &&
  navigator.userAgent.indexOf('CriOS') === -1
);
