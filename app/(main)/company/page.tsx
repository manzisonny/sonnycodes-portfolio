"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Building2, Github, ArrowRight, Users, Globe, Smartphone } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CompanyPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCompanyProjects() {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("account", "company")
        .order("stars", { ascending: false });

      if (data) setProjects(data);
      setLoading(false);
    }
    getCompanyProjects();
  }, []);

  const services = [
    { title: "Enterprise Web Solutions", icon: Globe, description: "Building robust systems for businesses in Rwanda and beyond." },
    { title: "Mobile Innovation", icon: Smartphone, description: "Creating seamless mobile experiences for modern consumers." },
    { title: "Consultancy", icon: Users, description: "Technical guidance for startups and established enterprises." },
  ];

  return (
    <div className="space-y-24">
      {/* Hero */}
      <section className="text-center py-12 glass relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-accent-cyan/5 -z-10" />
        <div className="max-w-3xl mx-auto px-6">
          <div className="inline-flex p-4 bg-accent-cyan/10 text-accent-cyan rounded-2xl mb-8">
            <Building2 size={48} />
          </div>
          <h1 className="text-4xl md:text-6xl font-space mb-6">Full Stack Software <span className="text-accent-cyan">Ltd Rwanda</span></h1>
          <p className="text-xl text-text-secondary leading-relaxed">
            Leading the digital transformation in Kigali. We specialize in building production-ready software that scales with your ambition.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <a 
              href="https://github.com/fullstacksoftwareltdrwanda" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
            >
              <Github size={20} /> GitHub
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
          {services.map((s, i) => (
            <div key={i} className="glass p-8 group hover:border-accent-cyan/50 transition-all">
              <div className="w-14 h-14 bg-accent-cyan/10 text-accent-cyan rounded-xl flex items-center justify-center mb-6">
                <s.icon size={28} />
              </div>
              <h3 className="text-xl font-space mb-4">{s.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section>
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-space mb-2">Company Projects</h2>
            <p className="text-text-muted">Open-source work and public repositories from Full Stack Software Ltd.</p>
          </div>
          <Link href="/projects" className="text-accent-cyan hover:underline hidden md:block">View all projects</Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => <div key={i} className="glass h-64 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Team */}
      <section className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-space mb-8">The Team</h2>
        <div className="glass p-8 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-2 border-accent-cyan mb-4 overflow-hidden bg-secondary">
             {/* Sonny photo */}
             <div className="w-full h-full flex items-center justify-center text-accent-cyan font-bold">Sonny</div>
          </div>
          <h3 className="text-xl font-space mb-1">Munyurangabo Manzi Sonny</h3>
          <p className="text-accent-cyan text-sm mb-4">Founder & Lead Engineer</p>
          <p className="text-text-muted text-sm italic">"Building the future of software in Rwanda, one line at a time."</p>
        </div>
      </section>
    </div>
  );
}
