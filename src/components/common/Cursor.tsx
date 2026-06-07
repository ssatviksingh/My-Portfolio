import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

type CursorVariant = 'default' | 'button' | 'card';

export const Cursor: React.FC = () => {
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [label, setLabel] = useState<string | null>(null);
  const x = useSpring(0, { stiffness: 250, damping: 25 });
  const y = useSpring(0, { stiffness: 250, damping: 25 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const withCursor = target.closest('[data-cursor]') as HTMLElement | null;
      const type = (target.dataset.cursor || withCursor?.dataset.cursor) as CursorVariant | null;
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
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleOver);
      window.removeEventListener('mouseout', handleOut);
    };
  }, [x, y]);

  const stylesByVariant = {
    default: { size: 10, border: 'border-slate-500/60', bg: 'bg-transparent' },
    button: { size: 30, border: 'border-accent-orange/80', bg: 'bg-accent-orange/10' },
    card: { size: 26, border: 'border-accent-gold/70', bg: 'bg-accent-gold/5' },
  }[variant];

  return (
    <motion.div
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
      }}
      className={`pointer-events-none fixed z-[999] hidden md:flex items-center justify-center rounded-full border ${stylesByVariant.border} ${stylesByVariant.bg} backdrop-blur-sm`}
      animate={{ width: stylesByVariant.size, height: stylesByVariant.size }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      {label && (
        <span className="text-[9px] font-medium tracking-[0.14em] text-accent-gold">
          {label}
        </span>
      )}
    </motion.div>
  );
};

