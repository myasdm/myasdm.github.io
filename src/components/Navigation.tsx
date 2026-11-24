import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const { language, toggleLanguage, t } = useLanguage();
  const { pathname, hash } = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname, hash]);
  const links = [{ path: '/', en: 'Index', zh: '首页' }, { path: '/blog', en: 'Writing', zh: '文章' }, { path: '/cases', en: 'Case logs', zh: '案例' }, { path: '/about', en: 'About', zh: '关于' }];
  return <header className="site-header"><nav className="editorial-container header-inner" aria-label={t('Main navigation', '主导航')}>
    <Button asChild variant="link" className="brand"><Link to="/">DS<span className="text-primary">.</span></Link></Button>
    <div className="hidden md:flex items-center gap-2">{links.map(link => <Button key={link.path} asChild variant="ghost" className={`nav-link ${pathname === link.path ? 'nav-active' : ''}`}><Link aria-current={pathname === link.path ? 'page' : undefined} to={link.path}>{t(link.en, link.zh)}</Link></Button>)}</div>
    <div className="flex items-center gap-2 md:gap-5"><Button variant="ghost" size="sm" onClick={toggleLanguage} className="language-control" aria-label={t('Switch to Chinese', '切换英文')}>{language === 'en' ? 'EN / 中文' : '中文 / EN'}</Button><Button asChild variant="link" className="hidden sm:inline-flex px-0"><Link to="/#contact">{t('Get in touch', '联系我')}<span aria-hidden="true">↗</span></Link></Button><Button variant="ghost" size="icon" className="md:hidden" aria-label={t('Toggle menu', '展开菜单')} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</Button></div>
    {open && <div className="mobile-navigation">{links.map(link => <Button key={link.path} asChild variant="ghost" className="justify-start"><Link to={link.path}>{t(link.en, link.zh)}</Link></Button>)}<Button asChild variant="ghost" className="justify-start"><Link to="/#contact">{t('Get in touch', '联系我')}</Link></Button></div>}
  </nav></header>;
}
