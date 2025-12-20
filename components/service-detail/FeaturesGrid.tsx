import { CheckCircle } from 'lucide-react';
import Container from '../ui/Container';
import Card from '../ui/Card';
import type { ServiceFeature } from '../../src/data/services';

type Props = {
  features: ServiceFeature[];
};

const FeaturesGrid = ({ features }: Props) => (
  <section className="bg-white py-12 sm:py-14">
    <Container className="space-y-6">
      <div className="space-y-2 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Tính năng & lợi ích</p>
        <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">Điểm mạnh khi triển khai</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="flex h-full flex-col gap-3 rounded-[24px] p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
              <CheckCircle size={20} />
            </span>
            <h3 className="text-lg font-bold text-ink">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </Card>
        ))}
      </div>
    </Container>
  </section>
);

export default FeaturesGrid;
