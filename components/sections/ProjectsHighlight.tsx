'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, ImageOff } from 'lucide-react';
import Link from 'next/link';
import { projects } from '../../data/projects';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Image from 'next/image';

const ProjectsHighlight = () => (
  <section id="du-an" className="scroll-mt-24 py-16">
    <Container>
      <SectionHeading
        eyebrow="Dự án nổi bật"
        title="Một số dự án gần đây"
        description="Thiết kế website bán hàng, landing, doanh nghiệp và yêu cầu custom."
        action={
          <Link href="/du-an" className="text-sm font-semibold text-brand-700 transition hover:text-brand-800 hover:underline">
            Xem tất cả dự án
          </Link>
        }
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 6).map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.05, duration: 0.25 }}
          >
            <Card className="flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100/70 bg-gradient-to-br from-white via-white to-brand-50/40 p-0">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
                {project.cover ? (
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 400px, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <ImageOff size={28} />
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-ink">{project.title}</h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-600 ring-1 ring-gray-100">
                    <Calendar size={14} />
                    {project.year}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{project.description}</p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    Dự án
                  </div>
                  <Button variant="ghost" size="sm" className="text-brand-700" icon={<ArrowUpRight size={16} />} asChild>
                    <Link href={`/du-an/${project.slug}`}>Xem dự án</Link>
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

export default ProjectsHighlight;
