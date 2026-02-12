'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, Shield, Sparkles, ChevronDown } from 'lucide-react';
import { withBasePath } from '@/lib/utils';
import { Timeline } from '@/components/journey/Timeline';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-cyan-50/30 dark:from-gray-950 dark:via-emerald-950/10 dark:to-cyan-950/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg dark:bg-gray-950/80 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex h-14 items-center justify-between gap-2 sm:gap-4">
            {/* Left: Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <Image
                src={withBasePath("/SolarSense_Logo.png")}
                alt="Solar Sense Logo"
                width={100}
                height={33}
                className="h-8 sm:h-10 w-auto transition-transform group-hover:scale-105"
                priority
              />
            </Link>

            {/* Center: Tagline */}
            <div className="flex-1 text-center hidden md:block px-2">
              <h1 className="text-sm md:text-base lg:text-lg font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent truncate">
                Making Solar Smart and Safe
              </h1>
            </div>

            {/* Right: Explore Button */}
            <div className="flex-shrink-0">
              <Link
                href="/home"
                className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 h-10 sm:h-11 rounded-lg text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 shadow-md hover:shadow-lg transition-all touch-manipulation"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Explore Technology</span>
                <span className="sm:hidden">Explore</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-900 font-bold text-sm shadow-lg">
                <Sparkles className="w-4 h-4" />
                Research-Grade Solar Monitoring
              </div>

              {/* Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Making Solar Energy{' '}
                  <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                    Safer & Smarter
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  Turn each solar panel into a live digital twin with real-time monitoring, ML-based fault detection, and rapid shutdown compliance
                </p>
              </div>

              {/* Key Features */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">Rapid Shutdown</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">NEC compliant safety</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">AI Fault Detection</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Real-time analytics</p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/home" className="flex-1">
                  <Button size="lg" className="w-full px-8 py-6 text-lg bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-gray-900 font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.02]">
                    Explore Our Technology
                    <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>
                </Link>
                <Link href="#timeline" className="flex-1">
                  <Button size="lg" variant="outline" className="w-full px-8 py-6 text-lg font-bold border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all">
                    View Our Journey
                    <ChevronDown className="ml-2 w-6 h-6" />
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">4</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Prototypes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">12+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Milestones</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">2026</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Live Pilots</div>
                </div>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
              {/* Product Image */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-emerald-100 to-cyan-100 dark:from-emerald-950/30 dark:to-cyan-950/30">
                  <Image
                    src={withBasePath("/pilotproject1.png")}
                    alt="Solar Sense Pilot Project - 4-Panel Validation Array"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                  <p className="text-white font-bold text-lg">Jordan preparing the electric cabinet for pilot project</p>
                  <p className="text-gray-200 text-sm">Real-time ML-Based Fault Detection</p>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-2xl border-4 border-white dark:border-gray-950 z-20">
                <div className="text-lg font-bold">Pilot Project</div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Our Journey</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              From Research Lab to Market
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Follow our path from an NSF research program in Denmark to building a research-grade diagnostics platform. 
              Through <strong>4 prototypes</strong> and <strong>7 startup programs</strong>, 
              we've discovered what the solar industry really needs.
            </p>
          </div>

          {/* Timeline Component */}
          <Timeline />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-900 via-cyan-900 to-cyan-900 dark:from-emerald-950 dark:via-cyan-950 dark:to-cyan-950 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Ready to Make Solar Smarter?
            </h2>
            <p className="text-lg sm:text-xl text-emerald-100 max-w-2xl mx-auto">
              Explore our complete technology platform, team, and vision for the future of solar energy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/home">
                <Button size="lg" className="px-10 py-6 text-lg bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-gray-900 font-bold shadow-2xl hover:shadow-amber-500/50 transition-all transform hover:scale-105">
                  Explore Full Technology
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>© 2026 Solar Sense LLC. Building the future of solar energy protection.</p>
            <p className="mt-2 space-x-4">
              <Link href="/home" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                Full Technology
              </Link>
              <span>•</span>
              <a href="mailto:support@solarsense.energy" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                Contact Us
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
