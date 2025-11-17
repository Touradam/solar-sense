'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Rocket, Lightbulb, Users, TrendingUp, Zap, Award } from 'lucide-react';
import { withBasePath } from '@/lib/utils';
import { JourneyHero } from '@/components/journey/JourneyHero';
import { Timeline } from '@/components/journey/Timeline';
import { PrototypeGallery } from '@/components/journey/PrototypeGallery';
import { ProgramsSection } from '@/components/journey/ProgramsSection';
import { LearningsSection } from '@/components/journey/LearningsSection';
import { MetricsSection } from '@/components/journey/MetricsSection';
import { FutureVision } from '@/components/journey/FutureVision';

export default function JourneyPage() {
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
                Our Journey: Innovation in Action
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
        <JourneyHero />

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 sm:mb-16">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-800 text-center">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              18
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Months of Innovation
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-800 text-center">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              6
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Prototypes Built
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-800 text-center">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              9+
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Programs Completed
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-800 text-center">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              ∞
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Lessons Learned
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Timeline
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From a research program in Denmark to a growing cleantech startup—explore every milestone of our journey
            </p>
          </div>
          <Timeline />
        </section>

        {/* Prototypes Section */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Prototypes & Innovation
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Six generations of prototypes, each one teaching us something new
            </p>
          </div>
          <PrototypeGallery />
        </section>

        {/* Programs Section */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Programs & Validation
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Backed by leading accelerators and innovation programs
            </p>
          </div>
          <ProgramsSection />
        </section>

        {/* Key Learnings Section */}
        <section className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Key Learnings
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              What we discovered building SEPT from the ground up
            </p>
          </div>
          <LearningsSection />
        </section>

        {/* Metrics Section */}
        <section className="mb-12 sm:mb-16">
          <MetricsSection />
        </section>

        {/* Future Vision Section */}
        <section className="mb-12">
          <FutureVision />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>© 2024 SEPT LLC. Building the future of solar energy protection.</p>
            <p className="mt-2">
              <Link href="/" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                Back to Home
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

