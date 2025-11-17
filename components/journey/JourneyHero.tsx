'use client';

import React from 'react';
import { Sparkles, Globe, Rocket } from 'lucide-react';

export function JourneyHero() {
  return (
    <div className="relative mb-12 sm:mb-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/5 dark:to-teal-500/5 rounded-3xl" />
      
      <div className="relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl p-8 sm:p-12 lg:p-16">
        {/* Tag Line */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm sm:text-base font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
            Summer 2023 – Present
          </span>
          <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-6 leading-tight">
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            From Denmark to Dashboard
          </span>
        </h1>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
          Building the Future of Solar Monitoring
        </h2>

        {/* Story Lead */}
        <div className="max-w-4xl mx-auto space-y-6 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="text-center sm:text-left">
            <Globe className="inline-block h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2 mb-1" />
            SEPT's journey began in <strong>Summer 2023</strong> during the <strong>NSF Innovators Program</strong> at{' '}
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
            Through <strong>6 prototypes</strong>, <strong>9+ accelerator programs</strong>, and countless iterations,
            we've discovered what the solar industry really needs: <strong className="text-emerald-600 dark:text-emerald-400">
            affordable, code-compliant monitoring that prevents premature panel decommissioning</strong>.
          </p>
        </div>

        {/* Key Highlights */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-xl p-6 text-center border border-emerald-200 dark:border-emerald-800">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
              🌍
            </div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
              International Origin
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              NSF Program, Denmark
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 rounded-xl p-6 text-center border border-teal-200 dark:border-teal-800">
            <div className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-2">
              🔄
            </div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
              Rapid Iteration
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              6 prototypes in 18 months
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-emerald-50 dark:from-cyan-950/30 dark:to-emerald-950/30 rounded-xl p-6 text-center border border-cyan-200 dark:border-cyan-800">
            <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
              🚀
            </div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
              Market Driven
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Pivoted based on feedback
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

