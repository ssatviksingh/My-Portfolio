import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseGsapFadeInOptions {
    y?: number;
    duration?: number;
    delay?: number;
}

export const useGsapFadeIn = <T extends HTMLElement>(
    options: UseGsapFadeInOptions = {},
) => {
    const { y = 40, duration = 0.8, delay = 0 } = options;
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                el,
                { autoAlpha: 0, y },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration,
                    delay,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 80%',
                        once: true,
                    },
                },
            );
        }, el);

        return () => ctx.revert();
    }, [y, duration, delay]);

    return ref;
};
