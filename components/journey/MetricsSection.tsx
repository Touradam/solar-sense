'use client';

import React from 'react';
import { Users, Cpu, Award, TrendingUp, Target, Zap } from 'lucide-react';

interface Metric {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  color: string;
}

const metrics: Metric[] = [
  {
    icon: <Users className="h-6 w-6" />,
    value: '2+',
    label: 'Core Team Members',
    description: 'From 1 founder to growing team',
    color: 'emerald',
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    value: '6',
    label: 'Prototypes Built',
    description: 'Rapid iteration in 18 months',
    color: 'teal',
  },
  {
    icon: <Award className="h-6 w-6" />,
    value: '9+',
    label: 'Programs Completed',
    description: 'Accelerators and competitions',
    color: 'cyan',
  },
  {
    icon: <Target className="h-6 w-6" />,
    value: '3',
    label: 'Major Pivots',
    description: 'Market-driven adaptations',
    color: 'purple',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    value: '30W',
    label: 'ML-Capable System',
    description: 'Real panel monitoring achieved',
    color: 'yellow',
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    value: '∞',
    label: 'Lessons Learned',
    description: 'Continuous growth mindset',
    color: 'emerald',
  },
];

const colorClasses = {
  emerald: 'from-emerald-500 to-teal-500',
  teal: 'from-teal-500 to-cyan-500',
  cyan: 'from-cyan-500 to-blue-500',
  purple: 'from-purple-500 to-pink-500',
  yellow: 'from-yellow-500 to-orange-500',
};

export function MetricsSection() {
  return (
    <div>
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Impact & Growth
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Measuring our journey in milestones, learnings, and momentum
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            {/* Icon */}
            <div className={`bg-gradient-to-br ${colorClasses[metric.color as keyof typeof colorClasses]} rounded-xl p-4 text-white shadow-lg w-fit mb-4`}>
              {metric.icon}
            </div>

            {/* Value */}
            <div className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r ${colorClasses[metric.color as keyof typeof colorClasses]} bg-clip-text text-transparent mb-2`}>
              {metric.value}
            </div>

            {/* Label */}
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {metric.label}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {metric.description}
            </p>
          </div>
        ))}
      </div>

      {/* Additional Context */}
      <div className="mt-12 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-800">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          What the Numbers Mean
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/50 dark:bg-gray-900/50 rounded-xl p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Technical Evolution</h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 mt-1">✓</span>
                <span>From basic sensors to ML-capable monitoring</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 mt-1">✓</span>
                <span>Successfully trained models on real panel data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 mt-1">✓</span>
                <span>Built complete hardware + software solution</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/50 dark:bg-gray-900/50 rounded-xl p-6">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Business Development</h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-teal-600 dark:text-teal-400 mt-1">✓</span>
                <span>Validated by 9+ competitive programs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 dark:text-teal-400 mt-1">✓</span>
                <span>Identified product-market fit in commercial PV</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 dark:text-teal-400 mt-1">✓</span>
                <span>Built network of mentors and advisors</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

