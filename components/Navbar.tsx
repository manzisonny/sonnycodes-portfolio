"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X, Github, Linkedin, Twitter, Sun, Moon } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { useTheme } from "@/components/ThemeProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["hero", "skills", "projects", "contact"];
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
      window.scrollTo({ top: top >= 0 ? top : 0, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary/80 dark:bg-deepfir/80 backdrop-blur-md border-b border-border py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#hero"
          onClick={(e) => scrollTo(e, "hero")}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-full border-2 border-sulu/30 overflow-hidden relative transition-all duration-300 group-hover:border-sulu shadow-md shadow-sulu/10">
            <Image
              src="/images/sonny-casual.jpg"
              alt={personalInfo.name}
              fill
              className="object-cover object-[center_top]"
              sizes="40px"
            />
          </div>
          <span className="font-space font-bold text-lg text-text-primary">
            Sonny <span className="text-sulu">Dev</span>
          </span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 bg-secondary/50 dark:bg-deepfir-800/50 backdrop-blur-md px-2 py-1.5 rounded-full border border-border">
          {navLinks.map((link) => {
            const id = link.href.substring(1);
            const isActive = activeSection === id;
            return (
              <motion.a
                key={link.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={link.href}
                onClick={(e) => scrollTo(e, id)}
                className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-sulu text-deepfir font-bold shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.name}
              </motion.a>
            );
          })}
        </div>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 20 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-secondary dark:bg-deepfir-800 border border-border flex items-center justify-center text-text-primary hover:border-sulu/30 transition-colors"
            title="Toggle theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} className="text-sulu" />}
          </motion.button>

          <div className="flex items-center gap-3 text-text-secondary">
            {[
              { icon: <Github size={18} />, link: personalInfo.social.github },
              { icon: <Linkedin size={18} />, link: personalInfo.social.linkedin },
              { icon: <Twitter size={18} />, link: personalInfo.social.twitter },
            ].map((s, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.2, y: -2 }}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sulu transition-colors duration-300"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <motion.button
            whileHover={{ rotate: 20 }}
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full bg-secondary dark:bg-deepfir-800 border border-border flex items-center justify-center text-text-primary"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} className="text-sulu" />}
          </motion.button>
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden fixed inset-x-0 top-[65px] bg-primary/95 dark:bg-deepfir/95 backdrop-blur-lg border-b border-border py-6 px-6 flex flex-col gap-4"
        >
          {navLinks.map((link) => {
            const id = link.href.substring(1);
            const isActive = activeSection === id;
            return (
              <motion.a
                key={link.name}
                whileTap={{ scale: 0.95 }}
                href={link.href}
                onClick={(e) => scrollTo(e, id)}
                className={`text-base font-semibold py-2.5 px-4 rounded-xl transition-all ${
                  isActive
                    ? "bg-sulu text-deepfir font-bold"
                    : "text-text-secondary hover:text-text-primary hover:bg-secondary dark:hover:bg-deepfir-800"
                }`}
              >
                {link.name}
              </motion.a>
            );
          })}
          <div className="h-px bg-border mt-2" />
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 bg-sulu/10 border border-sulu/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-sulu">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sulu opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sulu"></span>
              </span>
              Available for Hire
            </div>
            <div className="flex items-center gap-4 text-text-secondary">
              <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-sulu transition-colors"><Github size={20} /></a>
              <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-sulu transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
