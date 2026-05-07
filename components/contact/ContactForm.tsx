"use client";

import { useState } from "react";
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
} from "lucide-react";
import { supabase } from "@/lib/supabase";

// ─── SocialLinks (self-contained, no function props from server) ─────────────

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

      {status === "error" && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium">
          <AlertCircle size={18} className="shrink-0" />
          <span>Failed to send message. Please check your connection or try reaching out via WhatsApp directly.</span>
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
              : "btn-primary"
        }`}
      >
        {status === "loading" ? (
          <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
        ) : status === "success" ? (
          <><CheckCircle2 size={18} /> Message Sent Successfully!</>
        ) : status === "error" ? (
          <><AlertCircle size={18} /> Try Again</>
        ) : (
          <><Send size={18} /> Send Message</>
        )}
      </button>
    </form>
  );
}
