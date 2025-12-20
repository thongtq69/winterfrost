import type { Metadata } from 'next';
import CTASection from '../../components/ui/CTASection';
import Card from '../../components/ui/Card';
import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import ImagePlaceholder from '../../components/ui/ImagePlaceholder';

export const metadata: Metadata = {
  title: 'Tiktok',
  description: 'Kênh Tiktok chia sẻ mẹo thiết kế website và SEO.',
};

export default function TiktokPage() {
  return (
    <>
      <section className="py-12">
        <Container>
          <SectionHeading
            eyebrow="Tiktok"
            title="Nội dung Tiktok"
            description="Video ngắn về thiết kế website, SEO và tips tối ưu chuyển đổi."
          />
        </Container>
      </section>
      <section className="bg-white/70 py-10">
        <Container>
          <Card className="p-6">
            <ImagePlaceholder aspect="aspect-video" label="Tiktok feed placeholder" />
            <p className="mt-3 text-sm text-gray-600">
              Follow kênh Tiktok để nhận video cập nhật mỗi tuần. Liên kết chỉ là placeholder.
            </p>
          </Card>
        </Container>
      </section>
      <CTASection />
    </>
  );
}
