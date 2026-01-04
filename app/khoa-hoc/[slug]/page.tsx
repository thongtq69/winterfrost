import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';
import CTASection from '../../../components/ui/CTASection';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import Container from '../../../components/ui/Container';
import SectionHeading from '../../../components/ui/SectionHeading';
import { courses, getCourseBySlug } from '../../../data/courses';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: 'Khóa học', description: 'Khóa học thiết kế website' };
  return {
    title: course.title,
    description: course.summary,
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return notFound();

  return (
    <>
      <section className="bg-white/70 py-12">
        <Container className="grid gap-8 lg:grid-cols-[1.3fr,1fr]">
          <div className="space-y-4">
            <SectionHeading eyebrow={course.label} title={course.title} description={course.summary} />
            <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-brand-700">
              <span className="rounded-full bg-brand-50 px-3 py-1">Khóa học online</span>
              <span className="rounded-full bg-brand-50 px-3 py-1">WordPress</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {course.modules.map((module) => (
                <div key={module} className="flex items-start gap-2 rounded-xl bg-white p-3 text-sm shadow-card">
                  <BookOpen size={18} className="mt-0.5 text-brand-600" />
                  <span className="text-gray-700">{module}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button icon={<ArrowRight size={18} />} asChild>
                <Link href="/lien-he">Đăng ký ngay</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/khoa-hoc/thiet-ke-website-wordpress-elementor">Xem thêm khóa khác</Link>
              </Button>
            </div>
          </div>
          <Card className="rounded-3xl p-6">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100">
              {course.videoSrc ? (
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src={course.videoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label={`Video giới thiệu ${course.title}`}
                >
                  <source src={course.videoSrc} type="video/mp4" />
                  Trình duyệt không hỗ trợ video.
                </video>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-500">
                  Video hiện chưa sẵn sàng
                </div>
              )}
            </div>
            <h3 className="mt-4 text-lg font-bold text-ink">Học viên nhận được</h3>
            <ul className="mt-2 space-y-2 text-sm text-gray-700">
              {course.outcomes.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-brand-600" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
