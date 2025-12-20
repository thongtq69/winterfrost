import type { Metadata } from 'next';
import HomeHero from '../components/sections/HomeHero';
import CoreValues from '../components/sections/CoreValues';
import ServicesGrid from '../components/sections/ServicesGrid';
import ProjectsHighlight from '../components/sections/ProjectsHighlight';
import CTASection from '../components/ui/CTASection';

export const metadata: Metadata = {
  title: 'Thiết kế website chuẩn SEO & chuyển đổi',
  description: 'Thiết kế website, landing page, tối ưu tốc độ và SEO. Đồng hành cùng doanh nghiệp Việt.',
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <CoreValues />
      <ServicesGrid />
      <ProjectsHighlight />
      <CTASection />
    </>
  );
}
