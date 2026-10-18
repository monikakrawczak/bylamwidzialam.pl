import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://bylamwidzialam.pl',
  trailingSlash: 'always',
  integrations: [sitemap()],
  image: {
    // Markdown images get srcset at these widths instead of shipping originals.
    layout: 'constrained',
    breakpoints: [480, 720, 1080, 1440],
  },
});
