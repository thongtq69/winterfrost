import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

type CardProps = PropsWithChildren<{
  className?: string;
}>;

const Card = ({ children, className }: CardProps) => (
  <div
    className={clsx(
      'section-card rounded-2xl bg-white/90 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-soft',
      className,
    )}
  >
    {children}
  </div>
);

export default Card;
