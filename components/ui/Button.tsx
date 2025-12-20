import clsx from 'clsx';
import { cloneElement, isValidElement } from 'react';
import type { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  fullWidth?: boolean;
  asChild?: boolean;
};

const variantStyles: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white shadow-ring hover:bg-brand-700',
  secondary: 'bg-white text-ink shadow-card border border-white/60 hover:-translate-y-0.5 hover:shadow-soft',
  ghost: 'bg-transparent text-ink hover:bg-white/70 border border-transparent',
  outline: 'bg-transparent text-ink border border-gray-200 hover:-translate-y-0.5 hover:shadow-soft',
};

const sizeStyles: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

export const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth,
  asChild,
  ...props
}: ButtonProps) => (
  asChild && isValidElement(children) ? (
    cloneElement(children as ReactElement<{ className?: string; children?: ReactNode }>, {
      className: clsx(
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        (children as ReactElement<{ className?: string }>).props?.className,
        className,
      ),
      ...props,
      children: (
        <>
          {icon && <span className="inline-flex">{icon}</span>}
          {(children as ReactElement<{ children?: ReactNode }>).props?.children ?? children}
        </>
      ),
    })
  ) : (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {icon && <span className="inline-flex">{icon}</span>}
      {children}
    </button>
  )
);

export default Button;
