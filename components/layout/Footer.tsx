import Link from 'next/link';
import { Clapperboard, Facebook, Linkedin } from 'lucide-react';
import Container from '../ui/Container';
import { navItems } from '../../data/nav';
import { siteConfig } from '../../site.config';

const Footer = () => {
  const columns = [
    {
      title: 'Khám phá',
      items: navItems.slice(0, 3),
    },
    {
      title: 'Tài nguyên',
      items: navItems.slice(3),
    },
  ];

  return (
    <footer className="border-t border-gray-100 bg-white/90">
      <Container className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-card">
              <span className="text-lg font-extrabold">{siteConfig.brand.name.split(' ')[0] ?? 'WF'}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-700">{siteConfig.brand.name}</p>
              <p className="text-xs text-gray-500">{siteConfig.brand.tagline}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">{siteConfig.brand.description}</p>
          <div className="flex items-center gap-3">
            {[{ icon: Linkedin, href: siteConfig.links.linkedin }, { icon: Facebook, href: siteConfig.links.facebook }, { icon: Clapperboard, href: siteConfig.links.tiktok }].map(
              ({ icon: Icon, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:-translate-y-0.5 hover:bg-brand-50 hover:text-brand-700 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
                >
                  <Icon size={18} />
                </Link>
              ),
            )}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-800">{col.title}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {col.items.map((item) => (
                <li key={item.label}>
                  <Link className="transition hover:text-brand-700 hover:underline" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-800">Liên hệ</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p>Phone: <Link href={`tel:${siteConfig.contact.phoneTel}`} className="hover:text-brand-700 hover:underline">{siteConfig.contact.phoneDisplay}</Link></p>
            <p>Email: <Link href={`mailto:${siteConfig.contact.email}`} className="hover:text-brand-700 hover:underline">{siteConfig.contact.email}</Link></p>
            <p>Địa chỉ: {siteConfig.contact.address}</p>
            <p>Hỗ trợ: {siteConfig.contact.onlineSupport}</p>
            <p>Giờ làm việc: {siteConfig.contact.officeHours}</p>
          </div>
        </div>
      </Container>
      <div className="border-t border-gray-100 bg-white/60">
        <Container className="flex flex-col items-center justify-between gap-4 py-4 text-xs text-gray-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.brand.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link className="hover:text-brand-700 hover:underline" href={siteConfig.legal.privacyHref}>
              Privacy
            </Link>
            <Link className="hover:text-brand-700 hover:underline" href={siteConfig.legal.termsHref}>
              Terms
            </Link>
            <span className="text-gray-400">Support {siteConfig.contact.onlineSupport}</span>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
