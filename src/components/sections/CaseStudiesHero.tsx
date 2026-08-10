"use client";

import { useEffect, useRef } from "react";
import styles from "./CaseStudiesHero.module.css";
import { useAutoText } from "@/i18n/auto-text-client";

const ARC_TEXT = "Uy tín ✦ Chất lượng ✦ Hiệu quả ✦\u00a0\u00a0";

export function CaseStudiesHero() {
  const tr = useAutoText();
  const arcText = tr(ARC_TEXT);
  const measureRef = useRef<SVGTSpanElement | null>(null);
  const textRefs = useRef<Array<SVGTSpanElement | null>>([]);

  useEffect(() => {
    const measure = measureRef.current;
    if (!measure) return;
    const textWidth = measure.getComputedTextLength();
    if (!textWidth) return;
    let raf = 0;
    let last = performance.now();
    let offset = 0;
    const speed = 180;
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      offset -= speed * dt;
      while (offset <= -textWidth) offset += textWidth;
      textRefs.current.forEach((element, index) => {
        element?.setAttribute("x", String(offset + (index - 1) * textWidth));
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [arcText]);

  return (
    <section className={styles.section}>
      <span aria-hidden className={styles.dot} />
      <div className={styles.container}>
        <div className={styles.arcWrapper}>
          <svg viewBox="0 0 1440 800" className={styles.arcSvg} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
            <defs>
              <path id="cs-arc-curve" d="M-100,400 Q720,-170 1540,400" fill="none" stroke="transparent" />
            </defs>
            <text className={styles.arcText}>
              <textPath href="#cs-arc-curve" xmlSpace="preserve">
                <tspan ref={measureRef} x="-9999" style={{ visibility: "hidden" }}>{arcText}</tspan>
                {Array.from({ length: 4 }, (_, index) => (
                  <tspan
                    key={index}
                    ref={(element) => { textRefs.current[index] = element; }}
                    x={(index - 1) * 1350}
                  >
                    {arcText}
                  </tspan>
                ))}
              </textPath>
            </text>
          </svg>
        </div>
        <h1 className={styles.titleBlock}>
          <span className={styles.subtitle}>{tr("Các dự án tiêu biểu")}</span>
          <span className={styles.title}>{tr("tại Winterfrost")}</span>
        </h1>
      </div>
    </section>
  );
}
