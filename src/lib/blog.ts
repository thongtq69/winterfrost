import { load } from 'cheerio';
import { siteConfig } from '../config/site.config';

export type BlogHeading = {
  id: string;
  text: string;
  level: 'h2' | 'h3';
};

const baseUrl = `https://${siteConfig.brand.domain}`;
const legacyHosts = new Set(['xuanhieuit.com', 'www.xuanhieuit.com']);
const legacyPathMap: Record<string, string> = {
  '/kien-thuc/quan-tri-website': '/kien-thuc/huong-dan-ky-thuat',
};
const removableText = new Set(['Nội dung chính', 'Bài viết liên quan']);
const keepAttributes = new Set([
  'href',
  'src',
  'srcset',
  'sizes',
  'alt',
  'title',
  'width',
  'height',
  'loading',
  'id',
  'target',
  'rel',
  'colspan',
  'rowspan',
]);

const normalizeWhitespace = (value: string) => value.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();

const slugify = (text: string) =>
  normalizeWhitespace(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const unwrapSelector = (html: ReturnType<typeof load>, selector: string) => {
  html(selector).each((_index, element) => {
    const current = html(element);
    current.replaceWith(current.contents());
  });
};

const rewriteLegacyHref = (href: string) => {
  if (!href) return href;

  if (href.startsWith('/xuanhieuit.com')) {
    return '/';
  }

  try {
    const candidate = new URL(href, baseUrl);
    if (!legacyHosts.has(candidate.hostname)) {
      return href;
    }

    const normalizedPath =
      candidate.pathname.length > 1 && candidate.pathname.endsWith('/')
        ? candidate.pathname.slice(0, -1)
        : candidate.pathname;
    const mappedPath = legacyPathMap[normalizedPath] ?? normalizedPath;

    return `${mappedPath || '/'}${candidate.search}${candidate.hash}` || '/';
  } catch {
    return href;
  }
};

export const prepareBlogContent = (contentHtml: string) => {
  const source = load(contentHtml);
  const postContentRoot = source('#post-content').first();
  const extractedHtml =
    postContentRoot.find('> .elementor-widget-container').first().html() ??
    postContentRoot.html() ??
    contentHtml;
  const html = load(extractedHtml);

  html(
    [
      'script',
      'style',
      'noscript',
      'nav[aria-label="breadcrumbs"]',
      '.rank-math-breadcrumb',
      '.breadcrumbs-text',
      '.elementor-widget-table-of-contents',
      '.elementor-widget-posts',
      '.elementor-posts-container',
      '.elementor-widget-shortcode',
      '.elementor-shortcode',
      '.elementor-widget-theme-post-title',
      '.elementor-widget-theme-post-featured-image',
      '.elementor-page-title',
      'h1',
    ].join(', '),
  ).remove();

  for (const selector of [
    '.elementor-widget-container',
    '.elementor-widget-text-editor',
    '.elementor-widget-image',
    '.elementor-widget-code-highlight',
    '.elementor-widget-theme-post-content',
    '.elementor-element',
    '.e-con-inner',
    '.e-con',
    '.elementor',
  ]) {
    unwrapSelector(html, selector);
  }

  html('pre code xmp').each((_index, element) => {
    const code = html(element).parent('code');
    const rawCode = html(element).text();
    code.text(rawCode);
  });

  html('a[href]').each((_index, element) => {
    const link = html(element);
    const rewritten = rewriteLegacyHref(link.attr('href') ?? '');

    if (rewritten) {
      link.attr('href', rewritten);

      const isExternal = /^https?:\/\//.test(rewritten) && !rewritten.startsWith(baseUrl);
      if (isExternal) {
        link.attr('target', '_blank');
        link.attr('rel', 'noopener noreferrer');
      } else {
        link.removeAttr('target');
        link.removeAttr('rel');
      }
    } else {
      link.removeAttr('href');
    }
  });

  html('*').each((_index, element) => {
    const current = html(element);
    const attributes = 'attribs' in element ? (element.attribs ?? {}) : {};

    for (const attribute of Object.keys(attributes)) {
      if (!keepAttributes.has(attribute) && !attribute.startsWith('aria-')) {
        current.removeAttr(attribute);
      }
    }
  });

  html('h2, h3, h4, h5, h6, p, span, strong').each((_index, element) => {
    const current = html(element);
    const text = normalizeWhitespace(current.text());

    if (removableText.has(text)) {
      current.remove();
    }
  });

  html('p, div, span, section, article').each((_index, element) => {
    const current = html(element);
    const hasMeaningfulChild = current.children('img, pre, code, table, ul, ol, iframe, figure, h2, h3, h4, h5, h6').length > 0;
    const text = normalizeWhitespace(current.text());

    if (!hasMeaningfulChild && text.length === 0) {
      current.remove();
    }
  });

  const headings: BlogHeading[] = [];
  html('h2, h3').each((_index, element) => {
    const current = html(element);
    const text = normalizeWhitespace(current.text());
    if (!text) return;

    const id = current.attr('id') ?? slugify(text);
    current.attr('id', id);
    headings.push({ id, text, level: element.tagName === 'h2' ? 'h2' : 'h3' });
  });

  const plainText = normalizeWhitespace(html.text());
  const wordCount = plainText.split(' ').filter(Boolean).length;

  return {
    html: html('body').html() ?? html.root().html() ?? '',
    headings,
    plainText,
    readTime: Math.max(1, Math.ceil(wordCount / 200)),
  };
};
