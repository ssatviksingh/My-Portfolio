import { useEffect } from 'react';
import { clearPrerenderReady, isPrerenderEnv, markPrerenderReady } from '../utils/prerender';

/**
 * Page-owned ready signal for Puppeteer.
 * Call once from each top-level route after content is mounted
 * (projects data is sync — ready = paint + short Helmet tick).
 */
export function usePrerenderReady(enabled = true): void {
  useEffect(() => {
    if (!enabled) return;

    clearPrerenderReady();

    let cancelled = false;
    let timeoutId = 0;
    let raf2 = 0;

    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        timeoutId = window.setTimeout(
          () => {
            if (!cancelled) markPrerenderReady();
          },
          isPrerenderEnv() ? 80 : 400,
        );
      });
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      window.clearTimeout(timeoutId);
      clearPrerenderReady();
    };
  }, [enabled]);
}
