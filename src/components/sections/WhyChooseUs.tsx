import { CTAButton } from "@/components/primitives/CTAButton";
import { SparkleIcon } from "@/components/primitives/SparkleIcon";
import { useLocalizedHome } from "@/i18n/content";
import s from "./WhyChooseUs.module.css";

export function WhyChooseUs() {
  const home = useLocalizedHome();
  const w = home.whyChooseUs;
  const left = w.leftCard;
  const c1 = w.cardItem1;
  const c2 = w.cardItem2;
  const c3 = w.cardItem3;
  const c5 = w.cardItem5;
  const c4 = w.cardItem4;

  return (
    <section className={s.section} data-visual-id="home-why-choose-us">
      <div className={s.container}>
        <div className={s.header}>
          <div className={s.eyebrow}>
            <div className={s.eyebrowIcon} role="img" aria-label="Star Icon">
              <svg overflow="visible" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinejoin="round" d="m1 32 25 6 6 25 6-25 25-6-25-6-6-25-6 25z" />
              </svg>
            </div>
            <p className={s.eyebrowText}>{w.label}</p>
          </div>
          <div className={s.headingText}>
            <h2 className={s.heading}>
              <span className={s.headingNormal}>{w.headline[0]}</span>{" "}
              <span className={s.headingHighlight}>{w.headline[1]}</span>{" "}
              <span className={s.headingNormal}>{w.headline[2]}</span>
            </h2>
          </div>
        </div>

        <div className={s.bento}>
          {/* Left blue card */}
          <div className={s.itemRight} data-visual-id="why-strategy-card">
            <div className={s.blurTop} aria-hidden />
            <div className={s.blurBottom} aria-hidden />
            <div className={s.chainVisual} aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={left.image} alt="" />
            </div>
            <div className={s.rightContent}>
              <div>
                <h3 className={`${s.rightTitle} ${s.cardTitle}`}>{left.title}</h3>
                <ul className={s.featureList}>
                  <li className={s.listItem}>
                    <span className={s.dotIcon} aria-hidden />
                    <p>{left.intro}</p>
                  </li>
                  {left.features.map((f) => (
                    <li key={f} className={s.listItem}>
                      <span className={s.label}>
                        <span aria-hidden className={s.labelIcon}>
                          <SparkleIcon size={18} />
                        </span>
                        <p className={s.labelText}>{f}</p>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <CTAButton
                  href={left.ctaHref}
                  target="_blank"
                  variant="light"
                  visualId="why-primary-cta"
                >
                  {left.ctaLabel}
                </CTAButton>
              </div>
            </div>
            <div className={s.copyright}>
              <p>Copyright © 2026 SoftBuild</p>
            </div>
          </div>

          {/* Right area */}
          <div className={s.contentLeft}>
            <div className={s.bentoListOne}>
              {/* cardItem1 — Tối ưu chi phí */}
              <div className={s.cardItem1}>
                <div className={s.vectorBackground} aria-hidden>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c1.bgImage} alt="" />
                </div>
                <div className={s.contentWrapper}>
                  <div className={s.textContent}>
                    <h3 className={s.cardTitle}>{c1.title}</h3>
                    <p className={s.cardDesc}>{c1.desc}</p>
                  </div>
                  <div className={s.innerBlueCard}>
                    <div className={s.chipIconWrap}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c1.chipImage} alt="Chip" />
                    </div>
                    <div className={s.cardBottom}>
                      <span className={s.innerChip}>
                        <span aria-hidden className={s.innerChipIcon}>
                          <SparkleIcon size={14} />
                        </span>
                        {c1.innerCardLabel}
                      </span>
                    </div>
                    <div className={s.lightningBolt} aria-hidden>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c1.lightningImage} alt="" />
                    </div>
                  </div>
                </div>
              </div>

              {/* cardItem2 — 250+ Đối tác */}
              <div className={s.cardItem2} data-visual-id="why-partner-orbit-card">
                <div className={s.cardTwoContent}>
                  <div className={s.cardTwoLeft}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c2.starIcon} alt="" className={s.starIcon} />
                    <p className={s.c2Title}>{c2.title}</p>
                  </div>
                  <div className={s.ratingScore}>
                    <span className={s.scoreNumber}>{c2.score}</span>
                    <span className={s.scoreTotal}>{c2.scoreTotal}</span>
                  </div>
                </div>
                <div className={s.decorationWrap}>
                  <div className={s.circlesContainer}>
                    {[304, 231, 158, 85].map((d) => (
                      <div
                        key={d}
                        className={s.circleLine}
                        style={{ width: `${d}px`, height: `${d}px` }}
                      />
                    ))}
                  </div>
                  <div className={s.avatarList}>
                    {c2.avatars.slice(0, 8).map((src, i) => (
                      <div
                        key={`${src}-${i}`}
                        className={s.avatarItem}
                        style={{ ["--start-angle" as string]: `${45 * i}deg` }}
                      >
                        <div className={s.imgCounterSpin}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={src} alt={`Người dùng ${i}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={s.brandLogoCenter} aria-hidden>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c2.centerLogo} alt="SoftBuild" />
                  </div>
                </div>
              </div>
            </div>

            <div className={s.bentoListTwo}>
              {/* cardItem3 — Công nghệ tiên tiến */}
              <div className={s.cardItem3}>
                <div className={s.textContent}>
                  <h3 className={s.cardTitle}>{c3.title}</h3>
                  <p className={s.cardDesc}>{c3.desc}</p>
                </div>
                <div className={s.iconGrid}>
                  {c3.icons.map((ic) => (
                    <div
                      key={ic.alt}
                      className={`${s.iconWrap} ${ic.dark ? s.dark : ""}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={ic.src} alt={ic.alt} />
                    </div>
                  ))}
                </div>
              </div>

              {/* cardItem5 — 24/7 Hỗ trợ khách hàng */}
              <div className={s.cardItem5}>
                <div className={s.cardContent}>
                  <div className={s.textContent}>
                    <h3 className={s.titleLarge}>{c5.title}</h3>
                    <p className={s.cardDesc}>{c5.desc}</p>
                  </div>
                  <div className={s.messageList}>
                    <div className={s.messageWrap}>
                      <div className={s.avatarUser}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={c5.userAvatar} alt="" />
                      </div>
                      <div className={s.bubbleUser}>
                        <p>{c5.userMessage}</p>
                      </div>
                    </div>
                    <div className={`${s.messageWrap} ${s.reverse}`}>
                      <div className={s.bubbleSystem}>
                        <p>{c5.systemMessage}</p>
                      </div>
                      <div className={s.iconSystemWrap}>
                        <div className={s.iconSystem}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={c5.systemLogo} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={s.handVector} aria-hidden>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c5.decoration} alt="" />
                </div>
              </div>

              {/* cardItem4 — Vận hành ổn định + Tương lai */}
              <div className={s.cardItem4}>
                <div className={s.overlay} aria-hidden />
                <div className={`${s.cardImageContent} ${s.textContent}`}>
                  <p className={s.card4Title}>{c4.title}</p>
                  <p className={s.scriptFont}>{c4.scriptText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
