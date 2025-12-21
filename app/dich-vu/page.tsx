import type { Metadata } from 'next';
import ServicesGrid from '../../components/sections/ServicesGrid';
import CTASection from '../../components/ui/CTASection';
import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import { servicesPageMetadata } from '@lib/seo';

export const metadata: Metadata = servicesPageMetadata;

export default function ServicesPage() {
  return (
    <>
      <section className="py-12">
        <Container className="space-y-4">
          <SectionHeading eyebrow="Dịch vụ cung cấp" title="Thiết kế Website" description="Chọn gói phù hợp để triển khai nhanh." />
        </Container>
      </section>
      <ServicesGrid withHeading={false} />
      <CTASection />
    </>
  );
}
