import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { GovernanceCase as Case } from '@/data/profile';
import { Button } from '@/components/ui/button';
export default function GovernanceCase({ item, compact = false }: { item: Case; compact?: boolean }) {
  const { language, t } = useLanguage();
  return <article id={item.id} className="case-entry group">
    <div className="case-meta"><p className="eyebrow text-primary">{item.category[language]}</p><p className="text-sm text-muted-foreground">{item.date}</p></div>
    <div className="min-w-0"><h3 className="case-title">{item.title[language]}</h3><p className="case-context">{item.context[language]}</p>
      {compact ? <Button asChild variant="link" className="px-0 h-auto mt-5"><a href={`#/cases#${item.id}`}>{t('Read case', '阅读案例')}<ArrowUpRight size={15}/></a></Button> : <dl className="case-details"><dt>{t('Action', '亲自实践')}</dt><dd>{item.action[language]}</dd><dt>{t('Result', '实际结果')}</dt><dd>{item.result[language]}</dd></dl>}
    </div><div className="case-metric"><strong>{item.metric}</strong><span>{item.metricLabel[language]}</span></div>
  </article>;
}
