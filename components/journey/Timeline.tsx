'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Users, Lightbulb, Award, TrendingUp, Rocket, Repeat, Cpu, Target, ArrowRight } from 'lucide-react';
import { withBasePath } from '@/lib/utils';

interface TimelineEvent {
  period: string;
  title: string;
  date?: string;
  location?: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  outcome?: string;
  link?: {
    url: string;
    text: string;
    buttonStyle?: boolean;
  };
  video?: string;
  images?: string | string[];
}

const events: TimelineEvent[] = [
  {
    period: 'Summer 2023',
    title: 'NSF Innovators Program',
    location: 'Aalborg University, Denmark',
    description: 'Researched solar panel degradation and fault detection. Identified the need for a hardware system to collect real-time data.',
    icon: <Rocket className="h-5 w-5" />,
    color: 'emerald',
    outcome: 'Research foundation established',
    link: {
      url: 'https://www.notion.so/touradam/NSF-Innovator-Internship-Program-in-Denmark-44d1690c5606455f9bca0f66dd9a8cc1',
      text: 'Read about the NSF Program experience'
    },
    images: '/meetingAalborg.png'
  },
  {
    period: 'Fall 2023',
    title: 'Partnership & First Design',
    description: 'Adama returned to the U.S. and partnered with Jordan Harris-Toovy. Jordan sketched the first design and began building Prototype 1.',
    icon: <Users className="h-5 w-5" />,
    color: 'cyan',
    outcome: 'Team formed, hardware design initiated'
  },
  {
    period: 'Winter 2024',
    title: 'Prototype 1 Built',
    description: 'Built Prototype 1 (PCB + Arduino Nano) with basic multimeter-like readings. Determined it was insufficient for meaningful analysis.',
    icon: <Cpu className="h-5 w-5" />,
    color: 'cyan',
    outcome: 'First working prototype, identified limitations',
    images: '/firstPrototype.png'
  },
  {
    period: 'Spring 2024',
    title: 'Catalyze Klamath',
    description: 'Pitched at Catalyze Klamath Challenge using Prototype 1. Selected for the InventOR Prototyping Competition.',
    icon: <Award className="h-5 w-5" />,
    color: 'emerald',
    outcome: 'Market validation and resources secured',
    images: '/catalyzeKlamathPresentation.jpg'
  },
  {
    period: 'Spring 2024',
    title: 'Prototype 2: Enhanced PCB Design',
    description: 'Developed second-generation PCB with improved sensor integration and data collection capabilities. This iteration enhanced voltage and current monitoring, laying the groundwork for machine learning data acquisition.',
    icon: <Cpu className="h-5 w-5" />,
    color: 'cyan',
    outcome: 'Improved hardware foundation for ML training',
    images: '/secondPrototype.png'
  },
  {
    period: 'Summer 2024',
    title: 'OIT IdeaFest Demo',
    description: 'Built cardboard shading model to demonstrate fault detection. Exhibited at OIT IdeaFest—first public hands-on testing.',
    icon: <Lightbulb className="h-5 w-5" />,
    color: 'cyan',
    outcome: 'Educational demonstrations validated concept',
    images: ['/ideaFestDemo.png', '/ideaFestDemo1.png']
  },
  {
    period: 'Summer 2024',
    title: 'InventOR 2024 Award Winner',
    description: 'Pitched at InventOR focusing on second-life solar reuse. Received the Visionary Award—a pivotal moment for Solar Sense. InventOR has been supporting Solar Sense throughout its journey by providing connections to resources, mentorship, and opportunities that have been instrumental in our growth.',
    icon: <Award className="h-5 w-5" />,
    color: 'purple',
    outcome: 'Visionary Award winner and ongoing partnership',
    link: {
      url: 'https://www.oit.edu/news/oregon-tech-engineering-students-win-visionary-award-statewide-invention-competition',
      text: 'Read about our Visionary Award'
    },
    video: 'https://www.youtube.com/embed/JyNVlf8DTV4?start=75',
    images: ['/inventORwinners.png', '/inventOrDemo.png']
  },
  {
    period: 'Summer 2024',
    title: 'Strategic Pivot',
    description: 'Realized landfill-prevention business case was not strong enough. Pivoted to provide a device for the utility PV industry to detect and locate panel faults—addressing a critical gap in solar operations.',
    icon: <Repeat className="h-5 w-5" />,
    color: 'emerald',
    outcome: 'New market direction identified with clear value proposition'
  },
  {
    period: 'Fall 2024',
    title: 'American-Made Solar Prize',
    description: 'Identified critical market gap: utility PV operators lack affordable tools for panel-level fault detection. Applied to American-Made Solar Prize Round 8 with this new solution.',
    icon: <Target className="h-5 w-5" />,
    color: 'cyan',
    outcome: 'Clear problem definition and validation',
    video: 'https://www.youtube.com/embed/f8RI_KhIVBY',
    images: '/americanMadeSolar.png'
  },
  {
    period: 'Fall 2024',
    title: 'Prototype 3: Solar Sense',
    description: 'Built Prototype 3 featuring real-time fault localization capabilities. This working prototype demonstrated panel-level monitoring with ML-powered fault detection—a complete solution integrating hardware sensors with intelligent software analytics.',
    icon: <Cpu className="h-5 w-5" />,
    color: 'purple',
    outcome: 'First production-ready prototype with commercial viability',
    images: '/solarSenseOnPV.png'
  },
  {
    period: 'Fall 2024',
    title: 'VertueLab 45Camp',
    description: 'Participated in VertueLab 45Camp accelerator program to refine business model and develop go-to-market strategy.',
    icon: <Rocket className="h-5 w-5" />,
    color: 'purple',
    outcome: 'Enhanced entrepreneurial skills and network',
    images: '/VertueLab.png'
  },
  {
    period: 'Fall 2024',
    title: 'Market Research',
    description: 'Conducted market research: utility PV reluctant to add system costs. Expanded research to commercial PV. Learned commercial systems need low-cost, code-compliant, single-device solutions.',
    icon: <TrendingUp className="h-5 w-5" />,
    color: 'emerald',
    outcome: 'Product-market fit identified in commercial PV'
  },
  {
    period: 'Winter 2025',
    title: 'TiE XL Bootcamp',
    description: 'Prepared next pitch addressing multi-device burden. Continued refining hardware and software. Completed TiE XL Bootcamp—learned about startup ecosystem, due diligence, investor relations.',
    icon: <Cpu className="h-5 w-5" />,
    color: 'cyan',
    outcome: 'Business acumen strengthened, systems refined',
    images: '/tieOregon.png'
  },
  {
    period: 'Winter 2025',
    title: 'Prototype 4: In-House Manufacturing',
    description: 'Developed in-house manufacturing capabilities, enabling production of professional-grade PCBs from Jordan\'s home lab. Fourth-generation design features Solar Sense branding, advanced component integration, and optimized sensor architecture—demonstrating our ability to manufacture commercial-quality hardware independently.',
    icon: <Cpu className="h-5 w-5" />,
    color: 'purple',
    outcome: 'Manufacturing capability established, commercial-quality production achieved',
    images: '/solarSenseTech.png'
  },
  {
    period: 'Summer 2025',
    title: 'OEN Angel Oregon',
    description: 'Participated in the AOBIO Capital Readiness program—a transformative experience that taught us the essential vocabulary of entrepreneurship and how to avoid costly mistakes as new founders. Through mentorship, cohort discussions, and structured guidance, we clarified our problem, value proposition, and growth path.',
    icon: <Rocket className="h-5 w-5" />,
    color: 'purple',
    outcome: 'Capital readiness achieved, entrepreneurial foundation strengthened',
    images: '/oen.jpg'
  },
  {
    period: 'Summer 2025',
    title: 'Software Dashboard Prototype',
    description: 'Built first prototype of software dashboard to visualize real-time panel data and fault detection. Transformed hardware solution into a complete monitoring system for solar operators.',
    icon: <Cpu className="h-5 w-5" />,
    color: 'cyan',
    outcome: 'Complete hardware-software solution achieved',
    images: '/dashboardPrototype.png'
  },
  {
    period: 'Fall 2025',
    title: 'Janus Innovation Hub',
    description: 'Janus Innovation Hub is a startup accelerator that empowers immigrant-led ventures through mentorship, resources, and connections to transform innovative ideas into impactful, investment-ready businesses. The Janus program aims to set Solar Sense on the right path toward becoming a sustainable enterprise, achieving its mission of making solar smart and safe.',
    icon: <TrendingUp className="h-5 w-5" />,
    color: 'emerald',
    outcome: 'Positioned for commercial deployment',
    images: '/janus.png'
  },
  {
    period: 'Winter 2025-2026',
    title: 'Plug and Play 2025 Summit',
    description: 'Selected to participate in the prestigious Plug and Play Tech Center Summit—one of the world\'s largest innovation platforms connecting startups with corporate partners. This opportunity positions Solar Sense to engage with global energy leaders, explore strategic partnerships, and scale our solar monitoring technology into enterprise markets.',
    icon: <Rocket className="h-5 w-5" />,
    color: 'purple',
    outcome: 'Global network expansion and corporate partnership opportunities'
  },
];

const colorClasses = {
  emerald: {
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    border: 'border-emerald-500 dark:border-emerald-400',
    text: 'text-emerald-600 dark:text-emerald-400',
    icon: 'bg-emerald-500 dark:bg-emerald-600',
  },
  cyan: {
    bg: 'bg-cyan-100 dark:bg-cyan-900/30',
    border: 'border-cyan-500 dark:border-cyan-400',
    text: 'text-cyan-600 dark:text-cyan-400',
    icon: 'bg-cyan-500 dark:bg-cyan-600',
  },
  purple: {
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    border: 'border-emerald-500 dark:border-emerald-400',
    text: 'text-emerald-600 dark:text-emerald-400',
    icon: 'bg-emerald-500 dark:bg-emerald-600',
  },
};

export function Timeline() {
  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Vertical Line */}
      <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-cyan-500 to-emerald-500 transform sm:-translate-x-1/2" />

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

                  {/* Images */}
                  {event.images && (
                    <div className="mb-4">
                      {Array.isArray(event.images) ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {event.images.map((img, idx) => (
                            <div key={idx} className="relative w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                              <Image
                                src={withBasePath(img)}
                                alt={`${event.title} ${idx + 1}`}
                                width={800}
                                height={600}
                                className="w-full h-auto object-contain"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="relative w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                          <Image
                            src={withBasePath(event.images)}
                            alt={event.title}
                            width={1200}
                            height={800}
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Outcome */}
                  {event.outcome && (
                    <div className={`pt-3 border-t ${colors.border} border-opacity-30`}>
                      <p className={`text-sm font-medium ${colors.text}`}>
                        ✓ {event.outcome}
                      </p>
                    </div>
                  )}

                  {/* Video */}
                  {event.video && (
                    <div className="mt-4">
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <iframe
                          src={event.video}
                          title="Solar Sense Video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        />
                      </div>
                    </div>
                  )}

                  {/* Link */}
                  {event.link && (
                    <div className="mt-4">
                      {event.link.buttonStyle ? (
                        <Link href={event.link.url}>
                          <button className="w-full sm:w-auto px-6 py-3 rounded-lg font-bold text-gray-900 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                            {event.link.text}
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        </Link>
                      ) : (
                        <a
                          href={event.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 text-sm font-medium ${colors.text} hover:underline`}
                        >
                          {event.link.text}
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
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

