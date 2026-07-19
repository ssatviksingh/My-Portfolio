type PrerenderWindow = Window & {
  __PRERENDER__?: unknown;
  __PRERENDER_INJECTED?: unknown;
};

/**
 * Detect headless prerender (Puppeteer via @prerenderer).
 * When true, all entrance animations must render at their FINAL state
 * (opacity: 1, no translate/scale offset) so the captured HTML is crawlable.
 */
export function isPrerenderEnv(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  const w = window as PrerenderWindow;
  const injected = Boolean(w.__PRERENDER__ ?? w.__PRERENDER_INJECTED);
  const headless = /HeadlessChrome|Chrome-Lighthouse|Puppeteer/i.test(navigator.userAgent);

  return injected || headless;
}

/** Mark body/html so Puppeteer can wait via renderAfterElementExists */
export function markPrerenderReady(): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-prerender-ready', 'true');
  document.body?.setAttribute('data-prerender-ready', 'true');
  document.dispatchEvent(new Event('prerender-ready'));
}

export function clearPrerenderReady(): void {
  if (typeof document === 'undefined') return;
  document.documentElement.removeAttribute('data-prerender-ready');
  document.body?.removeAttribute('data-prerender-ready');
}
