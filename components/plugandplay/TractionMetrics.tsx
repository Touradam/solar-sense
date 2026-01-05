'use client';

import React from 'react';
import { Award, Users, Cpu, Rocket } from 'lucide-react';

export default function TractionMetrics() {
  return (
    <section className="mb-12 sm:mb-16">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Traction & Validation
          </span>
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          From research to market-ready product
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-800 text-center">
          <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            4
          </div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Prototypes Built
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-800 text-center">
          <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            4
          </div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Startup Programs
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-800 text-center">
          <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            3
          </div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Competition Wins
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-800 text-center">
          <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            2023
          </div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Founded
          </div>
        </div>
      </div>

      {/* Key Milestones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* InventOR Award */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border-2 border-purple-200 dark:border-purple-800">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-3 text-white shadow-lg">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                InventOR 2024 Visionary Award Winner
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Statewide recognition for innovative approach to solar sustainability
              </p>
            </div>
          </div>
        </div>

        {/* Accelerator Programs */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border-2 border-teal-200 dark:border-teal-800">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl p-3 text-white shadow-lg">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Accelerator Alumni
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                VertueLab 45Camp • TiE XL Bootcamp • OEN Angel Oregon • Janus Innovation Hub
              </p>
            </div>
          </div>
        </div>

        {/* Technical Validation */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border-2 border-cyan-200 dark:border-cyan-800">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-3 text-white shadow-lg">
              <Cpu className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Functional Prototype Complete
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ML-enabled monitoring system tested on 30W panel with real-time data collection
              </p>
            </div>
          </div>
        </div>

        {/* Market Validation */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border-2 border-emerald-200 dark:border-emerald-800">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-3 text-white shadow-lg">
              <Rocket className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                American-Made Solar Prize
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Competing in DOE's prestigious innovation competition (Round 8)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

