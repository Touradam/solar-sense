'use client';

import React from 'react';
import { Rocket, Target, Users, TrendingUp, Mail } from 'lucide-react';

export function FutureVision() {
  return (
    <div className="bg-gradient-to-br from-emerald-500 to-cyan-600 dark:from-emerald-900 dark:to-cyan-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
            <Rocket className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Looking Forward
          </h2>
          <p className="text-lg sm:text-xl text-white/90">
            From prototypes to production, from insights to impact
          </p>
        </div>

        {/* 2025 Goals */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="h-6 w-6" />
            2025 Vision
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-bold mb-2">First Commercial Deployments</h4>
              <p className="text-sm text-white/80">
                Launch pilot programs with commercial PV operators
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-2">✅</div>
              <h4 className="font-bold mb-2">Validate Integration</h4>
              <p className="text-sm text-white/80">
                Prove monitoring + safety in single device works at scale
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-2">💰</div>
              <h4 className="font-bold mb-2">Secure Seed Funding</h4>
              <p className="text-sm text-white/80">
                Raise capital to accelerate product development
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-2">🤝</div>
              <h4 className="font-bold mb-2">Build Partnerships</h4>
              <p className="text-sm text-white/80">
                Partner with installation companies and O&M providers
              </p>
            </div>
          </div>
        </div>

        {/* Long-term Vision */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            Long-term Impact (3-5 Years)
          </h3>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <p className="text-lg mb-6 leading-relaxed">
              Solar Sense aims to become the <strong>standard for affordable solar panel monitoring in the commercial PV sector</strong>, 
              preventing millions of dollars in premature decommissioning while extending the productive life of solar installations.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold mb-1">⬆️</div>
                <div className="text-sm text-white/80">Extend average panel lifespan</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">♻️</div>
                <div className="text-sm text-white/80">Prevent solar waste</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">💰</div>
                <div className="text-sm text-white/80">Save operators costs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Join Us */}
        <div>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Users className="h-6 w-6" />
            Join Our Journey
          </h3>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <p className="text-lg mb-6">
              We're looking for partners, collaborators, and early adopters to help bring this vision to life.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl mb-2">🏢</div>
                <div className="text-sm font-medium">Commercial PV Operators</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🔧</div>
                <div className="text-sm font-medium">Installation Partners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">💼</div>
                <div className="text-sm font-medium">Investors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🎓</div>
                <div className="text-sm font-medium">Advisors & Mentors</div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="text-center">
              <a
                href="mailto:contact@sept.example.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Mail className="h-5 w-5" />
                Get in Touch
              </a>
              <p className="text-sm text-white/70 mt-4">
                Interested in learning more? Let's talk about how we can work together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

