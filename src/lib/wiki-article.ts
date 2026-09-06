import { softbuildWiki } from "@/lib/wiki-content";
import type { ContentPage } from "@/lib/site";

export const wikiArticles: ContentPage[] = softbuildWiki;

function stripTags(value: string) {
  return value.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").trim();
}

function extractBalancedDiv(html: string, marker: string) {
  const markerIndex = html.indexOf(marker);
  if (markerIndex < 0) return "";
  const start = html.lastIndexOf("<div", markerIndex);
  const openEnd = html.indexOf(">", markerIndex);
  if (start < 0 || openEnd < 0) return "";

  const tokenPattern = /<\/?div\b[^>]*>/gi;
  tokenPattern.lastIndex = openEnd + 1;
  let depth = 1;
  let token: RegExpExecArray | null;
  while ((token = tokenPattern.exec(html))) {
    if (token[0].startsWith("</")) depth -= 1;
    else depth += 1;
    if (depth === 0) return html.slice(openEnd + 1, token.index);
  }
  return "";
}

export function prepareWikiArticle(item: ContentPage) {
  const extracted = item.contentHtml
    ? extractBalancedDiv(item.contentHtml, 'data-wiki-content="true"')
    : "";
  const fallback = (item.contentText || item.metaDescription || "")
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");
  const source = extracted || item.contentHtml || fallback;
  let sectionIndex = 0;
  const html = source.replace(/<h2([^>]*)>/gi, (_match, attributes: string) => {
    sectionIndex += 1;
    return `<h2${attributes} id="wiki-section-${sectionIndex}">`;
  });
  const headings = Array.from(source.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)).map((match) => stripTags(match[1]));
  return { html, headings };
}
