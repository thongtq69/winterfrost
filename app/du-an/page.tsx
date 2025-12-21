import { Suspense } from 'react';
import ProjectsHero from '../../components/projects/ProjectsHero';
import ProjectsListing from '../../components/projects/ProjectsListing';
import { projects } from '../../data/projects';
import { projectsPageMetadata } from '@lib/seo';

export const metadata = projectsPageMetadata;

export default function ProjectsPage() {
  return (
    <>
      <ProjectsHero />
      <Suspense fallback={<div className="py-10 text-center text-sm text-gray-600">Đang tải danh sách dự án...</div>}>
        <ProjectsListing projects={projects} />
      </Suspense>
    </>
  );
}
