'use client';

import React from 'react';
import { GraduationCap, Award, Rocket, TrendingUp, Users, Building, CheckCircle } from 'lucide-react';

interface Program {
  name: string;
  organization: string;
  period: string;
  type: string;
  status: 'completed' | 'active';
  description: string;
  outcomes: string[];
  icon: React.ReactNode;
}

const programs: Program[] = [
  {
    name: 'NSF Innovators Program',
    organization: 'Aalborg University, Denmark',
    period: 'Summer 2023',
    type: 'Research Program',
    status: 'completed',
    description: 'Identified the core challenge of solar panel degradation and second-life applications',
    outcomes: [
      'Founded Solar Sense concept',
      'Identified technical approach',
      'Established research foundation',
    ],
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    name: 'InventOR Prototyping Competition',
    organization: 'InventOR',
    period: 'Fall 2023 - 2024',
    type: 'Accelerator + Competition',
    status: 'completed',
    description: 'Developed prototypes, participated in events and showcases',
    outcomes: [
      'Prototype development resources',
      'Mentorship access',
      'Multiple showcase opportunities',
      'Critical user feedback',
    ],
    icon: <Rocket className="h-5 w-5" />,
  },
  {
    name: 'Catalyze Klamath Challenge',
    organization: 'Local Competition',
    period: 'Fall 2023',
    type: 'Pitch Competition',
    status: 'completed',
    description: 'First public pitch with preliminary prototype',
    outcomes: [
      'Market validation',
      'Initial feedback',
      'Pitch experience',
    ],
    icon: <Award className="h-5 w-5" />,
  },
  {
    name: 'OIT IdeaFest',
    organization: 'Oregon Institute of Technology',
    period: 'Spring 2024',
    type: 'Innovation Showcase',
    status: 'completed',
    description: 'Demonstrated interactive cardboard and LED prototypes',
    outcomes: [
      'User engagement insights',
      'Educational impact',
      'Network expansion',
    ],
    icon: <Building className="h-5 w-5" />,
  },
  {
    name: 'American-Made Solar Prize Round 8',
    organization: 'U.S. Department of Energy',
    period: 'Summer 2024',
    type: 'National Competition',
    status: 'completed',
    description: 'Applied with new monitoring-focused approach',
    outcomes: [
      'National visibility',
      'DOE recognition',
      'Validation of technical approach',
    ],
    icon: <Award className="h-5 w-5" />,
  },
  {
    name: 'VertueLab 45Camp',
    organization: 'VertueLab',
    period: 'Summer 2024',
    type: 'Accelerator Program',
    status: 'completed',
    description: 'Business model development, market research, customer discovery',
    outcomes: [
      'Refined value proposition',
      'Market segmentation insights',
      'Business model validation',
    ],
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    name: 'TiE XL Bootcamp',
    organization: 'TiE (The Indus Entrepreneurs)',
    period: 'Fall 2024',
    type: 'Entrepreneurship Bootcamp',
    status: 'completed',
    description: 'Startup ecosystem navigation, due diligence, investor relations',
    outcomes: [
      'Strengthened fundraising readiness',
      'Expanded mentor network',
      'Improved business acumen',
    ],
    icon: <Users className="h-5 w-5" />,
  },
  {
    name: 'OEN Startup Program',
    organization: 'Oregon Entrepreneurs Network',
    period: 'Fall 2024',
    type: 'Business Development',
    status: 'completed',
    description: 'Business model refinement, value proposition testing, assumption validation',
    outcomes: [
      'Solidified product-market fit',
      'Validated key assumptions',
      'Developed strategic roadmap',
    ],
    icon: <Rocket className="h-5 w-5" />,
  },
  {
    name: 'Janus Innovation Hub',
    organization: 'Janus',
    period: 'November 2024 - Present',
    type: 'Strategy Partnership',
    status: 'active',
    description: 'Go-to-market strategy development and customer acquisition planning',
    outcomes: [
      'Refining go-to-market strategy',
      'Market entry planning',
      'Partnership development',
    ],
    icon: <TrendingUp className="h-5 w-5" />,
  },
];

export function ProgramsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {programs.map((program, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 dark:from-emerald-600 dark:to-teal-600 rounded-lg p-3 text-white shadow-md">
              {program.icon}
            </div>
            {program.status === 'active' ? (
              <div className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-semibold">
                Active
              </div>
            ) : (
              <div className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-semibold flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Completed
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {program.name}
          </h3>

          {/* Organization */}
          <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-2">
            {program.organization}
          </p>

          {/* Period & Type */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
              {program.period}
            </span>
            <span className="text-xs px-2 py-1 rounded bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300">
              {program.type}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            {program.description}
          </p>

          {/* Outcomes */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Key Outcomes:
            </p>
            <ul className="space-y-1">
              {program.outcomes.map((outcome, idx) => (
                <li
                  key={idx}
                  className="text-xs text-gray-700 dark:text-gray-300 flex items-start gap-2"
                >
                  <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">✓</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

