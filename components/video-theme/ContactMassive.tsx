"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Send, Heart } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function ContactMassive() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 relative bg-primary dark:bg-deepfir overflow-hidden min-h-screen flex items-center">
      {/* Massive Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.h1
          animate={{ x: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="text-[18vw] font-black font-space whitespace-nowrap text-sulu/[0.04] dark:text-sulu/[0.03]"
        >
          CONTACT
        </motion.h1>
      </div>

      {/* Floating shapes */}
      <motion.div
        animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-20 right-20 w-20 h-20 border-2 border-sulu/10 rounded-xl pointer-events-none"
      />
      <motion.div
        animate={{ rotate: [360, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-40 left-16 w-12 h-12 border-2 border-sulu/10 rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Form */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-space font-black mb-8 text-text-primary"
          >
            REACH{" "}
            <motion.span
              animate={{ color: ["#9FE870", "#c4f4a3", "#9FE870"] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-sulu"
            >
              OUT.
            </motion.span>
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
            {[
              { label: "Your Name", type: "text", delay: 0.1 },
              { label: "Email Address", type: "email", delay: 0.2 },
            ].map((field) => (
              <motion.div
                key={field.label}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: field.delay, type: "spring", bounce: 0.3 }}
                className="space-y-1.5"
              >
                <label className="text-xs font-bold uppercase tracking-wider text-text-muted">{field.label}</label>
                <motion.input
                  whileFocus={{ scale: 1.02, borderColor: "#9FE870" }}
                  type={field.type}
                  required
                  className="w-full bg-secondary dark:bg-deepfir-800/50 border-2 border-border dark:border-sulu/10 focus:border-sulu px-4 py-3 rounded-xl text-text-primary outline-none transition-all"
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", bounce: 0.3 }}
              className="space-y-1.5"
            >
              <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Message</label>
              <motion.textarea
                whileFocus={{ scale: 1.02, borderColor: "#9FE870" }}
                required
                rows={4}
                className="w-full bg-secondary dark:bg-deepfir-800/50 border-2 border-border dark:border-sulu/10 focus:border-sulu px-4 py-3 rounded-xl text-text-primary outline-none transition-all resize-none"
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(159,232,112,0.3)" }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-sulu text-deepfir font-black uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {sent ? (
                <>Done! <Heart size={18} className="animate-bounce" /></>
              ) : isSubmitting ? (
                "Sending..."
              ) : (
                <>Send Message <Send size={18} /></>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Right Info */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
          className="flex flex-col justify-center space-y-10 lg:pl-12"
        >
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-secondary dark:bg-deepfir-800/50 border border-border dark:border-sulu/15 p-8 rounded-[28px] backdrop-blur-sm"
          >
            <h3 className="text-xl font-bold text-text-primary mb-3">Direct Communication</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              Your messages will be sent directly to my inbox. I typically respond within 24-48 hours.
            </p>
            <div className="space-y-2">
              <p className="text-xs text-text-muted uppercase tracking-widest font-bold">Or email directly:</p>
              <motion.a
                whileHover={{ scale: 1.02, x: 5 }}
                href={`mailto:${personalInfo.email}`}
                className="text-xl font-space font-black text-sulu hover:underline inline-block"
              >
                {personalInfo.email}
              </motion.a>
            </div>
          </motion.div>

          {/* Bible verse */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -3 }}
            className="bg-sulu/5 border border-sulu/10 p-6 rounded-[24px]"
          >
            <p className="italic text-text-secondary text-sm leading-relaxed mb-2">
              "{personalInfo.verse.text}"
            </p>
            <p className="text-xs font-bold text-sulu uppercase tracking-wider">
              — {personalInfo.verse.reference}
            </p>
          </motion.div>

          {/* Socials */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-text-muted">Connect</p>
            <div className="flex gap-3">
              {[
                { icon: <Github size={22} />, link: personalInfo.social.github },
                { icon: <Linkedin size={22} />, link: personalInfo.social.linkedin },
                { icon: <Twitter size={22} />, link: personalInfo.social.twitter },
                { icon: <Mail size={22} />, link: personalInfo.social.email },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + idx * 0.1, type: "spring", bounce: 0.5 }}
                  whileHover={{ scale: 1.2, rotate: 10, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-secondary dark:bg-deepfir-800 border border-border dark:border-sulu/10 flex items-center justify-center text-text-secondary hover:text-sulu hover:border-sulu/40 transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Massive Footer Text */}
      <div className="absolute bottom-[-3vw] left-0 right-0 w-full overflow-hidden flex justify-center pointer-events-none">
        <motion.h1
          animate={{ opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="text-[14vw] font-black font-space text-text-primary tracking-tighter uppercase whitespace-nowrap"
        >
          sonny dev
        </motion.h1>
      </div>
    </section>
  );
}
