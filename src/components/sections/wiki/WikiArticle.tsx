"use client";

import { Link } from "@/i18n/routing";
import { ArrowUpRight, Calendar, ChevronDown, Eye, Mail, Pencil, Phone, User } from "lucide-react";
import type { ContentPage } from "@/lib/site";
import { prepareWikiArticle } from "@/lib/wiki-article";
import { useAutoText } from "@/i18n/auto-text-client";
import { WikiCover } from "./WikiCover";
import s from "./WikiArticle.module.css";

function ArticleMeta({ item }: { item: ContentPage }) {
  return (
    <>
      <span><Pencil size={13} /> {item.author || "Winterfrost Editorial"}</span>
      <span><Calendar size={13} /> {item.year || "2026"}</span>
      <span><Eye size={13} /> Mới</span>
    </>
  );
}

function RelatedCard({ item }: { item: ContentPage }) {
  const tr = useAutoText();
  return (
    <Link href={`/${item.slug}`} className={s.relatedCard} data-cursor-text={tr("Xem bài viết")}>
      <div className={s.relatedImage}>
        <WikiCover item={item} sizes="490px" />
      </div>
      <div className={s.relatedTagRow}><span className={s.relatedBadge}>{item.category || "Công nghệ"}</span></div>
      <div className={s.relatedContent}>
        <h3>{item.title}</h3>
        <p>{item.metaDescription}</p>
      </div>
      <div className={s.relatedMeta}><ArticleMeta item={item} /></div>
    </Link>
  );
}

function CompactCard({ item }: { item: ContentPage }) {
  return (
    <Link href={`/${item.slug}`} className={s.compactCard}>
      <div className={s.compactImage}>
        <WikiCover item={item} sizes="180px" showTitle={false} />
      </div>
      <div className={s.compactContent}>
        <div className={s.compactTagRow}><span className={s.compactBadge}>{item.category || "Công nghệ"}</span></div>
        <h3>{item.title}</h3>
        <div className={s.compactMeta}><ArticleMeta item={item} /></div>
      </div>
    </Link>
  );
}

export function WikiArticle({ item, related }: { item: ContentPage; related: ContentPage[] }) {
  const tr = useAutoText();
  const article = prepareWikiArticle(item);
  const sidebarRelated = related.filter((entry) => entry.slug !== item.slug).slice(0, 3);

  return (
    <div className={s.page} data-visual-id="wiki-detail" data-wiki-slug={item.slug}>
      <div className={s.inner}>
        <nav className={s.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">{tr("Home")}</Link><span>/</span>
          <Link href="/wiki">{tr("Wiki")}</Link><span>/</span>
          <Link href="/wiki">{item.category || tr("Công nghệ")}</Link><span>/</span>
          <span>{item.title}</span>
        </nav>

        <div className={s.headerCard}>
          <div className={s.articleHeader}>
            <h1>{item.title}</h1>
            <div className={s.meta}>
              <div><span>{tr("Tác giả")}</span><strong>{item.author || "Winterfrost Editorial"}</strong></div>
              <div><span>{tr("Năm")}</span><strong>{item.year || "2026"}</strong></div>
            </div>
            {item.contentText && <p className={s.summary}>{item.contentText}</p>}
            <div>
              <p className={s.scopeLabel}>{tr("Chủ đề")}</p>
              <div className={s.scopeTags}><span>{item.category || tr("Công nghệ")}</span></div>
            </div>
          </div>
        </div>

        <div className={s.detailSection}>
          <div className={s.centerCol}>
            <aside className={s.tocCol}>
              <div className={s.tocPanel}>
                <h2>{tr("Mục lục")}</h2>
                <ul>
                  {article.headings.map((heading, index) => (
                    <li key={`${heading}-${index}`}><a href={`#wiki-section-${index + 1}`}>{heading}</a></li>
                  ))}
                </ul>
              </div>
            </aside>
            <article className={s.contentArea}>
              {(item.image || item.ogImage) && (
                <div className={s.featuredImage}>
                  <WikiCover item={item} sizes="(max-width: 1100px) 100vw, 760px" priority />
                </div>
              )}
              <div className={s.content} data-wiki-content="true" dangerouslySetInnerHTML={{ __html: article.html }} />
            </article>
          </div>

          <div className={s.rightCol}>
            <aside className={s.sidebar}>
              <div className={s.formCard}>
                <h2>{tr("Bước vào hành trình thành công")}</h2>
                <div className={s.formInner}>
                  <form>
                    <div className={s.formGrid}>
                      <label><input aria-label={tr("Họ Tên")} /><span>{tr("Họ Tên *")}</span><User className={s.fieldIcon} size={18} /></label>
                      <label><input aria-label="Email" type="email" /><span>Email *</span><Mail className={s.fieldIcon} size={18} /></label>
                    </div>
                    <label><input aria-label={tr("Số điện thoại")} /><span>{tr("Số điện thoại *")}</span><Phone className={s.fieldIcon} size={18} /></label>
                    <label className={s.selectField}>
                      <select aria-label={tr("Dịch vụ")} defaultValue="">
                        <option value="" disabled>{tr("Chọn dịch vụ")}</option>
                        <option>{tr("Thiết kế website")}</option><option>{tr("Phát triển AI")}</option><option>{tr("Phát triển ứng dụng SaaS")}</option>
                        <option>{tr("Thiết kế App")}</option><option>{tr("Vận hành và bảo trì")}</option><option>{tr("Phát triển phần mềm doanh nghiệp")}</option>
                        <option>{tr("Phát triển phần mềm MVP")}</option><option>{tr("Dịch vụ IT")}</option><option>{tr("Tư vấn chuyển đổi số")}</option>
                        <option>{tr("Phát triển DevOps")}</option><option>{tr("Phát triển IoT")}</option><option>{tr("Phát triển Blockchain")}</option>
                      </select>
                      <span>{tr("Dịch vụ *")}</span><ChevronDown className={s.fieldIcon} size={18} />
                    </label>
                    <label className={s.textareaField}><textarea aria-label={tr("Nội dung")} rows={4} /><span>{tr("Hãy để lại lời nhắn")}</span><Pencil className={s.fieldIcon} size={18} /></label>
                    <button type="button">{tr("Gửi thông tin đặt lịch")}</button>
                  </form>
                </div>
              </div>
              <div className={s.sidebarPosts}>
                <h2>{tr("Bài viết liên quan")}</h2>
                <div className={s.sidebarPostsList}>{sidebarRelated.map((entry) => <CompactCard key={entry.slug} item={entry} />)}</div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <section className={s.latest}>
        <div className={s.latestHeader}>
          <h2>{tr("Bài viết mới nhất")}</h2>
          <Link href="/wiki">{tr("Xem tất cả")} <ArrowUpRight size={18} /></Link>
        </div>
        <div className={s.relatedGrid}>{related.filter((entry) => entry.slug !== item.slug).slice(0, 6).map((entry) => <RelatedCard key={entry.slug} item={entry} />)}</div>
      </section>
    </div>
  );
}
