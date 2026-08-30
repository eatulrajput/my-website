"use client";

import { motion, AnimatePresence } from 'motion/react';
import {
  IconSettings,
  IconX,
  IconSunMoon,
  IconArrowsUpDown,
  IconShieldCheck,
  IconTypography,
  IconPalette,
} from '@tabler/icons-react';
import { useFeatureFlags } from '../context/FeatureFlagContext';
import { themePalettes, ThemePaletteId } from '@/lib/theme';
import { cn } from '@/lib/utils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const FeatureFlagsPanel = ({ isOpen, onClose }: Props) => {
  const { flags, setFlag } = useFeatureFlags();

  const flagItems = [
    {
      id: 'enableDarkModeToggle' as const,
      label: 'Dark Mode Toggle',
      description: 'Show or hide the theme switch button',
      icon: IconSunMoon,
      value: flags.enableDarkModeToggle,
    },
    {
      id: 'showScrollbar' as const,
      label: 'Show Scrollbar',
      description: 'Toggle global browser scrollbar visibility',
      icon: IconArrowsUpDown,
      value: flags.showScrollbar,
    },
    {
      id: 'enableSecurityShield' as const,
      label: 'Security Shield',
      description: 'Disable inspect element & hide hover URLs',
      icon: IconShieldCheck,
      value: flags.enableSecurityShield,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
            className="w-full max-w-md bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl max-h-[90vh] overflow-y-auto hide-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h2 className="text-lg font-bold tracking-tight text-black dark:text-white flex items-center gap-2.5 font-sans">
                <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-brand-accent">
                  <IconSettings className="size-4.5 animate-[spin_8s_linear_infinite]" />
                </div>
                <span>Lab Settings</span>
              </h2>
              <button
                onClick={onClose}
                type="button"
                className="p-2 rounded-xl text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
                aria-label="Close settings panel"
              >
                <IconX className="size-4.5" />
              </button>
            </div>

            <div className="flex flex-col gap-5 relative z-10">
              {/* Feature Cards Grid */}
              <div className="flex flex-col gap-2.5">
                {flagItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 transition-colors"
                    >
                      <div className="flex items-center gap-3 text-left">
                        <div className="p-2 rounded-xl bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                          <Icon className="size-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-xs sm:text-sm text-black dark:text-white font-sans">{item.label}</p>
                          <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">{item.description}</p>
                        </div>
                      </div>

                      {/* Custom Toggle Switch */}
                      <button
                        onClick={() => setFlag(item.id, !item.value)}
                        type="button"
                        className={cn(
                          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none cursor-pointer border border-transparent shadow-inner shrink-0",
                          item.value
                            ? 'bg-brand-accent'
                            : 'bg-neutral-200 dark:bg-neutral-800'
                        )}
                      >
                        <motion.span
                          layout
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className={cn(
                            "inline-block h-4.5 w-4.5 transform rounded-full bg-white dark:bg-black shadow-md",
                            item.value ? 'translate-x-5.5' : 'translate-x-0.5'
                          )}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* 3-Color Theme Palette Selector */}
              <div className="flex flex-col gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <div className="text-left flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                    <IconPalette className="size-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-xs sm:text-sm text-black dark:text-white font-sans">Theme Color Palette</p>
                    <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">Select a 3-color theme palette</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 mt-1">
                  {(Object.keys(themePalettes) as ThemePaletteId[]).map((paletteId) => {
                    const palette = themePalettes[paletteId];
                    const isSelected = (flags.activePalette || 'ember') === paletteId;
                    return (
                      <button
                        key={paletteId}
                        onClick={() => setFlag('activePalette', paletteId)}
                        type="button"
                        className={cn(
                          "p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between text-left",
                          isSelected
                            ? 'border-brand-accent bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white font-semibold shadow-xs'
                            : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {/* 3-Color Swatch Dots */}
                          <div className="flex items-center -space-x-1 shrink-0">
                            {palette.previewSwatches.map((color, idx) => (
                              <span
                                key={idx}
                                style={{ backgroundColor: color }}
                                className="size-3.5 rounded-full ring-2 ring-white dark:ring-black shrink-0"
                              />
                            ))}
                          </div>
                          <div>
                            <p className="text-xs font-bold font-sans">{palette.name}</p>
                            <p className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">{palette.description}</p>
                          </div>
                        </div>

                        {isSelected && (
                          <span className="text-[10px] font-mono font-bold uppercase text-brand-accent shrink-0">
                            Active
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Font Family Selection */}
              <div className="flex flex-col gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <div className="text-left flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                    <IconTypography className="size-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-xs sm:text-sm text-black dark:text-white font-sans">Typography Theme</p>
                    <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">Customize font across the app</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-1">
                  {(['google-sans', 'inter', 'mozilla', 'mono'] as const).map((font) => {
                    const isSelected = flags.activeFont === font;
                    return (
                      <button
                        key={font}
                        onClick={() => setFlag('activeFont', font)}
                        type="button"
                        className={cn(
                          "py-2.5 px-3 rounded-xl border text-xs font-mono transition-all duration-200 cursor-pointer text-left flex flex-col justify-between h-[3.8rem]",
                          isSelected
                            ? 'border-brand-accent bg-neutral-100 dark:bg-neutral-900 text-brand-accent font-bold shadow-xs'
                            : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700'
                        )}
                      >
                        <span className="text-[9px] uppercase tracking-widest leading-none opacity-70">
                          {font === 'google-sans' && 'Modern'}
                          {font === 'inter' && 'Clean'}
                          {font === 'mozilla' && 'Editorial'}
                          {font === 'mono' && 'Technical'}
                        </span>
                        <span className="text-xs font-bold tracking-tight mt-1 leading-none font-sans">
                          {font === 'google-sans' && 'Google Sans'}
                          {font === 'inter' && 'Inter UI'}
                          {font === 'mozilla' && 'Fira Sans'}
                          {font === 'mono' && 'Space Mono'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeatureFlagsPanel;
