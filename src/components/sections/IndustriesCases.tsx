"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { industriesPage, caseStudies } from "@/lib/site";
import { liveCaseStudies } from "@/lib/case-studies-live";
import { useAutoText, useLocalizedValue } from "@/i18n/auto-text-client";
import styles from "./IndustriesIndex.module.css";

export function IndustriesCases() {
  const tr = useAutoText();
  const c = useLocalizedValue(industriesPage.cases);
  const allCaseStudies = useLocalizedValue(
    [...liveCaseStudies, ...caseStudies].map((item) => ({
      ...item,
      contentHtml: "",
      contentText: "",
    })),
  );
  const items = c.items
    .map((slug) => allCaseStudies.find((cs) => cs.slug === slug))
    .filter((it): it is NonNullable<typeof it> => Boolean(it));

  if (!items.length) return null;

  return (
    <section className={styles.caseSection}>
      <div className={styles.caseContainer}>
        <div className={styles.caseHeader}>
          <h2 className={styles.caseHeading}>{c.headline}</h2>
          <Link href={c.ctaHref} className={styles.caseViewAll}>
            {c.ctaLabel}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className={styles.caseGrid}>
          {items.map((it) => (
            <Link
              key={it.slug}
              href={`/case-studies/${it.slug}`}
              className={styles.caseCard}
            >
              <div className={styles.caseImage}>
                {(it.image || it.ogImage) && (
                  <Image
                    src={it.image || it.ogImage || ""}
                    alt={it.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                )}
              </div>
              <div className={styles.caseFooter}>
                {(it.category || it.service) && (
                  <div className={styles.caseTags}>
                    {it.category && <span className={styles.caseTag}>{it.category}</span>}
                    {it.service && <span className={styles.caseTag}>{it.service}</span>}
                  </div>
                )}
                <div className={styles.caseInfo}>
                  <h3 className={styles.caseTitle}>{it.title}</h3>
                  <span className={styles.caseAction}>
                    <ArrowUpRight className="h-[18px] w-[18px]" />
                    {tr("Xem dự án")}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
