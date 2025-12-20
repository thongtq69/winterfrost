import Container from '../ui/Container';
import type { Project } from '../../data/projects';
import ProjectCard from './ProjectCard';

type Props = {
  projects: Project[];
};

const ProjectsGrid = ({ projects }: Props) => (
  <section className="py-8">
    <Container>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Container>
  </section>
);

export default ProjectsGrid;
