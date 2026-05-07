"use client";

import { motion } from "framer-motion";
import {
  LucideIcon,
  Code2,
  Smartphone,
  Globe,
  Palette,
  Layers,
  Terminal,
  ShieldCheck,
  Zap,
  Users,
} from "lucide-react";

// ─── StatCard ────────────────────────────────────────────────────────────────

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
      <h3 className="text-3xl md:text-4xl font-space font-bold text-gradient mb-2">
        {value}
      </h3>
      <p className="text-text-muted uppercase text-xs tracking-widest">{label}</p>
    </motion.div>
  );
}

// ─── ServiceCard (internal — never exported to server) ───────────────────────

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

function ServiceCard({ title, description, icon: Icon, index }: ServiceCardProps) {
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

// ─── ServicesSection (self-contained client component) ────────────────────────

const services: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Web Development",
    description: "Modern, high-performance web applications built with Next.js and React.",
    icon: Globe,
  },
  {
    title: "Mobile Apps",
    description: "Cross-platform mobile experiences using React Native and Flutter.",
    icon: Smartphone,
  },
  {
    title: "API Development",
    description: "Scalable backend systems and RESTful APIs with Node.js and GraphQL.",
    icon: Terminal,
  },
  {
    title: "UI/UX Design",
    description: "Premium, user-centric interfaces designed with Figma and implemented with CSS.",
    icon: Palette,
  },
  {
    title: "DevOps & Deployment",
    description: "Automated CI/CD pipelines and cloud infrastructure management.",
    icon: Layers,
  },
  {
    title: "Tech Mentoring",
    description: "Guiding the next generation of developers through code reviews and advice.",
    icon: Code2,
  },
];

export function ServicesSection() {
  return (
    <section>
      <h2 className="text-3xl font-space mb-12 text-center">What I Do</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <ServiceCard key={i} {...service} index={i} />
        ))}
      </div>
    </section>
  );
}

// ─── ValuesSection (self-contained client component) ─────────────────────────

const values: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Integrity First",
    description: "I don't work like an employee. I work like an owner. Honesty is my core stack.",
    icon: ShieldCheck,
  },
  {
    title: "Built to Last",
    description: "Clean, scalable, and maintainable code that grows with your vision.",
    icon: Zap,
  },
  {
    title: "People > Technology",
    description: "Software is a tool for humans. I build solutions that solve real human problems.",
    icon: Users,
  },
];

export function ValuesSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {values.map((val, i) => {
        const Icon = val.icon;
        return (
          <div
            key={i}
            className="text-center p-8 glass group hover:border-accent-cyan/50 transition-colors"
          >
            <div className="inline-flex w-16 h-16 items-center justify-center bg-accent-cyan/10 text-accent-cyan rounded-full mb-6 group-hover:scale-110 transition-transform">
              <Icon size={32} />
            </div>
            <h3 className="text-xl font-space mb-4">{val.title}</h3>
            <p className="text-text-muted text-sm">{val.description}</p>
          </div>
        );
      })}
    </section>
  );
}
