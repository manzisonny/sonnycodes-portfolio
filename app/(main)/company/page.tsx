"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Building2, Github, ArrowRight, Users, Globe, Smartphone, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const COMPANY_GITHUB = "fullstacksoftwareltdrwanda";

interface Project {
  id: string | number;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  language: string;
  topics: string[];
  stars: number;
  forks: number;
  account: string;
  updated_at: string;
}

async function fetchCompanyFromGitHub(): Promise<Project[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${COMPANY_GITHUB}/repos?per_page=100&sort=updated`,
      { headers: { Accept: "application/vnd.github+json" } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.map((r: any) => ({
      id:          r.id,
      name:        r.name,
      description: r.description || "",
      html_url:    r.html_url,
      homepage:    r.homepage || "",
      language:    r.language || "",
      topics:      r.topics || [],
      stars:       r.stargazers_count,
      forks:       r.forks_count,
      account:     "company",
      updated_at:  r.updated_at,
    })).sort((a: Project, b: Project) => b.stars - a.stars);
  } catch {
    return [];
  }
}

const services = [
  {
    title: "Enterprise Web Solutions",
    icon: Globe,
    description: "Building robust, scalable systems for businesses in Rwanda and beyond — from MVPs to full enterprise platforms.",
  },
  {
    title: "Mobile Innovation",
    icon: Smartphone,
    description: "Creating seamless cross-platform mobile experiences using Flutter and React Native for modern consumers.",
  },
  {
    title: "Consultancy & Training",
    icon: Users,
    description: "Technical guidance, architecture reviews, and software training for startups and established enterprises.",
  },
];

// Team sourced from fullstack.rw
const team = [
  {
    name: "Munyurangabo Manzi Sonny",
    role: "Co-Founder & Lead Engineer",
    initials: "MS",
    color: "text-accent-purple",
    border: "border-accent-purple",
  },
  {
    name: "Full Stack Software Ltd",
    role: "Rwanda-based Software Company",
    initials: "FS",
    color: "text-accent-cyan",
    border: "border-accent-cyan",
  },
];

export default function CompanyPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      // Try Supabase first
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("account", "company")
        .order("stars", { ascending: false });

      if (data && data.length > 0) {
        setProjects(data as Project[]);
      } else {
        // Fallback: fetch directly from GitHub
        const ghRepos = await fetchCompanyFromGitHub();
        setProjects(ghRepos);
      }

      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="space-y-24">
      {/* Hero */}
      <section className="text-center py-12 glass relative overflow-hidden">
        <div className="absolute inset-0 bg-accent-cyan/5 -z-10" />
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex p-4 bg-accent-cyan/10 text-accent-cyan rounded-2xl mb-8"
          >
            <Building2 size={48} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-space mb-6"
          >
            Full Stack Software{" "}
            <span className="text-accent-cyan">Ltd Rwanda</span>
          </motion.h1>
          <p className="text-xl text-text-secondary leading-relaxed mb-4">
            Leading digital transformation in Kigali. We build production-ready software
            that scales with your ambition.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-text-muted mb-10">
            <span className="flex items-center gap-1"><MapPin size={14} /> Kigali, Rwanda</span>
            <span className="flex items-center gap-1"><Mail size={14} /> info@fullstack.rw</span>
            <span className="flex items-center gap-1"><Globe size={14} /> fullstack.rw</span>
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://github.com/fullstacksoftwareltdrwanda"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
            >
              <Github size={20} /> GitHub
            </a>
            <a
              href="https://fullstack.rw"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
            >
              <Globe size={20} /> Website
            </a>
            <Link href="/contact" className="btn-primary flex items-center gap-2">
              Work with us <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section>
        <h2 className="text-3xl font-space mb-12 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 group hover:border-accent-cyan/50 transition-all"
              >
                <div className="w-14 h-14 bg-accent-cyan/10 text-accent-cyan rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent-cyan group-hover:text-primary transition-colors">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-space mb-4">{s.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{s.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Company Projects */}
      <section>
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-space mb-2">Company Projects</h2>
            <p className="text-text-muted">
              Open-source work and public repositories from Full Stack Software Ltd Rwanda.
            </p>
          </div>
          <a
            href={`https://github.com/${COMPANY_GITHUB}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-cyan hover:underline hidden md:flex items-center gap-2 text-sm"
          >
            <Github size={16} /> View on GitHub
          </a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass h-64 animate-pulse" />
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="glass p-12 text-center">
            <Github size={48} className="text-text-muted opacity-20 mx-auto mb-4" />
            <p className="text-text-muted mb-4">No public repositories found yet.</p>
            <a
              href={`https://github.com/${COMPANY_GITHUB}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-cyan hover:underline text-sm"
            >
              View GitHub profile →
            </a>
          </div>
        )}
      </section>

      {/* Team */}
      <section className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-space mb-12 text-center">The Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 flex flex-col items-center text-center"
            >
              <div
                className={`w-20 h-20 rounded-full border-2 ${member.border} mb-4 overflow-hidden bg-secondary flex items-center justify-center ${member.color} font-bold text-lg font-space`}
              >
                {member.initials}
              </div>
              <h3 className="text-lg font-space font-bold mb-1">{member.name}</h3>
              <p className={`text-sm mb-3 ${member.color}`}>{member.role}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact info */}
        <div className="mt-12 glass p-8 text-center">
          <h3 className="text-xl font-space font-bold mb-6">Get In Touch</h3>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-text-secondary">
            <a href="mailto:info@fullstack.rw" className="flex items-center gap-2 hover:text-accent-cyan transition-colors">
              <Mail size={16} /> info@fullstack.rw
            </a>
            <a href="https://fullstack.rw" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent-cyan transition-colors">
              <Globe size={16} /> fullstack.rw
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={16} /> Kigali, Rwanda
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
