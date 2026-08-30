"use client";

import { useEffect, useState } from "react";
import { TeamMember, GitHubUser } from "./types";
import { TeamMemberIdCardModal } from "./TeamMemberIdCardModal";

interface TeamMembersSectionProps {
  teamMembers: TeamMember[];
  projectName?: string;
  title?: string;
}

export const TeamMembersSection = ({
  teamMembers,
  projectName = "Astra AI (RAG Chatbot)",
  title = "Team Members",
}: TeamMembersSectionProps) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [userDataMap, setUserDataMap] = useState<Record<string, GitHubUser>>({});

  // Pre-fetch GitHub User Details
  useEffect(() => {
    teamMembers.forEach((member) => {
      fetch(`https://api.github.com/users/${member.username}`)
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("Failed to fetch");
        })
        .then((data) => {
          if (data && data.login) {
            setUserDataMap((prev) => ({ ...prev, [member.username]: data }));
          }
        })
        .catch(() => {});
    });
  }, [teamMembers]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMember(null);
      }
    };
    if (selectedMember) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMember]);

  const activeUserData = selectedMember ? userDataMap[selectedMember.username] || null : null;

  return (
    <div className="space-y-3 border-t border-neutral-200 dark:border-neutral-800 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-black dark:text-white tracking-tight font-sans">
          {title}
        </h2>
        <span className="text-xs font-mono text-neutral-400">
          Click icon for details
        </span>
      </div>

      {/* Bunched Avatars with 30% Bottom Mask Effect */}
      <div className="flex items-center -space-x-3 py-2 pl-1">
        {teamMembers.map((member, idx) => {
          const user = userDataMap[member.username];
          const avatarUrl = user?.avatar_url || `https://github.com/${member.username}.png`;
          const displayName = user?.name || member.username;

          return (
            <button
              key={member.username}
              onClick={() => setSelectedMember(member)}
              type="button"
              style={{ zIndex: teamMembers.length - idx }}
              className="group relative size-12 rounded-full overflow-hidden focus:outline-none transition-all transform hover:scale-110 hover:z-30 active:scale-95 bg-black shrink-0"
              aria-label={`View ${displayName}'s profile`}
            >
              <img
                src={avatarUrl}
                alt={displayName}
                className="size-full object-cover group-hover:opacity-90 transition-opacity [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  if (target.nextElementSibling) {
                    (target.nextElementSibling as HTMLElement).style.display = "flex";
                  }
                }}
              />
              {/* Bottom 30% Mask Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
              <div
                style={{ display: "none" }}
                className="size-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-mono text-xs font-bold text-neutral-700 dark:text-neutral-300"
              >
                {displayName.substring(0, 2).toUpperCase()}
              </div>

              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-40 whitespace-nowrap bg-black dark:bg-white text-white dark:text-black text-[10px] font-mono px-2 py-0.5 rounded shadow-lg">
                @{member.username}
              </div>
            </button>
          );
        })}
      </div>

      {/* Contributor Tech ID Card Modal */}
      {selectedMember && (
        <TeamMemberIdCardModal
          selectedMember={selectedMember}
          activeUserData={activeUserData}
          projectName={projectName}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
};

export default TeamMembersSection;
