"use client";

import { useState } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { CollabForm } from "@/components/communicate/CollabForm";
import { MessageSquare, Rocket, Calendar, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CommunicatePage() {
  const [activeTab, setActiveTab] = useState<"message" | "collab" | "call">("message");

  const tabs = [
    { id: "message", label: "Send a Message", icon: MessageSquare },
    { id: "collab", label: "Propose Collaboration", icon: Rocket },
    { id: "call", label: "Book a Call", icon: Calendar },
  ];

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl md:text-5xl font-space mb-4">Communicate</h1>
        <p className="text-text-secondary text-lg">The hub for collaboration and connection.</p>
      </header>

      <div className="flex bg-secondary p-1 rounded-2xl border border-border inline-flex max-w-full overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id ? "bg-accent-purple text-white shadow-lg" : "text-text-muted hover:text-white"
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="max-w-4xl">
        <AnimatePresence mode="wait">
          {activeTab === "message" && (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass p-8"
            >
              <h2 className="text-2xl font-space mb-8">Drop a quick message</h2>
              <ContactForm />
            </motion.div>
          )}

          {activeTab === "collab" && (
            <motion.div
              key="collab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass p-8 border-accent-cyan/20"
            >
              <h2 className="text-2xl font-space mb-8 text-accent-cyan">Let's build something big</h2>
              <CollabForm />
            </motion.div>
          )}

          {activeTab === "call" && (
            <motion.div
              key="call"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass p-8 text-center"
            >
              <h2 className="text-2xl font-space mb-4">Discovery Call</h2>
              <p className="text-text-secondary mb-12">Book a 30-minute session to discuss your project requirements and how I can help.</p>
              
              <div className="aspect-video bg-white/5 border border-border rounded-2xl flex flex-col items-center justify-center p-12">
                <Calendar size={64} className="text-accent-purple mb-6 opacity-20" />
                <p className="text-text-muted mb-8 italic">Calendly / Cal.com widget integration</p>
                <button className="btn-primary">Connect your Calendar</button>
              </div>
              
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {[
                  "Technical Consultation",
                  "Project Scoping",
                  "Architecture Review"
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-sm text-text-secondary">
                    <CheckCircle2 size={16} className="text-green-500" /> {item}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
