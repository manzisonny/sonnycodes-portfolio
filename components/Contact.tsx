"use client";

import React, { useState } from "react";
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
  ChevronDown,
  Calendar,
} from "lucide-react";
import { submitContactForm } from "@/app/actions";
import { personalInfo } from "@/lib/data";

// Custom select dropdown to match the premium aesthetics
function SourceSelect({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  label: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2 relative">
      <label className="text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-secondary border border-border rounded-xl px-4 py-4 flex items-center justify-between hover:border-accent-purple/50 transition-all text-text-primary group"
      >
        <span className={value ? "text-text-primary" : "text-text-muted"}>
          {value || "Select an option"}
        </span>
        <ChevronDown
          size={16}
          className={`text-text-secondary group-hover:text-text-primary transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
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
                className="w-full px-4 py-3.5 text-left text-xs font-medium text-text-secondary hover:bg-accent-purple/10 hover:text-text-primary transition-colors border-b border-border last:border-0"
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

export default function Contact() {
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
      const result = await submitContactForm(formData);

      if (!result.success) {
        throw new Error(result.error || "Failed to deliver message.");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        source: "LinkedIn",
      });

      setTimeout(() => setStatus("idle"), 5000);
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong.");
      setTimeout(() => setStatus("idle"), 8000);
    }
  };

  const socialLinks = [
    {
      name: "WhatsApp",
      value: "+250 791 385 768",
      href: personalInfo.social.whatsapp,
      icon: <MessageSquare size={20} className="text-emerald-500" />,
      hoverColor: "hover:border-emerald-500/30",
    },
    {
      name: "LinkedIn",
      value: "Munyurangabo Manzi Sonny",
      href: personalInfo.social.linkedin,
      icon: <Linkedin size={20} className="text-blue-500" />,
      hoverColor: "hover:border-blue-500/30",
    },
    {
      name: "GitHub",
      value: "manzisonny",
      href: personalInfo.social.github,
      icon: <Github size={20} className="text-text-primary" />,
      hoverColor: "hover:border-accent-purple/30",
    },
    {
      name: "Email",
      value: personalInfo.email,
      href: personalInfo.social.email,
      icon: <Mail size={20} className="text-red-500" />,
      hoverColor: "hover:border-red-500/30",
    },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-start mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-purple mb-2">
            04 / Connection
          </p>
          <h2 className="text-3xl md:text-4xl font-space font-extrabold text-text-primary">
            Get In Touch
          </h2>
          <div className="w-12 h-[3px] bg-gradient-to-r from-accent-purple to-accent-cyan rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass p-6 border-border relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent-purple/5 blur-xl" />
              <div className="flex items-center gap-3 text-accent-purple mb-4">
                <Calendar size={18} />
                <h3 className="font-space font-bold text-sm text-text-primary">
                  Availability & Consultations
                </h3>
              </div>
              <p className="text-text-secondary text-xs leading-relaxed">
                I am currently open to freelance opportunities, contract work, and full-time positions. Whether you want to build an automated attendance system, launch an e-commerce store, or consult on database architecture, let's start a conversation.
              </p>
            </div>

            {/* Social Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`glass p-5 flex flex-col gap-3 group transition-all duration-300 ${social.hoverColor}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center group-hover:scale-105 transition-transform">
                    {social.icon}
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                      {social.name}
                    </h4>
                    <p className="text-xs text-text-primary font-medium truncate mt-0.5">
                      {social.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Form Submission */}
          <div className="lg:col-span-7">
            <div className="glass p-8 border-border relative">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-secondary border border-border rounded-xl px-4 py-4 focus:outline-none focus:border-accent-purple/50 transition-all text-text-primary placeholder:text-text-muted text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full bg-secondary border border-border rounded-xl px-4 py-4 focus:outline-none focus:border-accent-purple/50 transition-all text-text-primary placeholder:text-text-muted text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">
                    Subject
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project inquiry, consulting offer, etc."
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-4 focus:outline-none focus:border-accent-purple/50 transition-all text-text-primary placeholder:text-text-muted text-sm"
                  />
                </div>

                <SourceSelect
                  label="How did you hear about me?"
                  value={formData.source}
                  onChange={(val) => setFormData({ ...formData, source: val })}
                  options={[
                    "LinkedIn",
                    "GitHub",
                    "Twitter/X",
                    "Recommendation",
                    "Search / Portfolio",
                    "Other",
                  ]}
                />

                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Describe your goals, tech stack, or ideas..."
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-4 focus:outline-none focus:border-accent-purple/50 transition-all text-text-primary resize-none placeholder:text-text-muted text-sm"
                  />
                </div>

                <AnimatePresence>
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/25 rounded-xl text-red-400 text-xs font-medium overflow-hidden"
                    >
                      <AlertCircle size={16} className="shrink-0" />
                      <div>
                        <p>{errorMessage}</p>
                        <p className="opacity-70 mt-0.5">
                          Please verify your network or message me directly on WhatsApp.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className={`w-full py-4.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 text-sm ${
                    status === "success"
                      ? "bg-green-500 text-white cursor-not-allowed"
                      : status === "error"
                      ? "bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30"
                      : "btn-primary hover:scale-[1.01]"
                  }`}
                >
                  {status === "loading" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Message...
                    </>
                  ) : status === "success" ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle2 size={16} /> Delivered Successfully!
                    </span>
                  ) : status === "error" ? (
                    "Retry Submission"
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
