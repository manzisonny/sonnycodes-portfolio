"use client";

import { motion } from "framer-motion";

interface ProgressRingProps {
  percentage: number;
  label: string;
  color: string;
}

export function ProgressRing({ percentage, label, color }: ProgressRingProps) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-white/5"
          />
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute font-space font-bold text-xl">{percentage}%</span>
      </div>
      <p className="font-space font-bold uppercase tracking-widest text-sm text-text-secondary">{label}</p>
    </div>
  );
}

interface SkillHexProps {
  name: string;
  icon?: string;
  index: number;
}

export function SkillHex({ name, index }: SkillHexProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.02 }}
      whileHover={{ y: -5, scale: 1.1 }}
      className="w-24 h-24 relative flex items-center justify-center group cursor-default"
    >
      <div className="absolute inset-0 bg-secondary border border-border group-hover:border-accent-purple/50 transition-colors" 
           style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} 
      />
      <div className="relative z-10 text-center p-2">
        <span className="text-[10px] font-bold text-text-muted group-hover:text-white transition-colors uppercase leading-tight">
          {name}
        </span>
      </div>
    </motion.div>
  );
}
