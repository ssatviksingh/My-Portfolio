import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  fadeScale,
  fadeUp,
  slideLeft,
  slideRight,
  staggerContainer,
} from './variants';
import { isPrerenderEnv } from '../../utils/prerender';

type RevealVariant = 'fade-up' | 'scale' | 'slide-left' | 'slide-right';

const variantMap: Record<RevealVariant, Variants> = {
  'fade-up': fadeUp,
  scale: fadeScale,
  'slide-left': slideLeft,
  'slide-right': slideRight,
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  as?: 'div' | 'section' | 'li' | 'article';
  delay?: number;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  variant = 'fade-up',
  as = 'div',
  delay = 0,
}) => {
  const reduceMotion = useReducedMotion();
  const prerender = isPrerenderEnv();
  const Component = motion[as];

  // Final visible state baked into HTML — no opacity:0 / translate capture
  if (reduceMotion || prerender) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      className={className}
      variants={variantMap[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -40px 0px' }}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
};

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'ul' | 'section';
}

/** Parent for staggered whileInView children that use `fadeUp` / item variants */
export const Stagger: React.FC<StaggerProps> = ({
  children,
  className = '',
  as = 'div',
}) => {
  const reduceMotion = useReducedMotion();
  const prerender = isPrerenderEnv();
  const Component = motion[as];

  if (reduceMotion || prerender) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -30px 0px' }}
    >
      {children}
    </Component>
  );
};

export default Reveal;
