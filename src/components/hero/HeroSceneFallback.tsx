import React from 'react';

/** Lightweight non-WebGL hero backdrop for mobile / low-end / reduced-motion */
export const HeroSceneFallback: React.FC = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-br from-paper via-paper-soft to-paper dark:from-ink dark:via-ink-soft dark:to-ink" />
      <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl animate-pulse bg-[color:var(--hero-glow)]" />
      <div className="absolute right-[12%] top-[28%] h-40 w-40 rounded-full bg-accent-gold/20 blur-2xl" />
      <svg
        className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 opacity-40 dark:opacity-30"
        viewBox="0 0 200 200"
        fill="none"
      >
        <polygon
          points="100,10 180,60 180,140 100,190 20,140 20,60"
          className="stroke-ink/40 dark:stroke-accent-gold/40"
          strokeWidth="1.2"
          fill="url(#heroPoly)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 100 100"
            to="360 100 100"
            dur="28s"
            repeatCount="indefinite"
          />
        </polygon>
        <defs>
          <linearGradient id="heroPoly" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a0a0b" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#d4a017" stopOpacity="0.28" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default HeroSceneFallback;
