import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [activeSection, setActiveSection] = React.useState<string | null>(null);

  React.useEffect(() => {
    const onScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const value = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, value)));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  // Observe sections on the home page for active nav highlighting
  React.useEffect(() => {
    if (pathname !== '/') {
      setActiveSection(null);
      return;
    }

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('main section[id]'),
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        threshold: 0.4,
      },
    );

    sections.forEach(sec => observer.observe(sec));

    return () => observer.disconnect();
  }, [pathname]);

  const handleNavClick = (to: string) => (e: React.MouseEvent) => {
    if (pathname === '/' && to !== '/') {
      const targetId = to.replace('/', '');
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        const headerOffset = 72;
        const rect = el.getBoundingClientRect();
        const scrollTop = window.scrollY + rect.top - headerOffset;
        window.scrollTo({ top: scrollTop, behavior: 'smooth' });
        return;
      }
    }

    if (to === '/' && pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // default navigation
    navigate(to);
  };

  return (
    <header className="fixed top-0 z-40 w-full bg-bg-light/95 dark:bg-bg-dark/95 backdrop-blur-lg border-b border-slate-200/60 dark:border-slate-800/60 transition-colors duration-300">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-brand-blue via-brand-blue-light to-brand-blue shadow-soft-glow" />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold tracking-wide text-text-light-main dark:text-text-dark-main">
              Satvik Singh
            </span>
            <span className="text-xs text-text-light-muted dark:text-text-dark-muted font-medium">
              Mobile App Developer · React Native
            </span>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-4 text-sm">
            {navLinks.map(link => {
              const isRouteActive = pathname === link.to;
              const isSectionActive =
                pathname === '/' &&
                link.to !== '/' &&
                activeSection === link.to.replace('/', '');

              const isActive = isRouteActive || isSectionActive;

              return (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={handleNavClick(link.to)}
                    className={() =>
                      `relative px-2 py-1 transition-colors hover:text-brand-blue dark:hover:text-brand-blue-light ${
                        isActive 
                          ? 'text-brand-blue dark:text-brand-blue-light font-semibold' 
                          : 'text-text-light-muted dark:text-text-dark-muted'
                      }`
                    }
                    data-cursor="button"
                    data-cursor-label="NAV"
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-brand-blue to-brand-blue-light" />
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </div>

        {/* Mobile menu button */}
        <button
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-2 text-text-light-main dark:text-text-dark-main md:hidden"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle navigation"
          data-cursor="button"
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="space-y-1">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-4 bg-current" />
          </div>
        </button>
      </nav>

      {/* Scroll progress indicator */}
      <div className="h-0.5 w-full bg-slate-200/50 dark:bg-slate-800/50">
        <div
          className="h-full bg-gradient-to-r from-brand-blue to-brand-blue-light transition-[width] duration-200"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-slate-200/60 dark:border-slate-800/60 bg-bg-light/95 dark:bg-bg-dark/95 px-4 pb-4 pt-2 md:hidden">
          <ul className="flex flex-col gap-2 text-sm">
            {navLinks.map(link => {
              const isRouteActive = pathname === link.to;
              const isSectionActive =
                pathname === '/' &&
                link.to !== '/' &&
                activeSection === link.to.replace('/', '');

              const isActive = isRouteActive || isSectionActive;

              return (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={e => {
                      setOpen(false);
                      handleNavClick(link.to)(e);
                    }}
                    className={() =>
                      `block rounded-xl px-3 py-2 transition-colors ${
                        isActive
                          ? 'bg-slate-200 dark:bg-slate-800 text-brand-blue dark:text-brand-blue-light font-semibold'
                          : 'text-text-light-muted dark:text-text-dark-muted hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-text-light-main dark:hover:text-text-dark-main'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              );
            })}
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
