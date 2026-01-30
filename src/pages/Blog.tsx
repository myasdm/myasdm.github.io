import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { useMobileOptimized } from '@/hooks/useMobileOptimized';
import CodeRain from '@/components/CodeRain';
import CursorGlow from '@/components/CursorGlow';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Calendar, ChevronRight, Menu, X } from 'lucide-react';
import { getSortedBlogPosts, getBlogPostById, type BlogPost } from '@/data/blog';

const BlogContent = () => {
  const { t } = useLanguage();
  const { shouldReduceAnimations, isMobile } = useMobileOptimized();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  
  const posts = getSortedBlogPosts();
  const selectedPostId = searchParams.get('post') || posts[0]?.id;
  const selectedPost = getBlogPostById(selectedPostId);

  // Update sidebar state when mobile changes
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedPostId]);

  const selectPost = (postId: string) => {
    setSearchParams({ post: postId });
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Group posts by year
  const postsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {} as Record<string, BlogPost[]>);

  return (
    <div className="relative min-h-screen bg-background">
      <CodeRain />
      <CursorGlow />
      <ScrollProgress />
      <BackToTop />
      <Navigation />

      <div className="relative z-10 pt-16 min-h-screen flex">
        {/* Mobile sidebar toggle */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="fixed top-20 left-4 z-50 bg-card/80 backdrop-blur-sm border border-border hover:bg-primary/10 hover:border-primary"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        )}

        {/* Sidebar */}
        <aside
          className={`${
            isMobile
              ? `fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ${
                  sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`
              : 'w-72 flex-shrink-0'
          } pt-16 bg-card/50 backdrop-blur-sm border-r border-border`}
        >
          <div className="p-4 border-b border-border">
            <Link to="/">
              <Button
                variant="ghost"
                size="sm"
                className={`text-muted-foreground hover:text-primary active:text-primary transition-all duration-300 ${
                  shouldReduceAnimations ? '' : 'hover:-translate-x-1'
                }`}
              >
                <ArrowLeft size={16} className="mr-2" />
                {t('Back to Home', '返回首页')}
              </Button>
            </Link>
          </div>

          <div className="p-4">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="text-primary font-mono">{'>'}</span>
              {t('Blog Posts', '博客文章')}
            </h2>
          </div>

          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="px-4 pb-4 space-y-6">
              {Object.entries(postsByYear)
                .sort(([a], [b]) => Number(b) - Number(a))
                .map(([year, yearPosts]) => (
                  <div key={year}>
                    <h3 className="text-sm font-mono text-primary mb-3 flex items-center gap-2">
                      <Calendar size={14} />
                      {year}
                    </h3>
                    <div className="space-y-2">
                      {yearPosts.map((post) => {
                        const isActive = post.id === selectedPostId;
                        return (
                          <button
                            key={post.id}
                            onClick={() => selectPost(post.id)}
                            className={`w-full text-left p-3 rounded-lg transition-all duration-300 group ${
                              isActive
                                ? 'bg-primary/20 border border-primary/50'
                                : 'bg-card/30 border border-transparent hover:border-primary/30 hover:bg-primary/10'
                            }`}
                          >
                            <p
                              className={`text-sm font-medium line-clamp-2 transition-colors duration-300 ${
                                isActive ? 'text-primary' : 'text-foreground group-hover:text-primary'
                              }`}
                            >
                              {t(post.title, post.titleZh)}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatDate(post.date)}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Mobile overlay */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className={`flex-1 ${isMobile ? 'w-full' : ''}`}>
          {selectedPost ? (
            <article className="max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-12">
              {/* Article header */}
              <header className="mb-8 pb-8 border-b border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono mb-4">
                  <Calendar size={14} className="text-primary" />
                  {formatDate(selectedPost.date)}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t(selectedPost.title, selectedPost.titleZh)}
                </h1>
                <p className="text-lg text-muted-foreground mb-4">
                  {t(selectedPost.summary, selectedPost.summaryZh)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </header>

              {/* Article content */}
              <div className="prose prose-invert prose-primary max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold text-foreground mt-8 mb-4">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold text-foreground mt-8 mb-4 flex items-center gap-2">
                        <span className="text-primary">##</span> {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">{children}</h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-foreground/90 leading-relaxed mb-4">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-none space-y-2 mb-4">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside space-y-2 mb-4 text-foreground/90">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="flex items-start gap-2 text-foreground/90">
                        <ChevronRight size={16} className="flex-shrink-0 mt-1 text-primary" />
                        <span>{children}</span>
                      </li>
                    ),
                    code: ({ className, children }) => {
                      const isInline = !className;
                      if (isInline) {
                        return (
                          <code className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono text-sm">
                            {children}
                          </code>
                        );
                      }
                      return (
                        <code className="block p-4 rounded-lg bg-card/80 border border-border overflow-x-auto font-mono text-sm text-foreground/90">
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="mb-4 overflow-x-auto">{children}</pre>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
                        {children}
                      </blockquote>
                    ),
                    a: ({ href, children }) => (
                      <Link
                        to={href || '#'}
                        className="text-primary hover:underline transition-colors"
                      >
                        {children}
                      </Link>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto mb-4">
                        <table className="w-full border-collapse border border-border rounded-lg overflow-hidden">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-primary/10">{children}</thead>
                    ),
                    th: ({ children }) => (
                      <th className="px-4 py-2 text-left text-primary font-semibold border-b border-border">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-4 py-2 text-foreground/90 border-b border-border">
                        {children}
                      </td>
                    ),
                    hr: () => <hr className="my-8 border-border" />,
                    em: ({ children }) => <em className="text-primary/80">{children}</em>,
                    strong: ({ children }) => (
                      <strong className="font-semibold text-foreground">{children}</strong>
                    ),
                  }}
                >
                  {selectedPost.content}
                </ReactMarkdown>
              </div>

              {/* Article footer */}
              <footer className="mt-12 pt-8 border-t border-border">
                <p className="text-muted-foreground text-center">
                  {t(
                    'Thanks for reading! Feel free to reach out if you have questions.',
                    '感谢阅读！如有问题欢迎联系我。'
                  )}
                </p>
                <div className="flex justify-center mt-4">
                  <Link to="/#contact">
                    <Button
                      className={`bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/90 transition-all duration-300 ${
                        shouldReduceAnimations ? '' : 'hover:-translate-y-1'
                      }`}
                    >
                      {t("Let's Talk", '联系我')}
                    </Button>
                  </Link>
                </div>
              </footer>
            </article>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">{t('Select a post to read', '选择一篇文章阅读')}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const Blog = () => {
  return (
    <LanguageProvider>
      <BlogContent />
    </LanguageProvider>
  );
};

export default Blog;
