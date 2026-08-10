"use client";

import { useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { autoTextKey, localizeValue } from "./auto-text";

export function useAutoText() {
  const t = useTranslations("AutoText");

  return useCallback(
    (source: string) => {
      const key = autoTextKey(source);
      return t.has(key) ? String(t.raw(key)) : source;
    },
    [t],
  );
}

export function useLocalizedValue<T>(value: T): T {
  const translate = useAutoText();
  return useMemo(
    () => localizeValue(value, translate),
    [translate, value],
  );
}
