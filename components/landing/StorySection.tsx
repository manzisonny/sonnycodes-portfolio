"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { School, Terminal, Rocket, Cpu } from "lucide-react";

const milestones = [
  {
    year: "2019",
    title: "It started in high school...",
    description: "Software was just another subject — until the day I built something simple and it actually worked. That moment changed everything.",
    icon: <School className="text-accent-purple" size={32} />,
  },
  {
    year: "2022",
    title: "Then something clicked.",
    description: "I had big ideas but no skills, and that gap became my obsession. I started building real-world projects, line by line.",
    icon: <Terminal className="text-accent-cyan" size={32} />,
    isTerminal: true,
  },
  {
    year: "Today",
    title: "Ideas with no skills — a dangerous gap.",
    description: "For nearly 5 years I've been closing it. Today, coding isn't just what I do. It's how I think.",
    icon: <Cpu className="text-accent-purple" size={32} />,
    stats: ["847+ commits", "3 years", "15+ projects"],
  },
];

export default function StorySection() {
  return (
    <section className="relative py-24 px-6 md:px-24 bg-primary overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl md:text-5xl font-space mb-20 text-center"
        >
          My <span className="text-gradient">Story</span>
        </motion.h2>

        <div className="space-y-32">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col md:flex-row gap-12 items-center ${
                index % 2 === 0 ? "" : "md:flex-row-reverse"
              }`}
            >
              <div className="flex-1">
                <div className="glass p-8 border-l-4 border-l-accent-purple relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    {milestone.icon}
                  </div>
                  <span className="inline-block px-3 py-1 bg-accent-purple/20 text-accent-purple text-sm font-bold rounded-full mb-4">
                    {milestone.year}
                  </span>
                  <h3 className="text-2xl font-space mb-4">{milestone.title}</h3>
                  <p className="text-text-secondary leading-relaxed">
                    {milestone.description}
                  </p>
                  
                  {milestone.stats && (
                    <div className="mt-6 flex flex-wrap gap-4">
                      {milestone.stats.map((stat, i) => (
                        <div key={i} className="text-center">
                          <p className="text-accent-cyan font-space font-bold text-lg">{stat.split(" ")[0]}</p>
                          <p className="text-text-muted text-xs uppercase">{stat.split(" ").slice(1).join(" ")}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {milestone.isTerminal && (
                    <div className="mt-6 p-4 bg-black/50 rounded-lg font-mono text-sm text-green-400 border border-green-900/30">
                      <p>$ node init_passion.js</p>
                      <p className="opacity-70">Building vision...</p>
                      <p className="text-accent-cyan">✓ Logic connected</p>
                      <p className="text-accent-purple">✓ Purpose found</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="hidden md:flex flex-1 justify-center">
                <motion.div 
                  animate={{ rotate: index % 2 === 0 ? 5 : -5 }}
                  className="w-64 h-64 bg-accent-purple/5 rounded-full blur-3xl absolute -z-10"
                />
                <div className="p-4 bg-secondary rounded-2xl border border-border shadow-2xl">
                   {/* Abstract illustration/icon */}
                   {milestone.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
