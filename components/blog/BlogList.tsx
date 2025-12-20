import Container from '../ui/Container';
import BlogCard from './BlogCard';
import type { Post } from '../../src/data/posts';

type Props = {
  posts: Post[];
  sidebar: React.ReactNode;
};

const BlogList = ({ posts, sidebar }: Props) => (
  <section className="bg-surface pb-12">
    <Container className="grid gap-8 lg:grid-cols-[1.6fr,1fr]">
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="space-y-4">{sidebar}</div>
    </Container>
  </section>
);

export default BlogList;
