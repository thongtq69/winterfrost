"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { Calendar, ChevronLeft, ChevronRight, Eye, Pencil, Search } from "lucide-react";
import type { ContentPage } from "@/lib/site";
import { useAutoText, useLocalizedValue } from "@/i18n/auto-text-client";
import { WikiCover } from "./WikiCover";
import s from "./WikiIndex.module.css";

const ALL_CATEGORIES = [
  "AI",
  "Bản tin SoftBuild",
  "Blockchain",
  "Công nghệ",
  "Giải pháp Doanh nghiệp",
  "IoT",
  "Lĩnh vực",
  "Mobile App",
  "Phần mềm",
  "Phương pháp phát triển",
  "Startups",
  "Top List",
  "UIUX Design",
  "Website",
  "Work Life",
];

function categoryFor(item: ContentPage) {
  if (item.category) return item.category;
  const value = `${item.slug} ${item.title}`.toLowerCase();
  if (value.includes("chatbot") || value.includes(" ai ") || value.startsWith("ai-")) return "AI";
  if (value.includes("blockchain")) return "Blockchain";
  if (value.includes("iot")) return "IoT";
  if (value.includes("ui") || value.includes("ux") || value.includes("design")) return "UIUX Design";
  if (value.includes("mvp") || value.includes("startup")) return "Startups";
  if (value.includes("mobile") || value.includes("app") || value.includes("flutter")) return "Mobile App";
  if (value.includes("wordpress") || value.includes("website") || value.includes("javascript")) return "Website";
  if (value.includes("work-life") || value.includes("nghe-nghiep") || value.includes("backend")) return "Work Life";
  return "Phần mềm";
}

function ArticleMeta({ item, compact = false }: { item: ContentPage; compact?: boolean }) {
  return (
    <div className={`${s.meta} ${compact ? s.metaCompact : ""}`}>
      <span><Pencil size={13} /> {item.author || "SoftBuild Editorial"}</span>
      <span><Calendar size={13} /> {item.year || "2026"}</span>
      <span><Eye size={13} /> Mới</span>
    </div>
  );
}

function CategoryBadge({ item }: { item: ContentPage }) {
  const category = categoryFor(item);
  const backgroundColor: Record<string, string> = {
    AI: "rgba(217, 41, 22, 0.45)",
    "UIUX Design": "rgba(208, 208, 255, 0.5)",
    "Phần mềm": "rgba(209, 209, 255, 0.8)",
    "Phương pháp phát triển": "rgba(217, 132, 22, 0.45)",
    Startups: "rgb(236, 216, 243)",
  };
  return (
    <span className={s.badge} style={{ backgroundColor: backgroundColor[category] ?? "rgba(170, 143, 228, 0.2)" }}>
      {category}
    </span>
  );
}

function FeaturedCard({ item }: { item: ContentPage }) {
  const tr = useAutoText();
  return (
    <Link href={`/${item.slug}`} className={s.featuredCard} data-cursor-text={tr("Xem bài viết")}>
      <div className={s.featuredImage}>
        <WikiCover item={item} priority sizes="880px" />
      </div>
      <div className={s.featuredBadge}><CategoryBadge item={item} /></div>
      <div className={s.featuredContent}>
        <h2>{item.title}</h2>
        <p>{item.metaDescription}</p>
      </div>
      <ArticleMeta item={item} />
    </Link>
  );
}

function PopularCard({ item }: { item: ContentPage }) {
  const tr = useAutoText();
  return (
    <Link href={`/${item.slug}`} className={s.popularCard} data-cursor-text={tr("Xem bài viết")}>
      <div className={s.popularImage}>
        <WikiCover item={item} sizes="230px" showTitle={false} />
      </div>
      <div className={s.popularContent}>
        <CategoryBadge item={item} />
        <h3>{item.title}</h3>
        <p>{item.metaDescription}</p>
        <ArticleMeta item={item} compact />
      </div>
    </Link>
  );
}

function GridCard({ item }: { item: ContentPage }) {
  const tr = useAutoText();
  return (
    <Link href={`/${item.slug}`} className={s.gridCard} data-cursor-text={tr("Xem bài viết")}>
      <div className={s.gridImage}>
        <WikiCover item={item} sizes="483px" />
      </div>
      <div className={s.gridBadge}><CategoryBadge item={item} /></div>
      <div className={s.gridContent}>
        <h3>{item.title}</h3>
        <p>{item.metaDescription}</p>
      </div>
      <ArticleMeta item={item} />
    </Link>
  );
}

export function WikiIndex({ items: sourceItems }: { items: ContentPage[] }) {
  const tr = useAutoText();
  const allCategories = useLocalizedValue(ALL_CATEGORIES);
  const allLabel = tr("Tất cả");
  const items = sourceItems.filter(
    (item, index, all) =>
      item.slug !== "wiki" && all.findIndex((candidate) => candidate.slug === item.slug) === index,
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(allLabel);
  const [page, setPage] = useState(1);
  const featured = items[0];
  const popular = items.slice(1, 6);
  const normalized = query.trim().toLocaleLowerCase("vi");
  const isDefaultView = !normalized && category === allLabel;
  const candidates = isDefaultView && items.slice(6).length >= 3 ? items.slice(6) : items;
  const filtered = candidates.filter((item) => {
    const matchesQuery = !normalized || `${item.title} ${item.metaDescription || ""}`.toLocaleLowerCase("vi").includes(normalized);
    const matchesCategory = category === allLabel || categoryFor(item) === category;
    return matchesQuery && matchesCategory;
  });
  const pageSize = 18;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const resultCount = isDefaultView ? items.length : filtered.length;

  if (!featured) return null;

  return (
    <>
      <section className={s.hero} data-visual-id="wiki-hero">
        <div>
          <h1><span>SoftBuild</span>{" "}<br /><span>Wiki</span></h1>
          <h2><strong>{tr("Góc nhìn của SoftBuild về những xu hướng công nghệ và giải pháp chuyển đổi số")}</strong></h2>
        </div>
      </section>

      <section className={s.mainSection} data-visual-id="wiki-index">
        <div className={s.contentWrap}>
          <div className={s.topStories}>
            <div className={s.highlightSide}><FeaturedCard item={featured} /></div>
            <div className={s.popularList}>{popular.map((item) => <PopularCard key={item.slug} item={item} />)}</div>
          </div>

          <div className={s.archive}>
            <div className={s.filterBar}>
              <label className={s.searchBox}>
                <Search size={20} />
                <input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder={tr("Tìm kiếm bài viết")} />
              </label>
              <div className={s.categoryList}>
                <button type="button" className={category === allLabel ? s.activeCategory : ""} onClick={() => { setCategory(allLabel); setPage(1); }}>{allLabel}</button>
                {allCategories.map((item) => (
                  <button type="button" key={item} className={category === item ? s.activeCategory : ""} onClick={() => { setCategory(item); setPage(1); }}>{item}</button>
                ))}
              </div>
            </div>
            <div className={s.resultSummary}>{tr("Tổng số bài viết")}: <strong>{resultCount.toLocaleString("vi-VN")}</strong></div>
            <div className={s.postGrid}>{pageItems.map((item) => <GridCard key={item.slug} item={item} />)}</div>
            {totalPages > 1 && (
              <nav className={s.pagination} aria-label={tr("Phân trang Wiki")}>
                <button type="button" disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}><ChevronLeft size={18} /> {tr("Trang trước")}</button>
                <span>{tr("Trang")} <strong>{currentPage}</strong> / {totalPages}</span>
                <button type="button" disabled={currentPage === totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))}>{tr("Trang sau")} <ChevronRight size={18} /></button>
              </nav>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
