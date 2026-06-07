import React from 'react';
import { AppRouter } from './router/AppRouter';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import { PageTransition } from './components/layout/PageTransition';
import { useLenis } from './hooks/useLenis';
import { Cursor } from './components/common/Cursor';

const App: React.FC = () => {
  useLenis();

  return (
    <>
      <Cursor />
      <div className="min-h-screen bg-bg-light text-text-light-main dark:bg-bg-dark dark:text-text-dark-main transition-colors duration-300">
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
