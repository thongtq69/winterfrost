import { CTAButton } from "@/components/primitives/CTAButton";
import { useLocalizedHome } from "@/i18n/content";
import s from "./CompanyOverview.module.css";

export function CompanyOverview() {
  const home = useLocalizedHome();
  const c = home.companyOverview;

  return (
    <section className={s.section}>
      <div className={s.container}>
        <div className={s.header}>
          <div className={s.preTitleWrap}>
            <div className={s.label}>
              <div className={s.labelIcon} role="img" aria-label="Star Icon">
                <svg overflow="visible" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinejoin="round" d="m1 32 25 6 6 25 6-25 25-6-25-6-6-25-6 25z" />
                </svg>
              </div>
              <p className={s.labelText}>{c.label}</p>
            </div>
          </div>
          <div className={s.titleWrap}>
            <h2 className={s.titleHeading}>
              <span className={s.normalText}>{c.headline[0]}</span>{" "}
              <span className={s.highlightText}>{c.headline[1]}</span>{" "}
              <span className={s.normalText}>{c.headline[2]}</span>
            </h2>
          </div>
        </div>

        <div className={s.contentWrap}>
          <div className={s.reviewWrap}>
            {/* The reference uses the original asset URL, without an image proxy. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={s.reviewBgImg}
              src={c.founder.image}
              alt="Background Review"
              title="Background Review"
            />
            <div className={s.reviewOverlay} />
            <div className={s.reviewContent}>
              <p className={s.reviewText}>{c.founder.quote}</p>
              <div className={s.clientInfo}>
                <div className={s.clientNameRow}>
                  <p className={s.clientName}>{c.founder.name}</p>
                </div>
                <p className={s.clientRole}>{c.founder.role} </p>
              </div>
            </div>
          </div>

          <div className={s.aboutInfo}>
            <div className={s.aboutColumns}>
              <div className={s.colBlock}>
                <h3 className={s.blockTitle}>{c.vision.title}</h3>
                <p className={s.missionText}>{c.vision.text}</p>
                <div className={s.ctaSpacing}>
                  <CTAButton href={c.vision.ctaHref}>{c.vision.ctaLabel}</CTAButton>
                </div>
              </div>
              <div className={s.colBlock}>
                <h3 className={s.blockTitle}>{c.values.title}</h3>
                <ul className={s.list}>
                  {c.values.items.map((value) => (
                    <li key={value} className={s.listItem}>
                      <span className={s.dot} /> {value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={s.copyright}>
              <p>{c.copyright}</p>
            </div>
          </div>
        </div>

        <div className={s.counterList}>
          {c.stats.map((stat) => {
            const isBlue = Boolean(stat.highlight);
            return (
              <div key={stat.label} className={`${s.counterCard} ${isBlue ? s.blueCard : ""}`}>
                {isBlue && stat.avatars ? (
                  <div className={s.blueTop}>
                    <div className={s.avatarList}>
                      {stat.avatars.map((src, index) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={src} src={src} className={s.avatar} alt={`Khách hàng ${index + 1}`} />
                      ))}
                      {stat.avatarBadgeText && <div className={s.avatarCount}>{stat.avatarBadgeText}</div>}
                    </div>
                    {stat.starsImage && (
                      <div className={s.blueStars}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={stat.starsImage} alt="5 Stars" title="5 Stars" />
                        {stat.starsLabel && <p className={s.bLabel}>{stat.starsLabel}</p>}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className={s.counterLabel}>{stat.label}</p>
                )}

                <div className={s.cbNumberWrap}>
                  <div className={s.cbNumVal}>
                    <span className={`${s.num} ${isBlue ? s.whiteText : ""}`}>{stat.value}</span>
                    <span className={`${s.plus} ${isBlue ? s.whiteText : ""}`}>{stat.suffix ?? "+"}</span>
                  </div>
                  <p className={`${s.cbDesc} ${isBlue ? s.lightText : ""}`}>{stat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
