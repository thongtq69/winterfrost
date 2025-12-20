import { Facebook, Youtube, MessageCircle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const BlogSidebar = () => (
  <div className="space-y-4">
    <Card className="rounded-[24px] p-5">
      <h3 className="text-lg font-bold text-ink">YOUR BRAND</h3>
      <p className="text-sm text-gray-600">Tư vấn phát triển website, tối ưu trải nghiệm và chuyển đổi.</p>
    </Card>
    <Card className="rounded-[24px] p-5">
      <h4 className="text-base font-semibold text-ink">Nhận tư vấn nhanh</h4>
      <p className="text-sm text-gray-600">Trao đổi qua Zalo/Email, nhận đề xuất lộ trình triển khai.</p>
      <Button fullWidth className="mt-3" asChild>
        <a href="https://example.com">Chat ngay</a>
      </Button>
    </Card>
    <Card className="rounded-[24px] p-5">
      <h4 className="text-base font-semibold text-ink">Kết nối</h4>
      <div className="mt-3 flex gap-3">
        {[{ icon: Facebook, label: 'Facebook' }, { icon: MessageCircle, label: 'Tiktok' }, { icon: Youtube, label: 'YouTube' }].map(
          ({ icon: Icon, label }) => (
            <a
              key={label}
              href="https://example.com"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-50 text-gray-700 ring-1 ring-gray-100 transition hover:-translate-y-0.5 hover:bg-brand-50 hover:text-brand-700 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
            >
              <Icon size={18} />
            </a>
          ),
        )}
      </div>
    </Card>
  </div>
);

export default BlogSidebar;
