'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Quote } from 'lucide-react';
import Link from 'next/link';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Container from '../ui/Container';
import { siteConfig } from '../../site.config';
import HeroMedia from '../hero/HeroMedia';

const stats = [
  { label: 'Dự án hoàn thành', value: '+86' },
  { label: 'Doanh nghiệp đồng hành', value: '+69' },
  { label: 'Năm kinh nghiệm', value: '10+' },
];

const HomeHero = () => (
  <section className="relative overflow-hidden pb-12 pt-2 sm:pt-4 lg:pt-6" id="hero">
    <Container className="relative grid items-start gap-8 lg:grid-cols-2 lg:items-start">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
        <Badge className="bg-white shadow-card text-brand-700">{siteConfig.brand.name} / {siteConfig.brand.tagline}</Badge>
        <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[52px]">
          Thiết kế website tối ưu chuyển đổi & chuẩn SEO
        </h1>
        <p className="text-lg text-gray-600">
          Chúng tôi thiết kế và triển khai website theo hành trình khách hàng, tối ưu tốc độ, tracking và nội dung để
          bạn tăng trưởng bền vững.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="lg" icon={<ArrowRight size={18} />} asChild>
            <Link href="/lien-he">Liên hệ ngay</Link>
          </Button>
          <Button size="lg" variant="secondary" className="border border-gray-100" asChild>
            <Link href="/du-an">Xem dự án</Link>
          </Button>
          <div className="flex items-center gap-3 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-gray-700 shadow-card">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-700">
              <Quote size={16} />
            </span>
            “Tập trung vào kết quả & tốc độ triển khai”
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white/80 p-4 shadow-card sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-1 rounded-xl bg-gray-50/60 p-3">
              <p className="text-2xl font-extrabold text-ink">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative flex justify-center lg:justify-end lg:self-start"
      >
        <div className="relative w-full max-w-[780px] lg:max-w-[820px] lg:max-h-[520px] overflow-hidden rounded-[32px]">
          <HeroMedia className="h-full" />
          <div className="absolute left-4 top-4 rounded-2xl bg-white/90 px-3 py-2 text-xs font-semibold text-ink shadow-card backdrop-blur">
            {siteConfig.brand.name} • Workshop • Mentoring
          </div>
        </div>
      </motion.div>
    </Container>
  </section>
);

export default HomeHero;
