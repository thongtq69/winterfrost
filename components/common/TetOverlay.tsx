'use client';

import { useEffect, useRef } from 'react';

/**
 * Hiệu ứng hoa đào / hoa mai rơi cho dịp Tết Nguyên Đán
 * Thay thế SnowOverlay trong mùa Tết
 */
const TetOverlay = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Màu hoa đào và hoa mai
    const petalColors = [
      'rgba(255, 150, 170, 0.8)',  // Hồng đào đậm
      'rgba(255, 182, 193, 0.75)', // Hồng đào nhạt
      'rgba(255, 200, 210, 0.7)',  // Hồng pastel
      'rgba(255, 215, 0, 0.7)',    // Vàng mai
      'rgba(255, 230, 50, 0.65)',  // Vàng nhạt
      'rgba(255, 105, 135, 0.6)',  // Hồng đậm
    ];

    interface Petal {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotationSpeed: number;
      color: string;
      opacity: number;
      swayAmplitude: number;
      swaySpeed: number;
      phase: number;
      type: 'petal' | 'dot';
    }

    const createPetal = (startFromTop = false): Petal => {
      const type = Math.random() > 0.3 ? 'petal' : 'dot';
      return {
        x: Math.random() * window.innerWidth,
        y: startFromTop ? -20 : Math.random() * window.innerHeight,
        size: type === 'petal' ? Math.random() * 8 + 5 : Math.random() * 3 + 1.5,
        speedY: Math.random() * 1.2 + 0.4,
        speedX: Math.random() * 0.4 - 0.2,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 2 - 1,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        opacity: Math.random() * 0.4 + 0.4,
        swayAmplitude: Math.random() * 40 + 20,
        swaySpeed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
        type,
      };
    };

    const petals: Petal[] = Array.from({ length: 45 }, () => createPetal());

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const drawPetal = (petal: Petal, time: number) => {
      ctx.save();

      const swayX = Math.sin(time * petal.swaySpeed + petal.phase) * petal.swayAmplitude;
      const drawX = petal.x + swayX;

      ctx.translate(drawX, petal.y);
      ctx.rotate((petal.rotation * Math.PI) / 180);
      ctx.globalAlpha = petal.opacity;

      if (petal.type === 'petal') {
        // Vẽ cánh hoa đào
        ctx.beginPath();
        ctx.fillStyle = petal.color;

        // Hình cánh hoa oval
        ctx.ellipse(0, 0, petal.size * 0.5, petal.size, 0, 0, Math.PI * 2);
        ctx.fill();

        // Thêm highlight nhỏ
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.ellipse(-petal.size * 0.1, -petal.size * 0.3, petal.size * 0.15, petal.size * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Vẽ chấm nhỏ (nhụy hoa)
        ctx.beginPath();
        ctx.arc(0, 0, petal.size, 0, Math.PI * 2);
        ctx.fillStyle = petal.color;
        ctx.fill();
      }

      ctx.restore();
    };

    let time = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      for (const petal of petals) {
        drawPetal(petal, time);

        petal.y += petal.speedY;
        petal.x += petal.speedX;
        petal.rotation += petal.rotationSpeed;

        // Reset khi ra khỏi màn hình
        if (petal.y > canvas.height + 20) {
          petal.y = -20;
          petal.x = Math.random() * canvas.width;
          petal.rotation = Math.random() * 360;
        }
        if (petal.x > canvas.width + 40) petal.x = -40;
        if (petal.x < -40) petal.x = canvas.width + 40;
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

export default TetOverlay;
