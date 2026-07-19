import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import prerender from '@prerenderer/rollup-plugin';
import { allRouteMeta, SITE_URL } from './src/seo/routeMeta';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

/** Explicit route list for headless prerender — keep in sync with AppRouter + routeMeta */
export const PRERENDER_ROUTES = allRouteMeta.map((route) => route.path);

export default defineConfig({
  base: '/',
  root: rootDir,
  plugins: [
    react(),
    // POST-BUILD: serves dist/, crawls each route in headless Chrome, writes HTML back
    prerender({
      routes: PRERENDER_ROUTES,
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        inject: { prerender: true },
        injectProperty: '__PRERENDER_INJECTED',
        renderAfterDocumentEvent: 'prerender-ready',
        maxConcurrentRoutes: 2,
        timeout: 45000,
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
      postProcess(renderedRoute) {
        let html = renderedRoute.html
          .replace(/https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?/gi, SITE_URL)
          .replace(/\sdata-prerender="true"/g, '');

        // Prefer the richest title when Helmet left duplicates
        const titles = [...html.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)].map((m) => m[1].trim());
        if (titles.length) {
          const bestTitle = titles.sort((a, b) => b.length - a.length)[0];
          html = html.replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '');
          html = html.replace(/<head[^>]*>/i, (open) => `${open}<title>${bestTitle}</title>`);
        }

        // Prefer route-specific (longest) description meta
        const descTags = [
          ...html.matchAll(/<meta[^>]*name=["']description["'][^>]*>/gi),
        ].map((m) => m[0]);
        if (descTags.length) {
          const bestDesc = descTags.sort((a, b) => b.length - a.length)[0];
          html = html.replace(/<meta[^>]*name=["']description["'][^>]*>/gi, '');
          html = html.replace(/<title>[\s\S]*?<\/title>/i, (title) => `${title}${bestDesc}`);
        }

        // Prefer longest og:title / og:description
        for (const prop of ['og:title', 'og:description', 'twitter:title', 'twitter:description']) {
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
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three') || id.includes('@react-three')) {
            return 'three';
          }
        },
      },
    },
  },
});
