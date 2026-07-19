import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

type CursorVariant = 'default' | 'button' | 'card';

export const Cursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [label, setLabel] = useState<string | null>(null);
  const x = useSpring(0, { stiffness: 280, damping: 26 });
  const y = useSpring(0, { stiffness: 280, damping: 26 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wideEnough = window.matchMedia('(min-width: 768px)').matches;
    setEnabled(finePointer && !reducedMotion && wideEnough);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add('has-custom-cursor');

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const withCursor = target.closest('[data-cursor]') as HTMLElement | null;
      const type = (target.dataset.cursor || withCursor?.dataset.cursor) as
        | CursorVariant
        | null;
      const lbl = target.dataset.cursorLabel || withCursor?.dataset.cursorLabel || null;

      if (type === 'button' || type === 'card') {
        setVariant(type);
        setLabel(lbl);
      }
    };

    const handleOut = () => {
      setVariant('default');
      setLabel(null);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleOver);
    window.addEventListener('mouseout', handleOut);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleOver);
      window.removeEventListener('mouseout', handleOut);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const stylesByVariant = {
    default: {
      size: 10,
      border: 'border-[color:var(--cursor-border)]',
      bg: 'bg-transparent',
    },
    button: {
      size: 34,
      border: 'border-brand-blue/80 dark:border-brand-blue-light/80',
      bg: 'bg-brand-blue/10 dark:bg-brand-blue-light/10',
    },
    card: {
      size: 28,
      border: 'border-brand-blue/70 dark:border-sky-300/70',
      bg: 'bg-brand-blue/5 dark:bg-sky-300/5',
    },
  }[variant];

  return (
    <motion.div
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
      }}
      className={`pointer-events-none fixed z-[999] flex items-center justify-center rounded-full border backdrop-blur-sm ${stylesByVariant.border} ${stylesByVariant.bg}`}
      animate={{ width: stylesByVariant.size, height: stylesByVariant.size }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
    >
      {label && (
        <span className="text-[9px] font-semibold tracking-[0.14em] text-brand-blue dark:text-brand-blue-light">
          {label}
        </span>
      )}
    </motion.div>
  );
};
