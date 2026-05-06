"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    source: "LinkedIn",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const { error } = await supabase.from("messages").insert([formData]);
      if (error) throw error;
      
      // Optional: Call Resend API via route handler here
      
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "", source: "LinkedIn" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Your Name</label>
          <input
            required
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
            className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/50 transition-all text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Email Address</label>
          <input
            required
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
            className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/50 transition-all text-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Subject</label>
        <input
          required
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          placeholder="How can I help you?"
          className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/50 transition-all text-white"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">How did you find me?</label>
        <select
          value={formData.source}
          onChange={(e) => setFormData({ ...formData, source: e.target.value })}
          className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-accent-purple transition-all text-white appearance-none"
        >
          <option value="LinkedIn">LinkedIn</option>
          <option value="GitHub">GitHub</option>
          <option value="Twitter">Twitter/X</option>
          <option value="Recommendation">Recommendation</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Message</label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell me about your project or idea..."
          className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/50 transition-all text-white resize-none"
        />
      </div>

      <button
        disabled={status === "loading"}
        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
          status === "success" 
            ? "bg-green-500 text-white" 
            : status === "error" 
              ? "bg-red-500 text-white" 
              : "btn-primary"
        }`}
      >
        {status === "loading" ? (
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : status === "success" ? (
          <><CheckCircle2 /> Message Sent!</>
        ) : status === "error" ? (
          <><AlertCircle /> Error Sending</>
        ) : (
          <><Send size={18} /> Send Message</>
        )}
      </button>
    </form>
  );
}
