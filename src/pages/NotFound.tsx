import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-24 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-text-muted">
        404 · Page not found
      </p>
      <h1 className="mt-2 mb-3 font-display text-3xl font-semibold text-white">
        This page drifted off course.
      </h1>
      <p className="mb-6 max-w-md text-sm text-text-muted">
        The page you&apos;re looking for doesn&apos;t exist. It may have been moved, or
        you might have typed the URL incorrectly.
      </p>
      <Link
        to="/"
        className="rounded-2xl bg-gradient-to-r from-accent-orange via-accent-gold to-muted-green px-5 py-2.5 text-sm font-medium text-bg-dark"
      >
        Take me home
      </Link>
    </div>
  );
};

export default NotFound;
