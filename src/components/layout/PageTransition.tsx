import React from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const isPrerenderEnv = () =>
  typeof navigator !== 'undefined' &&
  (navigator.userAgent.includes('HeadlessChrome') ||
    Boolean((window as Window & { __PRERENDER_INJECTED?: unknown }).__PRERENDER_INJECTED));

const variants: Variants = {
  initial: { opacity: 0, y: 14 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 0.61, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
};

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();

  if (isPrerenderEnv()) {
    return <div key={location.pathname}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={variants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
