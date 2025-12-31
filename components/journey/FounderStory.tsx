'use client';

import React from 'react';
import { GraduationCap, Globe, Lightbulb } from 'lucide-react';

export default function FounderStory() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white dark:from-gray-950 dark:via-emerald-950/10 dark:to-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Founder's Story
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            From architecture student in Guinea to renewable energy innovator
          </p>
        </div>

        {/* Story Content */}
        <div className="max-w-4xl mx-auto">
          
          {/* Main Bio Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 sm:p-10 lg:p-12 shadow-xl border border-gray-200 dark:border-gray-800">
            
            {/* Academic Journey */}
            <div className="mb-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-3 text-white shadow-lg">
                  <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Academic Journey
                  </h3>
                  <p className="text-sm sm:text-base text-emerald-600 dark:text-emerald-400 font-semibold">
                    From Guinea to Oregon
                  </p>
                </div>
              </div>
              <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
                <p>
                  <strong>Adama Toure</strong> began his academic journey studying architecture in Conakry, Guinea, where he 
                  experienced firsthand the impacts of unreliable energy infrastructure and climate change—experiences that 
                  continue to drive his work today.
                </p>
                <p>
                  Motivated by the pressing need for energy security and climate resilience, he pursued a <strong>B.S. in 
                  Renewable Energy Engineering at the Oregon Institute of Technology</strong>.
                </p>
              </div>
            </div>

            {/* NSF Research */}
            <div className="mb-10 pb-10 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-3 text-white shadow-lg">
                  <Globe className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    NSF Research Program
                  </h3>
                  <p className="text-sm sm:text-base text-cyan-600 dark:text-cyan-400 font-semibold">
                    Aalborg University, Denmark • 2023
                  </p>
                </div>
              </div>
              <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
                <p>
                  In 2023, Adama participated in the <strong>NSF-funded Innovator Research Program</strong> at Aalborg 
                  University in Denmark, where he investigated photovoltaic (PV) module degradation and developed a technology 
                  to make second-life panels a viable solution for underserved communities.
                </p>
              </div>
            </div>

            {/* Founding Solar Sense */}
            <div>
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl p-3 text-white shadow-lg">
                  <Lightbulb className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Founding Solar Sense
                  </h3>
                  <p className="text-sm sm:text-base text-teal-600 dark:text-teal-400 font-semibold">
                    Smart Solar Monitoring & Safety
                  </p>
                </div>
              </div>
              <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
                <p>
                  He founded <strong>Solar Sense</strong> with his classmate <strong>Jordan 
                  Harris-Toovy</strong> to bring a low-cost monitoring device to the second-life PV market.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

