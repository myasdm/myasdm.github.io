import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal';
import { useMobileOptimized } from '@/hooks/useMobileOptimized';
import CodeRain from '@/components/CodeRain';
import CursorGlow from '@/components/CursorGlow';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import Navigation from '@/components/Navigation';
import CaseCard from '@/components/CaseCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { allCases } from '@/data/cases';

const AllCasesContent = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollReveal();
  const { shouldReduceAnimations } = useMobileOptimized();
  const casesVisible = useStaggeredReveal(allCases.length, isVisible, 100);

  const handleContactClick = () => {
    navigate('/');
    // Wait for navigation then scroll to contact section
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <CodeRain />
      <CursorGlow />
      <ScrollProgress />
      <BackToTop />
      <Navigation />

      <main className="relative z-10 pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Back button */}
          <Link to="/#cases">
            <Button
              variant="ghost"
              className={`mb-8 text-muted-foreground hover:text-primary active:text-primary transition-all duration-300 ${
                shouldReduceAnimations ? '' : 'hover:-translate-x-1'
              }`}
            >
              <ArrowLeft size={18} className="mr-2" />
              {t('Back to Home', '返回首页')}
            </Button>
          </Link>

          {/* Page header */}
          <div 
            ref={ref as React.RefObject<HTMLDivElement>}
            className={`text-center mb-16 transition-all ${shouldReduceAnimations ? 'duration-300' : 'duration-700'} ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className={`text-primary text-sm font-mono mb-2 block ${shouldReduceAnimations ? '' : 'animate-pulse'}`}>
              {'// '}{t('all_projects', '全部项目')}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('All Case Studies', '全部案例')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t(
                'A comprehensive collection of projects spanning IoT, e-commerce, GIS, and enterprise systems.',
                '涵盖物联网、电商、GIS和企业系统的完整项目集合。'
              )}
            </p>
            <div className="mt-4 text-sm text-muted-foreground font-mono">
              {t(`${allCases.length} projects`, `共 ${allCases.length} 个项目`)}
            </div>
          </div>

          {/* All cases */}
          <div className="space-y-8">
            {allCases.map((caseItem, index) => (
              <CaseCard
                key={index}
                caseItem={caseItem}
                isVisible={casesVisible[index]}
              />
            ))}
          </div>

          {/* Footer CTA */}
          <div className={`mt-16 text-center transition-all ${shouldReduceAnimations ? 'duration-300' : 'duration-700'} delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <p className="text-muted-foreground mb-6">
              {t(
                'Interested in working together? Let\'s discuss your project.',
                '有兴趣合作？让我们讨论您的项目。'
              )}
            </p>
            <Button
              size="lg"
              onClick={handleContactClick}
              className={`bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/90 px-8 py-6 text-lg transition-all duration-300 ${
                shouldReduceAnimations ? '' : 'hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.5)]'
              }`}
            >
              {t("Let's Talk", '联系我')}
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground text-sm font-mono">
            {'© '}{new Date().getFullYear()} {t('Deming Song', '宋德明')} {'// '} 
            {t('Built with React + TypeScript', '使用 React + TypeScript 构建')}
          </p>
        </div>
      </footer>
    </div>
  );
};

const AllCases = () => {
  return (
    <LanguageProvider>
      <AllCasesContent />
    </LanguageProvider>
  );
};

export default AllCases;
