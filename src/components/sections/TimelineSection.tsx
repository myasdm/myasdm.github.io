import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal';
import { GraduationCap } from 'lucide-react';

const TimelineSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const experiencesVisible = useStaggeredReveal(6, isVisible, 150);
  const { t } = useLanguage();

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
    },
  ];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="timeline"
      className={`py-20 px-4 bg-card/20 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto max-w-4xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-mono mb-2 block">
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
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row items-start mb-8 transition-all duration-500 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } ${experiencesVisible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 w-3 h-3 rounded-full bg-primary glow-border transform -translate-x-1/2 mt-2" />

              {/* Content */}
              <div
                className={`ml-6 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                }`}
              >
                <div className="p-4 rounded-lg bg-card/50 border border-border hover:border-primary/50 transition-all duration-300">
                  <span className="text-sm text-primary font-mono">
                    {t(exp.period, exp.periodZh)}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground mt-1">
                    {t(exp.titleEn, exp.titleZh)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(exp.companyEn, exp.companyZh)}
                  </p>
                  <p className="text-sm text-foreground/80 mt-2">
                    {t(exp.highlightEn, exp.highlightZh)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border">
            <GraduationCap className="text-primary" size={24} />
            <div className="text-left">
              <p className="text-foreground font-medium">
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
