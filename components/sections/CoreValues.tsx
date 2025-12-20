'use client';

import { motion } from 'framer-motion';
import { Activity, ChartBar, Compass } from 'lucide-react';
import Card from '../ui/Card';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';

const values = [
  {
    title: 'Theo dõi hành vi khách hàng',
    description: 'Tracking đầy đủ hành trình để tối ưu chuyển đổi và nội dung.',
    icon: ChartBar,
  },
  {
    title: 'Xác định nhóm khách hàng',
    description: 'Rõ chân dung, nhu cầu và ngôn ngữ để website chạm đúng insight.',
    icon: Compass,
  },
  {
    title: 'Đánh giá hiệu quả website',
    description: 'Đo lường tốc độ, SEO và form lead để cải thiện liên tục.',
    icon: Activity,
  },
];

const CoreValues = () => (
  <section id="gia-tri-cot-loi" className="scroll-mt-24 py-14">
    <Container>
      <SectionHeading
        eyebrow="Giá trị cốt lõi"
        title="Tập trung insight, tốc độ và đo lường"
        description="Website không chỉ đẹp mà phải hỗ trợ kinh doanh. Chúng tôi giữ mọi thứ rõ ràng, có số liệu."
      />
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {values.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Card className="h-full p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                  <Icon size={20} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-ink">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Container>
  </section>
);

export default CoreValues;
