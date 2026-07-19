import React from 'react';
import { motion, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from 'framer-motion';

type MagneticButtonProps = Omit<
  HTMLMotionProps<'button'>,
  'style' | 'onDrag' | 'onDragStart' | 'onDragEnd'
> & {
  asChild?: boolean;
  className?: string;
};

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  ...props
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 320, damping: 22, mass: 0.4 });
  const rotate = useTransform(springX, [-20, 20], [-3, 3]);

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

  return (
    <motion.button
      {...props}
      style={{ x: springX, y: springY, rotate }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className={`relative inline-flex items-center justify-center ${className}`}
      data-cursor="button"
    >
      {children}
    </motion.button>
  );
};
