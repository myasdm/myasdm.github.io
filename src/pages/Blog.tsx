import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, List, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import EditorialLayout from '@/components/EditorialLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/data/blog';
export default function Blog() {
  const { t, language } = useLanguage();
  const [params, setParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const id = params.get('post');
  const selected = id ? blogPosts.find(post => post.id === id) : blogPosts[0];
  const years = [...new Set(blogPosts.map(post => post.date.slice(0, 4)))];
  const select = (postId: string) => { setParams({ post: postId }); setOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }); };
  return <EditorialLayout><div className="editorial-container"><header className="journal-heading"><p className="eyebrow">{t('Journal / Field notes & principles', '文章 / 现场笔记与原则')}</p><div className="flex justify-between items-center gap-4"><h1>{t('The working notebook.', '持续更新的工作笔记。')}</h1><Button variant="outline" className="lg:hidden" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <List/>}{t('Articles', '文章列表')}</Button></div></header><div className="journal-layout"><aside className={`journal-sidebar ${open ? 'sidebar-open' : ''}`} aria-label={t('Article archive', '文章目录')}><p className="eyebrow mb-7">{blogPosts.length} {t('entries / Newest first', '篇文章 / 时间倒序')}</p>{years.map(year => <div key={year} className="mb-8"><h2 className="eyebrow text-primary mb-4">{year}</h2>{blogPosts.filter(post => post.date.startsWith(year)).map(post => <Button key={post.id} variant="ghost" onClick={() => select(post.id)} aria-pressed={selected?.id === post.id} className={`article-select ${selected?.id === post.id ? 'selected' : ''}`}><time dateTime={post.date}>{post.date.slice(5).replace('-', '.')}</time><span>{t(post.title, post.titleZh)}</span></Button>)}</div>)}</aside><div className="article-container">{selected ? <article key={selected.id}><header className="article-header"><div className="eyebrow flex flex-wrap gap-3"><time dateTime={selected.date}>{selected.date.split('-').join('.')}</time><span>/ {selected.minutes} {t('min read', '分钟阅读')}</span></div><h1>{t(selected.title, selected.titleZh)}</h1><p>{t(selected.summary, selected.summaryZh)}</p><div className="article-tags">{selected.tags.map(tag => <span key={tag}>{tag}</span>)}</div></header><div className="markdown-body"><ReactMarkdown remarkPlugins={[remarkGfm]} components={{ table: ({children}) => <div className="table-scroll"><table>{children}</table></div>, a: ({ href, children }) => href?.startsWith('/') ? <Link to={href === '/contact' ? '/#contact' : href}>{children}</Link> : <a href={href} rel="noopener noreferrer">{children}</a> }}>{language === 'zh' ? selected.contentZh : selected.content}</ReactMarkdown></div><footer className="article-footer"><p>{t('A question worth exploring together?', '有值得一起讨论的问题？')}</p><Button asChild variant="link" className="px-0"><Link to="/#contact">{t('Start a conversation', '开始对话')}<ArrowUpRight/></Link></Button></footer></article> : <div className="empty-state"><h2>{t('Article not found.', '未找到这篇文章。')}</h2><Button variant="link" onClick={() => setParams({})}>{t('Return to the notebook', '返回文章目录')}</Button></div>}</div></div></div></EditorialLayout>;
}
