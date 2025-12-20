'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ProjectsFilters from './ProjectsFilters';
import ProjectsGrid from './ProjectsGrid';
import ProjectsPagination from './ProjectsPagination';
import CTAConsult from '../common/CTAConsult';
import SocialConnect from '../common/SocialConnect';
import Container from '../ui/Container';
import Card from '../ui/Card';
import Button from '../ui/Button';
import type { Project } from '../../data/projects';
import { projectCategories } from '../../data/projectCategories';

type Props = {
  projects: Project[];
};

const PER_PAGE = 12;

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const filterSlugToLabel = (slug: string) => {
  const found = projectCategories.find((cat) => slugify(cat) === slug);
  return found ?? 'Bán hàng';
};

const ProjectsListing = ({ projects }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filterParam = searchParams.get('e-filter-3a275c0-the-loai') ?? 'ban-hang';
  const pageParam = Number(searchParams.get('e-page-3a275c0') ?? '1');

  const activeLabel = filterSlugToLabel(filterParam);

  const filtered = useMemo(() => {
    if (activeLabel === 'All') return projects;
    return projects.filter((p) => p.categories.includes(activeLabel));
  }, [activeLabel, projects]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(Math.max(1, pageParam || 1), totalPages);
  const start = (currentPage - 1) * PER_PAGE;
  const paginated = filtered.slice(start, start + PER_PAGE);

  const updateSearch = (filterSlug: string, page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('e-filter-3a275c0-the-loai', filterSlug);
    params.set('e-page-3a275c0', String(page));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleFilterChange = (label: string) => {
    updateSearch(slugify(label), 1);
  };

  const handlePageChange = (page: number) => {
    updateSearch(filterParam, page);
  };

  return (
    <div className="bg-surface">
      <ProjectsFilters categories={projectCategories} active={activeLabel} setActive={handleFilterChange} />
      <ProjectsGrid projects={paginated} />
      <section className="pb-10 pt-4">
        <Container>
          <ProjectsPagination current={currentPage} total={totalPages} onChange={handlePageChange} />
        </Container>
      </section>
      <CTAConsult anchorId="contact" />
      <section className="pb-12">
        <Container>
          <Card className="flex flex-col gap-3 rounded-3xl bg-gradient-to-r from-brand-50 to-white p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-brand-700">Cùng xây dựng website</p>
              <p className="text-lg font-bold text-ink">Tập trung chuyển đổi, tốc độ và SEO chuẩn mực</p>
              <p className="text-sm text-gray-600">
                Chia sẻ bối cảnh hiện tại, chúng tôi đề xuất lộ trình triển khai rõ ràng và nhanh gọn.
              </p>
            </div>
            <Button variant="primary" size="lg" asChild>
              <a href="https://example.com" target="_blank" rel="noreferrer">
                Bắt đầu trao đổi
              </a>
            </Button>
          </Card>
        </Container>
      </section>
      <SocialConnect />
    </div>
  );
};

export default ProjectsListing;
