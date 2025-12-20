import type { Metadata } from 'next';
import { Facebook, Mail, MessageCircle, PhoneCall } from 'lucide-react';
import CTASection from '../../components/ui/CTASection';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import { siteConfig } from '../../site.config';

export const metadata: Metadata = {
  title: 'Liên hệ',
  description: 'Kết nối để nhận tư vấn thiết kế website, tối ưu SEO và chuyển đổi.',
};

const contacts = [
  { title: 'Số điện thoại', value: siteConfig.phone, action: 'Gọi ngay', icon: PhoneCall, href: `tel:${siteConfig.phone.replace(/\s/g, '')}` },
  { title: 'Zalo', value: siteConfig.zalo, action: 'Chat ngay', icon: MessageCircle, href: siteConfig.zalo },
  { title: 'Email', value: siteConfig.email, action: 'Gửi tin nhắn', icon: Mail, href: `mailto:${siteConfig.email}` },
  { title: 'Facebook', value: siteConfig.facebook, action: 'Kết nối', icon: Facebook, href: siteConfig.facebook },
];

export default function ContactPage() {
  return (
    <>
      <section className="py-12">
        <Container>
          <SectionHeading
            eyebrow="Liên hệ"
            title="Kết nối để triển khai nhanh"
            description="Gọi điện, chat Zalo hoặc gửi email. Chúng tôi phản hồi trong 24h."
          />
        </Container>
      </section>
      <section className="bg-white/70 py-10">
        <Container className="grid gap-6 md:grid-cols-2">
          {contacts.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="flex items-center justify-between gap-4 p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">{item.title}</p>
                    <p className="text-base font-bold text-ink break-all">{item.value}</p>
                  </div>
                </div>
                <Button variant="secondary" asChild>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.action}
                  </a>
                </Button>
              </Card>
            );
          })}
        </Container>
      </section>
      <CTASection />
    </>
  );
}
