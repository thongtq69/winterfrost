'use client';

import Chip from '../ui/Chip';
import Container from '../ui/Container';

type Props = {
  categories: string[];
  active: string;
  setActive: (value: string) => void;
};

const ProjectsFilters = ({ categories, active, setActive }: Props) => (
  <section className="py-4">
    <Container>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Bộ lọc dự án">
        {categories.map((cat) => (
          <Chip
            key={cat}
            active={cat === active}
            onClick={() => setActive(cat)}
            aria-pressed={cat === active}
            type="button"
          >
            {cat}
          </Chip>
        ))}
      </div>
    </Container>
  </section>
);

export default ProjectsFilters;
