"use client";

import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { industriesPage } from "@/lib/site";
import { useLocalizedValue } from "@/i18n/auto-text-client";
import styles from "./IndustriesIndex.module.css";

export function IndustriesProcess() {
  const p = useLocalizedValue(industriesPage.process);

  return (
    <section className={styles.processSection}>
      <h2 className={styles.processLabel}>
        <span aria-hidden className={styles.processDot} />
        {p.headline}
      </h2>

      <div className={styles.processContent}>
        <div className={styles.processTimeline}>
          {p.items.map((it, i) => {
            const isLast = i === p.items.length - 1;
            return (
              <div key={it.n} className={styles.processRow}>
                <div className={styles.processRail}>
                  <span className={styles.processNumber}>{it.n}</span>
                  {!isLast && <div className={styles.processBar} />}
                </div>
                <div className={styles.processText}>
                  <span className={styles.processBadge}><span>{it.tag}</span></span>
                  <h3 className={styles.processTitle}>{it.title}</h3>
                  <p className={styles.processDesc}>{it.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.processCtaWrap}>
        <Link href={p.ctaHref} className={styles.processCta}>
          {p.ctaLabel}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
