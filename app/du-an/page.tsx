import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProjectsHero from '../../components/projects/ProjectsHero';
import ProjectsListing from '../../components/projects/ProjectsListing';
import { projects } from '../../data/projects';

export const metadata: Metadata = {
  title: 'Dự án đã hoàn thành',
  description: 'Dự án thiết kế website, landing page, doanh nghiệp và yêu cầu custom.',
};

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
