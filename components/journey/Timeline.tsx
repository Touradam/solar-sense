'use client';

import React from 'react';
import { Calendar, MapPin, Users, Lightbulb, Award, TrendingUp, Rocket, Repeat, Cpu } from 'lucide-react';

interface TimelineEvent {
  period: string;
  title: string;
  date?: string;
  location?: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  outcome?: string;
}

const events: TimelineEvent[] = [
  {
    period: 'Summer 2023',
    title: 'SEPT Founded',
    location: 'Aalborg University, Denmark',
    description: 'During the NSF Innovators Program, we identified the core challenge: understanding solar panel degradation and developing affordable solutions for second-life applications.',
    icon: <Rocket className="h-5 w-5" />,
    color: 'emerald',
    outcome: 'Research foundation established'
  },
  {
    period: 'Fall 2023',
    title: 'Jordan Joins & First Prototype',
    description: 'Adama returned to the U.S. and partnered with Jordan Harris-Toovy. His expertise in sensor design enabled us to quickly build the first PCB-based prototype providing basic sensor readings.',
    icon: <Users className="h-5 w-5" />,
    color: 'teal',
    outcome: 'Team formed, first hardware built'
  },
  {
    period: 'Fall 2023',
    title: 'First Competition Pitch',
    description: 'Made our first pitch at the Catalyze Klamath Challenge and was selected for the InventOR Prototyping Competition.',
    icon: <Award className="h-5 w-5" />,
    color: 'cyan',
    outcome: 'Market validation and resources secured'
  },
  {
    period: 'Early 2024',
    title: 'Interactive Demos Built',
    description: 'Built cardboard and LED-based shading simulators that allowed audiences at OIT IdeaFest and InventOR to test concepts hands-on.',
    icon: <Lightbulb className="h-5 w-5" />,
    color: 'emerald',
    outcome: 'Education tool for stakeholder engagement'
  },
  {
    period: 'Mid 2024',
    title: 'The Critical Pivot',
    description: 'Major discovery: the landfill-prevention business case alone wasn\'t strong enough. We identified the real problem—lack of low-cost continuous monitoring causing premature panel decommissioning.',
    icon: <Repeat className="h-5 w-5" />,
    color: 'purple',
    outcome: 'Strategic shift to monitoring focus'
  },
  {
    period: 'Summer 2024',
    title: 'Breakthrough Prototype',
    description: 'Developed the first fully working data-collection prototype capable of training a machine-learning model on a 30W panel.',
    icon: <Cpu className="h-5 w-5" />,
    color: 'teal',
    outcome: 'ML-powered monitoring validated'
  },
  {
    period: 'Summer 2024',
    title: 'Market Research Insights',
    description: 'Discovered that commercial PV operators need low-cost, code-compliant solutions, preferring a single device for both monitoring and safety.',
    icon: <TrendingUp className="h-5 w-5" />,
    color: 'cyan',
    outcome: 'Product-market fit identified'
  },
  {
    period: 'Summer-Fall 2024',
    title: 'Accelerator Programs',
    description: 'Applied to American-Made Solar Prize Round 8, joined VertueLab 45Camp, completed TiE XL Bootcamp, and finished the OEN Startup Program.',
    icon: <Rocket className="h-5 w-5" />,
    color: 'emerald',
    outcome: 'Business model strengthened'
  },
  {
    period: 'Fall 2024',
    title: 'Software Dashboard v1',
    description: 'Created the first prototype of our software dashboard for data visualization and panel monitoring.',
    icon: <Cpu className="h-5 w-5" />,
    color: 'teal',
    outcome: 'Complete software solution'
  },
  {
    period: 'Present',
    title: 'Positioned for Growth',
    description: 'Working with Janus Innovation Hub on go-to-market strategy while releasing our redesigned Dashboard v2.',
    icon: <TrendingUp className="h-5 w-5" />,
    color: 'purple',
    outcome: 'Ready for commercial deployment'
  },
];

const colorClasses = {
  emerald: {
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    border: 'border-emerald-500 dark:border-emerald-400',
    text: 'text-emerald-600 dark:text-emerald-400',
    icon: 'bg-emerald-500 dark:bg-emerald-600',
  },
  teal: {
    bg: 'bg-teal-100 dark:bg-teal-900/30',
    border: 'border-teal-500 dark:border-teal-400',
    text: 'text-teal-600 dark:text-teal-400',
    icon: 'bg-teal-500 dark:bg-teal-600',
  },
  cyan: {
    bg: 'bg-cyan-100 dark:bg-cyan-900/30',
    border: 'border-cyan-500 dark:border-cyan-400',
    text: 'text-cyan-600 dark:text-cyan-400',
    icon: 'bg-cyan-500 dark:bg-cyan-600',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    border: 'border-purple-500 dark:border-purple-400',
    text: 'text-purple-600 dark:text-purple-400',
    icon: 'bg-purple-500 dark:bg-purple-600',
  },
};

export function Timeline() {
  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Vertical Line */}
      <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-teal-500 to-purple-500 transform sm:-translate-x-1/2" />

      {/* Timeline Events */}
      <div className="space-y-8 sm:space-y-12">
        {events.map((event, index) => {
          const colors = colorClasses[event.color as keyof typeof colorClasses];
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={`relative flex items-start ${
                isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
              } gap-4 sm:gap-8`}
            >
              {/* Icon Circle */}
              <div className={`absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 ${colors.icon} rounded-full p-3 text-white shadow-lg z-10 flex items-center justify-center`}>
                {event.icon}
              </div>

              {/* Content Card */}
              <div className={`ml-16 sm:ml-0 flex-1 ${isEven ? 'sm:pr-12' : 'sm:pl-12'}`}>
                <div className={`bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border-2 ${colors.border} hover:shadow-xl transition-shadow`}>
                  {/* Period Badge */}
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${colors.bg} ${colors.text}`}>
                    <Calendar className="inline-block h-3 w-3 mr-1 mb-0.5" />
                    {event.period}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {event.title}
                  </h3>

                  {/* Location */}
                  {event.location && (
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    {event.description}
                  </p>

                  {/* Outcome */}
                  {event.outcome && (
                    <div className={`pt-3 border-t ${colors.border} border-opacity-30`}>
                      <p className={`text-sm font-medium ${colors.text}`}>
                        ✓ {event.outcome}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden sm:block flex-1" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

