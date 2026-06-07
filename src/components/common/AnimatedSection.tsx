// src/components/common/AnimatedSection.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type AnimatedVariant = 'fade-up' | 'scale' | 'slide-left' | 'slide-right';

interface AnimatedSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  variant?: AnimatedVariant;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  id,
  className = '',
  children,
  variant = 'fade-up',
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const base = {
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      } as gsap.TweenVars;

      let fromVars: gsap.TweenVars;
      if (variant === 'scale') {
        fromVars = { ...base, scale: 0.96 };
      } else if (variant === 'slide-left') {
        fromVars = { ...base, x: -32 };
      } else if (variant === 'slide-right') {
        fromVars = { ...base, x: 32 };
      } else {
        fromVars = { ...base, y: 40 };
      }

      gsap.from(el, fromVars);
    }, sectionRef);

    return () => ctx.revert();
  }, [variant]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative py-20 sm:py-24 ${className}`}
    >
      {children}
    </section>
  );
};

export default AnimatedSection;
