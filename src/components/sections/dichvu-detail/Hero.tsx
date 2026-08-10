"use client";

import { useEffect, useRef } from "react";
import type { ServiceHero } from "@/lib/dich-vu-detail-pages";
import { Reveal } from "@/components/primitives/Reveal";
import styles from "./Hero.module.css";

export function Hero({ data }: { data: ServiceHero }) {
  const isCollage = !!data.phones;
  const isCarousel = !!data.carousel;
  const variantClass = isCollage
    ? styles.heroCollage
    : isCarousel
    ? styles.heroCarousel
    : styles.heroDashboard;
  const lightFirst = data.lightFirst ?? (isCollage || isCarousel);
  const arcTextPathRef = useRef<SVGTextPathElement | null>(null);

  useEffect(() => {
    const el = arcTextPathRef.current;
    if (!el) return;
    let raf = 0;
    let last = performance.now();
    let offset = 50;
    const speed = 6;
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      offset -= speed * dt;
      if (offset < -50) offset += 100;
      el.setAttribute("startOffset", `${offset}%`);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className={`${styles.section} ${variantClass}`}>
      {data.bgImage && (
        <div className={styles.bgWrapper}>
          <img className={styles.bgImage} src={data.bgImage} alt="" aria-hidden />
        </div>
      )}
      {isCarousel ? (
        <div className={styles.carouselInner}>
          <header className={styles.header}>
            {data.carousel?.arcText && (
              <div className={styles.arcWrapper} aria-hidden>
                <svg
                  className={styles.arcSvg}
                  viewBox="0 0 1440 800"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <path
                      id="hero-arc-path"
                      d="M-100,400 Q720,-170 1540,400"
                      fill="none"
                      stroke="transparent"
                    />
                  </defs>
                  <text fontWeight="500">
                    <textPath
                      ref={arcTextPathRef}
                      href="#hero-arc-path"
                      startOffset="50%"
                      textAnchor="middle"
                    >
                      {`${data.carousel.arcText}${data.carousel.arcText.startsWith("Mở rộng") ? "" : "\u00a0\u00a0"}`.repeat(4)}
                    </textPath>
                  </text>
                </svg>
              </div>
            )}
            <Reveal direction="up" className={styles.headingWrapper}>
              <h1 className={styles.heading}>
                <span className={styles.lightText}>{data.titleLight}</span>{" "}
                <span className={styles.darkText}>{data.titleDark}</span>
              </h1>
            </Reveal>
            <Reveal direction="up" delay={120} className={styles.descriptionWrapper}>
              <p className={styles.description}>{data.description}</p>
            </Reveal>
          </header>
        </div>
      ) : (
        <header className={styles.header}>
          <Reveal direction="up" className={styles.headingWrapper}>
            <h1 className={styles.heading}>
              {lightFirst ? (
                <>
                  <span className={styles.lightText}>{data.titleLight}</span>
                  {isCollage && <br />}
                  <span className={styles.darkText}>{data.titleDark}</span>
                </>
              ) : (
                <>
                  <span className={styles.darkText}>{data.titleDark}</span>
                  <span className={styles.lightText}>{data.titleLight}</span>
                </>
              )}
            </h1>
          </Reveal>
          <Reveal direction="up" delay={120} className={styles.descriptionWrapper}>
            <p className={styles.description}>{data.description}</p>
          </Reveal>
        </header>
      )}
      {isCollage ? (
        <Reveal direction="up" delay={240} className={styles.phonesContainer}>
          <div className={styles.phoneLeft}>
            <img className={styles.mockupImg} src={data.phones!.left} alt="Left Phone" />
          </div>
          <div className={styles.phoneCenter}>
            <img className={styles.mockupImg} src={data.phones!.center} alt="Center Phone UI" />
          </div>
          <div className={styles.phoneRight}>
            <img className={styles.mockupImg} src={data.phones!.right} alt="Right Phone UI" />
          </div>
          {data.chips && data.chips.length > 0 && (
            <div className={styles.floatingChips}>
              {data.chips.slice(0, 4).map((src, i) => (
                <div key={i} className={`${styles.chip} ${styles[`chipTabs${i + 1}`]}`}>
                  <img className={styles.chipImg} src={src} alt={`Tab Image ${i + 1}`} />
                </div>
              ))}
            </div>
          )}
        </Reveal>
      ) : isCarousel ? (
        <div className={styles.carouselSection}>
          <div className={styles.carouselTrack}>
            {[...Array(3)].flatMap((_, dup) =>
              data.carousel!.images.map((src, i) => (
                <div key={`${dup}-${i}`} className={styles.carouselItem}>
                  <img className={styles.carouselImg} src={src} alt="" loading="lazy" />
                </div>
              )),
            )}
            <div className={styles.carouselItem} aria-hidden>
              <img className={styles.carouselImg} src={data.carousel!.images[0]} alt="" loading="lazy" />
            </div>
          </div>
        </div>
      ) : (
        <Reveal direction="up" delay={240} className={styles.dashboardContainer}>
          <div className={styles.dashboardFrame}>
            <div className={styles.dashboardImageWrapper}>
              <img
                className={styles.dashboardImage}
                src={data.dashboardImage}
                alt=""
                aria-hidden
              />
            </div>
          </div>
        </Reveal>
      )}
    </section>
  );
}
