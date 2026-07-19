import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import prerenderStatic from 'vite-plugin-prerender-static';
import { getPrerenderRoutes, renderPrerenderBody } from './src/seo/prerender';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    prerenderStatic({
      routes: getPrerenderRoutes(),
      template: path.resolve(rootDir, 'template.html'),
      render: renderPrerenderBody,
      // Injected by the plugin from dist/index.html at closeBundle time
      headTags: '',
    }),
  ],
});
