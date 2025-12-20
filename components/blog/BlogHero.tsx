import Container from '../ui/Container';
import Badge from '../ui/Badge';
import { siteConfig } from '../../site.config';

const BlogHero = () => (
  <section className="relative overflow-hidden bg-white pb-10 pt-6 sm:pt-8 lg:pt-10">
    <Container className="space-y-4">
      <Badge className="bg-white shadow-card text-brand-700">{siteConfig.brand.name} / Kiến thức</Badge>
      <h1 className="text-4xl font-extrabold leading-tight text-ink sm:text-5xl">Chia sẻ kiến thức & kinh nghiệm triển khai</h1>
      <p className="max-w-3xl text-lg text-gray-600">
        Tổng hợp bài viết về chiến lược nội dung, SEO, tối ưu tốc độ và trải nghiệm người dùng giúp website doanh nghiệp tăng trưởng bền vững.
      </p>
    </Container>
  </section>
);

export default BlogHero;
