"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { site } from "@/lib/site";
import s from "./Footer.module.css";

const SERVICES_GROUPS = [
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

const COMPANIES = [
  { href: "/", label: "SoftBuild Digital", logo: "/images/brand/winterfrost/winterfrost-wordmark.png" },
  { href: "/", label: "SoftBuild Labs", logo: "/images/brand/winterfrost/winterfrost-wordmark.png" },
  { href: "/", label: "SoftBuild Cloud", logo: "/images/brand/winterfrost/winterfrost-wordmark.png" },
  { href: "/", label: "SoftBuild Media", logo: "/images/brand/winterfrost/winterfrost-wordmark.png" },
];

const SOCIAL_ICON_MAP: Record<string, React.ReactNode> = {
  facebook: (
    <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden>
      <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5 16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256Z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 576 512" fill="currentColor" aria-hidden>
      <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6C15 167 15 256.4 15 256.4s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.1 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zM232.2 337.6V175.2l142.7 81.2-142.7 81.2z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 448 512" fill="currentColor" aria-hidden>
      <path d="M448 209.9c-39.6 0-78.5-13.7-122.8-39.3v178.7A162.6 162.6 0 1 1 185 188.3v89.9a74.6 74.6 0 1 0 52.2 71.2V0h88a121.2 121.2 0 0 0 1.9 22.2A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 448 512" fill="currentColor" aria-hidden>
      <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1A53.8 53.8 0 1 1 53.8 0a53.8 53.8 0 0 1 0 108.1zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3z" />
    </svg>
  ),
};

export function Footer() {
  const t = useTranslations("Navigation");
  const tFooter = useTranslations("Footer");
  const tHeader = useTranslations("Header");
  const tServices = useTranslations("Services");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const pathname = usePathname();

  const MENU_LINKS = [
    { href: "/", label: t("home") },
    { href: "/ve-chung-toi", label: t("about") },
    { href: "/case-studies", label: t("case_studies") },
    { href: "/linh-vuc", label: t("industries") },
    { href: "/wiki", label: t("wiki") },
  ];

  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.inner}>
          <div className={s.topRow}>
            {/* Menu */}
            <div className={s.col}>
              <p className={s.colTitle}>{tFooter("menu")}</p>
              <nav className={s.menuList} aria-label={tFooter("navigationLabel")}>
                {MENU_LINKS.map((m) => (
                  <Link
                    key={m.href}
                    href={m.href}
                    className={`${s.menuLink} ${pathname === m.href ? s.menuLinkActive : ""}`}
                  >
                    {m.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Dịch vụ */}
            <div className={s.col}>
              <p className={s.colTitle}>{tFooter("services")}</p>
              <div className={s.servicesCol}>
                {SERVICES_GROUPS.map((g, i) => {
                  const isOpen = openIdx === i;
                  return (
                    <div key={g.titleKey} className={`${s.accordionSection} ${isOpen ? s.open : ""}`}>
                      <button
                        type="button"
                        onClick={() => setOpenIdx(isOpen ? null : i)}
                        className={s.accordionToggle}
                        aria-expanded={isOpen}
                      >
                        <span className={s.accordionTitle}>{tHeader(g.titleKey)}</span>
                        <ChevronDown className={s.accordionArrow} />
                      </button>
                      <div className={s.accordionBody}>
                        <div className={s.accordionInner}>
                          <div className={s.accordionContent}>
                            {g.items.map((it) => (
                              <Link key={it.href} href={it.href} className={s.accordionLink}>
                                {tServices(`${it.key}.title`)}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Liên hệ */}
            <div className={s.col}>
              <p className={s.colTitle}>{tFooter("contact")}</p>
              <div className={s.infoList}>
                <a href={`tel:+${site.hotlineRaw}`} className={s.infoLink}>
                  {site.hotline}
                </a>
                <a href={`mailto:${site.email}`} className={s.infoLink}>
                  {site.email}
                </a>
              </div>
            </div>

            {/* Văn phòng */}
            <div className={s.col}>
              <p className={s.colTitle}>{tFooter("headOffice")}</p>
              <div className={s.infoList}>
                <address className={s.infoLink}>
                  {tFooter("address")}
                </address>
              </div>
            </div>
          </div>

          <hr className={s.divider} />

          <div className={s.midRow}>
            <div className={s.brandWrapper}>
              <p className={s.brandBig}>SOFTBUILD</p>
            </div>
            <div className={s.socialWrapper}>
              <p className={s.colTitle}>{tFooter("socialMedia")}</p>
              <div className={s.socialRow}>
                {Object.entries(site.social ?? {}).map(([key, url]) => {
                  const icon = SOCIAL_ICON_MAP[key];
                  if (!icon) return null;
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={s.socialIcon}
                      aria-label={key}
                    >
                      {icon}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={s.companiesRow}>
            {COMPANIES.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className={s.companyUnit}
              >
                <span className={s.companyLogo}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.logo} alt={`Logo ${c.label} - Hệ sinh thái công nghệ SoftBuild`} title={c.label} />
                </span>
                <span className={s.companyName}>{c.label}</span>
              </a>
            ))}
          </div>

          <div className={s.bottomRow}>
            <p className={s.copyright}>{site.copyright}</p>
            <div className={s.bottomLinks}>
              <Link className={s.privacyLink} href="/chinh-sach-bao-mat">{tFooter("privacyPolicy")}</Link>
              <span className={s.dot}>•</span>
              <span>{tFooter("designedBy")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
