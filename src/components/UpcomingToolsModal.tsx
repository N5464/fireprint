import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface UpcomingToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpcomingToolsModal: React.FC<UpcomingToolsModalProps> = ({ isOpen, onClose }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Lock background scroll immediately when modal opens
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
      
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      setTimeout(() => {
        setShouldRender(false);
        // Restore background scroll when modal closes
        document.body.style.overflow = 'unset';
        document.body.style.paddingRight = '';
      }, 500);
    }

    // Cleanup function to ensure scroll is restored
    return () => {
      if (!isOpen) {
        document.body.style.overflow = 'unset';
        document.body.style.paddingRight = '';
      }
    };
  }, [isOpen]);

  // Handle modal content scroll to prevent scroll chaining
  const handleModalScroll = (e: React.UIEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  if (!shouldRender) return null;

  const upcomingTools = [
    {
      title: 'SIGNALSTASH TERMINAL',
      description: 'Ghost storage vault for scripts, offers, wallet alphas, and drop plans. Share encrypted — store without a trace.',
      status: 'IN DEVELOPMENT',
      color: 'violet',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-violet-400">
          <defs>
            <linearGradient id="signalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <rect x="3" y="4" width="18" height="15" rx="2" stroke="url(#signalGradient)" strokeWidth="2" fill="none"/>
          <path d="M7 8h10M7 12h8M7 16h6" stroke="url(#signalGradient)" strokeWidth="1.5"/>
          <circle cx="19" cy="6" r="1" fill="#8b5cf6" opacity="0.8"/>
          <circle cx="19" cy="10" r="1" fill="#7c3aed" opacity="0.6"/>
        </svg>
      )
    },
    {
      title: 'CRYPTO PAYMENT GATEWAY',
      description: 'Accept 50+ cryptos without KYC. Plug-and-pay for drops, ops, or DMs — settlement direct to wallet.',
      status: 'RESEARCH PHASE',
      color: 'emerald',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-emerald-400">
          <defs>
            <linearGradient id="cryptoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="10" stroke="url(#cryptoGradient)" strokeWidth="2" fill="none"/>
          <path d="M8 12h8" stroke="url(#cryptoGradient)" strokeWidth="2"/>
          <path d="M12 8v8" stroke="url(#cryptoGradient)" strokeWidth="2"/>
          <circle cx="7" cy="7" r="1" fill="#10b981" opacity="0.7"/>
          <circle cx="17" cy="17" r="1" fill="#059669" opacity="0.8"/>
        </svg>
      )
    },
    {
      title: 'SCROLLSNIPER AI',
      description: 'Drop a keyword. It snipes the hottest post, summarizes the thread, and builds your reply or DM. Works on X, Reddit, Threads.',
      status: 'CONCEPT',
      color: 'red',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-red-400">
          <defs>
            <linearGradient id="sniperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="3" stroke="url(#sniperGradient)" strokeWidth="2" fill="none"/>
          <path d="M21 21l-6-6m0 0l-7.5-7.5M15 15l7.5 7.5M9 9l-6-6" stroke="url(#sniperGradient)" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="1" fill="#ef4444" opacity="0.8"/>
        </svg>
      )
    },
    {
      title: 'NEURAL CONTENT ENGINE',
      description: 'Generate high-conversion content trained on underground tactics. Solo page copy, bio lines, or thread intros in your style.',
      status: 'PLANNING',
      color: 'blue',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-400">
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="3" stroke="url(#neuralGradient)" strokeWidth="2" fill="none"/>
          <path d="M12 1v6m0 6v6" stroke="url(#neuralGradient)" strokeWidth="2"/>
          <path d="M21 12h-6m-6 0H3" stroke="url(#neuralGradient)" strokeWidth="2"/>
          <circle cx="12" cy="5" r="1" fill="#3b82f6" opacity="0.8"/>
          <circle cx="19" cy="12" r="1" fill="#2563eb" opacity="0.7"/>
        </svg>
      )
    },
    {
      title: 'GHOST FUNNEL ARCHITECT',
      description: 'Zero-code stealth funnels that self-destruct after conversion. Invisible opt-ins, timed redirects, and post-form redirects.',
      status: 'PROTOTYPE',
      color: 'slate',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-slate-400">
          <defs>
            <linearGradient id="ghostFunnelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          <path d="M4 4h16l-3 6v8l-4 2-4-2v-8L4 4z" stroke="url(#ghostFunnelGradient)" strokeWidth="2" fill="none"/>
          <path d="M8 8h8M10 12h4" stroke="url(#ghostFunnelGradient)" strokeWidth="1"/>
          <circle cx="12" cy="16" r="1" fill="#64748b" opacity="0.8"/>
        </svg>
      )
    },
    {
      title: 'SHADOW METRICS TRACKER',
      description: 'Analytics without cookies. No GA, no pixels. Just ghost-mode insights on who moved where, when — without alerts.',
      status: 'VISION',
      color: 'amber',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-400">
          <defs>
            <linearGradient id="metricsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <path d="M3 12l9-9 9 9" stroke="url(#metricsGradient)" strokeWidth="2" fill="none"/>
          <path d="M9 21V9l3-3 3 3v12" stroke="url(#metricsGradient)" strokeWidth="2" fill="none"/>
          <circle cx="6" cy="18" r="1" fill="#f59e0b" opacity="0.6"/>
          <circle cx="18" cy="15" r="1" fill="#d97706" opacity="0.8"/>
        </svg>
      )
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'IN DEVELOPMENT': return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'RESEARCH PHASE': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'CONCEPT': return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      case 'PLANNING': return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      case 'PROTOTYPE': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      case 'VISION': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className={`relative w-full max-w-7xl max-h-[85vh] bg-black border-t-2 border-l-2 border-r-2 border-green-500/30 shadow-2xl shadow-green-500/20 overflow-hidden transition-all duration-500 ease-out ${
        isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}>
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }} />
        </div>

        {/* Scanning Line Effect */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-60 animate-scan-horizontal" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-4 sm:p-6 border-b border-green-500/20">
          <div>
            <h2 className="fireprint-title text-2xl sm:text-3xl font-bold text-green-500 mb-2">
              UPCOMING ARSENAL
            </h2>
            <p className="underground-text text-green-400/80 text-sm sm:text-base">
              BLACKSITE R&D IN MOTION • SCROLL DOWN TO PREVIEW CLASSIFIED TOOLS UNDER SILENT CONSTRUCTION
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-green-500/10 transition-colors border border-green-500/30 hover:border-green-500/60"
          >
            <X className="w-5 h-5 text-green-500" />
          </button>
        </div>

        {/* Content - Enhanced Scroll Control */}
        <div 
          className="relative z-10 overflow-y-auto max-h-[calc(85vh-120px)] p-4 sm:p-6 arsenal-scroll"
          onScroll={handleModalScroll}
          style={{
            overscrollBehavior: 'contain',
            scrollbarGutter: 'stable'
          }}
        >
          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {upcomingTools.map((tool, index) => (
              <div
                key={index}
                className={`group relative p-4 sm:p-6 border-2 border-${tool.color}-500/20 hover:border-${tool.color}-500/40 bg-${tool.color}-500/5 hover:bg-${tool.color}-500/10 transition-all duration-300 hover:scale-[1.02] cursor-default`}
              >
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `
                      linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '15px 15px'
                  }} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-${tool.color}-600/20 border border-${tool.color}-500/40 flex items-center justify-center`}>
                        {tool.icon}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`underground-title text-base sm:text-lg font-bold text-${tool.color}-400 mb-3`}>
                    {tool.title}
                  </h3>

                  {/* Description */}
                  <p className="underground-text text-gray-300 text-sm leading-relaxed mb-4">
                    {tool.description}
                  </p>

                  {/* Status Only */}
                  <div className="space-y-2">
                    <div className={`inline-flex items-center gap-2 px-2 py-1 text-xs font-bold border ${getStatusColor(tool.status)}`}>
                      <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
                      <span className="hacker-mono">{tool.status}</span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-${tool.color}-500 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />
              </div>
            ))}
          </div>

          {/* Footer Message */}
          <div className="mt-8 p-4 border border-green-500/20 bg-green-500/5 text-center">
            <p className="underground-text text-green-400 text-sm leading-relaxed">
              💀 <strong>STAY LOW.</strong> These drops won't be announced. No emails. No noise. Just sudden access when the chamber opens.
            </p>
          </div>
        </div>

        {/* Footer Status */}
        <div className="relative z-10 flex justify-between items-center p-3 sm:p-4 border-t border-green-500/20">
          <div className="text-xs hacker-mono text-green-500/60">
            R&D DIVISION
          </div>
          <div className="text-xs hacker-mono text-green-500/60">
            6 WEAPONS IN DEVELOPMENT
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan-horizontal {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        .animate-scan-horizontal {
          animation: scan-horizontal 3s linear infinite;
        }

        /* Arsenal-style scrollbar with enhanced control */
        .arsenal-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(34, 197, 94, 0.6) rgba(0, 0, 0, 0.3);
          overscroll-behavior: contain;
          scroll-behavior: smooth;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .arsenal-scroll::-webkit-scrollbar {
          width: 8px;
        }

        .arsenal-scroll::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-left: 1px solid rgba(34, 197, 94, 0.2);
        }

        .arsenal-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, 
            rgba(34, 197, 94, 0.8) 0%, 
            rgba(34, 197, 94, 0.6) 50%, 
            rgba(34, 197, 94, 0.8) 100%
          );
          border-radius: 0;
          border: 1px solid rgba(34, 197, 94, 0.3);
          box-shadow: 
            inset 0 0 2px rgba(34, 197, 94, 0.5),
            0 0 4px rgba(34, 197, 94, 0.2);
        }

        .arsenal-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, 
            rgba(34, 197, 94, 1) 0%, 
            rgba(34, 197, 94, 0.8) 50%, 
            rgba(34, 197, 94, 1) 100%
          );
          box-shadow: 
            inset 0 0 3px rgba(34, 197, 94, 0.8),
            0 0 6px rgba(34, 197, 94, 0.4);
        }

        .arsenal-scroll::-webkit-scrollbar-thumb:active {
          background: rgba(34, 197, 94, 1);
          box-shadow: 
            inset 0 0 4px rgba(34, 197, 94, 1),
            0 0 8px rgba(34, 197, 94, 0.6);
        }

        /* Mobile scroll optimization */
        @media (max-width: 768px) {
          .arsenal-scroll {
            -webkit-overflow-scrolling: touch;
            overscroll-behavior-y: contain;
          }
        }

        /* Prevent text selection during scroll */
        .arsenal-scroll:active {
          user-select: none;
          -webkit-user-select: none;
        }
      `}</style>
    </div>
  );
};