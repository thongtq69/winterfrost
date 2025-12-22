import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2, HelpCircle, MousePointerClick } from 'lucide-react';
import CTASection from '../../../components/ui/CTASection';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import Container from '../../../components/ui/Container';
import ImagePlaceholder from '../../../components/ui/ImagePlaceholder';
import SectionHeading from '../../../components/ui/SectionHeading';
import { getServiceDetail, serviceDetails } from '../../../data/services';
import { getServicePageMetadata } from '@lib/seo';
import BreadcrumbSchema from '../../../components/schema/BreadcrumbSchema';
import FAQSchema from '../../../components/schema/FAQSchema';
import ServiceSchema from '../../../components/schema/ServiceSchema';
import { siteConfig } from '../../../site.config';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return getServicePageMetadata(slug);
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceDetail(slug);
  if (!service) return notFound();

  const baseUrl = `https://${siteConfig.brand.domain}`;
  const priceRangeMap: Record<string, string> = {
    'thiet-ke-website-ban-hang': '15000000-50000000',
    'thiet-ke-website-doanh-nghiep': '20000000-80000000',
    'thiet-ke-landing-page-chuyen-nghiep': '8000000-25000000',
    'thiet-ke-website-theo-yeu-cau': '25000000-120000000',
  };
  const canonical = `${baseUrl}/dich-vu/${slug}`;

  return (
    <>
      <section className="bg-white/70 pb-12 pt-8">
        <Container className="grid gap-8 lg:grid-cols-[1.2fr,1fr]">
          <div className="space-y-4">
            <SectionHeading eyebrow="Dịch vụ" title={service.title} description={service.intro} />
            <div className="grid gap-2 sm:grid-cols-2">
              {service.heroBullets.map((item) => (
                <div key={item} className="flex items-start gap-2 rounded-xl bg-white p-3 text-sm shadow-card">
                  <CheckCircle2 className="mt-0.5 text-brand-600" size={18} />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button icon={<ArrowRight size={18} />} asChild>
                <Link href="#bang-gia">Bảng giá</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/quy-trinh-lam-viec">Quy trình làm việc</Link>
              </Button>
            </div>
          </div>
          <Card className="rounded-3xl bg-gradient-to-br from-brand-50 to-white p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-brand-600">Tư vấn nhanh</p>
              <MousePointerClick size={18} className="text-brand-500" />
            </div>
            <p className="mt-2 text-lg font-bold text-ink">Book lịch để trao đổi yêu cầu</p>
            <p className="text-sm text-gray-600">Chúng tôi phản hồi trong 24h, đề xuất lộ trình và chi phí phù hợp.</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button fullWidth asChild>
                <Link href="/lien-he">Liên hệ ngay</Link>
              </Button>
              <Button fullWidth variant="secondary" asChild>
                <Link href="/du-an">Xem dự án</Link>
              </Button>
            </div>
          </Card>
        </Container>
      </section>

      <section id="bang-gia" className="scroll-mt-24 py-14">
        <Container>
          <SectionHeading
            eyebrow="Bảng giá thiết kế"
            title="Chọn gói phù hợp"
            description="Hai lựa chọn: theo mẫu triển khai nhanh hoặc thiết kế độc quyền theo yêu cầu."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {service.packages.map((pack) => (
              <Card key={pack.name} className="flex h-full flex-col gap-4 rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-extrabold text-ink">{pack.name}</h3>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">Khuyến nghị</span>
                </div>
                <p className="text-sm text-gray-600">{pack.priceNote}</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {pack.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-brand-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-2">
                  <Button asChild fullWidth>
                    <Link href="/lien-he">Liên hệ tư vấn</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white/70 py-14">
        <Container>
          <SectionHeading
            eyebrow="Tính năng chính"
            title="Những điểm nổi bật"
            description="Ưu tiên SEO, tốc độ, trải nghiệm và khả năng mở rộng."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {service.features.map((feature) => (
              <Card key={feature.title} className="flex flex-col gap-4 p-5">
                <ImagePlaceholder aspect="aspect-[4/3]" />
                <h4 className="text-lg font-bold text-ink">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <SectionHeading
            eyebrow="Dự án đã hoàn thành"
            title="Một vài dự án liên quan"
            description="Kinh nghiệm đa dạng ngành, tập trung vào chuyển đổi và trải nghiệm."
            action={
              <Link href="/du-an" className="text-sm font-semibold text-brand-700 transition hover:underline">
                Xem tất cả
              </Link>
            }
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {service.projectsPreview.map((item, idx) => (
              <Card key={item.title} className="flex gap-4 p-5">
                <ImagePlaceholder aspect="aspect-[4/3]" className="w-28 shrink-0" label={`0${idx + 1}`} />
                <div>
                  <p className="text-xs uppercase tracking-wide text-brand-600">Dự án</p>
                  <h4 className="text-lg font-bold text-ink">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </Card>
            ))}
            <Card className="flex flex-col gap-4 p-5">
              <ImagePlaceholder aspect="aspect-[4/3]" className="w-full" label="More" />
              <h4 className="text-lg font-bold text-ink">Khám phá thêm</h4>
              <p className="text-sm text-gray-600">Xem thêm các dự án liên quan trong thư viện.</p>
              <Button variant="outline" asChild>
                <Link href="/du-an">Xem dự án</Link>
              </Button>
            </Card>
          </div>
        </Container>
      </section>

      <section className="bg-white/70 py-14">
        <Container>
          <SectionHeading eyebrow="Câu hỏi thường gặp" title="Bạn đang thắc mắc?" />
          <div className="mt-6 space-y-3">
            {service.faqs.map((faq) => (
              <Card key={faq.question} className="flex items-start gap-3 p-4">
                <HelpCircle size={18} className="mt-1 text-brand-600" />
                <div>
                  <p className="font-semibold text-ink">{faq.question}</p>
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
      <BreadcrumbSchema
        id={`breadcrumb-${slug}`}
        items={[
          { name: 'Trang chủ', url: `${baseUrl}/` },
          { name: 'Dịch vụ', url: `${baseUrl}/dich-vu` },
          { name: service.title, url: canonical },
        ]}
      />
      <ServiceSchema
        name={service.title}
        description={service.intro}
        url={canonical}
        priceRange={priceRangeMap[slug]}
        serviceType={service.title}
      />
      <FAQSchema id={`faq-${slug}`} faqs={service.faqs} />
    </>
  );
}
