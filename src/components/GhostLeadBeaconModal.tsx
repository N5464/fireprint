import React, { useState, useEffect } from 'react';
import { X, Copy, Check } from 'lucide-react';

interface GhostLeadBeaconModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GhostLeadBeaconModal: React.FC<GhostLeadBeaconModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    contact: '',
    notes: '',
    transactionId: ''
  });
  const [selectedNetwork, setSelectedNetwork] = useState<'solana' | 'ethereum'>('solana');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Wallet addresses
  const walletAddresses = {
    solana: 'EB1YQD3mgCP7tuQ7TN4bV5n4CG8YNHt7C3PEbeK5YvrY',
    ethereum: '0x81e14112c10b6384cd0A37E6A1ae68AeCd05474c'
  };

  // Lock body scroll when modal is open and handle scroll chaining
  useEffect(() => {
    if (isOpen) {
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
      
      // Prevent scroll chaining on modal content
      const handleWheel = (e: WheelEvent) => {
        const target = e.target as HTMLElement;
        const modalContent = target.closest('.beacon-scroll');
        
        if (modalContent) {
          const { scrollTop, scrollHeight, clientHeight } = modalContent;
          const isScrollingUp = e.deltaY < 0;
          const isScrollingDown = e.deltaY > 0;
          
          // Prevent scroll chaining when at scroll boundaries
          if (
            (isScrollingUp && scrollTop === 0) ||
            (isScrollingDown && scrollTop + clientHeight >= scrollHeight)
          ) {
            e.preventDefault();
          }
        }
      };

      document.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        document.removeEventListener('wheel', handleWheel);
      };
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.contact.trim() || !formData.notes.trim() || !formData.transactionId.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://hook.eu2.make.com/b47tb1k67d835hxppl1iu6t3b22v578c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tool_name: 'Ghost Lead Beacon',
          contact: formData.contact,
          notes: formData.notes,
          txid: formData.transactionId,
          chain: selectedNetwork
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ contact: '', notes: '', transactionId: '' });
        setSelectedNetwork('solana');
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 4000);
      } else {
        throw new Error('Failed to submit order');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddresses[selectedNetwork]);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const handleModalScroll = (e: React.UIEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] bg-black border-2 border-emerald-500/40 shadow-2xl shadow-emerald-500/20 overflow-hidden flex flex-col">
        {/* Emerald Background Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* Emerald Scanning Line Effect */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-60 animate-scan-horizontal" />

        {/* Fixed Header */}
        <div className="relative z-10 flex items-center justify-between p-4 sm:p-6 border-b border-emerald-500/30 flex-shrink-0">
          <div className="flex items-center gap-4">
            {/* Custom Ghost Lead Beacon Logo */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-emerald-400">
                <defs>
                  <linearGradient id="beaconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#047857" />
                  </linearGradient>
                  <filter id="beaconGlow">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Beacon Tower */}
                <rect x="10" y="4" width="4" height="16" fill="url(#beaconGradient)" opacity="0.8"/>
                
                {/* Beacon Base */}
                <rect x="8" y="18" width="8" height="3" fill="url(#beaconGradient)" opacity="0.9" rx="1"/>
                
                {/* Signal Waves */}
                <circle cx="12" cy="8" r="6" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.6">
                  <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="12" cy="8" r="8" fill="none" stroke="#059669" strokeWidth="0.8" opacity="0.4">
                  <animate attributeName="r" values="8;12;8" dur="2.5s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.4;0.05;0.4" dur="2.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="12" cy="8" r="10" fill="none" stroke="#047857" strokeWidth="0.6" opacity="0.3">
                  <animate attributeName="r" values="10;14;10" dur="3s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.3;0.02;0.3" dur="3s" repeatCount="indefinite"/>
                </circle>
                
                {/* Beacon Light */}
                <circle cx="12" cy="8" r="2" fill="url(#beaconGradient)" filter="url(#beaconGlow)">
                  <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite"/>
                </circle>
                
                {/* Attracted Leads (dots) */}
                <circle cx="6" cy="6" r="0.8" fill="#10b981" opacity="0.7">
                  <animateTransform attributeName="transform" type="translate" values="0,0; 6,2; 0,0" dur="3s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3s" repeatCount="indefinite"/>
                </circle>
                <circle cx="18" cy="10" r="0.8" fill="#059669" opacity="0.6">
                  <animateTransform attributeName="transform" type="translate" values="0,0; -6,-2; 0,0" dur="3.5s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.6;0.1;0.6" dur="3.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="8" cy="14" r="0.8" fill="#047857" opacity="0.8">
                  <animateTransform attributeName="transform" type="translate" values="0,0; 4,-6; 0,0" dur="2.8s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.8;0.15;0.8" dur="2.8s" repeatCount="indefinite"/>
                </circle>
                
                {/* Stealth Grid Lines */}
                <line x1="2" y1="12" x2="22" y2="12" stroke="#10b981" strokeWidth="0.3" opacity="0.3"/>
                <line x1="12" y1="2" x2="12" y2="22" stroke="#059669" strokeWidth="0.3" opacity="0.2"/>
              </svg>
            </div>
            <div>
              <h2 className="modal-title text-xl sm:text-2xl font-bold text-emerald-400 mb-1">
                GHOST LEAD BEACON
              </h2>
              <p className="underground-text text-emerald-300/80 text-xs sm:text-sm">
                STEALTH INBOUND TRAP
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-emerald-500/10 transition-colors border border-emerald-500/30 hover:border-emerald-500/60 flex-shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div 
          className="relative z-10 flex-1 overflow-y-auto beacon-scroll"
          onScroll={handleModalScroll}
          style={{
            overscrollBehavior: 'contain',
            scrollbarGutter: 'stable'
          }}
        >
          <div className="p-4 sm:p-6">
            {isSuccess ? (
              // Success State
              <div className="text-center py-8 sm:py-12">
                <div className="text-4xl sm:text-6xl mb-4">⚡</div>
                <h3 className="success-title text-xl sm:text-2xl font-bold text-emerald-400 mb-4">
                  SIGNAL LOCKED
                </h3>
                <p className="underground-text text-emerald-300 text-base sm:text-lg mb-4">
                  Your drop is now in motion.
                </p>
                <div className="mt-6 flex justify-center">
                  <div className="flex items-center gap-2 text-sm text-emerald-500/80">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="hacker-mono">BEACON TRANSMISSION COMPLETE</span>
                  </div>
                </div>
              </div>
            ) : (
              // Form State
              <>
                {/* Vibe Section */}
                <div className="mb-6 sm:mb-8 p-4 sm:p-6 border border-emerald-500/20 bg-emerald-500/5">
                  <h3 className="underground-title text-lg sm:text-xl font-bold text-emerald-400 mb-4">
                    🔐 VIBE:
                  </h3>
                  <div className="space-y-3 text-sm sm:text-base leading-relaxed">
                    <p className="text-emerald-300/90">
                      A stealth inbound trap. Built for solo tacticians, this weapon sets up a honeytrap for warm leads — without using a sales funnel.
                    </p>
                    <p className="text-emerald-300/90">
                      Works on your Telegram bio, LinkTree, or solo landing page.
                    </p>
                    <p className="text-emerald-300/90">
                      You set the bait, it brings the heat.
                    </p>
                  </div>
                </div>

                {/* What You'll Receive */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="underground-title text-lg sm:text-xl font-bold text-emerald-400 mb-4">
                    📦 YOU'LL RECEIVE:
                  </h3>
                  <div className="space-y-3 text-sm sm:text-base">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-emerald-300/90">A stealth-crafted client interest form (Notion or Burner-based)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-emerald-300/90">Auto-forward to Telegram/Email</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-emerald-300/90">2 custom question formats (choose persona tone)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-emerald-300/90">Frictionless interface, no signup needed</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-emerald-300/90">Delivery in 24hrs (config + link)</span>
                    </div>
                  </div>
                </div>

                {/* Warning Section */}
                <div className="mb-6 sm:mb-8 p-4 border border-orange-500/30 bg-orange-500/5">
                  <h3 className="gatekeeper-text text-orange-400 font-bold mb-2 text-sm sm:text-base">
                    ⚠️ NOT FOR:
                  </h3>
                  <p className="text-orange-300/90 text-sm sm:text-base">
                    Sales closers looking for CRM drip.<br />
                    This is raw inbound bait — minimal, direct, and hot.
                  </p>
                </div>

                {/* Final Word */}
                <div className="mb-6 sm:mb-8 p-4 border border-emerald-500/20 bg-emerald-500/5">
                  <h3 className="underground-title text-lg font-bold text-emerald-400 mb-3">
                    🧨 FINAL WORD:
                  </h3>
                  <div className="space-y-2 text-sm sm:text-base">
                    <p className="text-emerald-300/90">
                      You don't chase clients. You magnetize them.
                    </p>
                    <p className="text-emerald-300/90">
                      This tool flips the script.
                    </p>
                  </div>
                </div>

                {/* Order Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <label className="block text-emerald-400 text-sm font-bold mb-3 tracking-wider">
                      DELIVERY CONTACT (TELEGRAM @HANDLE OR EMAIL) *
                    </label>
                    <input
                      type="text"
                      value={formData.contact}
                      onChange={(e) => handleInputChange('contact', e.target.value)}
                      placeholder="@yourhandle or email"
                      className="w-full bg-black/50 border-2 border-emerald-500/30 focus:border-emerald-500 text-emerald-300 placeholder-emerald-500/40 p-3 sm:p-4 transition-all duration-200 hacker-mono text-sm"
                      required
                    />
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-emerald-400 text-sm font-bold mb-3 tracking-wider">
                      ADDITIONAL NOTES *
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="e.g. niche, config request, use-case, or anything tactical"
                      className="w-full h-24 bg-black/50 border-2 border-emerald-500/30 focus:border-emerald-500 text-emerald-300 placeholder-emerald-500/40 p-3 sm:p-4 resize-none transition-all duration-200 hacker-mono text-sm"
                      required
                    />
                  </div>

                  {/* Transaction ID */}
                  <div>
                    <label className="block text-emerald-400 text-sm font-bold mb-3 tracking-wider">
                      PASTE YOUR TRANSACTION ID *
                    </label>
                    <input
                      type="text"
                      value={formData.transactionId}
                      onChange={(e) => handleInputChange('transactionId', e.target.value)}
                      placeholder="0x... / paste Solscan or Etherscan hash"
                      className="w-full bg-black/50 border-2 border-emerald-500/30 focus:border-emerald-500 text-emerald-300 placeholder-emerald-500/40 p-3 sm:p-4 transition-all duration-200 hacker-mono text-sm"
                      required
                    />
                  </div>

                  {/* Network Selection & Payment */}
                  <div className="border-t border-emerald-500/20 pt-6">
                    <h3 className="underground-title text-lg font-bold text-emerald-400 mb-4">
                      SECURE THE DROP
                    </h3>
                    
                    {/* Network Selectors */}
                    <div className="flex gap-4 mb-6">
                      <button
                        type="button"
                        onClick={() => setSelectedNetwork('solana')}
                        className={`flex-1 p-3 border-2 transition-all duration-200 ${
                          selectedNetwork === 'solana'
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                            : 'border-emerald-500/30 bg-black/30 text-emerald-400/70 hover:border-emerald-500/50'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <div className={`w-3 h-3 rounded-full border-2 ${
                            selectedNetwork === 'solana' ? 'bg-emerald-500 border-emerald-500' : 'border-emerald-500/50'
                          }`}>
                            {selectedNetwork === 'solana' && <div className="w-1 h-1 bg-white rounded-full m-auto mt-0.5" />}
                          </div>
                          <span className="hacker-mono font-bold">SOLANA</span>
                        </div>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setSelectedNetwork('ethereum')}
                        className={`flex-1 p-3 border-2 transition-all duration-200 ${
                          selectedNetwork === 'ethereum'
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                            : 'border-emerald-500/30 bg-black/30 text-emerald-400/70 hover:border-emerald-500/50'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <div className={`w-3 h-3 rounded-full border-2 ${
                            selectedNetwork === 'ethereum' ? 'bg-emerald-500 border-emerald-500' : 'border-emerald-500/50'
                          }`}>
                            {selectedNetwork === 'ethereum' && <div className="w-1 h-1 bg-white rounded-full m-auto mt-0.5" />}
                          </div>
                          <span className="hacker-mono font-bold">ETHEREUM</span>
                        </div>
                      </button>
                    </div>

                    {/* Payment Address */}
                    <div className="mb-6 p-4 border border-emerald-500/30 bg-emerald-500/5">
                      <p className="text-emerald-400 text-sm mb-3">
                        → Send {selectedNetwork === 'solana' ? 'SOL / USDC / USDT' : 'ETH / USDC / USDT'} to:
                      </p>
                      <div className="flex items-center gap-2 bg-black/50 p-3 border border-emerald-500/20">
                        <code className="flex-1 text-emerald-300 text-xs sm:text-sm break-all hacker-mono">
                          {walletAddresses[selectedNetwork]}
                        </code>
                        <button
                          type="button"
                          onClick={copyAddress}
                          className="p-2 hover:bg-emerald-500/10 transition-colors border border-emerald-500/30 hover:border-emerald-500/60 flex-shrink-0"
                        >
                          {copiedAddress ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-emerald-400" />
                          )}
                        </button>
                      </div>
                      
                      {/* Copy Notification */}
                      {copiedAddress && (
                        <div className="mt-2 text-center">
                          <span className="inline-flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 border border-emerald-500/30">
                            <Check className="w-3 h-3" />
                            Address copied
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.contact.trim() || !formData.notes.trim() || !formData.transactionId.trim()}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-4 text-lg font-bold transition-all duration-200 border-2 border-emerald-500 hover:border-emerald-400 disabled:border-gray-500 active:scale-95 hacker-mono"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>DEPLOYING ORDER...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-3">
                          <span className="text-xl">🚀</span>
                          <span>DEPLOY ORDER</span>
                        </div>
                      )}
                    </button>

                    {/* Bottom Warning */}
                    <div className="mt-4 text-center">
                      <p className="text-emerald-400/80 text-xs sm:text-sm mb-3">
                        ⚠️ Send payment, drop the hash, and deploy your order.
                      </p>
                      
                      {/* Delivery Notice */}
                      <div className="mt-4 p-3 border border-emerald-500/20 bg-emerald-500/5">
                        <p className="text-emerald-300/90 text-xs sm:text-sm leading-relaxed">
                          <strong>YOUR GHOST LEAD BEACON WILL BE DELIVERED IN 24 HOURS.</strong><br />
                          All transactions are reviewed manually. This is not a casual checkout.
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Fixed Footer Status */}
        <div className="relative z-10 flex justify-between items-center p-3 sm:p-4 border-t border-emerald-500/20 flex-shrink-0">
          <div className="text-xs hacker-mono text-emerald-500/60">
            STEALTH MAGNET
          </div>
          <div className="text-xs hacker-mono text-emerald-500/60">
            $59 • INBOUND TRAP
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

        /* Beacon-style scrollbar */
        .beacon-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(16, 185, 129, 0.6) rgba(0, 0, 0, 0.3);
          overscroll-behavior: contain;
          scroll-behavior: smooth;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .beacon-scroll::-webkit-scrollbar {
          width: 8px;
        }

        .beacon-scroll::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-left: 1px solid rgba(16, 185, 129, 0.2);
        }

        .beacon-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, 
            rgba(16, 185, 129, 0.8) 0%, 
            rgba(16, 185, 129, 0.6) 50%, 
            rgba(16, 185, 129, 0.8) 100%
          );
          border-radius: 0;
          border: 1px solid rgba(16, 185, 129, 0.3);
          box-shadow: 
            inset 0 0 2px rgba(16, 185, 129, 0.5),
            0 0 4px rgba(16, 185, 129, 0.2);
        }

        .beacon-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, 
            rgba(16, 185, 129, 1) 0%, 
            rgba(16, 185, 129, 0.8) 50%, 
            rgba(16, 185, 129, 1) 100%
          );
          box-shadow: 
            inset 0 0 3px rgba(16, 185, 129, 0.8),
            0 0 6px rgba(16, 185, 129, 0.4);
        }

        .beacon-scroll::-webkit-scrollbar-thumb:active {
          background: rgba(16, 185, 129, 1);
          box-shadow: 
            inset 0 0 4px rgba(16, 185, 129, 1),
            0 0 8px rgba(16, 185, 129, 0.6);
        }

        /* Mobile scroll optimization */
        @media (max-width: 768px) {
          .beacon-scroll {
            -webkit-overflow-scrolling: touch;
            overscroll-behavior-y: contain;
          }
        }

        /* Prevent text selection during scroll */
        .beacon-scroll:active {
          user-select: none;
          -webkit-user-select: none;
        }
      `}</style>
    </div>
  );
};