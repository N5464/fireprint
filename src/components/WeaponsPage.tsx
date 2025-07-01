import React, { useState, useRef } from 'react';
import { FPLogo } from './FPLogo';
import { GhostDeckModal } from './GhostDeckModal';
import { NoModStealthModal } from './NoModStealthModal';
import { DropComposerModal } from './DropComposerModal';
import { DegenAIModal } from './DegenAIModal';
import { BurnerFormModal } from './BurnerFormModal';
import { ShadowDropModal } from './ShadowDropModal';
import { ShadowDropSuiteModal } from './ShadowDropSuiteModal';
import { GhostLeadBeaconModal } from './GhostLeadBeaconModal';
import { OfferDropTerminalModal } from './OfferDropTerminalModal';
import { RecessionProofPlaybookModal } from './RecessionProofPlaybookModal';
import { UpcomingToolsModal } from './UpcomingToolsModal';
import { LiveAgentChatModal } from './LiveAgentChatModal';

interface WeaponsPageProps {
  onBackToHome: () => void;
  onEnterDegenVault: () => void;
}

export const WeaponsPage: React.FC<WeaponsPageProps> = ({ onBackToHome, onEnterDegenVault }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showUpcomingTools, setShowUpcomingTools] = useState(false);
  const [mobileAssistExpanded, setMobileAssistExpanded] = useState(false);
  const [isFireghostChatModalOpen, setIsFireghostChatModalOpen] = useState(false);
  
  // Secret trigger state
  const [tapCount, setTapCount] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const weapons = [
    {
      id: 'ghostdeck',
      title: 'GHOSTDECK SYSTEMS',
      price: '$199',
      description: 'Blacksite lab deployment. Custom-built tools for founders, nomads & tacticians who move in silence.',
      color: 'purple',
      borderColor: 'border-purple-500/30',
      hoverBorderColor: 'hover:border-purple-500/60',
      textColor: 'text-purple-400',
      bgColor: 'bg-purple-500/5',
      hoverBgColor: 'hover:bg-purple-500/10',
      logo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-purple-400">
          <defs>
            <linearGradient id="ghostGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <path 
            d="M12 3C8.5 3 6 5.5 6 9v6c0 1 0.5 2 1.5 2.5L9 19l1.5-1.5L12 19l1.5-1.5L15 19l1.5-1.5C17.5 17 18 16 18 15V9c0-3.5-2.5-6-6-6z" 
            fill="url(#ghostGradient)" 
            opacity="0.9"
          />
          <circle cx="9.5" cy="10" r="1.2" fill="#1a1a1a" opacity="0.9"/>
          <circle cx="14.5" cy="10" r="1.2" fill="#1a1a1a" opacity="0.9"/>
          <circle cx="9.5" cy="10" r="0.4" fill="#a855f7" opacity="0.8"/>
          <circle cx="14.5" cy="10" r="0.4" fill="#a855f7" opacity="0.6"/>
          <ellipse cx="12" cy="13" rx="1" ry="0.8" fill="#1a1a1a" opacity="0.7"/>
        </svg>
      )
    },
    {
      id: 'nomod',
      title: 'NOMOD STEALTH SUITE',
      price: '$77',
      description: 'Zero noise deployment. Pure stealth pages that capture leads without leaving a trail.',
      color: 'cyan',
      borderColor: 'border-cyan-500/30',
      hoverBorderColor: 'hover:border-cyan-500/60',
      textColor: 'text-cyan-400',
      bgColor: 'bg-cyan-500/5',
      hoverBgColor: 'hover:bg-cyan-500/10',
      logo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-cyan-400">
          <defs>
            <linearGradient id="stealthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
          <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" fill="none" stroke="url(#stealthGradient)" strokeWidth="1.5"/>
          <path d="M8 10l2 2 4-4" stroke="#06b6d4" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="16" r="1" fill="#06b6d4" opacity="0.8"/>
        </svg>
      )
    },
    {
      id: 'dropcomposer',
      title: 'DROPCOMPOSER X',
      price: '$49',
      description: 'Fire-styled artillery. Generate cold DMs, bios, replies & tweets with tone-switch precision.',
      color: 'orange',
      borderColor: 'border-orange-500/30',
      hoverBorderColor: 'hover:border-orange-500/60',
      textColor: 'text-orange-400',
      bgColor: 'bg-orange-500/5',
      hoverBgColor: 'hover:bg-orange-500/10',
      logo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-orange-400">
          <defs>
            <linearGradient id="composerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="url(#composerGradient)" opacity="0.8"/>
          <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#f97316"/>
        </svg>
      )
    },
    {
      id: 'degenai',
      title: 'DEGEN AI ASSISTANT',
      price: '$59',
      description: 'Neural operator. Custom AI assistant trained with your tone, drops & context for degen-style operations.',
      color: 'pink',
      borderColor: 'border-pink-500/30',
      hoverBorderColor: 'hover:border-pink-500/60',
      textColor: 'text-pink-400',
      bgColor: 'bg-pink-500/5',
      hoverBgColor: 'hover:bg-pink-500/10',
      logo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-pink-400">
          <defs>
            <linearGradient id="degenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#db2777" />
              <stop offset="100%" stopColor="#be185d" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="8" fill="none" stroke="url(#degenGradient)" strokeWidth="1.5" opacity="0.8"/>
          <circle cx="8" cy="8" r="1.5" fill="url(#degenGradient)" opacity="0.9"/>
          <circle cx="16" cy="8" r="1.5" fill="url(#degenGradient)" opacity="0.9"/>
          <circle cx="12" cy="12" r="2" fill="url(#degenGradient)" opacity="1"/>
        </svg>
      )
    },
    {
      id: 'burnerform',
      title: 'BURNER FORM LINK',
      price: '$29',
      description: 'Ghost capture. One-click forms with zero identity. Collect input and stay ghost.',
      color: 'yellow',
      borderColor: 'border-yellow-500/30',
      hoverBorderColor: 'hover:border-yellow-500/60',
      textColor: 'text-yellow-400',
      bgColor: 'bg-yellow-500/5',
      hoverBgColor: 'hover:bg-yellow-500/10',
      logo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-yellow-400">
          <defs>
            <linearGradient id="burnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="50%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>
          </defs>
          <rect x="5" y="3" width="14" height="18" rx="2" fill="none" stroke="url(#burnerGradient)" strokeWidth="1.5" opacity="0.8"/>
          <rect x="7" y="6" width="10" height="1.5" fill="url(#burnerGradient)" opacity="0.6" rx="0.5"/>
          <rect x="7" y="9" width="8" height="1.5" fill="url(#burnerGradient)" opacity="0.7" rx="0.5"/>
        </svg>
      )
    },
    {
      id: 'shadowdrop',
      title: 'SHADOWDROP EXTRACTOR',
      price: '$45',
      description: 'Intel-grade extractor. Pull psychological intel & buyer signals from underground without alerts.',
      color: 'indigo',
      borderColor: 'border-indigo-500/30',
      hoverBorderColor: 'hover:border-indigo-500/60',
      textColor: 'text-indigo-400',
      bgColor: 'bg-indigo-500/5',
      hoverBgColor: 'hover:bg-indigo-500/10',
      logo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-indigo-400">
          <defs>
            <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#3730a3" />
            </linearGradient>
          </defs>
          <path d="M4 4h16l-3 6v8l-4 2-4-2v-8L4 4z" fill="none" stroke="url(#shadowGradient)" strokeWidth="1.5" opacity="0.8"/>
          <circle cx="12" cy="14" r="2" fill="url(#shadowGradient)" opacity="0.9"/>
        </svg>
      )
    },
    {
      id: 'shadowdropsuite',
      title: 'SHADOWDROP SUITE',
      price: '$129',
      description: 'Stealth launch protocol. Built for one-click deployment of your heat without platform noise.',
      color: 'red',
      borderColor: 'border-red-500/30',
      hoverBorderColor: 'hover:border-red-500/60',
      textColor: 'text-red-400',
      bgColor: 'bg-red-500/5',
      hoverBgColor: 'hover:bg-red-500/10',
      logo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-red-400">
          <defs>
            <linearGradient id="suiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
          </defs>
          <rect x="3" y="18" width="18" height="3" fill="url(#suiteGradient)" opacity="0.8" rx="1"/>
          <rect x="10" y="8" width="4" height="10" fill="url(#suiteGradient)" opacity="0.9"/>
          <path d="M12 2l-2 6h4l-2-6z" fill="url(#suiteGradient)"/>
        </svg>
      )
    },
    {
      id: 'ghostbeacon',
      title: 'GHOST LEAD BEACON',
      price: '$59',
      description: 'Stealth inbound trap. Magnet stealth leads without dashboards, pixels or CRMs. Just quiet pull.',
      color: 'emerald',
      borderColor: 'border-emerald-500/30',
      hoverBorderColor: 'hover:border-emerald-500/60',
      textColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/5',
      hoverBgColor: 'hover:bg-emerald-500/10',
      logo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-emerald-400">
          <defs>
            <linearGradient id="beaconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>
          <rect x="10" y="4" width="4" height="16" fill="url(#beaconGradient)" opacity="0.8"/>
          <rect x="8" y="18" width="8" height="3" fill="url(#beaconGradient)" opacity="0.9" rx="1"/>
          <circle cx="12" cy="8" r="2" fill="url(#beaconGradient)"/>
        </svg>
      )
    },
    {
      id: 'offerterminal',
      title: 'OFFER DROP TERMINAL',
      price: '$149',
      description: 'War-mode conversion. Weaponize your offer delivery with zero friction for solo tacticians.',
      color: 'blue',
      borderColor: 'border-blue-500/30',
      hoverBorderColor: 'hover:border-blue-500/60',
      textColor: 'text-blue-400',
      bgColor: 'bg-blue-500/5',
      hoverBgColor: 'hover:bg-blue-500/10',
      logo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-400">
          <defs>
            <linearGradient id="terminalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
          <rect x="3" y="4" width="18" height="14" rx="2" fill="none" stroke="url(#terminalGradient)" strokeWidth="1.5" opacity="0.8"/>
          <rect x="10" y="18" width="4" height="2" fill="url(#terminalGradient)" opacity="0.7"/>
          <circle cx="12" cy="11" r="3" fill="none" stroke="#3b82f6" strokeWidth="1.2" opacity="0.8"/>
        </svg>
      )
    },
    {
      id: 'recessionplaybook',
      title: 'RECESSION-PROOF PLAYBOOK OS',
      price: '$179',
      description: 'Survival operating system. Complete tactical OS with 10+ frameworks for crisis-mode operations.',
      color: 'amber',
      borderColor: 'border-amber-500/30',
      hoverBorderColor: 'hover:border-amber-500/60',
      textColor: 'text-amber-400',
      bgColor: 'bg-amber-500/5',
      hoverBgColor: 'hover:bg-amber-500/10',
      logo: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-400">
          <defs>
            <linearGradient id="playbookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>
          <path d="M12 2L4 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-8-4z" fill="none" stroke="url(#playbookGradient)" strokeWidth="1.5" opacity="0.8"/>
          <rect x="8" y="8" width="8" height="8" rx="1" fill="url(#playbookGradient)" opacity="0.2"/>
          <circle cx="12" cy="12" r="2" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.8"/>
        </svg>
      )
    }
  ];

  const handleWeaponClick = (weaponId: string) => {
    setActiveModal(weaponId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleUpcomingToolsClick = () => {
    setShowUpcomingTools(true);
  };

  const closeUpcomingTools = () => {
    setShowUpcomingTools(false);
  };

  const handleFireghostChatOpen = () => {
    setIsFireghostChatModalOpen(true);
  };

  const handleFireghostChatClose = () => {
    setIsFireghostChatModalOpen(false);
  };

  // Secret trigger handler
  const handleSecretTrigger = () => {
    setTapCount(prev => prev + 1);
    
    // Clear existing timeout
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
    }
    
    // Set new timeout to reset tap count after 2 seconds
    tapTimeoutRef.current = setTimeout(() => {
      setTapCount(0);
    }, 2000);
    
    // Check if we've reached 3 taps
    if (tapCount + 1 >= 3) {
      setTapCount(0);
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current);
      }
      onEnterDegenVault();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          {/* Left: FP Logo Return Button */}
          <button
            onClick={onBackToHome}
            className="flex items-center gap-3 text-green-400 hover:text-green-300 transition-all duration-300 group hover:scale-105"
          >
            {/* Arrow */}
            <div className="text-green-400 group-hover:translate-x-[-4px] transition-transform duration-300">
              ←
            </div>
            
            {/* FP Hexagon Logo */}
            <div className="group-hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all duration-300">
              <FPLogo size="md" className="group-hover:animate-pulse" />
            </div>
          </button>
          
          {/* Right: Title */}
          <div className="text-right">
            <h1 className="fireprint-title text-2xl sm:text-3xl lg:text-4xl font-bold text-green-500 mb-2">
              WEAPONS CACHE
            </h1>
            <p className="underground-text text-green-400/80 text-sm sm:text-base">
              BLACKSITE ARSENAL • CRYPTO-NATIVE TOOLS
            </p>
          </div>
        </div>

        {/* Upcoming Tools Button */}
        <div className="mb-8 flex justify-center">
          <button
            onClick={handleUpcomingToolsClick}
            className="group relative overflow-hidden bg-green-600/10 hover:bg-green-600/20 text-green-400 px-6 py-3 text-sm font-bold transition-all duration-300 border border-green-500/30 hover:border-green-500/60 hover:scale-105"
          >
            {/* Button Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 via-green-500/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Button Content */}
            <span className="relative z-10 inline-flex items-center gap-2">
              <span className="text-base group-hover:animate-pulse">🔬</span>
              <span className="tracking-wider hacker-mono">UPCOMING ARSENAL</span>
            </span>
            
            {/* Scanning Line Effect */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-60 group-hover:animate-scan-horizontal transition-opacity duration-300" />
          </button>
        </div>

        {/* FIREGHOST Assistance Sticky Sidebar - Desktop Only */}
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
          <div className="bg-green-500/5 border border-green-500/30 p-4 backdrop-blur-sm max-w-xs">
            {/* Header */}
            <div className="mb-4 text-center">
              <h4 className="fireprint-title text-sm font-bold text-green-400 mb-1">
                💀 NEED ASSISTANCE?
              </h4>
              <p className="underground-text text-green-300/80 text-xs">
                FIREGHOST from the shadows:
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <a
                href="https://t.me/fireprintHQ"
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full bg-green-600/20 hover:bg-green-600/40 text-green-400 px-3 py-2 text-xs font-bold transition-all duration-200 border border-green-500/30 hover:border-green-500/60 text-center"
              >
                <span className="inline-flex items-center gap-1">
                  <span className="text-sm">👉</span>
                  <span className="hacker-mono">TELEGRAM</span>
                </span>
              </a>
              
              <button
                onClick={handleFireghostChatOpen}
                className="group block w-full bg-green-600/10 hover:bg-green-600/20 text-green-400 px-3 py-2 text-xs font-bold transition-all duration-200 border border-green-500/30 hover:border-green-500/60 text-center"
              >
                <span className="inline-flex items-center gap-1">
                  <span className="text-sm">🧠</span>
                  <span className="hacker-mono">AI CHAT</span>
                </span>
              </button>
            </div>

            {/* Warning */}
            <div className="mt-3 pt-3 border-t border-green-500/20">
              <p className="underground-text text-green-400/60 text-xs text-center">
                ⚠️ Zero support. All ops.
              </p>
            </div>
          </div>
        </div>

        {/* FIREGHOST Assistance Mobile Sticky Bar - Smart Mobile Implementation */}
        <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden">
          {/* Collapsed State - Smart Minimal Bar */}
          <div className={`transition-all duration-300 ease-out ${mobileAssistExpanded ? 'translate-y-0' : 'translate-y-0'}`}>
            {/* Expanded Content */}
            <div className={`bg-black/95 border-t-2 border-green-500/40 backdrop-blur-md transition-all duration-300 ease-out ${
              mobileAssistExpanded ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
              <div className="p-4">
                {/* Header */}
                <div className="text-center mb-4">
                  <h4 className="fireprint-title text-sm font-bold text-green-400 mb-1">
                    💀 NEED HELP CHOOSING YOUR WEAPON?
                  </h4>
                  <p className="underground-text text-green-300/80 text-xs">
                    Let FIREGHOST assist you from the shadows:
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href="https://t.me/fireprintHQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-600/20 hover:bg-green-600/40 active:bg-green-600/60 text-green-400 px-3 py-3 text-xs font-bold transition-all duration-200 border border-green-500/30 hover:border-green-500/60 text-center active:scale-95"
                  >
                    <span className="inline-flex items-center justify-center gap-1">
                      <span className="text-sm">👉</span>
                      <span className="hacker-mono">TELEGRAM</span>
                    </span>
                  </a>
                  
                  <button
                    onClick={handleFireghostChatOpen}
                    className="flex-1 bg-green-600/10 hover:bg-green-600/20 active:bg-green-600/40 text-green-400 px-3 py-3 text-xs font-bold transition-all duration-200 border border-green-500/30 hover:border-green-500/60 text-center active:scale-95"
                  >
                    <span className="inline-flex items-center justify-center gap-1">
                      <span className="text-sm">🧠</span>
                      <span className="hacker-mono">AI CHAT</span>
                    </span>
                  </button>
                </div>

                {/* Warning */}
                <div className="mt-3 pt-3 border-t border-green-500/20 text-center">
                  <p className="underground-text text-green-400/60 text-xs">
                    ⚠️ Zero support. All ops. 💣 Choose wisely, soldier.
                  </p>
                </div>
              </div>
            </div>

            {/* Toggle Button - Always Visible */}
            <button
              onClick={() => setMobileAssistExpanded(!mobileAssistExpanded)}
              className="w-full bg-green-600/20 hover:bg-green-600/30 active:bg-green-600/40 text-green-400 py-3 px-4 font-bold transition-all duration-200 border-t border-green-500/30 active:scale-[0.98]"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm">💀</span>
                <span className="hacker-mono text-xs">
                  {mobileAssistExpanded ? 'HIDE FIREGHOST' : 'NEED ASSISTANCE?'}
                </span>
                <span className={`text-xs transition-transform duration-300 ${mobileAssistExpanded ? 'rotate-180' : 'rotate-0'}`}>
                  ▲
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Weapons Grid - Enhanced for Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {weapons.map((weapon) => (
            <div
              key={weapon.id}
              onClick={() => handleWeaponClick(weapon.id)}
              className={`group relative p-6 sm:p-8 border-2 ${weapon.borderColor} ${weapon.hoverBorderColor} ${weapon.bgColor} ${weapon.hoverBgColor} cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[1.02] hover:shadow-2xl active:shadow-2xl hover:shadow-${weapon.color}-500/20 active:shadow-${weapon.color}-500/20 will-change-transform`}
            >
              {/* Background Grid */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }} />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-${weapon.color}-600/20 border border-${weapon.color}-500/40 flex items-center justify-center`}>
                      {weapon.logo}
                    </div>
                    <div>
                      <h3 className={`underground-title text-lg sm:text-xl font-bold ${weapon.textColor} mb-1 opacity-100 sm:opacity-10 group-hover:opacity-100 group-active:opacity-100 transition-all duration-500`}>
                        {weapon.title}
                      </h3>
                    </div>
                  </div>
                  <div className={`price-text text-xl sm:text-2xl font-bold ${weapon.textColor}`}>
                    {weapon.price}
                  </div>
                </div>

                {/* Description */}
                <p className="underground-text text-gray-300 text-sm sm:text-base leading-relaxed">
                  {weapon.description}
                </p>

                {/* Hover Indicator */}
                <div className="mt-6 flex items-center justify-between">
                  <div className={`text-xs hacker-mono ${weapon.textColor}/60 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                    CLICK TO DEPLOY
                  </div>
                  <div className={`w-2 h-2 bg-${weapon.color}-500 rounded-full opacity-100 sm:opacity-60 group-hover:animate-pulse`} />
                </div>
              </div>

              {/* Scanning Line Effect */}
              <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-${weapon.color}-500 to-transparent opacity-60 sm:opacity-0 group-hover:opacity-60 group-hover:animate-scan-horizontal transition-opacity duration-300`} />
            </div>
          ))}
        </div>

        {/* Secret Trigger - Smooth Skull with Red Outline Effect */}
        <div className="mt-8 flex justify-center">
          <div
            onClick={handleSecretTrigger}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="relative cursor-pointer select-none"
          >
            {/* Skull with smooth effects */}
            <div 
              className={`text-3xl transition-all duration-500 ease-out transform ${
                isHovering 
                  ? 'scale-110 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] drop-shadow-[0_0_16px_rgba(239,68,68,0.6)]' 
                  : 'scale-100 opacity-20 filter drop-shadow-[0_0_2px_rgba(255,255,255,0.1)]'
              }`}
              style={{
                textShadow: isHovering 
                  ? '0 0 20px rgba(239, 68, 68, 0.8), 0 0 40px rgba(239, 68, 68, 0.6)' 
                  : 'none'
              }}
            >
              💀
            </div>
            
            {/* Red outline effect on hover */}
            {isHovering && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 rounded-full border-2 border-red-500/60 animate-pulse scale-150" />
                <div className="absolute inset-0 rounded-full border border-red-400/40 animate-ping scale-125" />
              </div>
            )}
            
            {/* Subtle progress indicator during tapping (no numbers) */}
            {tapCount > 0 && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="flex gap-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        i < tapCount ? 'bg-red-500 animate-pulse' : 'bg-red-500/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Status */}
        <div className="mt-12 flex justify-center mb-20 lg:mb-8">
          <div className="flex items-center gap-6 text-xs hacker-mono text-green-500/60">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>10 WEAPONS ACTIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <span>BLACKSITE OPERATIONAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <GhostDeckModal isOpen={activeModal === 'ghostdeck'} onClose={closeModal} />
      <NoModStealthModal isOpen={activeModal === 'nomod'} onClose={closeModal} />
      <DropComposerModal isOpen={activeModal === 'dropcomposer'} onClose={closeModal} />
      <DegenAIModal isOpen={activeModal === 'degenai'} onClose={closeModal} />
      <BurnerFormModal isOpen={activeModal === 'burnerform'} onClose={closeModal} />
      <ShadowDropModal isOpen={activeModal === 'shadowdrop'} onClose={closeModal} />
      <ShadowDropSuiteModal isOpen={activeModal === 'shadowdropsuite'} onClose={closeModal} />
      <GhostLeadBeaconModal isOpen={activeModal === 'ghostbeacon'} onClose={closeModal} />
      <OfferDropTerminalModal isOpen={activeModal === 'offerterminal'} onClose={closeModal} />
      <RecessionProofPlaybookModal isOpen={activeModal === 'recessionplaybook'} onClose={closeModal} />
      
      {/* Upcoming Tools Modal */}
      <UpcomingToolsModal isOpen={showUpcomingTools} onClose={closeUpcomingTools} />

      {/* FIREGHOST Chat Modal */}
      <LiveAgentChatModal 
        isOpen={isFireghostChatModalOpen} 
        onClose={handleFireghostChatClose} 
      />

      <style>{`
        @keyframes scan-horizontal {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        .animate-scan-horizontal {
          animation: scan-horizontal 2s linear infinite;
        }
      `}</style>
    </div>
  );
};