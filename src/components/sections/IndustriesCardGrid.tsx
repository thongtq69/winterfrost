"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { industriesPage, industries } from "@/lib/site";
import { useLocalizedValue } from "@/i18n/auto-text-client";
import styles from "./IndustriesIndex.module.css";

export function IndustriesCardGrid() {
  const g = useLocalizedValue(industriesPage.grid);
  const localizedIndustries = useLocalizedValue(
    industries.map((item) => ({ ...item, contentHtml: "", contentText: "" })),
  );
  return (
    <section className={styles.gridSection}>
      <div className={styles.gridContent}>
        <div className={styles.gridHeader}>
          <span className={styles.gridLabel}>
            <span aria-hidden className={styles.gridDot} />
            {g.label}
          </span>
          <h2 className={styles.gridTitle}>
            <span className={styles.gridTitleLight}>{g.headlineLight}</span><br />
            <span className={styles.gridTitleDark}>{g.headlineDark}</span>
          </h2>
        </div>
          <div className={styles.industryGrid}>
            {localizedIndustries.map((s) => (
              <Link
                key={s.slug}
                href={`/linh-vuc/${s.slug}`}
                className={styles.industryLink}
              >
                <div className={styles.industryCard}>
                {(s.image || s.ogImage) && (
                  <div className={styles.industryIcon}>
                    <Image
                      src={s.image || s.ogImage || ""}
                      alt={s.title}
                      fill
                      sizes="48px"
                    />
                  </div>
                )}
                <h3 className={styles.industryTitle}>
                  {s.title}
                </h3>
                </div>
              </Link>
            ))}
          </div>
      </div>
    </section>
  );
}
