'use client';

import { useEffect, useRef } from 'react';

const SnowOverlay = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const flakes = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 1.5,
      s: Math.random() * 0.8 + 0.6,
      sway: Math.random() * 0.5 - 0.25,
    }));

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const flake of flakes) {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.65)';
        ctx.fill();

        flake.y += flake.s;
        flake.x += flake.sway;

        if (flake.y > canvas.height) {
          flake.y = -flake.r;
          flake.x = Math.random() * canvas.width;
        }
        if (flake.x > canvas.width) flake.x = 0;
        if (flake.x < 0) flake.x = canvas.width;
      }
      animationRef.current = requestAnimationFrame(draw);
    };
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
      className="pointer-events-none fixed inset-0 z-[60] h-screen w-screen"
    />
  );
};

export default SnowOverlay;
