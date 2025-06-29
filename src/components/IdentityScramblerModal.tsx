import React, { useState, useEffect } from 'react';
import { X, Copy, Check } from 'lucide-react';

interface IdentityScramblerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IdentityScramblerModal: React.FC<IdentityScramblerModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    contact: '',
    notes: '',
    transactionId: ''
  });
  const [selectedNetwork, setSelectedNetwork] = useState<'solana' | 'ethereum'>('solana');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Wallet addresses
  const walletAddresses = {
    solana: 'EB1YQD3mgCP7tuQ7TN4bV5n4CG8YNHt7C3PEbeK5YvrY',
    ethereum: '0x81e14112c10b6384cd0A37E6A1ae68AeCd05474c'
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
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
          tool_name: 'Identity Scrambler',
          contact: formData.contact,
          notes: formData.notes,
          txid: formData.transactionId,
          chain: selectedNetwork
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        setShowToast(true);
        setFormData({ contact: '', notes: '', transactionId: '' });
        setSelectedNetwork('solana');
        
        // Hide toast after 3 seconds
        setTimeout(() => setShowToast(false), 3000);
        
        // Close modal after 4 seconds
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

  if (!isOpen) return null;

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-[60] bg-amber-600 border border-amber-500 text-white px-6 py-3 shadow-lg animate-slide-in">
          <div className="flex items-center gap-3">
            <span className="text-xl">🪙</span>
            <div>
              <div className="font-bold hacker-mono">IDENTITY SCRAMBLED!</div>
              <div className="text-sm opacity-90">Hundred faces activated</div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/95 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal Container - Consistent Mini Pop */}
        <div className="relative w-full max-w-lg max-h-[90vh] bg-black border-2 border-amber-500/40 shadow-2xl shadow-amber-500/20 overflow-hidden">
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

          {/* Scanning Line Effect */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-60 animate-scan-horizontal" />

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between p-4 border-b border-amber-500/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-600/20 border border-amber-500/40 flex items-center justify-center">
                <span className="text-amber-400 text-lg">🪙</span>
              </div>
              <div>
                <h2 className="modal-title text-lg font-bold text-amber-400">
                  IDENTITY SCRAMBLER
                </h2>
                <p className="underground-text text-amber-300/80 text-xs">
                  ONE ALIAS • HUNDRED FACES • $49
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-amber-500/10 transition-colors border border-amber-500/30 hover:border-amber-500/60"
            >
              <X className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="relative z-10 overflow-y-auto max-h-[calc(90vh-80px)] premium-scroll">
            <div className="p-4">
              {isSuccess ? (
                // Success State
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🪙</div>
                  <h3 className="success-title text-xl font-bold text-amber-400 mb-4">
                    IDENTITY SCRAMBLED
                  </h3>
                  <p className="underground-text text-amber-300 mb-4">
                    Hundred faces activated.
                  </p>
                </div>
              ) : (
                // Form State
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Contact Information */}
                  <div>
                    <label className="block text-amber-400 text-sm font-bold mb-2 tracking-wider">
                      DELIVERY CONTACT *
                    </label>
                    <input
                      type="text"
                      value={formData.contact}
                      onChange={(e) => handleInputChange('contact', e.target.value)}
                      placeholder="@yourhandle or email"
                      className="w-full bg-black/50 border border-amber-500/30 focus:border-amber-500 text-amber-300 placeholder-amber-500/40 p-3 transition-all duration-200 hacker-mono text-sm"
                      required
                    />
                  </div>

                  {/* Scramble Parameters */}
                  <div>
                    <label className="block text-amber-400 text-sm font-bold mb-2 tracking-wider">
                      SCRAMBLE PARAMETERS *
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="e.g. identity types to scramble, alias requirements"
                      className="w-full h-20 bg-black/50 border border-amber-500/30 focus:border-amber-500 text-amber-300 placeholder-amber-500/40 p-3 resize-none transition-all duration-200 hacker-mono text-sm"
                      required
                    />
                  </div>

                  {/* Transaction ID */}
                  <div>
                    <label className="block text-amber-400 text-sm font-bold mb-2 tracking-wider">
                      TRANSACTION ID *
                    </label>
                    <input
                      type="text"
                      value={formData.transactionId}
                      onChange={(e) => handleInputChange('transactionId', e.target.value)}
                      placeholder="0x... / paste hash"
                      className="w-full bg-black/50 border border-amber-500/30 focus:border-amber-500 text-amber-300 placeholder-amber-500/40 p-3 transition-all duration-200 hacker-mono text-sm"
                      required
                    />
                  </div>

                  {/* Network Selection */}
                  <div>
                    <h3 className="underground-title text-sm font-bold text-amber-400 mb-3">
                      SECURE THE DROP
                    </h3>
                    
                    <div className="flex gap-2 mb-4">
                      <button
                        type="button"
                        onClick={() => setSelectedNetwork('solana')}
                        className={`flex-1 p-2 border transition-all duration-200 text-sm ${
                          selectedNetwork === 'solana'
                            ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                            : 'border-amber-500/30 bg-black/30 text-amber-400/70 hover:border-amber-500/50'
                        }`}
                      >
                        <span className="hacker-mono font-bold">SOLANA</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setSelectedNetwork('ethereum')}
                        className={`flex-1 p-2 border transition-all duration-200 text-sm ${
                          selectedNetwork === 'ethereum'
                            ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                            : 'border-amber-500/30 bg-black/30 text-amber-400/70 hover:border-amber-500/50'
                        }`}
                      >
                        <span className="hacker-mono font-bold">ETHEREUM</span>
                      </button>
                    </div>

                    {/* Payment Address */}
                    <div className="mb-4 p-3 border border-amber-500/30 bg-amber-500/5">
                      <p className="text-amber-400 text-xs mb-2">
                        → Send {selectedNetwork === 'solana' ? 'SOL/USDC/USDT' : 'ETH/USDC/USDT'} to:
                      </p>
                      <div className="flex items-center gap-2 bg-black/50 p-2 border border-amber-500/20">
                        <code className="flex-1 text-amber-300 text-xs break-all hacker-mono">
                          {walletAddresses[selectedNetwork]}
                        </code>
                        <button
                          type="button"
                          onClick={copyAddress}
                          className="p-1 hover:bg-amber-500/10 transition-colors border border-amber-500/30 hover:border-amber-500/60"
                        >
                          {copiedAddress ? (
                            <Check className="w-3 h-3 text-amber-400" />
                          ) : (
                            <Copy className="w-3 h-3 text-amber-400" />
                          )}
                        </button>
                      </div>
                      
                      {copiedAddress && (
                        <div className="mt-2 text-center">
                          <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-1 border border-amber-500/30">
                            Address copied
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.contact.trim() || !formData.notes.trim() || !formData.transactionId.trim()}
                      className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-3 font-bold transition-all duration-200 border border-amber-500 hover:border-amber-400 disabled:border-gray-500 active:scale-95 hacker-mono"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>SCRAMBLING...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <span>🪙</span>
                          <span>SCRAMBLE ME</span>
                        </div>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes scan-horizontal {
            0% { left: -100%; }
            100% { left: 100%; }
          }
          
          @keyframes slide-in {
            0% { transform: translateX(100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          
          .animate-scan-horizontal {
            animation: scan-horizontal 3s linear infinite;
          }

          .animate-slide-in {
            animation: slide-in 0.3s ease-out;
          }

          .premium-scroll {
            scrollbar-width: thin;
            scrollbar-color: rgba(245, 158, 11, 0.6) rgba(0, 0, 0, 0.3);
          }

          .premium-scroll::-webkit-scrollbar {
            width: 6px;
          }

          .premium-scroll::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.3);
          }

          .premium-scroll::-webkit-scrollbar-thumb {
            background: rgba(245, 158, 11, 0.6);
            border-radius: 3px;
          }

          .premium-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(245, 158, 11, 0.8);
          }
        `}</style>
      </div>
    </>
  );
};