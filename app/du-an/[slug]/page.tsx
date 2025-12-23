import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import CTAConsult from '../../../components/common/CTAConsult';
import Card from '../../../components/ui/Card';
import Container from '../../../components/ui/Container';
import ImagePlaceholder from '../../../components/ui/ImagePlaceholder';
import SectionHeading from '../../../components/ui/SectionHeading';
import { getProjectBySlug, projects } from '../../../data/projects';
import { workflowSteps } from '../../../data/workflow';
import { buildPageMetadata, getProjectDetailMetadata } from '@lib/seo';
import Image from 'next/image';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return buildPageMetadata({
      title: 'Dự án',
      description: 'Dự án đã hoàn thành',
      path: `/du-an/${slug}`,
    });
  }
  return getProjectDetailMetadata(project);
}

const faqItems = [
  { q: 'Thời gian triển khai?', a: 'Tùy độ phức tạp, thường từ 2-4 tuần với website tiêu chuẩn.' },
  { q: 'Có hỗ trợ nội dung/SEO?', a: 'Cung cấp cấu trúc, checklist SEO và hướng dẫn nhập nội dung.' },
  { q: 'Bảo hành sau bàn giao?', a: 'Hỗ trợ lỗi phát sinh và tối ưu nhỏ trong 60 ngày.' },
];

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  const related = projects.filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <>
      <section className="bg-white/70 pb-10 pt-12">
        <Container className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Dự án hoàn thành</p>
          <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">{project.title}</h1>
          <p className="text-sm text-gray-600">{project.description}</p>
          <div className="flex flex-wrap gap-3 text-sm text-gray-700">
            <span className="rounded-full bg-gray-100 px-3 py-1">
              Phân loại: <strong>{project.categories.join(', ')}</strong>
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1">
              Khách hàng: <strong>{project.client}</strong>
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1">
              Thời gian hoàn thành: <strong>{project.year}</strong>
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={project.externalUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-ring transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              Xem thực tế <ArrowUpRight size={16} />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              Nhận tư vấn
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container className="grid gap-8 lg:grid-cols-[1.2fr,1fr]">
          <div className="space-y-4">
            <SectionHeading eyebrow="Giới thiệu dự án" title="Tổng quan" description="Thông tin ngắn gọn về dự án và phạm vi thực hiện." />
            <p className="text-sm text-gray-700">
              Dự án tập trung vào trải nghiệm người dùng, chuẩn SEO và tốc độ tải. Thiết kế theo nhận diện thương hiệu và tối ưu flow đăng
              ký/đặt lịch cho khách hàng mục tiêu.
            </p>
          </div>
          <Card className="p-5">
            <h3 className="text-lg font-bold text-ink">Mục tiêu</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li>• Tăng tỷ lệ chuyển đổi liên hệ/đặt lịch</li>
              <li>• Chuẩn SEO onpage và cấu trúc nội dung</li>
              <li>• Tối ưu tốc độ tải trên mobile</li>
              <li>• Thể hiện uy tín thương hiệu</li>
            </ul>
          </Card>
        </Container>
      </section>

      <section className="bg-white/70 py-12">
        <Container className="space-y-6">
          <SectionHeading eyebrow="Hình ảnh dự án" title="Giao diện thực tế" />
          <Card className="overflow-hidden rounded-3xl p-0 shadow-card">
            <div className="relative aspect-[16/9] w-full bg-gray-50">
              {project.cover ? (
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 900px, 100vw"
                  className="object-cover"
                />
              ) : (
                <ImagePlaceholder aspect="aspect-[16/9]" className="absolute inset-0" />
              )}
            </div>
          </Card>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <SectionHeading eyebrow="Quy trình làm việc" title="5 bước triển khai" />
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workflowSteps.map((step) => (
              <Card key={step.id} className="flex flex-col gap-3 p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-sm font-extrabold text-brand-700">
                    {step.id}
                  </span>
                  <h4 className="text-lg font-bold text-ink">{step.title}</h4>
                </div>
                <ul className="space-y-1 text-sm text-gray-600">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <ChevronRight size={14} className="text-brand-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white/70 py-12">
        <Container>
          <SectionHeading eyebrow="Dự Án Liên Quan" title="Khám phá thêm" />
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <Card key={item.slug} className="flex h-full flex-col gap-3 p-5">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-brand-50">
                  {item.cover ? (
                    <Image
                      src={item.cover}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 280px, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <ImagePlaceholder aspect="aspect-[4/3]" className="absolute inset-0" />
                  )}
                </div>
                <p className="text-xs uppercase tracking-wide text-brand-600">Dự án</p>
                <h4 className="text-lg font-bold text-ink">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div className="mt-auto pt-2">
                  <Link href={`/du-an/${item.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                    Xem dự án <ArrowUpRight size={16} />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <SectionHeading eyebrow="FAQ" title="Câu hỏi thường gặp" />
          <div className="mt-4 space-y-3">
            {faqItems.map((item) => (
              <Card key={item.q} className="p-4">
                <p className="font-semibold text-ink">{item.q}</p>
                <p className="text-sm text-gray-600">{item.a}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CTAConsult anchorId="contact" />
    </>
  );
}
