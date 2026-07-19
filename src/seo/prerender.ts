import type { RouteMeta } from './routeMeta';
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  allRouteMeta,
  formatPageTitle,
  toAbsoluteUrl,
} from './routeMeta';

export interface PrerenderRoute {
  path: string;
  tags: {
    title: string;
    description: string;
    author: string;
    url: string;
    image: string;
    keywords: string;
    canonical: string;
    robots: string;
    schema?: Record<string, unknown>;
  };
}

function toPrerenderRoute(meta: RouteMeta): PrerenderRoute {
  const url = toAbsoluteUrl(meta.path === '/' ? '/' : meta.path);
  const title = formatPageTitle(meta.title);
  const image = meta.image ? toAbsoluteUrl(meta.image) : DEFAULT_OG_IMAGE;

  return {
    path: meta.path,
    tags: {
      title,
      description: meta.description,
      author: SITE_NAME,
      url,
      image,
      keywords: meta.keywords ?? 'React Native, TypeScript, mobile developer',
      canonical: url,
      robots: 'index, follow',
      schema: {
        '@context': 'https://schema.org',
        '@type': meta.path.startsWith('/blog/')
          ? 'BlogPosting'
          : meta.path.startsWith('/portfolio/')
            ? 'CreativeWork'
            : 'WebPage',
        name: title,
        description: meta.description,
        url,
        author: {
          '@type': 'Person',
          name: SITE_NAME,
          url: SITE_URL,
        },
        image,
      },
    },
  };
}

export function getPrerenderRoutes(): PrerenderRoute[] {
  return allRouteMeta.map(toPrerenderRoute);
}

/** Crawlable body HTML so bots see more than an empty #root */
export function renderPrerenderBody(route: { path: string }): string {
  const meta = allRouteMeta.find((item) => item.path === route.path) ?? {
    path: route.path,
    title: 'Satvik Singh',
    description: 'React Native developer portfolio',
  };

  const title = formatPageTitle(meta.title);

  return `
    <main data-prerender="true">
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(meta.description)}</p>
      <p>Satvik Singh — React Native / mobile developer portfolio.</p>
      <nav aria-label="Primary">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/portfolio">Portfolio</a>
        <a href="/skills">Skills</a>
        <a href="/blog">Blog</a>
        <a href="/contact">Contact</a>
      </nav>
    </main>
  `.trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
