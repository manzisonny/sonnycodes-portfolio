"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Award, GraduationCap } from "lucide-react";

const experiences = [
  {
    role: "Full Stack Developer",
    company: "Full Stack Software Ltd",
    date: "2024 - Present",
    description: "Developing scalable internal tools and SaaS products using Laravel, React, Flutter, and PostgreSQL. Leading architecture decisions and mobile app delivery.",
    icon: <Briefcase size={20} />,
  },
  {
    role: "Freelance Web Developer",
    company: "Self-Employed",
    date: "2023 - Present",
    description: "Designed and built custom e-commerce platforms and portfolio sites for local and international businesses using Next.js, Laravel, and Tailwind CSS.",
    icon: <Award size={20} />,
  },
  {
    role: "CS Student",
    company: "Adventist University of Central Africa",
    date: "2022 - Present",
    description: "Pursuing Computer Science with a focus on software engineering, database systems, and building real-world projects alongside academics.",
    icon: <GraduationCap size={20} />,
  },
];

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="py-32 relative bg-deepfir dark:bg-deepfir-900 text-white overflow-hidden">
      {/* Wave divider top */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none rotate-180">
        <svg className="relative block w-full h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white dark:fill-deepfir-800"></path>
        </svg>
      </div>

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -40 - i * 15, 0],
            x: [0, (i % 2 === 0 ? 20 : -20), 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
          className="absolute w-3 h-3 rounded-full bg-sulu/30"
          style={{ top: `${20 + i * 15}%`, right: `${5 + i * 8}%` }}
        />
      ))}

      <div className="max-w-5xl mx-auto px-6 relative z-10 pt-16">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="text-4xl md:text-6xl font-space font-black uppercase tracking-tight"
          >
            Work{" "}
            <motion.span
              animate={{ textShadow: ["0 0 0px #9FE870", "0 0 20px #9FE870", "0 0 0px #9FE870"] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-sulu"
            >
              Experience
            </motion.span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-16 h-1 bg-sulu rounded-full mt-6 mx-auto origin-center"
          />
        </div>

        <div className="relative">
          {/* Static line */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-0.5 bg-sulu/15 -translate-x-1/2" />
          {/* Animated line */}
          <motion.div
            className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-0.5 bg-sulu -translate-x-1/2 origin-top"
            style={{ scaleY: pathLength }}
          />

          <div className="space-y-20">
            {experiences.map((exp, idx) => (
              <div key={idx} className={`flex flex-col md:flex-row relative ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                {/* Glowing Node */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                  className="absolute left-[24px] md:left-1/2 -translate-x-1/2 z-10"
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(159,232,112,0)",
                        "0 0 25px rgba(159,232,112,0.6)",
                        "0 0 0px rgba(159,232,112,0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                    className="w-12 h-12 rounded-full bg-deepfir border-4 border-sulu flex items-center justify-center text-sulu"
                  >
                    {exp.icon}
                  </motion.div>
                </motion.div>

                {/* Content Card */}
                <motion.div
                  initial={{
                    opacity: 0,
                    x: idx % 2 === 0 ? 80 : -80,
                    rotateY: idx % 2 === 0 ? 15 : -15,
                  }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`ml-16 md:ml-0 md:w-[45%] ${idx % 2 === 0 ? "md:pl-0 md:pr-16 md:ml-auto" : "md:pr-0 md:pl-16"}`}
                >
                  <div className="bg-deepfir-800/50 border border-sulu/10 rounded-[24px] p-6 hover:border-sulu/30 transition-all duration-500 backdrop-blur-sm">
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
                      className="inline-block px-3 py-1 bg-sulu/10 text-sulu text-xs font-bold rounded-full mb-4 border border-sulu/20"
                    >
                      {exp.date}
                    </motion.span>
                    <h3 className="text-xl font-space font-bold mb-1">{exp.role}</h3>
                    <h4 className="text-sm text-sulu/70 font-medium mb-3">{exp.company}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
