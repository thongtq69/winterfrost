'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, PhoneCall, X } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { navItems, type DropdownItem, type NavItem } from '../../data/nav';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Container from '../ui/Container';
import { siteConfig } from '../../site.config';

type AnyNav = NavItem | DropdownItem;

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
      if (mobileOpen && drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const dropdownMotion = useMemo(
    () => ({
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.18 } },
      exit: { opacity: 0, y: 8, transition: { duration: 0.15 } },
    }),
    [],
  );

  const handleNav = (_item: AnyNav, closeAfter?: boolean) => {
    setOpenDropdown(null);
    if (closeAfter) setMobileOpen(false);
  };

  return (
    <header
      className={clsx(
        'sticky top-0 z-40 border-b border-white/20 transition',
        scrolled ? 'bg-white/90 shadow-ring backdrop-blur-xl' : 'bg-white/70 backdrop-blur-md',
      )}
      aria-label="Thanh điều hướng chính"
    >
      <div ref={navRef}>
        <Container className="flex items-center justify-between gap-6 py-4 lg:py-5">
          <Link href="/" className="inline-flex items-center gap-3 focus-outline" aria-label="Trang chủ">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-white shadow-ring ring-1 ring-gray-100">
              {siteConfig.assets.markPath ? (
                <img src={siteConfig.assets.markPath} alt={siteConfig.brand.name} className="h-12 w-12 object-contain" />
              ) : (
                <span className="text-lg font-extrabold text-brand-600">{siteConfig.brand.name.split(' ')[0] ?? 'WF'}</span>
              )}
            </div>
            <div className="hidden sm:block">
              <p className="text-base font-semibold text-brand-700">{siteConfig.brand.name}</p>
              <p className="text-sm text-gray-500">{siteConfig.brand.tagline}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => {
              const hasDropdown = !!item.dropdown?.length;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasDropdown && setOpenDropdown(item.label)}
                  onMouseLeave={() => hasDropdown && setOpenDropdown(null)}
                  onFocus={() => hasDropdown && setOpenDropdown(item.label)}
                >
                  {hasDropdown ? (
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={openDropdown === item.label}
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      className={clsx(
                        'group inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold transition',
                        openDropdown === item.label ? 'bg-white text-brand-700 shadow-card' : 'text-gray-700 hover:bg-white',
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={clsx(
                          'transition duration-200',
                          openDropdown === item.label
                            ? 'rotate-180 text-brand-600'
                            : 'text-gray-400 group-hover:text-brand-600',
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => handleNav(item)}
                      className="rounded-full px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-white hover:text-brand-700 focus-outline"
                    >
                      {item.label}
                    </Link>
                  )}

                  <AnimatePresence>
                    {hasDropdown && openDropdown === item.label && (
                      <motion.div
                        {...dropdownMotion}
                        className="absolute left-0 mt-2 w-72 rounded-2xl border border-gray-100 bg-white/95 p-3 shadow-soft"
                        role="menu"
                      >
                        <ul className="space-y-1">
                          {item.dropdown?.map((child) => (
                            <li key={child.label}>
                              <Link
                                href={child.href}
                                onClick={() => handleNav(child)}
                                className="group flex w-full flex-col gap-1 rounded-xl px-3 py-2 text-left transition hover:bg-brand-50 focus-outline"
                                role="menuitem"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-semibold text-ink">{child.label}</span>
                                  <ChevronDown
                                    size={14}
                                    className="translate-y-[1px] rotate-[-90deg] text-gray-300 transition group-hover:text-brand-500"
                                  />
                                </div>
                                {child.description && (
                                  <span className="text-xs text-gray-500">{child.description}</span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Badge className="bg-brand-50 text-brand-700">{siteConfig.cta.secondaryText}</Badge>
            <Button size="lg" icon={<PhoneCall size={18} />} asChild>
              <Link href={siteConfig.cta.primaryHref}>{siteConfig.cta.primaryText}</Link>
            </Button>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <Button
              size="sm"
              variant="secondary"
              className="hidden sm:inline-flex"
              asChild
              onClick={() => handleNav({ href: '/lien-he', label: 'Liên hệ' })}
            >
              <Link href="/lien-he">Liên hệ</Link>
            </Button>
            <button
              type="button"
              aria-label="Mở menu"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-card ring-1 ring-gray-100 focus-outline"
              onClick={() => setMobileOpen(true)}
            >
              <Menu />
            </button>
          </div>
        </Container>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              ref={drawerRef}
              className="absolute right-0 top-0 h-full w-[78%] max-w-sm overflow-y-auto rounded-l-3xl bg-white p-6 shadow-soft"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              aria-modal="true"
              role="dialog"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-brand-700">{siteConfig.brand.name}</p>
                  <p className="text-xs text-gray-500">{siteConfig.brand.tagline}</p>
                </div>
                <button
                  type="button"
                  aria-label="Đóng menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-ink focus-outline"
                  onClick={() => setMobileOpen(false)}
                >
                  <X />
                </button>
              </div>
              <div className="space-y-4">
                {navItems.map((item) => (
                  <div key={item.label} className="space-y-2">
                    <Link
                      href={item.href}
                      onClick={() => handleNav(item, true)}
                      className="flex w-full items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-left text-base font-semibold text-ink focus-outline"
                    >
                      <span>{item.label}</span>
                      {item.dropdown && <ChevronDown size={16} className="text-gray-400" />}
                    </Link>
                    {item.dropdown && (
                      <div className="space-y-1 rounded-2xl bg-white px-2">
                        {item.dropdown.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => handleNav(child, true)}
                            className="flex w-full flex-col rounded-xl px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-brand-50 focus-outline"
                          >
                            <span className="font-semibold text-ink">{child.label}</span>
                            {child.description && <span className="text-xs text-gray-500">{child.description}</span>}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-3">
                <Button className="w-full" size="lg" icon={<PhoneCall size={18} />} asChild>
                  <Link href={siteConfig.cta.primaryHref}>{siteConfig.cta.primaryText}</Link>
                </Button>
                <Badge className="bg-brand-50 text-center text-brand-700">Ưu tiên phản hồi {siteConfig.contact.onlineSupport}</Badge>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
