import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

type ContainerProps = PropsWithChildren<{
  className?: string;
}>;

const Container = ({ children, className }: ContainerProps) => (
  <div className={clsx('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>
);

export default Container;
