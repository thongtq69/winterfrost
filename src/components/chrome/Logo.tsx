import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";

const SRC = "/images/brand/winterfrost/winterfrost-wordmark.png";

export function Logo({ width = 146, height = 36, priority = false }: { width?: number; height?: number; priority?: boolean }) {
  const t = useTranslations("Header");

  return (
    <Link href="/" aria-label={t("homeAria")} className="inline-flex items-center">
      <Image src={SRC} alt="Logo Winterfrost" title="Logo Winterfrost" width={width} height={height} priority={priority} />
    </Link>
  );
}
