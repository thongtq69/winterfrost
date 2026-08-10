import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "cta-pill" | "white-pill" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
  external?: boolean;
};

const SIZE: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-9 px-4 text-[14px]",
  md: "px-[25.6px] py-[11.2px] text-[16px]",
  lg: "px-[28px] py-[14px] text-[16px]",
};

const VARIANT: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "hn-btn-primary font-medium",
  secondary: "hn-btn-secondary font-medium",
  "cta-pill": "hn-cta-pill font-display font-semibold py-[2px] pl-[21.328px] pr-[2px] gap-4",
  "white-pill": "bg-white text-brand rounded-[24px] font-display font-semibold px-[21.28px] py-[12px]",
  ghost: "bg-transparent text-text hover:text-brand",
};

export function Button({ href, variant = "primary", size = "md", className, children, external }: ButtonProps) {
  const cls = cn("inline-flex items-center justify-center gap-2 rounded-full transition", VARIANT[variant], variant !== "white-pill" && variant !== "cta-pill" ? SIZE[size] : "", className);
  if (href) {
    if (external) {
      return (
        <a href={href} className={cls} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return <button className={cls}>{children}</button>;
}
