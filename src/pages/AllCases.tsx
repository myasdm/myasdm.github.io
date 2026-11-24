import EditorialLayout from '@/components/EditorialLayout';
import GovernanceCase from '@/components/GovernanceCase';
import { governanceCases } from '@/data/profile';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
export default function AllCases() {
  const { t } = useLanguage();
  return <EditorialLayout><div className="editorial-container"><header className="page-heading"><p className="eyebrow">{t(`Archive / ${String(governanceCases.length).padStart(2, '0')} case logs`, `档案 / ${governanceCases.length} 个案例`)}</p><h1>{t('The work, in context.', '在情境中理解实践。')}</h1><p>{t('Real constraints. Personal contributions. Recorded outcomes. Projects from 2011 to the present.', '真实约束、亲自实践与可衡量的结果。记录 2011 年至今的项目。')}</p></header><div>{governanceCases.map(item => <GovernanceCase key={item.id} item={item}/>)}</div><div className="archive-contact"><h2 className="section-title">{t('A similar challenge?', '正在面对类似的问题？')}</h2><Button asChild variant="link"><Link to="/#contact">{t('Start a conversation', '联系我')}<ArrowUpRight/></Link></Button></div></div></EditorialLayout>;
}
