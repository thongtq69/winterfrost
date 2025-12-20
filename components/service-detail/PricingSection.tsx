import Button from '../ui/Button';
import Card from '../ui/Card';
import Container from '../ui/Container';
import Badge from '../ui/Badge';
import type { PricingPlan } from '../../src/data/services';

type Props = {
  plans: PricingPlan[];
};

const PricingSection = ({ plans }: Props) => (
  <section id="pricing" className="bg-surface py-12 sm:py-14">
    <Container className="space-y-8">
      <div className="space-y-3 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Bảng giá thiết kế</p>
        <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">Chọn gói phù hợp cho doanh nghiệp</h2>
        <p className="text-base text-gray-600">Triển khai nhanh, chuẩn SEO và tối ưu chuyển đổi.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className="relative flex h-full flex-col gap-4 rounded-[28px] bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-soft"
          >
            {plan.popular && <Badge className="absolute right-5 top-5 bg-brand-50 text-brand-700">Phổ biến</Badge>}
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-ink">{plan.name}</h3>
              <p className="text-2xl font-extrabold text-brand-700">{plan.price}</p>
              {plan.description && <p className="text-sm text-gray-600">{plan.description}</p>}
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-brand-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Button fullWidth asChild>
                <a href="/lien-he">Liên hệ tư vấn</a>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  </section>
);

export default PricingSection;
