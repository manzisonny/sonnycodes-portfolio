"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";

export default function ProjectsShowcase() {
  const [filter, setFilter] = useState<"all" | "personal" | "company" | "client">("all");

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    return project.category === filter;
  });

  return (
    <section id="projects" className="py-28 relative bg-primary dark:bg-deepfir overflow-hidden">
      {/* Floating decorations */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-40 right-20 w-16 h-16 border-2 border-sulu/10 rounded-xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 50, 0], rotate: [0, -120, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute bottom-60 left-10 w-10 h-10 border-2 border-sulu/15 rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-sulu/5 blur-[200px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-start mb-16">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold uppercase tracking-[0.3em] text-sulu/50 mb-4"
          >
            Portfolio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="text-4xl md:text-5xl font-space font-black text-text-primary leading-tight"
          >
            Work that{" "}
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-sulu via-sulu-300 to-sulu bg-[length:200%_auto]"
            >
              speaks for itself
            </motion.span>
          </motion.h2>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {(["all", "company", "client", "personal"] as const).map((tab, idx) => (
            <motion.button
              key={tab}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + idx * 0.1, type: "spring", bounce: 0.5 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                filter === tab
                  ? "bg-sulu text-deepfir shadow-[0_0_20px_rgba(159,232,112,0.3)]"
                  : "bg-secondary dark:bg-deepfir-800 text-text-secondary border border-border hover:border-sulu/30"
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid - Medium sized cards, 3-column */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 60, rotateX: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.08,
                  type: "spring",
                  bounce: 0.25,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                  boxShadow: "0 25px 60px rgba(159,232,112,0.12)",
                }}
                key={project.id}
                className="group bg-secondary dark:bg-deepfir-800/50 border border-border dark:border-sulu/10 rounded-[24px] overflow-hidden transition-all duration-500 hover:border-sulu/40 cursor-default"
              >
                {/* Project Image */}
                <div className="relative h-44 w-full overflow-hidden bg-deepfir/5 dark:bg-black/30">
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary dark:from-deepfir via-transparent to-transparent opacity-60" />

                  {/* Category badge floating */}
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 + 0.3 }}
                    className="absolute top-3 left-3 px-3 py-1 rounded-full bg-sulu/90 text-deepfir text-[10px] font-black uppercase tracking-wider backdrop-blur-sm"
                  >
                    {project.category}
                  </motion.span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <motion.h3
                    className="text-lg font-space font-bold text-text-primary group-hover:text-sulu transition-colors duration-300 mb-2"
                  >
                    {project.title}
                  </motion.h3>
                  <p className="text-text-secondary text-xs leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.slice(0, 4).map((tech, techIdx) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 + techIdx * 0.05 + 0.4, type: "spring", bounce: 0.5 }}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-sulu/10 text-sulu dark:text-sulu border border-sulu/10 font-bold"
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-[10px] px-2 py-0.5 text-text-muted">+{project.tech.length - 4}</span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-3 border-t border-border dark:border-sulu/5">
                    <motion.a
                      whileHover={{ scale: 1.1, x: 2 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-bold text-text-secondary hover:text-sulu transition-colors"
                    >
                      <Github size={14} /> Code
                    </motion.a>
                    {project.live && (
                      <motion.a
                        whileHover={{ scale: 1.1, x: 2 }}
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-bold text-text-secondary hover:text-sulu transition-colors"
                      >
                        <ExternalLink size={14} /> Live
                        <ArrowUpRight size={12} />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 flex justify-center"
        >
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(159,232,112,0.2)" }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/manzisonny"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-sulu text-deepfir font-bold rounded-full flex items-center gap-2 shadow-lg shadow-sulu/10 transition-all"
          >
            Explore All Repositories
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.2 }}>
              <ArrowUpRight size={18} />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
