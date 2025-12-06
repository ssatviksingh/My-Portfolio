// src/components/common/AnimatedSection.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  id,
  className = '',
  children,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative py-16 sm:py-20 ${className}`}
    >
      {children}
    </section>
  );
};

export default AnimatedSection;
