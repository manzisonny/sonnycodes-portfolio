"use client";

import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  project: {
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
  };
  index: number;
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  React: "#61dafb",
  NextJS: "#000000",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  PHP: "#4F5D95",
  CSS: "#563d7c",
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const langColor = languageColors[project.language] || "#5A5A6A";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="glass p-6 flex flex-col group h-full transition-all border-t-2"
      style={{ borderTopColor: langColor }}
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
          project.account === 'company' ? 'bg-accent-cyan/20 text-accent-cyan' : 'bg-accent-purple/20 text-accent-purple'
        }`}>
          {project.account}
        </span>
        <div className="flex gap-3 text-text-muted">
          <div className="flex items-center gap-1 text-xs">
            <Star size={14} /> {project.stars}
          </div>
          <div className="flex items-center gap-1 text-xs">
            <GitFork size={14} /> {project.forks}
          </div>
        </div>
      </div>

      <h3 className="text-xl font-space font-bold mb-2 group-hover:text-accent-purple transition-colors">
        {project.name.replace(/-/g, ' ')}
      </h3>
      
      <p className="text-text-secondary text-sm line-clamp-2 mb-6 flex-1">
        {project.description || "No description provided."}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.topics.slice(0, 3).map(topic => (
          <span key={topic} className="px-2 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-text-muted">
            #{topic}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: langColor }} />
          <span className="text-xs text-text-muted font-medium">{project.language || 'Code'}</span>
        </div>
        <div className="flex gap-2">
          <a 
            href={project.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 hover:text-accent-purple transition-colors"
            title="View Code"
          >
            <Github size={18} />
          </a>
          {project.homepage && (
            <a 
              href={project.homepage} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 hover:text-accent-cyan transition-colors"
              title="Live Demo"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
