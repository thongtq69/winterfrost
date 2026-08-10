"use client";

import { industriesPage } from "@/lib/site";
import { useLocalizedValue } from "@/i18n/auto-text-client";
import styles from "./IndustriesIndex.module.css";

function LightbulbIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

export function IndustriesWhy() {
  const w = useLocalizedValue(industriesPage.why);
  const headline = w.headline;
  const splitAt = headline.indexOf(" được");
  const light = splitAt > 0 ? headline.slice(0, splitAt) : headline;
  const dark = splitAt > 0 ? headline.slice(splitAt + 1) : "";

  return (
    <section className={styles.whySection}>
      <div className={styles.whyContent}>
        <div className={styles.whyHeader}>
          <p className={styles.whyLabel}>
            <span aria-hidden className={styles.whyDot} />
            {w.label}
          </p>
          <h2 className={styles.whyTitle}>
            <span className={styles.whyTitleLight}>{light}</span>
            <span className={styles.whyTitleDark}>{dark || ""}</span>
          </h2>
        </div>

        <div className={styles.whyGrid}>
          {w.items.map((it) => (
            <div
              key={it.n}
              className={styles.whyCard}
            >
              <span
                aria-hidden
                className={styles.whyNumber}
              >
                {it.n}
              </span>
              <LightbulbIcon className={styles.whyIcon} />
              <div className={styles.whyText}>
                <h3 className={styles.whyCardTitle}>
                  {it.title}
                </h3>
                <p className={styles.whyCardDesc}>
                  {it.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
