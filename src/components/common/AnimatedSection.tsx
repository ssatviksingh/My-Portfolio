import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  fadeScale,
  fadeUp,
  slideLeft,
  slideRight,
} from '../motion/variants';

type AnimatedVariant = 'fade-up' | 'scale' | 'slide-left' | 'slide-right';

interface AnimatedSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  variant?: AnimatedVariant;
}

const variantMap = {
  'fade-up': fadeUp,
  scale: fadeScale,
  'slide-left': slideLeft,
  'slide-right': slideRight,
} as const;

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  id,
  className = '',
  children,
  variant = 'fade-up',
}) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <section id={id} className={`relative py-20 sm:py-24 ${className}`}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={`relative py-20 sm:py-24 ${className}`}
      variants={variantMap[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18, margin: '0px 0px -50px 0px' }}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
