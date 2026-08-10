"use client";

import { useEffect, useRef, useState } from "react";
import { useLocalizedServicesPage } from "@/i18n/content";
import s from "./HowWeWorkProcess.module.css";

export function HowWeWorkProcess() {
  const dichVuPage = useLocalizedServicesPage();
  const data = dichVuPage.howWeWork;
  const sectionRef = useRef<HTMLElement | null>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [progress, setProgress] = useState<number[]>(data.steps.map(() => 0));

  useEffect(() => {
    const onScroll = () => {
      const newProgress: number[] = [];
      let active = -1;
      rowRefs.current.forEach((row, i) => {
        if (!row) { newProgress.push(0); return; }
        const rect = row.getBoundingClientRect();
        const vh = window.innerHeight;
        const start = vh * 0.7;
        const distance = vh * 0.4;
        let p = (start - rect.top) / distance;
        p = Math.max(0, Math.min(1, p));
        newProgress.push(p);
        if (p > 0) active = i;
      });
      setProgress(newProgress);
      setActiveIdx(active);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [data.steps.length]);

  return (
    <section className={s.section} ref={sectionRef}>
      <h2 className={s.label}>
        <span className={s.labelDot} />
        <span>{data.label}</span>
      </h2>

      <div className={s.content}>
        <div className={s.timeline} id="timeline">
          {data.steps.map((step, i) => {
            const isActive = i <= activeIdx;
            return (
              <div
                key={step.num}
                ref={(el) => { rowRefs.current[i] = el; }}
                className={s.row}
                data-idx={i}
              >
                <div className={s.progressWrapper}>
                  <span className={s.stepNumber} style={{ opacity: progress[i] > 0 ? 1 : 0.15 }}>{step.num}</span>
                  {i < data.steps.length - 1 && (
                    <div className={s.progressBar}>
                      <div className={s.progressFill} style={{ height: `${progress[i] * 100}%` }} />
                    </div>
                  )}
                </div>
                <div className={`${s.textContent} ${i === data.steps.length - 1 ? s.textContentLast : ""} ${isActive ? s.visible : ""}`}>
                  <div className={s.heading}>
                    <div className={s.badge}>
                      <div className={s.badgeInner}>
                        <p className={s.badgeText}>{step.badge}</p>
                      </div>
                    </div>
                    <h3 className={s.stepTitle}>{step.title}</h3>
                  </div>
                  <p className={s.stepDesc}>{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className={s.ctaWrap}>
          <div className={s.ctaGroup}>
            <a href={data.ctaHref} target="_blank" rel="noopener noreferrer" className={s.primaryCta}>{data.ctaLabel}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
