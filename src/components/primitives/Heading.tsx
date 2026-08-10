import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

type HeadingProps = {
  as?: "h1" | "h2" | "h3";
  size?: "h1" | "h2" | "h2-section" | "h2-industries" | "h2-wiki" | "h2-cta" | "h3";
  className?: string;
  children: ReactNode;
};

const SIZE_MAP: Record<NonNullable<HeadingProps["size"]>, string> = {
  // hero (white text on dark)
  h1: "text-[40px] sm:text-[52px] md:text-[64px] font-extrabold leading-[1.05] tracking-[-1.28px]",
  // about — 45px / 500
  h2: "text-[28px] md:text-[36px] lg:text-[45px] font-medium leading-[normal] tracking-[-0.9px]",
  // company/services/why/test/tech/faq — 60px / 500
  "h2-section": "text-[34px] md:text-[44px] lg:text-[60px] font-medium leading-[1.1] tracking-[-1.2px]",
  // industries — 56px / 500 / lh 1.2
  "h2-industries": "text-[34px] md:text-[44px] lg:text-[56px] font-medium leading-[1.15] tracking-[-1.12px]",
  // wiki related — 48px / 500
  "h2-wiki": "text-[30px] md:text-[40px] lg:text-[48px] font-medium leading-[1.15] tracking-[-0.96px] text-brand",
  // cta banner — 32px / 500
  "h2-cta": "text-[24px] md:text-[28px] lg:text-[32px] font-medium leading-[1.3] tracking-[-0.64px] text-white",
  // h3 — 24px / 600
  h3: "text-[20px] md:text-[24px] font-semibold leading-tight",
};

export function Heading({ as: Tag = "h2", size = "h2-section", className, children }: HeadingProps) {
  const Component = Tag as ElementType;
  return <Component className={cn("font-display", SIZE_MAP[size], className)}>{children}</Component>;
}

/** Render children with `<em>` slot styled in script font — for "Tăng Trưởng" style accents. */
export function ScriptAccent({ children, className }: { children: ReactNode; className?: string }) {
  return <em className={cn("font-script font-normal not-italic text-brand", className)}>{children}</em>;
}
