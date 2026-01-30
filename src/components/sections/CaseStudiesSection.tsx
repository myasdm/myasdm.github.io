import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal';
import { useMobileOptimized } from '@/hooks/useMobileOptimized';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import CaseCard from '@/components/CaseCard';
import { featuredCases } from '@/data/cases';

const CaseStudiesSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const casesVisible = useStaggeredReveal(featuredCases.length, isVisible, 200);
  const { t } = useLanguage();
  const { shouldReduceAnimations } = useMobileOptimized();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="cases"
      className={`py-20 px-4 bg-card/20 transition-all ${shouldReduceAnimations ? 'duration-300' : 'duration-700'} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto max-w-5xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className={`text-primary text-sm font-mono mb-2 block ${shouldReduceAnimations ? '' : 'animate-pulse'}`}>
            {'// '}{t('featured_projects', '精选项目')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('Selected Case Studies', '案例研究')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              'Real problems, measurable outcomes. Here\'s how I approach complex systems.',
              '真实问题，可衡量成果。我如何处理复杂系统。'
            )}
          </p>
        </div>

        {/* Cases */}
        <div className="space-y-8">
          {featuredCases.map((caseItem, index) => (
            <CaseCard
              key={index}
              caseItem={caseItem}
              isVisible={casesVisible[index]}
            />
          ))}
        </div>

        {/* More Cases Button */}
        <div className={`mt-12 text-center transition-all ${shouldReduceAnimations ? 'duration-300' : 'duration-700'} delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <Link to="/cases">
            <Button
              variant="outline"
              size="lg"
              className={`group border-primary/30 hover:border-primary active:border-primary hover:bg-primary/10 active:bg-primary/10 text-primary px-8 py-6 text-lg transition-all duration-300 ${
                shouldReduceAnimations ? '' : 'hover:-translate-y-1'
              }`}
            >
              <span className={shouldReduceAnimations ? '' : 'group-hover:mr-2 transition-all duration-300'}>
                {t('More Cases', '更多案例')}
              </span>
              <ArrowRight 
                size={18} 
                className={shouldReduceAnimations ? 'ml-2' : 'ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0'}
              />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
