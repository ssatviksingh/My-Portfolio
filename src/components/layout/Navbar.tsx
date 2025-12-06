import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/skills', label: 'Skills' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="fixed top-0 z-40 w-full bg-gradient-to-b from-bg-dark/95 via-bg-dark/80 to-transparent backdrop-blur-lg border-b border-slate-800/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-accent-orange via-accent-gold to-muted-green shadow-soft-glow" />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold tracking-wide">
              Satvik Singh
            </span>
            <span className="text-xs text-text-muted">
              Mobile App Developer · React Native
            </span>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-4 text-sm">
            {navLinks.map(link => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `relative px-2 py-1 transition hover:text-accent-orange ${
                      isActive || pathname === link.to
                        ? 'text-accent-gold'
                        : 'text-text-muted'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-accent-orange via-accent-gold to-muted-green" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        {/* Mobile menu button */}
        <button
          className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-deep-blue-soft/70 p-2 text-text-main md:hidden"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="space-y-1">
            <span className="block h-0.5 w-5 bg-text-main" />
            <span className="block h-0.5 w-4 bg-text-main" />
          </div>
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-slate-800/60 bg-bg-dark/95 px-4 pb-4 pt-2 md:hidden">
          <ul className="flex flex-col gap-2 text-sm">
            {navLinks.map(link => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-3 py-2 transition ${
                      isActive
                        ? 'bg-deep-blue-soft text-accent-gold'
                        : 'text-text-muted hover:bg-deep-blue-soft/80 hover:text-text-main'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
