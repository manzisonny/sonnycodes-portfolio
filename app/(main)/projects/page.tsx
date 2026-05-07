"use client";

import { useEffect, useState, useCallback } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { supabase } from "@/lib/supabase";
import { Search } from "lucide-react";

// Shape that both Supabase rows and GitHub API responses are normalised to
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

const PERSONAL = "manzisonny";
const COMPANY  = "fullstacksoftwareltdrwanda";

/** Fetch repos straight from GitHub when Supabase is empty */
async function fetchFromGitHub(): Promise<Project[]> {
  try {
    const headers: HeadersInit = { Accept: "application/vnd.github+json" };

    const [personalRes, companyRes] = await Promise.all([
      fetch(`https://api.github.com/users/${PERSONAL}/repos?per_page=100&sort=updated`, { headers }),
      fetch(`https://api.github.com/users/${COMPANY}/repos?per_page=100&sort=updated`,  { headers }),
    ]);

    const [personalData, companyData] = await Promise.all([
      personalRes.ok ? personalRes.json() : [],
      companyRes.ok  ? companyRes.json()  : [],
    ]);

    const map = (repos: any[], account: string): Project[] =>
      repos.map((r: any) => ({
        id:          r.id,
        name:        r.name,
        description: r.description || "",
        html_url:    r.html_url,
        homepage:    r.homepage || "",
        language:    r.language || "",
        topics:      r.topics  || [],
        stars:       r.stargazers_count,
        forks:       r.forks_count,
        account,
        updated_at:  r.updated_at,
      }));

    return [
      ...map(personalData, "personal"),
      ...map(companyData,  "company"),
    ].sort((a, b) => b.stars - a.stars);
  } catch {
    return [];
  }
}

const tabs = ["All", "Personal", "Company", "Web", "Mobile"] as const;

export default function ProjectsPage() {
  const [allProjects, setAllProjects]       = useState<Project[]>([]);
  const [filteredProjects, setFiltered]      = useState<Project[]>([]);
  const [loading, setLoading]               = useState(true);
  const [activeTab, setActiveTab]           = useState<typeof tabs[number]>("All");
  const [searchQuery, setSearchQuery]       = useState("");

  // Load: try Supabase first, fall back to GitHub API
  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("stars", { ascending: false });

      if (data && data.length > 0) {
        setAllProjects(data as Project[]);
      } else {
        // Supabase empty → fetch directly from GitHub
        const ghRepos = await fetchFromGitHub();
        setAllProjects(ghRepos);
      }
      setLoading(false);
    }
    load();
  }, []);

  // Recompute filtered list whenever tab / search / projects change
  useEffect(() => {
    let result = allProjects;

    if (activeTab === "Personal") {
      result = result.filter(p => p.account === "personal");
    } else if (activeTab === "Company") {
      result = result.filter(p => p.account === "company");
    } else if (activeTab === "Web") {
      result = result.filter(p =>
        p.topics?.includes("web") ||
        p.language === "TypeScript" ||
        p.language === "JavaScript" ||
        p.language === "HTML" ||
        p.language === "CSS"
      );
    } else if (activeTab === "Mobile") {
      result = result.filter(p =>
        p.topics?.includes("mobile") ||
        p.language === "Dart" ||
        p.language === "Kotlin" ||
        p.language === "Swift" ||
        p.topics?.includes("react-native") ||
        p.topics?.includes("flutter")
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.language?.toLowerCase().includes(q)
      );
    }

    setFiltered(result);
  }, [activeTab, searchQuery, allProjects]);

  const clearFilters = useCallback(() => {
    setActiveTab("All");
    setSearchQuery("");
  }, []);

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl md:text-5xl font-space mb-4">Projects</h1>
        <p className="text-text-secondary text-lg">Built with purpose. Shipped with pride.</p>
      </header>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div className="flex flex-wrap bg-secondary p-1 rounded-xl border border-border gap-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-accent-purple text-white shadow-lg"
                  : "text-text-muted hover:text-white"
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
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-xl focus:outline-none focus:border-accent-purple transition-colors text-sm text-white"
          />
        </div>
      </div>

      {/* Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass h-64 animate-pulse" />
          ))}
        </div>
      ) : filteredProjects.length > 0 ? (
        <>
          <p className="text-text-muted text-sm">Showing {filteredProjects.length} of {allProjects.length} projects</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-24 glass">
          <p className="text-text-secondary text-lg mb-6">
            {allProjects.length === 0
              ? "No projects have been synced yet."
              : "No projects match your current filters."}
          </p>
          {allProjects.length > 0 && (
            <button
              onClick={clearFilters}
              className="btn-primary"
            >
              Clear Filters — Show All {allProjects.length} Projects
            </button>
          )}
        </div>
      )}
    </div>
  );
}
