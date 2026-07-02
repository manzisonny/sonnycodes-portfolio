"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import SplashScreen from "@/components/video-theme/SplashScreen";
import HeroSection from "@/components/video-theme/HeroSection";
import SkillsBento from "@/components/video-theme/SkillsBento";
import ProcessFlow from "@/components/video-theme/ProcessFlow";
import ProjectsShowcase from "@/components/video-theme/ProjectsShowcase";
import ExperienceTimeline from "@/components/video-theme/ExperienceTimeline";
import ContactMassive from "@/components/video-theme/ContactMassive";
import FloatingCodeBlocks from "@/components/video-theme/FloatingCodeBlocks";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const hasVisited = sessionStorage.getItem("cinematic-welcome-visited");
    if (hasVisited === "true") {
      setShowWelcome(false);
    }
  }, []);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    sessionStorage.setItem("cinematic-welcome-visited", "true");
  };

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeProvider>
      {/* Cinematic Splash Screen */}
      <AnimatePresence>
        {showWelcome && (
          <SplashScreen onComplete={handleWelcomeComplete} />
        )}
      </AnimatePresence>

      {/* Main Portfolio Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showWelcome ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative min-h-screen bg-primary text-text-primary font-inter"
      >
        {/* Global Floating Code Blocks Background */}
        <FloatingCodeBlocks />

        <Navbar />

        <main className="relative z-10 w-full overflow-hidden">
          <HeroSection />
          <SkillsBento />
          <ProcessFlow />
          <ProjectsShowcase />
          <ExperienceTimeline />
          <ContactMassive />
        </main>
      </motion.div>
    </ThemeProvider>
  );
}
