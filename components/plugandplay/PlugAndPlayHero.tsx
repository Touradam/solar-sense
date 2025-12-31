'use client';

import React from 'react';
import { Zap, Target, Globe } from 'lucide-react';

export default function PlugAndPlayHero() {
  return (
    <section className="mb-12 sm:mb-16">
      <div className="text-center mb-8 sm:mb-12">
        {/* Plug and Play Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold mb-6 shadow-lg">
          <Zap className="h-4 w-4" />
          <span>Plug and Play Innovation Showcase</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Preventing 60% of Solar Panels from Premature Decommissioning
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
          SEPT delivers <strong>affordable, code-compliant panel-level monitoring</strong> that extends solar asset lifespan 
          and prevents millions of panels from ending up in landfills.
        </p>

        {/* Key Problem Statement */}
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-emerald-200 dark:border-emerald-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-xl p-3 mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                60%
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                of solar panels are <strong>decommissioned prematurely</strong> due to lack of monitoring tools
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl p-3 mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                90%
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                of solar panels end up in <strong>landfills</strong> instead of being recycled or reused
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl p-3 mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                $450B
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                global solar market by 2030, with <strong>monitoring as critical infrastructure</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

