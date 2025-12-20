import type { Metadata } from 'next';
import BlogHero from '../../components/blog/BlogHero';
import BlogList from '../../components/blog/BlogList';
import BlogSidebar from '../../components/blog/BlogSidebar';
import CTAConsult from '../../components/common/CTAConsult';
import { posts } from '../../src/data/posts';

export const metadata: Metadata = {
  title: 'Kiến thức | YOUR BRAND',
  description: 'Chia sẻ kiến thức về thiết kế website, SEO, tối ưu chuyển đổi và trải nghiệm người dùng.',
  openGraph: {
    title: 'Kiến thức | YOUR BRAND',
    description: 'Chia sẻ kiến thức về thiết kế website, SEO, tối ưu chuyển đổi và trải nghiệm người dùng.',
  },
};

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <BlogList posts={posts} sidebar={<BlogSidebar />} />
      <CTAConsult />
    </>
  );
}
