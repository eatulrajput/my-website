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
  const [userDataMap, setUserDataMap] = useState<Record<string, GitHubUser>>(
    {},
  );

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

  const activeUserData = selectedMember
    ? userDataMap[selectedMember.username] || null
    : null;

  return (
    <div className="team-section">
      <div className="team-section__header">
        <h2 className="team-section__title">{title}</h2>
        <span className="team-section__hint">Click icon for details</span>
      </div>

      <div className="team-section__avatars">
        {teamMembers.map((member, idx) => {
          const user = userDataMap[member.username];
          const avatarUrl =
            user?.avatar_url || `https://github.com/${member.username}.png`;
          const displayName = user?.name || member.username;

          return (
            <button
              key={member.username}
              onClick={() => setSelectedMember(member)}
              type="button"
              style={{ zIndex: teamMembers.length - idx }}
              className="team-section__avatar-btn group"
              aria-label={`View ${displayName}'s profile`}
            >
              <img
                src={avatarUrl}
                alt={displayName}
                className="team-section__avatar-img"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  if (target.nextElementSibling) {
                    (target.nextElementSibling as HTMLElement).style.display =
                      "flex";
                  }
                }}
              />
              <div
                style={{ display: "none" }}
                className="team-section__avatar-fallback"
              >
                {displayName.substring(0, 2).toUpperCase()}
              </div>

              <div className="team-section__tooltip">@{member.username}</div>
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
