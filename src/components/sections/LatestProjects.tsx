"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import styles from "./LatestProjects.module.css";
import { useAutoText } from "@/i18n/auto-text-client";

export type LatestProject = {
  slug: string;
  name: string;
  type: string;
  tags?: string[];
  image: string;
  href?: string;
};

type Props = {
  items: LatestProject[];
  headingLight?: string;
  headingDark?: string;
  viewAllLabel?: string;
  viewAllHref?: string;
};

export function LatestProjects({
  items,
  headingLight = "From our insights,",
  headingDark = "industry knowledge.",
  viewAllLabel = "Xem tất cả",
  viewAllHref = "/case-studies",
}: Props) {
  const tr = useAutoText();
  const rows: LatestProject[][] = [];
  for (let i = 0; i < items.length; i += 2) rows.push(items.slice(i, i + 2));

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>
            <span className={styles.headingLight}>{tr(headingLight)} </span>
            {headingDark && (
              <>
                <br />
                <span className={styles.headingDark}>{tr(headingDark)}</span>
              </>
            )}
          </h2>
          <Link href={viewAllHref} className={styles.viewAllBtn}>
            <span className={styles.line} />
            <span>{tr(viewAllLabel)}</span>
            <span className={styles.arrow} aria-hidden>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>
            </span>
          </Link>
        </div>

        <div className={styles.grid}>
          {rows.map((row, ri) => (
            <div key={ri} className={styles.row}>
              {row.map((p) => (
                <div key={p.slug} className={styles.cardWrapper}>
                  <Link href={p.href ?? `/case-studies/${p.slug}`} className={styles.card}>
                    <div className={styles.imageContainer}>
                      <div className={styles.imageWrapper}>
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="(max-width:768px) 100vw, 60vw"
                          className={styles.image}
                        />
                      </div>
                    </div>
                    <div className={styles.cardFooter}>
                      <div className={styles.tagList}>
                        {[...(p.tags ?? []), p.type].filter(Boolean).map((t) => (
                          <span key={t} className={styles.tag}>{t}</span>
                        ))}
                      </div>
                      <div className={styles.info}>
                        <h3 className={styles.projectName}>{p.name}</h3>
                        <span className={styles.viewProject}>
                          <span className={styles.iconWrapper} aria-hidden>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>
                          </span>
                          {tr("Xem dự án")}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
