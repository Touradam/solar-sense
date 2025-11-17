'use client';

import React from 'react';
import { Cpu, Lightbulb, Zap, Award, BarChart, Sparkles, CheckCircle, Clock } from 'lucide-react';

interface Prototype {
  number: number;
  name: string;
  period: string;
  status: 'completed' | 'active';
  purpose: string;
  features: string[];
  outcome: string;
  learning: string;
  icon: React.ReactNode;
  color: string;
}

const prototypes: Prototype[] = [
  {
    number: 1,
    name: 'Basic PCB Sensor',
    period: 'Fall 2023',
    status: 'completed',
    purpose: 'Proof of concept for data collection from solar panels',
    features: [
      'PCB-based design',
      'Basic multimeter-like readings',
      'Voltage and current sensing',
    ],
    outcome: 'Validated feasibility of sensor-based monitoring',
    learning: 'Data collection is possible, but we need more sophisticated analysis',
    icon: <Cpu className="h-6 w-6" />,
    color: 'emerald',
  },
  {
    number: 2,
    name: 'Interactive Demo Models',
    period: 'Early 2024',
    status: 'completed',
    purpose: 'Educational demonstration and concept validation',
    features: [
      'Cardboard construction',
      'LED-based shading simulators',
      'Hands-on interaction',
      'Visual representation of panel shading',
    ],
    outcome: 'Successful audience engagement at IdeaFest and InventOR',
    learning: 'Physical, interactive demos are powerful for explaining complex concepts',
    icon: <Lightbulb className="h-6 w-6" />,
    color: 'yellow',
  },
  {
    number: 3,
    name: 'First ML-Capable System',
    period: 'Mid 2024',
    status: 'completed',
    purpose: 'Machine learning model training and validation on real panel data',
    features: [
      'Real-time data collection',
      '30W panel monitoring',
      'ML model training capability',
      'Data logging and export',
    ],
    outcome: 'Successfully trained ML model on real panel data',
    learning: 'ML-powered predictions are viable for panel health monitoring',
    icon: <Zap className="h-6 w-6" />,
    color: 'purple',
  },
  {
    number: 4,
    name: 'Demo Day Version',
    period: 'Summer 2024',
    status: 'completed',
    purpose: 'Demonstration for American-Made Solar Prize and competitions',
    features: [
      'Enhanced reliability',
      'Better data visualization',
      'Improved form factor',
      'Demonstration-ready packaging',
    ],
    outcome: 'Successful demos at multiple events',
    learning: 'Presentation quality matters—make it look as good as it works',
    icon: <Award className="h-6 w-6" />,
    color: 'cyan',
  },
  {
    number: 5,
    name: 'Software Dashboard v1',
    period: 'Fall 2024',
    status: 'completed',
    purpose: 'Data visualization and user interface for monitoring',
    features: [
      'Real-time data display',
      'Historical trend analysis',
      'Alert configuration',
      'Multi-panel monitoring',
    ],
    outcome: 'First complete software solution',
    learning: 'User experience is just as important as technical capability',
    icon: <BarChart className="h-6 w-6" />,
    color: 'teal',
  },
  {
    number: 6,
    name: 'Redesigned Dashboard v2',
    period: 'Current (Nov 2024)',
    status: 'active',
    purpose: 'Production-ready monitoring platform with enhanced features',
    features: [
      'Enhanced UX/UI design',
      'Improved performance',
      'Mobile responsiveness',
      'Real-time data processing',
    ],
    outcome: 'Under active development with user feedback',
    learning: 'Continuous iteration based on real-world usage',
    icon: <Sparkles className="h-6 w-6" />,
    color: 'emerald',
  },
];

const colorClasses = {
  emerald: {
    bg: 'from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/10 dark:to-teal-500/10',
    border: 'border-emerald-500 dark:border-emerald-400',
    badge: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
    icon: 'bg-emerald-500 dark:bg-emerald-600',
  },
  teal: {
    bg: 'from-teal-500/20 to-cyan-500/20 dark:from-teal-500/10 dark:to-cyan-500/10',
    border: 'border-teal-500 dark:border-teal-400',
    badge: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300',
    icon: 'bg-teal-500 dark:bg-teal-600',
  },
  cyan: {
    bg: 'from-cyan-500/20 to-blue-500/20 dark:from-cyan-500/10 dark:to-blue-500/10',
    border: 'border-cyan-500 dark:border-cyan-400',
    badge: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
    icon: 'bg-cyan-500 dark:bg-cyan-600',
  },
  purple: {
    bg: 'from-purple-500/20 to-pink-500/20 dark:from-purple-500/10 dark:to-pink-500/10',
    border: 'border-purple-500 dark:border-purple-400',
    badge: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
    icon: 'bg-purple-500 dark:bg-purple-600',
  },
  yellow: {
    bg: 'from-yellow-500/20 to-orange-500/20 dark:from-yellow-500/10 dark:to-orange-500/10',
    border: 'border-yellow-500 dark:border-yellow-400',
    badge: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    icon: 'bg-yellow-500 dark:bg-yellow-600',
  },
};

export function PrototypeGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {prototypes.map((prototype) => {
        const colors = colorClasses[prototype.color as keyof typeof colorClasses];

        return (
          <div
            key={prototype.number}
            className={`bg-gradient-to-br ${colors.bg} rounded-2xl p-6 border-2 ${colors.border} hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`${colors.icon} rounded-xl p-3 text-white shadow-lg`}>
                {prototype.icon}
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
                  {prototype.period}
                </div>
                {prototype.status === 'active' ? (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium">
                    <Clock className="h-3 w-3 animate-pulse" />
                    Active
                  </div>
                ) : (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium">
                    <CheckCircle className="h-3 w-3" />
                    Completed
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Prototype {prototype.number}
            </h3>
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
              {prototype.name}
            </h4>

            {/* Purpose */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Purpose:</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{prototype.purpose}</p>
            </div>

            {/* Features */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Key Features:</p>
              <ul className="space-y-1">
                {prototype.features.map((feature, idx) => (
                  <li key={idx} className="text-xs text-gray-700 dark:text-gray-300 flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcome */}
            <div className="mb-3 p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Outcome:</p>
              <p className="text-xs text-gray-700 dark:text-gray-300">{prototype.outcome}</p>
            </div>

            {/* Learning */}
            <div className="p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg border-l-4 border-emerald-500 dark:border-emerald-400">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">💡 Key Learning:</p>
              <p className="text-xs italic text-gray-700 dark:text-gray-300">{prototype.learning}</p>
            </div>

            {/* Photo Placeholder */}
            <div className="mt-4 bg-gray-200 dark:bg-gray-800 rounded-lg h-40 flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <div className="text-3xl mb-2">📸</div>
                <p className="text-xs">Photo Coming Soon</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

