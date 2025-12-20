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
              <span className="text-lg font-extrabold">{siteConfig.brandName.split(' ')[0] ?? 'BR'}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-700">{siteConfig.brandName}</p>
              <p className="text-xs text-gray-500">Tư vấn phát triển website.</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Thiết kế website, tối ưu SEO và chuyển đổi. Đồng hành từ discovery đến bàn giao.
          </p>
          <div className="flex items-center gap-3">
            {[{ icon: Linkedin, href: siteConfig.facebook }, { icon: Facebook, href: siteConfig.facebook }, { icon: Clapperboard, href: siteConfig.tiktok }].map(
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
      </Container>
      <div className="border-t border-gray-100 bg-white/60">
        <Container className="flex flex-col items-center justify-between gap-4 py-4 text-xs text-gray-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link className="hover:text-brand-700 hover:underline" href="https://example.com">
              Privacy
            </Link>
            <Link className="hover:text-brand-700 hover:underline" href="https://example.com">
              Terms
            </Link>
            <Link className="hover:text-brand-700 hover:underline" href="https://example.com">
              Cookies
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
