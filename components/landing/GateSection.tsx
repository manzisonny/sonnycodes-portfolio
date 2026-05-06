"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";

const challenge = {
  snippet: `interface User {
  id: string;
  name: string;
}

const greet = (u: User) => \`Hello, \${u.name}\`;`,
  options: ["Python", "Rust", "Go", "TypeScript"],
  correct: "TypeScript",
};

export default function GateSection() {
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const router = useRouter();

  const handleSelect = (option: string) => {
    setSelected(option);
    if (option === challenge.correct) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      setTimeout(() => {
        setIsCorrect(null);
        setSelected(null);
      }, 1500);
    }
  };

  const handleEnter = () => {
    router.push("/home");
  };

  return (
    <section className="h-screen flex flex-col items-center justify-center bg-secondary px-6">
      <div className="max-w-2xl w-full text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-space mb-8"
        >
          Before you enter...
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="glass p-6 text-left mb-12 font-mono text-sm overflow-hidden"
        >
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <pre className="text-accent-cyan">
            {challenge.snippet}
          </pre>
        </motion.div>

        <p className="text-text-secondary mb-8">Identify the language above to unlock the portfolio.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {challenge.options.map((option) => (
            <button
              key={option}
              onClick={() => !isCorrect && handleSelect(option)}
              disabled={isCorrect === true}
              className={`p-4 rounded-xl border transition-all ${
                selected === option
                  ? isCorrect
                    ? "bg-green-500/20 border-green-500 text-green-400"
                    : "bg-red-500/20 border-red-500 text-red-400"
                  : "bg-white/5 border-white/10 hover:border-accent-purple"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {isCorrect && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center gap-2 text-green-400 mb-8 text-xl font-bold">
                <CheckCircle2 /> Correct! You're in.
              </div>
              <button
                onClick={handleEnter}
                className="btn-primary flex items-center gap-2 group"
              >
                Enter Portfolio <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
          
          {isCorrect === false && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 flex items-center justify-center gap-2"
            >
              <XCircle size={18} /> Try again, dev 😄
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
