'use client';

import React from 'react';
import { Handshake, Target, Lightbulb, TrendingUp } from 'lucide-react';

export default function PartnershipOpportunities() {
  return (
    <section className="mb-12 sm:mb-16">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Partnership Opportunities
          </span>
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            How Plug and Play partners can accelerate SEPT's growth
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Strategic Partners */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-2xl p-6 sm:p-8 shadow-xl border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-3 text-white shadow-lg">
              <Handshake className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Strategic Corporate Partners
              </h3>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
                Solar manufacturers, energy companies, and utilities seeking to enhance their sustainability credentials 
                and reduce PV waste.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800">
                  <div className="font-semibold text-gray-900 dark:text-white mb-1">Pilot Programs</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Deploy SEPT devices in existing commercial solar arrays
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800">
                  <div className="font-semibold text-gray-900 dark:text-white mb-1">Joint Development</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Collaborate on product refinement and market fit
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Investor Partners */}
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 rounded-2xl p-6 sm:p-8 shadow-xl border border-cyan-200 dark:border-cyan-800">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-3 text-white shadow-lg">
              <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Investor Network Access
              </h3>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
                Seeking seed funding to scale manufacturing, expand team, and accelerate go-to-market strategy.
              </p>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-5 border border-cyan-200 dark:border-cyan-800">
                <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">Funding Goal: $500K - $1M</div>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>• <strong>Manufacturing:</strong> Scale prototype to commercial production</li>
                  <li>• <strong>Team:</strong> Hire sales, marketing, and additional engineering talent</li>
                  <li>• <strong>Market:</strong> Launch pilot programs with 3-5 commercial partners</li>
                  <li>• <strong>Certification:</strong> Complete UL/NEC certification process</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Partners */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl p-6 sm:p-8 shadow-xl border border-purple-200 dark:border-purple-800">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-3 text-white shadow-lg">
              <Lightbulb className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Technical & Academic Partnerships
              </h3>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
                Collaborate with research institutions, testing facilities, and certification bodies to validate 
                and refine SEPT technology.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                  <div className="font-semibold text-gray-900 dark:text-white mb-1">Testing Facilities</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Access to solar testing labs and certification partners
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                  <div className="font-semibold text-gray-900 dark:text-white mb-1">Research Collaboration</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Joint research on PV degradation and ML applications
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Distribution Partners */}
        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/20 dark:to-emerald-950/20 rounded-2xl p-6 sm:p-8 shadow-xl border border-teal-200 dark:border-teal-800">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl p-3 text-white shadow-lg">
              <Target className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Channel & Distribution Partners
              </h3>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
                Solar installers, EPCs, and distributors who can integrate SEPT devices into their existing 
                product offerings.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-teal-200 dark:border-teal-800">
                  <div className="font-semibold text-gray-900 dark:text-white mb-1">Installer Networks</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Bundle with new installations as value-add service
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-teal-200 dark:border-teal-800">
                  <div className="font-semibold text-gray-900 dark:text-white mb-1">O&M Providers</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Enhance monitoring and maintenance service offerings
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl p-8 sm:p-10 shadow-2xl text-white text-center max-w-4xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4">
          Let's Build the Future of Solar Together
        </h3>
        <p className="text-base sm:text-lg mb-6 text-white/90">
          Interested in partnering with SEPT? We'd love to discuss how we can collaborate to make solar truly sustainable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:contact@sept.tech"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-emerald-600 font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Schedule a Meeting
          </a>
          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border-2 border-white text-white font-semibold hover:bg-white/20 transition-colors"
          >
            Learn More About SEPT
          </a>
        </div>
      </div>
    </section>
  );
}

