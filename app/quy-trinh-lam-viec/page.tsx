import type { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';
import CTASection from '../../components/ui/CTASection';
import Card from '../../components/ui/Card';
import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import { workflowSteps } from '../../data/workflow';

export const metadata: Metadata = {
  title: 'Quy trình làm việc',
  description: '5 bước triển khai thiết kế website: tiếp nhận, phân tích, thiết kế, kiểm thử, bàn giao.',
};

export default function WorkflowPage() {
  return (
    <>
      <section className="py-12">
        <Container>
          <SectionHeading
            eyebrow="Quy trình"
            title="5 bước mà tôi thực hiện"
            description="Từ discovery, thiết kế, phát triển tới bàn giao - đảm bảo rõ ràng từng giai đoạn."
          />
        </Container>
      </section>
      <section className="bg-white/70 py-10">
        <Container className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {workflowSteps.map((step) => (
            <Card key={step.id} className="flex flex-col gap-3 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-sm font-extrabold text-brand-700">
                  {step.id}
                </span>
                <h3 className="text-lg font-bold text-ink">{step.title}</h3>
              </div>
              <ul className="space-y-1 text-sm text-gray-600">
                {step.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <ChevronRight size={14} className="text-brand-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </Container>
      </section>
      <CTASection />
    </>
  );
}
