import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CTASection from '../../../components/ui/CTASection';
import Card from '../../../components/ui/Card';
import Container from '../../../components/ui/Container';
import ImagePlaceholder from '../../../components/ui/ImagePlaceholder';
import SectionHeading from '../../../components/ui/SectionHeading';
import { getPostBySlug, posts } from '../../../data/posts';
import ArticleSchema from '../../../components/schema/ArticleSchema';
import BreadcrumbSchema from '../../../components/schema/BreadcrumbSchema';
import { siteConfig } from '../../../site.config';

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
  };
}

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();

  const baseUrl = `https://${siteConfig.brand.domain}`;
  const url = `${baseUrl}/kien-thuc/${slug.join('/')}`;
  const toIso = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/').map((part) => parseInt(part, 10));
    if (!day || !month || !year) return dateStr;
    const iso = new Date(year, month - 1, day).toISOString();
    return iso;
  };

  return (
    <>
      <section className="py-12">
        <Container>
          <SectionHeading eyebrow="Bài viết" title={post.title} description={post.excerpt} />
          <p className="text-sm text-gray-500">Ngày: {post.date}</p>
        </Container>
      </section>
      <section className="bg-white/70 py-10">
        <Container className="space-y-4">
          <ImagePlaceholder aspect="aspect-video" />
          <Card className="p-5">
            <p className="text-sm text-gray-700">
              Nội dung chi tiết sẽ được cập nhật. Đây là trang placeholder cho bài viết {post.title}. Bạn có thể thêm nội dung,
              hình ảnh và CTA tùy ý.
            </p>
          </Card>
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
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        url={url}
        datePublished={toIso(post.date)}
        dateModified={toIso(post.date)}
        image={siteConfig.assets.logoPath}
      />
    </>
  );
}
