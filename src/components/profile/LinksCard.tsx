import React from 'react';
import { BentoBox } from './BentoBox';
import { Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

function GithubOctocatAnimation() {
  return (
    <div className="w-8 h-8 relative flex items-center justify-center overflow-hidden">
      {/* Octocat */}
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute inset-0 w-full h-full drop-shadow-sm"
        variants={{
          rest: { y: 0, opacity: 1, scale: 1 },
          hover: {
            y: -20,
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.4, ease: "easeInOut" }
          }
        }}
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </motion.svg>

      {/* PC Monitor with Terminal */}
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute inset-0 w-full h-full drop-shadow-sm"
        variants={{
          rest: { y: 20, opacity: 0, scale: 0.8 },
          hover: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, delay: 0.1, type: "spring", stiffness: 300, damping: 20 }
          }
        }}
      >
        {/* Monitor Base */}
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />

        {/* Terminal Prompt ">" */}
        <motion.path
          d="M 6 8 L 8 10 L 6 12"
          strokeWidth="1.5"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1, transition: { delay: 0.4 } }
          }}
        />
        {/* Blinking Cursor "_" */}
        <motion.line
          x1="10" y1="12" x2="14" y2="12"
          strokeWidth="1.5"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: [0, 1, 0], transition: { duration: 0.8, repeat: Infinity, delay: 0.5 } }
          }}
        />
      </motion.svg>
    </div>
  );
}

function OpeningEnvelopeAnimation() {
  return (
    <div className="w-12 h-12 flex items-center justify-center relative">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full drop-shadow-sm overflow-visible">

        {/* Back Flap (Open) - Drawn behind paper */}
        <motion.path
          d="M3 8 l9 -7 l9 7"
          style={{ transformOrigin: "50% 8px" }}
          variants={{
            rest: { rotateX: -90, opacity: 0, x: 0, y: 0, rotate: 0 },
            hover: {
              rotateX: [-90, -90, 0, 0, 0],
              opacity: [0, 0, 1, 1, 0],
              x: [0, 0, 0, 0, -20],
              y: [0, 0, 0, 0, 20],
              rotate: [0, 0, 0, 0, -45],
              transition: { duration: 2, times: [0, 0.15, 0.3, 0.7, 1], ease: "easeInOut" }
            }
          }}
        />

        {/* Paper - Slides completely out, then flies right */}
        <motion.g
          variants={{
            rest: { x: 0, y: 0, opacity: 0, rotate: 0 },
            hover: {
              y: [0, 0, -14, -14, -8],
              x: [0, 0, 0, 0, 12],
              opacity: [0, 0, 1, 1, 1],
              rotate: [0, 0, 0, 0, 20],
              transition: { duration: 2, times: [0, 0.3, 0.6, 0.7, 1], ease: "easeInOut" }
            }
          }}
        >
          <rect x="5" y="8" width="14" height="10" rx="1" className="fill-neutral-200 dark:fill-neutral-800" stroke="none" />
          <path d="M8 12 h8 M8 15 h4" stroke="currentColor" />
        </motion.g>

        {/* Envelope Body - Covers paper's bottom half, then flies away */}
        <motion.path
          d="M3 8 h18 v10 a2 2 0 0 1 -2 2 H5 a2 2 0 0 1 -2 -2 V8 z"
          className="fill-white dark:fill-neutral-900"
          style={{ transformOrigin: "center" }}
          variants={{
            rest: { x: 0, y: 0, opacity: 1, rotate: 0 },
            hover: {
              x: [0, 0, -20],
              y: [0, 0, 20],
              opacity: [1, 1, 0],
              rotate: [0, 0, -45],
              transition: { duration: 2, times: [0, 0.7, 1], ease: "easeInOut" }
            }
          }}
        />

        {/* Front Flap (Closed) - Folds open and disappears */}
        <motion.path
          d="M3 8 l9 7 l9 -7"
          style={{ transformOrigin: "50% 8px" }}
          variants={{
            rest: { rotateX: 0, opacity: 1 },
            hover: {
              rotateX: [0, 90, 90],
              opacity: [1, 0, 0],
              transition: { duration: 2, times: [0, 0.15, 1], ease: "easeInOut" }
            }
          }}
        />
      </svg>
    </div>
  );
}

function TwitterToXAnimation() {
  return (
    <div className="w-8 h-8 relative flex items-center justify-center">
      {/* Twitter Bird */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        variants={{
          rest: { y: 0, x: 0, opacity: 1, rotate: 0, scale: 1 },
          hover: {
            y: -15,
            x: 15,
            opacity: 0,
            rotate: 20,
            scale: 0.5,
            transition: { duration: 0.5, ease: "easeIn" }
          }
        }}
      >
        <Twitter className="w-full h-full" />
      </motion.div>

      {/* X Logo */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        variants={{
          rest: { y: 15, opacity: 0, rotate: -20, scale: 0.5 },
          hover: {
            y: 0,
            opacity: 1,
            rotate: 0,
            scale: 1,
            transition: { duration: 0.5, delay: 0.2, type: "spring", stiffness: 300, damping: 20 }
          }
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[85%] h-[85%] drop-shadow-sm">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </motion.div>
    </div>
  );
}

function LinkedinToMagnetAnimation() {
  return (
    <div className="w-8 h-8 relative flex items-center justify-center">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full drop-shadow-sm overflow-visible">

        {/* LinkedIn Bounding Box */}
        <motion.rect
          x="2" y="2" width="20" height="20" rx="4"
          variants={{
            rest: { opacity: 1, scale: 1 },
            hover: { opacity: 0, scale: 1.2, transition: { duration: 0.3 } }
          }}
        />

        {/* The magnet group (rotates together) */}
        <motion.g
          style={{ transformOrigin: "center" }}
          variants={{
            rest: { rotate: 0 },
            hover: { rotate: 15, transition: { duration: 0.5, type: "spring", stiffness: 100 } }
          }}
        >
          {/* Magnetic Waves */}
          <motion.g
            variants={{
              rest: { opacity: 0, y: 5 },
              hover: { opacity: 1, y: -2, transition: { duration: 0.4, delay: 0.2 } }
            }}
          >
            <motion.path
              d="M 9 1 A 3 3 0 0 1 15 1"
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: [0, 1, 0], transition: { duration: 1.5, repeat: Infinity, delay: 0.2 } }
              }}
            />
            <motion.path
              d="M 7 -3 A 5 5 0 0 1 17 -3"
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: [0, 1, 0], transition: { duration: 1.5, repeat: Infinity, delay: 0.6 } }
              }}
            />
          </motion.g>

          {/* Morphing Path */}
          <motion.path
            variants={{
              rest: {
                d: "M 8 10 L 8 18 M 8 6 L 8 6.1 M 12 10 L 12 18 M 12 13 C 12 10 16 10 16 13 L 16 18 M 16 18 L 16 18"
              },
              hover: {
                d: "M 7 10 L 7 20 M 5 17 L 9 17 M 15 17 L 19 17 M 7 10 C 7 2 17 2 17 10 L 17 20 M 17 20 L 17 20",
                transition: { duration: 0.6, type: "spring", stiffness: 100, damping: 15 }
              }
            }}
          />
        </motion.g>
      </svg>
    </div>
  );
}

type LinkItem = {
  name: string;
  url: string;
  icon: React.ReactNode;
  hideLabel?: boolean;
};

const links: LinkItem[] = [
  { name: 'GitHub', url: 'https://github.com/eatulrajput', icon: <GithubOctocatAnimation /> },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/eatulrajput', icon: <LinkedinToMagnetAnimation /> },
  { name: 'X', url: 'https://x.com/eatulrajput', icon: <TwitterToXAnimation /> },
  { name: 'Email', url: 'mailto:[EMAIL_ADDRESS]', icon: <OpeningEnvelopeAnimation /> },
];

export function LinksCard() {
  return (
    <BentoBox className="p-6 flex flex-col h-full w-full">
      <h3 className="text-xl font-bold mb-4">Let's Connect</h3>
      <div className="grid grid-cols-2 gap-3 flex-1">
        {links.map((link, idx) => (
          <motion.a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial="rest"
            whileHover="hover"
            className="group relative flex flex-col items-center justify-center p-4 rounded-3xl bg-neutral-100 dark:bg-neutral-900/40 border border-transparent hover:border-brand-accent/20 hover:bg-brand-accent/5 dark:hover:bg-brand-accent/10 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-2 right-2 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
              <ArrowUpRight className="w-4 h-4 text-brand-accent" />
            </div>
            <div className={`text-neutral-500 dark:text-neutral-400 group-hover:text-brand-accent transition-colors duration-300 ${!link.hideLabel ? 'mb-2' : ''}`}>
              {link.icon}
            </div>
            {!link.hideLabel && (
              <span className="font-semibold text-sm text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                {link.name}
              </span>
            )}
          </motion.a>
        ))}
      </div>
    </BentoBox>
  );
}
