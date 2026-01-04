import HomeHero from '../components/sections/HomeHero';
import CoreValues from '../components/sections/CoreValues';
import ServicesGrid from '../components/sections/ServicesGrid';
import ProjectsHighlight from '../components/sections/ProjectsHighlight';
import CoursesHighlight from '../components/sections/CoursesHighlight';
import CTASection from '../components/ui/CTASection';
import { homePageMetadata } from '@lib/seo';
import LocalBusinessSchema from '../components/schema/LocalBusinessSchema';
import BreadcrumbSchema from '../components/schema/BreadcrumbSchema';

export const metadata = homePageMetadata;

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <CoreValues />
      <ServicesGrid />
      <CoursesHighlight />
      <ProjectsHighlight />
      <CTASection />
      <BreadcrumbSchema
        items={[
          { name: 'Trang chủ', url: 'https://winterfrost.tech/' },
          { name: 'Dịch vụ', url: 'https://winterfrost.tech/dich-vu' },
        ]}
        id="breadcrumb-home"
      />
      <LocalBusinessSchema />
    </>
  );
}
