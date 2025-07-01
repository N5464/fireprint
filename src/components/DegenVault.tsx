import React, { useState } from 'react';
import { FPLogo } from './FPLogo';
import { DropDecoyVaultModal } from './DropDecoyVaultModal';
import { SignalJammerLiteModal } from './SignalJammerLiteModal';
import { PhantomFootprintWiperModal } from './PhantomFootprintWiperModal';
import { IdentityScramblerModal } from './IdentityScramblerModal';
import { DegenVaultChatModal } from './DegenVaultChatModal';

interface DegenVaultProps {
  onBackToWeapons: () => void;
}

export const DegenVault: React.FC<DegenVaultProps> = ({ onBackToWeapons }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isShadowChatModalOpen, setIsShadowChatModalOpen] = useState(false);

  const degenWeapons = [
    {
      id: 'drop-decoy',
      title: 'DROP DECOY VAULT',
      price: '$39',
      description: 'Fake form links. Real bait. Real ops.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-red-400">
          <defs>
            <linearGradient id="decoyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
          </defs>
          
          <path 
            d="M12 3C8.5 3 6 5.5 6 9c0 1.5 0.5 3 1.5 4C8.5 14 9 15 9 16c0 1 1 2 3 2s3-1 3-2c0-1 0.5-2 1.5-3C17.5 12 18 10.5 18 9c0-3.5-2.5-6-6-6z" 
            fill="url(#decoyGradient)" 
            opacity="0.8"
          />
          
          <path d="M8 8c1-1 2-1 3 0M13 8c1-1 2-1 3 0" stroke="#ef4444" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M9 11c1 0 2 0 3 1M12 11c1 0 2 0 3 1" stroke="#dc2626" strokeWidth="1" fill="none" strokeLinecap="round"/>
          
          <circle cx="8" cy="7" r="1" fill="#ef4444" opacity="0.9"/>
          <circle cx="16" cy="7" r="1" fill="#dc2626" opacity="0.7"/>
          <circle cx="12" cy="13" r="1.5" fill="#b91c1c" opacity="0.8"/>
          
          <line x1="4" y1="12" x2="6" y2="10" stroke="#ef4444" strokeWidth="0.5" opacity="0.6"/>
          <line x1="20" y1="12" x2="18" y2="10" stroke="#dc2626" strokeWidth="0.5" opacity="0.5"/>
          <line x1="12" y1="20" x2="12" y2="18" stroke="#b91c1c" strokeWidth="0.5" opacity="0.7"/>
        </svg>
      ),
      cta: 'Generate My Decoy',
      color: 'red'
    },
    {
      id: 'signal-jammer',
      title: 'SIGNAL JAMMER LITE',
      price: '$29',
      description: 'Mute the noise. Slide in stealth.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-purple-400">
          <defs>
            <linearGradient id="jammerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          
          <rect x="8" y="6" width="8" height="12" rx="2" fill="url(#jammerGradient)" opacity="0.8"/>
          
          <rect x="11" y="2" width="2" height="6" fill="#a855f7" opacity="0.9"/>
          <circle cx="12" cy="2" r="1" fill="#9333ea" opacity="0.8"/>
          
          <path d="M4 8c2 0 4 2 4 4s-2 4-4 4" stroke="#a855f7" strokeWidth="1.5" fill="none" opacity="0.6"/>
          <path d="M20 8c-2 0-4 2-4 4s2 4 4 4" stroke="#9333ea" strokeWidth="1.5" fill="none" opacity="0.5"/>
          
          <path d="M2 10l4 4M6 10l-4 4" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
          <path d="M18 10l4 4M22 10l-4 4" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
          
          <circle cx="10" cy="8" r="0.5" fill="#a855f7" opacity="0.9"/>
          <circle cx="14" cy="8" r="0.5" fill="#9333ea" opacity="0.7"/>
        </svg>
      ),
      cta: 'Activate Jammer',
      color: 'purple'
    },
    {
      id: 'phantom-wiper',
      title: 'PHANTOM FOOTPRINT WIPER',
      price: '$45',
      description: 'Cleans meta. Wipes trace.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-cyan-400">
          <defs>
            <linearGradient id="wiperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#0e7490" />
            </linearGradient>
          </defs>
          
          <ellipse cx="12" cy="12" rx="8" ry="6" fill="none" stroke="url(#wiperGradient)" strokeWidth="2" opacity="0.8"/>
          <ellipse cx="12" cy="12" rx="5" ry="3" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.6"/>
          
          <circle cx="12" cy="12" r="2" fill="url(#wiperGradient)"/>
          
          <path d="M12 12L20 8" stroke="#06b6d4" strokeWidth="2" opacity="0.8"/>
          
          <circle cx="6" cy="6" r="1" fill="#06b6d4" opacity="0.7"/>
          <circle cx="18" cy="6" r="1" fill="#0891b2" opacity="0.6"/>
          <circle cx="6" cy="18" r="1" fill="#0e7490" opacity="0.8"/>
          <circle cx="18" cy="18" r="1" fill="#06b6d4" opacity="0.5"/>
          
          <line x1="2" y1="12" x2="22" y2="12" stroke="#06b6d4" strokeWidth="0.5" opacity="0.3"/>
          <line x1="12" y1="2" x2="12" y2="22" stroke="#0891b2" strokeWidth="0.5" opacity="0.2"/>
        </svg>
      ),
      cta: 'Wipe My Tracks',
      color: 'cyan'
    },
    {
      id: 'identity-scrambler',
      title: 'IDENTITY SCRAMBLER',
      price: '$49',
      description: 'One alias. Hundred faces.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-amber-400">
          <defs>
            <linearGradient id="scramblerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>
          
          <circle cx="12" cy="12" r="6" fill="none" stroke="url(#scramblerGradient)" strokeWidth="2" opacity="0.8"/>
          <circle cx="12" cy="12" r="3" fill="url(#scramblerGradient)" opacity="0.6"/>
          
          <circle cx="8" cy="8" r="2" fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.7"/>
          <circle cx="16" cy="8" r="2" fill="none" stroke="#d97706" strokeWidth="1.5" opacity="0.6"/>
          <circle cx="8" cy="16" r="2" fill="none" stroke="#b45309" strokeWidth="1.5" opacity="0.8"/>
          <circle cx="16" cy="16" r="2" fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.5"/>
          
          <rect x="7" y="7" width="2" height="2" fill="#f59e0b" opacity="0.6" rx="0.5"/>
          <rect x="15" y="7" width="2" height="2" fill="#d97706" opacity="0.7" rx="0.5"/>
          <rect x="7" y="15" width="2" height="2" fill="#b45309" opacity="0.8" rx="0.5"/>
          <rect x="15" y="15" width="2" height="2" fill="#f59e0b" opacity="0.5" rx="0.5"/>
          
          <line x1="8" y1="8" x2="16" y2="16" stroke="#f59e0b" strokeWidth="0.5" opacity="0.4"/>
          <line x1="16" y1="8" x2="8" y2="16" stroke="#d97706" strokeWidth="0.5" opacity="0.3"/>
          
          <circle cx="4" cy="12" r="0.5" fill="#f59e0b" opacity="0.6"/>
          <circle cx="20" cy="12" r="0.5" fill="#d97706" opacity="0.7"/>
        </svg>
      ),
      cta: 'Scramble Me',
      color: 'amber'
    }
  ];

  const handleWeaponClick = (weaponId: string) => {
    setActiveModal(weaponId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleShadowChatOpen = () => {
    setIsShadowChatModalOpen(true);
  };

  const handleShadowChatClose = () => {
    setIsShadowChatModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Simple Background Grid */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }} />
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          {/* Left: Back Button */}
          <button
            onClick={onBackToWeapons}
            className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors duration-300"
          >
            <div className="text-red-400">←</div>
            <FPLogo size="md" />
          </button>
          
          {/* Right: Title */}
          <div className="text-right">
            <h1 className="fireprint-title text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500 mb-2">
              DEGEN VAULT
            </h1>
            <p className="underground-text text-red-400/80 text-sm sm:text-base">
              UNLISTED WEAPONS FOR TRUE SHADOWS ONLY
            </p>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="mb-8 p-4 border-2 border-red-500/30 bg-red-500/5 text-center">
          <p className="gatekeeper-text text-red-400 text-sm sm:text-base font-bold mb-2">
            ⚠️ UNAUTHORIZED ACCESS DETECTED
          </p>
          <p className="underground-text text-red-300/90 text-xs sm:text-sm">
            These weapons are not listed anywhere. No documentation. No support. Use at your own risk.
          </p>
        </div>

        {/* Degen Weapons Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {degenWeapons.map((weapon) => (
            <div
              key={weapon.id}
              className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] bg-gray-900/20 border border-gray-700/30 hover:border-red-500/40 p-6 sm:p-8"
            >
              {/* Content Container */}
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    {/* Icon container */}
                    <div className="w-16 h-16 flex items-center justify-center bg-gray-800/50 border border-gray-600/30">
                      {weapon.icon}
                    </div>
                    <div>
                      <h3 className={`underground-title text-lg sm:text-xl font-bold text-${weapon.color}-400 mb-2`}>
                        {weapon.title}
                      </h3>
                      <p className="underground-text text-gray-300 text-sm leading-relaxed">
                        {weapon.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="text-right">
                    <div className={`price-text text-xl sm:text-2xl font-bold text-${weapon.color}-400`}>
                      {weapon.price}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 hacker-mono">
                      UNLISTED
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleWeaponClick(weapon.id)}
                  className={`w-full bg-${weapon.color}-600 hover:bg-${weapon.color}-700 text-white px-6 py-4 font-bold transition-colors duration-300 border border-${weapon.color}-500 hover:border-${weapon.color}-400`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6">
                      {weapon.icon}
                    </div>
                    <span className="text-lg font-bold hacker-mono">
                      {weapon.cta}
                    </span>
                  </div>
                </button>

                {/* Status indicators */}
                <div className="mt-4 flex items-center justify-between">
                  <div className={`text-xs hacker-mono text-${weapon.color}-400/60`}>
                    UNLISTED • NO TRACE
                  </div>
                  <div className="flex gap-1">
                    <div className={`w-2 h-2 bg-${weapon.color}-500 rounded-full`} />
                    <div className={`w-2 h-2 bg-${weapon.color}-500/60 rounded-full`} />
                    <div className={`w-2 h-2 bg-${weapon.color}-500/30 rounded-full`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SHADOW AGENT Assistance Section - PRIORITY */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="p-6 border-2 border-red-500/30 bg-red-500/5 text-center">
            {/* Header */}
            <div className="mb-6">
              <h3 className="fireprint-title text-xl sm:text-2xl font-bold text-red-400 mb-2">
                💀 NEED HELP CHOOSING YOUR WEAPON?
              </h3>
              <p className="underground-text text-red-300/90 text-sm sm:text-base">
                Let SHADOW AGENT assist you from the depths:
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <a
                href="https://t.me/fireprintHQ"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-bold transition-all duration-200 border border-red-500 hover:border-red-400 active:scale-95 w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 inline-flex items-center justify-center gap-2">
                  <span className="text-lg">👉</span>
                  <span className="tracking-wider hacker-mono">DM SHADOW AGENT ON TELEGRAM</span>
                </span>
              </a>
              
              <button
                onClick={handleShadowChatOpen}
                className="group relative overflow-hidden bg-transparent hover:bg-red-900/50 text-red-400 px-6 py-3 font-bold transition-all duration-200 border border-red-500 hover:border-red-400 active:scale-95 w-full sm:w-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-red-800/20 to-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 inline-flex items-center justify-center gap-2">
                  <span className="text-lg">🧠</span>
                  <span className="tracking-wider hacker-mono">TALK TO SHADOW AGENT AI</span>
                </span>
              </button>
            </div>

            {/* Warning Footer */}
            <div className="border-t border-red-500/20 pt-4">
              <p className="underground-text text-red-400/80 text-xs sm:text-sm leading-relaxed">
                ⚠️ <strong>Zero support. All ops.</strong><br />
                💣 <strong>Choose wisely, soldier.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Warning */}
        <div className="mt-12 p-6 border border-red-500/20 bg-red-500/5 text-center max-w-4xl mx-auto">
          <p className="underground-text text-red-400 text-sm sm:text-base leading-relaxed">
            💀 <strong>DEGEN VAULT PROTOCOL:</strong> These tools exist in the shadows. No announcements. No updates. No customer service. You found this — you know the rules.
          </p>
        </div>

        {/* Footer Status */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-6 text-xs hacker-mono text-red-500/60">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span>4 UNLISTED WEAPONS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span>VAULT OPERATIONAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Flow Modals */}
      <DropDecoyVaultModal isOpen={activeModal === 'drop-decoy'} onClose={closeModal} />
      <SignalJammerLiteModal isOpen={activeModal === 'signal-jammer'} onClose={closeModal} />
      <PhantomFootprintWiperModal isOpen={activeModal === 'phantom-wiper'} onClose={closeModal} />
      <IdentityScramblerModal isOpen={activeModal === 'identity-scrambler'} onClose={closeModal} />

      {/* Shadow Agent Chat Modal */}
      <DegenVaultChatModal 
        isOpen={isShadowChatModalOpen} 
        onClose={handleShadowChatClose} 
      />
    </div>
  );
};