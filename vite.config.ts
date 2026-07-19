import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import prerender from '@prerenderer/rollup-plugin';
import type { Page } from 'puppeteer';
import { allRouteMeta, SITE_URL } from './src/seo/routeMeta';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

/** Explicit route list for headless prerender — keep in sync with AppRouter + routeMeta */
export const PRERENDER_ROUTES = allRouteMeta.map((route) => route.path);

// Vercel build images lack Puppeteer system libs — prerender in GHA/local, then deploy dist/
const shouldPrerender = process.env.VERCEL !== '1';

/**
 * Wait strategy:
 * - element (default/PRIMARY): page.waitForSelector('body[data-prerender-ready="true"]')
 *   via pageHandler. Do NOT use renderAfterElementExists alone — @prerenderer leaves a
 *   hanging evaluate() that throws "Promise was collected" when the page closes.
 * - event (FALLBACK): renderAfterDocumentEvent 'prerender-ready' only — no fixed delay
 *
 * Override: PRERENDER_WAIT=element|event
 */
const waitStrategy = (process.env.PRERENDER_WAIT || 'element').toLowerCase();
const useElementWait = waitStrategy !== 'event';

const READY_SELECTOR = 'body[data-prerender-ready="true"]';

if (shouldPrerender) {
  console.log(
    `\n[prerender] wait strategy: ${
      useElementWait
        ? `PRIMARY (pageHandler → waitForSelector('${READY_SELECTOR}'))`
        : 'FALLBACK (renderAfterDocumentEvent → prerender-ready)'
    }\n`,
  );
}

const rendererOptions = useElementWait
  ? {
      inject: { prerender: true },
      injectProperty: '__PRERENDER__',
      // Wait for body ready BEFORE capture (same contract as waitForSelector)
      pageHandler: async (page: Page) => {
        await page.waitForSelector(READY_SELECTOR, { timeout: 60000 });
      },
      maxConcurrentRoutes: 1,
      timeout: 60000,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
  : {
      inject: { prerender: true },
      injectProperty: '__PRERENDER__',
      renderAfterDocumentEvent: 'prerender-ready',
      maxConcurrentRoutes: 1,
      timeout: 60000,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    };

export default defineConfig({
  base: '/',
  root: rootDir,
  plugins: [
    react(),
    ...(shouldPrerender
      ? [
          prerender({
            routes: PRERENDER_ROUTES,
            renderer: '@prerenderer/renderer-puppeteer',
            rendererOptions,
            postProcess(renderedRoute) {
              let html = renderedRoute.html
                .replace(/https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?/gi, SITE_URL)
                .replace(/\sdata-prerender="true"/g, '');

              const titles = [...html.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)].map((m) =>
                m[1].trim(),
              );
              if (titles.length) {
                const bestTitle = titles.sort((a, b) => b.length - a.length)[0];
                html = html.replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '');
                html = html.replace(/<head[^>]*>/i, (open) => `${open}<title>${bestTitle}</title>`);
              }

              const descTags = [
                ...html.matchAll(/<meta[^>]*name=["']description["'][^>]*>/gi),
              ].map((m) => m[0]);
              if (descTags.length) {
                const bestDesc = descTags.sort((a, b) => b.length - a.length)[0];
                html = html.replace(/<meta[^>]*name=["']description["'][^>]*>/gi, '');
                html = html.replace(/<title>[\s\S]*?<\/title>/i, (title) => `${title}${bestDesc}`);
              }

              for (const prop of [
                'og:title',
                'og:description',
                'twitter:title',
                'twitter:description',
              ]) {
                const tags = [
                  ...html.matchAll(
                    new RegExp(`<meta[^>]*(?:property|name)=["']${prop}["'][^>]*>`, 'gi'),
                  ),
                ].map((m) => m[0]);
                if (tags.length > 1) {
                  const best = tags.sort((a, b) => b.length - a.length)[0];
                  html = html.replace(
                    new RegExp(`<meta[^>]*(?:property|name)=["']${prop}["'][^>]*>`, 'gi'),
                    '',
                  );
                  html = html.replace('</head>', `${best}</head>`);
                }
              }

              renderedRoute.html = html;
            },
          }),
        ]
      : []),
  ],
  build: {
    // Do not force-split three into a shared chunk — that pulled React into
    // three-*.js and made every route download WebGL. Natural dynamic-import
    // splitting from HeroVisual's React.lazy keeps three off the critical path.
    modulePreload: {
      resolveDependencies: (_filename, deps) =>
        deps.filter((dep) => !dep.includes('three') && !dep.includes('HeroScene')),
    },
  },
});
