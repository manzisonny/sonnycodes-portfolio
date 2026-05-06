"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Inbox, 
  Handshake, 
  RefreshCcw, 
  Clock,
  ExternalLink,
  Github
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    messages: 0,
    collabs: 0,
    projects: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getStats() {
      const [msgs, collabs, projs] = await Promise.all([
        supabase.from("messages").select("*", { count: 'exact', head: true }),
        supabase.from("collaborations").select("*", { count: 'exact', head: true }),
        supabase.from("projects").select("*", { count: 'exact', head: true })
      ]);

      setStats({
        messages: msgs.count || 0,
        collabs: collabs.count || 0,
        projects: projs.count || 0
      });
      setLoading(false);
    }
    getStats();
  }, []);

  const cards = [
    { label: "Total Messages", value: stats.messages, icon: Inbox, color: "text-accent-purple", href: "/admin/messages" },
    { label: "Collab Requests", value: stats.collabs, icon: Handshake, color: "text-accent-cyan", href: "/admin/collabs" },
    { label: "Synced Repos", value: stats.projects, icon: Github, color: "text-white", href: "/admin/sync" },
  ];

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-3xl font-space font-bold mb-2">Welcome Back, Sonny</h1>
        <p className="text-text-muted">System Overview & Recent Activity</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="glass p-8 group hover:border-accent-purple/50 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 bg-white/5 rounded-2xl ${card.color}`}>
                <card.icon size={28} />
              </div>
              <ExternalLink size={16} className="text-text-muted group-hover:text-white transition-colors" />
            </div>
            <p className="text-text-muted text-xs font-bold uppercase tracking-widest mb-1">{card.label}</p>
            <h2 className="text-4xl font-space font-bold">{loading ? "..." : card.value}</h2>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section className="glass p-8">
          <h3 className="text-xl font-space font-bold mb-8 flex items-center gap-3">
            <Clock size={20} className="text-accent-purple" /> Recent Alerts
          </h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border-l-4 border-accent-purple">
              <div className="shrink-0 w-2 h-2 rounded-full bg-accent-purple mt-2" />
              <div>
                <p className="text-sm font-bold">New message from contact form</p>
                <p className="text-xs text-text-muted">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
              <div className="shrink-0 w-2 h-2 rounded-full bg-accent-cyan mt-2" />
              <div>
                <p className="text-sm font-bold">Successful GitHub Sync</p>
                <p className="text-xs text-text-muted">Yesterday at 11:45 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl">
              <div className="shrink-0 w-2 h-2 rounded-full bg-accent-gold mt-2" />
              <div>
                <p className="text-sm font-bold">Collab request under review</p>
                <p className="text-xs text-text-muted">3 days ago</p>
              </div>
            </div>
          </div>
        </section>

        <section className="glass p-8 bg-accent-purple/5">
          <h3 className="text-xl font-space font-bold mb-8 flex items-center gap-3">
            <RefreshCcw size={20} className="text-accent-cyan" /> Quick Sync
          </h3>
          <p className="text-text-secondary text-sm mb-8">
            Trigger a manual update of your repositories. This will fetch the latest metadata from both personal and company GitHub accounts.
          </p>
          <Link href="/admin/sync" className="btn-primary flex items-center justify-center gap-2">
            Go to Sync Panel <ArrowRight size={18} />
          </Link>
        </section>
      </div>
    </div>
  );
}

function ArrowRight({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
