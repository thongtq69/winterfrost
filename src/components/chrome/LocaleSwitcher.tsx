"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
} from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  isSupportedLocale,
  routing,
  type Locale,
  usePathname,
  useRouter,
} from "@/i18n/routing";
import s from "./LocaleSwitcher.module.css";

const LANGUAGES: Record<
  Locale,
  { code: string; flag: string; name: string }
> = {
  vi: { code: "VI", flag: "🇻🇳", name: "Tiếng Việt" },
  en: { code: "EN", flag: "🇬🇧", name: "English" },
  ja: { code: "JA", flag: "🇯🇵", name: "日本語" },
  zh: { code: "ZH", flag: "🇨🇳", name: "中文" },
  de: { code: "DE", flag: "🇩🇪", name: "Deutsch" },
  ko: { code: "KO", flag: "🇰🇷", name: "한국어" },
  hi: { code: "HI", flag: "🇮🇳", name: "हिन्दी" },
};

type LocaleSwitcherProps = {
  variant?: "compact" | "mobileHeader";
};

export function LocaleSwitcher({
  variant = "compact",
}: LocaleSwitcherProps = {}) {
  const localeValue = useLocale();
  const locale = isSupportedLocale(localeValue)
    ? localeValue
    : routing.defaultLocale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("LanguageSwitcher");
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const currentLanguage = LANGUAGES[locale];

  useEffect(() => {
    if (!isOpen) return;

    const selectedIndex = routing.locales.indexOf(locale);
    const focusFrame = window.requestAnimationFrame(() => {
      optionRefs.current[selectedIndex]?.focus();
    });

    function closeOnOutsidePointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function closeOnEscape(event: globalThis.KeyboardEvent) {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      triggerRef.current?.focus();
    }

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, locale]);

  function changeLocale(nextLocale: Locale) {
    setIsOpen(false);
    triggerRef.current?.focus();
    if (nextLocale === locale) return;

    startTransition(() => {
      const suffix =
        typeof window === "undefined"
          ? ""
          : `${window.location.search}${window.location.hash}`;
      router.replace(`${pathname}${suffix}`, { locale: nextLocale });
    });
  }

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    setIsOpen(true);
  }

  function onMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const currentIndex = optionRefs.current.findIndex(
      (option) => option === document.activeElement,
    );
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;
    if (event.key === "ArrowDown") nextIndex = currentIndex + 1;
    else if (event.key === "ArrowUp") nextIndex = currentIndex - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = routing.locales.length - 1;
    else return;

    event.preventDefault();
    const normalizedIndex =
      (nextIndex + routing.locales.length) % routing.locales.length;
    optionRefs.current[normalizedIndex]?.focus();
  }

  return (
    <div
      ref={rootRef}
      className={`${s.switcher} ${variant === "mobileHeader" ? s.mobileHeaderSwitcher : ""} ${isPending ? s.pending : ""}`}
      title={currentLanguage.name}
    >
      <button
        ref={triggerRef}
        type="button"
        className={s.trigger}
        disabled={isPending}
        aria-label={t("label")}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={onTriggerKeyDown}
      >
        <span className={s.flag} aria-hidden>
          {currentLanguage.flag}
        </span>
        <span className={s.localeCode} aria-hidden>
          {currentLanguage.code}
        </span>
        <ChevronDown
          className={`${s.chevron} ${isOpen ? s.chevronOpen : ""}`}
          aria-hidden
        />
      </button>

      {isOpen && (
        <div
          id={menuId}
          className={s.menu}
          role="listbox"
          aria-label={t("label")}
          onKeyDown={onMenuKeyDown}
        >
          {routing.locales.map((supportedLocale, index) => {
            const language = LANGUAGES[supportedLocale];
            const selected = supportedLocale === locale;

            return (
              <button
                key={supportedLocale}
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                type="button"
                role="option"
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                className={`${s.option} ${selected ? s.optionSelected : ""}`}
                onClick={() => changeLocale(supportedLocale)}
              >
                <span className={s.optionFlag} aria-hidden>
                  {language.flag}
                </span>
                <span className={s.optionName}>{language.name}</span>
                <span className={s.optionCode} aria-hidden>
                  {language.code}
                </span>
                <Check
                  className={`${s.check} ${selected ? s.checkVisible : ""}`}
                  aria-hidden
                />
              </button>
            );
          })}
        </div>
      )}

      <span className={s.visuallyHidden} aria-live="polite">
        {isPending ? t("changing") : ""}
      </span>
    </div>
  );
}
