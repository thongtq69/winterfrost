'use client';

import { useMemo, useState } from 'react';
import ProjectsFilters from './ProjectsFilters';
import ProjectsGrid from './ProjectsGrid';
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

const ProjectsShowcase = ({ projects }: Props) => {
  const [active, setActive] = useState('All');

  const filtered = useMemo(() => {
    if (active === 'All') return projects;
    return projects.filter((p) => p.categories.includes(active));
  }, [active, projects]);

  const orderedCats = [...projectCategories];

  return (
    <div className="bg-surface">
      <ProjectsFilters categories={orderedCats} active={active} setActive={setActive} />
      <ProjectsGrid projects={filtered} />
      <CTAConsult />
      <section className="pb-12 pt-6">
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

export default ProjectsShowcase;
