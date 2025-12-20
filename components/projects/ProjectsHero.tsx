import Container from '../ui/Container';
import Badge from '../ui/Badge';

const ProjectsHero = () => (
  <section className="bg-white/70 pb-10 pt-14">
    <Container className="space-y-4">
      <Badge className="bg-brand-50 text-brand-700">Dự án</Badge>
      <div className="space-y-3">
        <h1 className="text-4xl font-extrabold leading-tight text-ink sm:text-5xl">Dự án đã hoàn thành</h1>
        <p className="max-w-3xl text-base text-gray-600">
          Danh sách dự án thiết kế website, landing page và giải pháp theo yêu cầu. Tập trung tốc độ triển khai, chuẩn
          SEO và tối ưu chuyển đổi.
        </p>
        <p className="text-sm font-semibold text-brand-700">+69 doanh nghiệp đã tin tưởng hợp tác</p>
      </div>
    </Container>
  </section>
);

export default ProjectsHero;
