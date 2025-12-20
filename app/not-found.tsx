import Link from 'next/link';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center">
      <Container className="space-y-4 text-center">
        <p className="text-sm font-semibold text-brand-600">404</p>
        <h1 className="text-3xl font-extrabold text-ink">Trang không tồn tại</h1>
        <p className="text-gray-600">Liên kết bạn truy cập không khả dụng. Về trang chủ để tiếp tục.</p>
        <div className="flex justify-center gap-3">
          <Button asChild>
            <Link href="/">Về trang chủ</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/lien-he">Liên hệ</Link>
          </Button>
        </div>
      </Container>
    </main>
  );
}
