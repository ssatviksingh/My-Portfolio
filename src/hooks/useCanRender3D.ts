import { useEffect, useState } from 'react';
import { isPrerenderEnv } from '../utils/prerender';

/**
 * Gate expensive WebGL. Prefer static fallback on touch / narrow viewports /
 * low-end / reduced-motion / prerender so mobile Lighthouse stays healthy.
 */
export function useCanRender3D(): boolean {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const wideViewport = window.matchMedia('(min-width: 1024px)').matches;
    const cores = navigator.hardwareConcurrency ?? 4;
    const deviceMemory =
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        ?.saveData ?? false;

    const lowEnd = cores <= 4 || deviceMemory < 4 || saveData;
    setCanRender(
      !isPrerenderEnv() &&
        !reducedMotion &&
        finePointer &&
        wideViewport &&
        !lowEnd,
    );
  }, []);

  return canRender;
}
