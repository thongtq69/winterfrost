import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

type BadgeProps = PropsWithChildren<{
  className?: string;
}>;

const Badge = ({ children, className }: BadgeProps) => (
  <span
    className={clsx(
      'inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700',
      className,
    )}
  >
    {children}
  </span>
);

export default Badge;
