"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Github, Linkedin, Twitter, Sun, Moon } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { useTheme } from "@/components/ThemeProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Background shift on scroll
      setScrolled(window.scrollY > 20);

      // Scroll spy logic
      const sections = ["hero", "about", "projects", "skills", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary/80 backdrop-blur-md border-b border-border py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left Side: Brand with Avatar Profile image */}
        <a
          href="#hero"
          onClick={(e) => scrollTo(e, "hero")}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-full border border-border overflow-hidden relative transition-all duration-300 group-hover:scale-105 shadow-md shadow-accent-purple/10">
            <Image
              src="/images/sonny-casual.jpg"
              alt={personalInfo.name}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <span className="font-space font-bold text-lg text-text-primary transition-colors duration-300">
            Sonny Dev
          </span>
        </a>

        {/* Center: Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 glass px-6 py-2 border-border">
          {navLinks.map((link) => {
            const id = link.href.substring(1);
            const isActive = activeSection === id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollTo(e, id)}
                className={`text-sm font-medium transition-colors duration-300 relative py-1 px-2 ${
                  isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-purple to-accent-cyan rounded-full" />
                )}
              </a>
            );
          })}
        </div>

        {/* Right Side: Theme Switcher & Socials */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Light/Dark Mode Switcher */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl glass border-border flex items-center justify-center text-text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            title="Toggle theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <div className="flex items-center gap-4 text-text-secondary">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors duration-300"
            >
              <Github size={18} />
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors duration-300"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={personalInfo.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors duration-300"
            >
              <Twitter size={18} />
            </a>
          </div>
        </div>

        {/* Mobile controls: hamburger + theme toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl glass border-border flex items-center justify-center text-text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[73px] bg-primary/95 backdrop-blur-lg border-b border-border py-6 px-6 flex flex-col gap-6 animate-fadeIn">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const id = link.href.substring(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollTo(e, id)}
                  className={`text-base font-semibold py-2 px-3 rounded-lg ${
                    isActive
                      ? "bg-black/5 dark:bg-white/5 text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="h-[1px] bg-border" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available for Hire
            </div>

            <div className="flex items-center gap-4 text-text-secondary">
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={personalInfo.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
