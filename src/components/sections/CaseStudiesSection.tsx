import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, Building2, Radio, ArrowRight } from 'lucide-react';

const CaseStudiesSection = () => {
  const { t } = useLanguage();

  const cases = [
    {
      icon: Globe,
      titleEn: 'MYA Cards Global Platform',
      titleZh: 'MYA卡牌全球平台',
      roleEn: 'Chief Architect / Tech Lead',
      roleZh: '首席架构师 / 技术负责人',
      contextEn: 'Education + gaming card trading platform, dual-region (overseas + China)',
      contextZh: '教育+游戏卡牌交易平台，海外与国内双区部署',
      actionsEn: [
        'Designed global API gateway for multi-region routing',
        'Built card ownership verification system (<200ms)',
        'Completed dual-cloud migration in 1 week',
      ],
      actionsZh: [
        '设计全球API网关实现多区域路由',
        '构建卡牌所有权验证系统（<200ms响应）',
        '1周内完成双云迁移',
      ],
      outcomeEn: '0-to-1 platform launch in 5 months, 99.95% uptime, <0.1% complaint rate',
      outcomeZh: '5个月从0到1上线，99.95%可用性，<0.1%投诉率',
      tags: ['Global', 'API Gateway', 'Multi-Cloud'],
    },
    {
      icon: Building2,
      titleEn: 'Shanghai Smart City GIS Platform',
      titleZh: '上海智慧城市GIS平台',
      roleEn: 'Senior Architect (led 2-person R&D team)',
      roleZh: '高级架构师（带领2人研发团队）',
      contextEn: 'City-level spatial data infrastructure serving 40+ government bureaus',
      contextZh: '城市级空间数据基础设施，服务40+政府委办局',
      actionsEn: [
        'Architected GeoScene + 3D tile + MinIO stack',
        'Authored feasibility report',
        'Designed real-time data integration pipeline',
      ],
      actionsZh: [
        '架构GeoScene + 3D瓦片 + MinIO技术栈',
        '编写可行性研究报告',
        '设计实时数据集成管道',
      ],
      outcomeEn: 'Image processing 18h→2h (9x faster); secured 40M CNY government funding',
      outcomeZh: '影像处理18小时→2小时（提速9倍）；获得4000万政府资金支持',
      tags: ['GIS', '3D Visualization', 'Government'],
    },
    {
      icon: Radio,
      titleEn: 'IoT Platform (Gas IoT)',
      titleZh: '物联网平台（燃气IoT）',
      roleEn: 'Senior Tech Manager (led 6-person team)',
      roleZh: '高级技术经理（带领6人团队）',
      contextEn: 'Enterprise IoT for 2M+ gas meters and 300k alarms',
      contextZh: '企业级物联网平台，200万+燃气表，30万告警设备',
      actionsEn: [
        'Built million-connection gateway (Netty + MQTT)',
        'Implemented sharding for message ordering',
        'Optimized real-time alarm processing pipeline',
      ],
      actionsZh: [
        '构建百万连接网关（Netty + MQTT）',
        '实现分片策略保证消息顺序',
        '优化实时告警处理管道',
      ],
      outcomeEn: '10x QPS improvement (1k→10k); <0.01% message disorder rate',
      outcomeZh: 'QPS提升10倍（1k→10k）；消息乱序率<0.01%',
      tags: ['IoT', 'High Concurrency', 'Real-time'],
    },
  ];

  return (
    <section id="cases" className="py-20 px-4 bg-card/20">
      <div className="container mx-auto max-w-5xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-mono mb-2 block">
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
          {cases.map((caseItem, index) => {
            const Icon = caseItem.icon;
            return (
              <Card
                key={index}
                className="bg-card/50 border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="text-primary" size={24} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl md:text-2xl text-foreground mb-2">
                        {t(caseItem.titleEn, caseItem.titleZh)}
                      </CardTitle>
                      <p className="text-sm text-primary font-mono">
                        {t(caseItem.roleEn, caseItem.roleZh)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {caseItem.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Context */}
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      {t('Context', '背景')}
                    </h4>
                    <p className="text-foreground">
                      {t(caseItem.contextEn, caseItem.contextZh)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      {t('What I Did', '我的工作')}
                    </h4>
                    <ul className="space-y-2">
                      {(t(caseItem.actionsEn.join('|||'), caseItem.actionsZh.join('|||'))).split('|||').map((action, actionIndex) => (
                        <li key={actionIndex} className="flex items-start gap-2 text-foreground">
                          <ArrowRight className="flex-shrink-0 mt-1 text-primary" size={14} />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outcome */}
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      {t('Outcome', '成果')}
                    </h4>
                    <p className="text-primary font-medium glow-primary">
                      {t(caseItem.outcomeEn, caseItem.outcomeZh)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
