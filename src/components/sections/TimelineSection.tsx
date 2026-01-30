import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal';
import { useMobileOptimized } from '@/hooks/useMobileOptimized';
import { GraduationCap, Briefcase, ChevronRight } from 'lucide-react';

const TimelineSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const experiencesVisible = useStaggeredReveal(6, isVisible, 150);
  const { t } = useLanguage();
  const { shouldReduceAnimations, isMobile } = useMobileOptimized();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const experiences = [
    {
      period: '2024 – Present',
      periodZh: '2024 – 至今',
      titleEn: 'Chief Architect',
      titleZh: '首席架构师',
      companyEn: 'MYA Cards',
      companyZh: 'MYA卡牌',
      highlightEn: 'Global platform, dual-region architecture',
      highlightZh: '全球平台，双区域架构',
      icon: Briefcase,
    },
    {
      period: '2020 – 2023',
      periodZh: '2020 – 2023',
      titleEn: 'Senior Tech Manager',
      titleZh: '高级技术经理',
      companyEn: 'Gas IoT Platform',
      companyZh: '燃气物联网平台',
      highlightEn: '2M+ devices, million-connection gateway',
      highlightZh: '200万+设备，百万连接网关',
      icon: Briefcase,
    },
    {
      period: '2018 – 2020',
      periodZh: '2018 – 2020',
      titleEn: 'Senior Dev Manager',
      titleZh: '高级研发经理',
      companyEn: 'Hanwei E-commerce',
      companyZh: '汉威电商',
      highlightEn: '30M GMV, social commerce',
      highlightZh: '3000万GMV，社交电商',
      icon: Briefcase,
    },
    {
      period: '2016 – 2018',
      periodZh: '2016 – 2018',
      titleEn: 'Advertising Platform Lead',
      titleZh: '广告平台负责人',
      companyEn: 'Wanda / Feifan',
      companyZh: '万达 / 飞凡',
      highlightEn: '10-person team, programmatic ads',
      highlightZh: '10人团队，程序化广告',
      icon: Briefcase,
    },
    {
      period: '2015 – 2016',
      periodZh: '2015 – 2016',
      titleEn: 'Tech Manager',
      titleZh: '技术经理',
      companyEn: 'Suning Advertising',
      companyZh: '苏宁广告',
      highlightEn: 'Ad serving infrastructure',
      highlightZh: '广告投放基础设施',
      icon: Briefcase,
    },
    {
      period: '2011 – 2015',
      periodZh: '2011 – 2015',
      titleEn: 'GIS Developer / Architect',
      titleZh: 'GIS开发工程师 / 架构师',
      companyEn: 'Government Systems',
      companyZh: '政府系统项目',
      highlightEn: 'Spatial data, government platforms',
      highlightZh: '空间数据，政府平台',
      icon: Briefcase,
    },
  ];

  // On mobile, use tap instead of hover
  const handleInteraction = (index: number) => {
    if (isMobile) {
      setHoveredIndex(hoveredIndex === index ? null : index);
    }
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="timeline"
      className={`py-20 px-4 bg-card/20 transition-all ${shouldReduceAnimations ? 'duration-300' : 'duration-700'} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto max-w-4xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className={`text-primary text-sm font-mono mb-2 block ${shouldReduceAnimations ? '' : 'animate-pulse'}`}>
            {'// '}{t('experience', '工作经历')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('Experience Timeline', '职业历程')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              '15+ years of progressive responsibility across IoT, e-commerce, and enterprise platforms.',
              '15年以上物联网、电商和企业平台的渐进式责任。'
            )}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line - simplified on mobile */}
          <div 
            className={`absolute left-0 md:left-1/2 top-0 w-px md:transform md:-translate-x-1/2 transition-all ${shouldReduceAnimations ? 'duration-500' : 'duration-1000'} ${
              isVisible ? 'h-full' : 'h-0'
            }`}
            style={{
              background: shouldReduceAnimations 
                ? 'hsl(var(--primary)/0.5)' 
                : 'linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--primary)/0.3) 50%, hsl(var(--primary)) 100%)',
              boxShadow: shouldReduceAnimations ? 'none' : '0 0 10px hsl(var(--primary)/0.5), 0 0 20px hsl(var(--primary)/0.3)',
            }}
          />

          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-start mb-12 transition-all ${shouldReduceAnimations ? 'duration-300' : 'duration-500'} ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } ${experiencesVisible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                onClick={() => handleInteraction(index)}
              >
                {/* Enhanced timeline dot - simplified pulse on mobile */}
                <div 
                  className={`absolute left-0 md:left-1/2 transform -translate-x-1/2 mt-4 z-10 transition-all duration-300 ${
                    isHovered && !shouldReduceAnimations ? 'scale-150' : 'scale-100'
                  }`}
                >
                  {/* Outer pulse ring - only on desktop */}
                  {!shouldReduceAnimations && (
                    <div 
                      className={`absolute inset-0 w-4 h-4 rounded-full bg-primary/30 ${
                        isHovered ? 'animate-ping' : ''
                      }`} 
                    />
                  )}
                  {/* Inner dot */}
                  <div 
                    className="relative w-4 h-4 rounded-full bg-primary flex items-center justify-center"
                    style={{
                      boxShadow: isHovered && !shouldReduceAnimations
                        ? '0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary)/0.5)'
                        : shouldReduceAnimations ? 'none' : '0 0 10px hsl(var(--primary)/0.5)',
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                  </div>
                </div>

                {/* Connector line animation - only on desktop */}
                {!isMobile && (
                  <div 
                    className={`hidden md:block absolute top-6 h-px transition-all duration-500 ${
                      index % 2 === 0 
                        ? 'right-1/2 mr-2' 
                        : 'left-1/2 ml-2'
                    } ${isHovered ? 'w-8 opacity-100' : 'w-4 opacity-50'}`}
                    style={{
                      background: 'linear-gradient(90deg, transparent, hsl(var(--primary)))',
                      boxShadow: isHovered && !shouldReduceAnimations ? '0 0 10px hsl(var(--primary)/0.5)' : 'none',
                    }}
                  />
                )}

                {/* Content card with enhanced hover effects */}
                <div
                  className={`ml-8 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'
                  }`}
                >
                  <div 
                    className={`group p-5 rounded-lg bg-card/50 border transition-all duration-300 cursor-pointer ${
                      isHovered 
                        ? `border-primary bg-card/80 ${shouldReduceAnimations ? '' : '-translate-y-2'}` 
                        : 'border-border hover:border-primary/50 active:border-primary/50'
                    }`}
                    style={{
                      boxShadow: isHovered && !shouldReduceAnimations
                        ? '0 10px 40px -10px hsl(var(--primary)/0.3), 0 0 20px hsl(var(--primary)/0.1)'
                        : 'none',
                    }}
                  >
                    {/* Period badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-3 transition-all duration-300 ${
                      isHovered 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      <Icon size={12} />
                      {t(exp.period, exp.periodZh)}
                    </div>
                    
                    {/* Title with glow effect - simplified on mobile */}
                    <h3 className={`text-lg font-semibold text-foreground mb-1 transition-all duration-300 ${
                      isHovered && !shouldReduceAnimations ? 'glow-primary' : ''
                    }`}>
                      {t(exp.titleEn, exp.titleZh)}
                    </h3>
                    
                    {/* Company */}
                    <p className="text-muted-foreground mb-2">
                      {t(exp.companyEn, exp.companyZh)}
                    </p>
                    
                    {/* Highlight with reveal animation */}
                    <div className={`flex items-center gap-2 text-sm transition-all duration-300 ${
                      index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                    } ${isHovered ? 'text-primary' : 'text-foreground/70'}`}>
                      <ChevronRight 
                        size={14} 
                        className={`transition-transform duration-300 ${
                          isHovered && !shouldReduceAnimations ? 'translate-x-1' : ''
                        }`} 
                      />
                      <span>{t(exp.highlightEn, exp.highlightZh)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Education with enhanced animation */}
        <div className={`mt-16 text-center transition-all ${shouldReduceAnimations ? 'duration-300' : 'duration-700'} delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className={`inline-flex items-center gap-4 p-5 rounded-lg bg-card/50 border border-border hover:border-primary/50 active:border-primary/50 transition-all duration-300 group cursor-pointer ${
            shouldReduceAnimations ? '' : 'hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.3)]'
          }`}>
            <div className="relative">
              {!shouldReduceAnimations && (
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
              <GraduationCap className={`relative text-primary transition-transform duration-300 ${shouldReduceAnimations ? '' : 'group-hover:scale-110'}`} size={28} />
            </div>
            <div className="text-left">
              <p className={`text-foreground font-medium transition-colors duration-300 ${shouldReduceAnimations ? '' : 'group-hover:text-primary'}`}>
                {t("Master's in GIS", 'GIS硕士学位')}
              </p>
              <p className="text-sm text-muted-foreground">
                {t('China Agricultural University, 2007', '中国农业大学, 2007')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
