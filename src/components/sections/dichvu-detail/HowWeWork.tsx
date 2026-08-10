"use client";

import { useEffect, useRef } from "react";
import { Link } from "@/i18n/routing";
import type { ServiceHowWeWork } from "@/lib/dich-vu-detail-pages";
import styles from "./HowWeWork.module.css";

export function HowWeWork({
  data,
  legacy = false,
  flushExternal = false,
  externalCta = false,
}: {
  data: ServiceHowWeWork;
  legacy?: boolean;
  flushExternal?: boolean;
  externalCta?: boolean;
}) {
  const fillsRef = useRef<(HTMLDivElement | null)[]>([]);
  const textContentsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      const fillTriggerStart = vh * 0.82;
      const fillTriggerRange = vh * 0.4;
      const revealTriggerStart = vh * 0.9;
      const revealTriggerRange = vh * 0.3;
      for (const fill of fillsRef.current) {
        if (!fill) continue;
        const bar = fill.parentElement;
        if (!bar) continue;
        const rect = bar.getBoundingClientRect();
        const progress = Math.max(
          0,
          Math.min(1, (fillTriggerStart - rect.top) / fillTriggerRange),
        );
        fill.style.height = `${progress * 100}%`;
      }
      for (const tc of textContentsRef.current) {
        if (!tc) continue;
        const rect = tc.getBoundingClientRect();
        const progress = Math.max(
          0,
          Math.min(1, (revealTriggerStart - rect.top) / revealTriggerRange),
        );
        tc.style.opacity = `${progress}`;
        tc.style.transform = `translateY(${(1 - progress) * 32}px)`;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [data.steps.length]);

  return (
    <section className={`${styles.section} ${legacy ? styles.legacy : ""}`}>
      <h2 className={styles.label}>
        <span className={styles.labelDot} />
        <span>{data.label}</span>
      </h2>
      <div className={styles.content}>
        <div className={styles.timeline}>
          {data.steps.map((step, i) => (
            <div key={i} className={styles.row}>
              <div className={styles.progressWrapper}>
                <span className={styles.stepNumber}>{step.num}</span>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    ref={(el) => {
                      fillsRef.current[i] = el;
                    }}
                  />
                </div>
              </div>
              <div
                className={styles.textContent}
                ref={(el) => {
                  textContentsRef.current[i] = el;
                }}
                style={{ opacity: 0, transform: "translateY(32px)" }}
              >
                <div className={styles.heading}>
                  <div className={styles.badge}>
                    <div className={styles.badgeInner}>
                      <p className={styles.badgeText}>{step.badge}</p>
                    </div>
                  </div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                </div>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        {!legacy && !flushExternal && !externalCta && data.ctaLabel && data.ctaHref && (
          <div className={styles.ctaWrapper}>
            <Link href={data.ctaHref} target="_blank" className={styles.ctaButton}>
              {data.ctaLabel}
            </Link>
          </div>
        )}
      </div>
      {(legacy || flushExternal || externalCta) && data.ctaLabel && data.ctaHref && (
        <div className={`${styles.ctaWrapper} ${flushExternal ? styles.ctaFlush : ""}`}>
          <Link href={data.ctaHref} target="_blank" className={styles.ctaButton}>
            {data.ctaLabel}
          </Link>
        </div>
      )}
    </section>
  );
}
