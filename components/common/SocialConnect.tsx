import { Facebook, Linkedin, Youtube } from 'lucide-react';
import Link from 'next/link';
import Card from '../ui/Card';
import Container from '../ui/Container';
import { siteConfig } from '../../site.config';

const SocialConnect = () => (
  <section className="pb-14 pt-4">
    <Container className="space-y-4">
      <h3 className="text-xl font-extrabold text-ink">Kết nối qua các mạng xã hội</h3>
      <Card className="flex flex-wrap items-center gap-3 rounded-3xl p-5">
        {[{ icon: Linkedin, label: 'LinkedIn', href: siteConfig.links.linkedin }, { icon: Facebook, label: 'Facebook', href: siteConfig.links.facebook }, { icon: Youtube, label: 'YouTube', href: siteConfig.links.youtube }].map(
          ({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 text-gray-700 ring-1 ring-gray-100 transition hover:-translate-y-0.5 hover:bg-brand-50 hover:text-brand-700 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
              aria-label={label}
            >
              <Icon size={20} />
            </Link>
          ),
        )}
      </Card>
    </Container>
  </section>
);

export default SocialConnect;
