import React, { useState, useEffect } from 'react';
import { X, Copy, Check } from 'lucide-react';

interface RecessionProofPlaybookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecessionProofPlaybookModal: React.FC<RecessionProofPlaybookModalProps> = ({ isOpen, onClose }) => {
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
        const modalContent = target.closest('.playbook-scroll');
        
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
          tool_name: 'Recession-Proof Playbook OS',
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
      <div className="relative w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] bg-black border-2 border-amber-500/40 shadow-2xl shadow-amber-500/20 overflow-hidden flex flex-col">
        {/* Amber Background Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* Amber Scanning Line Effect */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-60 animate-scan-horizontal" />

        {/* Fixed Header */}
        <div className="relative z-10 flex items-center justify-between p-4 sm:p-6 border-b border-amber-500/30 flex-shrink-0">
          <div className="flex items-center gap-4">
            {/* Custom Recession-Proof Playbook Logo */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-600/20 border border-amber-500/40 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-400">
                <defs>
                  <linearGradient id="playbookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="50%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                  <filter id="playbookGlow">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Survival Shield Base */}
                <path d="M12 2L4 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-8-4z" fill="none" stroke="url(#playbookGradient)" strokeWidth="1.5" opacity="0.8"/>
                
                {/* OS Core System */}
                <rect x="8" y="8" width="8" height="8" rx="1" fill="url(#playbookGradient)" opacity="0.2"/>
                
                {/* Survival Frameworks Grid */}
                <rect x="9" y="9" width="2" height="1" fill="#f59e0b" opacity="0.8"/>
                <rect x="13" y="9" width="2" height="1" fill="#d97706" opacity="0.7"/>
                <rect x="9" y="11" width="2" height="1" fill="#b45309" opacity="0.9"/>
                <rect x="13" y="11" width="2" height="1" fill="#f59e0b" opacity="0.6"/>
                <rect x="9" y="13" width="2" height="1" fill="#d97706" opacity="0.8"/>
                <rect x="13" y="13" width="2" height="1" fill="#b45309" opacity="0.7"/>
                <rect x="9" y="15" width="6" height="0.5" fill="#f59e0b" opacity="0.9"/>
                
                {/* Income Stack Indicators */}
                <circle cx="6" cy="10" r="1" fill="#f59e0b" opacity="0.7" filter="url(#playbookGlow)">
                  <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="18" cy="10" r="1" fill="#d97706" opacity="0.6" filter="url(#playbookGlow)">
                  <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="6" cy="14" r="1" fill="#b45309" opacity="0.8" filter="url(#playbookGlow)">
                  <animate attributeName="opacity" values="0.8;0.25;0.8" dur="1.8s" repeatCount="indefinite"/>
                </circle>
                <circle cx="18" cy="14" r="1" fill="#f59e0b" opacity="0.5" filter="url(#playbookGlow)">
                  <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.2s" repeatCount="indefinite"/>
                </circle>
                
                {/* Recession-Proof Armor Lines */}
                <path d="M7 7l10 0M7 17l10 0" stroke="#f59e0b" strokeWidth="0.5" opacity="0.6"/>
                <path d="M7 7l0 10M17 7l0 10" stroke="#d97706" strokeWidth="0.5" opacity="0.5"/>
                
                {/* Crisis Mode Activation */}
                <circle cx="12" cy="12" r="2" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.8">
                  <animate attributeName="r" values="2;3;2" dur="3s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" repeatCount="indefinite"/>
                </circle>
                
                {/* Survival Mode Pulse */}
                <circle cx="12" cy="12" r="1" fill="#f59e0b" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.4;0.9" dur="1.5s" repeatCount="indefinite"/>
                </circle>
                
                {/* Tactical Grid Overlay */}
                <line x1="4" y1="12" x2="20" y2="12" stroke="#b45309" strokeWidth="0.3" opacity="0.4"/>
                <line x1="12" y1="4" x2="12" y2="20" stroke="#d97706" strokeWidth="0.3" opacity="0.3"/>
              </svg>
            </div>
            <div>
              <h2 className="modal-title text-xl sm:text-2xl font-bold text-amber-400 mb-1">
                RECESSION-PROOF PLAYBOOK OS
              </h2>
              <p className="underground-text text-amber-300/80 text-xs sm:text-sm">
                SURVIVAL OPERATING SYSTEM
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-amber-500/10 transition-colors border border-amber-500/30 hover:border-amber-500/60 flex-shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div 
          className="relative z-10 flex-1 overflow-y-auto playbook-scroll"
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
                <h3 className="success-title text-xl sm:text-2xl font-bold text-amber-400 mb-4">
                  SIGNAL LOCKED
                </h3>
                <p className="underground-text text-amber-300 text-base sm:text-lg mb-4">
                  Your drop is now in motion.
                </p>
                <div className="mt-6 flex justify-center">
                  <div className="flex items-center gap-2 text-sm text-amber-500/80">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                    <span className="hacker-mono">SURVIVAL TRANSMISSION COMPLETE</span>
                  </div>
                </div>
              </div>
            ) : (
              // Form State
              <>
                {/* Vibe Section */}
                <div className="mb-6 sm:mb-8 p-4 sm:p-6 border border-amber-500/20 bg-amber-500/5">
                  <h3 className="underground-title text-lg sm:text-xl font-bold text-amber-400 mb-4">
                    🔐 VIBE:
                  </h3>
                  <div className="space-y-3 text-sm sm:text-base leading-relaxed">
                    <p className="text-amber-300/90">
                      Built for solo operators who want an internal system to survive droughts and strike fast.
                    </p>
                    <p className="text-amber-300/90">
                      This isn't a course — it's a tactical OS. Inside: client plays, outreach angles, backup offers, and crisis-mode systems.
                    </p>
                    <p className="text-amber-300/90">
                      Operate like a recession's already hit.
                    </p>
                  </div>
                </div>

                {/* What You'll Receive */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="underground-title text-lg sm:text-xl font-bold text-amber-400 mb-4">
                    📦 YOU'LL RECEIVE:
                  </h3>
                  <div className="space-y-3 text-sm sm:text-base">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-amber-300/90">Complete Notion OS (10+ frameworks inside)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-amber-300/90">Battle-tested offer scripts + outreach templates</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-amber-300/90">Lead vault + income tracker</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-amber-300/90">High-speed actionboard (auto-prioritized)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-amber-300/90">Includes Degen Survival Mode module</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-amber-300/90">Delivered within 24–48 hours</span>
                    </div>
                  </div>
                </div>

                {/* Warning Section */}
                <div className="mb-6 sm:mb-8 p-4 border border-orange-500/30 bg-orange-500/5">
                  <h3 className="gatekeeper-text text-orange-400 font-bold mb-2 text-sm sm:text-base">
                    ⚠️ NOT FOR:
                  </h3>
                  <p className="text-orange-300/90 text-sm sm:text-base">
                    Gumroad surfers and info collectors.<br />
                    This is for builders, not browsers.
                  </p>
                </div>

                {/* Final Word */}
                <div className="mb-6 sm:mb-8 p-4 border border-amber-500/20 bg-amber-500/5">
                  <h3 className="underground-title text-lg font-bold text-amber-400 mb-3">
                    🧨 FINAL WORD:
                  </h3>
                  <div className="space-y-2 text-sm sm:text-base">
                    <p className="text-amber-300/90">
                      Keep waiting for stable ground, and you'll sink.
                    </p>
                    <p className="text-amber-300/90">
                      This OS is your parachute and rifle in one.
                    </p>
                  </div>
                </div>

                {/* Order Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <label className="block text-amber-400 text-sm font-bold mb-3 tracking-wider">
                      DELIVERY CONTACT (TELEGRAM @HANDLE OR EMAIL) *
                    </label>
                    <input
                      type="text"
                      value={formData.contact}
                      onChange={(e) => handleInputChange('contact', e.target.value)}
                      placeholder="@yourhandle or email"
                      className="w-full bg-black/50 border-2 border-amber-500/30 focus:border-amber-500 text-amber-300 placeholder-amber-500/40 p-3 sm:p-4 transition-all duration-200 hacker-mono text-sm"
                      required
                    />
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-amber-400 text-sm font-bold mb-3 tracking-wider">
                      ADDITIONAL NOTES *
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="e.g. niche, config request, use-case, or anything tactical"
                      className="w-full h-24 bg-black/50 border-2 border-amber-500/30 focus:border-amber-500 text-amber-300 placeholder-amber-500/40 p-3 sm:p-4 resize-none transition-all duration-200 hacker-mono text-sm"
                      required
                    />
                  </div>

                  {/* Transaction ID */}
                  <div>
                    <label className="block text-amber-400 text-sm font-bold mb-3 tracking-wider">
                      PASTE YOUR TRANSACTION ID *
                    </label>
                    <input
                      type="text"
                      value={formData.transactionId}
                      onChange={(e) => handleInputChange('transactionId', e.target.value)}
                      placeholder="0x... / paste Solscan or Etherscan hash"
                      className="w-full bg-black/50 border-2 border-amber-500/30 focus:border-amber-500 text-amber-300 placeholder-amber-500/40 p-3 sm:p-4 transition-all duration-200 hacker-mono text-sm"
                      required
                    />
                  </div>

                  {/* Network Selection & Payment */}
                  <div className="border-t border-amber-500/20 pt-6">
                    <h3 className="underground-title text-lg font-bold text-amber-400 mb-4">
                      SECURE THE DROP
                    </h3>
                    
                    {/* Network Selectors */}
                    <div className="flex gap-4 mb-6">
                      <button
                        type="button"
                        onClick={() => setSelectedNetwork('solana')}
                        className={`flex-1 p-3 border-2 transition-all duration-200 ${
                          selectedNetwork === 'solana'
                            ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                            : 'border-amber-500/30 bg-black/30 text-amber-400/70 hover:border-amber-500/50'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <div className={`w-3 h-3 rounded-full border-2 ${
                            selectedNetwork === 'solana' ? 'bg-amber-500 border-amber-500' : 'border-amber-500/50'
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
                            ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                            : 'border-amber-500/30 bg-black/30 text-amber-400/70 hover:border-amber-500/50'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <div className={`w-3 h-3 rounded-full border-2 ${
                            selectedNetwork === 'ethereum' ? 'bg-amber-500 border-amber-500' : 'border-amber-500/50'
                          }`}>
                            {selectedNetwork === 'ethereum' && <div className="w-1 h-1 bg-white rounded-full m-auto mt-0.5" />}
                          </div>
                          <span className="hacker-mono font-bold">ETHEREUM</span>
                        </div>
                      </button>
                    </div>

                    {/* Payment Address */}
                    <div className="mb-6 p-4 border border-amber-500/30 bg-amber-500/5">
                      <p className="text-amber-400 text-sm mb-3">
                        → Send {selectedNetwork === 'solana' ? 'SOL / USDC / USDT' : 'ETH / USDC / USDT'} to:
                      </p>
                      <div className="flex items-center gap-2 bg-black/50 p-3 border border-amber-500/20">
                        <code className="flex-1 text-amber-300 text-xs sm:text-sm break-all hacker-mono">
                          {walletAddresses[selectedNetwork]}
                        </code>
                        <button
                          type="button"
                          onClick={copyAddress}
                          className="p-2 hover:bg-amber-500/10 transition-colors border border-amber-500/30 hover:border-amber-500/60 flex-shrink-0"
                        >
                          {copiedAddress ? (
                            <Check className="w-4 h-4 text-amber-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-amber-400" />
                          )}
                        </button>
                      </div>
                      
                      {/* Copy Notification */}
                      {copiedAddress && (
                        <div className="mt-2 text-center">
                          <span className="inline-flex items-center gap-2 text-xs text-amber-400 bg-amber-500/10 px-3 py-1 border border-amber-500/30">
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
                      className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-4 text-lg font-bold transition-all duration-200 border-2 border-amber-500 hover:border-amber-400 disabled:border-gray-500 active:scale-95 hacker-mono"
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
                      <p className="text-amber-400/80 text-xs sm:text-sm mb-3">
                        ⚠️ Send payment, drop the hash, and deploy your order.
                      </p>
                      
                      {/* Delivery Notice */}
                      <div className="mt-4 p-3 border border-amber-500/20 bg-amber-500/5">
                        <p className="text-amber-300/90 text-xs sm:text-sm leading-relaxed">
                          <strong>YOUR RECESSION-PROOF PLAYBOOK OS WILL BE DELIVERED IN 24-48 HOURS.</strong><br />
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
        <div className="relative z-10 flex justify-between items-center p-3 sm:p-4 border-t border-amber-500/20 flex-shrink-0">
          <div className="text-xs hacker-mono text-amber-500/60">
            SURVIVAL OS
          </div>
          <div className="text-xs hacker-mono text-amber-500/60">
            $179 • RECESSION-PROOF
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

        /* Playbook-style scrollbar */
        .playbook-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(245, 158, 11, 0.6) rgba(0, 0, 0, 0.3);
          overscroll-behavior: contain;
          scroll-behavior: smooth;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .playbook-scroll::-webkit-scrollbar {
          width: 8px;
        }

        .playbook-scroll::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-left: 1px solid rgba(245, 158, 11, 0.2);
        }

        .playbook-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, 
            rgba(245, 158, 11, 0.8) 0%, 
            rgba(245, 158, 11, 0.6) 50%, 
            rgba(245, 158, 11, 0.8) 100%
          );
          border-radius: 0;
          border: 1px solid rgba(245, 158, 11, 0.3);
          box-shadow: 
            inset 0 0 2px rgba(245, 158, 11, 0.5),
            0 0 4px rgba(245, 158, 11, 0.2);
        }

        .playbook-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, 
            rgba(245, 158, 11, 1) 0%, 
            rgba(245, 158, 11, 0.8) 50%, 
            rgba(245, 158, 11, 1) 100%
          );
          box-shadow: 
            inset 0 0 3px rgba(245, 158, 11, 0.8),
            0 0 6px rgba(245, 158, 11, 0.4);
        }

        .playbook-scroll::-webkit-scrollbar-thumb:active {
          background: rgba(245, 158, 11, 1);
          box-shadow: 
            inset 0 0 4px rgba(245, 158, 11, 1),
            0 0 8px rgba(245, 158, 11, 0.6);
        }

        /* Mobile scroll optimization */
        @media (max-width: 768px) {
          .playbook-scroll {
            -webkit-overflow-scrolling: touch;
            overscroll-behavior-y: contain;
          }
        }

        /* Prevent text selection during scroll */
        .playbook-scroll:active {
          user-select: none;
          -webkit-user-select: none;
        }
      `}</style>
    </div>
  );
};