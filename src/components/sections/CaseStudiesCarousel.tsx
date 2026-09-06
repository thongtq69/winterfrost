"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { CTAButton } from "@/components/primitives/CTAButton";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { useLocalizedHome } from "@/i18n/content";
import { useAutoText } from "@/i18n/auto-text-client";
import s from "./CaseStudiesCarousel.module.css";

// Homepage CaseStudy section: exactly 3 hand-picked cards (from softbuildvn.vercel.app).
// Images, titles, categories and short descs are the homepage-specific copy
// (different from the detail pages, which use longer titles + alt images).
const HOMEPAGE_CARDS: Array<{
  slug: string;
  title: string;
  category: string;
  image: string;
  desc: string;
}> = [
  {
    slug: "app-nivora-connect",
    title: "App Nivora Connect",
    category: "Thiết kế App",
    image:
      "/images/projects/nivora-connect/01-cover.webp?v=wf-20260726",
    desc:
      "Ứng dụng Nivora Connect, được phát triển bởi SoftBuild, là một nền tảng trực quan giúp kết nối cộng đồng người Việt tại Hàn Quốc với các dịch vụ thi...",
  },
  {
    slug: "app-grevia-lawn",
    title: "App Grevia Lawn",
    category: "Thiết kế App",
    image:
      "/images/projects/app-grevia-lawn/01-anh-bia-du-an.webp?v=wf-grevia-pro-20260726",
    desc:
      "Khám phá cách SoftBuild xây dựng ứng dụng Grevia Lawn với thiết kế hiệu suất cao, tối ưu đặt lịch dễ dàng và quản lý chăm sóc sân vườn chuyên...",
  },
  {
    slug: "website-loomora-rugs",
    title: "Website Loomora Rugs",
    category: "Thiết kế Website",
    image:
      "/images/projects/website-loomora-rugs/01-anh-bia-du-an.webp?v=wf-projects-pro-20260726",
    desc:
      "Website Loomora Rugs, được phát triển bởi SoftBuild, là một nền tảng thương mại điện tử cao cấp được thiết kế sang trọng, giúp trưng bày các sản ...",
  },
];

export function CaseStudiesCarousel() {
  const tr = useAutoText();
  const tServices = useTranslations("Services");
  const home = useLocalizedHome();
  const c = home.caseStudiesSection;
  const items = HOMEPAGE_CARDS.map((card) => {
    const localizedCard = c.items.find((item) => item.slug === card.slug);
    return localizedCard
      ? {
          ...card,
          title: localizedCard.title,
          desc: localizedCard.desc,
          category:
            card.slug === "website-loomora-rugs"
              ? tServices("websiteDesign.title")
              : tServices("appDesign.title"),
        }
      : card;
  });
  const total = items.length;

  const sectionRef = useRef<HTMLElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ANIM_START_OFFSET = 35;
    const ANIM_DISTANCE = 515;
    const MAX_TX = 235;

    let ticking = false;
    const update = () => {
      ticking = false;
      const sec = sectionRef.current;
      const left = leftRef.current;
      const right = rightRef.current;
      if (!sec || !left || !right) return;
      // Skip on mobile breakpoint where splitLayout is hidden
      if (window.innerWidth <= 1200) {
        left.style.transform = "";
        right.style.transform = "";
        return;
      }
      const sectionTop = sec.getBoundingClientRect().top + window.scrollY;
      const sy = window.scrollY;
      // Animation runs from when section top hits viewport top → 500px more scroll
      const raw = (sy - sectionTop - ANIM_START_OFFSET) / ANIM_DISTANCE;
      const progress = Math.max(0, Math.min(1, raw));
      // smoothstep (cosine-based) — matches original's ease-in-out feel
      const eased = 0.5 - 0.5 * Math.cos(progress * Math.PI);
      const tx = MAX_TX * (1 - eased);
      left.style.transform = `translateX(${tx}px)`;
      right.style.transform = `translateX(${-tx}px)`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section ref={sectionRef} className={s.section}>
      <div className={s.container}>
        <div className={s.labelWrap}>
          <SectionLabel>{c.label}</SectionLabel>
        </div>

        {/* Mobile heading (≤1200px) */}
        <div className={s.mobileHeading}>
          <h2 className="m-0 font-display text-[32px] font-medium leading-[1.2] tracking-[-0.02em] text-text-navy-deep">
            {c.headlineMobile[0]}{" "}
            <span className="font-script text-[36px] text-brand">{c.headlineMobile[1]}</span>{" "}
            {c.headlineMobile[2]}
          </h2>
        </div>

        {/* Desktop split layout — sticky 2-column */}
        <div className={s.splitLayout}>
          <div ref={leftRef} className={s.leftText}>
            <p className={s.headingP}>
              <span className={s.normalText}>{c.headlineLeftPrefix}</span>{" "}
              <span className={s.scriptText}>{c.headlineLeftScript}</span>
            </p>
          </div>

          <div className={s.cardList}>
            <div className={s.emptySpacer} />
            {items.map((p, i) => (
              <Link key={p.slug} href={`/case-studies/${p.slug}`} className={s.card} data-cursor-text={tr("Xem Case Study")}>
                <div className={s.cardInner}>
                  <div className={s.cardHeader}>
                    <p className={s.cardCategory}>{p.category}</p>
                    <div className={s.dots}>
                      {Array.from({ length: total }).map((_, di) => (
                        <span
                          key={di}
                          className={`${s.dot} ${di <= i ? s.dotActive : ""}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className={s.cardImage}>
                    <Image
                      src={p.image}
                      alt={p.title}
                      title={p.title}
                      fill
                      sizes="(max-width:768px) 100vw, 520px"
                    />
                  </div>
                  <div className={s.cardBody}>
                    <h3 className={s.cardTitle}>{p.title}</h3>
                    <p className={s.cardDesc}>{p.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div ref={rightRef} className={s.rightText}>
            <p className={s.headingP}>
              <span className={`${s.normalText} ${s.nextLine}`}>{c.headlineRight}</span>
            </p>
          </div>
        </div>

        {/* Mobile cards (rendered when ≤1200px) */}
        <div className={s.mobileCardList}>
          {items.map((p, i) => (
            <Link key={`m-${p.slug}`} href={`/case-studies/${p.slug}`} className={s.card} data-cursor-text="Xem Case Study">
              <div className={s.cardInner}>
                <div className={s.cardHeader}>
                  <p className={s.cardCategory}>{p.category}</p>
                  <div className={s.dots}>
                    {Array.from({ length: total }).map((_, di) => (
                      <span
                        key={di}
                        className={`${s.dot} ${di <= i ? s.dotActive : ""}`}
                      />
                    ))}
                  </div>
                </div>
                <div className={s.cardImage}>
                  <Image
                    src={p.image}
                    alt={p.title}
                    title={p.title}
                    fill
                    sizes="(max-width:768px) 100vw, 520px"
                  />
                </div>
                <div className={s.cardBody}>
                  <h3 className={s.cardTitle}>{p.title}</h3>
                  <p className={s.cardDesc}>{p.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={s.ctaWrap}>
          <CTAButton className={s.caseButton} href={c.ctaHref}>{c.ctaLabel}</CTAButton>
        </div>
      </div>
    </section>
  );
}
