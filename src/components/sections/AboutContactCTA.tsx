"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { ArrowRight, Copy } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Reveal } from "@/components/primitives/Reveal";

const PHOTO = "/images/people/van-phong/van-phong-winterfrost.webp";
const EMAIL = "info@winterfrost.tech";

export function AboutContactCTA() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Yêu cầu tư vấn từ ${name || "Khách"}`);
    const body = encodeURIComponent(`Họ tên: ${name}\nEmail: ${email}\n\n${msg}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      style={{
        background:
          "linear-gradient(121deg, rgb(2,27,123) 0%, rgb(22,112,222) 50%, rgb(25,52,147) 100%)",
      }}
    >
      <Container>
        <Reveal direction="up" className="flex flex-col items-center gap-3 md:gap-4">
          <span className="inline-flex items-center gap-2 text-[13px] font-medium text-white/85 md:text-[14px]">
            <span className="text-white">+</span>
            Kết nối với chúng tôi
          </span>
          <h2 className="text-center font-display text-[32px] font-medium leading-tight text-white md:text-5xl lg:text-6xl">
            Khởi Tạo{" "}
            <span className="font-script text-[#9DBEFF]">Dự Án</span>{" "}
            Của Bạn
            <br />
            Ngay Hôm Nay
          </h2>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:mt-14 lg:grid-cols-2">
          {/* Form */}
          <Reveal direction="left" className="rounded-2xl bg-white/95 p-6 shadow-2xl backdrop-blur md:p-8">
            <h3 className="font-display text-2xl font-semibold text-text-navy-deep">Liên hệ hợp tác</h3>
            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="text-sm font-medium text-brand-link">Họ và tên*</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Họ và tên của bạn"
                  className="mt-2 w-full rounded-xl border border-border/60 bg-bg-card px-4 py-3 text-sm outline-none transition focus:border-brand-link focus:bg-white"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-brand-link">Email*</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="mt-2 w-full rounded-xl border border-border/60 bg-bg-card px-4 py-3 text-sm outline-none transition focus:border-brand-link focus:bg-white"
                />
              </label>
              <label className="block">
                <textarea
                  rows={3}
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Mô tả ngắn về yêu cầu của bạn"
                  className="w-full resize-y rounded-xl border border-border/60 bg-bg-card px-4 py-3 text-sm outline-none transition focus:border-brand-link focus:bg-white"
                />
              </label>
              <div className="flex items-center justify-between gap-3 pt-2">
                <div className="text-xs text-text/70">
                  Hoặc gửi mail trực tiếp tới:
                  <br />
                  <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-1 font-display text-base font-semibold text-brand-link">
                    {EMAIL}
                    <Copy className="h-3 w-3" />
                  </a>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(121deg,rgb(2,27,123)_0%,rgb(22,112,222)_29%,rgb(25,52,147)_100%)] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
                >
                  Gửi yêu cầu
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </Reveal>

          {/* Right: bullets + photo + cta */}
          <Reveal direction="right" className="rounded-2xl border border-white/30 bg-white/5 p-6 backdrop-blur md:p-8">
            <ul className="space-y-3 text-base text-white">
              {[
                "Phản hồi nhanh chóng trong 24h.",
                "Làm việc trực tiếp với chuyên gia.",
                "Tư vấn chiến lược rõ ràng.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center text-[#9DBEFF]">
                    ✦
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTO}
              alt="Winterfrost office"
              loading="lazy"
              className="mt-6 block h-[260px] w-full rounded-xl object-cover"
            />
            <Link
              href="/lien-he"
              className="mt-6 inline-flex w-auto items-center gap-3 rounded-full bg-white px-6 py-3 font-display text-sm font-semibold text-brand-link transition hover:bg-white/90"
            >
              Đặt lịch tư vấn
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
