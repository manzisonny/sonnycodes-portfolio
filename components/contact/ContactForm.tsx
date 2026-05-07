"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  Linkedin,
  Twitter,
  MessageSquare,
  Github,
  LucideIcon,
  ChevronDown,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { submitMessage } from "@/app/actions";

// ─── Custom Select Component ──────────────────────────────────────────────────

function CustomSelect({ 
  value, 
  onChange, 
  options, 
  label 
}: { 
  value: string; 
  onChange: (val: string) => void; 
  options: string[];
  label: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2 relative">
      <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/5 border border-border rounded-xl px-4 py-4 flex items-center justify-between hover:border-accent-purple transition-all text-white group"
      >
        <span className={value ? "text-white" : "text-text-muted"}>{value || "Select an option"}</span>
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
                className="w-full px-4 py-3 text-left text-sm hover:bg-accent-purple/10 hover:text-accent-purple transition-colors border-b border-border last:border-0"
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

// ─── SocialLinks ─────────────────────────────────────────────────────────────

const socialCards: {
  name: string;
  value: string;
  href: string;
  icon: LucideIcon;
  color: string;
}[] = [
  {
    name: "Email",
    value: "manzisonny81@gmail.com",
    href: "mailto:manzisonny81@gmail.com",
    icon: Mail,
    color: "text-red-400",
  },
  {
    name: "LinkedIn",
    value: "/in/manzi-sonny-034566408",
    href: "https://www.linkedin.com/in/manzi-sonny-034566408/",
    icon: Linkedin,
    color: "text-blue-400",
  },
  {
    name: "Twitter/X",
    value: "@sonny_manzi73001",
    href: "https://twitter.com/sonny_manzi73001",
    icon: Twitter,
    color: "text-sky-400",
  },
  {
    name: "WhatsApp",
    value: "+250 791385768",
    href: "https://wa.me/250791385768",
    icon: MessageSquare,
    color: "text-green-400",
  },
  {
    name: "GitHub",
    value: "manzisonny",
    href: "https://github.com/manzisonny",
    icon: Github,
    color: "text-white",
  },
];

export function SocialLinks() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {socialCards.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="glass p-6 flex items-center gap-6 group hover:border-accent-purple/50 transition-all"
          >
            <div
              className={`p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform ${social.color}`}
            >
              <Icon size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">
                {social.name}
              </p>
              <p className="text-lg font-space group-hover:text-accent-purple transition-colors">
                {social.value}
              </p>
            </div>
          </a>
        );
      })}
    </div>
  );
}

// ─── ContactForm ─────────────────────────────────────────────────────────────

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
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
    setErrorMessage("");

    try {
      console.log("Submitting message via Server Action...", formData);
      const result = await submitMessage(formData);
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      console.log("Server Action Success:", result.data);
      setStatus("success");
      // Clear form immediately on success
      setFormData({ name: "", email: "", subject: "", message: "", source: "LinkedIn" });
      
      // Keep success message for 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err: any) {
      console.error("Submission failed:", err);
      setStatus("error");
      setErrorMessage(err.message || "Unknown error occurred");
      setTimeout(() => setStatus("idle"), 10000);
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
            className="w-full bg-white/5 border border-border rounded-xl px-4 py-4 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/50 transition-all text-white placeholder:text-text-muted"
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
            className="w-full bg-white/5 border border-border rounded-xl px-4 py-4 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/50 transition-all text-white placeholder:text-text-muted"
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
          className="w-full bg-white/5 border border-border rounded-xl px-4 py-4 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/50 transition-all text-white placeholder:text-text-muted"
        />
      </div>

      <CustomSelect 
        label="How did you find me?"
        value={formData.source}
        onChange={(val) => setFormData({ ...formData, source: val })}
        options={["LinkedIn", "GitHub", "Twitter/X", "Recommendation", "Portfolio/Search", "Other"]}
      />

      <div className="space-y-2">
        <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Message</label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell me about your project or idea..."
          className="w-full bg-white/5 border border-border rounded-xl px-4 py-4 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/50 transition-all text-white resize-none placeholder:text-text-muted"
        />
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium overflow-hidden"
          >
            <AlertCircle size={18} className="shrink-0" />
            <div className="flex flex-col">
              <span>Failed to send message: {errorMessage}</span>
              <span className="text-xs opacity-70">Please check your internet or try reaching out via WhatsApp.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className={`w-full py-5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl ${
          status === "success" 
            ? "bg-green-500 text-white cursor-not-allowed" 
            : status === "error" 
              ? "bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30" 
              : "btn-primary hover:scale-[1.01] active:scale-95"
        }`}
      >
        {status === "loading" ? (
          <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
        ) : status === "success" ? (
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex items-center gap-2">
            <CheckCircle2 size={18} /> Message Delivered!
          </motion.div>
        ) : status === "error" ? (
          <><AlertCircle size={18} /> Connection Error - Try Again</>
        ) : (
          <><Send size={18} /> Send Professional Inquiry</>
        )}
      </button>
    </form>
  );
}
