"use client";

import React from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import RecentBlogsSection from "@/components/home/RecentBlogsSection";
import SkillsSection from "@/components/home/SkillsSection";
import ExperienceSection from "@/components/home/ExperienceSection";
import EducationSection from "@/components/home/EducationSection";
import ContactSection from "@/components/home/ContactSection";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <FeaturedProjects />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <RecentBlogsSection />
      <ContactSection />
    </main>
  );
}
