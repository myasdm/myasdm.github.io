import { useLanguage } from '@/contexts/LanguageContext';
import { useMobileOptimized } from '@/hooks/useMobileOptimized';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, LucideIcon } from 'lucide-react';

export interface CaseItem {
  icon: LucideIcon;
  titleEn: string;
  titleZh: string;
  roleEn: string;
  roleZh: string;
  contextEn: string;
  contextZh: string;
  actionsEn: string[];
  actionsZh: string[];
  outcomeEn: string;
  outcomeZh: string;
  tags: string[];
}

interface CaseCardProps {
  caseItem: CaseItem;
  isVisible?: boolean;
}

const CaseCard = ({ caseItem, isVisible = true }: CaseCardProps) => {
  const { t } = useLanguage();
  const { shouldReduceAnimations } = useMobileOptimized();
  const Icon = caseItem.icon;

  return (
    <Card
      className={`group bg-card/50 border-border transition-all duration-300 overflow-hidden cursor-default
        hover:border-primary/70 active:border-primary/70
        ${shouldReduceAnimations ? '' : 'hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_hsl(var(--primary)/0.3),0_0_20px_hsl(var(--primary)/0.1)]'}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center transition-all duration-300 ${
            shouldReduceAnimations ? '' : 'group-hover:bg-primary/20 group-hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)]'
          }`}>
            <Icon className={`text-primary transition-transform duration-300 ${shouldReduceAnimations ? '' : 'group-hover:scale-110'}`} size={24} />
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
};

export default CaseCard;
