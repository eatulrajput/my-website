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
  const activeAvatar =
    activeUserData?.avatar_url ||
    `https://github.com/${selectedMember.username}.png`;
  const activeDisplayName = activeUserData?.name || selectedMember.username;
  const activeProfileUrl =
    activeUserData?.html_url || `https://github.com/${selectedMember.username}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="id-card" onClick={(e) => e.stopPropagation()}>
        <div className="id-card__lanyard-slot" />
        <button
          onClick={onClose}
          type="button"
          className="id-card__close-btn"
          aria-label="Close ID card"
        >
          <IconX className="id-card__close-icon" />
        </button>

        <div className="id-card__header">
          <div className="id-card__header-left">
            <span className="id-card__status-dot-wrapper">
              <span className="id-card__status-dot-ping" />
              <span className="id-card__status-dot" />
            </span>
            <span className="id-card__header-title">
              {projectName.split(" ")[0]} // Contributor ID
            </span>
          </div>
          <span className="id-card__verified-badge">VERIFIED</span>
        </div>

        <div className="id-card__avatar-wrapper">
          <div className="id-card__avatar-inner">
            <img
              src={activeAvatar}
              alt={activeDisplayName}
              className="id-card__avatar-img"
            />
          </div>
        </div>

        <div className="id-card__profile">
          <h3 className="id-card__name">{activeDisplayName}</h3>
          <a
            href={activeProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="id-card__github-link"
          >
            <IconBrandGithub className="id-card__github-icon" />
            <span>@{selectedMember.username}</span>
          </a>
        </div>

        <div className="id-card__info-box">
          <div className="id-card__info-row">
            <span className="id-card__info-label">ROLE</span>
            <span className="id-card__info-value id-card__info-value--highlight">
              {selectedMember.role}
            </span>
          </div>

          <div className="id-card__info-row id-card__info-row--border">
            <span className="id-card__info-label">PROJECT</span>
            <span className="id-card__info-value">{projectName}</span>
          </div>

          {activeUserData?.bio && (
            <div className="id-card__info-bio">
              <span className="id-card__info-label">BIO</span>
              <p className="id-card__info-bio-text">{activeUserData.bio}</p>
            </div>
          )}
        </div>

        <div className="id-card__footer">
          <div className="id-card__barcode">
            <span>||| | |||| | ||| ||</span>
            <span>
              ID: DEV-{selectedMember.username.substring(0, 4).toUpperCase()}
              -2026
            </span>
          </div>

          <a
            href={activeProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="id-card__action-btn"
          >
            <IconBrandGithub className="id-card__action-icon" />
            <span>View Full GitHub Profile</span>
            <IconArrowUpRight className="id-card__action-arrow" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberIdCardModal;
