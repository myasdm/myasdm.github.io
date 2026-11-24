import { discoverPosts } from '@/lib/content';
export type { Post as BlogPost } from '@/lib/content';
const files = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
export const blogPosts = discoverPosts(files);
export const getSortedBlogPosts = () => blogPosts;
export const getBlogPostById = (id: string) => blogPosts.find(post => post.id === id);
