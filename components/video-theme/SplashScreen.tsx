"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const letterVariants = {
    hidden: { y: 80, opacity: 0, rotateX: -90 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: 0.3 + i * 0.08,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const title = "Sonny Dev";

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{
        y: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-sulu overflow-hidden"
    >
      {/* Floating decorative circles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.5, 1],
            opacity: [0, 0.15, 0.08],
            x: [0, (i % 2 === 0 ? 1 : -1) * 100, 0],
            y: [0, (i < 3 ? -1 : 1) * 80, 0],
          }}
          transition={{
            duration: 3,
            delay: i * 0.2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute rounded-full bg-deepfir"
          style={{
            width: 60 + i * 40,
            height: 60 + i * 40,
            top: `${15 + i * 12}%`,
            left: `${10 + i * 15}%`,
          }}
        />
      ))}

      <div className="relative flex flex-col items-center perspective-1000">
        {/* Animated title letters */}
        <div className="flex overflow-hidden">
          {title.split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-8xl font-black text-deepfir font-space inline-block"
              style={{ transformOrigin: "bottom" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>

        {/* Subtitle sliding in */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-deepfir/60 text-sm md:text-lg font-medium tracking-[0.3em] uppercase mt-4"
        >
          Full Stack Engineer
        </motion.p>

        {/* Pulsing line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
          className="w-24 h-1 bg-deepfir rounded-full mt-6 origin-left"
        />
      </div>
    </motion.div>
  );
}
