import type { Metadata } from 'next';
import { Download } from 'lucide-react';
import CTASection from '../../components/ui/CTASection';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import { resourceBlocks } from '../../data/resources';

export const metadata: Metadata = {
  title: 'Tài nguyên',
  description: 'Kho tài nguyên theme, plugin và mẫu website WordPress.',
};

export default function ResourcesPage() {
  return (
    <>
      <section className="py-12">
        <Container>
          <SectionHeading
            eyebrow="Tài nguyên"
            title="Kho tài nguyên"
            description="Theme, plugin và mẫu website WordPress giúp bạn triển khai nhanh."
          />
        </Container>
      </section>
      <section className="bg-white/70 py-10">
        <Container className="grid gap-6 md:grid-cols-2">
          {resourceBlocks.map((block) => (
            <Card key={block.id} className="flex flex-col gap-3 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-sm font-extrabold text-brand-700">
                  {block.id}
                </span>
                <h3 className="text-lg font-bold text-ink">{block.title}</h3>
              </div>
              <ul className="space-y-1 text-sm text-gray-600">
                {block.bullets.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <Button variant="outline" icon={<Download size={16} />} asChild>
                  <a href="https://example.com">Tải xuống</a>
                </Button>
              </div>
            </Card>
          ))}
        </Container>
      </section>
      <CTASection />
    </>
  );
}
