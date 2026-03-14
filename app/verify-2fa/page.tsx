'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowRight, RefreshCw, Lock, Mail, Copy, Check, ChevronLeft, AlertCircle, Sparkles, Ghost } from 'lucide-react';

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
  const [countdown, setCountdown] = useState(30);
  const [showNotification, setShowNotification] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Countdown logic
  useEffect(() => {
    if (step === 'display' && countdown > 0 && !isExpired) {
      timerRef.current = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsExpired(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step, countdown, isExpired]);

  const handleGetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setIsError(true);
      return;
    }

    setIsSubmitting(true);
    setIsError(false);
    setIsExpired(false);
    setCountdown(30);

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
          setShowNotification(true);
          // Hide notification after 5s
          setTimeout(() => setShowNotification(false), 5000);
          
          if (pollingRef.current) clearInterval(pollingRef.current);
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 3000); 
  };

  const copyToClipboard = () => {
    if (!generatedCode || isExpired) return;
    navigator.clipboard.writeText(generatedCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const resetFlow = () => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    setStep('email');
    setIsError(false);
    setIsExpired(false);
    setCountdown(30);
    setGeneratedCode('');
  };

  return (
    <main className="min-h-screen bg-[#f8fbff] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Toast Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 z-50 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-green-400"
          >
            <Sparkles className="animate-pulse" size={20} />
            <div className="flex flex-col">
              <span className="font-bold text-sm">Hú hồn chưa! Có mã rồi nè!</span>
              <span className="text-[10px] opacity-90 italic">Nhanh cái tay lên, 30s là nó bay màu đấy =))))</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-100 rounded-full blur-[120px] opacity-40 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-soft rounded-3xl p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600" />

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 
              ${step === 'display' ? (isExpired ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500') : 'bg-brand-50 text-brand-500'}`}>
              <AnimatePresence mode="wait">
                {step === 'email' ? (
                  <motion.div key="mail" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Mail size={36} className="stroke-[1.5px]" />
                  </motion.div>
                ) : step === 'waiting' ? (
                  <motion.div key="waiting" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <RefreshCw size={36} className="stroke-[1.5px] animate-spin" />
                  </motion.div>
                ) : isExpired ? (
                  <motion.div key="expired" initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}>
                    <Ghost size={40} className="stroke-[1.5px]" />
                  </motion.div>
                ) : (
                  <motion.div key="shield" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <ShieldCheck size={40} className="stroke-[1.5px]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-extrabold text-ink tracking-tight mb-3">
              {step === 'email' ? 'Nhận mã 2FA' : step === 'waiting' ? 'Đang đợi xác nhận' : isExpired ? 'Hết lượt rồi em ơi' : 'Mã xác thực 2FA'}
            </h1>
            <p className="text-slate-500 text-[15px] leading-relaxed max-w-[300px]">
              {step === 'email' 
                ? 'Nhập email của bạn để hệ thống cấp mã xác thực bảo mật.' 
                : step === 'waiting'
                  ? 'Yêu cầu của bạn đang được xử lý. Vui lòng chờ vài phút mã sẽ xuất hiện.'
                  : isExpired 
                    ? 'Chậm chạp quá, mã nó bay mất tiêu rồi. Bấm làm mới đi kìa =))))'
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
                  <div className={`border-2 border-dashed rounded-3xl p-8 flex flex-col items-center transition-all duration-500 ${isExpired ? 'bg-red-50 border-red-200 grayscale opacity-60' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex gap-3 mb-6 relative">
                      {isExpired ? (
                        <div className="flex items-center gap-2 text-red-500 font-black italic text-xl">
                          <AlertCircle size={20} />
                          OOPS! NO MORE CODE
                        </div>
                      ) : (
                        generatedCode.split('').map((char, i) => (
                          <motion.span 
                            key={i}
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="text-3xl md:text-4xl font-black text-brand-600 font-mono"
                          >
                            {char}
                          </motion.span>
                        ))
                      )}

                      {/* Floating Countdown Bar */}
                      {!isExpired && (
                        <div className="absolute -top-4 left-0 right-0 h-1 bg-slate-200 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 30, ease: "linear" }}
                            className="h-full bg-brand-500"
                          />
                        </div>
                      )}
                    </div>

                    {!isExpired ? (
                      <button 
                        onClick={copyToClipboard}
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-sm border
                          ${isCopied ? 'bg-green-500 text-white border-green-500' : 'bg-white text-ink hover:bg-slate-50 border-slate-100'}`}
                      >
                        {isCopied ? <><Check size={18} /><span>Đã sao chép</span></> : <><Copy size={18} /><span>Sao chép mã</span></>}
                      </button>
                    ) : (
                      <div className="text-red-400 text-[10px] font-bold uppercase tracking-widest text-center">
                        Mã đã tự hủy sau 30 giây <br/> Thử lại đi bé ơi =)))
                      </div>
                    )}
                  </div>

                  <div className="pt-4 flex flex-col gap-4">
                    {!isExpired && (
                      <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 flex items-center justify-between">
                        <span className="text-xs text-slate-400 font-medium">Hết hạn sau:</span>
                        <span className={`text-sm font-black mono ${countdown < 10 ? 'text-red-500 animate-pulse' : 'text-ink'}`}>
                          00:{countdown < 10 ? `0${countdown}` : countdown}
                        </span>
                      </div>
                    )}
                    
                    <p className="text-center text-[11px] text-slate-400 italic">Cấp cho: <span className="font-bold text-slate-600">{email}</span></p>
                    <button onClick={resetFlow} className="w-full h-14 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 flex items-center justify-center gap-2">
                      <ChevronLeft size={18} /> {isExpired ? 'Lấy mã mới thôi' : 'Làm mới'}
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
