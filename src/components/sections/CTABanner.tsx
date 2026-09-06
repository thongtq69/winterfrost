"use client";

import { Link } from "@/i18n/routing";
import { useEffect, useRef, useState } from "react";
import { useLocalizedHome } from "@/i18n/content";
import s from "./CTABanner.module.css";

const PERSON_IMG = "/images/people/cta/softbuild/chuyen-vien-tu-van-viet-nam.png";

type CTABannerProps = {
  home?: boolean;
  label?: string;
  headline?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
  imageAlt?: string;
};

export function CTABanner({
  label,
  headline,
  description,
  ctaLabel,
  ctaHref,
  image,
  imageAlt,
}: CTABannerProps = {}) {
  const home = useLocalizedHome();
  const c = home.ctaBanner;
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || visible) return;

    if (typeof IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <section className={s.wrapper}>
      <div
        ref={cardRef}
        className={s.card}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(32px)",
        }}
      >
        <div className={s.content}>
          <div className={s.header}>
            <div className={s.badge}>
              <span className={s.badgeDot} />
              <span className={s.badgeText}>{label ?? c.label}</span>
            </div>
            <h2 className={s.heading}>{headline ?? c.headline}</h2>
            <p className={s.description}>{description ?? c.description}</p>
          </div>
          <Link href={ctaHref ?? c.ctaHref} className={s.ctaButton}>
            {ctaLabel ?? c.ctaLabel}
          </Link>
        </div>

        <div className={s.imageWrapper}>
          {/* The source site deliberately serves this image without optimization. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image ?? PERSON_IMG}
            alt={imageAlt ?? "Chuyên viên tư vấn người Việt của SoftBuild"}
            title={imageAlt ?? "Chuyên viên tư vấn người Việt của SoftBuild"}
            className={s.image}
            width={270}
            height={330}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
