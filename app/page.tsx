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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Deep Space Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black"></div>
      
      {/* Star Field - Multiple layers for depth */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${2 + Math.random() * 3}s infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Nebula/Galaxy Effects */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1.5s'}}></div>
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[80px] animate-pulse" style={{animationDelay: '3s'}}></div>
      
      {/* Solar glow effect */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes rotate3d {
          0% { transform: perspective(1000px) rotateY(0deg); }
          50% { transform: perspective(1000px) rotateY(180deg); }
          100% { transform: perspective(1000px) rotateY(360deg); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(250, 204, 21, 0.5), 0 0 40px rgba(250, 204, 21, 0.3); }
          50% { box-shadow: 0 0 40px rgba(250, 204, 21, 0.8), 0 0 80px rgba(250, 204, 21, 0.5); }
        }
      `}</style>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* New Year Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-900 font-bold text-sm mb-8 shadow-2xl shadow-yellow-500/50 animate-bounce">
            <Sparkles className="w-4 h-4" />
            New Year, New Vision — 2026
            <Sparkles className="w-4 h-4" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-tight">
            Introducing Our New Identity
          </h1>
          
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Solar Sense
            </span>
          </div>
          
          <p className="text-xl sm:text-2xl text-white/80 mb-12 max-w-3xl mx-auto">
            From <span className="text-gray-300 font-semibold">SEPT</span> to <span className="text-yellow-400 font-bold">Solar Sense</span> — A rebranding that reflects our refined vision
          </p>

          {/* Transformation Visual */}
          <div className="relative max-w-5xl mx-auto mb-12">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              
              {/* SEPT Logo */}
              <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-gray-300 dark:border-gray-700 rounded-3xl p-8 hover:shadow-lg transition-all duration-300">
                  <div className="aspect-square flex items-center justify-center mb-4 bg-white dark:bg-gray-950 rounded-2xl p-4">
                    <Image
                      src={withBasePath("/SEPT_logo_Transparent.png")}
                      alt="SEPT Logo"
                      width={150}
                      height={150}
                      className="object-contain opacity-70 grayscale"
                    />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg">SEPT</p>
                  <p className="text-gray-500 dark:text-gray-500 text-sm">2023-2024</p>
                </div>
              </div>

              {/* Transformation Arrow */}
              <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                  {/* Left line with animation */}
                  <div className="hidden md:block relative w-24 h-2 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-yellow-400/30 blur-lg animate-ping"></div>
                    <div 
                      className="relative w-full h-full rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #9CA3AF, #FCD34D, #F59E0B, #FCD34D)',
                        backgroundSize: '200% auto',
                        animation: 'shimmer 3s linear infinite',
                      }}
                    ></div>
                  </div>
                  
                  {/* Arrow pointing right (desktop) */}
                  <div className="hidden md:block relative">
                    <div className="absolute inset-0 bg-yellow-400/40 rounded-full blur-xl animate-pulse"></div>
                    <ArrowRight className="w-16 h-16 text-yellow-400 relative animate-pulse" style={{filter: 'drop-shadow(0 0 20px rgba(250, 204, 21, 0.8))'}} />
                  </div>
                  
                  {/* Arrow pointing down (mobile) */}
                  <div className="md:hidden relative">
                    <div className="absolute inset-0 bg-yellow-400/40 rounded-full blur-xl animate-pulse"></div>
                    <svg className="w-16 h-16 text-yellow-400 relative animate-pulse" style={{filter: 'drop-shadow(0 0 20px rgba(250, 204, 21, 0.8))'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  
                  {/* Right line with animation */}
                  <div className="hidden md:block relative w-24 h-2 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-yellow-400/30 blur-lg animate-ping"></div>
                    <div 
                      className="relative w-full h-full rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #FCD34D, #F59E0B, #FCD34D, #F59E0B)',
                        backgroundSize: '200% auto',
                        animation: 'shimmer 3s linear infinite',
                      }}
                    ></div>
                  </div>
                  
                  {/* Rebranding Label - Simple */}
                  <div className="absolute -bottom-16 md:-bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <div className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-900 font-bold text-xs shadow-lg">
                      REBRANDING
                    </div>
                  </div>
                </div>
              </div>

              {/* Solar Sense Logo - Clickable */}
              <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <Link href="/home" className="block">
                  <div className="relative group cursor-pointer transform hover:scale-105 transition-all duration-300">
                    {/* Main box - white/gray with inward gold glow */}
                    <div className="relative bg-gradient-to-br from-white to-gray-100 dark:from-gray-100 dark:to-gray-200 border-4 border-yellow-400 rounded-3xl p-8 hover:border-yellow-300 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/50 overflow-hidden">
                      {/* Gold glow radiating INWARD from edges */}
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/40 via-transparent to-amber-500/40 animate-pulse group-hover:from-yellow-500/60 group-hover:to-amber-500/60 transition-all"></div>
                      <div className="absolute inset-0 bg-gradient-to-tl from-yellow-400/30 via-transparent to-amber-400/30 animate-pulse group-hover:from-yellow-400/50 group-hover:to-amber-400/50 transition-all" style={{animationDelay: '0.5s'}}></div>
                      
                      {/* Radial glow from corners inward */}
                      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-radial from-yellow-500/50 to-transparent rounded-full blur-2xl group-hover:from-yellow-500/70 transition-all"></div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-amber-500/50 to-transparent rounded-full blur-2xl group-hover:from-amber-500/70 transition-all"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-radial from-amber-500/50 to-transparent rounded-full blur-2xl group-hover:from-amber-500/70 transition-all"></div>
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-radial from-yellow-500/50 to-transparent rounded-full blur-2xl group-hover:from-yellow-500/70 transition-all"></div>
                      
                      <div className="relative aspect-square flex items-center justify-center mb-4 bg-white rounded-2xl p-4 shadow-inner">
                        <Image
                          src={withBasePath("/SolarSense_Logo.png")}
                          alt="Solar Sense Logo"
                          width={150}
                          height={150}
                          className="object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <p className="relative bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent font-bold text-xl">
                        Solar Sense
                      </p>
                      <p className="relative text-yellow-600 font-bold text-sm">2025 & Beyond</p>
                    </div>
                    
                    {/* NOW Badge with gold glow */}
                    <div className="absolute -top-4 -right-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full blur-lg opacity-75 animate-pulse group-hover:opacity-100 transition-all"></div>
                        <div className="relative bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-900 font-bold text-xs px-4 py-2 rounded-full shadow-2xl group-hover:scale-110 transition-transform">
                          NOW
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
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

      {/* Shooting stars */}
      <div className="absolute top-20 right-20 w-1 h-20 bg-gradient-to-b from-yellow-400 to-transparent opacity-60 animate-pulse" style={{transform: 'rotate(45deg)'}}></div>
      <div className="absolute bottom-32 left-32 w-1 h-16 bg-gradient-to-b from-cyan-400 to-transparent opacity-60 animate-pulse" style={{transform: 'rotate(-30deg)', animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 right-1/3 w-1 h-12 bg-gradient-to-b from-emerald-400 to-transparent opacity-60 animate-pulse" style={{transform: 'rotate(60deg)', animationDelay: '2s'}}></div>
    </div>
  );
}
