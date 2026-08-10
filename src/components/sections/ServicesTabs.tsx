"use client";

import { Link } from "@/i18n/routing";
import { useState } from "react";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { useLocalizedHome } from "@/i18n/content";
import s from "./ServicesTabs.module.css";

export function ServicesTabs({ home: isHome = false }: { home?: boolean } = {}) {
  const home = useLocalizedHome();
  const data = home.servicesSection;
  const [tab, setTab] = useState(0);
  const active = data.tabs[tab];

  return (
    <section className={`${s.section} ${isHome ? s.home : ""}`} data-visual-id="home-services">
      <div className={s.container}>
        <div className={s.header}>
          <SectionLabel>{data.label}</SectionLabel>
          <h2 className={s.serviceHeading}>
            <span className={s.headingNormal}>{data.headline[0]}</span>{" "}
            <span className={s.headingAccent}>{data.headline[1]}</span>{" "}
            <span className={`${s.headingNormal} ${s.headingBreak}`}>{data.headline[2]}</span>
          </h2>
        </div>

        <div className={s.bottomArea}>
          <div className={s.leftCol}>
            <div className={s.verticalTabs}>
              {data.tabs.map((t, i) => (
                <button
                  key={t.title}
                  type="button"
                  onClick={() => setTab(i)}
                  onMouseEnter={() => setTab(i)}
                  onFocus={() => setTab(i)}
                  className={`${s.tabBtn} ${tab === i ? s.tabBtnActive : ""}`}
                  aria-pressed={tab === i}
                  data-visual-id={`services-tab-${i + 1}`}
                >
                  <span>{t.title}</span>
                </button>
              ))}
            </div>
            <Link href={data.ctaHref} className={s.viewAllBtn}>
              <span className={s.viewAllTextWrap}>
                <span className={s.viewAllMainText}>{data.ctaLabel}</span>
                <span className={s.viewAllHoverText}>{data.ctaLabel}</span>
              </span>
              <span className={s.viewAllIconWrap} aria-hidden>
                <span className={`${s.viewAllIcon} ${s.viewAllIconFirst}`}>
                  <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </span>
                <span className={`${s.viewAllIcon} ${s.viewAllIconSecond}`}>
                  <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </span>
              </span>
            </Link>
          </div>

          <div className={s.rightCol}>
            <div className={s.servicesList}>
              {active.items.map((it) => (
                <Link href={it.href} className={s.serviceRow} data-visual-id={`services-row-${it.num}`} key={it.num}>
                    <div className={s.rowNumber}>
                      <span>{it.num}</span>
                    </div>
                    <div className={s.rowContent}>
                      <div className={s.rollInner}>
                        <h3 className={`${s.rowTitle} ${s.front}`}>{it.title}</h3>
                        <span className={`${s.rowTitle} ${s.back}`}>{it.title}</span>
                      </div>
                      <p className={s.rowDesc}>{it.desc}</p>
                    </div>
                    <div className={s.rowArrow}>
                      <svg className={s.arrowIcon1} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                      <svg className={s.arrowIcon2} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                    {it.hoverImg && (
                      <div className={s.hoverImageWrapper}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={it.hoverImg} alt={it.title} title={it.title} />
                      </div>
                    )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
