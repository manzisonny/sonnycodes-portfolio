"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Code, Server, AppWindow } from "lucide-react";
import { projects, Project } from "@/lib/data";

export default function Projects() {
  const [filter, setFilter] = useState<"all" | "personal" | "company" | "client">("all");

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    return project.category === filter;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "company":
        return <Server size={14} className="text-accent-purple" />;
      case "client":
        return <AppWindow size={14} className="text-accent-gold" />;
      default:
        return <Code size={14} className="text-accent-cyan" />;
    }
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent-purple mb-2">
              02 / Portfolio
            </p>
            <h2 className="text-3xl md:text-4xl font-space font-extrabold text-white">
              Featured Work
            </h2>
            <div className="w-12 h-[3px] bg-gradient-to-r from-accent-purple to-accent-cyan rounded-full mt-4" />
          </div>

          {/* Filtering tabs */}
          <div className="flex flex-wrap gap-2 bg-secondary/80 border border-white/5 p-1.5 rounded-xl backdrop-blur-md">
            {(["all", "company", "client", "personal"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                  filter === tab
                    ? "bg-gradient-to-r from-accent-purple to-[#837dff] text-white shadow-md shadow-accent-purple/10"
                    : "text-text-secondary hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                key={project.id}
                className="glass border-white/5 p-6 rounded-2xl flex flex-col justify-between group hover:border-accent-purple/20 transition-all duration-300 relative overflow-hidden h-full"
              >
                {/* Background glow hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/0 to-accent-cyan/0 group-hover:from-accent-purple/[0.02] group-hover:to-accent-cyan/[0.02] transition-colors duration-500 pointer-events-none" />

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      {getCategoryIcon(project.category)}
                      {project.category}
                    </span>
                    <span className="text-[10px] font-mono text-text-muted">
                      {project.language}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-space font-bold text-white mb-2 group-hover:text-accent-lavender transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links footer */}
                  <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-white transition-colors group/link"
                    >
                      <Github size={14} />
                      <span>Code</span>
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-white transition-colors group/link"
                      >
                        <ExternalLink size={14} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View all on Github */}
        <div className="flex justify-center mt-16">
          <a
            href="https://github.com/manzisonny"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center gap-2 group"
          >
            <span>View All on GitHub</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </a>
        </div>
      </div>
    </section>
  );
}
