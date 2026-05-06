"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Home, 
  Briefcase, 
  Cpu, 
  Building2, 
  MessageSquare, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter 
} from "lucide-react";
import { cn } from "@/app/layout";

const navItems = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Skills", href: "/skills", icon: Cpu },
  { name: "Company", href: "/company", icon: Building2 },
  { name: "Communicate", href: "/communicate", icon: MessageSquare },
  { name: "Contact", href: "/contact", icon: Mail },
];

const socials = [
  { name: "GitHub", href: "https://github.com/manzisonny", icon: Github },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/manzi-sonny-034566408/", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com/sonny_manzi73001", icon: Twitter },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ width: 80 }}
        animate={{ width: isHovered ? 240 : 80 }}
        className="fixed left-0 top-0 h-screen bg-secondary border-r border-border z-50 hidden md:flex flex-col py-8"
      >
        <div className="px-6 mb-12">
          <Link href="/home" className="flex items-center gap-4">
            <div className="w-10 h-10 bg-accent-purple rounded-xl flex items-center justify-center font-bold text-white shrink-0">
              SC
            </div>
            {isHovered && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-space font-bold text-xl"
              >
                Sonny Codes
              </motion.span>
            )}
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-4 p-3 rounded-xl transition-all group",
                pathname === item.href 
                  ? "bg-accent-purple text-white shadow-lg shadow-accent-purple/20" 
                  : "hover:bg-white/5 text-text-secondary hover:text-white"
              )}
            >
              <item.icon size={24} className="shrink-0" />
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-medium whitespace-nowrap"
                >
                  {item.name}
                </motion.span>
              )}
            </Link>
          ))}
        </nav>

        <div className="px-4 space-y-4">
          <div className="flex flex-col gap-2">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-text-muted hover:text-accent-cyan transition-colors flex items-center gap-4"
              >
                <social.icon size={20} className="shrink-0" />
                {isHovered && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {social.name}
                  </motion.span>
                )}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex items-center gap-4 p-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shrink-0" />
              {isHovered && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-text-muted uppercase tracking-wider font-bold">
                  Available for work
                </motion.span>
              )}
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full bg-secondary/80 backdrop-blur-xl border-t border-border md:hidden flex justify-around p-4 z-50">
        {navItems.slice(0, 5).map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "p-2 rounded-lg transition-colors",
              pathname === item.href ? "text-accent-purple" : "text-text-muted"
            )}
          >
            <item.icon size={24} />
          </Link>
        ))}
      </nav>
    </>
  );
}
