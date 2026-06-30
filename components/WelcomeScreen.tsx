"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function WelcomeScreen({ onComplete }: { onComplete: () => void }) {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
    // Wait for the exit animation to finish before calling onComplete
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.05,
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center p-6 text-center select-none"
        >
          {/* Subtle moving grid background */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, var(--text-primary) 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative max-w-lg w-full flex flex-col items-center gap-8">
            {/* Pulsing Outer Ring & Photo */}
            <div className="relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-32 h-32 rounded-full p-[3px] bg-gradient-to-br from-accent-purple via-[#837dff] to-accent-cyan shadow-xl shadow-accent-purple/10"
              >
                <div className="relative w-full h-full rounded-full overflow-hidden bg-secondary">
                  <Image
                    src="/images/sonny-casual.jpg"
                    alt="Manzi Sonny"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>

              {/* Pulsing ring animation */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full border border-accent-purple pointer-events-none"
              />
            </div>

            {/* Name and Tagline */}
            <div className="space-y-3">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl sm:text-3xl font-space font-extrabold text-text-primary tracking-tight"
              >
                Munyurangabo Manzi Sonny
              </motion.h1>
              <motion.p
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm font-medium text-text-secondary tracking-widest uppercase"
              >
                Full Stack Software Engineer
              </motion.p>
            </div>

            {/* Action Entry Button */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4"
            >
              <button
                onClick={handleEnter}
                className="group relative px-8 py-3.5 bg-gradient-to-r from-accent-purple to-[#837dff] text-white font-medium rounded-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-accent-purple/10 flex items-center gap-2.5 overflow-hidden"
              >
                {/* Background Shimmer hover effect */}
                <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[-20deg] translate-x-[-100%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-out" />
                
                <span>Enter Portfolio</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Footer Verse */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 max-w-xs text-center"
          >
            <p className="text-[11px] italic text-text-secondary">
              "Commit to the Lord whatever you do..."
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
