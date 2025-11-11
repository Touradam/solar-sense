'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Brain, Zap, DollarSign } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-10 w-10 transition-transform group-hover:scale-110">
                <Image
                  src="/SEPT_logo_Transparent.png"
                  alt="SEPT Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                SEPT
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#product" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Product
              </Link>
              <Link href="#how-it-works" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                How It Works
              </Link>
              <Link href="#team" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Team
              </Link>
              <Link href="#contact" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Contact
              </Link>
              <Link href="/builder">
                <Button variant="outline" size="sm" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950">
                  Neural Network Builder
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800">
                <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  NEC 690.12 Compliant
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Making Solar Energy{' '}
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Safer, Smarter
                  </span>
                  {' '}& More Sustainable
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  SEPT delivers intelligent rapid shutdown compliance and real-time fault detection through{' '}
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Solar Sense</span>{' '}
                  — the all-in-one device that protects solar systems while maximizing performance.
                </p>
              </div>

              {/* Problem Statement */}
              <div className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                  The Challenge
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Firefighters and regulators in <span className="font-semibold">12+ countries</span> require Rapid Shutdown for solar systems. 
                  Yet solar owners struggle to stay both compliant and efficient — existing solutions force a difficult choice between safety and performance monitoring.
                </p>
              </div>

              {/* Solution Statement */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800 shadow-lg">
                <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide mb-3">
                  Our Solution
                </h3>
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                  Solar Sense bridges this gap with an intelligent device that collects real-time data from each solar panel 
                  and applies <span className="font-semibold">machine learning</span> to detect faults such as shading, hotspots, and degradation.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#product">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all">
                    Explore Solar Sense
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/builder">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900">
                    Try Neural Network Builder
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-800">
                <div>
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">12+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Countries</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">4th</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Generation</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">100%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Compliant</div>
                </div>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
              {/* Main Feature Card */}
              <div className="relative z-10 p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-800">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Solar Sense</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">All-in-One Smart Device</p>
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900">
                      <Shield className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mb-2" />
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">Enhanced Safety</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Rapid Shutdown</div>
                    </div>
                    <div className="p-4 rounded-lg bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900">
                      <Brain className="w-8 h-8 text-teal-600 dark:text-teal-400 mb-2" />
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">AI Detection</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Real-time Faults</div>
                    </div>
                    <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900">
                      <svg className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">Full Compliance</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">NEC Certified</div>
                    </div>
                    <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900">
                      <DollarSign className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">Cost-Effective</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Single Device</div>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">System Active</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Real-time Monitoring</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-teal-400 to-blue-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Indicator */}
      <div className="flex justify-center pb-12">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Placeholder sections (to be built in next phases) */}
      <section id="product" className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Product Section</h2>
          <p className="text-gray-600 dark:text-gray-400">Coming in Phase 2</p>
        </div>
      </section>

      <section id="how-it-works" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
          <p className="text-gray-600 dark:text-gray-400">Coming in Phase 3</p>
        </div>
      </section>

      <section id="team" className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Team Section</h2>
          <p className="text-gray-600 dark:text-gray-400">Coming in Phase 4</p>
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact Section</h2>
          <p className="text-gray-600 dark:text-gray-400">Coming in Phase 5</p>
        </div>
      </section>
    </div>
  );
}

