import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-9 w-16 items-center rounded-full border border-slate-300 dark:border-slate-700 bg-slate-200/80 dark:bg-slate-800/80 px-1 text-xs font-medium text-text-light-main dark:text-text-dark-main shadow-md transition-colors hover:border-brand-blue dark:hover:border-brand-blue-light"
      aria-label="Toggle dark mode"
    >
      <span
        className={`absolute h-7 w-7 rounded-full bg-brand-blue dark:bg-brand-blue-light shadow transition-transform duration-300 ${
          theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
        }`}
      />
      <span className="relative flex w-full justify-between px-1.5 pointer-events-none">
        <span className="opacity-95 text-[10px]">☀️</span>
        <span className="opacity-95 text-[10px]">🌙</span>
      </span>
    </button>
  );
};

export default ThemeToggle;
