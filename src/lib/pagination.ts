import type { Post } from './posts';

export const PAGE_SIZE = 10;

export function pageOf(posts: Post[], n: number) {
  return {
    posts: posts.slice((n - 1) * PAGE_SIZE, n * PAGE_SIZE),
    current: n,
    total: Math.ceil(posts.length / PAGE_SIZE),
  };
}
