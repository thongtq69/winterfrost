import type { Metadata } from 'next';
import BlogHero from '../../components/blog/BlogHero';
import BlogList from '../../components/blog/BlogList';
import KnowledgeTracks from '../../components/blog/KnowledgeTracks';
import BlogSidebar from '../../components/blog/BlogSidebar';
import CTAConsult from '../../components/common/CTAConsult';
import { posts } from '../../src/data/posts';
import { siteConfig } from '../../site.config';

const knowledgeDescription = 'Chia sẻ kiến thức về thiết kế website, SEO, tối ưu chuyển đổi và trải nghiệm người dùng.';

export const metadata: Metadata = {
  title: { absolute: `Kiến thức | ${siteConfig.brand.name}` },
  description: knowledgeDescription,
  alternates: {
    canonical: `https://${siteConfig.brand.domain}/kien-thuc`,
  },
  openGraph: {
    title: `Kiến thức | ${siteConfig.brand.name}`,
    description: knowledgeDescription,
    url: `https://${siteConfig.brand.domain}/kien-thuc`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Kiến thức | ${siteConfig.brand.name}`,
    description: knowledgeDescription,
  },
};

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <KnowledgeTracks />
      <BlogList posts={posts} sidebar={<BlogSidebar />} />
      <CTAConsult />
    </>
  );
}
