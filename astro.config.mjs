import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Until the bylamwidzialam.pl domain points here, GitHub Pages serves the site from a subdirectory;
// the deploy workflow sets SITE_URL and BASE_PATH accordingly.
const site = process.env.SITE_URL ?? 'https://bylamwidzialam.pl';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  image: {
    // Markdown images get srcset at these widths instead of shipping originals.
    layout: 'constrained',
    breakpoints: [480, 720, 1080, 1440],
  },
});
