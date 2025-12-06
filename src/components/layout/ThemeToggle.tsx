import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-9 w-16 items-center rounded-full border border-slate-600/60 bg-deep-blue-soft/80 px-1 text-xs font-medium text-text-main shadow-soft-glow transition hover:border-accent-gold/80"
      aria-label="Toggle dark mode"
    >
      <span
        className={`absolute h-7 w-7 rounded-full bg-accent-orange shadow-soft-glow transition-transform duration-300 ${
          theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
        }`}
      />
      <span className="relative flex w-full justify-between px-1">
        <span className="opacity-80">☀️</span>
        <span className="opacity-80">🌙</span>
      </span>
    </button>
  );
};

export default ThemeToggle;
