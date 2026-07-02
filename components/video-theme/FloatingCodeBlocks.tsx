"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

const codeSnippets = [
  "const app = express()",
  "async function deploy()",
  "return await fetch(url)",
  "npm run build",
  "export default Home",
  "import React from 'react'",
  "SELECT * FROM users",
  "git push origin main",
  "docker-compose up -d",
  "interface Props { }",
  "useState<boolean>()",
  "router.get('/api')",
  "res.json({ status })",
  "npm install next",
  "tailwind.config.ts",
  "prisma migrate dev",
  "useEffect(() => { })",
  "const [data, setData]",
  ".env.production",
  "flutter run --release",
  "php artisan serve",
  "CREATE TABLE posts",
  "middleware('auth')",
  "componentDidMount()",
  "onClick={() => {}}",
  "<motion.div />",
  "className={cn()}",
  "border-radius: 50%",
  "box-shadow: 0 0 10px",
  "transition: all 0.3s",
];

interface FloatingBlock {
  id: number;
  text: string;
  x: number;
  y: number;
  z: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  duration: number;
  delay: number;
  size: number;
}

export default function FloatingCodeBlocks() {
  const blocks: FloatingBlock[] = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      text: codeSnippets[i % codeSnippets.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random() * 200 - 100,
      rotateX: Math.random() * 30 - 15,
      rotateY: Math.random() * 40 - 20,
      rotateZ: Math.random() * 20 - 10,
      duration: 15 + Math.random() * 25,
      delay: Math.random() * 10,
      size: 10 + Math.random() * 3,
    }));
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden perspective-1000">
      {blocks.map((block) => (
        <motion.div
          key={block.id}
          initial={{
            x: `${block.x}vw`,
            y: `${block.y}vh`,
            rotateX: block.rotateX,
            rotateY: block.rotateY,
            rotateZ: block.rotateZ,
            opacity: 0,
          }}
          animate={{
            x: [
              `${block.x}vw`,
              `${(block.x + 15) % 100}vw`,
              `${(block.x - 10 + 100) % 100}vw`,
              `${block.x}vw`,
            ],
            y: [
              `${block.y}vh`,
              `${(block.y - 20 + 100) % 100}vh`,
              `${(block.y + 10) % 100}vh`,
              `${block.y}vh`,
            ],
            rotateX: [
              block.rotateX,
              block.rotateX + 15,
              block.rotateX - 10,
              block.rotateX,
            ],
            rotateY: [
              block.rotateY,
              block.rotateY - 20,
              block.rotateY + 25,
              block.rotateY,
            ],
            rotateZ: [
              block.rotateZ,
              block.rotateZ + 8,
              block.rotateZ - 5,
              block.rotateZ,
            ],
            opacity: [0, 0.04, 0.06, 0.03, 0],
          }}
          transition={{
            duration: block.duration,
            delay: block.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute preserve-3d select-none"
          style={{
            fontSize: `${block.size}px`,
            fontFamily: "'Courier New', monospace",
            transform: `translateZ(${block.z}px)`,
          }}
        >
          <span className="text-sulu/60 dark:text-sulu/40 font-mono font-bold whitespace-nowrap px-3 py-1.5 rounded-lg border border-sulu/10 bg-sulu/[0.02] backdrop-blur-[1px]">
            {block.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
