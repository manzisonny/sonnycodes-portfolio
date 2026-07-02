"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, PenTool, Code, Rocket } from "lucide-react";

const processes = [
  {
    id: "01",
    title: "Research",
    description: "Understanding requirements, user needs, and technical constraints to lay a solid foundation.",
    icon: <Search className="w-7 h-7" />,
    color: "#9FE870",
  },
  {
    id: "02",
    title: "Design",
    description: "Crafting clean architecture, intuitive interfaces, and scalable database schemas.",
    icon: <PenTool className="w-7 h-7" />,
    color: "#9FE870",
  },
  {
    id: "03",
    title: "Develop",
    description: "Building robust frontend applications and efficient backend services using modern stacks.",
    icon: <Code className="w-7 h-7" />,
    color: "#9FE870",
  },
  {
    id: "04",
    title: "Deploy",
    description: "Rigorous testing, performance optimization, and seamless cloud deployment.",
    icon: <Rocket className="w-7 h-7" />,
    color: "#9FE870",
  },
];

export default function ProcessFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="py-32 relative bg-white dark:bg-deepfir-800 text-deepfir dark:text-white overflow-hidden"
    >
      {/* Background decoration */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -right-40 w-[500px] h-[500px] border border-sulu/10 rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-60 -left-60 w-[700px] h-[700px] border border-deepfir/5 dark:border-sulu/5 rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16 items-start relative z-10">
        {/* Left Side: Sticky Title */}
        <div className="lg:sticky top-32 lg:w-1/3 z-10">
          <motion.p
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm font-bold uppercase tracking-[0.3em] text-sulu/60 dark:text-sulu/50 mb-4"
          >
            My Process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="text-4xl md:text-5xl font-space font-black leading-tight mb-6"
          >
            Here's how I
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-sulu block"
            >
              build things
            </motion.span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-gray-500 dark:text-gray-400 text-base max-w-md"
          >
            A structured, iterative approach that separates good ideas from robust, full-stack applications.
          </motion.p>
        </div>

        {/* Right Side: Flowchart */}
        <div className="lg:w-2/3 relative w-full pt-10">
          {/* Animated line */}
          <div className="absolute left-[39px] top-0 bottom-0 w-0.5 bg-deepfir/10 dark:bg-sulu/10 rounded-full" />
          <motion.div
            className="absolute left-[39px] top-0 bottom-0 w-0.5 bg-sulu origin-top rounded-full"
            style={{ scaleY: pathLength }}
          />

          <div className="space-y-16 relative">
            {processes.map((process, idx) => (
              <motion.div
                key={process.id}
                initial={{ opacity: 0, x: 80, rotateY: 20 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.15,
                  type: "spring",
                  bounce: 0.25,
                }}
                className="flex gap-8 relative"
              >
                {/* Node */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileInView={{
                    boxShadow: [
                      "0 0 0px rgba(159,232,112,0)",
                      "0 0 20px rgba(159,232,112,0.4)",
                      "0 0 0px rgba(159,232,112,0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                  viewport={{ once: true }}
                  className="relative z-10 w-20 h-20 rounded-full bg-deepfir dark:bg-sulu/10 text-sulu flex flex-col items-center justify-center shrink-0 shadow-xl border-4 border-white dark:border-deepfir"
                >
                  <span className="text-[10px] font-black opacity-50 mb-0.5">{process.id}</span>
                  {process.icon}
                </motion.div>

                {/* Card */}
                <motion.div
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                    boxShadow: "0 20px 50px rgba(159,232,112,0.1)",
                  }}
                  className="bg-gray-50 dark:bg-deepfir-800/50 border border-gray-100 dark:border-sulu/10 p-8 rounded-3xl transition-all duration-300 w-full group cursor-default"
                >
                  <motion.h3
                    className="text-2xl font-space font-bold mb-3 group-hover:text-sulu transition-colors duration-300"
                  >
                    {process.title}
                  </motion.h3>
                  <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed">
                    {process.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
