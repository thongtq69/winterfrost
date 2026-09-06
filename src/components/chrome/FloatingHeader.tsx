"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Search, ChevronRight, X } from "lucide-react";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { useTranslations } from "next-intl";
import { Logo } from "./Logo";
import s from "./FloatingHeader.module.css";

const BANNER_SRC =
  "/images/brand/winterfrost/winterfrost-menu-banner-clean.webp?v=wf-menu-clean-20260727";

const SERVICE_TABS = [
  {
    titleKey: "softwareDevelopment",
    items: [
      { href: "/dich-vu/thiet-ke-app", key: "appDesign" },
      { href: "/dich-vu/phat-trien-ai", key: "aiDevelopment" },
      { href: "/dich-vu/tu-dong-hoa-quy-trinh", key: "automation" },
      { href: "/dich-vu/thiet-ke-website", key: "websiteDesign" },
      { href: "/dich-vu/phat-trien-ung-dung-saas", key: "saasDevelopment" },
      { href: "/dich-vu/phat-trien-phan-mem-doanh-nghiep", key: "enterpriseSoftware" },
      { href: "/dich-vu/phat-trien-phan-mem-mvp", key: "mvpDevelopment" },
      { href: "/dich-vu/van-hanh-va-bao-tri", key: "maintenance" },
      { href: "/dich-vu/dich-vu-it", key: "itServices" },
      { href: "/dich-vu/tu-van-chuyen-doi-so", key: "digitalTransformation" },
    ],
  },
  {
    titleKey: "technologyInfrastructure",
    items: [
      { href: "/dich-vu/phat-trien-devops", key: "devops" },
      { href: "/dich-vu/phat-trien-iot", key: "iot" },
      { href: "/dich-vu/phat-trien-blockchain", key: "blockchain" },
    ],
  },
];

export function FloatingHeader() {
  const t = useTranslations("Navigation");
  const tHeader = useTranslations("Header");
  const tServices = useTranslations("Services");
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [mobileServices, setMobileServices] = useState(false);
  const mobileSearchRef = useRef<HTMLInputElement>(null);

  const TOP_NAV = [
    { href: "/ve-chung-toi", label: t("about") },
    { href: "/dich-vu", label: t("services") },
    { href: "/case-studies", label: t("case_studies") },
    { href: "/linh-vuc", label: t("industries") },
    { href: "/technologies", label: t("technologies") },
    { href: "/wiki", label: t("wiki") },
    { href: "/tuyen-dung", label: t("careers") },
  ];

  useEffect(() => {
    document.body.style.overflow = search || menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu, search]);

  const close = () => {
    setMenu(false);
    setSearch(false);
    setMobileServices(false);
  };

  const openSearch = () => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      setSearch(false);
      setMenu(true);
      requestAnimationFrame(() => mobileSearchRef.current?.focus());
      return;
    }

    setMenu(false);
    setMobileServices(false);
    setSearch(true);
  };

  const handleMouseLeave = () => {
    if (window.matchMedia("(min-width: 769px)").matches) close();
  };

  return (
    <>
      <header className={s.header} data-visual-id="floating-header">
        <div className={s.navbarContainer}>
          <div
            className={`${s.menuWrapper} ${menu ? s.wrapperOpen : s.wrapperClosed}`}
            onMouseLeave={menu ? handleMouseLeave : undefined}
          >
            <div className={s.topBar}>
              <div className={s.topBarMain}>
                <div className={s.logo}>
                  <Logo />
                </div>

                <div className={s.mobileHeaderLocale}>
                  <LocaleSwitcher variant="mobileHeader" />
                </div>

                {menu && (
                  <nav className={s.tabsInline} aria-label={tHeader("mainNavigation")}>
                    {TOP_NAV.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={s.tabItem}
                        onClick={close}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                )}

                <div className={s.navRight}>
                  <div className={s.localeSlot}>
                    <LocaleSwitcher />
                  </div>
                  <Link href="/lien-he" className={s.ctaButton} onClick={close}>
                    {tHeader("contact")}
                  </Link>
                  <button
                    type="button"
                    aria-label={tHeader("search")}
                    onClick={openSearch}
                    className={s.searchBtn}
                  >
                    <Search size={18} />
                  </button>
                  <button
                    type="button"
                    aria-label={menu ? tHeader("closeMenu") : tHeader("openMenu")}
                    aria-expanded={menu}
                    onClick={() => {
                      setSearch(false);
                      setMenu((v) => !v);
                      if (menu) setMobileServices(false);
                    }}
                    className={s.iconBtn}
                  >
                    <MenuDots open={menu} />
                  </button>
                </div>
              </div>

            </div>

            {menu && (
              <div className={s.dropdownContent}>
                  <div className={s.tabbedGrid}>
                    <div className={s.tabList}>
                      <p className={s.tabListTitle}>{tHeader("servicesMenu")}</p>
                      {SERVICE_TABS.map((g, i) => (
                        <button
                          key={g.titleKey}
                          type="button"
                          onClick={() => setActiveTab(i)}
                          onFocus={() => setActiveTab(i)}
                          onMouseEnter={() => setActiveTab(i)}
                          className={`${s.tabBtn} ${activeTab === i ? s.tabBtnActive : ""}`}
                        >
                          <span className={s.tabBtnLabel}>{tHeader(g.titleKey)}</span>
                          <ChevronRight className={s.tabBtnArrow} />
                        </button>
                      ))}
                      <div className={s.bannerGradient} aria-hidden>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={BANNER_SRC}
                          alt={tHeader("bannerAlt")}
                          title={tHeader("bannerAlt")}
                          className={s.bannerImage}
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className={s.tabPanel}>
                      <div className={s.servicesGrid}>
                        {SERVICE_TABS[activeTab].items.map((it) => (
                          <Link
                            key={it.href}
                            href={it.href}
                            className={s.rollingLink}
                            onClick={close}
                          >
                            <div className={s.serviceItem}>
                              <span className={s.bulletIcon} aria-hidden>
                                <svg width="16.5" height="16.5" viewBox="0 0 16.5 16.5" fill="none">
                                  <line x1="0" y1="8.25" x2="16.5" y2="8.25" stroke="#2b5cb5" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                              </span>
                              <div className={s.serviceContent}>
                                <div className={s.rollInner}>
                                  <span className={s.front}>{tServices(`${it.key}.title`)}</span>
                                  <span className={s.back}>{tServices(`${it.key}.title`)}</span>
                                </div>
                                <p className={s.serviceDesc}>{tServices(`${it.key}.description`)}</p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
            )}
          </div>
        </div>
      </header>

      {menu && (
        <>
          <button
            type="button"
            className={s.desktopMenuBackdrop}
            onClick={close}
            aria-label={tHeader("closeMenu")}
          />
          <div className={s.mobileMenuLayer}>
            <button
              type="button"
              className={s.mobileBackdrop}
              onClick={close}
              aria-label={tHeader("closeMenu")}
            />
            <aside
              className={s.mobileDrawer}
              role="dialog"
              aria-modal="true"
              aria-label={tHeader("mainNavigation")}
            >
              <div className={s.mobileDrawerHeader}>
                <div className={s.mobileDrawerLogo} onClick={close}>
                  <Logo />
                </div>
                <button
                  type="button"
                  className={s.mobileCloseBtn}
                  onClick={close}
                  aria-label={tHeader("closeMenu")}
                >
                  <X size={20} />
                </button>
              </div>

              <div className={s.mobileDrawerBody}>
                <label className={s.mobileSearchWrapper}>
                  <Search size={17} aria-hidden />
                  <input
                    ref={mobileSearchRef}
                    type="search"
                    placeholder={tHeader("searchPlaceholder")}
                  />
                </label>

                <nav className={s.mobileNav} aria-label={tHeader("mainNavigation")}>
                  <Link href="/" className={s.mobileNavItem} onClick={close}>{t("home")}</Link>
                  <Link href="/ve-chung-toi" className={s.mobileNavItem} onClick={close}>{t("about")}</Link>
                  <div className={s.mobileServiceRow}>
                    <Link href="/dich-vu" className={s.mobileNavItem} onClick={close}>{t("services")}</Link>
                    <button
                      type="button"
                      aria-label={tHeader("toggleServices")}
                      aria-expanded={mobileServices}
                      onClick={() => setMobileServices((value) => !value)}
                    >
                      <ChevronRight className={mobileServices ? s.mobileChevronOpen : ""} />
                    </button>
                  </div>
                  <div
                    className={`${s.mobileServicesPanel} ${mobileServices ? s.mobileServicesOpen : ""}`}
                    aria-hidden={!mobileServices}
                  >
                    <div className={s.mobileServiceTabs}>
                      {SERVICE_TABS.map((group, index) => (
                        <button
                          key={group.titleKey}
                          type="button"
                          className={activeTab === index ? s.mobileServiceTabActive : ""}
                          onClick={() => setActiveTab(index)}
                        >
                          {tHeader(group.titleKey)}
                        </button>
                      ))}
                    </div>
                    <div className={s.mobileServiceLinks}>
                      {SERVICE_TABS[activeTab].items.map((item) => (
                        <Link key={item.href} href={item.href} onClick={close}>
                          {tServices(`${item.key}.title`)}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <Link href="/case-studies" className={s.mobileNavItem} onClick={close}>{t("case_studies")}</Link>
                  <Link href="/linh-vuc" className={s.mobileNavItem} onClick={close}>{t("industries")}</Link>
                  <Link href="/technologies" className={s.mobileNavItem} onClick={close}>{t("technologies")}</Link>
                  <Link href="/wiki" className={s.mobileNavItem} onClick={close}>{t("wiki")}</Link>
                  <Link href="/tuyen-dung" className={s.mobileNavItem} onClick={close}>{t("careers")}</Link>
                </nav>
              </div>

              <div className={s.mobileDrawerFooter}>
                <Link href="/lien-he#contact-form" className={s.mobileContact} onClick={close}>
                  {tHeader("contact")}
                </Link>
              </div>
            </aside>
          </div>
        </>
      )}

      {search && (
        <>
          <div className={s.searchBackdrop} onClick={() => setSearch(false)} />
          <div className={s.desktopSearchWrapper}>
            <div className={s.desktopSearchTopRow}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2b5cb5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                autoFocus
                placeholder={tHeader("searchPlaceholder")}
                className={s.desktopSearchInput}
              />
              <button onClick={() => setSearch(false)} className={s.searchCloseBtn} aria-label={tHeader("closeSearch")}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a2e6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="12" cy="12" r="10" fill="#1a2e6e" fillOpacity="0.1" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function MenuDots({ open }: { open: boolean }) {
  return (
    <span className={`${s.menuDots} ${open ? s.menuDotsOpen : ""}`} aria-hidden>
      {Array.from({ length: 9 }, (_, index) => (
        <span key={index} className={s.menuDot} />
      ))}
    </span>
  );
}
