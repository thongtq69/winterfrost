import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Container from '../ui/Container';
import ImagePlaceholder from '../ui/ImagePlaceholder';
import type { ServiceDetail } from '../../src/data/services';
import { siteConfig } from '../../site.config';

type Props = {
  service: ServiceDetail;
};

const ServiceHero = ({ service }: Props) => (
  <section className="relative overflow-hidden bg-white pb-14 pt-8 sm:pt-10 lg:pt-12">
    <Container className="grid items-start gap-10 lg:grid-cols-[1.05fr,1fr]">
      <div className="space-y-6">
        <Badge className="bg-white shadow-card text-brand-700">{siteConfig.brand.name} / Dịch vụ</Badge>
        <h1 className="text-4xl font-extrabold leading-tight text-ink sm:text-5xl lg:text-[52px]">{service.title}</h1>
        <p className="text-lg text-gray-600">{service.subtitle}</p>
        <Card className="space-y-3 rounded-3xl bg-white/80 p-5 shadow-card">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Bạn nhận được</p>
          <ul className="grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
            {service.bullets.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-brand-500" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg" icon={<ArrowRight size={18} />} asChild>
            <Link href={service.primaryCta.href}>{service.primaryCta.label}</Link>
          </Button>
          <Button size="lg" variant="secondary" className="border border-gray-100" asChild>
            <Link href={service.secondaryCta.href}>{service.secondaryCta.label}</Link>
          </Button>
        </div>
      </div>

      <div className="relative w-full max-w-[780px] lg:max-w-[840px] lg:justify-self-end">
        <div className="overflow-hidden rounded-[32px] bg-gradient-to-br from-ink via-ink/90 to-brand-900 shadow-soft">
          <div className="relative aspect-[16/10]">
            <ImagePlaceholder aspect="aspect-[16/10]" label="Media" className="h-full w-full" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/25" />
            <div className="absolute left-5 top-5 rounded-2xl bg-white/85 px-4 py-2 text-xs font-semibold text-ink shadow-card">
              {siteConfig.brand.name} • Workshop • Mentoring
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

export default ServiceHero;
