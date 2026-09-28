'use client';

import { motion, type Variants } from 'motion/react';
import { AboutCard } from './AboutCard';
import { StatsSummaryCard } from './StatsSummaryCard';
import { SkillsCard } from './SkillsCard';
import { WhatIDoCard } from './WhatIDoCard';
import { GithubStatsCard } from './GithubStatsCard';
import { LinksCard } from './LinksCard';
import { BadgesCard } from './BadgesCard';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

export function ProfileBento() {
  return (
    <motion.div
      className="flex flex-col gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="columns-1 lg:columns-2 gap-4">
        <motion.div variants={itemVariants} className="break-inside-avoid mb-4">
          <AboutCard />
        </motion.div>

        <motion.div variants={itemVariants} className="break-inside-avoid mb-4">
          <SkillsCard />
        </motion.div>

        <motion.div variants={itemVariants} className="break-inside-avoid mb-4 h-[120px]">
          <StatsSummaryCard />
        </motion.div>

        <motion.div variants={itemVariants} className="break-inside-avoid mb-4">
          <WhatIDoCard />
        </motion.div>

        <motion.div variants={itemVariants} className="break-inside-avoid mb-4">
          <LinksCard />
        </motion.div>

        <motion.div variants={itemVariants} className="break-inside-avoid mb-4">
          <BadgesCard />
        </motion.div>
      </div>

      {/* Full Width Footer */}
      <motion.div variants={itemVariants} className="w-full">
        <GithubStatsCard />
      </motion.div>
    </motion.div>
  );
}
