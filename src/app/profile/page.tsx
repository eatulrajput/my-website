import React from 'react';
import { ProfileBento } from '@/components/profile/ProfileBento';
import { NetworkHeader } from '@/components/profile/NetworkHeader';
import { HomeButton } from '@/components/profile/HomeButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile | Atul Rajput',
  description: 'About me, skills, and professional experience.',
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen pt-24 pb-24">
      <NetworkHeader />
      <div className="container mx-auto px-4 mt-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">Profile</h1>
              <p className="text-neutral-500 dark:text-neutral-400">
                A quick glimpse into my technical universe.
              </p>
            </div>
            <HomeButton />
          </div>
          
          <ProfileBento />
        </div>
      </div>
    </div>
  );
}
