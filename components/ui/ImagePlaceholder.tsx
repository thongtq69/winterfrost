import { ImageIcon } from 'lucide-react';
import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

type ImagePlaceholderProps = PropsWithChildren<{
  aspect?: string;
  label?: string;
  className?: string;
}>;

const ImagePlaceholder = ({ aspect = 'aspect-[4/3]', label = 'Placeholder', className, children }: ImagePlaceholderProps) => (
  <div
    className={clsx(
      'relative overflow-hidden rounded-2xl border border-dashed border-gray-200 bg-gray-50',
      aspect,
      className,
    )}
  >
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400">
      <ImageIcon />
      <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
      {children}
    </div>
  </div>
);

export default ImagePlaceholder;
