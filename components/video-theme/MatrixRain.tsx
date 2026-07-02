"use client";

import React, { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Characters: mix of code symbols, keywords, and some katakana for that Matrix feel
    const chars = "01{}[]()<>=;:const let var function async await return import export if else for while => + - * / % ! & | ~ ^ . , ? # @ $ _ ア イ ウ エ オ カ キ ク ケ コ";
    const charArray = chars.split(" ").filter(Boolean);

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(0);

    // Randomize initial positions so they don't all start from top
    for (let i = 0; i < drops.length; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      // Semi-transparent overlay creates the trailing fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'Courier New', monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];

        // Vary the green shade for depth
        const brightness = Math.random();
        if (brightness > 0.95) {
          // Bright flash — the "leading" character
          ctx.fillStyle = "#FFFFFF";
        } else if (brightness > 0.7) {
          ctx.fillStyle = "rgba(159, 232, 112, 0.8)"; // Bright Sulu
        } else if (brightness > 0.4) {
          ctx.fillStyle = "rgba(159, 232, 112, 0.4)"; // Medium Sulu
        } else {
          ctx.fillStyle = "rgba(159, 232, 112, 0.15)"; // Faint Sulu
        }

        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        // Reset drop to top with some randomness
        if (y > canvas.height && Math.random() > 0.985) {
          drops[i] = 0;
        }

        // Slow fall speed — subtle, not overwhelming
        drops[i] += 0.4 + Math.random() * 0.3;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.07 }}
    />
  );
}
