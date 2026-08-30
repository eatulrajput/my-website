"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemePaletteId } from '@/lib/theme';

export type ActiveFont = 'google-sans' | 'inter' | 'mozilla' | 'mono';

// feature flag
type FeatureFlags = {
  enableDarkModeToggle: boolean;
  showScrollbar: boolean;
  enableSecurityShield: boolean;
  activeFont: ActiveFont;
  activePalette: ThemePaletteId;
};

// feature flag context
type FeatureFlagContextType = {
  flags: FeatureFlags;
  setFlag: <K extends keyof FeatureFlags>(key: K, value: FeatureFlags[K]) => void;
};

const defaultFlags: FeatureFlags = {
  enableDarkModeToggle: true,
  showScrollbar: false,
  enableSecurityShield: true,
  activeFont: 'google-sans',
  activePalette: 'ember',
};

// feature flag context
const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(undefined);

// feature flag provider
export const FeatureFlagProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flags, setFlags] = useState<FeatureFlags>(defaultFlags);
  const [isInitialized, setIsInitialized] = useState(false);

  // load feature flags from localStorage on client side
  useEffect(() => {
    const stored = localStorage.getItem('featureFlags');
    if (stored) {
      try {
        setFlags({ ...defaultFlags, ...JSON.parse(stored) });
      } catch (e) {
        console.error("Error reading featureFlags from localStorage", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // update localStorage when flags change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('featureFlags', JSON.stringify(flags));
    }
  }, [flags, isInitialized]);

  // set feature flag
  const setFlag = <K extends keyof FeatureFlags>(key: K, value: FeatureFlags[K]) => {
    setFlags((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <FeatureFlagContext.Provider value={{ flags, setFlag }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

// use feature flag
export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagProvider');
  }
  return context;
};
