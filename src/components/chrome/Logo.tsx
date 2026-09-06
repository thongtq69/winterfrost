import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function SoftBuildSymbol({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sbGradient1" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563EB" />
          <stop offset="0.5" stopColor="#06B6D4" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#sbGradient1)" />
      <path
        d="M16 16H32C33.6569 16 35 17.3431 35 19V20C35 21.6569 33.6569 23 32 23H22C20.3431 23 19 24.3431 19 26V27C19 28.6569 20.3431 30 22 30H32"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="32" r="2.5" fill="#38BDF8" />
    </svg>
  );
}

export function Logo({
  width = 160,
  height = 36,
  priority = false,
  showTag = true,
}: {
  width?: number;
  height?: number;
  priority?: boolean;
  showTag?: boolean;
}) {
  const t = useTranslations("Header");

  return (
    <Link
      href="/"
      aria-label={t("homeAria")}
      className="inline-flex items-center gap-2.5 transition-transform hover:opacity-95"
    >
      <SoftBuildSymbol size={32} />
      <span className="flex items-baseline font-bold tracking-tight text-[21px] select-none text-neutral-900 leading-none">
        <span className="font-extrabold text-neutral-950">Soft</span>
        <span className="text-[#2563EB] font-black">Build</span>
        {showTag && (
          <span className="ml-1 text-[11px] font-bold text-[#0284C7] bg-[#E0F2FE] px-1.5 py-0.5 rounded tracking-wide uppercase">
            VN
          </span>
        )}
      </span>
    </Link>
  );
}
