"use client";

import { industriesPage } from "@/lib/site";
import { useLocalizedValue } from "@/i18n/auto-text-client";
import styles from "./IndustriesIndex.module.css";

export function IndustriesCounters() {
  const c = useLocalizedValue(industriesPage.counters);
  return (
    <section className={styles.counterSection}>
        <div className={styles.counterInner}>
          <div className={styles.counterLabel}><span className={styles.counterDot} />{c.label}</div>
          <div className={styles.counterGrid}>
            {c.items.map((it) => (
              <div
                key={it.index}
                className={styles.counterCard}
              >
                <div className={styles.counterIndex}>
                  {it.index}
                </div>
                <div
                  className={styles.counterNumber}
                >
                  {it.value}
                  {it.suffix}
                </div>
                <div className={styles.counterDesc}>
                  {it.desc}
                </div>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
}
