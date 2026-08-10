"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowUpRight, Calendar, Eye, Pencil } from "lucide-react";
import { industriesPage } from "@/lib/site";
import { useLocalizedValue } from "@/i18n/auto-text-client";
import styles from "./IndustriesIndex.module.css";

export function IndustriesWiki() {
  const wiki = useLocalizedValue(industriesPage.wikiPick);

  return (
    <section className={styles.wikiOuter}>
      <div className={styles.wikiSection}>
        <div className={styles.wikiHeader}>
          <h2 className={styles.wikiHeading}>{wiki.label}</h2>
          <Link href={wiki.ctaHref} className={styles.wikiViewAll}>
            {wiki.ctaLabel}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className={styles.wikiGrid}>
          {wiki.items.map((item) => (
            <Link key={item.slug} href={`/wiki/${item.slug}`} className={styles.wikiCard}>
              <div className={styles.wikiImage}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>
              <div className={styles.wikiTagRow}>
                <span
                  className={styles.wikiBadge}
                  style={{ backgroundColor: item.categoryBg, color: item.categoryColor }}
                >
                  {item.category}
                </span>
              </div>
              <div className={styles.wikiContent}>
                <h3 className={styles.wikiTitle}>{item.title}</h3>
                <p className={styles.wikiDescription}>{item.desc}</p>
              </div>
              <div className={styles.wikiMeta}>
                <span className={styles.wikiMetaItem}><Pencil size={13} />{item.author}</span>
                <span className={styles.wikiMetaRight}>
                  <span className={styles.wikiMetaItem}><Calendar size={13} />{item.date}</span>
                  <span className={styles.wikiMetaItem}><Eye size={13} />{item.views}</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
