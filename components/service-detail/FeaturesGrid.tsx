import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
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
          <Card key={feature.title} className="flex h-full flex-col overflow-hidden rounded-[24px] p-0 shadow-card">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-50">
              {feature.icon ? (
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  fill
                  sizes="(min-width: 1280px) 360px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-brand-600">
                  <CheckCircle size={32} />
                </span>
              )}
            </div>
            <div className="space-y-2 px-5 pb-5 pt-4">
              <h3 className="text-xl font-extrabold text-ink">{feature.title}</h3>
              <p className="text-base text-gray-600">{feature.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  </section>
);

export default FeaturesGrid;
