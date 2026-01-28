import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal, useStaggeredReveal } from '@/hooks/useScrollReveal';
import { 
  Target, 
  BarChart3, 
  Rocket, 
  FileText, 
  Wrench, 
  MessageSquare 
} from 'lucide-react';

const HowIWorkSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();
  const principlesVisible = useStaggeredReveal(6, isVisible, 100);

  const principles = [
    {
      icon: Target,
      titleEn: 'Start with constraints, not features',
      titleZh: '从约束出发，而非功能',
      descEn: 'Production reality shapes architecture. I design for what you can\'t change.',
      descZh: '生产环境决定架构。我为无法改变的约束设计。',
    },
    {
      icon: BarChart3,
      titleEn: 'Measure first, optimize second',
      titleZh: '先度量，后优化',
      descEn: 'Data-driven decisions. Every optimization starts with a baseline.',
      descZh: '数据驱动决策。每次优化都从基准开始。',
    },
    {
      icon: Rocket,
      titleEn: 'Build for scale, ship for speed',
      titleZh: '为规模构建，为速度交付',
      descEn: 'Pragmatic trade-offs. The right architecture at the right time.',
      descZh: '务实权衡。在正确的时间选择正确的架构。',
    },
    {
      icon: FileText,
      titleEn: 'Document decisions, not just code',
      titleZh: '记录决策，而非仅仅代码',
      descEn: 'Institutional knowledge matters. Future teams will thank you.',
      descZh: '组织知识很重要。未来的团队会感谢你。',
    },
    {
      icon: Wrench,
      titleEn: 'Hands-on when needed',
      titleZh: '需要时亲力亲为',
      descEn: 'Not afraid to debug at 2am. I ship alongside my team.',
      descZh: '不怕凌晨2点调试。我和团队一起交付。',
    },
    {
      icon: MessageSquare,
      titleEn: 'Clear communication',
      titleZh: '清晰沟通',
      descEn: 'Translate tech complexity for stakeholders. Bridge the gap.',
      descZh: '为利益相关者翻译技术复杂性。弥合差距。',
    },
  ];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="how-i-work"
      className={`py-20 px-4 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto max-w-5xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-mono mb-2 block">
            {'// '}{t('approach', '工作方式')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('How I Work', '我的工作方式')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              'Principles that guide my approach to building systems and leading teams.',
              '指导我构建系统和领导团队的原则。'
            )}
          </p>
        </div>

        {/* Principles grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <div
                key={index}
                className={`group p-6 rounded-lg bg-card/30 border border-border hover:border-primary/50 transition-all duration-500 ${
                  principlesVisible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="text-primary" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t(principle.titleEn, principle.titleZh)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(principle.descEn, principle.descZh)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowIWorkSection;
