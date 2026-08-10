"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useLocalizedHome } from "@/i18n/content";
import s from "./PartnersMarquee.module.css";

export function PartnersMarquee({ home: isHome = false }: { home?: boolean } = {}) {
  const m = useLocalizedHome().partnersMarquee;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Duplicate logos so the CSS marquee can loop seamlessly
  const looped = [...m.logos, ...m.logos];
  return (
    <div className={`${s.section} ${isHome ? s.home : ""}`}>
      <div className={s.container}>
        <div className={s.happyClients}>
          <div className={s.avatarStack}>
            {m.avatars.map((src, i) => (
              <div key={src} className={s.avatar}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Ảnh đại diện khách hàng ${i + 1}`} title={`Ảnh đại diện khách hàng ${i + 1}`} />
              </div>
            ))}
          </div>
          <div className={s.ratingText}>
            <div className={s.stars} aria-label="5 sao">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4" fill="currentColor" />
              ))}
            </div>
            <p className={s.ratingLabel}>{m.ratingLabel}</p>
          </div>
        </div>
        <div className={s.trackWrapper}>
          <div className={`${s.track} ${ready ? s.ready : ""}`}>
            {looped.map((logo, i) => (
              <div key={`${logo.src}-${i}`} className={s.logoItem}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo.src} alt={logo.alt} title={logo.alt} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
