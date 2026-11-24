import { Server } from 'lucide-react';
import type { CaseItem } from '@/components/CaseCard';
import { governanceCases } from '@/data/profile';
// Compatibility for older sections. All facts now share the verified source.
export const allCases: CaseItem[] = governanceCases.map(item => ({
  icon: Server, titleEn: item.title.en, titleZh: item.title.zh,
  roleEn: item.role.en, roleZh: item.role.zh,
  contextEn: item.context.en, contextZh: item.context.zh,
  actionsEn: [item.action.en], actionsZh: [item.action.zh],
  outcomeEn: item.result.en, outcomeZh: item.result.zh,
  tags: [item.category.en],
}));
export const featuredCases = allCases.filter((_, index) => governanceCases[index]?.featured);
