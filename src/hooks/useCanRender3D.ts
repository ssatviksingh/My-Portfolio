import { useEffect, useState } from 'react';
import { isPrerenderEnv } from '../utils/prerender';

/**
 * Gate expensive WebGL. Prefer static fallback on touch / low-end / reduced-motion / prerender.
 */
export function useCanRender3D(): boolean {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const cores = navigator.hardwareConcurrency ?? 8;
    const deviceMemory =
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        ?.saveData ?? false;

    const lowEnd = cores <= 4 || deviceMemory <= 4 || saveData;
    setCanRender(!isPrerenderEnv() && !reducedMotion && !coarsePointer && !lowEnd);
  }, []);

  return canRender;
}
