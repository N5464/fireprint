import React, { useEffect, useState } from 'react';
import { FPLogo } from './FPLogo';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const loadingPhases = [
    "INITIALIZING FIREPRINT SYSTEMS...",
    "ESTABLISHING SECURE CONNECTION...",
    "LOADING TACTICAL MODULES...",
    "VERIFYING BLACKSITE ACCESS...",
    "DEPLOYMENT READY"
  ];

  useEffect(() => {
    const duration = 1800; // Reduced from 3000ms to 1800ms (1.8 seconds)
    const interval = 40; // Reduced from 50ms to 40ms for smoother animation
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        
        // Update phase based on progress
        const phaseIndex = Math.floor((newProgress / 100) * (loadingPhases.length - 1));
        setCurrentPhase(Math.min(phaseIndex, loadingPhases.length - 1));
        
        if (newProgress >= 100) {
          clearInterval(timer);
          // Start exit animation - reduced delay
          setTimeout(() => {
            setIsExiting(true);
            // Complete loading after exit animation - reduced duration
            setTimeout(() => {
              onLoadingComplete();
            }, 500); // Reduced from 800ms to 500ms
          }, 200); // Reduced from 500ms to 200ms
          return 100;
        }
        
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-all duration-500 ${
      isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
    }`}>
      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          animation: 'grid-scan 1.5s linear infinite'
        }} />
      </div>

      {/* Scanning Lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-60 animate-scan-vertical" />
        <div className="absolute h-full w-0.5 bg-gradient-to-b from-transparent via-green-500 to-transparent opacity-40 animate-scan-horizontal" />
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center">
        {/* FP Logo with Military Effects */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 animate-ping">
            <FPLogo size="xl" className="opacity-20" />
          </div>
          <div className="relative">
            <FPLogo size="xl" className="animate-pulse" />
          </div>
          
          {/* Tactical Crosshairs */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border border-green-500/30 rounded-full animate-spin-slow">
              <div className="absolute top-0 left-1/2 w-0.5 h-4 bg-green-500/50 transform -translate-x-0.5" />
              <div className="absolute bottom-0 left-1/2 w-0.5 h-4 bg-green-500/50 transform -translate-x-0.5" />
              <div className="absolute left-0 top-1/2 h-0.5 w-4 bg-green-500/50 transform -translate-y-0.5" />
              <div className="absolute right-0 top-1/2 h-0.5 w-4 bg-green-500/50 transform -translate-y-0.5" />
            </div>
          </div>
        </div>

        {/* Loading Progress */}
        <div className="w-80 max-w-sm mx-auto mb-6">
          {/* Progress Bar Container */}
          <div className="relative h-2 bg-gray-800 border border-green-500/30 overflow-hidden">
            {/* Progress Fill */}
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-600 via-green-500 to-green-400 transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            >
              {/* Scanning Effect */}
              <div className="absolute right-0 top-0 w-4 h-full bg-gradient-to-r from-transparent to-white/30 animate-pulse" />
            </div>
            
            {/* Progress Segments */}
            <div className="absolute inset-0 flex">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="flex-1 border-r border-black/50 last:border-r-0" />
              ))}
            </div>
          </div>
          
          {/* Progress Percentage */}
          <div className="flex justify-between items-center mt-2 text-xs">
            <span className="hacker-mono text-green-500">{Math.floor(progress)}%</span>
            <span className="hacker-mono text-green-400">LOADING</span>
          </div>
        </div>

        {/* Loading Phase Text */}
        <div className="mb-4">
          <p className="underground-text text-green-400 text-sm tracking-wider animate-pulse">
            {loadingPhases[currentPhase]}
          </p>
        </div>

        {/* System Status Indicators */}
        <div className="flex justify-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="hacker-mono text-green-500">SECURE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
            <span className="hacker-mono text-green-500">ENCRYPTED</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
            <span className="hacker-mono text-green-500">READY</span>
          </div>
        </div>
      </div>

      {/* Corner UI Elements */}
      <div className="absolute top-4 left-4 text-xs hacker-mono text-green-500/60">
        FIREPRINT v2.1.0
      </div>
      <div className="absolute top-4 right-4 text-xs hacker-mono text-green-500/60">
        BLACKSITE ACTIVE
      </div>
      <div className="absolute bottom-4 left-4 text-xs hacker-mono text-green-500/60">
        NO KYC REQUIRED
      </div>
      <div className="absolute bottom-4 right-4 text-xs hacker-mono text-green-500/60">
        CRYPTO-NATIVE
      </div>

      <style>{`
        @keyframes grid-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        
        @keyframes scan-vertical {
          0% { top: -2px; }
          100% { top: 100%; }
        }
        
        @keyframes scan-horizontal {
          0% { left: -2px; }
          100% { left: 100%; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-scan-vertical {
          animation: scan-vertical 2s linear infinite;
        }
        
        .animate-scan-horizontal {
          animation: scan-horizontal 2.5s linear infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 6s linear infinite;
        }
      `}</style>
    </div>
  );
};