"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Inbox, Mail, Calendar, Trash2, CheckCircle, Clock } from "lucide-react";

export default function AdminInbox() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (data) setMessages(data);
    setLoading(false);
  }

  async function toggleRead(id: string, currentStatus: boolean) {
    await supabase.from("messages").update({ is_read: !currentStatus }).eq("id", id);
    fetchMessages();
    if (selected?.id === id) setSelected({ ...selected, is_read: !currentStatus });
  }

  async function deleteMessage(id: string) {
    if (confirm("Are you sure you want to delete this message?")) {
      await supabase.from("messages").delete().eq("id", id);
      setSelected(null);
      fetchMessages();
    }
  }

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-3xl font-space font-bold mb-2 text-gradient">Inbox</h1>
        <p className="text-text-muted">Direct inquiries from the contact form.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {loading ? (
            [...Array(5)].map((_, i) => <div key={i} className="glass h-24 animate-pulse" />)
          ) : messages.length === 0 ? (
            <div className="glass p-8 text-center text-text-muted italic">No messages yet.</div>
          ) : (
            messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => setSelected(msg)}
                className={`w-full text-left p-6 glass transition-all border-l-4 ${
                  selected?.id === msg.id ? "border-l-accent-purple bg-white/5" : msg.is_read ? "border-l-transparent" : "border-l-accent-cyan"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold truncate max-w-[150px]">{msg.name}</p>
                  <p className="text-[10px] text-text-muted uppercase font-bold">{new Date(msg.created_at).toLocaleDateString()}</p>
                </div>
                <p className="text-sm text-text-secondary truncate">{msg.subject}</p>
              </button>
            ))
          )}
        </div>

        <div className="lg:col-span-2">
          {selected ? (
            <div className="glass p-10 h-full relative">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-2xl font-space font-bold mb-2">{selected.subject}</h2>
                  <div className="flex items-center gap-4 text-sm text-text-muted">
                    <span className="flex items-center gap-1"><Mail size={14} /> {selected.email}</span>
                    <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(selected.created_at).toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => toggleRead(selected.id, selected.is_read)}
                    className={`p-3 rounded-xl transition-colors ${selected.is_read ? "text-text-muted hover:text-white" : "text-accent-cyan bg-accent-cyan/10"}`}
                    title={selected.is_read ? "Mark as unread" : "Mark as read"}
                  >
                    {selected.is_read ? <Clock size={20} /> : <CheckCircle size={20} />}
                  </button>
                  <button 
                    onClick={() => deleteMessage(selected.id)}
                    className="p-3 text-text-muted hover:text-red-400 transition-colors"
                    title="Delete message"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <div className="bg-white/5 p-8 rounded-2xl border border-border min-h-[300px]">
                <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-xs text-text-muted uppercase tracking-widest font-bold">Source of discovery:</p>
                <p className="text-sm text-accent-purple font-bold mt-1">{selected.source || "Direct"}</p>
              </div>
            </div>
          ) : (
            <div className="glass h-full flex flex-col items-center justify-center p-12 text-center">
              <Inbox size={64} className="text-text-muted opacity-20 mb-6" />
              <p className="text-text-muted">Select a message to read the full content.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
