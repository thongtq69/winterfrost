"use client";

import { Link } from "@/i18n/routing";
import type { ServiceComprehensive } from "@/lib/dich-vu-detail-pages";
import { Reveal } from "@/components/primitives/Reveal";
import styles from "./ComprehensiveServices.module.css";
import { useAutoText } from "@/i18n/auto-text-client";

export function ComprehensiveServices({ data }: { data: ServiceComprehensive }) {
  const tr = useAutoText();
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Reveal as="h2" direction="up" className={styles.heading}>
            <span className={styles.headingLight}>{data.headlineLight}</span>
            {" "}
            <span className={styles.headingDark}>{data.headlineDark}</span>
          </Reveal>
        </div>
        <div className={styles.grid}>
          {data.items.map((item, i) => (
            <Reveal key={i} direction="up" delay={i * 100} className={styles.cardContainer}>
              <Link className={styles.cardLink} href={item.href}>
                <div className={styles.textSection}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.description}>{item.desc}</p>
                </div>
                <div className={styles.imageSection}>
                  <div className={styles.imageWrapper}>
                    <img className={styles.image} src={item.image} alt={item.title} loading="lazy" />
                  </div>
                </div>
                <div className={styles.cardFooter}>
                  <div className={styles.viewServiceLink}>
                    <div className={styles.iconWrapper}>
                      <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17 17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </div>
                    <span className={styles.viewText}>{tr("Xem dịch vụ")}</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
