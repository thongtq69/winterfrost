"use client";

import { useState } from "react";
import { Check, Mail, Phone, Send } from "lucide-react";
import { submitContactForm } from "@/lib/integrations/contact-form";
import s from "./page.module.css";
import { useAutoText } from "@/i18n/auto-text-client";

const LOGO = "/images/brand/softbuild/softbuild-wordmark.png";

export default function ContactPage() {
  const tr = useAutoText();
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setResult(null);
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    const response = await submitContactForm({
      ...values,
      name: `${values.firstName ?? ""} ${values.lastName ?? ""}`.trim(),
    });
    setResult(response);
    setSubmitting(false);
    if (response.success) event.currentTarget.reset();
  }

  return (
    <main className={s.contactSection}>
      <section className={s.container}>
        <div className={s.pageGrid}>
          <div className={s.infoCol}>
            <div className={s.badge}><span />{tr("Liên hệ ngay")}</div>
            <h1>{tr("Khởi tạo dự án công nghệ của doanh nghiệp")}</h1>
            <p className={s.description}>{tr("Chúng tôi tin rằng những bước tiến lớn luôn bắt đầu từ một cuộc trò chuyện. Dù bạn đang tìm kiếm sự tư vấn chiến lược công nghệ, giải pháp phần mềm tùy chỉnh, hay một đối tác đồng hành dài hạn, chúng tôi luôn sẵn sàng hỗ trợ bạn mở rộng quy mô.")}</p>
            <ul className={s.bulletList}>
              <li><Check />{tr("Chuyên cung cấp các giải pháp phần mềm được thiết kế riêng theo đặc thù doanh nghiệp.")}</li>
              <li><Check />{tr("Tiếp cận đội ngũ chuyên gia và kỹ sư CNTT giàu kinh nghiệm.")}</li>
              <li><Check />{tr("Khảo sát, đánh giá tính khả thi của dự án hoàn toàn miễn phí.")}</li>
              <li><Check />{tr("Mô hình hợp tác linh hoạt, giúp doanh nghiệp kiểm soát và tối ưu chi phí hiệu quả.")}</li>
            </ul>
            <div className={s.divider} />
            <div className={s.contactDetails}>
              <a href="mailto:contact@softbuild.vn"><Mail />contact@softbuild.vn</a>
              <a href="tel:+84971450454"><Phone />097 145 04 54</a>
            </div>
          </div>

          <div className={s.formCol}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} alt="SoftBuild" />
            <h2>{tr("Hãy chia sẻ ý tưởng của bạn")}</h2>
            <form onSubmit={onSubmit}>
              <div className={s.formRow}>
                <Field name="firstName" label={tr("Họ")} placeholder={tr("Họ")} required />
                <Field name="lastName" label={tr("Tên")} placeholder={tr("Tên")} required />
              </div>
              <div className={s.formRow}>
                <Field name="email" label="Email" placeholder={tr("Địa chỉ email")} type="email" required />
                <Field name="phone" label={tr("Số điện thoại")} placeholder="097 145 04 54" type="tel" required />
              </div>
              <div className={s.fieldGroup}>
                <label htmlFor="message">{tr("Lời nhắn cho chúng tôi")}</label>
                <textarea id="message" name="message" required />
              </div>
              <button className={s.submitBtn} type="submit" disabled={submitting}>
                <Send />{submitting ? tr("Đang gửi…") : tr("Nhận tư vấn miễn phí ngay")}
              </button>
              <input className={s.honeypot} name="website" aria-hidden="true" tabIndex={-1} readOnly />
              {result && <p className={result.success ? s.success : s.error}>{tr(result.message)}</p>}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({ name, label, placeholder, type = "text", required }: { name: string; label: string; placeholder: string; type?: string; required?: boolean }) {
  return (
    <div className={s.fieldGroup}>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} placeholder={placeholder} required={required} />
    </div>
  );
}
