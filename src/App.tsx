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

const DocumentHead: React.FC = () => {
  const { pathname } = useLocation();
  const isKnownRoute = allRouteMeta.some((route) => route.path === pathname);

  return <Seo noIndex={!isKnownRoute} />;
};

const App: React.FC = () => {
  const { pathname } = useLocation();
  useLenis();

  // Signal headless prerenderer that Helmet + route UI are ready to capture
  React.useEffect(() => {
    const notify = () => {
      document.dispatchEvent(new Event('prerender-ready'));
    };

    // Wait for Framer page enter (~350ms) + Helmet DOM patch
    const timer = window.setTimeout(notify, 700);
    return () => window.clearTimeout(timer);
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
