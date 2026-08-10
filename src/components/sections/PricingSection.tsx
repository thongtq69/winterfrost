"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { ArrowRight, Copy, Send, Star } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { useAutoText, useLocalizedValue } from "@/i18n/auto-text-client";
import s from "./PricingSection.module.css";

const PHONE_PHOTO = "/images/people/founder/winterfrost/le-khai-minh.webp";

const TESTIMONIALS = [
  {
    name: "Nguyễn Gia Hân",
    role: "Marketing Director, Rovena Travel",
    avatar: "/images/people/doi-tac/nguyen-gia-han.webp",
    quote:
      "Điều ấn tượng nhất ở Winterfrost là khả năng tư vấn. Đội ngũ chuyên gia thấu hiểu hệ thống cốt lõi của chúng tôi rất nhanh, giúp chúng tôi chọn đúng giải pháp công nghệ thay vì lãng phí ngân sách vào những tính năng không cần thiết.",
  },
  {
    name: "Trần Bảo Ngọc",
    role: "Manager",
    avatar: "/images/people/doi-tac/tran-bao-ngoc.webp",
    quote:
      "Đội ngũ Winterfrost làm việc rất chuyên nghiệp và có tư duy nhạy bén. Họ không chỉ thực hiện theo yêu cầu mà còn chủ động tư vấn những phương án thực tế để tối ưu quy trình quản lý cho chúng tôi. Kết quả bàn giao đạt chất lượng rất tốt và đáp ứng đúng mong đợi ban đầu của công ty.",
  },
  {
    name: "Lê Quang Huy",
    role: "CEO",
    avatar: "/images/people/doi-tac/le-quang-huy.webp",
    quote:
      "Tôi đánh giá cao khả năng thấu hiểu bài toán kinh doanh của đội ngũ kỹ thuật tại đây. Quá trình phối hợp triển khai diễn ra suôn sẻ và hệ thống luôn hoạt động ổn định, giúp chúng tôi hoàn toàn yên tâm tập trung vào việc mở rộng thị trường. Đây thực sự là một đối tác công nghệ đáng tin cậy.",
  },
  {
    name: "Phạm Thu Hà",
    role: "Quản lý",
    avatar: "/images/people/doi-tac/pham-thu-ha.webp",
    quote:
      "Sự tận tâm và trình độ chuyên môn của các chuyên gia tại Winterfrost là điều khiến tôi ấn tượng nhất. Mọi vấn đề phát sinh trong quá trình vận hành đều được các bạn xử lý nhanh chóng và triệt để, giúp công việc của chúng tôi không bị gián đoạn. Chúng tôi rất hài lòng với sự đồng hành này.",
  },
  {
    name: "Võ Khánh Linh",
    role: "Marketing Manager",
    avatar: "/images/people/doi-tac/vo-khanh-linh.webp",
    quote:
      "Sau khi hợp tác với nhiều đơn vị, tôi nhận thấy Winterfrost có quy trình làm việc rất minh bạch và rõ ràng. Họ cung cấp những nền tảng công nghệ vững chắc và luôn sẵn sàng hỗ trợ đội ngũ của tôi làm quen với hệ thống một cách hiệu quả nhất.",
  },
  {
    name: "Đặng Quốc Bảo",
    role: "Co-founder",
    avatar: "/images/people/doi-tac/dang-quoc-bao.webp",
    quote:
      "Lựa chọn Winterfrost làm đối tác công nghệ dài hạn là một quyết định đúng đắn của doanh nghiệp chúng tôi. Đội ngũ của họ luôn thể hiện trách nhiệm cao từ khâu lên ý tưởng đến khi vận hành thực tế. Sự chuyên nghiệp và uy tín của họ đã giúp chúng tôi giải quyết được nhiều khó khăn trong quản trị.",
  },
];

const BENEFITS = [
  "Tối ưu trải nghiệm đa thiết bị",
  "Tối ưu tiến độ, ra mắt thần tốc",
  "Sẵn sàng vận hành & sinh lời ngay",
  "An tâm tuyệt đối về bảo mật",
  "Bao trọn gói phát hành ứng dụng",
  "Đồng hành & hỗ trợ kỹ thuật tận tâm",
];

const EMAIL = "info@winterfrost.tech";

export function PricingSection() {
  const tr = useAutoText();
  const benefits = useLocalizedValue(BENEFITS);
  const testimonials = useLocalizedValue(TESTIMONIALS);
  const [tier, setTier] = useState<0 | 1>(0);
  const [activeTesti, setActiveTesti] = useState(0);
  const cur = testimonials[activeTesti];

  const handleCopy = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard?.writeText(EMAIL).catch(() => {});
    }
  };

  return (
    <section className={s.section}>
      <div className={s.container}>
        <Reveal as="header" direction="up" className={s.header}>
          <span className={s.label}>{tr("Gói dịch vụ nổi bật")}</span>
          <h2 className={s.title}>
            {tr("Chi phí")} <span className={s.scriptAccent}>{tr("minh bạch,")}</span>
            <br />
            {tr("hiệu quả rõ ràng")}
          </h2>
        </Reveal>

        <div className={s.cards}>
          <Reveal direction="left" className={s.priceCard}>
            <div className={s.leftTopContent}>
              <div className={s.priceHeader}>
                <div>
                  <h3 className={s.packTitle}>{tr("Gói thiết kế App cơ bản")}</h3>
                  <p className={s.packDesc}>
                    {tr("Hoàn hảo cho các doanh nghiệp, startup muốn nhanh chóng thâm nhập thị trường với một ứng dụng ổn định, đầy đủ chức năng cốt lõi và tối ưu hóa chi phí.")}
                  </p>
                </div>
                <div className={s.toggle} role="tablist">
                  <button type="button" className={`${s.toggleBtn} ${tier === 0 ? s.toggleBtnActive : ""}`} onClick={() => setTier(0)}>{tr("Gói cơ bản")}</button>
                  <button type="button" className={`${s.toggleBtn} ${tier === 1 ? s.toggleBtnActive : ""}`} onClick={() => setTier(1)}>{tr("Gói nâng cao")}</button>
                </div>
              </div>
              <hr className={s.divider} />
              <p className={s.benefitsTitle}>{tr("Chi tiết quyền lợi")}</p>
              <ul className={s.benefits}>
                {benefits.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>
            <div className={s.priceFooter}>
              <div className={s.priceVal}>
                <strong>{tier === 0 ? tr("60 - 120 triệu VNĐ") : tr("200 - 400 triệu VNĐ")}</strong>
                <span>{tr("/Dự án")}</span>
              </div>
              <Link href="/lien-he" className={s.contactBtn}>
                {tr("Liên hệ ngay!")}
                <span className={s.contactBtnIcon}>
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </Reveal>

          <Reveal direction="right" className={s.contactCard}>
            <div className={s.rightTopContent}>
              <div className={s.author}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PHONE_PHOTO} alt="Lê Khải Minh - Co-Founder Winterfrost" className={s.authorImg} />
                <div>
                  <p className={s.authorName}>Lê Khải Minh</p>
                  <p className={s.authorRole}>CO-Founder</p>
                </div>
              </div>
              <div className={s.callSection}>
                <h3 className={s.contactHeading}>{tr("Đặt lịch trao đổi dự án")}</h3>
                <p className={s.contactDesc}>{tr("Hãy chia sẻ tầm nhìn của bạn, Winterfrost sẽ giúp bạn thiết kế lộ trình phát triển ứng dụng tối ưu nhất.")}</p>
              </div>
              <Link href="/lien-he" className={s.consultBtn}>{tr("Đặt lịch ngay!")}<span className={s.arrowCircle}><ArrowRight size={14} /></span></Link>
            </div>
            <div className={s.emailBox}>
              <span className={s.iconWrap}>
                <Send size={16} />
              </span>
              <div className={s.emailMeta}>
                <span className={s.emailLabel}>{tr("Email liên hệ")}</span>
                <button type="button" className={s.emailVal} onClick={handleCopy}>
                  {EMAIL}
                  <Copy size={12} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal direction="up" className={s.testimonials}>
          <div>
            <p className={s.testiHead}>{tr("Minh chứng từ đối tác")}</p>
            <div className={s.avatarGrid}>
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setActiveTesti(i)}
                  className={`${s.avatarBtn} ${i === activeTesti ? s.avatarBtnActive : ""}`}
                  aria-label={t.name}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.avatar} alt={t.name} loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          <div className={s.quoteSide}>
            <div className={s.stars} aria-label="5 sao">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>
            <p className={s.quote}>{cur.quote}</p>
            <div className={s.clientInfo}>
              <p className={s.clientName}>{cur.name}</p>
              <p className={s.clientRole}>{cur.role}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
