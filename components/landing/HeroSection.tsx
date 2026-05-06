"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const titles = ["Full Stack Engineer", "Builder of Ideas", "Rwanda 🇷🇼 · Global Mindset"];
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentTitle.slice(0, typedText.length + 1));
        if (typedText.length === currentTitle.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setTypedText(currentTitle.slice(0, typedText.length - 1));
        if (typedText.length === 0) {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, titleIndex]);

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0f]">
      {/* Particle Background Placeholder (Canvas can be added later for performance) */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--accent-purple)_0%,_transparent_70%)] opacity-20" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full border-2 border-accent-purple pulse-purple overflow-hidden">
             {/* Replace with actual photo later */}
            <div className="w-full h-full bg-secondary flex items-center justify-center text-accent-purple font-bold text-2xl">
              MC
            </div>
          </div>
        </div>

        <p className="text-text-muted text-sm uppercase tracking-[0.2em] mb-2">
          Munyurangabo Manzi Sonny
        </p>
        
        <h1 className="text-7xl md:text-8xl font-space font-bold mb-4">
          <span className="text-gradient">Sonny Codes</span>
        </h1>

        <div className="h-8 mb-8">
          <p className="text-xl md:text-2xl text-text-secondary font-inter">
            {typedText}
            <span className="animate-pulse">|</span>
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="max-w-md"
        >
          <blockquote className="italic text-accent-gold text-lg font-space opacity-80">
            "Do you see someone skilled in their work? They will serve before kings."
            <footer className="mt-2 text-sm not-italic opacity-60">— Proverbs 22:29</footer>
          </blockquote>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 z-10 text-text-muted"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}
