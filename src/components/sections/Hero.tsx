"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useState, useSyncExternalStore } from "react";
import {
  type HomeContent,
  useLocalizedHome,
} from "@/i18n/content";
import s from "./Hero.module.css";

const PLATFORM_IMG =
  "/images/brand/winterfrost/hero/winterfrost-glowing-symbol-transparent.png?v=wf-clean-20260727-v2";
const PILLAR_IMG = "/images/brand/winterfrost/hero/winterfrost-pillar.png";

const DEFAULT_POS_CLASSES = [s.posWeb, s.posApp, s.posSoftware, s.posAI, s.posMaintenance];
const DETAIL_POS_CLASSES = [s.posDetail0, s.posDetail1, s.posDetail2, s.posDetail3, s.posDetail4];
const COMPACT_HERO_QUERY = "(max-width: 1024px)";

function subscribeToCompactHero(callback: () => void) {
  const mediaQuery = window.matchMedia(COMPACT_HERO_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getCompactHeroSnapshot() {
  return window.matchMedia(COMPACT_HERO_QUERY).matches;
}

function getCompactHeroServerSnapshot() {
  return false;
}

type HeroData = HomeContent["hero"] & {
  video: string;
  detailCtaPrimary: { label: string; href: string };
  detailCtaSecondary: { label: string; href: string };
  backLabel: string;
  prevLabel: string;
  nextLabel: string;
  pillars: Array<{ key: string; label: string; title: string; desc: string; href: string }>;
};

export function Hero() {
  const home = useLocalizedHome();
  const h = home.hero as HeroData;
  const pillars = h.pillars;
  const [active, setActive] = useState<number | null>(null);
  const isCompactHero = useSyncExternalStore(
    subscribeToCompactHero,
    getCompactHeroSnapshot,
    getCompactHeroServerSnapshot,
  );
  const displayedActive = active ?? (isCompactHero ? 2 : null);

  const open = useCallback((i: number) => setActive(i), []);
  const close = useCallback(() => setActive(null), []);
  const showPrevious = useCallback(() => {
    setActive((current) => {
      const selected = current ?? 2;
      return (selected - 1 + pillars.length) % pillars.length;
    });
  }, [pillars.length]);
  const showNext = useCallback(() => {
    setActive((current) => {
      const selected = current ?? 2;
      return (selected + 1) % pillars.length;
    });
  }, [pillars.length]);

  const inDetail = displayedActive !== null;
  const activePillar = pillars[displayedActive ?? 2];

  // In detail mode: pillar i goes to posDetail[(i - active + 2 + 5) % 5]
  // (active becomes pos2 = center; neighbors become 1/3; far ones become 0/4)
  const detailPosClass = (i: number) => {
    if (displayedActive === null) return "";
    const idx = (i - displayedActive + 2 + pillars.length) % pillars.length;
    return DETAIL_POS_CLASSES[idx] ?? "";
  };

  return (
    <section className={s.heroSection} data-visual-id="home-hero">
      <div className={s.bgVideoWrapper}>
        <video
          src={h.video}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={s.bgVideo}
          aria-hidden
        />
      </div>

      <div className={s.bottomGradient} />

      <div className={s.overlayContainer}>
        {/* DEFAULT TEXT BLOCK (left) */}
        <div className={`${s.textContent} ${inDetail ? s.contentFadeOut : s.contentFadeIn}`}>
          <div className={s.textInner}>
            <h1 className={s.mainTitle}>
              {h.title}
              <span className={s.visuallyHidden}> — {h.description}</span>
            </h1>
            <p className={s.mainDesc}>{h.description}</p>
            <div className={s.buttonGroup}>
              <Link href={h.ctaPrimary.href} className={s.btnPrimary}>
                <span>{h.ctaPrimary.label}</span>
                <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M19.44 13c-.22 0-.45-.07-.67-.12a9.4 9.4 0 0 1-1.31-.39 2 2 0 0 0-2.48 1l-.22.45a12.2 12.2 0 0 1-2.66-2 12.2 12.2 0 0 1-2-2.66l.42-.28a2 2 0 0 0 1-2.48 10 10 0 0 1-.39-1.31c-.05-.22-.09-.45-.12-.68a3 3 0 0 0-3-2.49h-3a3 3 0 0 0-3 3.41 19 19 0 0 0 16.52 16.46h.38a3 3 0 0 0 2-.76 3 3 0 0 0 1-2.25v-3a3 3 0 0 0-2.47-2.9m.5 6a1 1 0 0 1-.34.75 1.05 1.05 0 0 1-.82.25A17 17 0 0 1 4.07 5.22a1.1 1.1 0 0 1 .25-.82 1 1 0 0 1 .75-.34h3a1 1 0 0 1 1 .79q.06.41.15.81a11 11 0 0 0 .46 1.55l-1.4.65a1 1 0 0 0-.49 1.33 14.5 14.5 0 0 0 7 7 1 1 0 0 0 .76 0 1 1 0 0 0 .57-.52l.62-1.4a14 14 0 0 0 1.58.46q.4.09.81.15a1 1 0 0 1 .79 1Z" />
                </svg>
              </Link>
              <Link href={h.ctaSecondary.href} className={s.btnSecondary}>
                <span>{h.ctaSecondary.label}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* DETAIL TEXT BLOCK (centered top) */}
        <div className={`${s.textContentDetail} ${inDetail ? s.detailFadeIn : s.detailFadeOut}`}>
          <p className={s.detailTitle}>{activePillar.title}</p>
          <p className={s.detailDesc}>{activePillar.desc}</p>
          <div className={s.buttonGroupDetail}>
            <Link href={h.detailCtaPrimary.href} className={s.btnPrimary}>
              <span>{h.detailCtaPrimary.label}</span>
              <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M19.44 13c-.22 0-.45-.07-.67-.12a9.4 9.4 0 0 1-1.31-.39 2 2 0 0 0-2.48 1l-.22.45a12.2 12.2 0 0 1-2.66-2 12.2 12.2 0 0 1-2-2.66l.42-.28a2 2 0 0 0 1-2.48 10 10 0 0 1-.39-1.31c-.05-.22-.09-.45-.12-.68a3 3 0 0 0-3-2.49h-3a3 3 0 0 0-3 3.41 19 19 0 0 0 16.52 16.46h.38a3 3 0 0 0 2-.76 3 3 0 0 0 1-2.25v-3a3 3 0 0 0-2.47-2.9m.5 6a1 1 0 0 1-.34.75 1.05 1.05 0 0 1-.82.25A17 17 0 0 1 4.07 5.22a1.1 1.1 0 0 1 .25-.82 1 1 0 0 1 .75-.34h3a1 1 0 0 1 1 .79q.06.41.15.81a11 11 0 0 0 .46 1.55l-1.4.65a1 1 0 0 0-.49 1.33 14.5 14.5 0 0 0 7 7 1 1 0 0 0 .76 0 1 1 0 0 0 .57-.52l.62-1.4a14 14 0 0 0 1.58.46q.4.09.81.15a1 1 0 0 1 .79 1Z" />
              </svg>
            </Link>
            <Link href={activePillar.href || h.detailCtaSecondary.href} className={s.btnSecondary}>
              <span>{h.detailCtaSecondary.label}</span>
            </Link>
          </div>
        </div>

        {/* PILLARS */}
        <div className={`${s.elementsContainer} ${inDetail ? s.elementsContainerDetail : ""}`}>
          {pillars.map((p, i) => {
            const posClass = inDetail ? detailPosClass(i) : DEFAULT_POS_CLASSES[i];
            const isActive = displayedActive === i;
            return (
              <div
                key={p.key}
                className={`${s.elementItem} ${posClass} ${isActive ? s.activePillar : ""}`}
              >
                {/* Floating chip label */}
                <div className={s.elementButtonWrapper}>
                  <button className={s.elementButton} onClick={() => open(i)} type="button">
                    {p.label}
                  </button>
                </div>
                {/* Cube top + cyan glow */}
                <div className={s.platformWrapper}>
                  <div className={s.platformShadow} />
                  <Image
                    src={PLATFORM_IMG}
                    alt={`${p.title} — SoftBuild`}
                    title={`${p.title} — SoftBuild`}
                    width={1024}
                    height={1024}
                    className={s.platformImage}
                    unoptimized
                    loading={i < 3 ? "eager" : "lazy"}
                    fetchPriority={i < 3 ? "high" : "auto"}
                  />
                </div>
                {/* Pillar column (with gradient mask) */}
                <div className={s.pillarWrapper}>
                  <Image
                    src={PILLAR_IMG}
                    alt={`${p.title} — SoftBuild`}
                    title={`${p.title} — SoftBuild`}
                    width={115}
                    height={330}
                    className={s.pillarImage}
                    unoptimized
                    loading={i < 3 ? "eager" : "lazy"}
                    fetchPriority={i < 3 ? "high" : "auto"}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className={s.navButtonsContainer}>
          <button type="button" className={s.navBtn} onClick={showPrevious}>
            <ChevronLeft aria-hidden />
            <span>{h.prevLabel}</span>
          </button>
          <button type="button" className={s.navBtn} onClick={showNext}>
            <span>{h.nextLabel}</span>
            <ChevronRight aria-hidden />
          </button>
        </div>

        {/* Quay về (visible only in detail, desktop only) */}
        <div className={`${s.backBtnContainer} ${inDetail ? s.backBtnVisible : ""}`}>
          <button type="button" className={s.navBtn} onClick={close}>
            <ChevronLeft />
            <span>{h.backLabel}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
