"use client";
import { useState } from "react";
import type { ServiceFaq } from "@/lib/dich-vu-detail-pages";
import { Reveal } from "@/components/primitives/Reveal";
import styles from "./Faq.module.css";

export function Faq({ data }: { data: ServiceFaq }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const parts = data.headlineParts;

  return (
    <section className={styles.section}>
      <div className={styles.bgWrapper}>
        <div className={`${styles.bgRadial} ${styles.bgRadial1}`} />
        <div className={`${styles.bgRadial} ${styles.bgRadial2}`} />
        <div className={`${styles.bgRadial} ${styles.bgRadial3}`} />
      </div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.leftCol}>
            <div className={styles.label}>
              <span className={styles.labelIcon} role="img" aria-label="Star Icon">
                <svg viewBox="0 0 64 64" overflow="visible">
                  <path strokeLinejoin="round" d="m1 32 25 6 6 25 6-25 25-6-25-6-6-25-6 25z" />
                </svg>
              </span>
              <p className={styles.labelText}>{data.label}</p>
            </div>
            <div className={styles.headingWrapper}>
              <h2 className={styles.faqHeading}>
                <span className={styles.normalText}>{parts[0]}</span>{" "}
                <span className={styles.highlightText}>{parts[1]}</span>{" "}
                <span className={`${styles.normalText} ${styles.nextLine}`}>{parts[2]}</span>
              </h2>
            </div>
            <Reveal as="p" direction="left" className={styles.faqDesc}>{data.description}</Reveal>
          </div>
          <div className={styles.rightCol}>
            {data.items.map((item, i) => {
              const open = openIdx === i;
              return (
                <Reveal key={i} direction="up" delay={i * 60} className={`${styles.accordionItem} ${open ? styles.isOpen : ""}`}>
                  <button
                    type="button"
                    className={styles.accordionHeader}
                    onClick={() => setOpenIdx(open ? null : i)}
                    aria-expanded={open}
                  >
                    <h3 className={styles.question}>{item.q}</h3>
                    <div className={`${styles.iconWrapper} ${open ? styles.iconWrapperOpen : ""}`}>
                      <div className={`${styles.iconLine} ${styles.lineHorizontal}`} />
                      <div className={`${styles.iconLine} ${styles.lineVertical}`} />
                    </div>
                  </button>
                  {open && (
                    <div className={styles.answerWrapper}>
                      <p className={styles.answer}>{item.a}</p>
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
