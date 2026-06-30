"use client";

import React from "react";
import { motion } from "framer-motion";
import { skillCategories, currentlyLearning } from "@/lib/data";

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

  return (
    <section id="skills" className="py-24 relative bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-start mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-purple mb-2">
            03 / Ecosystem
          </p>
          <h2 className="text-3xl md:text-4xl font-space font-extrabold text-white">
            Skills & Technologies
          </h2>
          <div className="w-12 h-[3px] bg-gradient-to-r from-accent-purple to-accent-cyan rounded-full mt-4" />
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {skillCategories.map((category) => (
            <motion.div
              variants={itemVariants}
              key={category.title}
              className="glass p-8 border-white/5 relative overflow-hidden group hover:border-accent-purple/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="font-space font-bold text-lg text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-text-secondary">{skill.name}</span>
                      <span className="text-accent-lavender">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/[0.03] border border-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-accent-purple to-accent-cyan rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Currently Learning Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass border-white/5 p-8 relative overflow-hidden max-w-3xl mx-auto text-center"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-accent-cyan/5 blur-3xl pointer-events-none" />
          <h3 className="font-space font-bold text-lg text-white mb-4">
            Currently Exploring & Learning
          </h3>
          <p className="text-text-secondary text-sm mb-6 max-w-xl mx-auto">
            Technology never stops evolving, and neither do I. Here are a few topics I am currently dive-bombing into to expand my engineering toolbelt:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {currentlyLearning.map((topic) => (
              <span
                key={topic}
                className="text-xs px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-accent-lavender font-medium"
              >
                {topic}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
