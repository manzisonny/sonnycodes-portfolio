"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Rocket, ChevronDown, DollarSign, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { submitCollaboration } from "@/app/actions";

// ─── Custom Select Component ──────────────────────────────────────────────────

function CustomSelect({ 
  value, 
  onChange, 
  options, 
  label,
  icon: Icon
}: { 
  value: string; 
  onChange: (val: string) => void; 
  options: string[];
  label: string;
  icon?: any;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2 relative">
      <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/5 border border-border rounded-xl px-4 py-4 flex items-center justify-between hover:border-accent-cyan transition-all text-white group"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon size={18} className="text-accent-cyan" />}
          <span className={value ? "text-white" : "text-text-muted"}>{value || "Select"}</span>
        </div>
        <ChevronDown size={18} className={isOpen ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 w-full mt-2 bg-secondary border border-border rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl"
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-left text-sm hover:bg-accent-cyan/10 hover:text-accent-cyan transition-colors border-b border-border last:border-0"
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── CollabForm ─────────────────────────────────────────────────────────────

export function CollabForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    idea: "",
    budget: "<$500",
    timeline: "Flexible",
    tech_stack: [] as string[],
  });

  const techOptions = ["React/Next.js", "Node.js", "Mobile (RN/Flutter)", "PostgreSQL", "UI/UX Design", "DevOps", "AI Integration"];

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
    setErrorMessage("");

    try {
      console.log("Submitting collaboration via Server Action...", formData);
      const result = await submitCollaboration(formData);
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      console.log("Collab Success:", result.data);
      setStatus("success");
      // CRITICAL: Clear form on success
      setFormData({ 
        name: "", 
        company: "", 
        email: "", 
        idea: "", 
        budget: "<$500", 
        timeline: "Flexible", 
        tech_stack: [] 
      });
      
      setTimeout(() => setStatus("idle"), 6000);
    } catch (err: any) {
      console.error("Collab submission failed:", err);
      setStatus("error");
      setErrorMessage(err.message || "Connection failure");
      setTimeout(() => setStatus("idle"), 8000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Name</label>
          <input 
            required 
            type="text" 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            className="w-full bg-white/5 border border-border rounded-xl px-4 py-4 focus:border-accent-cyan outline-none transition-all placeholder:text-text-muted" 
            placeholder="Your Full Name" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Company (Optional)</label>
          <input 
            type="text" 
            value={formData.company} 
            onChange={e => setFormData({...formData, company: e.target.value})} 
            className="w-full bg-white/5 border border-border rounded-xl px-4 py-4 focus:border-accent-cyan outline-none transition-all placeholder:text-text-muted" 
            placeholder="Organization Name" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Email</label>
        <input 
          required 
          type="email" 
          value={formData.email} 
          onChange={e => setFormData({...formData, email: e.target.value})} 
          className="w-full bg-white/5 border border-border rounded-xl px-4 py-4 focus:border-accent-cyan outline-none transition-all placeholder:text-text-muted" 
          placeholder="email@example.com" 
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Project Idea</label>
        <textarea 
          required 
          rows={4} 
          value={formData.idea} 
          onChange={e => setFormData({...formData, idea: e.target.value})} 
          className="w-full bg-white/5 border border-border rounded-xl px-4 py-4 focus:border-accent-cyan outline-none transition-all resize-none placeholder:text-text-muted" 
          placeholder="Describe the vision for our collaboration..." 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomSelect 
          label="Budget Range"
          value={formData.budget}
          onChange={(val) => setFormData({...formData, budget: val})}
          options={["<$500", "$500–2k", "$2k–5k", "$5k+", "Undecided"]}
          icon={DollarSign}
        />
        <CustomSelect 
          label="Timeline"
          value={formData.timeline}
          onChange={(val) => setFormData({...formData, timeline: val})}
          options={["ASAP", "1 Month", "3 Months", "Flexible"]}
          icon={Calendar}
        />
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
                  ? "bg-accent-cyan text-primary border-accent-cyan" 
                  : "bg-white/5 border-border text-text-muted hover:border-white/30"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium"
          >
            <AlertCircle size={18} className="shrink-0" />
            <span>Connection Failed: {errorMessage}. Please verify your network or use direct contact.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className={`w-full py-5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-accent-cyan/10 ${
          status === "success"
            ? "bg-green-500 text-white cursor-not-allowed"
            : status === "error"
            ? "bg-red-500/20 border border-red-500/30 text-red-400"
            : "bg-accent-cyan text-primary hover:scale-[1.01] active:scale-95"
        }`}
      >
        {status === "loading" ? (
          <><div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /> Transmitting Idea...</>
        ) : status === "success" ? (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex items-center gap-2">
            <CheckCircle2 size={18} /> Collaboration Sent! I'll be in touch.
          </motion.div>
        ) : status === "error" ? (
          <><AlertCircle size={18} /> Retry Submission</>        
        ) : (
          <><Rocket size={18} /> Propose Collaboration</>
        )}
      </button>
    </form>
  );
}
