'use client';

import React from 'react';
import { motion, type Variants } from 'motion/react';
import { AboutCard } from './AboutCard';
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
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[auto]"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 h-full">
        <AboutCard />
      </motion.div>

      <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 lg:col-span-2 h-full">
        <SkillsCard />
      </motion.div>

      <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-2 h-full">
        <WhatIDoCard />
      </motion.div>

      {/* GitHub Stats Full Width */}
      <motion.div variants={itemVariants} className="col-span-full h-full">
        <GithubStatsCard />
      </motion.div>

      {/* Links & Badges Below */}
      <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 lg:col-span-2 h-full">
        <LinksCard />
      </motion.div>

      <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-2 h-full">
        <BadgesCard />
      </motion.div>
    </motion.div>
  );
}
