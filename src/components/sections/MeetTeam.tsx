import { useTranslations } from "next-intl";
import s from "./MeetTeam.module.css";

type TeamQuoteKey =
  | "experience"
  | "secureOwnership"
  | "locations"
  | "process"
  | "technology";

type TeamCard =
  | { type: "photo"; src: string; alt: string }
  | { type: "quote"; textKey: TeamQuoteKey };

const TOP_ROW: TeamCard[] = [
  { type: "photo", src: "/images/people/doi-ngu/nguyen-hoang-nam.webp", alt: "Nguyen - SoftBuild" },
  { type: "photo", src: "/images/people/doi-ngu/tran-ngoc-anh.webp", alt: "Ngoc Anh - SoftBuild" },
  { type: "photo", src: "/images/people/doi-ngu/le-minh-long.webp", alt: "Long - SoftBuild" },
  { type: "quote", textKey: "experience" },
  { type: "photo", src: "/images/people/doi-ngu/pham-quoc-huy.webp", alt: "Huy - SoftBuild" },
  { type: "quote", textKey: "secureOwnership" },
  { type: "photo", src: "/images/people/doi-ngu/vo-hoang-an.webp", alt: "Hoang Nguyen - SoftBuild" },
  { type: "quote", textKey: "locations" },
  { type: "photo", src: "/images/people/doi-ngu/dang-gia-duy.webp", alt: "Duy - SoftBuild" },
  { type: "photo", src: "/images/people/doi-ngu/bui-hai-dang.webp", alt: "Dung - SoftBuild" },
  { type: "photo", src: "/images/people/doi-ngu/nguyen-minh-tai.webp", alt: "Tai - SoftBuild" },
  { type: "photo", src: "/images/people/doi-ngu/tran-duc-hoang.webp", alt: "Hoang - SoftBuild" },
  { type: "photo", src: "/images/people/doi-ngu/le-thu-hang.webp", alt: "Hang - SoftBuild" },
  { type: "photo", src: "/images/people/doi-ngu/pham-khanh-yen.webp", alt: "Yen - SoftBuild" },
  { type: "photo", src: "/images/people/doi-ngu/vo-anh-vu.webp", alt: "Vu Anh - SoftBuild" },
  { type: "photo", src: "/images/people/doi-ngu/dang-hung-cuong.webp", alt: "Hung - SoftBuild" },
  { type: "photo", src: "/images/people/doi-ngu/nguyen-minh-thuc.webp", alt: "Thức - SoftBuild" },
  { type: "photo", src: "/images/people/doi-ngu/tran-gia-tin.webp", alt: "Tín - SoftBuild" },
];

const BOTTOM_ROW: TeamCard[] = [
  { type: "photo", src: "/images/people/doi-ngu/le-thanh-thu.webp", alt: "Thư - SoftBuild" },
  { type: "photo", src: "/images/people/doi-ngu/pham-anh-tuan.webp", alt: "Tuấn - SoftBuild" },
  { type: "photo", src: "/images/people/doi-ngu/vo-minh-tri.webp", alt: "Tri - SoftBuild VietNam" },
  { type: "photo", src: "/images/people/doi-ngu/nguyen-chi-nhan.webp", alt: "Chan - SoftBuild" },
  { type: "photo", src: "/images/people/doi-ngu/tran-tien-phat.webp", alt: "Tien - SoftBuild" },
  { type: "photo", src: "/images/people/doi-ngu/le-thu-thao.webp", alt: "Thao - SoftBuild" },
  { type: "photo", src: "/images/people/doi-ngu/pham-duc-thang.webp", alt: "Thang - SoftBuild" },
  { type: "quote", textKey: "process" },
  { type: "photo", src: "/images/people/doi-ngu/vo-tan-huy.webp", alt: "Tan Huy - SoftBuild" },
  { type: "quote", textKey: "technology" },
  { type: "photo", src: "/images/people/doi-ngu/dang-minh-sang.webp", alt: "Sang - SoftBuild" },
  { type: "photo", src: "/images/people/doi-ngu/nguyen-hong-nhung.webp", alt: "Nhung - SoftBuild" },
  { type: "photo", src: "/images/people/doi-ngu/tran-gia-bao.webp", alt: "Bao - SoftBuild" },
  { type: "photo", src: "/images/people/doi-ngu/le-khai-khang.webp", alt: "Khang - Graphic Design" },
  { type: "photo", src: "/images/people/doi-ngu/pham-thanh-phuc.webp", alt: "Tien Phat - Developer" },
  { type: "photo", src: "/images/people/doi-ngu/vo-thanh-mai.webp", alt: "Thanh Phuc - Developer" },
  { type: "photo", src: "/images/people/doi-ngu/nguyen-duc-thanh.webp", alt: "Thanh Mai - Tester" },
  { type: "photo", src: "/images/people/doi-ngu/tran-quynh-anh.webp", alt: "Thanh Graphic Design" },
];

function Ticker({
  cards,
  translate,
}: {
  cards: TeamCard[];
  translate: (key: TeamQuoteKey) => string;
}) {
  const repeated = Array.from({ length: 4 }, () => cards).flat();

  return (
    <div className={s.tickerWrapper}>
      <ul className={s.tickerTrack}>
        {repeated.map((card, index) => (
          <li
            key={`${card.type}-${index}`}
            className={card.type === "photo" ? s.cardPhoto : s.cardQuote}
            aria-hidden={index >= cards.length}
          >
            {card.type === "photo" ? (
              <>
                {/* The reference serves the staff portraits as direct image URLs. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${card.src}?v=wf-team-31-20260727`}
                  alt={card.alt}
                  title={card.alt}
                  loading="lazy"
                  decoding="async"
                />
              </>
            ) : (
              <p className={s.cardQuoteText}>{translate(card.textKey)}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MeetTeam() {
  const t = useTranslations("Team");

  return (
    <section className={s.meetSection}>
      <div className={s.insideContainer}>
        <div className={s.header}>
          <div className={s.label}>
            <div className={s.iconWrapper} role="img" aria-label="Star Icon">
              <svg overflow="visible" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinejoin="round" d="m1 32 25 6 6 25 6-25 25-6-25-6-6-25-6 25z" />
              </svg>
            </div>
            <h2 className={s.labelText}>{t("label")}</h2>
          </div>
          <div className={s.heading}>
            <p className={s.headingText}>
              <span className={s.normalText}>{t("headingPre")}</span>{" "}
              <span className={s.highlightText}>{t("headingHighlight")}</span>{" "}
              <span className={s.normalText}>{t("headingPost")}</span>
            </p>
          </div>
        </div>

        <div className={s.tickerArea}>
          <Ticker cards={TOP_ROW} translate={t} />
          <Ticker cards={BOTTOM_ROW} translate={t} />
        </div>
      </div>
    </section>
  );
}
