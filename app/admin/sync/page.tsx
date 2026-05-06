"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { RefreshCcw, CheckCircle2, AlertCircle, Github, ExternalLink } from "lucide-react";

export default function SyncPanel() {
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("updated_at", { ascending: false });
      
      if (data) {
        setRepos(data);
        if (data.length > 0) {
          setLastSync(data[0].updated_at);
        }
      }
    }
    fetchData();
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    setMessage("");
    try {
      const res = await fetch("/api/sync-repos", { method: "POST" });
      const data = await res.json();
      
      if (res.ok) {
        setMessage("Sync successful!");
        // Refresh local data
        const { data: newData } = await supabase.from("projects").select("*").order("updated_at", { ascending: false });
        if (newData) setRepos(newData);
      } else {
        setMessage(data.error || "Sync failed");
      }
    } catch (err) {
      setMessage("An error occurred during sync");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-space font-bold mb-2">GitHub Sync Engine</h1>
          <p className="text-text-muted">Manage repository data across all accounts.</p>
        </div>
        <button
          disabled={syncing}
          onClick={handleSync}
          className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
            syncing ? "bg-white/10 text-text-muted" : "bg-accent-purple text-white hover:scale-105"
          }`}
        >
          <RefreshCcw size={20} className={syncing ? "animate-spin" : ""} />
          {syncing ? "Syncing..." : "Trigger Manual Sync"}
        </button>
      </header>

      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-3 font-medium ${
          message.includes("success") ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
        }`}>
          {message.includes("success") ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          {message}
        </div>
      )}

      <div className="glass overflow-hidden">
        <div className="p-6 border-b border-border bg-white/5 flex justify-between items-center">
          <h3 className="font-space font-bold flex items-center gap-2">
            <Github size={18} /> Currently Managed Repositories
          </h3>
          <span className="text-xs text-text-muted uppercase tracking-widest font-bold">
            Total: {repos.length}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold text-text-muted uppercase tracking-widest border-b border-border">
                <th className="px-6 py-4">Repository</th>
                <th className="px-6 py-4">Account</th>
                <th className="px-6 py-4">Language</th>
                <th className="px-6 py-4">Stars</th>
                <th className="px-6 py-4">Last Updated</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {repos.map((repo) => (
                <tr key={repo.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-bold text-white group-hover:text-accent-purple transition-colors">{repo.name}</p>
                    <p className="text-xs text-text-muted line-clamp-1 max-w-[200px]">{repo.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest ${
                      repo.account === 'company' ? 'bg-accent-cyan/20 text-accent-cyan' : 'bg-accent-purple/20 text-accent-purple'
                    }`}>
                      {repo.account}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{repo.language}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{repo.stars}</td>
                  <td className="px-6 py-4 text-sm text-text-muted">
                    {new Date(repo.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-white transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
