"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const scrollIntoView = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.offsetTop - 80;
      window.scrollTo({
        top: top >= 0 ? top : 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* 3D floating background particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Floating gradient circles */}
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -60, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-accent-purple/5 blur-[80px]"
        />
        <motion.div
          animate={{
            x: [0, -30, 50, 0],
            y: [0, 50, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-10 w-[450px] h-[450px] rounded-full bg-accent-cyan/5 blur-[100px]"
        />

        {/* Floating 3D shapes */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[20%] right-[15%] opacity-20 text-accent-purple hidden md:block"
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect
              x="2"
              y="2"
              width="36"
              height="36"
              rx="8"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-[25%] left-[10%] opacity-20 text-accent-cyan hidden md:block"
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <polygon points="20,2 38,38 2,38" stroke="currentColor" strokeWidth="2" />
          </svg>
        </motion.div>

        {/* Diagonal mesh overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left column: Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Tagline */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border-white/5 mb-6 text-xs font-semibold text-accent-lavender"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-pulse" />
            Software Engineer from Kigali, Rwanda 🇷🇼
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-space font-extrabold text-white leading-[1.1] mb-4"
          >
            Hi, I am <br />
            <span className="text-gradient font-black">
              {personalInfo.nickname}
            </span>
          </motion.h1>

          {/* Subtitle / Typewriter effect static representation */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl font-medium text-text-secondary mb-8 max-w-xl"
          >
            {personalInfo.title} · {personalInfo.subtitle}
          </motion.p>

          {/* Action buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 mb-12"
          >
            <button
              onClick={() => scrollIntoView("projects")}
              className="btn-primary"
            >
              View My Work
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => scrollIntoView("contact")}
              className="btn-secondary"
            >
              Let's Connect
            </button>
          </motion.div>

          {/* Bible Verse Widget */}
          <motion.div
            variants={itemVariants}
            className="glass border-white/5 p-5 max-w-lg rounded-2xl relative overflow-hidden group hover:border-accent-purple/20 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-accent-purple/5 blur-xl group-hover:bg-accent-purple/10 transition-colors duration-300" />
            <p className="italic text-text-secondary text-sm leading-relaxed mb-2.5 relative z-10">
              "{personalInfo.verse.text}"
            </p>
            <p className="text-xs font-bold text-accent-purple uppercase tracking-wider relative z-10">
              — {personalInfo.verse.reference}
            </p>
          </motion.div>
        </motion.div>

        {/* Right column: 3D-like Interactive Image Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center perspective-1000"
        >
          {/* Card wrapping the image with simulated 3D tilt */}
          <motion.div
            whileHover={{ rotateY: 10, rotateX: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="relative w-full max-w-[380px] aspect-[4/5] rounded-[32px] preserve-3d p-3 bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 shadow-2xl shadow-black/50 group"
          >
            {/* Ambient Backlight glow */}
            <div className="absolute -inset-1 rounded-[34px] bg-gradient-to-r from-accent-purple to-accent-cyan opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500" />

            {/* Inner Container */}
            <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-secondary">
              <Image
                src="/images/sonny-hero.jpg"
                alt={personalInfo.name}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 380px"
              />
              {/* Overlay Gradient shadow */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-80" />

              {/* Float info tag overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass border-white/5 backdrop-blur-md">
                <p className="text-xs text-text-secondary uppercase tracking-widest font-bold mb-0.5">
                  Currently Active
                </p>
                <p className="text-sm font-bold text-white">
                  Kigali, Rwanda 🇷🇼
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity duration-300">
        <span className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          onClick={() => scrollIntoView("about")}
          className="cursor-pointer"
        >
          <ChevronDown size={20} className="text-accent-purple" />
        </motion.div>
      </div>
    </section>
  );
}
