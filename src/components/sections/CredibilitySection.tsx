import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Zap, 
  Cloud, 
  Radio, 
  MapPin, 
  Users, 
  Calendar, 
  Globe, 
  Server 
} from 'lucide-react';

const CredibilitySection = () => {
  const { t } = useLanguage();

  const metrics = [
    { 
      value: '15+', 
      labelEn: 'Years', 
      labelZh: '年', 
      descEn: 'Java Architecture', 
      descZh: 'Java架构开发' 
    },
    { 
      value: '8+', 
      labelEn: 'Years', 
      labelZh: '年', 
      descEn: 'GIS/Digital Twin', 
      descZh: 'GIS/数字孪生' 
    },
    { 
      value: '10+', 
      labelEn: 'Years', 
      labelZh: '年', 
      descEn: 'Internet Scale', 
      descZh: '互联网平台' 
    },
    { 
      value: '20+', 
      labelEn: 'People', 
      labelZh: '人', 
      descEn: 'Team Leadership', 
      descZh: '团队管理经验' 
    },
  ];

  const domains = [
    {
      icon: Zap,
      titleEn: 'High Concurrency',
      titleZh: '高并发系统',
      descEn: '100k QPS gateway experience',
      descZh: '10万QPS网关经验',
    },
    {
      icon: Cloud,
      titleEn: 'Cloud Native',
      titleZh: '云原生架构',
      descEn: 'K8s, Docker, Istio',
      descZh: 'K8s, Docker, Istio',
    },
    {
      icon: Radio,
      titleEn: 'IoT & Real-time',
      titleZh: '物联网 & 实时通信',
      descEn: 'MQTT, million-device connections',
      descZh: 'MQTT, 百万级设备接入',
    },
    {
      icon: MapPin,
      titleEn: 'Geospatial Systems',
      titleZh: '地理信息系统',
      descEn: 'ArcGIS, PostGIS, 3D tiling',
      descZh: 'ArcGIS, PostGIS, 3D瓦片',
    },
  ];

  return (
    <section id="credibility" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-mono mb-2 block">
            {'// '}{t('credentials', '资质概览')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('Credibility Snapshot', '能力快照')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              'Building production systems that scale, from startup speed to enterprise reliability.',
              '构建从初创速度到企业级可靠性的生产系统。'
            )}
          </p>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-card/50 border border-border hover:border-primary/50 transition-all duration-300 glow-box"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary glow-primary mb-2">
                {metric.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {t(metric.labelEn, metric.labelZh)}
              </div>
              <div className="text-sm text-foreground mt-1">
                {t(metric.descEn, metric.descZh)}
              </div>
            </div>
          ))}
        </div>

        {/* Domains grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {domains.map((domain, index) => {
            const Icon = domain.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-lg bg-card/30 border border-border hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {t(domain.titleEn, domain.titleZh)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(domain.descEn, domain.descZh)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CredibilitySection;
