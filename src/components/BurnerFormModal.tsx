import React, { useState, useEffect } from 'react';
import { X, Copy, Check } from 'lucide-react';

interface BurnerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BurnerFormModal: React.FC<BurnerFormModalProps> = ({ isOpen, onClose }) => {
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
        const modalContent = target.closest('.burner-scroll');
        
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
          tool_name: 'Burner Form Link',
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
      <div className="relative w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] bg-black border-2 border-yellow-500/40 shadow-2xl shadow-yellow-500/20 overflow-hidden flex flex-col">
        {/* Yellow Background Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(234, 179, 8, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(234, 179, 8, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* Yellow Scanning Line Effect */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-60 animate-scan-horizontal" />

        {/* Fixed Header */}
        <div className="relative z-10 flex items-center justify-between p-4 sm:p-6 border-b border-yellow-500/30 flex-shrink-0">
          <div className="flex items-center gap-4">
            {/* Custom Burner Form Logo */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-600/20 border border-yellow-500/40 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-yellow-400">
                <defs>
                  <linearGradient id="burnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#eab308" />
                    <stop offset="50%" stopColor="#ca8a04" />
                    <stop offset="100%" stopColor="#a16207" />
                  </linearGradient>
                  <filter id="burnerGlow">
                    <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Form Document Shape */}
                <rect x="5" y="3" width="14" height="18" rx="2" fill="none" stroke="url(#burnerGradient)" strokeWidth="1.5" opacity="0.8"/>
                
                {/* Form Fields */}
                <rect x="7" y="6" width="10" height="1.5" fill="url(#burnerGradient)" opacity="0.6" rx="0.5"/>
                <rect x="7" y="9" width="8" height="1.5" fill="url(#burnerGradient)" opacity="0.7" rx="0.5"/>
                <rect x="7" y="12" width="10" height="1.5" fill="url(#burnerGradient)" opacity="0.5" rx="0.5"/>
                <rect x="7" y="15" width="6" height="1.5" fill="url(#burnerGradient)" opacity="0.8" rx="0.5"/>
                
                {/* Burner Flame Effect */}
                <path d="M20 8c0-1.5-1-2.5-2-2.5s-2 1-2 2.5c0 1 0.5 1.5 1 2 0.5-0.5 1-1 1-2 0.5 0.5 1.5 0.5 2 0z" 
                      fill="url(#burnerGradient)" 
                      opacity="0.9" 
                      filter="url(#burnerGlow)">
                  <animateTransform 
                    attributeName="transform" 
                    type="scale" 
                    values="1;1.1;1" 
                    dur="2s" 
                    repeatCount="indefinite"/>
                </path>
                
                {/* Smoke Particles */}
                <circle cx="19" cy="5" r="0.5" fill="#eab308" opacity="0.6">
                  <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.8s" repeatCount="indefinite"/>
                  <animateTransform attributeName="transform" type="translate" values="0,0; -1,-2; 0,0" dur="1.8s" repeatCount="indefinite"/>
                </circle>
                <circle cx="21" cy="6" r="0.3" fill="#ca8a04" opacity="0.4">
                  <animate attributeName="opacity" values="0.4;0.05;0.4" dur="2.2s" repeatCount="indefinite"/>
                  <animateTransform attributeName="transform" type="translate" values="0,0; 1,-3; 0,0" dur="2.2s" repeatCount="indefinite"/>
                </circle>
                
                {/* Ghost Trail Lines */}
                <line x1="3" y1="10" x2="1" y2="8" stroke="#eab308" strokeWidth="0.5" opacity="0.3"/>
                <line x1="3" y1="14" x2="1" y2="16" stroke="#ca8a04" strokeWidth="0.5" opacity="0.4"/>
                <line x1="21" y1="12" x2="23" y2="10" stroke="#a16207" strokeWidth="0.5" opacity="0.2"/>
              </svg>
            </div>
            <div>
              <h2 className="modal-title text-xl sm:text-2xl font-bold text-yellow-400 mb-1">
                BURNER FORM LINK
              </h2>
              <p className="underground-text text-yellow-300/80 text-xs sm:text-sm">
                GHOST CAPTURE
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-yellow-500/10 transition-colors border border-yellow-500/30 hover:border-yellow-500/60 flex-shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div 
          className="relative z-10 flex-1 overflow-y-auto burner-scroll"
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
                <h3 className="success-title text-xl sm:text-2xl font-bold text-yellow-400 mb-4">
                  SIGNAL LOCKED
                </h3>
                <p className="underground-text text-yellow-300 text-base sm:text-lg mb-4">
                  Your drop is now in motion.
                </p>
                <div className="mt-6 flex justify-center">
                  <div className="flex items-center gap-2 text-sm text-yellow-500/80">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                    <span className="hacker-mono">BURNER TRANSMISSION COMPLETE</span>
                  </div>
                </div>
              </div>
            ) : (
              // Form State
              <>
                {/* Vibe Section */}
                <div className="mb-6 sm:mb-8 p-4 sm:p-6 border border-yellow-500/20 bg-yellow-500/5">
                  <h3 className="underground-title text-lg sm:text-xl font-bold text-yellow-400 mb-4">
                    🔐 VIBE:
                  </h3>
                  <div className="space-y-3 text-sm sm:text-base leading-relaxed">
                    <p className="text-yellow-300/90">
                      You're not building intake portals — you're dropping burner traps.
                    </p>
                    <p className="text-yellow-300/90">
                      Deploy slick, no-trace forms that collect input without revealing anything.
                    </p>
                    <p className="text-yellow-300/90">
                      No logins, no cookies, no bullshit. Just frictionless capture for ghost tacticians.
                    </p>
                  </div>
                </div>

                {/* What You'll Receive */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="underground-title text-lg sm:text-xl font-bold text-yellow-400 mb-4">
                    📦 YOU'LL RECEIVE:
                  </h3>
                  <div className="space-y-3 text-sm sm:text-base">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-yellow-300/90">1 fully deployable anonymous form (Tally or custom HTML)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-yellow-300/90">Clean custom styling — zero logos, minimalist vibe</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-yellow-300/90">Optional trigger setup: auto-email, webhook ping, or Zapier route</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-yellow-300/90">100% burner: no account needed, no tracking</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-yellow-300/90">Delivered within 24 hours after confirmed payment</span>
                    </div>
                  </div>
                </div>

                {/* Warning Section */}
                <div className="mb-6 sm:mb-8 p-4 border border-red-500/30 bg-red-500/5">
                  <h3 className="gatekeeper-text text-red-400 font-bold mb-2 text-sm sm:text-base">
                    ⚠️ NOT FOR:
                  </h3>
                  <p className="text-red-300/90 text-sm sm:text-base">
                    CRM lovers.<br />
                    Data hoarders.<br />
                    Anyone asking "Where's the dashboard?"<br />
                    This is built for signal catchers — not spreadsheet managers.
                  </p>
                </div>

                {/* Final Word */}
                <div className="mb-6 sm:mb-8 p-4 border border-yellow-500/20 bg-yellow-500/5">
                  <h3 className="underground-title text-lg font-bold text-yellow-400 mb-3">
                    🧨 FINAL WORD:
                  </h3>
                  <div className="space-y-2 text-sm sm:text-base">
                    <p className="text-yellow-300/90">
                      When you need clean input without a digital trail — this is your move.
                    </p>
                    <p className="text-yellow-300/90">
                      Spin it, route it, ghost out.
                    </p>
                    <p className="text-yellow-300/90">
                      No ID. No footprint. Just results.
                    </p>
                  </div>
                </div>

                {/* Order Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <label className="block text-yellow-400 text-sm font-bold mb-3 tracking-wider">
                      DELIVERY CONTACT (TELEGRAM @HANDLE OR EMAIL) *
                    </label>
                    <input
                      type="text"
                      value={formData.contact}
                      onChange={(e) => handleInputChange('contact', e.target.value)}
                      placeholder="@yourhandle or email"
                      className="w-full bg-black/50 border-2 border-yellow-500/30 focus:border-yellow-500 text-yellow-300 placeholder-yellow-500/40 p-3 sm:p-4 transition-all duration-200 hacker-mono text-sm"
                      required
                    />
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-yellow-400 text-sm font-bold mb-3 tracking-wider">
                      ADDITIONAL NOTES *
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="e.g. niche, config request, use-case, or anything tactical"
                      className="w-full h-24 bg-black/50 border-2 border-yellow-500/30 focus:border-yellow-500 text-yellow-300 placeholder-yellow-500/40 p-3 sm:p-4 resize-none transition-all duration-200 hacker-mono text-sm"
                      required
                    />
                  </div>

                  {/* Transaction ID */}
                  <div>
                    <label className="block text-yellow-400 text-sm font-bold mb-3 tracking-wider">
                      PASTE YOUR TRANSACTION ID *
                    </label>
                    <input
                      type="text"
                      value={formData.transactionId}
                      onChange={(e) => handleInputChange('transactionId', e.target.value)}
                      placeholder="0x... / paste Solscan or Etherscan hash"
                      className="w-full bg-black/50 border-2 border-yellow-500/30 focus:border-yellow-500 text-yellow-300 placeholder-yellow-500/40 p-3 sm:p-4 transition-all duration-200 hacker-mono text-sm"
                      required
                    />
                  </div>

                  {/* Network Selection & Payment */}
                  <div className="border-t border-yellow-500/20 pt-6">
                    <h3 className="underground-title text-lg font-bold text-yellow-400 mb-4">
                      SECURE THE DROP
                    </h3>
                    
                    {/* Network Selectors */}
                    <div className="flex gap-4 mb-6">
                      <button
                        type="button"
                        onClick={() => setSelectedNetwork('solana')}
                        className={`flex-1 p-3 border-2 transition-all duration-200 ${
                          selectedNetwork === 'solana'
                            ? 'border-yellow-500 bg-yellow-500/10 text-yellow-300'
                            : 'border-yellow-500/30 bg-black/30 text-yellow-400/70 hover:border-yellow-500/50'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <div className={`w-3 h-3 rounded-full border-2 ${
                            selectedNetwork === 'solana' ? 'bg-yellow-500 border-yellow-500' : 'border-yellow-500/50'
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
                            ? 'border-yellow-500 bg-yellow-500/10 text-yellow-300'
                            : 'border-yellow-500/30 bg-black/30 text-yellow-400/70 hover:border-yellow-500/50'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <div className={`w-3 h-3 rounded-full border-2 ${
                            selectedNetwork === 'ethereum' ? 'bg-yellow-500 border-yellow-500' : 'border-yellow-500/50'
                          }`}>
                            {selectedNetwork === 'ethereum' && <div className="w-1 h-1 bg-white rounded-full m-auto mt-0.5" />}
                          </div>
                          <span className="hacker-mono font-bold">ETHEREUM</span>
                        </div>
                      </button>
                    </div>

                    {/* Payment Address */}
                    <div className="mb-6 p-4 border border-yellow-500/30 bg-yellow-500/5">
                      <p className="text-yellow-400 text-sm mb-3">
                        → Send {selectedNetwork === 'solana' ? 'SOL / USDC / USDT' : 'ETH / USDC / USDT'} to:
                      </p>
                      <div className="flex items-center gap-2 bg-black/50 p-3 border border-yellow-500/20">
                        <code className="flex-1 text-yellow-300 text-xs sm:text-sm break-all hacker-mono">
                          {walletAddresses[selectedNetwork]}
                        </code>
                        <button
                          type="button"
                          onClick={copyAddress}
                          className="p-2 hover:bg-yellow-500/10 transition-colors border border-yellow-500/30 hover:border-yellow-500/60 flex-shrink-0"
                        >
                          {copiedAddress ? (
                            <Check className="w-4 h-4 text-yellow-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-yellow-400" />
                          )}
                        </button>
                      </div>
                      
                      {/* Copy Notification */}
                      {copiedAddress && (
                        <div className="mt-2 text-center">
                          <span className="inline-flex items-center gap-2 text-xs text-yellow-400 bg-yellow-500/10 px-3 py-1 border border-yellow-500/30">
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
                      className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-4 text-lg font-bold transition-all duration-200 border-2 border-yellow-500 hover:border-yellow-400 disabled:border-gray-500 active:scale-95 hacker-mono"
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
                      <p className="text-yellow-400/80 text-xs sm:text-sm mb-3">
                        ⚠️ Send payment, drop the hash, and deploy your order.
                      </p>
                      
                      {/* Delivery Notice */}
                      <div className="mt-4 p-3 border border-yellow-500/20 bg-yellow-500/5">
                        <p className="text-yellow-300/90 text-xs sm:text-sm leading-relaxed">
                          <strong>YOUR BURNER LINK WILL BE DELIVERED IN 24 HOURS.</strong><br />
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
        <div className="relative z-10 flex justify-between items-center p-3 sm:p-4 border-t border-yellow-500/20 flex-shrink-0">
          <div className="text-xs hacker-mono text-yellow-500/60">
            GHOST CAPTURE
          </div>
          <div className="text-xs hacker-mono text-yellow-500/60">
            $29 • ZERO TRACE
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

        /* Burner-style scrollbar */
        .burner-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(234, 179, 8, 0.6) rgba(0, 0, 0, 0.3);
          overscroll-behavior: contain;
          scroll-behavior: smooth;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .burner-scroll::-webkit-scrollbar {
          width: 8px;
        }

        .burner-scroll::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-left: 1px solid rgba(234, 179, 8, 0.2);
        }

        .burner-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, 
            rgba(234, 179, 8, 0.8) 0%, 
            rgba(234, 179, 8, 0.6) 50%, 
            rgba(234, 179, 8, 0.8) 100%
          );
          border-radius: 0;
          border: 1px solid rgba(234, 179, 8, 0.3);
          box-shadow: 
            inset 0 0 2px rgba(234, 179, 8, 0.5),
            0 0 4px rgba(234, 179, 8, 0.2);
        }

        .burner-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, 
            rgba(234, 179, 8, 1) 0%, 
            rgba(234, 179, 8, 0.8) 50%, 
            rgba(234, 179, 8, 1) 100%
          );
          box-shadow: 
            inset 0 0 3px rgba(234, 179, 8, 0.8),
            0 0 6px rgba(234, 179, 8, 0.4);
        }

        .burner-scroll::-webkit-scrollbar-thumb:active {
          background: rgba(234, 179, 8, 1);
          box-shadow: 
            inset 0 0 4px rgba(234, 179, 8, 1),
            0 0 8px rgba(234, 179, 8, 0.6);
        }

        /* Mobile scroll optimization */
        @media (max-width: 768px) {
          .burner-scroll {
            -webkit-overflow-scrolling: touch;
            overscroll-behavior-y: contain;
          }
        }

        /* Prevent text selection during scroll */
        .burner-scroll:active {
          user-select: none;
          -webkit-user-select: none;
        }
      `}</style>
    </div>
  );
};