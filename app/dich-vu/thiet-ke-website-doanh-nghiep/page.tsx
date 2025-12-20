import type { Metadata } from 'next';
import ServiceHero from '../../../components/service-detail/ServiceHero';
import PricingSection from '../../../components/service-detail/PricingSection';
import FeaturesGrid from '../../../components/service-detail/FeaturesGrid';
import ProjectShowcase from '../../../components/service-detail/ProjectShowcase';
import FAQ from '../../../components/service-detail/FAQ';
import CTAConsult from '../../../components/common/CTAConsult';
import { getServiceBySlug } from '../../../src/data/services';

const service = getServiceBySlug('thiet-ke-website-doanh-nghiep');

export const metadata: Metadata = {
  title: service?.title ?? 'Thiết kế website doanh nghiệp',
  description: service?.subtitle ?? 'Thiết kế website doanh nghiệp chuẩn SEO và tối ưu chuyển đổi.',
  openGraph: {
    title: service?.title ?? 'Thiết kế website doanh nghiệp',
    description: service?.subtitle ?? 'Thiết kế website doanh nghiệp chuẩn SEO và tối ưu chuyển đổi.',
  },
};

export default function ServicePage() {
  if (!service) return null;

  return (
    <>
      <ServiceHero service={service} />
      <PricingSection plans={service.pricingPlans} />
      <FeaturesGrid features={service.features} />
      <ProjectShowcase projects={service.projects} />
      <FAQ faqs={service.faqs} />
      <CTAConsult />
    </>
  );
}
