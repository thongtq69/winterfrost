"use client";

import { Link } from "@/i18n/routing";
import styles from "./CaseStudyHeader.module.css";
import { useAutoText } from "@/i18n/auto-text-client";

type ScopeTag = { label: string; href?: string };

type Props = {
  title: string;
  date: string;
  author: string;
  description: string;
  scopeTags: ScopeTag[];
  viewLiveUrl?: string;
};

export function CaseStudyHeader({
  title,
  date,
  author,
  description,
  scopeTags,
  viewLiveUrl,
}: Props) {
  const tr = useAutoText();
  const hasDate = date.trim().length > 0;
  const hasAuthor = author.trim().length > 0;
  const hasDescription = description.trim().length > 0;

  return (
    <header className={styles.headerCard}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.headerContent}>
        {(hasDate || hasAuthor) && (
          <div className={styles.meta}>
            {hasDate && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>{tr("Date")}</span>
                <span className={styles.metaValue}>{date}</span>
              </div>
            )}
            {hasAuthor && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>{tr("Author")}</span>
                <span className={styles.metaValue}>{author}</span>
              </div>
            )}
          </div>
        )}
        {hasDescription && (
          <div className={styles.description}>
            <p>{description}</p>
          </div>
        )}
        {scopeTags.length > 0 && (
          <div className={styles.scopeSection}>
            <p className={styles.scopeLabel}>{tr("Scope of Work")}</p>
            <div className={styles.scopeTags}>
              {scopeTags.map((t) =>
                t.href ? (
                  <Link key={t.label} href={t.href} className={styles.scopeTag}>
                    {t.label}
                  </Link>
                ) : (
                  <span key={t.label} className={styles.scopeTag}>
                    {t.label}
                  </span>
                ),
              )}
            </div>
          </div>
        )}
        {viewLiveUrl && (
          <a
            href={viewLiveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewLink}
          >
            <span className={styles.line} />
            <span>{tr("View Live Site")}</span>
            <span className={styles.arrow} aria-hidden>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>
            </span>
          </a>
        )}
      </div>
    </header>
  );
}
