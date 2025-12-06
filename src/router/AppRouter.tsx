import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Portfolio from '../pages/Portfolio';
import Skills from '../pages/Skills';
import BlogList from '../pages/BlogList';
import BlogPost from '../pages/BlogPost';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import Privacy from '../pages/Privacy';
import MouseParallaxWrapper from '../components/common/MouseParallaxWrapper';
import ThankYou from '../pages/ThankYou';

export const AppRouter: React.FC = () => {
  return (
    <MouseParallaxWrapper intensity={28}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
    </MouseParallaxWrapper>
  );
};
