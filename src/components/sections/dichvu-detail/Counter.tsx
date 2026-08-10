import type { ServiceCounter } from "@/lib/dich-vu-detail-pages";
import styles from "./Counter.module.css";

export function Counter({ data, legacy = false }: { data: ServiceCounter; legacy?: boolean }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.badge}>
            <div className={styles.badgeDot} />
            <h2 className={`${styles.badgeText} ${legacy ? styles.legacyBadgeText : ""}`}>{data.badgeText}</h2>
          </div>
          <div className={styles.statsRow}>
            {data.items.map((item, i) => (
              <div key={i} className={styles.statCard}>
                <span className={styles.statIndex}>{item.index}</span>
                <div className={styles.statNumberWrap}>
                  <span className={styles.statNumber}>{item.value}</span>
                </div>
                <p className={styles.statDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
