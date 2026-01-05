'use client';

import React from 'react';
import { TrendingUp, Building, Factory, Home } from 'lucide-react';

export default function MarketOpportunity() {
  return (
    <section className="mb-12 sm:mb-16">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Market Opportunity
          </span>
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Massive, underserved market with multiple revenue streams
        </p>
      </div>

      {/* Market Size */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 sm:p-10 shadow-xl border border-gray-200 dark:border-gray-800 max-w-5xl mx-auto mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-3 text-white shadow-lg">
            <TrendingUp className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              $450B Global Solar Market by 2030
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Monitoring infrastructure becomes critical as installations scale
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl">
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
              78 GW
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              U.S. solar capacity in 2023
            </p>
          </div>
          <div className="text-center p-4 bg-teal-50 dark:bg-teal-950/20 rounded-xl">
            <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">
              2M tons
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              PV waste expected by 2030
            </p>
          </div>
          <div className="text-center p-4 bg-cyan-50 dark:bg-cyan-950/20 rounded-xl">
            <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
              15-20%
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Annual growth rate (CAGR)
            </p>
          </div>
        </div>
      </div>

      {/* Target Markets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Commercial Solar */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-4 text-white shadow-lg">
              <Building className="h-8 w-8" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
            Commercial Solar
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>• Need low-cost monitoring solutions</li>
            <li>• Code compliance requirements</li>
            <li>• Asset optimization priority</li>
            <li>• <strong>Primary target market</strong></li>
          </ul>
        </div>

        {/* Solar Installers */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-800">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-4 text-white shadow-lg">
              <Factory className="h-8 w-8" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
            Solar Installers & EPCs
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>• Add value to installations</li>
            <li>• Warranty and O&M services</li>
            <li>• Competitive differentiation</li>
            <li>• <strong>Channel partners</strong></li>
          </ul>
        </div>

        {/* Second-Life Market */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-4 text-white shadow-lg">
              <Home className="h-8 w-8" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
            Second-Life Solar
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>• Underserved communities</li>
            <li>• Developing nations</li>
            <li>• Off-grid applications</li>
            <li>• <strong>Future expansion</strong></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

