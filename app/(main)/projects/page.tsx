"use client";

import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { supabase } from "@/lib/supabase";
import { Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["All", "Personal", "Company", "Web", "Mobile"];

  useEffect(() => {
    async function getProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("stars", { ascending: false });

      if (data) {
        setProjects(data);
        setFilteredProjects(data);
      }
      setLoading(false);
    }
    getProjects();
  }, []);

  useEffect(() => {
    let result = projects;

    if (activeTab === "Personal") {
      result = result.filter(p => p.account === "personal");
    } else if (activeTab === "Company") {
      result = result.filter(p => p.account === "company");
    } else if (activeTab === "Web") {
      result = result.filter(p => p.topics?.includes("web") || p.language === "TypeScript" || p.language === "JavaScript");
    } else if (activeTab === "Mobile") {
      result = result.filter(p => p.topics?.includes("mobile") || p.language === "Dart" || p.topics?.includes("react-native"));
    }

    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.language?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProjects(result);
  }, [activeTab, searchQuery, projects]);

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl md:text-5xl font-space mb-4">Projects</h1>
        <p className="text-text-secondary text-lg">Built with purpose. Shipped with pride.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div className="flex bg-secondary p-1 rounded-xl border border-border">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab ? "bg-accent-purple text-white shadow-lg" : "text-text-muted hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-xl focus:outline-none focus:border-accent-purple transition-colors text-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass h-64 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <div className="text-text-muted text-sm">
            Showing {filteredProjects.length} projects
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </>
      )}

      {!loading && filteredProjects.length === 0 && (
        <div className="text-center py-24 glass">
          <p className="text-text-secondary text-lg mb-4">No projects found matching your criteria.</p>
          <button 
            onClick={() => { setActiveTab("All"); setSearchQuery(""); }}
            className="text-accent-purple hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
