import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CTASection from '../../../components/ui/CTASection';
import Card from '../../../components/ui/Card';
import Container from '../../../components/ui/Container';
import Badge from '../../../components/ui/Badge';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, posts } from '../../../data/posts';
import ArticleSchema from '../../../components/schema/ArticleSchema';
import BreadcrumbSchema from '../../../components/schema/BreadcrumbSchema';
import { siteConfig } from '../../../site.config';
import clsx from 'clsx';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Bài viết', description: 'Nội dung đang cập nhật' };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://${siteConfig.brand.domain}/kien-thuc/${slug.join('/')}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://${siteConfig.brand.domain}/kien-thuc/${slug.join('/')}`,
      images: post.image ? [{ url: post.image }] : undefined,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();

  const baseUrl = `https://${siteConfig.brand.domain}`;
  const currentSlug = slug.join('/');
  const url = `${baseUrl}/kien-thuc/${currentSlug}`;
  const plainText = post.contentHtml.replace(/<[^>]*>/g, ' ');
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));
  const toIso = (dateStr: string) => {
    const parsed = new Date(dateStr);
    if (Number.isNaN(parsed.getTime())) return dateStr;
    return parsed.toISOString();
  };

  // Strip unwanted TOC/related blocks from scraped HTML
  const cleanedHtml = post.contentHtml
    // Remove elementor TOC widgets
    .replace(/<div[^>]*elementor-widget-table-of-contents[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi, '')
    // Remove trailing related-posts section starting at heading "Bài viết liên quan"
    .replace(/<h2[^>]*>Bài viết liên quan<\/h2>[\s\S]*/i, '')
    // Remove stray text markers
    .replace(/Nội dung chính/gi, '')
    .replace(/Bài viết liên quan/gi, '');

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

  const extractHeadings = (html: string) => {
    const headings: { id: string; text: string; level: 'h2' | 'h3' }[] = [];
    const headingRegex = /<h([23])([^>]*)>([\s\S]*?)<\/h[23]>/gi;
    const withIds = html.replace(headingRegex, (_m, lvl, attrs, inner) => {
      const text = inner.replace(/<[^>]*>/g, '').trim();
      const idMatch = /id=\"([^\"]+)\"/.exec(attrs);
      const id = idMatch?.[1] ?? slugify(text || `heading-${headings.length + 1}`);
      headings.push({ id, text, level: lvl === '2' ? 'h2' : 'h3' });
      const newAttrs = attrs.includes('id=') ? attrs : `${attrs} id="${id}"`;
      return `<h${lvl}${newAttrs}>${inner}</h${lvl}>`;
    });
    return { headings, html: withIds };
  };

  const { headings, html: enhancedHtml } = extractHeadings(cleanedHtml);

  return (
    <>
      <section className="relative overflow-hidden bg-white py-8 sm:py-10">
        <div className="snow-overlay" aria-hidden="true" />
        <Container className="relative space-y-4 lg:max-w-6xl">
          <p className="text-sm text-gray-500">
            <Link href="/" className="hover:text-brand-700">Trang chủ</Link>
            <span className="px-1 text-gray-400">/</span>
            <Link href="/kien-thuc" className="hover:text-brand-700">Kiến thức</Link>
            <span className="px-1 text-gray-400">/</span>
            <span className="text-gray-600">{post.title}</span>
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <Badge className="bg-brand-50 text-brand-700">{post.category || 'Kiến thức'}</Badge>
            <span className="text-gray-500">Ngày đăng: {post.date || 'Đang cập nhật'}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">{readTime} phút đọc</span>
          </div>
          <h1 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl">{post.title}</h1>
          <p className="max-w-3xl text-base text-gray-600 sm:text-lg">{post.excerpt}</p>
        </Container>
      </section>
      <section className="relative bg-surface/60 pb-12 pt-6">
        <div className="snow-overlay" aria-hidden="true" />
        <Container className="relative lg:max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.8fr,1fr]">
            <div className="space-y-6">
              {post.image ? (
                <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/80 bg-white shadow-soft">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="h-full w-full object-cover"
                    priority
                    sizes="(min-width: 1024px) 768px, 100vw"
                  />
                </div>
              ) : null}
              <Card className="prose prose-lg max-w-none rounded-2xl border border-slate-100 bg-white/95 p-6 shadow-soft prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-a:text-brand-700 hover:prose-a:text-brand-800 prose-img:rounded-xl prose-li:my-1 prose-pre:bg-slate-50 prose-pre:border prose-pre:border-slate-200 prose-pre:rounded-xl prose-pre:shadow-inner prose-pre:px-4 prose-pre:py-3 prose-pre:text-sm prose-code:text-sm prose-code:bg-transparent">
                <div dangerouslySetInnerHTML={{ __html: enhancedHtml }} />
              </Card>
            </div>
            {headings.length > 0 ? (
              <aside className="top-20 h-fit max-h-[75vh] overflow-auto rounded-2xl border border-slate-300 bg-white p-5 shadow-soft lg:sticky">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-base font-extrabold uppercase tracking-wide text-ink">Nội dung chính</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  {headings.map((h, idx) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className={clsx(
                        'flex gap-2 rounded-lg border border-transparent px-2 py-2 leading-snug transition hover:border-brand-100 hover:bg-brand-50/50 hover:text-brand-800',
                        h.level === 'h3' && 'ml-3 text-gray-600',
                      )}
                    >
                      <span className="text-gray-400">{idx + 1}.</span>
                      <span>{h.text}</span>
                    </a>
                  ))}
                </div>
              </aside>
            ) : null}
          </div>
        </Container>
      </section>
      <CTASection />
      <BreadcrumbSchema
        items={[
          { name: 'Trang chủ', url: `${baseUrl}/` },
          { name: 'Kiến thức', url: `${baseUrl}/kien-thuc` },
          { name: post.title, url },
        ]}
        id={`breadcrumb-article-${post.slug.join('-')}`}
      />
      {/* Liên quan */}
      <section className="bg-surface/80 py-12">
        <Container className="space-y-6 lg:max-w-5xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">Bài viết liên quan</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {posts
              .filter((p) => p.slug.join('/') !== currentSlug)
              .slice(0, 3)
              .map((item) => {
                const slugPath = item.slug.join('/');
                return (
                  <Link
                    key={slugPath}
                    href={`/kien-thuc/${slugPath}`}
                    className="group rounded-2xl border border-white/80 bg-white p-3 shadow-soft transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="aspect-[16/9] overflow-hidden rounded-xl bg-surface">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={640}
                          height={360}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                          sizes="(min-width: 1024px) 320px, 100vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-gray-400">No image</div>
                      )}
                    </div>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-500">{item.date}</p>
                      <h3 className="text-base font-semibold text-ink group-hover:text-brand-700">{item.title}</h3>
                    </div>
                  </Link>
                );
              })}
          </div>
        </Container>
      </section>
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        url={url}
        datePublished={toIso(post.date)}
        dateModified={toIso(post.date)}
        image={post.image ?? siteConfig.assets.logoPath}
      />
    </>
  );
}
