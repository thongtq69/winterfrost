import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Container from '../ui/Container';
import Card from '../ui/Card';
import ImagePlaceholder from '../ui/ImagePlaceholder';
import Button from '../ui/Button';
import type { ServiceProject } from '../../src/data/services';

type Props = {
  projects: ServiceProject[];
};

const ProjectShowcase = ({ projects }: Props) => (
  <section className="bg-surface py-12 sm:py-14">
    <Container className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Dự án đã thực hiện</p>
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">Một số dự án liên quan</h2>
          <p className="text-sm text-gray-600">Thiết kế website doanh nghiệp, landing và giải pháp theo yêu cầu.</p>
        </div>
        <Button variant="secondary" asChild>
          <Link href="/du-an">Xem tất cả dự án</Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.title} className="flex h-full flex-col gap-3 rounded-[24px] p-5 shadow-soft">
            <ImagePlaceholder aspect="aspect-[4/3]" label="Dự án" />
            <p className="text-xs uppercase tracking-wide text-brand-700">Dự án</p>
            <h3 className="text-lg font-bold text-ink">{project.title}</h3>
            <p className="text-sm text-gray-600">{project.description}</p>
            <p className="text-xs font-semibold text-gray-500">Năm: {project.year}</p>
            <div className="mt-auto pt-2">
              <Link href={project.href} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                Xem dự án <ArrowUpRight size={16} />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  </section>
);

export default ProjectShowcase;
