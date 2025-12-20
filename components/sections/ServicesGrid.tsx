'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { services } from '../../data/services';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';

type Props = {
  withHeading?: boolean;
};

const ServicesGrid = ({ withHeading = true }: Props) => (
  <section id="dich-vu" className="scroll-mt-24 bg-white/60 py-16">
    <Container>
      {withHeading && (
        <SectionHeading
          eyebrow="Dịch vụ cung cấp"
          title="Thiết kế & phát triển website tối ưu chuyển đổi"
          description="4 gói dịch vụ tập trung kết quả và tốc độ triển khai, giữ trải nghiệm thống nhất trên mọi thiết bị."
        />
      )}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.06, duration: 0.3 }}
          >
            <Card className="group flex h-full flex-col gap-4 rounded-3xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-brand-600">{service.id}</p>
                  <h3 className="mt-1 text-xl font-extrabold text-ink">{service.title}</h3>
                </div>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  Tìm hiểu thêm
                </span>
              </div>
              <p className="text-sm text-gray-600">{service.description}</p>
              <ul className="space-y-2 text-sm text-gray-700">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex justify-end">
                <Button variant="outline" size="md" className="group-hover:border-brand-400 group-hover:text-brand-700" asChild>
                  <Link href={service.href}>
                    Tìm hiểu thêm <ArrowUpRight size={16} />
                  </Link>
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Container>
  </section>
);

export default ServicesGrid;
