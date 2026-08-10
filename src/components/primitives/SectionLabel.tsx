import { cn } from "@/lib/utils";
import s from "./SectionLabel.module.css";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
  /** When set, renders a colored dot instead of the default `+` icon. */
  dotClassName?: string;
};

export function SectionLabel({ children, className, dotClassName }: SectionLabelProps) {
  return (
    <span className={cn(s.container, className)}>
      {dotClassName ? (
        <span aria-hidden className={cn(s.dot, dotClassName)} />
      ) : (
        <span aria-hidden className={s.icon}>
          <svg overflow="visible" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinejoin="round" d="m1 32 25 6 6 25 6-25 25-6-25-6-6-25-6 25z" />
          </svg>
        </span>
      )}
      <span className={s.text}>{children}</span>
    </span>
  );
}
