import { Link } from "@/i18n/routing";
import { ShieldCheck } from "lucide-react";
import { Heading } from "@/components/primitives/Heading";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { Reveal } from "@/components/primitives/Reveal";
import { useLocalizedHome } from "@/i18n/content";
import s from "./IndustriesGrid.module.css";

export function IndustriesGrid({ home: isHome = false }: { home?: boolean } = {}) {
  const home = useLocalizedHome();
  const i = home.industries;
  // Split items roughly half/half for two rows scrolling opposite directions
  const half = Math.ceil(i.items.length / 2);
  const row1 = i.items.slice(0, half);
  const row2 = i.items.slice(half);

  const renderItem = (it: { title: string; href: string }, key: string) => (
    <Link key={key} href={it.href} className={s.item}>
      <ShieldCheck className={s.icon} />
      <span>{it.title}</span>
    </Link>
  );

  return (
    <section className={`${s.wrapper} ${isHome ? s.home : ""}`}>
      <Reveal direction="up" className={s.headingContainer}>
        <SectionLabel>{i.label}</SectionLabel>
        <Heading as="h2" size="h2-industries" className="text-center">
          {i.headline}
        </Heading>
      </Reveal>
      <div className={s.section}>
        {/* Row 1 — scroll left */}
        <div className={s.rowContainer}>
          <div className={`${s.marqueeRow} ${s.scrollLeft}`}>
            {[...row1, ...row1].map((it, idx) => renderItem(it, `r1-${idx}`))}
          </div>
        </div>
        {/* Row 2 — scroll right */}
        <div className={s.rowContainer}>
          <div className={`${s.marqueeRow} ${s.scrollRight}`}>
            {[...row2, ...row2].map((it, idx) => renderItem(it, `r2-${idx}`))}
          </div>
        </div>
      </div>
    </section>
  );
}
