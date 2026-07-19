import React, { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  intensity?: number;
}

const MouseParallaxWrapper: React.FC<Props> = ({ children, intensity = 20 }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (coarse || reduced) return;

    let gsapTo: ((target: HTMLElement, vars: Record<string, unknown>) => void) | null = null;
    let cancelled = false;

    import('gsap').then(({ default: gsap }) => {
      if (!cancelled) gsapTo = (target, vars) => gsap.to(target, vars);
    });

    const handleMove = (e: MouseEvent) => {
      if (!gsapTo || !el) return;
      const x = (e.clientX - window.innerWidth / 2) / intensity;
      const y = (e.clientY - window.innerHeight / 2) / intensity;
      gsapTo(el, {
        x,
        y,
        ease: 'power2.out',
        duration: 0.6,
      });
    };

    window.addEventListener('mousemove', handleMove);
    return () => {
      cancelled = true;
      window.removeEventListener('mousemove', handleMove);
    };
  }, [intensity]);

  return (
    <div ref={ref} className="will-change-transform">
      {children}
    </div>
  );
};

export default MouseParallaxWrapper;
