"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  index: number;
}

export function StatCard({ label, value, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass p-6 text-center"
    >
      <h3 className="text-3xl md:text-4xl font-space font-bold text-gradient mb-2">{value}</h3>
      <p className="text-text-muted uppercase text-xs tracking-widest">{label}</p>
    </motion.div>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

export function ServiceCard({ title, description, icon: Icon, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, borderColor: "rgba(108, 99, 255, 0.5)" }}
      className="glass p-8 group transition-all"
    >
      <div className="w-12 h-12 bg-accent-purple/10 rounded-xl flex items-center justify-center text-accent-purple mb-6 group-hover:bg-accent-purple group-hover:text-white transition-colors">
        <Icon size={24} />
      </div>
      <h4 className="text-xl font-space mb-2">{title}</h4>
      <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}
