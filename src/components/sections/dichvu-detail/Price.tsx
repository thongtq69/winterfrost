"use client";

import { Link } from "@/i18n/routing";
import type { ServicePrice } from "@/lib/dich-vu-detail-pages";
import { Reveal } from "@/components/primitives/Reveal";
import styles from "./Price.module.css";
import { useAutoText } from "@/i18n/auto-text-client";

export function Price({
  data,
  modern = false,
  useLabelHeadline = false,
  paddedLegacy = false,
  narrowHeader = false,
}: {
  data: ServicePrice;
  modern?: boolean;
  useLabelHeadline?: boolean;
  paddedLegacy?: boolean;
  narrowHeader?: boolean;
}) {
  const tr = useAutoText();
  const isSinglePackage = data.packages.length === 1;
  return (
    <section className={`${styles.section} ${isSinglePackage ? styles.singlePackage : ""} ${modern ? styles.modernPricing : ""} ${paddedLegacy ? styles.paddedLegacy : ""} ${narrowHeader ? styles.narrowHeader : ""}`}>
      <div className={styles.bgWrapper}>
        <div className={`${styles.bgRadial} ${styles.bgRadial1}`} />
        <div className={`${styles.bgRadial} ${styles.bgRadial2}`} />
        <div className={`${styles.bgRadial} ${styles.bgRadial3}`} />
      </div>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.heading}>
            {useLabelHeadline && data.label ? (
              <>
                <span className={styles.light}>{data.label}</span>
                <span className={styles.dark}>{data.headlineLight}{data.headlineDark}</span>
              </>
            ) : (
              <>
                <span className={styles.light}>{data.headlineLight}</span>{" "}
                <span className={styles.dark}>{data.headlineDark}</span>
              </>
            )}
          </h2>
          <p className={styles.description}>{data.description}</p>
        </header>
        <div className={styles.cardList}>
          {data.packages.map((pkg, i) => {
            const cardLabel = pkg.labelText ?? (pkg.highlight ? tr("Gói Chuyên Nghiệp") : pkg.name);
            return (
            <Reveal key={i} direction="up" delay={i * 80} className={`${styles.cardContainer} ${pkg.highlight ? styles.isGrowth : ""}`}>
              <div className={styles.card}>
                <div className={styles.highlightWrap}>
                  <div className={styles.cardLabelContainer}>
                    <span className={styles.cardLabel}>{cardLabel}</span>
                  </div>
                  <div className={styles.contentWrap}>
                    <div className={styles.cardInner}>
                      <div className={styles.mainInfo}>
                        <div className={styles.cardHeader}>
                          <div className={styles.iconBox}>
                            {pkg.iconPath ? (
                              <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
                                <path d={pkg.iconPath} />
                              </svg>
                            ) : (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2v20M5 9l7-7 7 7" />
                              </svg>
                            )}
                          </div>
                          <h3 className={styles.cardTitle}>{pkg.name}</h3>
                        </div>
                        <div className={styles.priceWrapper}>
                          <p className={styles.price}>{pkg.price}{pkg.currency ? ` ${pkg.currency}` : ""}</p>
                          {pkg.period && <span className={styles.priceUnit}>{pkg.period}</span>}
                        </div>
                        <p className={styles.cardDesc}>{pkg.description}</p>
                        <Link href={pkg.ctaHref} className={styles.btn}>{pkg.ctaLabel}</Link>
                      </div>
                      <div className={styles.featuresInfo}>
                        <div className={styles.detailsList}>
                          {pkg.features.map((f, j) => (
                            <div key={j} className={styles.detailItem}>
                              <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="16 9 11 14 8 11" />
                              </svg>
                              <span className={styles.detailText}>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          );
          })}
        </div>
      </div>
    </section>
  );
}
