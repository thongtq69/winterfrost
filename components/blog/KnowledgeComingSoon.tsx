import clsx from 'clsx';
import Link from 'next/link';
import { ArrowRight, BookOpen, MessageCircle, Sparkles } from 'lucide-react';
import type { Post } from '../../src/data/posts';
import type { KnowledgeTrack } from '../../data/knowledgeTracks';
import { siteConfig } from '../../site.config';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';

type Props = {
  track: KnowledgeTrack;
  fallbackPosts: Post[];
};

const heroThemes: Record<string, { surface: string; accent: string; badge: string }> = {
  'case-study': {
    surface: 'from-[#fff1e6] via-white to-[#fce7f3]',
    accent: 'bg-gradient-to-r from-amber-400 via-rose-400 to-pink-400',
    badge: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  'seo-noi-dung': {
    surface: 'from-[#ebfff8] via-white to-[#ecfeff]',
    accent: 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400',
    badge: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
};

const KnowledgeComingSoon = ({ track, fallbackPosts }: Props) => {
  const theme = heroThemes[track.slug] ?? {
    surface: 'from-brand-50 via-white to-sky-100',
    accent: 'bg-gradient-to-r from-brand-400 via-brand-500 to-sky-400',
    badge: 'border-brand-200 bg-brand-50 text-brand-700',
  };

  return (
    <>
      <section className={clsx('relative overflow-hidden bg-gradient-to-br py-10 sm:py-12', theme.surface)}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.95),transparent_42%)]" />
        <Container className="relative grid gap-6 lg:grid-cols-[1.2fr,0.8fr] lg:items-end">
          <div className="space-y-5">
            <nav className="text-sm text-gray-600" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-brand-700">
                Trang chủ
              </Link>
              <span className="px-1 text-gray-400">/</span>
              <Link href="/kien-thuc" className="hover:text-brand-700">
                Kiến thức
              </Link>
              <span className="px-1 text-gray-400">/</span>
              <span className="text-gray-700">{track.label}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-3">
              <Badge className={track.status === 'coming-soon' ? theme.badge : 'bg-brand-50 text-brand-700'}>{track.eyebrow}</Badge>
              <span className="rounded-full border border-white/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {track.statusLabel}
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-ink sm:text-5xl">{track.label}</h1>
              <p className="max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">{track.heroDescription}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {track.previews.map((item) => (
                <div key={item} className="rounded-2xl border border-white/80 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-700 shadow-[0_18px_48px_-32px_rgba(12,22,38,0.24)] backdrop-blur">
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/kien-thuc/huong-dan-ky-thuat">Xem hướng dẫn hiện có</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" icon={<MessageCircle size={18} />}>
                <a href={siteConfig.links.zalo} target="_blank" rel="noreferrer">
                  Gửi ý tưởng chủ đề
                </a>
              </Button>
            </div>
          </div>

          <Card className="overflow-hidden rounded-[30px] border border-white/80 bg-white/90 p-0 hover:translate-y-0">
            <div className={clsx('h-2 w-full', theme.accent)} />
            <div className="space-y-5 p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-brand-700">
                <Sparkles size={16} />
                Nội dung mở màn dự kiến
              </div>
              <div className="space-y-4">
                {track.roadmap.map((item) => (
                  <div key={item.step} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-sm font-extrabold text-brand-700 shadow-card">
                        {item.step}
                      </span>
                      <div className="space-y-1">
                        <h2 className="text-base font-bold text-ink">{item.title}</h2>
                        <p className="text-sm leading-6 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Container>
      </section>

      <section className="bg-white py-12">
        <Container className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Creative direction"
              title="Chuyên mục này được dựng theo format riêng"
              description="Thay vì chỉ thêm bài rời rạc, phần nội dung mới sẽ có cấu trúc rõ để người xem vừa đọc nhanh vừa nhìn ra tư duy triển khai phía sau."
            />
            <div className="grid gap-5 md:grid-cols-3">
              {track.formats.map((item, index) => (
                <Card key={item.title} className="rounded-[28px] border border-slate-100 p-6">
                  <div className="mb-5 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Format 0{index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-slate-100 bg-surface p-6 shadow-card">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-700">
              <BookOpen size={17} />
              Có thể xem ngay trong lúc chờ
            </div>
            <div className="mt-5 space-y-3">
              {fallbackPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/kien-thuc/${post.slug}`}
                  className="group block rounded-2xl border border-white bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-soft"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">{post.date}</p>
                  <h3 className="mt-2 text-base font-bold text-ink transition group-hover:text-brand-700">{post.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{post.excerpt}</p>
                  <div className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                    Đọc bài viết
                    <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default KnowledgeComingSoon;
