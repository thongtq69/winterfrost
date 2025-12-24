import Link from 'next/link';
import clsx from 'clsx';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import ImagePlaceholder from '../ui/ImagePlaceholder';
import Image from 'next/image';
import type { Post } from '../../src/data/posts';

type Props = {
  post: Post;
};

const BlogCard = ({ post }: Props) => (
  <Card className="group flex h-full flex-col gap-3 overflow-hidden rounded-[24px] bg-white p-4 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
    <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-gray-50">
      {post.image ? (
        <Image
          src={post.image}
          alt={post.title}
          width={960}
          height={540}
          className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
        />
      ) : (
        <ImagePlaceholder aspect="aspect-[16/9]" label="Thumbnail" className="transition duration-200 group-hover:scale-[1.02]" />
      )}
    </div>
    <div className="space-y-2">
      <Badge className="bg-brand-50 text-brand-700">{post.category}</Badge>
      <Link href={`/kien-thuc/${post.slug}`} className="block">
        <h3
          className={clsx(
            'text-lg font-bold leading-snug text-ink transition hover:text-brand-700 group-hover:underline group-hover:underline-offset-4',
          )}
        >
          {post.title}
        </h3>
      </Link>
      <p className="text-xs font-semibold text-gray-500">{post.date}</p>
      <p className="text-sm text-gray-600">{post.excerpt}</p>
    </div>
  </Card>
);

export default BlogCard;
