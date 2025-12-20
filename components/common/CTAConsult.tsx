import { MessageCircle, PhoneCall } from 'lucide-react';
import Link from 'next/link';
import Card from '../ui/Card';
import Container from '../ui/Container';
import Button from '../ui/Button';

type Props = {
  anchorId?: string;
};

const CTAConsult = ({ anchorId }: Props) => (
  <section className="py-10" id={anchorId}>
    <Container>
      <Card className="flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-brand-600 via-brand-600 to-brand-500 p-6 text-white md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-white/70">Nhận tư vấn</p>
          <h3 className="text-2xl font-extrabold">Cần hỗ trợ dự án website?</h3>
          <p className="text-sm text-white/80">
            Chat nhanh để trao đổi nhu cầu, chúng tôi phản hồi trong 24h với lộ trình rõ ràng.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button variant="secondary" size="lg" className="bg-white text-brand-700 hover:-translate-y-0.5" icon={<MessageCircle size={18} />} asChild>
            <Link href="https://example.com">Chat Zalo ngay</Link>
          </Button>
          <Button variant="ghost" size="lg" className="text-white hover:bg-white/10" icon={<PhoneCall size={18} />} asChild>
            <Link href="/lien-he">Gọi lịch nhanh</Link>
          </Button>
        </div>
      </Card>
    </Container>
  </section>
);

export default CTAConsult;
