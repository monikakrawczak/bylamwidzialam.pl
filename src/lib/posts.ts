import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export const SITE_TITLE = 'BYŁAM WIDZIAŁAM';
export const SITE_DESCRIPTION = 'blog teatralny';

export const NAV = [
  { href: '/', label: 'Główna' },
  { href: '/category/recenzje/', label: 'Recenzje' },
  { href: '/category/krotko-o/', label: 'Krótko o' },
  { href: '/category/rozmowa/', label: 'Rozmowa' },
  { href: '/category/ksiazka/', label: 'Książka' },
  { href: '/category/z-podrozy/', label: 'Z podróży' },
  { href: '/kontakt/', label: 'Kontakt' },
];

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts');
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Keeps the original WordPress address, e.g. /2023/05/22/finnegans-w-fake/ */
export function postPath(post: Post): string {
  return new URL(post.data.url).pathname;
}

const PL: Record<string, string> = { ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' };

/** Same slugs WordPress used for categories and tags. */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (c) => PL[c])
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Frontmatter dates have no timezone, so they are parsed as UTC; format in UTC to keep the original day.
const dateFormat = new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export function formatDate(d: Date): string {
  return dateFormat.format(d);
}

export function excerpt(post: Post, length = 220): string {
  const text = (post.body ?? '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*#>_]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= length) return text;
  return text.slice(0, text.lastIndexOf(' ', length)) + '…';
}

export function groupBy(posts: Post[], key: 'categories' | 'tags') {
  const map = new Map<string, { name: string; posts: Post[] }>();
  for (const post of posts) {
    for (const name of post.data[key]) {
      const slug = slugify(name);
      if (!map.has(slug)) map.set(slug, { name, posts: [] });
      map.get(slug)!.posts.push(post);
    }
  }
  return map;
}
