import React from 'react';
import { AppRouter } from './router/AppRouter';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg-light text-text-main dark:bg-bg-dark transition-colors duration-300">
      <ScrollToTop />
      <Navbar />
      <main className="pt-20">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
};

export default App;
