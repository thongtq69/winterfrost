'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowRight, RefreshCw, Lock, Mail, Copy, Check, ChevronLeft, Loader2 } from 'lucide-react';

const MotionContainer = ({ children, keyName }: { children: React.ReactNode, keyName: string }) => (
  <motion.div
    key={keyName}
    initial={{ opacity: 0, x: keyName === 'email' ? -20 : 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: keyName === 'email' ? 20 : -20 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="w-full"
  >
    {children}
  </motion.div>
);

export default function TwoFactorPage() {
  const [step, setStep] = useState<'email' | 'waiting' | 'display'>('email');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isError, setIsError] = useState(false);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  const handleGetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setIsError(true);
      return;
    }

    setIsSubmitting(true);
    setIsError(false);

    try {
      const res = await fetch('/api/2fa/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Failed to request code');
      
      setStep('waiting');
      startPolling(email);
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const startPolling = (targetEmail: string) => {
    if (pollingRef.current) clearInterval(pollingRef.current);

    pollingRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/2fa/status?email=${encodeURIComponent(targetEmail)}`);
        const data = await res.json();

        if (data.status === 'completed' && data.code) {
          setGeneratedCode(data.code);
          setStep('display');
          if (pollingRef.current) clearInterval(pollingRef.current);
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 3000); // Poll every 3 seconds
  };

  const copyToClipboard = () => {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const resetFlow = () => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    setStep('email');
    setIsError(false);
  };

  return (
    <main className="min-h-screen bg-[#f8fbff] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-100 rounded-full blur-[120px] opacity-40 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-soft rounded-3xl p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600" />

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 
              ${step === 'display' ? 'bg-green-50 text-green-500' : 'bg-brand-50 text-brand-500'}`}>
              <AnimatePresence mode="wait">
                {step === 'email' ? (
                  <motion.div key="mail" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Mail size={36} className="stroke-[1.5px]" />
                  </motion.div>
                ) : step === 'waiting' ? (
                  <motion.div key="waiting" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <RefreshCw size={36} className="stroke-[1.5px] animate-spin" />
                  </motion.div>
                ) : (
                  <motion.div key="shield" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <ShieldCheck size={40} className="stroke-[1.5px]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-extrabold text-ink tracking-tight mb-3">
              {step === 'email' ? 'Nhận mã 2FA' : step === 'waiting' ? 'Đang đợi xác nhận' : 'Mã xác thực 2FA'}
            </h1>
            <p className="text-slate-500 text-[15px] leading-relaxed max-w-[300px]">
              {step === 'email' 
                ? 'Nhập email của bạn để hệ thống cấp mã xác thực bảo mật.' 
                : step === 'waiting'
                  ? 'Yêu cầu của bạn đang được xử lý. Vui lòng chờ vài phút mã sẽ xuất hiện.'
                  : 'Sử dụng mã dưới đây để hoàn tất quá trình của bạn.'}
            </p>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {step === 'email' ? (
              <MotionContainer keyName="email">
                <form onSubmit={handleGetCode} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Địa chỉ Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={18} />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your-email@example.com"
                        className={`w-full h-14 pl-12 pr-4 rounded-2xl border-2 transition-all duration-200 outline-none
                          ${isError ? 'border-red-200 bg-red-50 text-red-600' : 'border-slate-100 bg-slate-50/50 text-ink focus:border-brand-400 focus:bg-white focus:shadow-ring'}`}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="group w-full h-[58px] bg-ink text-white rounded-2xl font-bold flex items-center justify-center transition-all duration-300 hover:bg-black active:scale-[0.98] disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <RefreshCw className="animate-spin" size={20} />
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Nhận mã ngay</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    )}
                  </button>
                </form>
              </MotionContainer>
            ) : step === 'waiting' ? (
              <MotionContainer keyName="waiting">
                <div className="flex flex-col items-center justify-center py-10 space-y-6">
                  <div className="relative">
                    <div className="w-24 h-24 border-4 border-brand-100 border-t-brand-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Mail className="text-brand-500" size={24} />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-ink font-bold">Vui lòng không đóng trang này</p>
                    <p className="text-slate-400 text-sm">Hệ thống sẽ tự động cập nhật mã khi sẵn sàng</p>
                  </div>
                  <button onClick={resetFlow} className="text-slate-400 text-sm flex items-center gap-1 hover:text-ink transition-colors">
                    <ChevronLeft size={16} /> Quay lại
                  </button>
                </div>
              </MotionContainer>
            ) : (
              <MotionContainer keyName="display">
                <div className="space-y-8">
                  <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center">
                    <div className="flex gap-3 mb-6">
                      {generatedCode.split('').map((char, i) => (
                        <motion.span 
                          key={i}
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="text-3xl md:text-4xl font-black text-brand-600 font-mono"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </div>

                    <button 
                      onClick={copyToClipboard}
                      className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-sm border
                        ${isCopied ? 'bg-green-500 text-white border-green-500' : 'bg-white text-ink hover:bg-slate-50 border-slate-100'}`}
                    >
                      {isCopied ? <><Check size={18} /><span>Đã sao chép</span></> : <><Copy size={18} /><span>Sao chép mã</span></>}
                    </button>
                  </div>

                  <div className="pt-4 flex flex-col gap-4">
                    <p className="text-center text-[13px] text-slate-400 italic">Cấp cho: <span className="font-bold text-slate-600">{email}</span></p>
                    <button onClick={resetFlow} className="w-full h-14 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 flex items-center justify-center gap-2">
                      <ChevronLeft size={18} /> Làm mới
                    </button>
                  </div>
                </div>
              </MotionContainer>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Lock className="text-slate-300" size={14} />
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Secure Real-time Verification</span>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
