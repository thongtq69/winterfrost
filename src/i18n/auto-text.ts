export type TextTranslator = (source: string) => string;

const preservedKeys = new Set([
  "author",
  "avatar",
  "avatars",
  "bgImage",
  "categoryBg",
  "categoryColor",
  "ctaHref",
  "date",
  "domain",
  "email",
  "href",
  "hoverImg",
  "icon",
  "iconPath",
  "image",
  "imageAlt",
  "imageColumn",
  "imageMain",
  "key",
  "logo",
  "meshGraphic",
  "name",
  "ogImage",
  "phoneImages",
  "publishedAt",
  "slug",
  "social",
  "src",
  "starIcon",
  "type",
  "url",
  "video",
  "views",
  "year",
]);

export function autoTextKey(source: string) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return `k${(hash >>> 0).toString(36)}`;
}

function shouldPreserve(key: string, value: string) {
  return (
    preservedKeys.has(key) ||
    value === "SoftBuild" ||
    value === "SoftBuild" ||
    /^(?:https?:|tel:|mailto:|#)/.test(value) ||
    /^\/[a-z0-9_?=&%+./#-]*$/i.test(value) ||
    /^(?:rgba?\(|#[\da-f]{3,8}$)/i.test(value) ||
    /^[\d\s+%.,:/-]+$/.test(value)
  );
}

export function localizeValue<T>(
  value: T,
  translate: TextTranslator,
  key = "",
): T {
  if (typeof value === "string") {
    return (shouldPreserve(key, value) ? value : translate(value)) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => localizeValue(item, translate, key)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([childKey, childValue]) => [
        childKey,
        localizeValue(childValue, translate, childKey),
      ]),
    ) as T;
  }

  return value;
}

export function localizeHtmlText(
  html: string,
  translate: TextTranslator,
) {
  let skippedElement = "";
  let insideCode = false;
  return html
    .split(/(<[^>]+>)/g)
    .map((token) => {
      if (!token) return token;
      if (token.startsWith("<")) {
        if (/^<\s*code\b/i.test(token)) insideCode = true;
        if (/^<\s*\/\s*code\b/i.test(token)) insideCode = false;
        const closing = token.match(/^<\s*\/\s*(script|style)\b/i)?.[1];
        const opening = token.match(/^<\s*(script|style)\b/i)?.[1];
        if (closing) skippedElement = "";
        else if (opening && !insideCode && !/\/\s*>$/.test(token)) {
          skippedElement = opening.toLowerCase();
        }
        return token;
      }
      const normalized = token.replace(/\s+/g, " ").trim();
      if (skippedElement || !normalized) return token;
      const leading = /^\s/.test(token) ? " " : "";
      const trailing = /\s$/.test(token) ? " " : "";
      return `${leading}${translate(normalized)}${trailing}`;
    })
    .join("");
}
