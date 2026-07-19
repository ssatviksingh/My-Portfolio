import React, { Suspense, lazy } from 'react';
import { useCanRender3D } from '../../hooks/useCanRender3D';
import HeroSceneFallback from './HeroSceneFallback';

const HeroScene = lazy(() =>
  import('./HeroScene').then((mod) => ({ default: mod.HeroScene })),
);

/**
 * Lazily mounts the R3D canvas only when the device can handle it.
 * Falls back to a CSS/SVG backdrop otherwise so TTI stays snappy.
 */
export const HeroVisual: React.FC = () => {
  const canRender3D = useCanRender3D();

  if (!canRender3D) {
    return <HeroSceneFallback />;
  }

  return (
    <Suspense fallback={<HeroSceneFallback />}>
      <HeroScene />
    </Suspense>
  );
};

export default HeroVisual;
