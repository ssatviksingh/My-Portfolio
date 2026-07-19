import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useLenis = () => {
  useEffect(() => {
    const isPrerender =
      navigator.userAgent.includes('HeadlessChrome') ||
      Boolean((window as Window & { __PRERENDER_INJECTED?: unknown }).__PRERENDER_INJECTED);
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    // Native scroll on touch / reduced-motion / prerender — smoother and less janky there
    if (isPrerender || prefersReduced || coarsePointer) {
      document.documentElement.style.scrollBehavior = prefersReduced ? 'auto' : 'smooth';
      return;
    }

    document.documentElement.style.scrollBehavior = 'auto';

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (value !== undefined) {
          lenis.scrollTo(value);
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener('refresh', onRefresh);
    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(frame);
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);
};
