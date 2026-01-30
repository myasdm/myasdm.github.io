import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const isHomePage = location.pathname === '/';
  const isBlogPage = location.pathname === '/blog';

  const navItems = [
    { id: 'hero', en: 'Home', zh: '首页', isSection: true },
    { id: 'credibility', en: 'About', zh: '关于', isSection: true },
    { id: 'cases', en: 'Projects', zh: '项目', isSection: true },
    { id: 'how-i-work', en: 'Approach', zh: '方法', isSection: true },
    { id: 'timeline', en: 'Experience', zh: '经历', isSection: true },
    { id: 'blog', en: 'Blog', zh: '博客', isSection: false, path: '/blog' },
    { id: 'contact', en: 'Contact', zh: '联系', isSection: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (!isHomePage) return;

      // Update active section based on scroll position
      const sectionItems = navItems.filter(item => item.isSection);
      const sections = sectionItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleNavClick = (item: typeof navItems[0]) => {
    setIsMobileMenuOpen(false);
    
    if (!item.isSection && item.path) {
      // Navigate to different page
      navigate(item.path);
    } else if (item.isSection) {
      if (isHomePage) {
        // Scroll to section on home page
        const element = document.getElementById(item.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to home page with hash
        navigate(`/#${item.id}`);
      }
    }
  };

  const handleLogoClick = () => {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
    setIsMobileMenuOpen(false);
  };

  const isActiveItem = (item: typeof navItems[0]) => {
    if (!item.isSection && item.path) {
      return location.pathname === item.path;
    }
    return isHomePage && activeSection === item.id;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Name */}
          <button
            onClick={handleLogoClick}
            className="text-lg font-bold text-primary hover-glow"
          >
            {t('Deming Song', '宋德明')}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`text-sm transition-all duration-200 hover-glow ${
                  isActiveItem(item)
                    ? 'text-primary glow-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t(item.en, item.zh)}
              </button>
            ))}
            
            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="ml-4 border-primary/30 hover:border-primary hover:bg-primary/10 text-primary"
            >
              {language === 'en' ? '中文' : 'EN'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="border-primary/30 hover:border-primary hover:bg-primary/10 text-primary"
            >
              {language === 'en' ? '中文' : 'EN'}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-primary"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`block w-full text-left py-3 px-4 transition-all duration-200 ${
                  isActiveItem(item)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-primary/5'
                }`}
              >
                {t(item.en, item.zh)}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
