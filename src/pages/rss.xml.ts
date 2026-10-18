import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { excerpt, getPosts, link, postPath, SITE_DESCRIPTION, SITE_TITLE } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: new URL(link('/'), context.site).href,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: excerpt(post, 400),
      link: link(postPath(post)),
      categories: post.data.categories,
    })),
  });
}
