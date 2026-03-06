import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import KnowledgeComingSoon from '../../../components/blog/KnowledgeComingSoon';
import CTASection from '../../../components/ui/CTASection';
import Card from '../../../components/ui/Card';
import Container from '../../../components/ui/Container';
import Badge from '../../../components/ui/Badge';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, posts } from '../../../data/posts';
import { posts as simplePosts } from '../../../src/data/posts';
import ArticleSchema from '../../../components/schema/ArticleSchema';
import BreadcrumbSchema from '../../../components/schema/BreadcrumbSchema';
import BlogList from '../../../components/blog/BlogList';
import BlogSidebar from '../../../components/blog/BlogSidebar';
import { getKnowledgeTrackBySlug, knowledgeTracks } from '../../../data/knowledgeTracks';
import { prepareBlogContent } from '../../../src/lib/blog';
import { siteConfig } from '../../../site.config';
import clsx from 'clsx';

type Props = {
  params: Promise<{ slug: string[] }>;
};

type ArticleTocProps = {
  headings: ReturnType<typeof prepareBlogContent>['headings'];
  className?: string;
};

function ArticleTableOfContents({ headings, className }: ArticleTocProps) {
  if (headings.length === 0) return null;

  return (
    <aside
      className={clsx(
        'rounded-[28px] border border-slate-200/90 bg-white/95 p-5 shadow-soft backdrop-blur-sm',
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Điều hướng bài viết</p>
          <h2 className="mt-1 text-lg font-extrabold text-ink">Nội dung chính</h2>
        </div>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{headings.length} mục</span>
      </div>
      <div className="space-y-2 text-sm text-slate-700">
        {headings.map((heading, index) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={clsx(
              'flex gap-3 rounded-2xl border border-transparent px-3 py-2.5 leading-6 transition hover:border-brand-100 hover:bg-brand-50/60 hover:text-brand-800',
              heading.level === 'h3' && 'ml-4 text-[13px] text-slate-600',
            )}
          >
            <span className="min-w-6 pt-0.5 text-xs font-semibold text-slate-400">{index + 1}.</span>
            <span className="min-w-0 break-words font-medium">{heading.text}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}

export async function generateStaticParams() {
  return [...posts.map((post) => ({ slug: post.slug })), ...knowledgeTracks.map((track) => ({ slug: [track.slug] }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const track = slug.length === 1 ? getKnowledgeTrackBySlug(slug[0]) : undefined;

  if (!post && track) {
    return {
      title: { absolute: `${track.label} | Kiến thức | ${siteConfig.brand.name}` },
      description: track.description,
      alternates: { canonical: `https://${siteConfig.brand.domain}${track.href}` },
      openGraph: {
        title: `${track.label} | ${siteConfig.brand.name}`,
        description: track.description,
        url: `https://${siteConfig.brand.domain}${track.href}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${track.label} | ${siteConfig.brand.name}`,
        description: track.description,
      },
    };
  }

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
  const track = slug.length === 1 ? getKnowledgeTrackBySlug(slug[0]) : undefined;

  // Nếu slug là category, hiển thị trang danh mục
  if (!post && track) {
    const filtered = track.slug === 'huong-dan-ky-thuat' ? simplePosts : [];

    if (track.status === 'coming-soon') {
      return (
        <>
          <KnowledgeComingSoon track={track} fallbackPosts={simplePosts.slice(0, 3)} />
          <CTASection />
        </>
      );
    }

    return (
      <>
        <section className="relative overflow-hidden bg-white py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(77,138,255,0.14),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.08),transparent_28%)]" />
          <Container className="relative space-y-4 lg:max-w-5xl">
            <nav className="text-sm text-gray-600" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-brand-700">
                Trang chủ
              </Link>
              <span className="px-1 text-gray-400">/</span>
              <Link href="/kien-thuc" className="hover:text-brand-700">
                Kiến thức
              </Link>
              <span className="px-1 text-gray-400">/</span>
              <span className="text-gray-700">{track.label}</span>
            </nav>
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-brand-50 text-brand-700">{track.eyebrow}</Badge>
              <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {filtered.length} bài đang có
              </span>
            </div>
            <h1 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl">{track.label}</h1>
            <p className="max-w-3xl text-base text-gray-600 sm:text-lg">{track.heroDescription}</p>
            <div className="flex flex-wrap gap-2">
              {track.previews.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/90 bg-white/90 px-3 py-1 text-xs font-medium text-slate-600 shadow-[0_12px_32px_-28px_rgba(12,22,38,0.3)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </Container>
        </section>
        <BlogList posts={filtered} sidebar={<BlogSidebar />} />
        <section className="bg-white pb-12">
          <Container className="grid gap-5 md:grid-cols-3">
            {track.formats.map((item, index) => (
              <div key={item.title} className="rounded-[28px] border border-slate-100 bg-surface p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Format 0{index + 1}</p>
                <h2 className="mt-3 text-xl font-bold text-ink">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
              </div>
            ))}
          </Container>
        </section>
        <CTASection />
      </>
    );
  }

  if (!post) return notFound();

  const baseUrl = `https://${siteConfig.brand.domain}`;
  const currentSlug = slug.join('/');
  const url = `${baseUrl}/kien-thuc/${currentSlug}`;
  const preparedContent = prepareBlogContent(post.contentHtml);
  const readTime = preparedContent.readTime;
  const toIso = (dateStr: string) => {
    const parsed = new Date(dateStr);
    if (Number.isNaN(parsed.getTime())) return dateStr;
    return parsed.toISOString();
  };
  const enhancedHtml = preparedContent.html;
  const headings = preparedContent.headings;

  return (
    <>
      <section className="bg-white py-8 sm:py-10">
        <Container className="space-y-4 lg:max-w-6xl">
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
      <section className="bg-surface/60 pb-12 pt-6">
        <Container className="lg:max-w-7xl">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-10">
            <div className="min-w-0 space-y-6">
              <ArticleTableOfContents headings={headings} className="xl:hidden" />
              {post.image ? (
                <div className="rounded-[28px] border border-white/80 bg-white p-2 shadow-soft">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-[22px] bg-slate-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="h-full w-full object-cover object-top"
                      priority
                      sizes="(min-width: 1440px) 860px, (min-width: 1024px) 70vw, 100vw"
                    />
                  </div>
                </div>
              ) : null}
              <Card className="rounded-[28px] border border-slate-100 bg-white/95 p-5 shadow-soft hover:translate-y-0 sm:p-8">
                <div className="blog-article" dangerouslySetInnerHTML={{ __html: enhancedHtml }} />
              </Card>
            </div>
            <ArticleTableOfContents headings={headings} className="hidden h-fit max-h-[calc(100vh-8rem)] overflow-auto xl:sticky xl:top-24 xl:block" />
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
