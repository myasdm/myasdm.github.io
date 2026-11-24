import { parse } from 'yaml';

export interface Post {
  id: string; title: string; titleZh: string; date: string;
  summary: string; summaryZh: string; tags: string[];
  content: string; contentZh: string; minutes: number;
}

export function parsePost(source: string, filename: string): Post | undefined {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`${filename}: Markdown needs frontmatter.`);
  const meta = parse(match[1]) as Record<string, unknown>;
  if (meta.draft === true) return undefined;
  if (typeof meta.title !== 'string' || typeof meta.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(meta.date) || Number.isNaN(Date.parse(meta.date))) {
    throw new Error(`${filename}: title and an ISO date are required.`);
  }
  const [content, translation] = match[2].split('<!-- zh -->');
  const titleZh = typeof meta.titleZh === 'string' ? meta.titleZh : meta.title;
  const summary = typeof meta.summary === 'string' ? meta.summary : '';
  return {
    id: filename.split('/').pop()?.replace(/\.md$/, '') ?? filename,
    title: meta.title, titleZh, date: meta.date, summary,
    summaryZh: typeof meta.summaryZh === 'string' ? meta.summaryZh : summary,
    tags: Array.isArray(meta.tags) ? meta.tags.filter((tag): tag is string => typeof tag === 'string') : [],
    content: content.trim(), contentZh: translation?.trim() || content.trim(),
    minutes: Math.max(1, Math.ceil(content.split(/\s+/).length / 220)),
  };
}

export function discoverPosts(files: Record<string, string>): Post[] {
  return Object.entries(files).flatMap(([filename, source]) => {
    const post = parsePost(source, filename);
    return post ? [post] : [];
  }).sort((a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id));
}
