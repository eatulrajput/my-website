"use client";
import React, { useState, useEffect } from "react";
import { IconWifi, IconWifiOff } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const OnlineStatus = () => {
  const [mounted, setMounted] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setMounted(true);
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border px-3 py-1.5 text-2xs font-bold font-mono tracking-wider backdrop-blur-sm select-none transition-all duration-300",
        isOnline
          ? "border-neutral-300/60 bg-white/40 dark:border-neutral-850/60 dark:bg-neutral-950/20 text-neutral-800 dark:text-neutral-300"
          : "border-rose-300/40 bg-rose-50/20 dark:border-rose-900/30 dark:bg-rose-950/10 text-rose-600 dark:text-rose-400"
      )}
    >
      <span className="relative flex h-2 w-2 items-center justify-center">
        {isOnline ? (
          <>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 dark:bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          </>
        ) : (
          <>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 dark:bg-rose-500 opacity-75"></span>
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-550 dark:bg-rose-500"></span>
          </>
        )}
      </span>
      <div className="flex items-center gap-1.5">
        {isOnline ? (
          <IconWifi size={12} className="stroke-[2.5] text-emerald-500 dark:text-emerald-450" />
        ) : (
          <IconWifiOff size={12} className="stroke-[2.5] text-rose-500 dark:text-rose-450" />
        )}
        <span>{isOnline ? "Online" : "Offline"}</span>
      </div>
    </div>
  );
};

export default OnlineStatus;
