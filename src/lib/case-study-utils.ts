/**
 * Parse the original WordPress contentHtml that was scraped from production.
 * The original markup mixes:
 *   - the marquee/monitor showcase section
 *   - the article body (h2 + p + ul) inside `content-module__ZwfD0a__wpContent`
 *   - the inline "UI Design" marquee with two animated rows
 *   - related case-studies and footer CTAs
 *
 * We rebuild the page with our own React components, but we still want the
 * authoritative copy + image URLs that live inside contentHtml. These helpers
 * pull just the bits we need.
 */

const IMG_RE = /<img[^>]*\bsrc="([^"]+)"[^>]*>/g;

function uniq(arr: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const v of arr) {
    if (seen.has(v)) continue;
    seen.add(v);
    out.push(v);
  }
  return out;
}

export function extractCenterImages(contentHtml: string | undefined | null, fallback: string[] = []): string[] {
  if (!contentHtml) return fallback;
  const imgs: string[] = [];
  const re = /<img[^>]*class="[^"]*webShowcase-module__[^"]*centerImg[^"]*"[^>]*src="([^"]+)"[^>]*>|<img[^>]*src="([^"]+)"[^>]*class="[^"]*webShowcase-module__[^"]*centerImg[^"]*"[^>]*>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(contentHtml))) {
    const src = m[1] || m[2];
    if (src) imgs.push(src);
  }
  return uniq(imgs).length ? uniq(imgs) : fallback;
}

export function extractMarqueeImages(contentHtml: string | undefined | null, fallback: string[] = []): string[] {
  if (!contentHtml) return fallback;
  // Pull from the first marqueeWrapper block. Take unique srcs in order.
  const wrapMatch = contentHtml.match(/<div[^>]*marqueeWrapper[^>]*>([\s\S]*?)<\/div>(?=\s*<img[^>]*webFrameImg|\s*<\/section>)/);
  const scope = wrapMatch ? wrapMatch[1] : contentHtml;
  const imgs: string[] = [];
  let m: RegExpExecArray | null;
  IMG_RE.lastIndex = 0;
  while ((m = IMG_RE.exec(scope))) imgs.push(m[1]);
  return uniq(imgs).length ? uniq(imgs) : fallback;
}

/**
 * Extract the visible body copy: <h2>, <p>, <ul>, <ol>, <blockquote> from the
 * `content-module__ZwfD0a__wpContent` block. We only keep simple semantic tags
 * to avoid leaking any production-specific class names that we no longer style.
 */
export function extractBodyHtml(contentHtml: string | undefined | null): string {
  if (!contentHtml) return "";
  const m = contentHtml.match(/<div class="content-module__ZwfD0a__wpContent">([\s\S]*?)<\/div>(?=\s*<\/div>\s*<div style="margin-top:50px"|\s*<style>|\s*<div style="margin-top:50px;margin-bottom:48px")/);
  if (!m) {
    const m2 = contentHtml.match(/<div class="content-module__ZwfD0a__wpContent">([\s\S]*?)<\/div>/);
    if (!m2) return "";
    return cleanupBody(m2[1]);
  }
  return cleanupBody(m[1]);
}

function cleanupBody(raw: string): string {
  let s = raw.trim();
  // Remove residual class attributes (we'll style with .hn-content)
  s = s.replace(/\sclass="[^"]*"/g, "");
  // Remove style attrs inside content (text-align etc.) — keep semantic markup only
  s = s.replace(/\sstyle="[^"]*"/g, "");
  // Strip non-breaking spaces packed by the WP editor
  s = s.replace(/&nbsp;/g, " ").replace(/\s{2,}/g, " ");
  return s;
}

export function extractHeaderDescription(contentHtml: string | undefined | null): string {
  if (!contentHtml) return "";
  const m = contentHtml.match(/<div class="header-module__Dea5oa__description">([\s\S]*?)<\/div>/);
  if (!m) return "";
  // Strip wrapping <p>, <strong>, attributes, &nbsp;
  const inner = m[1]
    .replace(/<p[^>]*>/g, "")
    .replace(/<\/p>/g, " ")
    .replace(/<strong[^>]*>/g, "")
    .replace(/<\/strong>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
  return inner;
}

export function extractUIDesignImages(contentHtml: string | undefined | null, fallback: string[] = []): string[] {
  if (!contentHtml) return fallback;
  // Find the "UI Design" inline section, then grab all img srcs in the first marqueeLeft track
  const uiIdx = contentHtml.indexOf("UI Design");
  if (uiIdx < 0) return fallback;
  const tail = contentHtml.slice(uiIdx);
  // The two rows live until the next sibling </div> after PrimaryCTA / wpContentContainer ends.
  // We bound by the next `latestProjectsSection` if present.
  const stopIdx = tail.indexOf("latestProjectsSection");
  const slice = stopIdx > 0 ? tail.slice(0, stopIdx) : tail;
  const imgs: string[] = [];
  let m: RegExpExecArray | null;
  IMG_RE.lastIndex = 0;
  while ((m = IMG_RE.exec(slice))) imgs.push(m[1]);
  const unique = uniq(imgs);
  return unique.length ? unique : fallback;
}
