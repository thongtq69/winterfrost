import { Link } from "@/i18n/routing";
import { ChevronRight, Home } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "./Container";

export function PageHero({
  title,
  description,
  breadcrumbs = [],
}: {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
}) {
  const t = useTranslations("Navigation");

  return (
    <section className="relative isolate overflow-hidden bg-bg-dark pt-[120px] pb-16 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 70% 50%, rgba(0,242,255,0.25) 0%, rgba(5,10,24,0) 50%), radial-gradient(circle at 30% 80%, rgba(22,82,240,0.3) 0%, rgba(5,10,24,0) 50%)",
        }}
      />
      <Container className="relative">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-white/75">
          <Link href="/" className="inline-flex items-center gap-1.5 hover:text-white">
            <Home className="h-3.5 w-3.5" />
            {t("home")}
          </Link>
          {breadcrumbs.map((b, i) => (
            <span key={i} className="inline-flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3 opacity-50" />
              {b.href ? (
                <Link href={b.href} className="hover:text-white">{b.label}</Link>
              ) : (
                <span className="text-white">{b.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium leading-tight tracking-[-0.02em] md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-3xl text-base text-white/80">{description}</p>
        )}
      </Container>
    </section>
  );
}
