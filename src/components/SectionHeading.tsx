import type { ReactNode } from 'react';
export default function SectionHeading({ number, label, title, children }: { number: string; label: string; title: string; children?: ReactNode }) {
  return <header className="section-heading"><div><p className="eyebrow"><span className="text-primary">§ {number}</span> / {label}</p><h2 className="section-title">{title}</h2></div>{children}</header>;
}
