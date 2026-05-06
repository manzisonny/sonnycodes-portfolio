"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  LayoutDashboard, 
  Inbox, 
  Handshake, 
  RefreshCcw, 
  LogOut,
  ChevronRight
} from "lucide-react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session && pathname !== "/admin/login") {
        router.push("/admin/login");
      }
      setLoading(false);
    }
    checkUser();
  }, [pathname, router]);

  if (loading && pathname !== "/admin/login") {
    return <div className="min-h-screen bg-primary flex items-center justify-center text-accent-purple font-space">Initialising Admin OS...</div>;
  }

  if (pathname === "/admin/login") return <>{children}</>;

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Inbox", href: "/admin/messages", icon: Inbox },
    { name: "Collabs", href: "/admin/collabs", icon: Handshake },
    { name: "Sync Engine", href: "/admin/sync", icon: RefreshCcw },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="flex bg-primary min-h-screen">
      <aside className="w-64 border-r border-border flex flex-col p-8 fixed h-screen">
        <div className="mb-12">
          <h2 className="text-xl font-space font-bold text-gradient">Admin OS</h2>
          <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold">V1.0.4-STABLE</p>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                pathname === item.href 
                  ? "bg-accent-purple/10 text-accent-purple border border-accent-purple/20 shadow-[0_0_15px_rgba(108,99,255,0.1)]" 
                  : "text-text-muted hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </div>
              {pathname === item.href && <ChevronRight size={16} />}
            </Link>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 p-3 text-text-muted hover:text-red-400 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">System Logout</span>
        </button>
      </aside>

      <main className="flex-1 ml-64 p-12">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
