"use client";

import React from "react";
import { personalInfo } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.offsetTop - 80;
      window.scrollTo({
        top: top >= 0 ? top : 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="border-t border-border bg-secondary/20 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left copyright */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-xs text-text-secondary">
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-[10px] text-text-muted">
            Built with Next.js 14, Tailwind CSS, Resend & Framer Motion.
          </p>
        </div>

        {/* Right navigation links */}
        <div className="flex items-center gap-6 text-xs text-text-secondary">
          <a
            href="#about"
            onClick={(e) => scrollTo(e, "about")}
            className="hover:text-text-primary transition-colors"
          >
            About
          </a>
          <a
            href="#projects"
            onClick={(e) => scrollTo(e, "projects")}
            className="hover:text-text-primary transition-colors"
          >
            Projects
          </a>
          <a
            href="#skills"
            onClick={(e) => scrollTo(e, "skills")}
            className="hover:text-text-primary transition-colors"
          >
            Skills
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, "contact")}
            className="hover:text-text-primary transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
