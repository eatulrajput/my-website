"use client";
import React, { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { IconArrowLeft, IconHome, IconTerminal2 } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const pathname = usePathname();
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    );

    // Track mouse coordinate offsets for spotlight
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [pathname]);

  // Command-line diagnostic logging simulation
  useEffect(() => {
    if (!isMounted) return;

    setTerminalOutput([]);
    setIsTypingComplete(false);

    const logs = [
      `$ host --resolve-route ${pathname}`,
      `Querying local route clusters... [OK]`,
      `Pinging routing tables... [TIMEOUT]`,
      `[CRITICAL] PATH_RESOLVER: ${pathname} resolved to status 404`,
      `Executing fallback: request user navigation.`
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        const nextLog = logs[currentLogIndex];
        setTerminalOutput(prev => [...prev, nextLog]);
        currentLogIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(interval);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [isMounted, pathname]);

  // Floating code components that the user can drag
  const particles = [
    { text: "404", scale: 1.2, top: "12%", left: "15%", color: "text-brand-apricot/30 dark:text-brand-apricot/20" },
    { text: "undefined", scale: 0.9, top: "25%", left: "75%", color: "text-brand-slate/40 dark:text-brand-slate/30" },
    { text: "{ }", scale: 1.1, top: "60%", left: "10%", color: "text-brand-apricot/25 dark:text-brand-apricot/15" },
    { text: "[]", scale: 0.8, top: "80%", left: "80%", color: "text-brand-slate/35 dark:text-brand-slate/25" },
    { text: "<Route />", scale: 1.0, top: "75%", left: "25%", color: "text-brand-apricot/30 dark:text-brand-apricot/20" },
    { text: "null", scale: 0.95, top: "45%", left: "85%", color: "text-brand-slate/40 dark:text-brand-slate/30" },
    { text: "status: 404", scale: 1.1, top: "18%", left: "60%", color: "text-brand-apricot/40 dark:text-brand-apricot/25" },
  ];

  if (!isMounted) return null;

  return (
    <motion.div
      ref={containerRef}
      aria-label="Page Not Found"
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-brand-cream dark:bg-brand-obsidian text-brand-midnight dark:text-brand-cream overflow-hidden px-4 py-16 transition-colors duration-300"
    >
      {/* 1. Cursor Spotlight Tracking */}
      <div
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 opacity-60 dark:opacity-40"
        style={{
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, var(--color-brand-apricot), transparent 80%)`,
          mixBlendMode: "soft-light"
        }}
      />

      {/* 2. Micro-grid background layer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-15"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(circle at 50% 50%, black, transparent 85%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, black, transparent 85%)"
        }}
      />

      {/* Ambient static blur glow effects */}
      <div className="absolute top-1/3 left-1/4 -z-10 h-80 w-80 rounded-full bg-brand-apricot/20 blur-[120px] pointer-events-none dark:bg-brand-apricot/10" />
      <div className="absolute bottom-1/3 right-1/4 -z-10 h-96 w-96 rounded-full bg-brand-slate/20 blur-[120px] pointer-events-none dark:bg-brand-slate/10" />

      {/* 3. Drag-responsive Floating Code Fragments */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        {particles.map((p, idx) => (
          <motion.div
            key={idx}
            drag
            dragConstraints={containerRef}
            dragElastic={0.4}
            whileDrag={{ scale: 1.15, cursor: "grabbing" }}
            className={cn(
              "absolute font-mono text-xs sm:text-sm font-bold select-none cursor-grab px-3 py-1.5 rounded-lg border border-transparent hover:border-brand-slate/10 hover:bg-brand-cream/10 dark:hover:bg-brand-obsidian/10 transition-colors",
              p.color
            )}
            style={{ top: p.top, left: p.left }}
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: 1,
              y: [0, -12, 12, 0],
              x: [0, 6, -6, 0],
              transition: {
                y: { repeat: Infinity, duration: 6 + idx, ease: "easeInOut" },
                x: { repeat: Infinity, duration: 8 + idx, ease: "easeInOut" },
                opacity: { duration: 0.8, delay: idx * 0.1 }
              }
            }}
          >
            {p.text}
          </motion.div>
        ))}
      </div>

      {/* 4. Glassmorphic Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-lg rounded-2xl border border-brand-midnight/10 dark:border-brand-cream/10 bg-[#f8efe8]/40 dark:bg-[#0c0c11]/45 backdrop-blur-xl p-6 sm:p-8 shadow-2xl flex flex-col gap-6"
      >
        {/* Card Header Status Indicator */}
        <div className="flex items-center justify-between border-b border-brand-midnight/10 dark:border-brand-cream/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="font-mono text-xs font-semibold tracking-wider text-red-500 uppercase">
              Route Link Broken
            </span>
          </div>
          <span className="font-mono text-[10px] text-brand-slate dark:text-brand-slate">
            System status: Exception
          </span>
        </div>

        {/* Big Glitch 404 Heading */}
        <div className="text-center py-2 relative group select-none">
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-7xl sm:text-8xl font-black font-heading tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-brand-midnight dark:from-brand-cream via-[#cc9a80] to-brand-slate select-none cursor-default"
          >
            404
          </motion.h1>
          <p className="mt-1 text-sm font-semibold tracking-wide uppercase text-brand-midnight/80 dark:text-brand-cream/80">
            Page Not Found
          </p>
        </div>

        {/* 5. Terminal diagnostic readout */}
        <div className="font-mono text-[11px] text-left bg-[#121218]/95 dark:bg-black/90 text-neutral-300 rounded-xl p-4 border border-brand-midnight/15 dark:border-brand-cream/10 shadow-inner flex flex-col gap-1 min-h-[110px]">
          <div className="flex items-center gap-1.5 border-b border-neutral-800/80 pb-2 mb-1.5 text-neutral-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500/80" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
              <span className="w-2 h-2 rounded-full bg-green-500/80" />
            </span>
            <span className="flex items-center gap-1">
              <IconTerminal2 className="size-3" />
              <span>route-resolver.sh</span>
            </span>
          </div>

          {terminalOutput.map((log, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                log?.startsWith("$") && "text-brand-slate",
                log?.includes("[OK]") && "text-emerald-400",
                log?.includes("[TIMEOUT]") && "text-yellow-400",
                log?.includes("[CRITICAL]") && "text-red-400 font-semibold"
              )}
            >
              {log}
            </motion.p>
          ))}

          {!isTypingComplete && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-1.5 h-3.5 bg-brand-apricot mt-0.5"
            />
          )}
        </div>

        <p className="text-center text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-body">
          The route you are looking for has either been relocated, removed, or exists in a different parallel workspace branch.
        </p>

        {/* 6. Navigation Controls */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => router.push("/")}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-midnight text-brand-cream dark:bg-brand-cream dark:text-brand-midnight hover:bg-brand-midnight/90 dark:hover:bg-brand-cream/90 font-mono text-xs font-semibold px-4 py-3 rounded-xl shadow-lg shadow-brand-midnight/5 dark:shadow-none hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <IconHome className="size-4 animate-pulse" />
            Comeback Home
          </button>
          <button
            onClick={() => router.back()}
            className="flex-1 inline-flex items-center justify-center gap-2 border border-brand-midnight/15 dark:border-brand-cream/15 text-brand-midnight dark:text-brand-cream hover:bg-brand-midnight/5 dark:hover:bg-brand-cream/5 font-mono text-xs font-semibold px-4 py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <IconArrowLeft className="size-4" />
            Return Back
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
