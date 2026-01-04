'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { courses } from '../../data/courses';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import { siteConfig } from '../../site.config';

const CoursesHighlight = () => (
  <section id="khoa-hoc" className="scroll-mt-24 bg-white/70 py-16">
    <Container>
      <SectionHeading
        eyebrow="Khóa học & mentoring"
        title="Các lộ trình WordPress"
        description="3 chương trình tập trung triển khai website thực tế, tối ưu SEO và coaching 1-1."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, index) => (
          <motion.div
            key={course.slug}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.06, duration: 0.3 }}
          >
            <Card className="group flex h-full flex-col overflow-hidden rounded-3xl p-0">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-3xl bg-gray-100">
                {course.imageSrc ? (
                  <Image
                    src={course.imageSrc}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-500">
                    Hình ảnh chưa sẵn sàng
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/30" />
                <div className="absolute left-4 top-4 rounded-2xl bg-white/90 px-3 py-1 text-xs font-semibold text-ink shadow-card">
                  {siteConfig.brand.name} • {course.label}
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{course.label}</p>
                  <h3 className="mt-2 text-lg font-extrabold text-ink">{course.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{course.summary}</p>
                </div>
                <div className="mt-auto flex">
                  <Button
                    variant="outline"
                    size="md"
                    className="group-hover:border-brand-400 group-hover:text-brand-700"
                    asChild
                  >
                    <Link href={`/khoa-hoc/${course.slug}`}>
                      Xem chi tiết <ArrowUpRight size={16} />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Container>
  </section>
);

export default CoursesHighlight;
