"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Server, LayoutGrid, Database, Wrench } from "lucide-react";
import { skillCategories } from "@/lib/data";

export default function SkillsBento() {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "frontend": return <LayoutGrid size={22} className="text-sulu" />;
      case "backend": return <Server size={22} className="text-sulu" />;
      case "database": return <Database size={22} className="text-sulu" />;
      default: return <Wrench size={22} className="text-sulu" />;
    }
  };

  return (
    <section id="skills" className="py-28 relative bg-deepfir dark:bg-deepfir-900 overflow-hidden">
      {/* Floating background orbs */}
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-20 right-20 w-[400px] h-[400px] rounded-full bg-sulu/5 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
        className="absolute bottom-20 left-10 w-[300px] h-[300px] rounded-full bg-sulu/8 blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold uppercase tracking-[0.3em] text-sulu/60 mb-4"
          >
            Technical Arsenal
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
            className="text-4xl md:text-6xl font-space font-black text-white uppercase tracking-tight"
          >
            My <motion.span
              animate={{ color: ["#9FE870", "#c4f4a3", "#9FE870"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >Skillset</motion.span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-20 h-1 bg-sulu rounded-full mt-6 origin-left"
          />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((group, groupIdx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 60, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: groupIdx * 0.15,
                type: "spring",
                bounce: 0.3,
              }}
              whileHover={{
                y: -8,
                scale: 1.03,
                boxShadow: "0 20px 60px rgba(159,232,112,0.15)",
              }}
              className="bg-deepfir-800/50 dark:bg-black/30 border border-sulu/10 p-6 rounded-[28px] group hover:border-sulu/40 transition-all duration-500 relative overflow-hidden backdrop-blur-sm cursor-default"
            >
              {/* Hover glow */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute top-0 right-0 w-32 h-32 bg-sulu/10 blur-[40px] pointer-events-none transition-opacity duration-500"
              />

              <div className="relative z-10">
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="p-2.5 bg-sulu/10 rounded-xl"
                  >
                    {getCategoryIcon(group.title)}
                  </motion.div>
                  <h3 className="font-space font-bold text-base text-white uppercase tracking-wider">
                    {group.title}
                  </h3>
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  {group.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: groupIdx * 0.1 + skillIdx * 0.08, duration: 0.5 }}
                      className="space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                        <span className="text-gray-300">{skill.name}</span>
                        <motion.span
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: groupIdx * 0.1 + skillIdx * 0.08 + 0.3, type: "spring", bounce: 0.5 }}
                          className="text-sulu"
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                      <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: groupIdx * 0.1 + skillIdx * 0.1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-sulu/80 to-sulu rounded-full shadow-[0_0_10px_rgba(159,232,112,0.5)]"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Currently learning */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-gray-500 mt-16 max-w-md mx-auto"
        >
          Currently exploring: AI/ML, Docker & Kubernetes, AWS Cloud, System Design
        </motion.p>
      </div>
    </section>
  );
}
