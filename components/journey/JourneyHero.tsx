'use client';

import React from 'react';
import { Globe, Rocket } from 'lucide-react';

export function JourneyHero() {
  return (
    <div className="relative mb-12 sm:mb-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/5 dark:to-teal-500/5 rounded-3xl" />
      
      <div className="relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl p-8 sm:p-12 lg:p-16">
        {/* Tag Line */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-sm sm:text-base font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
            Summer 2023 – Present
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-6 leading-tight">
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Taking Ideas from Research Lab to Market
          </span>
        </h1>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
          Building the Future of Solar Monitoring
        </h2>

        {/* Story Lead */}
        <div className="max-w-4xl mx-auto space-y-6 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="text-center sm:text-left">
            <Globe className="inline-block h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2 mb-1" />
            Solar Sense's journey began in <strong>Summer 2023</strong> during the <strong>NSF Innovators Program</strong> at{' '}
            <strong className="text-emerald-600 dark:text-emerald-400">Aalborg University in Denmark</strong>, where
            we identified a critical challenge: understanding solar panel degradation and developing affordable
            solutions for second-life applications.
          </p>

          <p className="text-center sm:text-left">
            What started as a research challenge has evolved into a mission to solve a major industry gap—the lack
            of <strong className="text-teal-600 dark:text-teal-400">low-cost tools to continuously monitor individual
            solar panels</strong>, which causes many panels to be prematurely decommissioned.
          </p>

          <p className="text-center sm:text-left">
            <Rocket className="inline-block h-5 w-5 text-teal-600 dark:text-teal-400 mr-2 mb-1" />
            Through <strong>4 prototypes</strong>, <strong>4 startup programs</strong>, <strong>3 competitions</strong>, and countless iterations,
            we've discovered what the solar industry really needs: <strong className="text-emerald-600 dark:text-emerald-400">
            affordable, code-compliant monitoring that prevents premature panel decommissioning</strong>.
          </p>
        </div>

      </div>
    </div>
  );
}

