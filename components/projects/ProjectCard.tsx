import Link from 'next/link';
import { ArrowUpRight, Calendar } from 'lucide-react';
import Card from '../ui/Card';
import ImagePlaceholder from '../ui/ImagePlaceholder';
import Button from '../ui/Button';
import type { Project } from '../../data/projects';

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => (
  <Card className="flex h-full flex-col gap-4 rounded-3xl p-5 transition duration-200 hover:-translate-y-1.5 hover:shadow-soft">
    <ImagePlaceholder label="Preview" aspect="aspect-[4/3]" />
    <div className="flex items-center justify-between">
      <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">Dự án</span>
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600">
        <Calendar size={14} />
        {project.year}
      </span>
    </div>
    <h3 className="text-lg font-bold text-ink">{project.title}</h3>
    <p className="text-sm text-gray-600">{project.description}</p>
    <p className="text-xs font-semibold text-gray-500">Khách hàng: {project.client}</p>
    <div className="mt-auto flex items-center justify-between pt-2">
      <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wide text-brand-700">
        {project.categories.slice(0, 2).map((cat) => (
          <span key={cat} className="rounded-full bg-brand-50 px-2 py-1">
            {cat}
          </span>
        ))}
      </div>
      <Button variant="ghost" size="sm" className="text-brand-700 hover:text-brand-800" icon={<ArrowUpRight size={16} />} asChild>
        <Link href={`/du-an/${project.slug}`}>Xem dự án</Link>
      </Button>
    </div>
  </Card>
);

export default ProjectCard;
