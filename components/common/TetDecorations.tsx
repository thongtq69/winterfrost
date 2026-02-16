'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Đèn lồng đỏ ── */
const TetLantern = ({ side, delay = 0 }: { side: 'left' | 'right'; delay?: number }) => (
  <motion.div
    className={`fixed top-0 z-50 pointer-events-none ${side === 'left' ? 'left-2 md:left-6' : 'right-2 md:right-6'}`}
    initial={{ y: -120 }}
    animate={{ y: 0 }}
    transition={{ type: 'spring', stiffness: 40, damping: 12, delay }}
  >
    <div className="mx-auto h-8 w-[2px] bg-gradient-to-b from-red-700 to-red-500" />
    <motion.div
      animate={{ rotateZ: [0, 3, -3, 2, -2, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.5 }}
      className="origin-top"
    >
      <div className="mx-auto h-2 w-10 rounded-t-sm bg-gradient-to-b from-yellow-500 to-yellow-600" />
      <div className="relative mx-auto flex h-14 w-12 items-center justify-center overflow-hidden rounded-[50%] bg-gradient-to-b from-red-500 via-red-600 to-red-700 shadow-lg shadow-red-500/30 md:h-16 md:w-14">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-full w-[1px] bg-yellow-400/40" />
        </div>
        <span className="relative z-10 text-sm font-bold text-yellow-300 drop-shadow-sm md:text-base" style={{ fontFamily: 'serif' }}>
          {side === 'left' ? '福' : '禄'}
        </span>
        <div className="absolute inset-0 rounded-[50%] bg-gradient-to-t from-transparent via-transparent to-white/10" />
      </div>
      <div className="mx-auto h-2 w-10 rounded-b-sm bg-gradient-to-b from-yellow-600 to-yellow-500" />
      <div className="mx-auto flex justify-center gap-[2px]">
        {[0, 0.3, 0.6].map((d, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, i === 1 ? 4 : 3, 0] }}
            transition={{ duration: 2 + i * 0.2, repeat: Infinity, delay: d }}
            className={`${i === 1 ? 'h-8' : 'h-6'} w-[2px] rounded-b bg-gradient-to-b from-yellow-500 to-yellow-600/50`}
          />
        ))}
      </div>
    </motion.div>
  </motion.div>
);

/* ── Banner chúc Tết ── căn giữa chính xác ── */
const TetBanner = () => (
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.8 }}
    className="tet-banner pointer-events-none fixed inset-x-0 top-0 z-[55] flex justify-center"
  >
    <div className="pointer-events-auto flex items-center gap-2 rounded-b-2xl bg-gradient-to-r from-red-700 via-red-500 to-red-700 px-5 py-1.5 shadow-xl shadow-red-600/25 md:px-8 md:py-2">
      <span className="text-base md:text-lg">🧧</span>
      <span className="whitespace-nowrap text-xs font-bold tracking-wide text-yellow-100 md:text-sm">
        Chúc Mừng Năm Mới 2026 🎆
      </span>
      <span className="text-base md:text-lg">🧧</span>
    </div>
  </motion.div>
);

/* ── Pháo hoa canvas ── */
const FireworksCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      life: number; maxLife: number;
      color: string; size: number;
      trail: { x: number; y: number }[];
    }

    interface Rocket {
      x: number; y: number;
      targetY: number;
      speed: number;
      color: string;
      exploded: boolean;
    }

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];

    const colors = [
      '#ff4444', '#ff6b6b', '#ffd700', '#ffaa00',
      '#ff69b4', '#ff1493', '#00ff88', '#44ffcc',
      '#ff8855', '#ffcc33', '#ff3366', '#ff77aa',
    ];

    const createRocket = () => {
      rockets.push({
        x: Math.random() * canvas.width * 0.8 + canvas.width * 0.1,
        y: canvas.height,
        targetY: Math.random() * canvas.height * 0.4 + canvas.height * 0.1,
        speed: 3 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        exploded: false,
      });
    };

    const explode = (x: number, y: number, color: string) => {
      const count = 40 + Math.floor(Math.random() * 30);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
        const speed = 1.5 + Math.random() * 3;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 60 + Math.random() * 40,
          maxLife: 100,
          color,
          size: 2 + Math.random() * 1.5,
          trail: [],
        });
      }
      // Thêm các đốm sáng trung tâm
      for (let i = 0; i < 8; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 1;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 30 + Math.random() * 20,
          maxLife: 50,
          color: '#ffffff',
          size: 3,
          trail: [],
        });
      }
    };

    let frameCount = 0;
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      frameCount++;
      // Bắn pháo hoa mỗi 2-4 giây
      if (frameCount % (120 + Math.floor(Math.random() * 120)) === 0) {
        createRocket();
        if (Math.random() > 0.5) setTimeout(createRocket, 300);
      }

      // Vẽ rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y -= r.speed;

        // Vẽ trail rocket
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.fill();

        // Đuôi rocket
        const gradient = ctx.createLinearGradient(r.x, r.y, r.x, r.y + 20);
        gradient.addColorStop(0, r.color);
        gradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.moveTo(r.x - 1, r.y);
        ctx.lineTo(r.x + 1, r.y);
        ctx.lineTo(r.x, r.y + 20);
        ctx.fillStyle = gradient;
        ctx.fill();

        if (r.y <= r.targetY) {
          explode(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Vẽ particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 5) p.trail.shift();

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03; // gravity
        p.vx *= 0.99;
        p.life--;

        const alpha = Math.max(0, p.life / p.maxLife);

        // Vẽ trail
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let t = 1; t < p.trail.length; t++) {
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
          }
          ctx.strokeStyle = p.color.replace(')', `, ${alpha * 0.3})`).replace('rgb', 'rgba');
          ctx.lineWidth = p.size * 0.5;
          ctx.stroke();
        }

        // Vẽ hạt
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        if (p.life <= 0) particles.splice(i, 1);
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    // Bắn ngay 2 quả pháo hoa đầu tiên
    setTimeout(createRocket, 500);
    setTimeout(createRocket, 1200);
    draw();

    return () => {
      window.removeEventListener('resize', setSize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[58] h-screen w-screen"
    />
  );
};

/* ── Mã Đáo Thành Công 🐴 ── */
const HorseAnimation = () => {
  const [show, setShow] = useState(true);
  const [replay, setReplay] = useState(0);

  // Chạy ngựa lặp lại mỗi 25 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setReplay((p) => p + 1);
        setShow(true);
      }, 500);
    }, 25000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={replay}
          className="pointer-events-none fixed bottom-6 z-[56] md:bottom-10"
          initial={{ x: '-120px', opacity: 0 }}
          animate={{ x: ['calc(-120px)', 'calc(50vw - 60px)', 'calc(100vw + 120px)'], opacity: [0, 1, 1, 1, 0] }}
          transition={{ duration: 8, ease: 'easeInOut', times: [0, 0.45, 1] }}
        >
          <div className="relative flex flex-col items-center">
            {/* Ngựa phi */}
            <div className="horse-gallop text-5xl md:text-7xl" style={{ transform: 'scaleX(-1)' }}>
              🐎
            </div>
            {/* Băng chữ Mã Đáo Thành Công */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-1 whitespace-nowrap rounded-full bg-gradient-to-r from-red-600 to-red-500 px-3 py-0.5 text-[10px] font-bold text-yellow-100 shadow-lg md:px-4 md:py-1 md:text-xs"
            >
              🏇 Mã Đáo Thành Công 🏇
            </motion.div>
            {/* Bụi phía sau */}
            <motion.div
              className="absolute -bottom-1 -left-6 flex gap-1"
              animate={{ opacity: [0, 0.6, 0], x: [0, -15, -30] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              {[0, 1, 2].map((i) => (
                <span key={i} className="text-xs text-yellow-600/40">✦</span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ── Tổng hợp trang trí Tết ── */
const TetDecorations = () => {
  return (
    <>
      <TetLantern side="left" delay={0.2} />
      <TetLantern side="right" delay={0.5} />
      <TetBanner />
      <FireworksCanvas />
      <HorseAnimation />
    </>
  );
};

export default TetDecorations;
