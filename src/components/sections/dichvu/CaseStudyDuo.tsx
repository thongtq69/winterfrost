import Image from "next/image";
import { Link } from "@/i18n/routing";
import type { CSSProperties } from "react";
import { useLocalizedServicesPage } from "@/i18n/content";
import s from "./CaseStudyDuo.module.css";

type CaseStudyItem = {
  slug: string;
  category: string;
  title: string;
  tag: string;
  cta: string;
  img: string;
};

type Props = {
  heading?: string;
  items?: readonly CaseStudyItem[];
  detail?: boolean;
};

export function CaseStudyDuo({ heading, items, detail = false }: Props = {}) {
  const dichVuPage = useLocalizedServicesPage();
  const data = dichVuPage.caseStudies;
  const visibleItems = items ?? data.items;

  return (
    <section className={`${s.section} ${detail ? s.detail : ""}`}>
      <div className={s.container}>
        <div className={s.header}>
          <h2 className={s.heading}>{heading ?? data.heading}</h2>
          <Link href={data.viewAllHref} className={s.viewAllBtn}>
            <span className={s.line} />
            <span className={s.btnText}>{data.viewAllLabel}</span>
            <span className={s.iconWrapper}>
              <span className={s.arrowIcon} />
              <span className={s.arrowIconHover} />
            </span>
          </Link>
        </div>

        <div
          className={s.grid}
          style={{ "--cols": Math.min(visibleItems.length, 3) } as CSSProperties}
        >
          {visibleItems.map((it, index) => (
            <div
              key={it.slug}
              className={`${s.itemWrapper} ${s[`item${index + 1}`] ?? ""}`}
            >
              <div className={s.cardWrapper}>
                <Link
                  href={`/case-studies/${it.slug}`}
                  className={s.card}
                  data-cursor-text={it.cta}
                >
                  <div className={`${s.imageContainer} ${s.aspect16x9}`}>
                    <div className={s.imageWrapper}>
                      <Image
                        className={s.image}
                        src={it.img}
                        alt={it.title}
                        width={1200}
                        height={675}
                        sizes="(max-width: 720px) 100vw, 416px"
                      />
                    </div>
                  </div>
                  <div className={s.cardFooter}>
                    <div className={s.tagList}>
                      {it.category.split(" · ").map((tag) => (
                        <span key={tag} className={s.tag}>{tag}</span>
                      ))}
                      <span className={s.tag}>{it.tag}</span>
                    </div>
                    <div className={s.info}>
                      <div className={s.projectClient}>
                        <h3 className={s.projectName}>{it.title}</h3>
                      </div>
                      <div className={s.viewProject}>
                        <span className={s.iconWrapper} aria-hidden>
                          <span className={s.arrowIcon} />
                          <span className={s.arrowIconHover} />
                        </span>
                        <span className={s.viewText}>{it.cta}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
