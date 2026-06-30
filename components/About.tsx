"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, ShieldCheck, MapPin, Heart } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-purple mb-2">
            01 / Identity
          </p>
          <h2 className="text-3xl md:text-4xl font-space font-extrabold text-text-primary">
            About Me
          </h2>
          <div className="w-12 h-[3px] bg-gradient-to-r from-accent-purple to-accent-cyan rounded-full mt-4" />
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
        >
          {/* Card 1: Main Bio (Large) */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-8 glass p-8 border-border relative overflow-hidden flex flex-col justify-between group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-purple/5 blur-2xl group-hover:bg-accent-purple/10 transition-colors" />
            <div>
              <div className="flex items-center gap-3 text-accent-purple mb-6">
                <BookOpen size={22} />
                <h3 className="font-space font-bold text-lg text-text-primary">
                  My Story
                </h3>
              </div>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6">
                {personalInfo.bio}
              </p>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                As a student at the{" "}
                <span className="text-text-primary font-semibold">
                  {personalInfo.university}
                </span>
                , I combine academic foundation with active hands-on development at{" "}
                <span className="text-text-primary font-semibold">
                  {personalInfo.company}
                </span>
                . I am dedicated to writing clean, maintainable code and solving complex database challenges.
              </p>
            </div>

            {/* Counters row */}
            <div className="grid grid-cols-3 gap-4 border-t border-border pt-8 mt-8">
              <div>
                <p className="text-2xl md:text-3xl font-space font-black text-text-primary">
                  {personalInfo.stats.yearsExperience}
                </p>
                <p className="text-xs text-text-secondary font-medium mt-1">
                  Years Exp
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-space font-black text-text-primary">
                  {personalInfo.stats.projectsBuilt}
                </p>
                <p className="text-xs text-text-secondary font-medium mt-1">
                  Projects Built
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-space font-black text-text-primary">
                  {personalInfo.stats.githubRepos}
                </p>
                <p className="text-xs text-text-secondary font-medium mt-1">
                  GitHub Repos
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Workspace Coding Photo (Vertical) */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-4 rounded-2xl border border-border overflow-hidden relative group min-h-[300px] shadow-lg"
          >
            <Image
              src="/images/sonny-coding.jpg"
              alt="Sonny Coding"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85" />
            <div className="absolute bottom-6 left-6">
              <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] uppercase tracking-wider font-semibold text-accent-cyan backdrop-blur-md">
                Workspace
              </span>
              <p className="text-white font-space font-bold mt-2">
                Coded with Integrity
              </p>
            </div>
          </motion.div>

          {/* Card 3: Location / Rwandan Pride (Jersey photo) */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-5 rounded-2xl border border-border overflow-hidden relative group min-h-[280px] shadow-lg"
          >
            <Image
              src="/images/sonny-rwanda.png"
              alt="Sonny in Rwandan Jersey"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-90" />
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div>
                <div className="flex items-center gap-1.5 text-accent-cyan text-xs font-semibold mb-1">
                  <MapPin size={12} className="text-accent-purple" />
                  Kigali, Rwanda
                </div>
                <p className="text-white font-space font-bold text-lg">
                  Based in the heart of East Africa
                </p>
              </div>
              <div className="w-10 h-6 relative rounded overflow-hidden border border-white/10 flex-shrink-0">
                <div className="absolute top-0 inset-x-0 h-[40%] bg-[#00A3E0]" />
                <div className="absolute top-[40%] inset-x-0 h-[30%] bg-[#FAD201]" />
                <div className="absolute bottom-0 inset-x-0 h-[30%] bg-[#2D6A4F]" />
              </div>
            </div>
          </motion.div>

          {/* Card 4: Values & Core Beliefs */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-4 glass p-8 border-border flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center gap-3 text-accent-cyan mb-6">
                <ShieldCheck size={22} />
                <h3 className="font-space font-bold text-lg text-text-primary">
                  My Core Values
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-purple mt-2" />
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">Integrity First</h4>
                    <p className="text-xs text-text-secondary mt-0.5">
                      Writing clean, secure, and well-documented systems.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan mt-2" />
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">Consistency</h4>
                    <p className="text-xs text-text-secondary mt-0.5">
                      Delivering solid solutions and growing every single day.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-gold mt-2" />
                  <div>
                    <h4 className="text-sm font-bold text-text-primary">Faith Driven</h4>
                    <p className="text-xs text-text-secondary mt-0.5">
                      Approaching work with purpose and diligence.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Card 5: Beyond the Code (Hobby & Outdoor photo) */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-3 glass p-6 border-border flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center gap-2 text-accent-gold mb-4">
                <Heart size={18} />
                <h3 className="font-space font-bold text-sm text-text-primary">
                  Beyond Coding
                </h3>
              </div>
              <p className="text-text-secondary text-xs leading-relaxed">
                When I'm not coding, I'm exploring Rwanda's beautiful landscapes,
                supporting local tech communities, and enjoying outdoor sports.
              </p>
            </div>
            <div className="relative w-full h-[110px] rounded-xl overflow-hidden mt-4 shadow-md">
              <Image
                src="/images/sonny-outdoor.jpg"
                alt="Outdoor Hobbies"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
