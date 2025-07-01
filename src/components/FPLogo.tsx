import React from 'react';

interface FPLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const FPLogo: React.FC<FPLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hexagonal Badge Background */}
        <defs>
          {/* Noise/Grain Pattern */}
          <filter id="noise">
            <feTurbulence baseFrequency="0.9" numOctaves="4" result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0"/>
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0 .5"/>
            </feComponentTransfer>
            <feComposite operator="over" in2="SourceGraphic"/>
          </filter>
          
          {/* Scanline Pattern */}
          <pattern id="scanlines" patternUnits="userSpaceOnUse" width="100" height="2">
            <rect width="100" height="1" fill="rgba(34, 197, 94, 0.1)"/>
            <rect y="1" width="100" height="1" fill="transparent"/>
          </pattern>
          
          {/* Etched/Glitch Effect */}
          <filter id="etch">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.2"/>
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"/>
          </filter>
        </defs>
        
        {/* Main Hexagon Shape */}
        <polygon
          points="50,5 85,25 85,75 50,95 15,75 15,25"
          fill="#0a0a0a"
          stroke="#22c55e"
          strokeWidth="2"
          filter="url(#etch)"
        />
        
        {/* Inner Hexagon Border */}
        <polygon
          points="50,10 80,27 80,73 50,90 20,73 20,27"
          fill="none"
          stroke="#16a34a"
          strokeWidth="1"
          opacity="0.6"
        />
        
        {/* Noise/Grain Overlay */}
        <polygon
          points="50,5 85,25 85,75 50,95 15,75 15,25"
          fill="url(#scanlines)"
          opacity="0.3"
        />
        
        {/* Corner Notches for Military Look */}
        <rect x="12" y="22" width="6" height="2" fill="#22c55e" opacity="0.8"/>
        <rect x="82" y="22" width="6" height="2" fill="#22c55e" opacity="0.8"/>
        <rect x="12" y="76" width="6" height="2" fill="#22c55e" opacity="0.8"/>
        <rect x="82" y="76" width="6" height="2" fill="#22c55e" opacity="0.8"/>
        
        {/* FP Text - Bold, Blocky, Military Font */}
        <text
          x="50"
          y="58"
          textAnchor="middle"
          className="font-bold"
          style={{
            fontSize: '28px',
            fontFamily: 'JetBrains Mono, Courier New, monospace',
            fontWeight: '900',
            letterSpacing: '2px',
            fill: '#22c55e',
            textShadow: '0 0 10px rgba(34, 197, 94, 0.5)'
          }}
          filter="url(#etch)"
        >
          FP
        </text>
        
        {/* Subtle Glow Effect */}
        <text
          x="50"
          y="58"
          textAnchor="middle"
          className="font-bold"
          style={{
            fontSize: '28px',
            fontFamily: 'JetBrains Mono, Courier New, monospace',
            fontWeight: '900',
            letterSpacing: '2px',
            fill: 'none',
            stroke: '#22c55e',
            strokeWidth: '0.5',
            opacity: '0.3'
          }}
        >
          FP
        </text>
        
        {/* Digital Grid Lines */}
        <line x1="15" y1="50" x2="85" y2="50" stroke="#16a34a" strokeWidth="0.5" opacity="0.3"/>
        <line x1="50" y1="15" x2="50" y2="85" stroke="#16a34a" strokeWidth="0.5" opacity="0.3"/>
        
        {/* Status Indicators */}
        <circle cx="25" cy="30" r="1.5" fill="#22c55e" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="75" cy="30" r="1.5" fill="#22c55e" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite"/>
        </circle>
      </svg>
    </div>
  );
};