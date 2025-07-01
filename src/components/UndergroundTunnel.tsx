import React, { useEffect, useState } from 'react';

interface UndergroundTunnelProps {
  onTunnelComplete: () => void;
}

export const UndergroundTunnel: React.FC<UndergroundTunnelProps> = ({ onTunnelComplete }) => {
  const [phase, setPhase] = useState(0);
  const [tunnelProgress, setTunnelProgress] = useState(0);

  useEffect(() => {
    const phases = [
      { duration: 800, text: "ACCESSING UNDERGROUND NETWORK..." },
      { duration: 1000, text: "DESCENDING INTO BLACKSITE..." },
      { duration: 1200, text: "ENTERING STEALTH CHAMBER..." },
      { duration: 600, text: "WEAPONS CACHE UNLOCKED" }
    ];

    let currentTime = 0;
    let currentPhase = 0;

    const progressInterval = setInterval(() => {
      setTunnelProgress(prev => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onTunnelComplete();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 30);

    const phaseTimer = setInterval(() => {
      currentTime += 100;
      
      let totalTime = 0;
      for (let i = 0; i <= currentPhase && i < phases.length; i++) {
        totalTime += phases[i].duration;
      }

      if (currentTime >= totalTime && currentPhase < phases.length - 1) {
        currentPhase++;
        setPhase(currentPhase);
      }

      if (currentTime >= phases.reduce((sum, p) => sum + p.duration, 0)) {
        clearInterval(phaseTimer);
      }
    }, 100);

    return () => {
      clearInterval(progressInterval);
      clearInterval(phaseTimer);
    };
  }, [onTunnelComplete]);

  const phases = [
    "ACCESSING UNDERGROUND NETWORK...",
    "DESCENDING INTO BLACKSITE...",
    "ENTERING STEALTH CHAMBER...",
    "WEAPONS CACHE UNLOCKED"
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden">
      {/* Tunnel Perspective Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Tunnel Rings */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute border-2 border-green-500/20 rounded-full animate-tunnel-zoom"
            style={{
              width: `${(i + 1) * 80}px`,
              height: `${(i + 1) * 80}px`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: '2s'
            }}
          />
        ))}

        {/* Central Tunnel Light */}
        <div className="absolute w-32 h-32 bg-gradient-radial from-green-500/30 via-green-500/10 to-transparent rounded-full animate-pulse" />
        
        {/* Moving Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-500 rounded-full animate-particle-flow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random()}s`
            }}
          />
        ))}
      </div>

      {/* Tunnel Walls */}
      <div className="absolute inset-0">
        {/* Left Wall */}
        <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-black via-gray-900/50 to-transparent">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }} />
        </div>
        
        {/* Right Wall */}
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-black via-gray-900/50 to-transparent">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* Floor */}
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black via-gray-900/30 to-transparent" />
        
        {/* Ceiling */}
        <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-black via-gray-900/30 to-transparent" />
      </div>

      {/* Scanning Lines */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-60 animate-scan-down" />
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-40 animate-scan-up" />
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Status Text */}
        <div className="mb-8">
          <p className="underground-text text-green-400 text-lg sm:text-xl tracking-wider animate-pulse">
            {phases[phase]}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="w-80 max-w-sm mx-auto mb-8">
          <div className="relative h-2 bg-gray-800 border border-green-500/30 overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-600 via-green-500 to-green-400 transition-all duration-100 ease-out"
              style={{ width: `${tunnelProgress}%` }}
            >
              <div className="absolute right-0 top-0 w-4 h-full bg-gradient-to-r from-transparent to-white/30 animate-pulse" />
            </div>
          </div>
          <div className="flex justify-between items-center mt-2 text-xs">
            <span className="hacker-mono text-green-500">{Math.floor(tunnelProgress)}%</span>
            <span className="hacker-mono text-green-400">DESCENDING</span>
          </div>
        </div>

        {/* Depth Indicator */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="hacker-mono text-green-500">DEPTH: {Math.floor(tunnelProgress * 10)}M</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
            <span className="hacker-mono text-green-500">SECURE</span>
          </div>
        </div>
      </div>

      {/* Corner Status */}
      <div className="absolute top-4 left-4 text-xs hacker-mono text-green-500/60">
        TUNNEL ACCESS GRANTED
      </div>
      <div className="absolute top-4 right-4 text-xs hacker-mono text-green-500/60">
        STEALTH MODE ACTIVE
      </div>
      <div className="absolute bottom-4 left-4 text-xs hacker-mono text-green-500/60">
        UNDERGROUND NETWORK
      </div>
      <div className="absolute bottom-4 right-4 text-xs hacker-mono text-green-500/60">
        BLACKSITE PROTOCOL
      </div>

      <style>{`
        @keyframes tunnel-zoom {
          0% {
            transform: scale(0.1);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes particle-flow {
          0% {
            transform: scale(0) translateZ(0);
            opacity: 1;
          }
          50% {
            transform: scale(1) translateZ(0);
            opacity: 0.8;
          }
          100% {
            transform: scale(0) translateZ(0);
            opacity: 0;
          }
        }

        @keyframes scan-down {
          0% { top: -2px; }
          100% { top: 100%; }
        }

        @keyframes scan-up {
          0% { bottom: -2px; }
          100% { bottom: 100%; }
        }

        .animate-tunnel-zoom {
          animation: tunnel-zoom 2s linear infinite;
        }

        .animate-particle-flow {
          animation: particle-flow 1.5s ease-out infinite;
        }

        .animate-scan-down {
          animation: scan-down 3s linear infinite;
        }

        .animate-scan-up {
          animation: scan-up 3.5s linear infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};