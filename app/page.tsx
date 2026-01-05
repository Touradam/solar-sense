'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { withBasePath } from '@/lib/utils';

export default function RebrandingLandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-emerald-950 to-cyan-950 relative overflow-hidden">
      {/* Animated Background Stars/Sparkles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* New Year Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-900 font-bold text-sm mb-8 shadow-2xl animate-bounce">
            <Sparkles className="w-4 h-4" />
            New Year, New Vision — 2026
            <Sparkles className="w-4 h-4" />
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight">
            Welcome to the Future
          </h1>
          
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12">
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Solar Sense
            </span>
          </div>

          {/* Transformation Visual */}
          <div className="relative max-w-5xl mx-auto mb-12">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              
              {/* SEPT Logo */}
              <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300">
                  <div className="aspect-square flex items-center justify-center mb-4">
                    <Image
                      src={withBasePath("/SEPT_logo_Transparent.png")}
                      alt="SEPT Logo"
                      width={150}
                      height={150}
                      className="object-contain opacity-60 grayscale"
                    />
                  </div>
                  <p className="text-white/60 font-semibold text-lg">SEPT</p>
                  <p className="text-white/40 text-sm">2023-2024</p>
                </div>
              </div>

              {/* Arrow with sparkles */}
              <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <div className="hidden md:block w-20 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
                  <div className="relative">
                    <Sparkles className="w-12 h-12 text-yellow-400 animate-spin" style={{animationDuration: '3s'}} />
                    <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
                  </div>
                  <div className="hidden md:block w-20 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"></div>
                  
                  <div className="md:hidden w-1 h-12 bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-full"></div>
                </div>
              </div>

              {/* Solar Sense Logo */}
              <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-300 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-2 border-yellow-500/50 rounded-3xl p-8 hover:border-yellow-400 transition-all duration-300">
                    <div className="aspect-square flex items-center justify-center mb-4">
                      <Image
                        src={withBasePath("/SolarSense_Logo.png")}
                        alt="Solar Sense Logo"
                        width={150}
                        height={150}
                        className="object-contain"
                      />
                    </div>
                    <p className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent font-bold text-xl">
                      Solar Sense
                    </p>
                    <p className="text-yellow-400 font-bold text-sm">2025 & Beyond</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className={`transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed mb-4">
                As we step into <span className="font-bold text-yellow-400">2026</span>, we embrace a new identity that better reflects our mission:
              </p>
              <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Making Solar Energy Safer, Smarter & More Sustainable
              </p>
            </div>

            {/* Key Points */}
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-white/5 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-6 hover:bg-white/10 hover:border-emerald-400/50 transition-all duration-300">
                <div className="text-3xl mb-3">✓</div>
                <p className="text-white font-semibold mb-2">Same Founders</p>
                <p className="text-white/60 text-sm">Adama & Jordan</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300">
                <div className="text-3xl mb-3">✓</div>
                <p className="text-white font-semibold mb-2">Same Innovation</p>
                <p className="text-white/60 text-sm">Proven Technology</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-6 hover:bg-white/10 hover:border-yellow-400/50 transition-all duration-300">
                <div className="text-3xl mb-3">✓</div>
                <p className="text-white font-semibold mb-2">Sharper Focus</p>
                <p className="text-white/60 text-sm">Clear Mission</p>
              </div>
            </div>

            {/* CTA */}
            <Link href="/home">
              <Button 
                size="lg" 
                className="px-12 py-8 text-xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-gray-900 shadow-2xl hover:shadow-yellow-500/50 transition-all transform hover:scale-105 rounded-full"
              >
                Discover Solar Sense
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </Link>
          </div>

          {/* Footer Note */}
          <div className={`mt-16 transition-all duration-1000 delay-1100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-white/40 text-sm">
              Celebrating a New Chapter | Est. 2023 | Portland, Oregon
            </p>
          </div>
        </div>
      </div>

      {/* Firework-style decoration */}
      <div className="absolute top-10 right-10 w-32 h-32">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-1 h-8 bg-gradient-to-t from-yellow-400 to-transparent origin-bottom"
            style={{
              transform: `rotate(${i * 30}deg)`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>
      
      <div className="absolute bottom-10 left-10 w-32 h-32">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-1 h-8 bg-gradient-to-t from-cyan-400 to-transparent origin-bottom"
            style={{
              transform: `rotate(${i * 30}deg)`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>
    </div>
  );
}
