import React from 'react';
import { useLocation } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import { PageTransition } from './components/layout/PageTransition';
import { useLenis } from './hooks/useLenis';
import { Cursor } from './components/common/Cursor';
import Seo from './components/seo/Seo';
import { allRouteMeta } from './seo/routeMeta';
import { isPrerenderEnv, markPrerenderReady } from './utils/prerender';

const DocumentHead: React.FC = () => {
  const { pathname } = useLocation();
  const isKnownRoute = allRouteMeta.some((route) => route.path === pathname);

  return <Seo noIndex={!isKnownRoute} />;
};

const App: React.FC = () => {
  const { pathname } = useLocation();
  useLenis();

  /**
   * Puppeteer waits for `[data-prerender-ready="true"]` (and/or the
   * `prerender-ready` event). Animations are skipped in prerender env, so we
   * mark ready after a paint + Helmet tick — not after a long animation delay.
   */
  React.useEffect(() => {
    let cancelled = false;
    let timeoutId = 0;
    let raf2 = 0;

    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        // Prerender: animations are already at final state — brief Helmet wait.
        // Browser: allow page-transition enter (~350ms) + head patch.
        timeoutId = window.setTimeout(
          () => {
            if (!cancelled) markPrerenderReady();
          },
          isPrerenderEnv() ? 80 : 700,
        );
      });
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      window.clearTimeout(timeoutId);
      document.documentElement.removeAttribute('data-prerender-ready');
      document.body?.removeAttribute('data-prerender-ready');
    };
  }, [pathname]);

  return (
    <>
      <DocumentHead />
      <Cursor />
      <div
        className="min-h-screen bg-bg-light text-text-light-main dark:bg-bg-dark dark:text-text-dark-main transition-colors duration-300"
        data-app-ready="true"
      >
        <ScrollToTop />
        <Navbar />
        <main className="pt-20">
          <PageTransition>
            <AppRouter />
          </PageTransition>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
