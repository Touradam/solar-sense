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
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Left: Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <div className="relative h-14 w-14 transition-transform group-hover:scale-110">
        <Image
                  src="/SEPT_logo_Transparent.png"
                  alt="SEPT Logo"
                  fill
                  className="object-contain"
          priority
        />
              </div>
            </Link>

            {/* Center: Tagline (takes up most space) */}
            <div className="flex-1 text-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                We Make Solar Smart and Safe
              </h1>
            </div>

            {/* Right: Navigation */}
            <nav className="hidden md:flex items-center gap-6 flex-shrink-0">
              <Link href="#product" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap">
                Product
              </Link>
              <Link href="#team" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap">
                Team
              </Link>
              <Link href="#contact" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap">
                Contact
              </Link>
              <Link href="/builder">
                <Button variant="outline" size="sm" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 whitespace-nowrap">
                  Builder
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 flex-shrink-0">
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
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
              {/* Team Photo */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
                <div className="relative aspect-[3/4]">
                  <Image
                    src="/adamaJordan.jpg"
                    alt="Adama Toure and Jordan Harris-Toovy - SEPT Co-Founders"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-white font-semibold text-lg">SEPT Co-Founders</p>
                  <p className="text-gray-200 text-sm">Adama Toure & Jordan Harris-Toovy</p>
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

      {/* Value Propositions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Solar Sense?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The all-in-one solution that empowers solar system owners, operators, and installers with compliance, intelligence, and peace of mind.
            </p>
          </div>

          {/* Value Props Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 1. Enhanced Safety */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Enhanced Safety
                </h3>
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-4">
                  ⚡ Rapid Shutdown Compliance
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Disconnects panels in a fraction of a second, ensuring NEC 690.12 compliance and protecting first responders during emergencies.
                </p>
              </div>
            </div>

            {/* 2. Smart Monitoring */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center mb-6">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Smart Monitoring
                </h3>
                <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 mb-4">
                  🔍 AI-Powered Fault Detection
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Built-in sensors and machine learning continuously monitor voltage, current, and temperature to detect shading, hotspots, and degradation before damage occurs.
                </p>
              </div>
            </div>

            {/* 3. Full Compliance */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Full Compliance
                </h3>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">
                  ✅ Meets Regulatory Standards
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Mandatory in 12+ countries including the United States. Solar Sense ensures your installation meets all safety requirements.
                </p>
              </div>
            </div>

            {/* 4. Cost-Effective */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Cost-Effective
                </h3>
                <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-4">
                  💰 All-in-One Solution
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Reduces costs compared to using separate monitoring and shutdown systems. Simple installation with wireless data transmission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section id="product" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 mb-6">
              <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Introducing Solar Sense
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              One Device. Complete Protection.
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Solar Sense is a low-cost, wireless device that ensures compliance with the latest NEC Rapid Shutdown requirements 
              while enabling precise fault detection and performance monitoring at the panel level.
            </p>
          </div>

          {/* Main Product Display */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Product Image/Visualization */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800 p-12 flex items-center justify-center">
                <div className="text-center space-y-6">
                  {/* Solar Sense Product Image */}
                  <div className="relative w-full mx-auto aspect-square">
                    <Image
                      src="/solarSenseOnPV.png"
                      alt="Solar Sense on Solar Panel"
                      fill
                      className="object-contain rounded-2xl"
                      priority
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">Solar Sense</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Module-Level Power Electronics (MLPE)</div>
                  </div>
                  {/* Status Indicators */}
                  <div className="flex items-center justify-center gap-4 pt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Monitoring</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" style={{animationDelay: '1s'}}></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Protected</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating Feature Badges */}
              <div className="absolute -top-4 -left-4 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Plug & Play</div>
              </div>
              <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Wireless</div>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Key Features
              </h3>

              {/* Feature 1: Rapid Shutdown */}
              <div className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      ⚡ Rapid Shutdown
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Disconnects its host panel in a fraction of a second, ensuring NEC compliance and protecting first responders during emergencies.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2: Health Monitoring */}
              <div className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      🔍 Health Monitoring
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Built-in sensors continuously collect voltage, current, and temperature data to evaluate the health of the solar cell and detect early-stage degradation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3: Real-Time Monitoring */}
              <div className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      📱 Real-Time Monitoring and Alerts
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      An intuitive mobile or web app displays real-time performance for each panel and sends automatic notifications when issues arise — enabling quick, informed maintenance decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* USP Statement */}
          <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center">
            <p className="text-xl lg:text-2xl font-semibold">
              Unlike other systems that require multiple devices or complex wiring, Solar Sense combines everything into a single, smart, plug-and-play module suitable for both <span className="underline decoration-2 underline-offset-4">residential and commercial</span> solar installations.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              How Solar Sense Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Solar Sense is a self-powered, module-level power electronic (MLPE) device composed of two main systems that work together to ensure both safety and intelligence.
            </p>
          </div>

          {/* Main Systems */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* System 1: Rapid Shutdown */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                <div className="space-y-6">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">System 1</div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Rapid Shutdown Mode</h3>
                    </div>
                  </div>

                  {/* Ecosystem Diagram */}
                  <div className="relative w-full h-48 my-4">
                    <Image
                      src="/sept-ecosystem.svg"
                      alt="SEPT Ecosystem - Rapid Shutdown"
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    The rapid shutdown mode is the safety heart of Solar Sense, designed to protect first responders and property during emergencies.
                  </p>

                  {/* Features List */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Emergency Response</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Responds to emergency commands instantly</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Auto-Detection</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Automatically detects hazardous conditions</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Instant Shutdown</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Disconnects panels within seconds to stop power flow</div>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 text-sm font-medium">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                      NEC 690.12 Compliant
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* System 2: Digital Twin ML */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                <div className="space-y-6">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">System 2</div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Digital Twin ML Based Monitoring</h3>
                    </div>
                  </div>

                  {/* ML Fault Detection Diagram */}
                  <div className="relative w-full h-48 my-4">
                    <Image
                      src="/pv-ml-fault-detection.png"
                      alt="ML Based Fault Detection"
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    The digital twin machine learning module is the intelligence core, continuously monitoring and analyzing panel performance to predict and prevent issues.
                  </p>

                  {/* Features List */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Continuous Monitoring</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Monitors electrical and thermal data 24/7</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Digital Twin</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Creates a physics-informed model of each solar cell</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Early Detection</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Detects shading, soiling, and degradation before damage</div>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      AI-Powered Intelligence
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Process Flow */}
          <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              The Complete Process
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Data Collection</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sensors collect voltage, current, and temperature from each panel
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">AI Analysis</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Machine learning models analyze data patterns and predict issues
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Alert & Monitor</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Real-time alerts sent to mobile app for immediate action
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Auto Protect</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Automatic shutdown triggered during emergencies or hazards
                </p>
              </div>
            </div>
          </div>

          {/* Conclusion Statement */}
          <div className="mt-16 text-center">
            <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800">
              <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                The Result
              </p>
              <p className="text-gray-700 dark:text-gray-300 max-w-3xl">
                By combining these functions, Solar Sense transforms traditional solar panels into intelligent, 
                self-aware energy units capable of ensuring both compliance and reliability — making solar energy truly resilient and future-proof.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Goals Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Mission Statement */}
            <div className="p-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm font-medium">Our Mission</span>
              </div>
              <h3 className="text-3xl font-bold mb-6">
                Making Solar Systems Safer, Smarter, and More Sustainable
              </h3>
              <p className="text-lg leading-relaxed opacity-95">
                "To make solar energy systems safer, smarter, and more sustainable through intelligent sensing and machine learning, ensuring every solar panel operates at peak efficiency while protecting people, property, and the planet."
              </p>
            </div>

            {/* Goals */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Our Goals
              </h3>

              {/* Goal 1 */}
              <div className="flex items-start gap-4 p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Make Solar Safer
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Ensure every solar installation meets rapid shutdown safety standards to protect people and property.
                  </p>
                </div>
              </div>

              {/* Goal 2 */}
              <div className="flex items-start gap-4 p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Make Solar Smarter
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Integrate real-time monitoring and ML-based diagnostics to detect shading, hotspots, and degradation before performance loss occurs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Two engineers on a mission to revolutionize solar energy through intelligent technology and innovation.
            </p>
          </div>

          {/* Team Members */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Adama Toure */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                <div className="space-y-6">
                  {/* Avatar */}
                  <div className="relative w-24 h-24 rounded-full mx-auto shadow-lg overflow-hidden">
                    <Image
                      src="/adamaToure.png"
                      alt="Adama Toure"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Adama Toure
                    </h3>
                    <p className="text-emerald-600 dark:text-emerald-400 font-semibold mb-2">
                      Co-Founder, Renewable Energy Engineer
                    </p>
                    <a href="mailto:adama.toure@sept.energy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                      adama.toure@sept.energy
                    </a>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                    Adama is a Renewable Energy Engineer and participant in the NSF 2023 Innovator Program. He conducted research at Aalborg University focused on PV degradation and fault detection in used solar panels. His work led to the development of a physics-informed machine learning model that creates a digital twin of a solar cell — the foundation of Solar Sense.
                  </p>

                  {/* Achievements */}
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      NSF 2023 Innovator Program
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Research at Aalborg University
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      ML Model Developer
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Jordan Harris-Toovy */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                <div className="space-y-6">
                  {/* Avatar */}
                  <div className="relative w-24 h-24 rounded-full mx-auto shadow-lg overflow-hidden">
            <Image
                      src="/jordanHarrisToovy.png"
                      alt="Jordan Harris-Toovy"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Jordan Harris-Toovy
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">
                      Co-Founder, Electrical Engineer
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                    Jordan is an Electrical Engineer with expertise in sensor design, PCB layout, electronics manufacturing, and embedded programming. He co-founded SEPT to apply his experience in advanced sensing technologies to the solar industry, driving the creation and refinement of Solar Sense prototypes.
                  </p>

                  {/* Achievements */}
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Sensor Design Expert
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      PCB & Electronics Manufacturing
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Embedded Programming
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact & Vision Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Vision for the Future
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              At SEPT, we believe that the future of solar energy lies in systems that are intelligent, self-aware, and safe by design.
            </p>
          </div>

          {/* Vision Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left: Impact Points */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Enabling a New Generation of Smart Solar
              </h3>

              <div className="space-y-4">
                {[
                  { icon: '🛡️', title: 'Protect lives and property', desc: 'Advanced safety systems that respond in real-time' },
                  { icon: '⚡', title: 'Maximize power output', desc: 'Optimize performance through continuous monitoring' },
                  { icon: '🔄', title: 'Extend asset lifespan', desc: 'Detect issues early to prevent costly damage' },
                  { icon: '♻️', title: 'Prevent premature waste', desc: 'Reduce decommissioning of salvageable panels' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{item.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Vision Statement */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative p-10 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 text-white shadow-2xl">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span className="text-sm font-medium">Our Vision</span>
                  </div>
                  
                  <p className="text-2xl font-bold leading-relaxed">
                    A sustainable solar ecosystem where every panel can monitor, report, and protect itself — making solar energy truly resilient and future-proof.
                  </p>

                  <div className="pt-6 border-t border-white/20">
                    <p className="text-gray-300 leading-relaxed">
                      By merging rapid shutdown compliance with real-time diagnostics, we are enabling smart solar systems that work harder, last longer, and deliver more value to their owners.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Development Status */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Development Progress
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Our team has built and tested four generations of Solar Sense prototypes, guided by continuous feedback from PV system owners, installers, and industry experts.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-gray-800">
                    <div className="text-2xl">✅</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Optimized ML model for fault detection</div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-gray-800">
                    <div className="text-2xl">✅</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">4 prototype generations tested</div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-gray-800">
                    <div className="text-2xl">🏆</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">InventOR 2024 Recognition</div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-gray-800">
                    <div className="text-2xl">🚀</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Pilot project in preparation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-black dark:to-gray-950 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Make Your Solar Installation Smarter?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Whether you're a solar developer, researcher, installer, or potential partner, we'd love to hear from you and explore collaboration opportunities.
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Email */}
            <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6 mx-auto">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-center">Email Us</h3>
              <a href="mailto:support@SEPT.energy" className="text-emerald-400 hover:text-emerald-300 text-center block">
                support@SEPT.energy
              </a>
            </div>

            {/* Location */}
            <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-6 mx-auto">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-center">Location</h3>
              <p className="text-gray-300 text-center">Portland, Oregon, USA</p>
            </div>

            {/* Try Builder */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-all shadow-xl">
              <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 mx-auto">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-center">Try Our Tool</h3>
              <p className="text-white/90 text-center mb-4 text-sm">Build and train your own Neural Network</p>
              <Link href="/builder">
                <Button className="w-full bg-white text-emerald-600 hover:bg-gray-100">
                  Launch Builder
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <p className="text-gray-400 mb-6">Follow Us</p>
            <div className="flex items-center justify-center gap-6">
              <a href="https://www.linkedin.com/company/104113925" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://youtu.be/f8RI_KhIVBY?si=OVbqA7dKxULqUda7" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black dark:bg-gray-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative h-14 w-14">
                  <Image
                    src="/SEPT_logo_Transparent.png"
                    alt="SEPT Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  We Make Solar Smart and Safe
                </span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Solar Energy Protection Technology - Empowering safer and smarter solar systems through intelligent sensing and machine learning.
              </p>
              <p className="text-sm text-gray-500">
                © 2025 SEPT. All rights reserved.
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#product" className="hover:text-emerald-400 transition-colors">Solar Sense</a></li>
                <li><a href="/builder" className="hover:text-emerald-400 transition-colors">Neural Network Builder</a></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
                <li><a href="#team" className="hover:text-emerald-400 transition-colors">Team</a></li>
                <li><a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            <p>Designed and Built in Portland, Oregon</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

