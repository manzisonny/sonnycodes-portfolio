"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const mediaItems = [
  { type: "image", src: "/media/PXL_20260427_115023361.jpg", duration: 4000 },
  { type: "video", src: "/media/VID_20260627_133122_409.mp4", duration: 5000 },
  { type: "image", src: "/media/IMG-20250420-WA0048.jpg", duration: 4000 },
  { type: "video", src: "/media/VID_20260628_050635_016.mp4", duration: 5000 },
  { type: "image", src: "/media/PXL_20260411_122438658.PORTRAIT.jpg", duration: 4000 },
  { type: "video", src: "/media/VID_20260629_142353_007.mp4", duration: 5000 },
];

export default function VideoMontage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextMedia = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  };

  useEffect(() => {
    if (!isPlaying) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    const currentItem = mediaItems[currentIndex];

    if (currentItem.type === "image") {
      timeoutRef.current = setTimeout(nextMedia, currentItem.duration);
    } else if (currentItem.type === "video" && videoRef.current) {
      // Auto-play the video and wait for it to end
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // If autoplay blocked, just skip to next after duration
        timeoutRef.current = setTimeout(nextMedia, currentItem.duration);
      });
      
      const handleEnded = () => nextMedia();
      videoRef.current.addEventListener("ended", handleEnded);
      
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener("ended", handleEnded);
        }
      };
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  const currentItem = mediaItems[currentIndex];

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/50 border border-sulu/20 shadow-2xl shadow-sulu/5 group">
      <AnimatePresence mode="wait">
        {currentItem.type === "image" ? (
          <motion.div
            key={currentItem.src}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={currentItem.src}
              alt="Montage item"
              fill
              className="object-cover"
            />
          </motion.div>
        ) : (
          <motion.div
            key={currentItem.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <video
              ref={videoRef}
              src={currentItem.src}
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-deepfir/80 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex gap-4 items-center">
          <button 
            onClick={togglePlay}
            className="p-2 rounded-full bg-sulu text-deepfir hover:scale-110 transition-transform"
          >
            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
          </button>
          <button 
            onClick={toggleMute}
            className="p-2 text-sulu hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
        <div className="flex gap-1.5">
          {mediaItems.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-sulu' : 'w-1.5 bg-sulu/30'}`}
            />
          ))}
        </div>
      </div>

      {/* Center Play Button (when not playing) */}
      {!isPlaying && (
        <button 
          onClick={togglePlay}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-sulu/90 backdrop-blur-sm text-deepfir flex items-center justify-center hover:scale-110 hover:bg-sulu transition-all shadow-xl shadow-sulu/20"
        >
          <Play size={24} fill="currentColor" className="ml-1" />
        </button>
      )}
    </div>
  );
}
