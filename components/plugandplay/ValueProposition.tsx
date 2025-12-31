'use client';

import React from 'react';
import { Shield, DollarSign, Zap, CheckCircle } from 'lucide-react';

export default function ValueProposition() {
  return (
    <section className="mb-12 sm:mb-16">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            The SEPT Solution
          </span>
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Low-cost, code-compliant monitoring that extends solar asset lifespan
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-8">
        {/* Affordable Monitoring */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200 dark:border-gray-800">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-3 text-white shadow-lg">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                10x Cost Reduction
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Replaces expensive thermal imaging ($10K+) with affordable panel-level electrical monitoring
              </p>
            </div>
          </div>
        </div>

        {/* Code Compliance */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200 dark:border-gray-800">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-3 text-white shadow-lg">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                NEC-Compliant Safety
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Built-in rapid shutdown compliance eliminates need for additional safety devices
              </p>
            </div>
          </div>
        </div>

        {/* Real-Time Monitoring */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200 dark:border-gray-800">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-3 text-white shadow-lg">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Panel-Level Intelligence
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                ML-powered fault detection identifies failing panels before they impact system performance
              </p>
            </div>
          </div>
        </div>

        {/* Second-Life Enabler */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200 dark:border-gray-800">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl p-3 text-white shadow-lg">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Circular Economy Ready
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Enables safe reuse of decommissioned panels, creating new markets and preventing landfill waste
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl p-6 sm:p-8 shadow-2xl text-white max-w-5xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Technology Stack
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-bold mb-2">Hardware</div>
            <p className="text-sm sm:text-base text-white/90">
              Custom PCB sensors with electrical signature monitoring
            </p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold mb-2">Software</div>
            <p className="text-sm sm:text-base text-white/90">
              Cloud dashboard with real-time analytics and alerts
            </p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold mb-2">AI/ML</div>
            <p className="text-sm sm:text-base text-white/90">
              Physics-informed models for predictive fault detection
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

