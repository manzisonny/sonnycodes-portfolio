"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Rocket } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function CollabForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    idea: "",
    budget: "<$500",
    timeline: "Flexible",
    tech_stack: [] as string[],
  });

  const techOptions = ["React/Next.js", "Node.js", "Mobile (RN/Flutter)", "PostgreSQL", "UI/UX Design", "DevOps"];

  const toggleTech = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      tech_stack: prev.tech_stack.includes(tech)
        ? prev.tech_stack.filter(t => t !== tech)
        : [...prev.tech_stack, tech]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const { error } = await supabase.from("collaborations").insert([formData]);
      if (error) throw error;
      setStatus("success");
      setFormData({ name: "", company: "", email: "", idea: "", budget: "<$500", timeline: "Flexible", tech_stack: [] });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Name</label>
          <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 focus:border-accent-cyan outline-none transition-all" placeholder="Your Name" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Company (Optional)</label>
          <input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 focus:border-accent-cyan outline-none transition-all" placeholder="Acme Inc." />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Email</label>
        <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 focus:border-accent-cyan outline-none transition-all" placeholder="john@example.com" />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Project Idea</label>
        <textarea required rows={4} value={formData.idea} onChange={e => setFormData({...formData, idea: e.target.value})} className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 focus:border-accent-cyan outline-none transition-all resize-none" placeholder="Describe your vision..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Budget Range</label>
          <select value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 focus:border-accent-cyan outline-none transition-all appearance-none">
            <option value="<$500">&lt;$500</option>
            <option value="$500–2k">$500–2k</option>
            <option value="$2k–5k">$2k–5k</option>
            <option value="$5k+">$5k+</option>
            <option value="Let's discuss">Let's discuss</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Timeline</label>
          <select value={formData.timeline} onChange={e => setFormData({...formData, timeline: e.target.value})} className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 focus:border-accent-cyan outline-none transition-all appearance-none">
            <option value="ASAP">ASAP</option>
            <option value="1 month">1 month</option>
            <option value="3 months">3 months</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Tech Preferences</label>
        <div className="flex flex-wrap gap-2">
          {techOptions.map(tech => (
            <button
              key={tech}
              type="button"
              onClick={() => toggleTech(tech)}
              className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                formData.tech_stack.includes(tech) 
                  ? "bg-accent-cyan/20 border-accent-cyan text-accent-cyan" 
                  : "bg-white/5 border-border text-text-muted hover:border-white/30"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {status === "error" && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium">
          <AlertCircle size={18} className="shrink-0" />
          <span>Something went wrong. Please check your connection and try again, or reach out via WhatsApp.</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
          status === "success"
            ? "bg-green-500 text-white cursor-not-allowed"
            : status === "error"
            ? "bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30"
            : "bg-accent-cyan text-primary hover:scale-[1.02]"
        }`}
      >
        {status === "loading" ? (
          <><div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /> Submitting...</>
        ) : status === "success" ? (
          <><CheckCircle2 size={18} /> Collaboration Request Sent!</>
        ) : status === "error" ? (
          <><AlertCircle size={18} /> Try Again</>        
        ) : (
          <><Rocket size={18} /> Propose Collaboration</>
        )}
      </button>
    </form>
  );
}
