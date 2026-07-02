"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { personalInfo } from "@/lib/data";
import MatrixRain from "./MatrixRain";

const photos = [
  "/images/sonny-hero.jpg",
  "/images/sonny-casual.jpg",
  "/images/sonny-portrait1.png",
  "/images/sonny-outdoor.jpg",
  "/images/sonny-portrait2.png",
];

export default function HeroSection() {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollIntoView = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.offsetTop - 80;
      window.scrollTo({ top: top >= 0 ? top : 0, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-primary dark:bg-deepfir"
    >
      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* Animated background blobs */}
      <motion.div
        animate={{ x: [0, 60, -30, 0], y: [0, -80, 40, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-[500px] h-[500px] rounded-full bg-sulu/20 dark:bg-sulu/10 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -50, 70, 0], y: [0, 60, -50, 0], scale: [1, 0.8, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-[600px] h-[600px] rounded-full bg-deepfir/10 dark:bg-sulu/5 blur-[150px] pointer-events-none"
      />

      {/* Floating decorative particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30 - i * 10, 0],
            x: [0, (i % 2 === 0 ? 15 : -15), 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
          className="absolute w-2 h-2 rounded-full bg-sulu/40 dark:bg-sulu/60"
          style={{
            top: `${10 + i * 10}%`,
            left: `${5 + i * 12}%`,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        {/* Left Content */}
        <div className="flex flex-col items-start text-left">
          {/* Badge bouncing in */}
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.5 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-sulu/20 dark:bg-sulu/10 border border-sulu/30 mb-6"
          >
            <Sparkles size={14} className="text-sulu animate-pulse" />
            <span className="text-xs font-bold text-deepfir dark:text-sulu uppercase tracking-widest">
              Software Engineer · Kigali 🇷🇼
            </span>
          </motion.div>

          {/* Title with staggered word animation */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-space font-black leading-[1.05] mb-4"
          >
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="block text-text-primary"
            >
              Hi, I'm
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60, rotateZ: -3 }}
              animate={{ opacity: 1, y: 0, rotateZ: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="block text-sulu dark:text-sulu"
              style={{ textShadow: "0 0 30px rgba(159,232,112,0.3)" }}
            >
              Manzi Sonny
            </motion.span>
          </motion.h1>

          {/* Subtitle sliding up */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-text-secondary mb-8 max-w-lg leading-relaxed"
          >
            {personalInfo.title} · {personalInfo.subtitle}
          </motion.p>

          {/* Bio text appearing */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="text-sm text-text-muted mb-10 max-w-md leading-relaxed"
          >
            I design and deliver secure, scalable, high-performance applications.
            Turning ideas into real-world solutions from Kigali, Rwanda.
          </motion.p>

          {/* Action buttons bouncing in */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, type: "spring", bounce: 0.4 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(159,232,112,0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollIntoView("projects")}
              className="px-8 py-4 bg-sulu text-deepfir font-bold rounded-full shadow-lg shadow-sulu/20 flex items-center gap-2 transition-colors"
            >
              View My Work
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <ArrowRight size={18} />
              </motion.span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "rgba(159,232,112,0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollIntoView("contact")}
              className="px-8 py-4 bg-transparent border-2 border-border hover:border-sulu text-text-primary font-medium rounded-full transition-all"
            >
              Let's Connect
            </motion.button>
          </motion.div>

          {/* Stats row bouncing in */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex gap-8"
          >
            {Object.entries(personalInfo.stats).map(([key, value], idx) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + idx * 0.15, type: "spring", bounce: 0.5 }}
                className="text-center"
              >
                <motion.p
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                  className="text-2xl font-black text-sulu"
                >
                  {value}
                </motion.p>
                <p className="text-[10px] uppercase tracking-widest text-text-muted font-bold mt-1">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Content - Photo Slideshow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center perspective-1000"
        >
          <motion.div
            whileHover={{ rotateY: 8, rotateX: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="relative w-full max-w-[380px] aspect-[4/5] rounded-[32px] preserve-3d p-3 bg-gradient-to-br from-sulu/20 to-deepfir/10 border border-sulu/20 shadow-2xl group"
          >
            {/* Ambient glow */}
            <motion.div
              animate={{ opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -inset-2 rounded-[36px] bg-gradient-to-r from-sulu to-sulu/50 blur-xl pointer-events-none"
            />

            {/* Photo container */}
            <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-secondary">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhoto}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={photos[currentPhoto]}
                    alt="Manzi Sonny"
                    fill
                    priority
                    className="object-cover object-[center_top] transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 380px"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-deepfir/60 via-transparent to-transparent" />

              {/* Slideshow dots */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {photos.map((_, idx) => (
                  <motion.div
                    key={idx}
                    animate={{ scale: idx === currentPhoto ? 1.3 : 1 }}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      idx === currentPhoto ? "bg-sulu" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>

              {/* Float info tag */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-deepfir/80 backdrop-blur-md border border-sulu/20 z-10"
              >
                <p className="text-[10px] text-sulu uppercase tracking-widest font-bold mb-0.5">
                  Currently Active
                </p>
                <p className="text-xs font-bold text-white">
                  Kigali, Rwanda 🇷🇼
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator bouncing */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 hover:opacity-100 transition-opacity"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          onClick={() => scrollIntoView("skills")}
          className="cursor-pointer"
        >
          <ChevronDown size={20} className="text-sulu" />
        </motion.div>
      </motion.div>
    </section>
  );
}
