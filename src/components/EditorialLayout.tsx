import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import Navigation from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { profile } from '@/data/profile';

export default function EditorialLayout({ children }: { children: ReactNode }) {
  const { pathname, hash } = useLocation();
  const { language, t } = useLanguage();
  useEffect(() => {
    if (hash) {
      const frame = requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant', block: 'start' }));
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  return <div className="min-h-screen bg-background text-foreground"><Navigation/><main id="main-content">{children}</main><footer className="site-footer editorial-container"><div><span className="font-medium">{profile.name[language]}</span><p className="text-xs text-muted-foreground mt-2">© {new Date().getFullYear()} · {t('Built with intention.', '保持清晰，持续构建。')}</p></div><div className="flex gap-3"><Button asChild variant="link"><Link to="/blog">{t('Writing', '文章')}</Link></Button><Button asChild variant="link"><a href={`mailto:${profile.email}`}>Email ↗</a></Button><Button variant="ghost" size="icon" aria-label={t('Back to top', '返回顶部')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</Button></div></footer></div>;
}
