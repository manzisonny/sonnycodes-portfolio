"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
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
      {/* Ambient background particles */}
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

        {/* Diagonal mesh overlay */}
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle, var(--text-primary) 1px, transparent 1px)`,
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
            className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border-border mb-6 text-xs font-semibold text-text-secondary"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-pulse" />
            Software Engineer from Kigali, Rwanda 🇷🇼
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-space font-extrabold text-text-primary leading-[1.1] mb-4"
          >
            Hi, I am <br />
            <span className="text-gradient font-black">
              Manzi Sonny
            </span>
          </motion.h1>

          {/* Subtitle */}
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
            className="glass border-border p-5 max-w-lg rounded-2xl relative overflow-hidden group hover:border-accent-purple/20 transition-all duration-300"
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
            className="relative w-full max-w-[380px] aspect-[4/5] rounded-[32px] preserve-3d p-3 bg-gradient-to-br from-text-primary/10 to-text-primary/[0.02] border border-border shadow-2xl group"
          >
            {/* Ambient Backlight glow */}
            <div className="absolute -inset-1 rounded-[34px] bg-gradient-to-r from-accent-purple to-accent-cyan opacity-10 blur-xl group-hover:opacity-30 transition-opacity duration-500" />

            {/* Inner Container */}
            <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-secondary">
              <Image
                src="/images/sonny-hero.jpg"
                alt="Manzi Sonny"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 380px"
              />
              {/* Overlay Gradient shadow */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent opacity-80" />

              {/* Float info tag overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass border-border backdrop-blur-md">
                <p className="text-[10px] text-text-secondary uppercase tracking-widest font-bold mb-0.5">
                  Currently Active
                </p>
                <p className="text-xs font-bold text-text-primary">
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
