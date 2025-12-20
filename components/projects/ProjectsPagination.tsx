import clsx from 'clsx';
import Button from '../ui/Button';

type Props = {
  current: number;
  total: number;
  onChange: (page: number) => void;
};

const ProjectsPagination = ({ current, total, onChange }: Props) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  const handleChange = (page: number) => {
    if (page < 1 || page > total || page === current) return;
    onChange(page);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" size="sm" onClick={() => handleChange(current - 1)} disabled={current <= 1}>
        Trang trước
      </Button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => handleChange(page)}
          className={clsx(
            'h-10 min-w-[42px] rounded-full border px-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500',
            page === current
              ? 'border-brand-400 bg-brand-50 text-brand-700'
              : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
          )}
          aria-current={page === current ? 'page' : undefined}
        >
          Page {page}
        </button>
      ))}
      <Button variant="outline" size="sm" onClick={() => handleChange(current + 1)} disabled={current >= total}>
        Xem tiếp
      </Button>
    </div>
  );
};

export default ProjectsPagination;
