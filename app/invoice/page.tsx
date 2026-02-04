'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Mail, Phone, Globe, Printer, Plus, Trash2, Check, CreditCard, ShieldCheck, Zap, Copy, Link as LinkIcon, Share2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { formatCurrency, numberToWords } from '../../src/lib/format';
import { siteConfig } from '../../site.config';

// Define invoice item type
type InvoiceItem = {
    id: string;
    description: string;
    quantity: number;
    price: number;
};

export default function InvoicePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Đang tải...</div>}>
            <InvoiceContent />
        </Suspense>
    );
}

function InvoiceContent() {
    const searchParams = useSearchParams();
    const [isClient, setIsClient] = useState(false);
    const [isEditing, setIsEditing] = useState(true);
    const [invoiceNumber, setInvoiceNumber] = useState(`PAY-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}01`);
    const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
    const [copied, setCopied] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const [clientInfo, setClientInfo] = useState({
        name: 'Công ty TNHH Giáo Dục PTNelc',
        website: 'https://ptnenglish.edu.vn/',
        email: 'info@ptnelc.edu.vn',
        mst: '0318773989',
        paymentContent: ''
    });

    const [items, setItems] = useState<InvoiceItem[]>([
        {
            id: '1',
            description: 'Phí thiết kế giao diện (UI/UX) Website https://ptnenglish.edu.vn/',
            quantity: 1,
            price: 5000000
        },
        {
            id: '2',
            description: 'Phí lập trình Frontend & CMS (Quản trị nội dung)',
            quantity: 1,
            price: 15000000
        },
        {
            id: '3',
            description: 'Phí tối ưu hóa SEO Technical & Page Speed (Đảm bảo Core Web Vitals)',
            quantity: 1,
            price: 5000000
        },
        {
            id: '4',
            description: 'Cấu hình Server, Hosting Premium & Bảo mật SSL (Năm đầu tiên)',
            quantity: 1,
            price: 3500000
        }
    ]);

    useEffect(() => {
        setIsClient(true);

        const dataParam = searchParams.get('data');
        if (dataParam) {
            try {
                const json = decodeURIComponent(escape(atob(dataParam)));
                const data = JSON.parse(json);
                if (data.n) setInvoiceNumber(data.n);
                if (data.d) setInvoiceDate(data.d);
                if (data.c) setClientInfo(data.c);
                if (data.i) setItems(data.i);
                setIsEditing(false);
            } catch (e) {
                console.error('Failed to parse share link', e);
            }
        }
    }, [searchParams]);

    const generateShareLink = () => {
        try {
            const data = {
                n: invoiceNumber,
                d: invoiceDate,
                c: clientInfo,
                i: items
            };
            const json = JSON.stringify(data);
            const base64 = btoa(unescape(encodeURIComponent(json)));
            const url = `${window.location.origin}${window.location.pathname}?data=${base64}`;
            navigator.clipboard.writeText(url);
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 2000);
        } catch (e) {
            alert('Không thể tạo liên kết. Có thể do nội dung quá dài.');
        }
    };

    const addItem = () => {
        const newItem: InvoiceItem = {
            id: Math.random().toString(36).substr(2, 9),
            description: 'Nội dung dịch vụ mới',
            quantity: 1,
            price: 0
        };
        setItems([...items, newItem]);
    };

    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
        setItems(items.map(item => {
            if (item.id === id) {
                return { ...item, [field]: value };
            }
            return item;
        }));
    };

    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const total = subtotal;

    const handlePrint = () => {
        setIsEditing(false);
        setTimeout(() => {
            window.print();
        }, 100);
    };

    if (!isClient) return null;

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white text-[#0c1626]">
            {/* Control Panel - Hidden in Print */}
            <div className="max-w-4xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
                <div>
                    <h1 className="text-2xl font-bold text-ink">Quản lý Thanh toán</h1>
                    <p className="text-slate-500 text-sm">Xuất phiếu đề nghị thanh toán cho khách hàng</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={generateShareLink}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-medium transition-all ${linkCopied
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm'
                            }`}
                    >
                        {linkCopied ? <Check size={18} /> : <LinkIcon size={18} />}
                        {linkCopied ? 'Đã sao chép link!' : 'Lấy link thanh toán'}
                    </button>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-medium transition-all ${isEditing
                            ? 'bg-brand-50 border-brand-200 text-brand-700'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm'
                            }`}
                    >
                        {isEditing ? <Check size={18} /> : <Zap size={18} />}
                        {isEditing ? 'Hoàn tất chỉnh sửa' : 'Chỉnh sửa'}
                    </button>
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-6 py-2 rounded-xl bg-brand-600 text-white font-medium hover:bg-brand-700 shadow-soft transition-all"
                    >
                        <Printer size={18} />
                        In / Lưu PDF
                    </button>
                </div>
            </div>

            {/* Invoice Document */}
            <div className="max-w-4xl mx-auto bg-white shadow-card rounded-3xl overflow-hidden print:shadow-none print:rounded-none">
                {/* Banner Accent */}
                <div className="h-2 bg-gradient-to-r from-brand-400 via-brand-600 to-brand-800" />

                <div className="p-8 sm:p-12">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-12">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative w-24 h-24 overflow-hidden rounded-2xl shadow-soft flex items-center justify-center bg-white border border-slate-100 p-2">
                                    <Image
                                        src={siteConfig.assets.logoPath}
                                        alt={siteConfig.brand.name}
                                        width={80}
                                        height={80}
                                        className="object-contain"
                                    />
                                </div>
                                <div>
                                    <span className="text-3xl font-black tracking-tighter text-ink uppercase block leading-none">WinterFrost</span>
                                    <span className="text-lg font-bold text-brand-600 uppercase tracking-widest">Tech</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                                    <CreditCard size={14} /> MST: 082304002543
                                </p>
                                <p className="text-sm text-slate-500 flex items-center gap-2">
                                    <Globe size={14} /> {siteConfig.brand.domain}
                                </p>
                                <p className="text-sm text-slate-500 flex items-center gap-2">
                                    <Mail size={14} /> {siteConfig.contact.email}
                                </p>
                                <p className="text-sm text-slate-500 flex items-center gap-2">
                                    <Phone size={14} /> {siteConfig.contact.phoneDisplay}
                                </p>
                            </div>
                        </div>

                        <div className="text-right sm:text-right w-full sm:w-auto">
                            <h2 className="text-3vw font-black text-slate-900 mb-2 uppercase tracking-tighter leading-tight whitespace-nowrap" style={{ fontSize: 'clamp(24px, 4vw, 36px)' }}>
                                BIÊN LAI<br />THU TIỀN
                            </h2>
                            <p className="text-[10px] text-slate-400 font-bold uppercase mb-4 tracking-tight">Hóa đơn này không có giá trị khấu trừ thuế GTGT</p>
                            <div className="space-y-1">
                                <div className="flex justify-between sm:justify-end gap-4">
                                    <span className="text-slate-500 text-sm font-medium">Số No.</span>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={invoiceNumber}
                                            onChange={(e) => setInvoiceNumber(e.target.value)}
                                            className="text-right border-b border-dashed border-slate-300 focus:border-brand-500 outline-none w-32"
                                        />
                                    ) : (
                                        <span className="text-ink font-bold">{invoiceNumber}</span>
                                    )}
                                </div>
                                <div className="flex justify-between sm:justify-end gap-4">
                                    <span className="text-slate-500 text-sm font-medium">Ngày phát hành</span>
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            value={invoiceDate}
                                            onChange={(e) => setInvoiceDate(e.target.value)}
                                            className="text-right border-b border-dashed border-slate-300 focus:border-brand-500 outline-none"
                                        />
                                    ) : (
                                        <span className="text-ink font-bold">{invoiceDate}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Client Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 p-6 rounded-2xl bg-slate-50/50 border border-slate-100">
                        <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Khách hàng</h3>
                            {isEditing ? (
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        value={clientInfo.name}
                                        onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                                        placeholder="Tên đơn vị/người nhận"
                                        className="w-full text-lg font-bold text-ink bg-transparent border-b border-dashed border-slate-300 focus:border-brand-500 outline-none"
                                    />
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            value={clientInfo.mst}
                                            onChange={(e) => setClientInfo({ ...clientInfo, mst: e.target.value })}
                                            placeholder="Mã số thuế"
                                            className="text-xs font-bold text-slate-500 bg-transparent border-b border-dashed border-slate-200 focus:border-brand-500 outline-none w-1/2"
                                        />
                                        <input
                                            type="text"
                                            value={clientInfo.website}
                                            onChange={(e) => setClientInfo({ ...clientInfo, website: e.target.value })}
                                            placeholder="Dự án Website"
                                            className="text-xs text-brand-600 bg-transparent border-b border-dashed border-slate-200 focus:border-brand-500 outline-none w-1/2"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        value={clientInfo.email}
                                        onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                                        placeholder="Email liên hệ"
                                        className="w-full text-sm text-slate-600 bg-transparent border-b border-dashed border-slate-300 focus:border-brand-500 outline-none"
                                    />
                                </div>
                            ) : (
                                <div>
                                    <p className="text-xl font-black text-ink mb-1">{clientInfo.name}</p>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">MST: {clientInfo.mst}</span>
                                        <p className="text-brand-600 font-bold text-sm tracking-tight">{clientInfo.website}</p>
                                    </div>
                                    <p className="text-slate-500 text-sm italic">{clientInfo.email}</p>
                                </div>
                            )}
                        </div>

                        <div className="md:border-l md:pl-8 border-slate-200">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Nội dung thanh toán</h3>
                            {isEditing ? (
                                <textarea
                                    value={clientInfo.paymentContent || `Thanh toán chi phí triển khai và bảo trì hệ thống website chuyên nghiệp cho tên miền ${clientInfo.website.replace('https://', '')}`}
                                    onChange={(e) => setClientInfo({ ...clientInfo, paymentContent: e.target.value })}
                                    className="w-full text-sm text-slate-700 bg-transparent border-b border-dashed border-slate-300 focus:border-brand-500 outline-none resize-none"
                                    rows={3}
                                />
                            ) : (
                                <p className="text-slate-700 font-medium leading-relaxed">
                                    {clientInfo.paymentContent || (
                                        <>
                                            Thanh toán chi phí triển khai và bảo trì hệ thống website chuyên nghiệp cho tên miền <span className="text-brand-700 font-bold">{clientInfo.website.replace('https://', '')}</span>
                                        </>
                                    )}
                                </p>
                            )}
                            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                                <ShieldCheck size={14} /> Dịch vụ cung cấp bởi WinterFrost Tech
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="mb-12 overflow-x-auto">
                        <table className="w-full text-left min-w-[600px]">
                            <thead>
                                <tr className="border-b-2 border-slate-900">
                                    <th className="py-4 font-black text-ink uppercase text-sm tracking-tighter">Mô tả dịch vụ</th>
                                    <th className="py-4 px-4 font-black text-ink text-center uppercase text-sm tracking-tighter">Số lượng</th>
                                    <th className="py-4 px-4 font-black text-ink text-right uppercase text-sm tracking-tighter">Đơn giá</th>
                                    <th className="py-4 pl-4 font-black text-ink text-right uppercase text-sm tracking-tighter">Thành tiền</th>
                                    {isEditing && <th className="py-4 px-4 print:hidden"></th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {items.map((item) => (
                                    <tr key={item.id} className="group">
                                        <td className="py-5 align-top">
                                            {isEditing ? (
                                                <textarea
                                                    value={item.description}
                                                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                                                    className="w-full bg-transparent border-b border-dashed border-slate-200 focus:border-brand-500 outline-none resize-none"
                                                    rows={2}
                                                />
                                            ) : (
                                                <div>
                                                    <p className="font-bold text-ink leading-tight">{item.description}</p>
                                                    <p className={`text-[10px] mt-1 uppercase font-black tracking-widest ${item.price === 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                                                        {item.price === 0 ? 'Miễn phí' : 'Dịch vụ Phát triển Phần mềm'}
                                                    </p>
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-5 px-4 text-center align-top">
                                            {isEditing ? (
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                                                    className="w-16 bg-transparent border-b border-dashed border-slate-300 focus:border-brand-500 outline-none text-center font-bold"
                                                />
                                            ) : (
                                                <span className="font-bold text-slate-700">{item.quantity}</span>
                                            )}
                                        </td>
                                        <td className="py-5 px-4 text-right align-top">
                                            {isEditing ? (
                                                <input
                                                    type="number"
                                                    value={item.price}
                                                    onChange={(e) => updateItem(item.id, 'price', parseInt(e.target.value) || 0)}
                                                    className="w-24 bg-transparent border-b border-dashed border-slate-300 focus:border-brand-500 outline-none text-right font-bold"
                                                />
                                            ) : (
                                                <span className="font-bold text-slate-700">{formatCurrency(item.price).replace('₫', '')}</span>
                                            )}
                                        </td>
                                        <td className="py-5 pl-4 text-right align-top font-black text-ink">
                                            {formatCurrency(item.quantity * item.price)}
                                        </td>
                                        {isEditing && (
                                            <td className="py-5 px-4 text-right print:hidden">
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {isEditing && (
                            <button
                                onClick={addItem}
                                className="mt-4 flex items-center gap-2 text-brand-600 font-bold text-sm hover:text-brand-700 print:hidden"
                            >
                                <Plus size={18} /> Thêm hạng mục thanh toán
                            </button>
                        )}
                    </div>

                    {/* Totals */}
                    <div className="flex justify-end mb-8">
                        <div className="w-full sm:w-80 space-y-4">
                            <div className="pt-4 border-t-8 border-slate-900 flex justify-between items-center">
                                <span className="text-xl font-black text-slate-900 uppercase tracking-tighter">Tổng Cộng</span>
                                <span className="text-3xl font-black text-brand-700">{formatCurrency(total)}</span>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 italic">Bằng chữ:</p>
                                <p className="text-sm font-black text-slate-700 italic">{numberToWords(total)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="border-t border-slate-100 pt-12 payment-section">
                        <div className="space-y-6">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Thông tin thụ hưởng</h3>
                            <div className="relative group p-8 rounded-[2rem] bg-[#0c1626] text-white overflow-hidden shadow-2xl transition-all hover:shadow-brand-500/10">
                                {/* Decor */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-400/5 rounded-full blur-2xl -ml-16 -mb-16" />

                                <div className="relative z-10 flex flex-col sm:flex-row justify-between gap-8">
                                    <div className="space-y-6 flex-1">
                                        <div>
                                            <p className="text-[10px] opacity-40 uppercase tracking-[0.2em] font-black mb-2">Chủ tài khoản</p>
                                            <p className="text-2xl font-black tracking-tight uppercase leading-none">DANG THI HUONG PHI</p>
                                        </div>

                                        <div>
                                            <p className="text-[10px] opacity-40 uppercase tracking-[0.2em] font-black mb-2">Số tài khoản</p>
                                            <div className="flex items-center gap-4 group/acc">
                                                <p className="text-4xl font-black tracking-tighter text-brand-400 leading-none">0111166776776</p>
                                                <button
                                                    onClick={() => handleCopy('0111166776776')}
                                                    className={`p-2 rounded-xl transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'} print:hidden`}
                                                    title="Sao chép số tài khoản"
                                                >
                                                    {copied ? <Check size={18} /> : <Copy size={18} />}
                                                </button>
                                                {copied && <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest animate-pulse">Đã chép!</span>}
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-white/5">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-2 h-2 rounded-full bg-brand-500" />
                                                <p className="text-sm font-black uppercase tracking-tight text-white/90">Ngân hàng MB Bank (TMCP Quân Đội)</p>
                                            </div>
                                            <p className="text-[10px] opacity-30 uppercase tracking-[0.1em] font-bold">Nội dung: <span className="text-white/60">{invoiceNumber} - PTNELC</span></p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center gap-6">
                                        <div className="bg-white p-6 rounded-[3rem] shadow-2xl transform transition-transform group-hover:scale-105 border-4 border-white/10">
                                            <Image
                                                src="https://img.vietqr.io/image/MB-0111166776776-compact.png"
                                                alt="VietQR Payment"
                                                width={320}
                                                height={320}
                                                className="object-contain rounded-2xl"
                                            />
                                        </div>
                                        <p className="text-[12px] font-black text-white/50 uppercase tracking-[0.4em]">Quét mã thanh toán</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-slate-50 p-8 text-center border-t border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-2">WinterFrost Tech • Professional Web Development Agency</p>
                    <p className="text-[9px] text-slate-400">Website này được thiết kế và vận hành bởi WinterFrost Tech. Cảm ơn sự hợp tác của quý khách.</p>
                </div>
            </div>

            <style jsx global>{`
                @media print {
                    @page {
                        margin: 0.5cm;
                        size: auto;
                    }
                    body {
                        background: white !important;
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                    .shadow-card {
                        box-shadow: none !important;
                    }
                    button, .print-hidden {
                        display: none !important;
                    }
                    .max-w-4xl {
                        max-width: 100% !important;
                        margin: 0 !important;
                        width: 100% !important;
                    }
                    tr {
                        page-break-inside: avoid !important;
                        break-inside: avoid !important;
                    }
                    .payment-section {
                        page-break-inside: avoid !important;
                        break-inside: avoid !important;
                    }
                }
            `}</style>
        </div>
    );
}
