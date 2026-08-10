"use client";

import { Link } from "@/i18n/routing";
import { useEffect, useRef, useState } from "react";
import { useLocalizedServicesPage } from "@/i18n/content";
import s from "./ServicesListSticky.module.css";

const SERVICE_DESCRIPTION_LINKS: Record<
  string,
  { label: string; href: string }
> = {
  "phat-trien-ai": {
    label: "machine learning",
    href: "https://homenest.com.vn/ai-se-thay-doi-doanh-nghiep-nhu-the-nao",
  },
  "phat-trien-blockchain": {
    label: "phi tập trung",
    href:
      "https://homenest.com.vn/blockchain-va-iot-toan-bo-kien-thuc-quan-trong-danh-cho-tech-leaders",
  },
};

export function ServicesListSticky() {
  const dichVuPage = useLocalizedServicesPage();
  const data = dichVuPage.servicesList;
  const [activeIdx, setActiveIdx] = useState(0);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(() => new Set());
  const [headingVisible, setHeadingVisible] = useState(false);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    let activeFrame = 0;
    const updateActive = () => {
      const viewportCenter = window.innerHeight * 0.5;
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });
      setActiveIdx(nearestIndex);
    };
    const onScroll = () => {
      window.cancelAnimationFrame(activeFrame);
      activeFrame = window.requestAnimationFrame(updateActive);
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            !entry.isIntersecting &&
            entry.boundingClientRect.top >= window.innerHeight - 60
          ) {
            return;
          }
          const idx = Number((entry.target as HTMLElement).dataset.idx);
          setVisibleCards((current) => {
            if (current.has(idx)) return current;
            const next = new Set(current);
            next.add(idx);
            return next;
          });
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "-60px", threshold: 0 },
    );

    const headingObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setHeadingVisible(true);
        headingObserver.disconnect();
      },
      { rootMargin: "-80px", threshold: 0 },
    );

    cardRefs.current.forEach((el) => {
      if (!el) return;
      revealObserver.observe(el);
    });
    if (headingRef.current) headingObserver.observe(headingRef.current);
    window.addEventListener("scroll", onScroll, { passive: true });
    updateActive();

    return () => {
      window.cancelAnimationFrame(activeFrame);
      window.removeEventListener("scroll", onScroll);
      revealObserver.disconnect();
      headingObserver.disconnect();
    };
  }, []);

  return (
    <section className={s.serviceSection}>
      <div className={s.content}>
        <div className={s.leftCol}>
          <div>
            <div className={s.label}>
              <span className={s.labelDot} />
              <span className={s.labelText}>{data.label} </span>
            </div>
            <h2
              ref={headingRef}
              className={`${s.sectionHeading} ${headingVisible ? s.headingVisible : ""}`}
            >
              <span className={s.headingLight}>{data.headlineLight}  </span>
              <span className={s.headingDark}>{data.headlineDark}</span>
            </h2>
            <div className={s.descriptionBlock}>
              <p className={s.descriptionText}>{data.description}</p>
            </div>
          </div>
          <nav className={s.serviceNamesList}>
            {data.items.map((it, i) => (
              <a
                key={it.slug}
                href={`#${it.slug}`}
                className={`${s.serviceNameItem} ${i === activeIdx ? s.active : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
              >
                <SparkleIcon />
                <span>{it.title}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className={s.rightCol}>
          {data.items.map((it, i) => (
            <div
              key={it.slug}
              ref={(el) => { cardRefs.current[i] = el; }}
              data-idx={i}
              id={it.slug}
              className={`${s.serviceCard} ${visibleCards.has(i) ? s.visible : ""}`}
              data-cursor-text={data.viewLabel}
            >
              <div className={s.cardTextBlock}>
                <Link href={`/dich-vu/${it.slug}`} className={s.cardTitleLink}>
                  <h3 className={s.cardTitle}>{it.title}</h3>
                </Link>
                <p className={s.cardDesc}>
                  <ServiceDescription slug={it.slug} description={it.desc} />
                </p>
              </div>
              <div className={s.cardImageWrap}>
                <Link href={`/dich-vu/${it.slug}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={it.img}
                    alt={it.title}
                    title={it.title}
                    width={1100}
                    height={825}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </Link>
              </div>
              <div className={s.cardFooter}>
                <Link href={`/dich-vu/${it.slug}`} className={s.viewServiceLink}>
                  <div className={s.iconWrapper}>
                    <div className={s.arrowIcon} />
                    <div className={s.arrowIconHover} />
                  </div>
                  <span className={s.viewText}>{data.viewLabel}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceDescription({
  slug,
  description,
}: {
  slug: string;
  description: string;
}) {
  const link = SERVICE_DESCRIPTION_LINKS[slug];
  if (!link) return description;

  const labelStart = description.indexOf(link.label);
  if (labelStart === -1) return description;

  return (
    <>
      {description.slice(0, labelStart)}
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontWeight: 600 }}
      >
        {link.label}
      </a>
      {description.slice(labelStart + link.label.length)}
    </>
  );
}

function SparkleIcon() {
  return (
    <svg className={s.serviceNameIcon} viewBox="0 0 256 256" aria-hidden>
      <path
        d="M240,128a15.79,15.79,0,0,1-10.5,15l-63.44,23.07L143,229.5a16,16,0,0,1-30,0L89.94,166.06,26.5,143a16,16,0,0,1,0-30L89.94,89.94,113,26.5a16,16,0,0,1,30,0l23.07,63.44L229.5,113A15.79,15.79,0,0,1,240,128Z"
      />
    </svg>
  );
}
