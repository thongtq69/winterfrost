'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, Home, Mail, Menu, MessageCircle, PhoneCall, Facebook } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { siteConfig } from '../../site.config';
import { mailHref, telHref } from '../../src/lib/format';

const FloatingActions = () => {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const actions = [
    { label: 'Menu', icon: <Menu size={18} />, onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: 'Home', icon: <Home size={18} />, href: '/' },
    { label: 'Gọi điện', icon: <PhoneCall size={18} />, href: telHref(siteConfig.contact.phoneTel) },
    { label: siteConfig.cta.zaloText, icon: <MessageCircle size={18} />, href: siteConfig.links.zalo },
    { label: 'Email', icon: <Mail size={18} />, href: mailHref(siteConfig.contact.email) },
    { label: 'Facebook', icon: <Facebook size={18} />, href: siteConfig.links.facebook },
    { label: 'Lên đầu trang', icon: <ArrowUp size={18} />, onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
  ];

  return (
    <div className="pointer-events-none fixed bottom-6 right-4 z-40 md:right-8">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="pointer-events-auto"
          >
            <div className="hidden flex-col items-end gap-2 md:flex">
              {actions.map((action) => {
                if (action.href) {
                  return (
                    <Link
                      key={action.label}
                      href={action.href}
                      className="group inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-card ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-soft focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                        {action.icon}
                      </span>
                      {action.label}
                    </Link>
                  );
                }
                return (
                  <button
                    key={action.label}
                    type="button"
                    onClick={action.onClick}
                    className="group inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-card ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-soft focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                      {action.icon}
                    </span>
                    {action.label}
                  </button>
                );
              })}
            </div>

            <div className="md:hidden">
              <Button
                variant="primary"
                size="lg"
                icon={<Menu size={18} />}
                className="floating"
                onClick={() => setExpanded((prev) => !prev)}
              >
                Menu
              </Button>
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-2 space-y-2"
                  >
                    {actions.map((action) =>
                      action.href ? (
                        <Link
                          key={action.label}
                          href={action.href}
                          className="flex w-full items-center gap-3 rounded-2xl bg-white px-4 py-3 text-left text-sm font-semibold text-ink shadow-card ring-1 ring-gray-100 transition hover:shadow-soft focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
                          onClickCapture={() => setExpanded(false)}
                        >
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                            {action.icon}
                          </span>
                          {action.label}
                        </Link>
                      ) : (
                        <button
                          key={action.label}
                          type="button"
                          onClick={() => {
                            action.onClick?.();
                            setExpanded(false);
                          }}
                          className="flex w-full items-center gap-3 rounded-2xl bg-white px-4 py-3 text-left text-sm font-semibold text-ink shadow-card ring-1 ring-gray-100 transition hover:shadow-soft focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
                        >
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                            {action.icon}
                          </span>
                          {action.label}
                        </button>
                      ),
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingActions;
