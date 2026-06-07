import React from 'react';
import { motion, useMotionValue, useTransform, type HTMLMotionProps } from 'framer-motion';

type MagneticButtonProps = Omit<HTMLMotionProps<'button'>, 'style' | 'onDrag' | 'onDragStart' | 'onDragEnd'> & {
  asChild?: boolean;
  className?: string;
};

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  asChild = false,
  className = '',
  ...props
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-20, 20], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX / 4);
    y.set(relY / 4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (asChild) {
    // Used when wrapping a Link rendered as button-like element
    return (
      <motion.button
        {...props}
        style={{ x, y, rotate }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative inline-flex items-center justify-center ${className}`}
        data-cursor="button"
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.button
      {...props}
      style={{ x, y, rotate }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-flex items-center justify-center ${className}`}
      data-cursor="button"
    >
      {children}
    </motion.button>
  );
};

