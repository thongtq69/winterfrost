"use client";

import { aboutDetail } from "@/lib/site";
import { useAutoText, useLocalizedValue } from "@/i18n/auto-text-client";
import styles from "./AboutPageHero.module.css";

const PHONE_FRAME =
  "/images/migrated/homenest-com-vn/wp-content/uploads/2026/04/hero-section-graphic.png";

export function AboutPageHero() {
  const tr = useAutoText();
  const hero = useLocalizedValue(aboutDetail.hero);

  return (
    <section className={styles.heroSection}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={hero.bgImage} alt="Hero Background" className={styles.heroBg} fetchPriority="high" />

      <div className={styles.container}>
        <div className={styles.titleAndButtons}>
          <div className={styles.sectionTitle}>
            <h1>{hero.title}</h1>
            <p>{hero.description}</p>
          </div>
          <div className={styles.buttonsWrapper}>
            <a className={styles.primaryBtn} href="tel:+84971450454">{tr("Liên hệ trực tiếp")}</a>
            <a className={styles.secondaryBtn} href="https://zalo.me/0971450454" target="_blank" rel="noopener noreferrer">
              {tr("Nhắn tin nhận tư vấn")}
            </a>
          </div>
        </div>

        <div className={styles.heroImageContainer}>
          {hero.phoneImages.map((src, index) => (
            <div
              className={`${styles.phoneWrapper} ${index === 0 ? styles.phoneLeft : index === 1 ? styles.phoneCenter : styles.phoneRight}`}
              key={src}
            >
              <div className={styles.phoneContent}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Project screen ${index + 1}`} title={`Project screen ${index + 1}`} />
              </div>
              <div className={styles.phoneShape}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PHONE_FRAME} alt="Phone mockup" title="Phone mockup" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.shapeImage}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hero.meshGraphic} alt="Mesh background" title="Mesh background" />
      </div>
      <div className={styles.blurShape} />
    </section>
  );
}
