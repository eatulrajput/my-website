"use client";

import { IconX, IconBrandGithub, IconArrowUpRight } from "@tabler/icons-react";
import { TeamMember, GitHubUser } from "./types";

interface TeamMemberIdCardModalProps {
  selectedMember: TeamMember;
  activeUserData: GitHubUser | null;
  projectName?: string;
  onClose: () => void;
}

export const TeamMemberIdCardModal = ({
  selectedMember,
  activeUserData,
  projectName = "Astra AI (RAG Chatbot)",
  onClose,
}: TeamMemberIdCardModalProps) => {
  const activeAvatar = activeUserData?.avatar_url || `https://github.com/${selectedMember.username}.png`;
  const activeDisplayName = activeUserData?.name || selectedMember.username;
  const activeProfileUrl = activeUserData?.html_url || `https://github.com/${selectedMember.username}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl border border-neutral-300 dark:border-neutral-700/80 bg-white dark:bg-neutral-950 p-6 shadow-2xl space-y-5 text-center overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-sky-500 to-amber-500" />

        {/* Lanyard Slot */}
        <div className="w-12 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 mx-auto mt-1" />

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Close ID card"
        >
          <IconX className="size-4" />
        </button>

        {/* Header Badge Title */}
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800/80 pb-3 text-left">
          <div className="flex items-center gap-1.5">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
              {projectName.split(" ")[0]} // Contributor ID
            </span>
          </div>
          <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">
            VERIFIED
          </span>
        </div>

        {/* Centered ID Avatar Photo with 30% Mask Effect */}
        <div className="relative inline-block mx-auto">
          <div className="relative size-24 rounded-full overflow-hidden bg-black">
            <img
              src={activeAvatar}
              alt={activeDisplayName}
              className="size-full object-cover [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
            />
            {/* Bottom 30% Mask Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Name & Handle */}
        <div className="space-y-1">
          <h3 className="font-bold text-lg text-black dark:text-white tracking-tight leading-tight">
            {activeDisplayName}
          </h3>
          <a
            href={activeProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-mono text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
          >
            <IconBrandGithub className="size-3.5" />
            <span>@{selectedMember.username}</span>
          </a>
        </div>

        {/* ID Information Fields */}
        <div className="space-y-2.5 text-left bg-neutral-50/80 dark:bg-neutral-900/50 p-3.5 rounded-xl border border-neutral-100 dark:border-neutral-800/80 font-mono">
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
              ROLE
            </span>
            <span className="px-2 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-800 text-black dark:text-white font-medium text-[11px] truncate">
              {selectedMember.role}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 text-xs border-t border-neutral-200/40 dark:border-neutral-800/60 pt-2">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
              PROJECT
            </span>
            <span className="text-[11px] text-neutral-700 dark:text-neutral-300 font-medium">
              {projectName}
            </span>
          </div>

          {activeUserData?.bio && (
            <div className="border-t border-neutral-200/40 dark:border-neutral-800/60 pt-2 font-sans">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-0.5">
                BIO
              </span>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-300 leading-snug line-clamp-2">
                {activeUserData.bio}
              </p>
            </div>
          )}
        </div>

        {/* ID Card Footer & Barcode */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between text-neutral-400 dark:text-neutral-600 font-mono text-[9px] tracking-widest px-1">
            <span>||| | |||| | ||| ||</span>
            <span>ID: DEV-{selectedMember.username.substring(0, 4).toUpperCase()}-2026</span>
          </div>

          <a
            href={activeProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black font-mono text-xs font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-md"
          >
            <IconBrandGithub className="size-4" />
            <span>View Full GitHub Profile</span>
            <IconArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberIdCardModal;
