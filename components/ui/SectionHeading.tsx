import clsx from 'clsx';
import type { ReactNode } from 'react';
import Badge from './Badge';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

const SectionHeading = ({ eyebrow, title, description, action, align = 'left', className }: SectionHeadingProps) => (
  <div
    className={clsx(
      'flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
      align === 'center' && 'items-center text-center sm:text-left',
      className,
    )}
  >
    <div className="space-y-2">
      {eyebrow && <Badge className="bg-brand-50 text-xs text-brand-700">{eyebrow}</Badge>}
      <h2 className="text-2xl font-extrabold sm:text-3xl">{title}</h2>
      {description && <p className="max-w-2xl text-sm text-gray-600 sm:text-base">{description}</p>}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);

export default SectionHeading;
