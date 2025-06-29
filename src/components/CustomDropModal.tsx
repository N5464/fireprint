import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CustomDropModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomDropModal: React.FC<CustomDropModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    contact: '',
    request: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.contact.trim() || !formData.request.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://hook.eu2.make.com/4ohqx7u6sirog9rlxpkmy4y16lwpr7a8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: formData.request,
          contact: formData.contact
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        // Reset form
        setFormData({ contact: '', request: '' });
        // Auto close after 3 seconds
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 3000);
      } else {
        throw new Error('Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      // You could add error handling UI here
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Container - Fixed Height with Scroll */}
      <div className="relative w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] bg-black border-2 border-green-500/30 shadow-2xl shadow-green-500/20 overflow-hidden flex flex-col">
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

        {/* Scanning Line Effect */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-60 animate-scan-horizontal" />

        {/* Fixed Header */}
        <div className="relative z-10 flex items-center justify-between p-4 sm:p-6 border-b border-green-500/20 flex-shrink-0">
          <div>
            <h2 className="modal-title text-xl sm:text-2xl font-bold text-green-500 mb-1 sm:mb-2">
              🩸 CUSTOM DROP REQUEST
            </h2>
            <p className="underground-text text-green-400 text-xs sm:text-sm">
              MILITARY-GRADE SOLUTIONS ON DEMAND
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-green-500/10 transition-colors border border-green-500/30 hover:border-green-500/60 flex-shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="relative z-10 flex-1 overflow-y-auto military-scroll">
          <div className="p-4 sm:p-6">
            {isSuccess ? (
              // Success State
              <div className="text-center py-8 sm:py-12">
                <div className="text-4xl sm:text-6xl mb-4">🔥</div>
                <h3 className="success-title text-xl sm:text-2xl font-bold text-green-500 mb-4">
                  REQUEST FIRED
                </h3>
                <p className="underground-text text-green-400 text-base sm:text-lg">
                  You'll hear back from the shadows.
                </p>
                <div className="mt-6 flex justify-center">
                  <div className="flex items-center gap-2 text-sm text-green-500/80">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="hacker-mono">TRANSMISSION COMPLETE</span>
                  </div>
                </div>
              </div>
            ) : (
              // Form State
              <>
                {/* Description */}
                <div className="mb-6 sm:mb-8">
                  <p className="underground-text text-green-400 text-base sm:text-lg mb-3 sm:mb-4 leading-relaxed">
                    Need something built, automated, or unlocked?<br />
                    Drop your request below.
                  </p>
                  <p className="underground-text text-green-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                    I'll review it and deliver what you need — clean, lethal, exactly as required.
                  </p>
                  <div className="gatekeeper-text text-red-400 text-xs sm:text-sm font-bold tracking-wider">
                    NO FORMS. NO LOGINS. JUST THE HEAT.
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Request Description */}
                  <div>
                    <label className="block text-green-500 text-xs sm:text-sm font-bold mb-2 sm:mb-3 tracking-wider">
                      DESCRIBE WHAT YOU NEED*
                    </label>
                    <textarea
                      value={formData.request}
                      onChange={(e) => handleInputChange('request', e.target.value)}
                      placeholder="e.g. I need a bot that monitors whale wallets and sends alerts to my Telegram when they move $100k+ in ETH..."
                      className="w-full h-24 sm:h-32 bg-black/50 border-2 border-green-500/30 focus:border-green-500 text-green-400 placeholder-green-500/40 p-3 sm:p-4 resize-none transition-all duration-200 hacker-mono text-xs sm:text-sm leading-relaxed"
                      required
                    />
                  </div>

                  {/* Contact Information */}
                  <div>
                    <label className="block text-green-500 text-xs sm:text-sm font-bold mb-2 sm:mb-3 tracking-wider">
                      TELEGRAM, EMAIL OR WALLET
                    </label>
                    <input
                      type="text"
                      value={formData.contact}
                      onChange={(e) => handleInputChange('contact', e.target.value)}
                      placeholder="@yourhandle, email@domain.com, or wallet address"
                      className="w-full bg-black/50 border-2 border-green-500/30 focus:border-green-500 text-green-400 placeholder-green-500/40 p-3 sm:p-4 transition-all duration-200 hacker-mono text-xs sm:text-sm"
                      required
                    />
                    <p className="underground-text text-green-500/60 text-xs mt-2">
                      I'll respond via same channel you submit from.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3 sm:pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.contact.trim() || !formData.request.trim()}
                      className="military-button-primary group relative overflow-hidden w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold transition-all duration-200 border-2 border-red-500 hover:border-red-400 disabled:border-gray-500 active:scale-95"
                    >
                      {/* Button Background Effects */}
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 bg-red-400/20 opacity-0 group-active:opacity-100 transition-opacity duration-100"></div>
                      
                      {/* Button Content */}
                      <span className="relative z-10 inline-flex items-center justify-center gap-2 sm:gap-3">
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span className="tracking-wider">FIRING REQUEST...</span>
                          </>
                        ) : (
                          <>
                            <span className="text-lg sm:text-xl group-hover:animate-pulse group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] transition-all duration-200">🔥</span>
                            <span className="tracking-wider">FIRE THIS REQUEST</span>
                          </>
                        )}
                      </span>
                      
                      {/* Click Ripple Effect */}
                      <div className="absolute inset-0 opacity-0 group-active:opacity-100 bg-white/20 animate-ping"></div>
                    </button>
                  </div>

                  {/* Footer Note */}
                  <div className="pt-4 sm:pt-6 border-t border-green-500/20">
                    <p className="underground-text text-green-500/80 text-xs sm:text-sm text-center leading-relaxed">
                      CUSTOM DROPS ARE REVIEWED MANUALLY.<br />
                      Expect a response within 24h with pricing and delivery timeline.
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Fixed Footer Status Indicators */}
        <div className="relative z-10 flex justify-between items-center p-3 sm:p-4 border-t border-green-500/20 flex-shrink-0">
          <div className="text-xs hacker-mono text-green-500/40">
            SECURE CHANNEL
          </div>
          <div className="text-xs hacker-mono text-green-500/40">
            ENCRYPTED
          </div>
        </div>

        {/* Scroll Indicator - Shows when content is scrollable */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-30 pointer-events-none">
          <div className="flex flex-col items-center gap-1">
            <div className="w-1 h-8 bg-gradient-to-b from-transparent via-green-500 to-transparent animate-pulse" />
            <div className="text-xs hacker-mono text-green-500 rotate-90 whitespace-nowrap">SCROLL</div>
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

        /* Military-style scrollbar */
        .military-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(34, 197, 94, 0.6) rgba(0, 0, 0, 0.3);
        }

        .military-scroll::-webkit-scrollbar {
          width: 8px;
        }

        .military-scroll::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-left: 1px solid rgba(34, 197, 94, 0.2);
        }

        .military-scroll::-webkit-scrollbar-thumb {
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

        .military-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, 
            rgba(34, 197, 94, 1) 0%, 
            rgba(34, 197, 94, 0.8) 50%, 
            rgba(34, 197, 94, 1) 100%
          );
          box-shadow: 
            inset 0 0 3px rgba(34, 197, 94, 0.8),
            0 0 6px rgba(34, 197, 94, 0.4);
        }

        .military-scroll::-webkit-scrollbar-thumb:active {
          background: rgba(34, 197, 94, 1);
          box-shadow: 
            inset 0 0 4px rgba(34, 197, 94, 1),
            0 0 8px rgba(34, 197, 94, 0.6);
        }

        /* Smooth scrolling behavior */
        .military-scroll {
          scroll-behavior: smooth;
          overflow-y: auto;
          overflow-x: hidden;
        }

        /* Mobile scroll optimization */
        @media (max-width: 768px) {
          .military-scroll {
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </div>
  );
};