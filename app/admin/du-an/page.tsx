'use client';

import { useMemo, useState } from 'react';
import Container from '../../../components/ui/Container';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import ImagePlaceholder from '../../../components/ui/ImagePlaceholder';
import { projects as initialProjects } from '../../../data/projects';
import { projectCategories } from '../../../data/projectCategories';

type DraftProject = {
  slug: string;
  title: string;
  description: string;
  client: string;
  year: string;
  categories: string[];
  cover: string | null;
  externalUrl: string;
  detailUrl: string;
};

const emptyProject: DraftProject = {
  slug: '',
  title: '',
  description: '',
  client: '',
  year: new Date().getFullYear().toString(),
  categories: ['Bán hàng'],
  cover: null,
  externalUrl: '',
  detailUrl: '',
};

export default function AdminProjectsPage() {
  const [drafts, setDrafts] = useState<DraftProject[]>(
    initialProjects.map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      client: p.client,
      year: p.year,
      categories: p.categories,
      cover: p.cover,
      externalUrl: p.externalUrl,
      detailUrl: p.detailUrl,
    })),
  );
  const [selectedSlug, setSelectedSlug] = useState<string>(drafts[0]?.slug ?? '');
  const [filter, setFilter] = useState('');
  const [addingNew, setAddingNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const selected = useMemo(() => drafts.find((p) => p.slug === selectedSlug) ?? null, [drafts, selectedSlug]);

  const filtered = useMemo(() => {
    if (!filter.trim()) return drafts;
    return drafts.filter(
      (p) =>
        p.title.toLowerCase().includes(filter.toLowerCase()) ||
        p.slug.toLowerCase().includes(filter.toLowerCase()) ||
        p.categories.some((c) => c.toLowerCase().includes(filter.toLowerCase())),
    );
  }, [drafts, filter]);

  const updateField = (key: keyof DraftProject, value: string | string[] | null) => {
    setDrafts((prev) =>
      prev.map((p) => (p.slug === selectedSlug ? { ...p, [key]: value } : p)),
    );
  };

  const handleAdd = () => {
    const slugBase = `du-an-moi-${drafts.length + 1}`;
    const newProject = { ...emptyProject, slug: slugBase, title: `Dự án mới ${drafts.length + 1}` };
    setDrafts((prev) => [newProject, ...prev]);
    setSelectedSlug(newProject.slug);
    setAddingNew(true);
  };

  const handleDelete = (slug: string) => {
    const next = drafts.filter((p) => p.slug !== slug);
    setDrafts(next);
    if (selectedSlug === slug && next.length) setSelectedSlug(next[0].slug);
    if (selectedSlug === slug && !next.length) setSelectedSlug('');
  };

  const handleImageFile = (file: File) => {
    const url = URL.createObjectURL(file);
    updateField('cover', url);
  };

  const exportJSON = JSON.stringify(drafts, null, 2);

  const exportTS = `import { Project } from './projects';\n\nexport const projects: Project[] = ${JSON.stringify(
    drafts,
    null,
    2,
  )} as const;`;

  const handleSaveToCode = async () => {
    try {
      setSaving(true);
      setStatus(null);
      const res = await fetch('/api/admin/save-projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projects: drafts }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.message || 'Không thể lưu');
      }
      setStatus('Đã lưu vào data/projects.ts và data/projects.json');
    } catch (error) {
      setStatus((error as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <Container className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-brand-700">Admin tạm thời</p>
            <h1 className="text-2xl font-extrabold text-ink">Quản lý dự án</h1>
            <p className="text-sm text-gray-600">Chỉnh sửa, thêm, xoá và cập nhật ảnh (lưu cục bộ, copy xuất JSON/TS).</p>
          </div>
          <div className="flex gap-2">
            <Button size="lg" onClick={handleAdd}>
              Thêm dự án mới
            </Button>
            <input
              type="text"
              placeholder="Tìm theo tên/slug/category"
              className="w-56 rounded-full border border-gray-200 px-4 py-2 text-sm shadow-sm focus:border-brand-400 focus:outline-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[360px,1fr]">
          <Card className="max-h-[70vh] overflow-y-auto p-4">
            <p className="mb-3 text-sm font-semibold text-gray-700">Danh sách dự án</p>
            <div className="space-y-3">
              {filtered.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => {
                    setSelectedSlug(p.slug);
                    setAddingNew(false);
                  }}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    selectedSlug === p.slug ? 'border-brand-400 bg-brand-50' : 'border-gray-200 bg-white hover:border-brand-200'
                  }`}
                >
                  <p className="text-sm font-bold text-ink">{p.title}</p>
                  <p className="text-xs text-gray-500">/{p.slug}</p>
                  <div className="mt-1 flex flex-wrap gap-1 text-[11px] font-semibold uppercase text-brand-700">
                    {p.categories.slice(0, 2).map((c) => (
                      <span key={c} className="rounded-full bg-brand-50 px-2 py-0.5">
                        {c}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
              {!filtered.length && <p className="text-sm text-gray-500">Không tìm thấy dự án phù hợp.</p>}
            </div>
          </Card>

          <Card className="p-5">
            {!selected ? (
              <p className="text-sm text-gray-600">Chọn một dự án để chỉnh sửa hoặc thêm mới.</p>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-brand-700">Đang chỉnh sửa</p>
                    <p className="text-lg font-bold text-ink">{selected.title}</p>
                  </div>
                  <Button variant="secondary" onClick={() => handleDelete(selected.slug)}>
                    Xoá
                  </Button>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <label className="space-y-1 text-sm text-gray-700">
                    Tên dự án
                    <input
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
                      value={selected.title}
                      onChange={(e) => updateField('title', e.target.value)}
                    />
                  </label>
                  <label className="space-y-1 text-sm text-gray-700">
                    Slug
                    <input
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
                      value={selected.slug}
                      onChange={(e) => updateField('slug', e.target.value)}
                    />
                  </label>
                  <label className="space-y-1 text-sm text-gray-700">
                    Khách hàng
                    <input
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
                      value={selected.client}
                      onChange={(e) => updateField('client', e.target.value)}
                    />
                  </label>
                  <label className="space-y-1 text-sm text-gray-700">
                    Năm
                    <input
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
                      value={selected.year}
                      onChange={(e) => updateField('year', e.target.value)}
                    />
                  </label>
                </div>

                <label className="space-y-1 text-sm text-gray-700">
                  Mô tả
                  <textarea
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
                    rows={3}
                    value={selected.description}
                    onChange={(e) => updateField('description', e.target.value)}
                  />
                </label>

                <div className="grid gap-3 md:grid-cols-2">
                  <label className="space-y-1 text-sm text-gray-700">
                    Link xem thực tế
                    <input
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
                      value={selected.externalUrl}
                      onChange={(e) => updateField('externalUrl', e.target.value)}
                    />
                  </label>
                  <label className="space-y-1 text-sm text-gray-700">
                    Link chi tiết nội bộ
                    <input
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
                      value={selected.detailUrl}
                      onChange={(e) => updateField('detailUrl', e.target.value)}
                    />
                  </label>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700">Danh mục</p>
                  <div className="flex flex-wrap gap-2">
                    {projectCategories
                      .filter((c) => c !== 'All')
                      .map((cat) => {
                        const active = selected.categories.includes(cat);
                        return (
                          <button
                            type="button"
                            key={cat}
                            onClick={() => {
                              const exists = selected.categories.includes(cat);
                              const next = exists
                                ? selected.categories.filter((c) => c !== cat)
                                : [...selected.categories, cat];
                              updateField('categories', next);
                            }}
                            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                              active ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      })}
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-[240px,1fr]">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700">Ảnh cover</p>
                    {selected.cover ? (
                      <img src={selected.cover} alt="" className="h-32 w-full rounded-2xl object-cover ring-1 ring-gray-200" />
                    ) : (
                      <ImagePlaceholder aspect="aspect-[4/3]" />
                    )}
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <label className="block">
                      URL ảnh
                      <input
                        className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
                        value={selected.cover ?? ''}
                        onChange={(e) => updateField('cover', e.target.value)}
                      />
                    </label>
                    <label className="block">
                      Upload ảnh (tạm):{' '}
                      <input
                        type="file"
                        accept="image/*"
                        className="mt-1 text-xs"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageFile(file);
                        }}
                      />
                    </label>
                    <p className="text-xs text-gray-500">Ảnh chỉ lưu tạm trong trình duyệt. Copy dữ liệu xuất để commit.</p>
                  </div>
                </div>

                {addingNew && <p className="text-xs text-orange-600">Đang thêm mới – nhớ đổi slug trước khi lưu/ xuất.</p>}
              </div>
            )}
          </Card>
        </div>

        <Card className="space-y-3 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-brand-700">Xuất dữ liệu</p>
              <p className="text-xs text-gray-500">Copy JSON/TS và dán vào data/projects.ts theo nhu cầu của bạn.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleSaveToCode} disabled={saving}>
                {saving ? 'Đang lưu...' : 'Lưu trực tiếp vào code'}
              </Button>
              {status && <span className="text-xs text-gray-600">{status}</span>}
            </div>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold text-gray-600">JSON</p>
              <textarea className="mt-1 h-64 w-full rounded-2xl border border-gray-200 p-3 text-xs font-mono" readOnly value={exportJSON} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600">TypeScript</p>
              <textarea className="mt-1 h-64 w-full rounded-2xl border border-gray-200 p-3 text-xs font-mono" readOnly value={exportTS} />
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
}
