import HomeHero from '../components/sections/HomeHero';
import CoreValues from '../components/sections/CoreValues';
import ServicesGrid from '../components/sections/ServicesGrid';
import ProjectsHighlight from '../components/sections/ProjectsHighlight';
import CTASection from '../components/ui/CTASection';
import { homePageMetadata } from '@lib/seo';

export const metadata = homePageMetadata;

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
