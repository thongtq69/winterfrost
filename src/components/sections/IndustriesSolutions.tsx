"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { AnimatedNetworkIcon } from "@/components/primitives/AnimatedNetworkIcon";
import { industriesPage } from "@/lib/site";
import { useLocalizedValue } from "@/i18n/auto-text-client";
import styles from "./IndustriesIndex.module.css";

export function IndustriesSolutions() {
  const s = useLocalizedValue(industriesPage.solutions);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className={styles.solutionSection}>
      <div className={styles.solutionOuter}>
        <div className={styles.solutionBackground} aria-hidden>
          <span className={`${styles.solutionRadial} ${styles.solutionRadialPurpleTop}`} />
          <span className={`${styles.solutionRadial} ${styles.solutionRadialPurpleBottom}`} />
          <span className={`${styles.solutionRadial} ${styles.solutionRadialBlueTop}`} />
          <span className={`${styles.solutionRadial} ${styles.solutionRadialBlueBottom}`} />
        </div>
        <header className={styles.solutionHeader}>
          <div className={styles.solutionHeadingWrap}>
          <h2 className={styles.solutionTitle}>
            <span className={styles.solutionTitleLight}>{s.headlineLight}</span>
            <span>{s.headlineDark}</span>
          </h2></div>
          <div className={styles.solutionDescWrap}><p className={styles.solutionDescription}>
            {s.description}
          </p></div>
        </header>

        <div className={styles.solutionGrid}>
          {s.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={styles.solutionCard}
              >
                <span
                  className={styles.solutionIcon}
                >
                  <AnimatedNetworkIcon />
                </span>
                <div className={styles.solutionCardContent}>
                  <h3 className={styles.solutionCardTitle}>
                    {it.title}
                  </h3>
                  <p className={`${styles.solutionCardDesc} ${isOpen ? styles.solutionCardDescExpanded : ""}`}>
                    {it.desc}
                  </p>
                  <button
                    type="button"
                    aria-label="Toggle details"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className={styles.solutionToggle}
                  >
                    {isOpen ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="19" x2="12" y2="5" />
                        <polyline points="5 12 12 5 19 12" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <polyline points="19 12 12 19 5 12" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

          <Link
            href={s.ctaHref}
            className={styles.solutionCta}
          >
            Thảo luận dự án ngay!
            <ArrowUpRight className="h-4 w-4" />
          </Link>
      </div>
    </section>
  );
}
