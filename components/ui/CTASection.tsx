import { MessageCircle, PhoneCall } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '../../site.config';
import { telHref } from '../../src/lib/format';
import Button from './Button';
import Card from './Card';
import Container from './Container';

type CTASectionProps = {
  title?: string;
  description?: string;
};

const CTASection = ({
  title = 'Cùng thảo luận mục tiêu website của bạn',
  description = 'Chia sẻ yêu cầu, chúng tôi đề xuất lộ trình tối ưu trong 24h.',
}: CTASectionProps) => (
  <section className="py-14">
    <Container>
      <Card className="flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-brand-600 via-brand-600 to-brand-500 p-6 text-white lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-white/70">{siteConfig.brand.name}</p>
          <h3 className="mt-1 text-2xl font-extrabold">{title}</h3>
          <p className="mt-2 text-sm text-white/80">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            variant="secondary"
            size="lg"
            className="bg-white text-brand-700 hover:-translate-y-0.5"
            icon={<MessageCircle size={18} />}
            asChild
          >
            <Link href={siteConfig.links.zalo}>{siteConfig.cta.zaloText}</Link>
          </Button>
          <Button variant="ghost" size="lg" className="text-white hover:bg-white/10" icon={<PhoneCall size={18} />} asChild>
            <Link href={telHref(siteConfig.contact.phoneTel)}>{siteConfig.cta.primaryText}</Link>
          </Button>
        </div>
      </Card>
    </Container>
  </section>
);

export default CTASection;
