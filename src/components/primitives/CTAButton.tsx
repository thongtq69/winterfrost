import { Link } from "@/i18n/routing";
import s from "./CTAButton.module.css";

type CTAButtonProps = {
  children: string;
  className?: string;
  href: string;
  target?: string;
  variant?: "blue" | "light";
  visualId?: string;
};

function Arrow() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function CTAButton({ children, className = "", href, target, variant = "blue", visualId }: CTAButtonProps) {
  const content = (
    <>
      <span className={s.textWrap}>
        <span className={s.mainTextContainer}><span className={s.text}>{children}</span></span>
        <span className={s.hoverTextContainer}><span className={s.text}>{children}</span></span>
      </span>
      <span className={s.iconWrapper}>
        <span className={s.iconBg} />
        <span className={`${s.icon} ${s.icon1}`}><Arrow /></span>
        <span className={`${s.icon} ${s.icon2}`}><Arrow /></span>
      </span>
    </>
  );
  const sharedProps = {
    className: `${s.container} ${variant === "light" ? s.light : s.blue} ${className}`,
    target,
    rel: target === "_blank" ? "noopener noreferrer" : undefined,
    "data-visual-id": visualId,
  };

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...sharedProps}>
        {content}
      </Link>
    );
  }

  return (
    <a
      className={`${s.container} ${variant === "light" ? s.light : s.blue} ${className}`}
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      data-visual-id={visualId}
    >
      {content}
    </a>
  );
}
