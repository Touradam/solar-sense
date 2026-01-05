'use client';

import React from 'react';
import { Repeat, Target, Users, Zap, Award } from 'lucide-react';

interface Learning {
  title: string;
  when: string;
  discovery: string;
  insight: string;
  impact: string;
  quote?: string;
  icon: React.ReactNode;
  color: string;
}

const learnings: Learning[] = [
  {
    title: 'The Business Case Pivot',
    when: 'Mid 2024',
    discovery: 'The landfill-prevention business case alone wasn\'t strong enough. The market didn\'t respond to environmental impact as strongly as expected.',
    insight: 'Industry faces a lack of low-cost tools to continuously monitor individual solar panels, causing premature decommissioning and lost revenue.',
    impact: 'Completely pivoted from "second-life panel reuse" to "prevent premature decommissioning through monitoring"—stronger value proposition with clear ROI for customers.',
    quote: '"We thought saving panels from landfills would be compelling. The market showed us that saving money by keeping panels online longer is what really matters."',
    icon: <Repeat className="h-6 w-6" />,
    color: 'purple',
  },
  {
    title: 'Market Segmentation is Critical',
    when: 'Summer 2024',
    discovery: 'Different solar sectors have completely different needs. Utility PV avoids adding costs (not our market), while commercial PV operators need low-cost, code-compliant solutions.',
    insight: 'Market strongly prefers a single device that handles BOTH monitoring AND safety requirements, rather than multiple separate devices.',
    impact: 'Product roadmap completely realigned to commercial PV sector, integrated monitoring + safety in one device, designed for code compliance from the start.',
    icon: <Target className="h-6 w-6" />,
    color: 'cyan',
  },
  {
    title: 'Show, Don\'t Just Tell',
    when: 'Throughout 2024',
    discovery: 'Interactive, hands-on demonstrations (cardboard + LED simulators) were far more effective than technical presentations for communicating value.',
    insight: 'Solar panel monitoring is an abstract concept. Making it tangible helps customers understand both the problem and solution.',
    impact: 'Invest in demo-quality prototypes, create interactive experiences, lead with hands-on engagement. This influenced our software dashboard design to be highly visual and intuitive.',
    icon: <Users className="h-6 w-6" />,
    color: 'yellow',
  },
  {
    title: 'Iteration Speed Matters',
    when: 'Throughout journey',
    discovery: '6 prototypes in ~18 months with multiple pivots and refinements. Fast iteration beats perfect planning—each prototype taught us something that changed the next version.',
    insight: '"Good enough to test" beats "perfect in theory." User feedback drives better design than internal assumptions.',
    impact: 'Embraced rapid prototyping culture, test early and often, let user feedback drive design decisions. Fail fast, learn faster.',
    icon: <Zap className="h-6 w-6" />,
    color: 'emerald',
  },
  {
    title: 'Programs & Mentorship are Invaluable',
    when: 'Throughout 2024',
    discovery: 'Participated in 9+ accelerator/bootcamp programs, engaged with dozens of mentors, gained countless hours of guidance.',
    insight: 'No one builds a successful company alone. The ecosystem exists to help—use it. Every mentor, judge, and advisor shaped Solar Sense\'s direction.',
    impact: 'Business model validation, technical feedback, industry connections, investor readiness, strategic clarity. The support system accelerated our progress exponentially.',
    icon: <Award className="h-6 w-6" />,
    color: 'cyan',
  },
];

const colorClasses = {
  emerald: {
    bg: 'from-emerald-500/10 to-cyan-500/10',
    border: 'border-emerald-500 dark:border-emerald-400',
    icon: 'bg-emerald-500 dark:bg-emerald-600',
    text: 'text-emerald-600 dark:text-emerald-400',
  },
  cyan: {
    bg: 'from-cyan-500/10 to-cyan-600/10',
    border: 'border-cyan-500 dark:border-cyan-400',
    icon: 'bg-cyan-500 dark:bg-cyan-600',
    text: 'text-cyan-600 dark:text-cyan-400',
  },
  purple: {
    bg: 'from-emerald-500/10 to-emerald-600/10',
    border: 'border-emerald-500 dark:border-emerald-400',
    icon: 'bg-emerald-500 dark:bg-emerald-600',
    text: 'text-emerald-600 dark:text-emerald-400',
  },
  yellow: {
    bg: 'from-yellow-500/10 to-amber-500/10',
    border: 'border-yellow-500 dark:border-amber-400',
    icon: 'bg-yellow-500 dark:bg-amber-600',
    text: 'text-yellow-600 dark:text-yellow-400',
  },
};

export function LearningsSection() {
  return (
    <div className="space-y-6">
      {learnings.map((learning, index) => {
        const colors = colorClasses[learning.color as keyof typeof colorClasses];

        return (
          <div
            key={index}
            className={`bg-gradient-to-br ${colors.bg} dark:from-gray-900/50 dark:to-gray-800/50 rounded-2xl p-6 sm:p-8 border-2 ${colors.border} hover:shadow-2xl transition-all duration-300`}
          >
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Icon Section */}
              <div className="flex-shrink-0">
                <div className={`${colors.icon} rounded-xl p-4 text-white shadow-lg w-fit`}>
                  {learning.icon}
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 space-y-4">
                {/* Header */}
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {learning.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-white/50 dark:bg-gray-900/50 ${colors.text}`}>
                      {learning.when}
                    </span>
                  </div>
                </div>

                {/* Discovery */}
                <div className="bg-white/50 dark:bg-gray-900/50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    💡 What We Discovered:
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {learning.discovery}
                  </p>
                </div>

                {/* Insight */}
                <div className="bg-white/50 dark:bg-gray-900/50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    🎯 The Deeper Insight:
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {learning.insight}
                  </p>
                </div>

                {/* Impact */}
                <div className={`bg-white/50 dark:bg-gray-900/50 rounded-lg p-4 border-l-4 ${colors.border}`}>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    🚀 How It Changed Us:
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {learning.impact}
                  </p>
                </div>

                {/* Quote (if available) */}
                {learning.quote && (
                  <div className="bg-white/70 dark:bg-gray-900/70 rounded-lg p-4 border-l-4 border-emerald-500 dark:border-emerald-400">
                    <p className="text-sm italic text-gray-700 dark:text-gray-300">
                      {learning.quote}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                      — Adama, Founder
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

