"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Handshake, Mail, Building, DollarSign, Calendar, Rocket, ExternalLink, Trash2 } from "lucide-react";

export default function AdminCollabs() {
  const [collabs, setCollabs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => {
    fetchCollabs();
  }, []);

  async function fetchCollabs() {
    const { data } = await supabase
      .from("collaborations")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (data) setCollabs(data);
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from("collaborations").update({ status }).eq("id", id);
    fetchCollabs();
    if (selected?.id === id) setSelected({ ...selected, status });
  }

  async function deleteCollab(id: string) {
    if (confirm("Are you sure you want to delete this collaboration request?")) {
      await supabase.from("collaborations").delete().eq("id", id);
      setSelected(null);
      fetchCollabs();
    }
  }

  const statusColors: Record<string, string> = {
    new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    reviewing: "bg-accent-gold/20 text-accent-gold border-accent-gold/30",
    accepted: "bg-green-500/20 text-green-400 border-green-500/30",
    declined: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-3xl font-space font-bold mb-2 text-gradient">Collaboration Requests</h1>
        <p className="text-text-muted">High-intent project proposals.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {loading ? (
            [...Array(5)].map((_, i) => <div key={i} className="glass h-24 animate-pulse" />)
          ) : (
            collabs.map((collab) => (
              <button
                key={collab.id}
                onClick={() => setSelected(collab)}
                className={`w-full text-left p-6 glass transition-all border-l-4 ${
                  selected?.id === collab.id ? "border-l-accent-cyan bg-white/5" : "border-l-transparent"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold truncate max-w-[150px]">{collab.name}</p>
                  <span className={`text-[8px] font-bold px-2 py-1 rounded uppercase tracking-widest border ${statusColors[collab.status]}`}>
                    {collab.status}
                  </span>
                </div>
                <p className="text-sm text-text-secondary truncate">{collab.company || "No Company"}</p>
                <div className="mt-4 flex gap-4 text-[10px] text-text-muted uppercase font-bold">
                   <span>{collab.budget}</span>
                   <span>{collab.timeline}</span>
                </div>
              </button>
            ))
          )}
        </div>

        <div className="lg:col-span-2">
          {selected ? (
            <div className="glass p-10 h-full">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-3xl font-space font-bold mb-4">{selected.name}</h2>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-text-muted"><Mail size={14} /> {selected.email}</div>
                    <div className="flex items-center gap-2 text-text-muted"><Building size={14} /> {selected.company || "Self-employed"}</div>
                    <div className="flex items-center gap-2 text-accent-gold"><DollarSign size={14} /> {selected.budget}</div>
                    <div className="flex items-center gap-2 text-accent-cyan"><Calendar size={14} /> {selected.timeline}</div>
                  </div>
                </div>
                <select 
                  value={selected.status}
                  onChange={(e) => updateStatus(selected.id, e.target.value)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border outline-none appearance-none cursor-pointer ${statusColors[selected.status]}`}
                >
                  <option value="new">New</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="accepted">Accepted</option>
                  <option value="declined">Declined</option>
                </select>
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">The Idea</h3>
                  <div className="bg-white/5 p-6 rounded-2xl border border-border">
                    <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">{selected.idea}</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">Tech Stack Preferences</h3>
                  <div className="flex flex-wrap gap-2">
                    {selected.tech_stack.map((tech: string) => (
                      <span key={tech} className="px-3 py-1 bg-accent-purple/10 text-accent-purple border border-accent-purple/20 rounded-lg text-xs font-bold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>

                <div className="flex justify-between items-center pt-8 border-t border-border">
                  {selected.brief_url ? (
                    <a href={selected.brief_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-accent-cyan hover:underline font-bold text-sm">
                      <Rocket size={16} /> View Attached Brief <ExternalLink size={14} />
                    </a>
                  ) : (
                    <span className="text-sm text-text-muted italic">No brief attached</span>
                  )}
                  <button 
                    onClick={() => deleteCollab(selected.id)}
                    className="flex items-center gap-2 text-text-muted hover:text-red-400 transition-colors text-sm font-bold"
                  >
                    <Trash2 size={16} /> Delete Request
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass h-full flex flex-col items-center justify-center p-12 text-center">
              <Handshake size={64} className="text-text-muted opacity-20 mb-6" />
              <p className="text-text-muted">Select a collaboration request to view details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
