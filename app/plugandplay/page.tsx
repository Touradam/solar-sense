'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { withBasePath } from '@/lib/utils';
import PlugAndPlayHero from '@/components/plugandplay/PlugAndPlayHero';
import FounderBio from '@/components/plugandplay/FounderBio';
import ValueProposition from '@/components/plugandplay/ValueProposition';
import MarketOpportunity from '@/components/plugandplay/MarketOpportunity';
import TractionMetrics from '@/components/plugandplay/TractionMetrics';
import PartnershipOpportunities from '@/components/plugandplay/PartnershipOpportunities';

export default function PlugAndPlayPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30 dark:from-gray-950 dark:via-emerald-950/10 dark:to-teal-950/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg dark:bg-gray-950/80 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex h-14 items-center justify-between gap-2 sm:gap-4">
            {/* Left: Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <Image
                src={withBasePath("/SEPT_logo_Transparent.png")}
                alt="SEPT Logo"
                width={100}
                height={33}
                className="h-8 sm:h-10 w-auto transition-transform group-hover:scale-105"
                priority
              />
            </Link>

            {/* Center: Page Title */}
            <div className="flex-1 text-center hidden md:block px-2">
              <h1 className="text-sm md:text-base lg:text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent truncate">
                SEPT × Plug and Play
              </h1>
            </div>

            {/* Right: Back Button */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 h-10 sm:h-11 rounded-lg text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md hover:shadow-lg transition-all touch-manipulation"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden xs:inline sm:hidden">Back</span>
                <span className="hidden sm:inline">Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-7xl">
        {/* Hero Section */}
        <PlugAndPlayHero />

        {/* Value Proposition */}
        <ValueProposition />

        {/* Market Opportunity */}
        <MarketOpportunity />

        {/* Traction Metrics */}
        <TractionMetrics />

        {/* Founder Bio */}
        <FounderBio />

        {/* Partnership Opportunities */}
        <PartnershipOpportunities />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>© 2024 SEPT LLC. Building the future of solar energy protection.</p>
            <p className="mt-2">
              <a href="mailto:contact@sept.tech" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                contact@sept.tech
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

