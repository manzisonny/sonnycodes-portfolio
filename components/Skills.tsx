"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Server, LayoutGrid } from "lucide-react";
import { skillCategories } from "@/lib/data";

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "languages":
      case "frontend":
        return <Code2 size={20} className="text-accent-purple" />;
      case "frameworks":
      case "backend":
        return <Server size={20} className="text-accent-cyan" />;
      default:
        return <LayoutGrid size={20} className="text-accent-gold" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-start mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-purple mb-2">
            03 / Ecosystem
          </p>
          <h2 className="text-3xl md:text-4xl font-space font-extrabold text-text-primary">
            Technical Arsenal
          </h2>
          <div className="w-12 h-[3px] bg-gradient-to-r from-accent-purple to-accent-cyan rounded-full mt-4" />
        </div>

        {/* Skill Groups */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((group) => (
            <motion.div
              variants={itemVariants}
              key={group.title}
              className="glass border-border p-6 rounded-2xl flex flex-col justify-between group hover:border-accent-purple/20 transition-all duration-300 relative overflow-hidden"
            >
              {/* Backglow hover */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-accent-purple/5 blur-xl group-hover:bg-accent-purple/10 transition-colors duration-300 pointer-events-none" />

              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  {getCategoryIcon(group.title)}
                  <h3 className="font-space font-bold text-lg text-text-primary">
                    {group.title}
                  </h3>
                </div>

                {/* Skills list with animated progress lines */}
                <div className="space-y-4">
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span className="text-text-primary">{skill.name}</span>
                        <span className="text-text-secondary">{skill.level}%</span>
                      </div>
                      
                      {/* Progress bar container */}
                      <div className="h-1.5 w-full bg-secondary border border-border rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-accent-purple to-accent-cyan"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer info statement */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-xs text-text-secondary leading-relaxed">
            Technology never stops evolving, and neither do I. Here are a few topics I am currently 
            delving into to expand my engineering toolkit: System Design, Kubernetes, Advanced Go, and Rust.
          </p>
        </div>
      </div>
    </section>
  );
}
