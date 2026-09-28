"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { IconArrowLeft, IconHome } from "@tabler/icons-react";

export default function NotFound() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#f5f5f7] dark:bg-[#000000] text-[#1d1d1f] dark:text-[#f5f5f7] overflow-hidden px-6 transition-colors duration-500 font-sans">
      
      {/* Ambient background blur (Apple style subtle glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-400/5 via-purple-400/5 to-transparent rounded-full blur-[100px] pointer-events-none dark:from-blue-400/10 dark:via-purple-400/10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center max-w-2xl"
      >
        <motion.p 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-8xl sm:text-[140px] font-semibold tracking-tighter text-[#1d1d1f]/10 dark:text-[#f5f5f7]/10 mb-4 select-none"
        >
          404
        </motion.p>
        
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-6">
          The page you're looking for can't be found.
        </h1>
        
        <p className="text-lg sm:text-xl text-[#86868b] dark:text-[#86868b] mb-12 max-w-md font-medium tracking-wide">
          It might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={() => router.push("/")}
            className="group flex items-center justify-center gap-2 bg-[#0071e3] text-white hover:bg-[#0077ED] font-medium text-[15px] px-6 py-3 rounded-full transition-all duration-300 shadow-sm active:scale-95"
          >
            <IconHome className="size-4 group-hover:scale-110 transition-transform duration-300" />
            Go to Home
          </button>
          
          <button
            onClick={() => router.back()}
            className="group flex items-center justify-center gap-2 bg-[#e8e8ed] dark:bg-[#333336] text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-[#d2d2d7] dark:hover:bg-[#424245] font-medium text-[15px] px-6 py-3 rounded-full transition-all duration-300 active:scale-95"
          >
            <IconArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
