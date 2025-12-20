import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

const Chip = ({ children, active, className, ...props }: ChipProps) => (
  <button
    className={clsx(
      'whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500',
      active ? 'border-brand-300 bg-brand-50 text-brand-700' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

export default Chip;
