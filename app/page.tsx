"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/ThemeProvider";
import WelcomeScreen from "@/components/WelcomeScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Retrieve previous welcome screen visit from session storage so repeat visits don't show the welcome splash
    const hasVisited = sessionStorage.getItem("welcome-visited");
    if (hasVisited === "true") {
      setShowWelcome(false);
    }
  }, []);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    sessionStorage.setItem("welcome-visited", "true");
  };

  if (!isMounted) {
    return null; // Prevent server/client HTML mismatches
  }

  return (
    <ThemeProvider>
      {/* Cinematic Splash Screen */}
      <AnimatePresence>
        {showWelcome && (
          <WelcomeScreen onComplete={handleWelcomeComplete} />
        )}
      </AnimatePresence>

      {/* Main Portfolio Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showWelcome ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative min-h-screen bg-primary text-text-primary"
      >
        {/* Navigation */}
        <Navbar />

        {/* Sections */}
        <main className="relative z-10">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </motion.div>
    </ThemeProvider>
  );
}
