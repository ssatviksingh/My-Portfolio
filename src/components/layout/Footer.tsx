import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-800/60 bg-bg-dark/90 text-xs text-text-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Satvik Singh. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link to="/privacy" className="hover:text-accent-orange">
            Privacy
          </Link>
          <a
            href="https://github.com/ssatviksingh"
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent-orange"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/satvik-singh-785337287/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent-orange"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
