"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CaseStudyUIDesign.module.css";

const WEB_FRAME =
  "/images/migrated/homenest-com-vn/wp-content/uploads/2026/07/Khung-man-hinh-may-tinh.png";
const PHONE_FRAME =
  "/images/migrated/homenest-com-vn/wp-content/uploads/2026/07/Man-hinh-iphone-scaled.png";
const IPAD_FRAME =
  "/images/migrated/homenest-com-vn/wp-content/uploads/2026/07/Man-hinh-ipad-scaled.png";

type Props = {
  images: string[];
  mobileImages?: string[];
  tabletImages?: string[];
  heading?: string;
};

export function CaseStudyUIDesign({
  images,
  mobileImages = [],
  tabletImages = [],
  heading = "UI Design",
}: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const imageCount = images.length;
  const marqueeImages = [...images, ...images, ...images, ...images];
  const ipadImages = tabletImages.length ? tabletImages : images.slice(0, 1);

  useEffect(() => {
    if (imageCount <= 1) return;

    const syncToCenteredCard = () => {
      const root = rootRef.current;
      if (!root) return;

      const viewportCenter = window.innerWidth / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      root.querySelectorAll<HTMLElement>("[data-ui-index]").forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (!rect.width) return;

        const distance = Math.abs(viewportCenter - (rect.left + rect.width / 2));
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = Number(card.dataset.uiIndex ?? 0);
        }
      });

      if (closestDistance !== Number.POSITIVE_INFINITY) {
        setActiveIndex((current) => (current === closestIndex ? current : closestIndex));
      }
    };

    const initialFrame = window.requestAnimationFrame(syncToCenteredCard);
    const interval = window.setInterval(syncToCenteredCard, 100);

    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.clearInterval(interval);
    };
  }, [imageCount]);

  if (!imageCount) return null;

  const phoneIndex = mobileImages.length ? activeIndex % mobileImages.length : 0;
  const ipadIndex = ipadImages.length ? activeIndex % ipadImages.length : 0;

  return (
    <section ref={rootRef} className={styles.wrap} aria-label={heading || "UI Design"}>
      {heading && <span className={styles.heading}>{heading}</span>}

      <div className={styles.marqueeLayer} aria-hidden="true">
        <div className={styles.marqueeViewport}>
          <div className={styles.marqueeTrack}>
            {marqueeImages.map((src, index) => (
              <div
                className={styles.marqueeCard}
                data-ui-index={index % imageCount}
                key={`${src}-${index}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" draggable={false} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.centerFrame}>
        <div className={styles.centerInner}>
          {images.map((src, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className={styles.centerImage}
              data-active={index === activeIndex}
              draggable={false}
              key={src}
              src={src}
              alt={`Giao diện website dự án ${index + 1}`}
            />
          ))}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.webFrameImage} src={WEB_FRAME} alt="" aria-hidden="true" />

        {mobileImages.length > 0 && (
          <div className={styles.phoneFrame}>
            <div className={styles.phoneInner}>
              {mobileImages.map((src, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className={styles.phoneImage}
                  data-active={index === phoneIndex}
                  draggable={false}
                  key={`${src}-phone`}
                  src={src}
                  alt={`Giao diện mobile dự án ${index + 1}`}
                />
              ))}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.phoneFrameImage} src={PHONE_FRAME} alt="" aria-hidden="true" />
          </div>
        )}

        <div className={styles.ipadFrame}>
          <div className={styles.ipadInner}>
            {ipadImages.map((src, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className={styles.ipadImage}
                data-active={index === ipadIndex}
                draggable={false}
                key={`${src}-ipad`}
                src={src}
                alt={`Giao diện tablet dự án ${index + 1}`}
              />
            ))}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.ipadFrameImage} src={IPAD_FRAME} alt="" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
