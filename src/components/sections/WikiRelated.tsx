"use client";

import { Link } from "@/i18n/routing";
import { Calendar, Pencil } from "lucide-react";
import { useLocalizedHome } from "@/i18n/content";
import { winterfrostWikiHighlights } from "@/lib/wiki-highlights";
import { WikiCover } from "@/components/sections/wiki/WikiCover";
import s from "./WikiRelated.module.css";
import { useLocalizedValue } from "@/i18n/auto-text-client";

export function WikiRelated({
  compact = false,
  home: isHome = false,
  plainCta = false,
}: {
  compact?: boolean;
  home?: boolean;
  plainCta?: boolean;
} = {}) {
  const home = useLocalizedHome();
  const w = home.wikiSection;
  const items = useLocalizedValue(winterfrostWikiHighlights);
  return (
    <div className={`${s.section} ${compact ? s.compact : ""} ${isHome ? s.home : ""} ${plainCta ? s.technology : ""}`}>
        <div className={s.relatedHeader}>
          <h2 className={s.relatedTitle}>{w.label}</h2>
          {!isHome && (
            <Link
              href={w.ctaHref}
              className={s.plainCta}
            >
              <span className={s.plainCtaLine} />
              <span className={s.plainCtaText}>{w.ctaLabel}</span>
              <span className={s.plainCtaIcon}>
                <span className={s.plainArrow} />
                <span className={s.plainArrowHover} />
              </span>
            </Link>
          )}
        </div>
        <div className={s.relatedGrid}>
          {items.map((it) => (
            <Link key={it.slug} href={`/${it.slug}`} className={s.card}>
              <div className={s.imageWrapper}>
                <WikiCover
                  item={it}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className={s.tagRow}>
                <span
                  className={s.badge}
                  style={{ backgroundColor: "rgba(31, 94, 229, 0.12)", color: "#1a3b91" }}
                >
                  {it.category}
                </span>
              </div>
              <div className={s.content}>
                <h3 className={s.title}>{it.title}</h3>
                {it.metaDescription && <p className={s.excerpt}>{it.metaDescription}</p>}
              </div>
              <div className={s.meta}>
                <span className={s.metaItem}>
                  <Pencil />
                  {it.author}
                </span>
                <div className={s.metaRight}>
                  <span className={s.metaItem}>
                    <Calendar />
                    {it.year}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
    </div>
  );
}
