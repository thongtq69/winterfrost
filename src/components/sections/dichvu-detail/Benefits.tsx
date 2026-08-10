import type { ServiceBenefits } from "@/lib/dich-vu-detail-pages";
import { Reveal } from "@/components/primitives/Reveal";
import styles from "./Benefits.module.css";

export function Benefits({ data, legacyLabel = false }: { data: ServiceBenefits; legacyLabel?: boolean }) {
  const LabelTag = legacyLabel ? "p" : "h2";
  return (
    <section className={styles.section} id="benefits">
      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.insideContainer}>
            <LabelTag className={`${styles.label} ${legacyLabel ? styles.legacyLabel : ""}`}>
              <span className={styles.labelDot} />
              <span>{data.label}</span>
            </LabelTag>
            <Reveal as="p" direction="up" className={styles.sectionHeading}>
              <span className={styles.headingLight}>{data.headlineLight}</span>
              <span className={styles.headingDark}>{data.headlineDark}</span>
            </Reveal>
          </div>
        </div>
        <div className={styles.benefitsGrid}>
          {data.items.map((item, i) => (
            <Reveal key={i} direction="up" delay={i * 60} className={styles.card}>
              <span className={styles.cardNumber}>{item.num}</span>
              <div className={styles.cardIcon}>
                <svg viewBox="0 0 24 24">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
              </div>
              <div className={styles.cardText}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
