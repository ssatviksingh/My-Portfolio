import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  formatPageTitle,
  resolveRouteMeta,
  toAbsoluteUrl,
} from '../../seo/routeMeta';

export interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

/** Per-route head tags for SPA navigations (prerender covers first paint for crawlers). */
export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  path,
  image,
  noIndex = false,
}) => {
  const { pathname } = useLocation();
  const fallback = resolveRouteMeta(pathname);

  const resolvedPath = path ?? fallback.path;
  const resolvedTitle = formatPageTitle(title ?? fallback.title);
  const resolvedDescription = description ?? fallback.description;
  const resolvedImage = image
    ? toAbsoluteUrl(image)
    : fallback.image
      ? toAbsoluteUrl(fallback.image)
      : DEFAULT_OG_IMAGE;
  const url = toAbsoluteUrl(resolvedPath === '/' ? '/' : resolvedPath);

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <meta name="author" content={SITE_NAME} />
      <link rel="canonical" href={url} />
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={resolvedImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedImage} />
    </Helmet>
  );
};

export default Seo;
