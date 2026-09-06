import Image from "next/image";
import type { ContentPage } from "@/lib/site";
import s from "./WikiCover.module.css";

const ACCENTS = [
  "rgba(31, 94, 229, .82)",
  "rgba(68, 123, 233, .82)",
  "rgba(39, 155, 202, .78)",
  "rgba(87, 91, 208, .8)",
  "rgba(26, 59, 145, .84)",
];

function accentFor(slug: string) {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return ACCENTS[hash % ACCENTS.length];
}

export function WikiCover({
  item,
  priority = false,
  sizes,
  showTitle = true,
}: {
  item: ContentPage;
  priority?: boolean;
  sizes: string;
  showTitle?: boolean;
}) {
  return (
    <>
      <Image src={item.image || item.ogImage || ""} alt={item.title} fill priority={priority} sizes={sizes} />
      <span className={s.tint} style={{ "--wiki-accent": accentFor(item.slug) } as React.CSSProperties} />
      <span className={s.brand} aria-label="SoftBuild">
        <Image src="/images/brand/softbuild/softbuild-wordmark.png" alt="SoftBuild" width={132} height={42} />
      </span>
      {showTitle && (
        <span className={s.copy}>
          <span>{item.category || "Công nghệ"}</span>
          <strong>{item.title}</strong>
        </span>
      )}
    </>
  );
}
