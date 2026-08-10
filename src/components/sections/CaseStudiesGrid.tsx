"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowUpRight, Search } from "lucide-react";
import styles from "./CaseStudiesGrid.module.css";
import type { ContentPage } from "@/lib/site";
import { useAutoText, useLocalizedValue } from "@/i18n/auto-text-client";

const ALL = "Tất cả dự án";
const PAGE_SIZE = 6;

const FIELD_LABEL: Record<"category" | "service", string> = {
  category: "Lĩnh vực",
  service: "Dịch vụ",
};

const CATEGORY_CHIPS = [
  ALL,
  "Bán lẻ",
  "Bất động sản",
  "Chuỗi cung ứng",
  "Công nghệ tài chính",
  "Dầu khí",
  "Du lịch",
  "Giáo dục",
  "Kế toán",
  "Kiến trúc & xây dựng",
  "Ngân hàng",
  "Nông nghiệp",
  "Phần mềm doanh nghiệp",
  "Phần mềm tiện ích",
  "Phát triển ứng dụng theo yêu cầu",
  "Tài chính doanh nghiệp",
  "Thương mại điện tử",
  "Vận tải và Logistics",
  "Y tế",
];

const SERVICE_CHIPS = [ALL, "Thiết kế App", "Thiết kế Website"];

const SLUG_TAGS: Record<string, string[]> = {
  "website-edunora": ["Y tế"],
  "website-virela-interior": ["Kiến trúc & xây dựng", "Thương mại điện tử"],
  "website-ceranova": ["Kiến trúc & xây dựng", "Thương mại điện tử"],
  "website-rovena-travel": ["Du lịch"],
  "website-zenovia-retail": ["Bán lẻ", "Chuỗi cung ứng"],
  "website-veloura-nails": ["Bán lẻ"],
  "website-pixelnova-media": [],
  "website-mocvan-tea": ["Bán lẻ", "Thương mại điện tử"],
  "aeromint-cleanroom": ["Bán lẻ", "Y tế"],
  "app-nivora-connect": ["Phát triển ứng dụng theo yêu cầu"],
  "app-grevia-lawn": ["Phát triển ứng dụng theo yêu cầu"],
  "website-loomora-rugs": ["Bán lẻ", "Thương mại điện tử"],
  "website-chromiva-coatings": ["Bán lẻ", "Thương mại điện tử"],
  "website-verdora-property": ["Bất động sản"],
  "website-candella-works": ["Bán lẻ", "Thương mại điện tử"],
  "website-flexora-packaging": ["Nông nghiệp"],
  "website-polyvera": ["Bán lẻ", "Nông nghiệp"],
  "website-mirava": ["Thương mại điện tử"],
  "website-bytevera": ["Bán lẻ"],
  "website-motoria-link": ["Bán lẻ"],
  "website-dentavera": ["Bán lẻ", "Y tế"],
  "website-lumera-living": ["Kiến trúc & xây dựng"],
  "website-auriva-land": [],
  "website-rovena-mobility": [],
  "website-brewvia": [],
  "website-arcvera-construction": [],
};

type Mode = "category" | "service";

export function CaseStudiesGrid({ items }: { items: ContentPage[] }) {
  const tr = useAutoText();
  const all = tr(ALL);
  const fieldLabel = useLocalizedValue(FIELD_LABEL);
  const categoryChips = useLocalizedValue(CATEGORY_CHIPS);
  const serviceChips = useLocalizedValue(SERVICE_CHIPS);
  const slugTags = useLocalizedValue(SLUG_TAGS);
  const [mode, setMode] = useState<Mode>("category");
  const [active, setActive] = useState<string>(all);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const chips = useMemo(() => (mode === "category" ? categoryChips : serviceChips), [categoryChips, mode, serviceChips]);

  const filtered = useMemo(() => {
    return items.filter((c) => {
      const tags = slugTags[c.slug] ?? (c.category ? [c.category] : []);
      const matchActive =
        active === all || (mode === "category" ? tags.includes(active) : c.service === active);
      const q = query.trim().toLowerCase();
      const matchQuery = !q
        || c.title.toLowerCase().includes(q)
        || tags.some((t) => t.toLowerCase().includes(q))
        || c.service?.toLowerCase().includes(q);
      return matchActive && matchQuery;
    });
  }, [active, all, items, mode, query, slugTags]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  function changeMode(next: Mode) {
    setMode(next);
    setActive(all);
    setPage(1);
  }

  function selectChip(label: string) {
    setActive(label);
    setPage(1);
  }

  function pagesArray(): (number | "dots")[] {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    return [1, 2, 3, "dots", totalPages];
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.divider} />
        <div className={styles.bodyLayout}>
          <aside className={styles.sidebar} aria-label={fieldLabel[mode]}>
            <div className={styles.tabsWrap} role="tablist">
              {(["category", "service"] as Mode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  role="tab"
                  aria-selected={mode === m}
                  onClick={() => changeMode(m)}
                  className={`${styles.tab} ${mode === m ? styles.active : ""}`}
                >
                  {fieldLabel[m]}
                </button>
              ))}
            </div>
            {chips.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => selectChip(c)}
                className={`${styles.chip} ${active === c ? styles.active : ""}`}
              >
                {c}
              </button>
            ))}
          </aside>

          <div className={styles.mainContent}>
            <label className={styles.searchWrap}>
              <Search size={18} className={styles.searchIcon} aria-hidden />
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Search..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              />
            </label>
          <div className={styles.grid}>
            {visible.length === 0 && (
              <div className={styles.empty}>{tr("Không tìm thấy dự án phù hợp với bộ lọc.")}</div>
            )}
            {visible.map((c) => {
              const tags = slugTags[c.slug] ?? (c.category ? [c.category] : []);
              return (
                <Link key={c.slug} href={`/case-studies/${c.slug}`} className={styles.card} data-cursor-text={tr("Xem dự án")}>
                  <div className={styles.cardImage}>
                    {c.image ? (
                      <Image src={c.image} alt={c.title} fill sizes="(max-width:600px) 100vw, (max-width:1024px) 50vw, 33vw" />
                    ) : null}
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.tags}>
                        {[...tags, ...(c.service ? [c.service] : [])].map((t) => (
                          <span key={t} className={styles.tag}>{t}</span>
                        ))}
                    </div>
                    <div className={styles.titleRow}>
                      <div className={styles.titleCol}>
                        <h3 className={styles.title}>{c.title}</h3>
                      </div>
                      <span className={styles.viewLink}>
                        <ArrowUpRight size={14} strokeWidth={2.2} />
                        {tr("Xem dự án")}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          </div>
        </div>

        {totalPages > 1 && (
          <div className={styles.pagination} aria-label="Phân trang">
              {pagesArray().map((p, i) =>
                p === "dots" ? (
                  <span key={`d-${i}`} className={styles.page} aria-hidden>…</span>
                ) : (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p)}
                    className={`${styles.page} ${p === safePage ? styles.current : ""}`}
                  >
                    {p}
                  </button>
                ),
              )}
              <button
                type="button"
                onClick={() => setPage(Math.min(totalPages, safePage + 1))}
                className={styles.next}
              >
                {tr("NEXT")} <ArrowUpRight size={16} style={{ transform: "rotate(45deg)" }} />
              </button>
          </div>
        )}
      </div>
    </section>
  );
}
