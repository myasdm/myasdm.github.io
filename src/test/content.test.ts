import { describe, it, expect } from 'vitest';
import { discoverPosts, parsePost } from '@/lib/content';
import { governanceCases, profile } from '@/data/profile';
const post = (title: string, date: string, extra = '') => `---\ntitle: "${title}"\ndate: "${date}"\n${extra}\n---\n## English\n\n**Evidence**\n<!-- zh -->\n## 中文\n`;
describe('automatic Markdown publishing', () => {
  it('discovers a new file without an index entry', () => {
    expect(discoverPosts({ '/posts/new.md': post('New', '2026-11-24') }).map(p => p.id)).toEqual(['new']);
  });
  it('lists articles newest first', () => {
    expect(discoverPosts({ 'old.md': post('Old', '2026-11-22'), 'new.md': post('New', '2026-11-24') }).map(p => p.title)).toEqual(['New', 'Old']);
  });
  it('does not publish drafts', () => {
    expect(discoverPosts({ 'draft.md': post('Draft', '2026-11-24', 'draft: true') })).toHaveLength(0);
  });
  it('separates frontmatter and bilingual Markdown bodies', () => {
    const parsed = parsePost(post('New', '2026-11-24'), 'new.md');
    expect(parsed?.content).toBe('## English\n\n**Evidence**');
    expect(parsed?.contentZh).toBe('## 中文');
  });
  it('rejects an article without required metadata', () => {
    expect(() => parsePost('# No frontmatter', 'bad.md')).toThrow();
  });
});
describe('resume-backed profile', () => {
  it('retains the resume contact email', () => { expect(profile.email).toBe('xgyb12458@163.com'); });
  it('retains 15 years of architecture experience', () => { expect(profile.experience).toBe('15+'); });
  it('retains MYA availability of 99.95%', () => { expect(governanceCases.find(c => c.id === 'mya')?.metric).toBe('99.95%'); });
  it('retains tenfold IoT throughput improvement', () => { expect(governanceCases.find(c => c.id === 'iot')?.metric).toBe('10×'); });
  it('retains imagery processing from 18 hours to 2 hours', () => { expect(governanceCases.find(c => c.id === 'shanghai')?.metric).toBe('18h → 2h'); });
});
