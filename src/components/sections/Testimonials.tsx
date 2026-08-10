import { useLocalizedHome } from "@/i18n/content";
import s from "./Testimonials.module.css";

function QuoteIcon() {
  return (
    <svg className={s.quoteIcon} viewBox="0 0 28 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path transform="rotate(180 14 12)" d="M12.1818 24H0V16.6154C0 11.2 1.48485 7.10769 4.45455 4.33846C7.54545 1.44615 11.2727 0 15.6364 0V5.90769C12.3636 5.90769 10 7.07692 8.54545 9.41538C8.18182 10.0308 8 10.8923 8 12H12.1818V24ZM28 24H15.8182V16.6154C15.8182 11.2 17.303 7.10769 20.2727 4.33846C23.3636 1.44615 27.0909 0 31.4545 0V5.90769C28.1818 5.90769 25.8182 7.07692 24.3636 9.41538C24 10.0308 23.8182 10.8923 23.8182 12H28V24Z" />
    </svg>
  );
}

export function Testimonials() {
  const home = useLocalizedHome();
  const t = home.testimonials;

  return (
    <section className={s.section}>
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.header}>
            <div className={s.label}>
              <div className={s.labelIcon} role="img" aria-label="Star Icon">
                <svg overflow="visible" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinejoin="round" d="m1 32 25 6 6 25 6-25 25-6-25-6-6-25-6 25z" />
                </svg>
              </div>
              <p className={s.labelText}>{t.label}</p>
            </div>
            <div className={s.headerTitle}>
              <h2 className={s.heading}>
                <span className={s.headingNormal}>{t.headline[0]}</span>{" "}
                <span className={s.headingHighlight}>{t.headline[1]}</span>
              </h2>
            </div>
          </div>

          <div className={s.grid}>
            {t.items.map((item, index) => (
              <div key={`${item.author}-${index}`} className={s.card}>
                <div className={s.cardTop}>
                  <QuoteIcon />
                  <p className={s.text}>{item.quote}</p>
                </div>
                <div className={s.author}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className={s.avatar} src={item.avatar ?? t.avatar} alt={item.author} title={item.author} />
                  <div className={s.authorInfo}>
                    <p className={s.name}>{item.author}</p>
                    <p className={s.title}>{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
