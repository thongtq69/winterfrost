import clsx from 'clsx';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Container from '../ui/Container';
import Badge from '../ui/Badge';
import SectionHeading from '../ui/SectionHeading';
import { knowledgeTracks } from '../../data/knowledgeTracks';

const cardThemes = [
  'from-sky-100 via-white to-cyan-100',
  'from-amber-100 via-white to-rose-100',
  'from-emerald-100 via-white to-teal-100',
];

const KnowledgeTracks = () => (
  <section className="bg-surface py-12">
    <Container className="space-y-8">
      <SectionHeading
        eyebrow="Tuyến nội dung"
        title="Ba nhánh kiến thức được tổ chức rõ hơn"
        description="Ngoài thư viện kỹ thuật đang hoạt động, hai chuyên mục mới được dựng theo hướng có roadmap, chủ đề mở màn và định dạng nội dung riêng thay vì để trống."
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {knowledgeTracks.map((track, index) => (
          <Link
            key={track.slug}
            href={track.href}
            className="group relative overflow-hidden rounded-[30px] border border-white/80 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft"
          >
            <div
              className={clsx(
                'absolute inset-x-0 top-0 h-28 bg-gradient-to-br opacity-90 transition duration-300 group-hover:h-32',
                cardThemes[index % cardThemes.length],
              )}
            />
            <div className="relative space-y-5 p-6">
              <div className="flex items-center justify-between gap-3">
                <Badge className={clsx(track.status === 'coming-soon' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-brand-50 text-brand-700')}>
                  {track.status === 'coming-soon' ? track.statusLabel : 'Đang có bài'}
                </Badge>
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">0{index + 1}</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-ink">{track.label}</h3>
                <p className="text-sm leading-6 text-gray-600">{track.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {track.previews.slice(0, 3).map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-brand-700">
                <span>{track.status === 'coming-soon' ? 'Xem roadmap' : 'Khám phá bài viết'}</span>
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  </section>
);

export default KnowledgeTracks;
