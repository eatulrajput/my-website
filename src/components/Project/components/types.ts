import { ComponentType } from "react";

export interface TeamMember {
  username: string;
  role: string;
}

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string;
}

export interface PackageItem {
  name: string;
  purpose: string;
  url: string;
}

export interface FeatureItem {
  icon: ComponentType<{ className?: string }>;
  label: string;
  desc: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface ProjectLinkItem {
  title: string;
  url: string;
  icon?: ComponentType<{ className?: string }>;
}
