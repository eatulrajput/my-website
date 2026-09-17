import React from 'react';
import { ProfileBento } from '@/components/profile/ProfileBento';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile | Atul Rajput',
  description: 'About me, skills, and professional experience.',
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Profile</h1>
          <p className="text-neutral-500 dark:text-neutral-400">
            A quick glimpse into my technical universe.
          </p>
        </div>
        
        <ProfileBento />
      </div>
    </div>
  );
}
