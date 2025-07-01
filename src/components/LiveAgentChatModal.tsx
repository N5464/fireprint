import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Minimize2, Maximize2 } from 'lucide-react';

interface LiveAgentChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'fireghost';
  timestamp: Date;
}

export const LiveAgentChatModal: React.FC<LiveAgentChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Define initial greeting message as a constant
  const initialGreetingMessage: ChatMessage = {
    id: 'initial',
    text: 'FIREGHOST operational. State your tactical requirements.',
    sender: 'fireghost',
    timestamp: new Date()
  };

  // Enhanced sanitize function to handle backslashes and control characters
  const sanitizeText = (text: string): string => {
    // First, escape any backslashes that are not followed by valid JSON escape characters
    // Valid JSON escape sequences: \", \\, \/, \b, \f, \n, \r, \t, \uXXXX
    let sanitized = text.replace(/\\(?!["\\/bfnrt]|u[0-9a-fA-F]{4})/g, '\\\\');
    
    // Then remove all ASCII control characters (0x00-0x1F) and C1 control characters (0x7F-0x9F)
    // This includes newlines, carriage returns, tabs, and other control characters
    sanitized = sanitized.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
    
    return sanitized;
  };

  // Enhanced body scroll lock with proper mobile handling
  useEffect(() => {
    if (isOpen && !isMinimized) {
      // Store original values
      const originalStyle = window.getComputedStyle(document.body);
      const originalOverflow = originalStyle.overflow;
      const originalPosition = originalStyle.position;
      const originalTop = originalStyle.top;
      const originalWidth = originalStyle.width;
      
      // Get current scroll position
      const scrollY = window.scrollY;
      
      // Lock body scroll with enhanced mobile support
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.height = '100vh';
      
      // Prevent zoom on iOS
      document.body.style.touchAction = 'none';
      
      // Store scroll position for restoration
      document.body.setAttribute('data-scroll-y', scrollY.toString());
      
      // Prevent scroll chaining and overscroll behavior
      const preventScroll = (e: TouchEvent) => {
        // Allow scrolling within the chat modal
        const target = e.target as HTMLElement;
        const chatModal = target.closest('.fireghost-chat-modal');
        const chatScroll = target.closest('.fireghost-scroll');
        
        if (!chatModal) {
          e.preventDefault();
          return false;
        }
        
        // If we're in the scrollable area, handle scroll boundaries
        if (chatScroll) {
          const { scrollTop, scrollHeight, clientHeight } = chatScroll;
          const isAtTop = scrollTop === 0;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight;
          
          // Get touch movement direction
          const touch = e.touches[0];
          const startY = parseFloat(chatScroll.getAttribute('data-start-y') || '0');
          const deltaY = touch.clientY - startY;
          
          // Prevent overscroll at boundaries
          if ((isAtTop && deltaY > 0) || (isAtBottom && deltaY < 0)) {
            e.preventDefault();
            return false;
          }
        }
      };
      
      const handleTouchStart = (e: TouchEvent) => {
        const target = e.target as HTMLElement;
        const chatScroll = target.closest('.fireghost-scroll');
        if (chatScroll && e.touches.length === 1) {
          chatScroll.setAttribute('data-start-y', e.touches[0].clientY.toString());
        }
      };
      
      // Add touch event listeners
      document.addEventListener('touchmove', preventScroll, { passive: false });
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      
      // Cleanup function
      return () => {
        // Remove event listeners
        document.removeEventListener('touchmove', preventScroll);
        document.removeEventListener('touchstart', handleTouchStart);
        
        // Restore body styles
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;
        document.body.style.height = '';
        document.body.style.touchAction = '';
        
        // Restore scroll position
        const scrollY = parseInt(document.body.getAttribute('data-scroll-y') || '0');
        document.body.removeAttribute('data-scroll-y');
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen, isMinimized]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, isMinimized]);

  // Initialize with FIREGHOST greeting when modal opens
  useEffect(() => {
    if (isOpen && messages.length === 0 && !conversationStarted) {
      setMessages([initialGreetingMessage]);
    }
  }, [isOpen, messages.length, conversationStarted]);

  // Reset chat state when modal closes
  const handleModalClose = () => {
    setConversationStarted(false);
    setMessages([initialGreetingMessage]);
    setInputText('');
    setIsTyping(false);
    onClose();
  };

  // Send message to webhook and get AI response
  const sendToWebhook = async (userMessage: string): Promise<string> => {
    try {
      // Sanitize the message before sending to prevent JSON parsing errors
      const sanitizedMessage = sanitizeText(userMessage);
      
      const response = await fetch('https://hook.eu2.make.com/mphxjc6bt1gm3gkf6f2pcuciyjrky475', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: sanitizedMessage,
          timestamp: new Date().toISOString(),
          session_id: `session_${Date.now()}`,
          agent: 'fireghost'
        })
      });

      if (response.ok) {
        // Get the response text first
        const responseText = await response.text();
        
        // Sanitize the response text to remove control characters and fix backslashes
        const sanitizedResponseText = sanitizeText(responseText);
        
        // Now parse the sanitized JSON
        const data = JSON.parse(sanitizedResponseText);
        return data.response || 'Signal received. Processing your request.';
      } else {
        throw new Error('Webhook response failed');
      }
    } catch (error) {
      console.error('Webhook error:', error);
      // Fallback response if webhook fails
      return 'Communication disrupted. Switching to backup protocols. Try again.';
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputText.trim();
    if (!textToSend) return;

    // Sanitize the text before processing
    const sanitizedText = sanitizeText(textToSend);

    // Mark conversation as started
    if (!conversationStarted) {
      setConversationStarted(true);
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: sanitizedText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Send to webhook and get AI response
      const aiResponse = await sendToWebhook(sanitizedText);
      
      const fireghostResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'fireghost',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, fireghostResponse]);

      // Check if this is the end mission response
      if (aiResponse === 'FIREGHOST disengaging. Tactical session complete.') {
        // Give user 2 seconds to read the final message before resetting
        setTimeout(() => {
          setConversationStarted(false);
          setMessages([initialGreetingMessage]);
        }, 2000);
      }
    } catch (error) {
      // Fallback response if webhook fails
      const fallbackResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Systems temporarily offline. Telegram backup: https://t.me/fireprintHQ',
        sender: 'fireghost',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Handle CTA button clicks - directly send the message
  const handleCTAClick = (ctaText: string) => {
    handleSendMessage(ctaText);
  };

  // Handle END MISSION button click - send command but display clean text
  const handleEndMissionClick = () => {
    // Mark conversation as started
    if (!conversationStarted) {
      setConversationStarted(true);
    }

    // Create user message with clean display text
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: 'END MISSION', // Display clean text
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Send the actual command to webhook
    sendToWebhook('END_MISSION_COMMAND').then(aiResponse => {
      const fireghostResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'fireghost',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, fireghostResponse]);

      // Check if this is the end mission response
      if (aiResponse === 'FIREGHOST disengaging. Tactical session complete.') {
        // Give user 2 seconds to read the final message before resetting
        setTimeout(() => {
          setConversationStarted(false);
          setMessages([initialGreetingMessage]);
        }, 2000);
      }
    }).catch(() => {
      // Fallback response if webhook fails
      const fallbackResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Systems temporarily offline. Telegram backup: https://t.me/fireprintHQ',
        sender: 'fireghost',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackResponse]);
    }).finally(() => {
      setIsTyping(false);
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - only show when not minimized */}
      {!isMinimized && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
          onClick={handleModalClose}
        />
      )}
      
      {/* Chat Modal */}
      <div className={`fixed z-50 transition-all duration-300 ease-out fireghost-chat-modal ${
        isMinimized 
          ? 'bottom-4 right-4 w-80 h-12' 
          : 'bottom-4 right-4 w-96 h-[600px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]'
      }`}>
        <div className="w-full h-full bg-black border-2 border-green-500/40 shadow-2xl shadow-green-500/20 overflow-hidden flex flex-col">
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

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between p-3 border-b border-green-500/30 flex-shrink-0">
            <div className="flex items-center gap-3">
              {/* FIREGHOST Logo */}
              <div className="w-8 h-8 bg-green-600/20 border border-green-500/40 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-green-400">
                  <defs>
                    <linearGradient id="fireghostGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="50%" stopColor="#16a34a" />
                      <stop offset="100%" stopColor="#15803d" />
                    </linearGradient>
                    <filter id="fireghostGlow">
                      <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Ghost Body */}
                  <path 
                    d="M12 3C8.5 3 6 5.5 6 9v6c0 1 0.5 2 1.5 2.5L9 19l1.5-1.5L12 19l1.5-1.5L15 19l1.5-1.5C17.5 17 18 16 18 15V9c0-3.5-2.5-6-6-6z" 
                    fill="url(#fireghostGradient)" 
                    opacity="0.9"
                    filter="url(#fireghostGlow)"
                  />
                  
                  {/* Eyes */}
                  <circle cx="9.5" cy="10" r="1" fill="#000" opacity="0.9"/>
                  <circle cx="14.5" cy="10" r="1" fill="#000" opacity="0.9"/>
                  <circle cx="9.5" cy="10" r="0.3" fill="#22c55e" opacity="0.8"/>
                  <circle cx="14.5" cy="10" r="0.3" fill="#22c55e" opacity="0.8"/>
                  
                  {/* Tactical Grid Lines */}
                  <line x1="6" y1="15" x2="18" y2="15" stroke="#22c55e" strokeWidth="0.3" opacity="0.4"/>
                  <line x1="12" y1="3" x2="12" y2="17" stroke="#16a34a" strokeWidth="0.3" opacity="0.3"/>
                </svg>
              </div>
              <div>
                <h3 className="modal-title text-sm font-bold text-green-400">
                  FIREGHOST
                </h3>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="underground-text text-green-300/80 text-xs">
                    OPERATIONAL
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMinimize}
                className="p-1 hover:bg-green-500/10 transition-colors border border-green-500/30 hover:border-green-500/60"
              >
                {isMinimized ? (
                  <Maximize2 className="w-3 h-3 text-green-400" />
                ) : (
                  <Minimize2 className="w-3 h-3 text-green-400" />
                )}
              </button>
              <button
                onClick={handleModalClose}
                className="p-1 hover:bg-green-500/10 transition-colors border border-green-500/30 hover:border-green-500/60"
              >
                <X className="w-3 h-3 text-green-400" />
              </button>
            </div>
          </div>

          {/* Chat Content - only show when not minimized */}
          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-4 fireghost-scroll">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 text-sm ${
                        message.sender === 'user'
                          ? 'bg-green-600/20 border border-green-500/30 text-green-300'
                          : 'bg-gray-800/50 border border-green-500/20 text-green-400'
                      }`}
                    >
                      <p className="underground-text leading-relaxed">{message.text}</p>
                      <div className="mt-1 text-xs text-green-500/60">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-800/50 border border-green-500/20 p-3 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="underground-text text-green-400">FIREGHOST is analyzing</span>
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                          <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                          <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="relative z-10 border-t border-green-500/30 p-3 flex-shrink-0">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="State your tactical requirements..."
                    className="flex-1 bg-black/50 border border-green-500/30 focus:border-green-500 text-green-300 placeholder-green-500/40 p-2 text-sm transition-all duration-200 hacker-mono"
                    disabled={isTyping}
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputText.trim() || isTyping}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-2 transition-all duration-200 border border-green-500 hover:border-green-400 disabled:border-gray-500 active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Conditional Action Buttons */}
                <div className="mt-3">
                  {!conversationStarted ? (
                    // Initial CTA Buttons
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCTAClick('🧠 Choose My Weapon')}
                        disabled={isTyping}
                        className="flex-1 bg-green-600/20 hover:bg-green-600/30 disabled:bg-gray-600/20 text-green-400 px-3 py-2 text-xs font-bold transition-all duration-200 border border-green-500/30 hover:border-green-500/60 disabled:border-gray-500/30 active:scale-95 hacker-mono"
                      >
                        <span className="inline-flex items-center justify-center gap-1">
                          <span>🧠</span>
                          <span>Choose My Weapon</span>
                        </span>
                      </button>
                      
                      <button
                        onClick={() => handleCTAClick('💀 I Need Shadow Gear')}
                        disabled={isTyping}
                        className="flex-1 bg-green-600/20 hover:bg-green-600/30 disabled:bg-gray-600/20 text-green-400 px-3 py-2 text-xs font-bold transition-all duration-200 border border-green-500/30 hover:border-green-500/60 disabled:border-gray-500/30 active:scale-95 hacker-mono"
                      >
                        <span className="inline-flex items-center justify-center gap-1">
                          <span>💀</span>
                          <span>I Need Shadow Gear</span>
                        </span>
                      </button>
                    </div>
                  ) : (
                    // END MISSION Button
                    <div className="flex justify-center">
                      <button
                        onClick={handleEndMissionClick}
                        disabled={isTyping}
                        className="bg-red-600/20 hover:bg-red-600/30 disabled:bg-gray-600/20 text-red-400 px-4 py-2 text-xs font-bold transition-all duration-300 border border-red-500/30 hover:border-red-500/60 disabled:border-gray-500/30 active:scale-95 hacker-mono"
                      >
                        <span className="inline-flex items-center justify-center gap-2">
                          <span>🔴</span>
                          <span>END MISSION</span>
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Minimized Content */}
          {isMinimized && (
            <div className="relative z-10 flex-1 flex items-center justify-center">
              <span className="underground-text text-green-400 text-sm hacker-mono">
                FIREGHOST STANDBY
              </span>
            </div>
          )}
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

        /* Enhanced FIREGHOST chat scrollbar with proper mobile behavior */
        .fireghost-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(34, 197, 94, 0.6) rgba(0, 0, 0, 0.3);
          overscroll-behavior: contain;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          /* Prevent momentum scrolling on iOS */
          -webkit-overflow-scrolling: auto;
        }

        .fireghost-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .fireghost-scroll::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }

        .fireghost-scroll::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.6);
          border-radius: 3px;
        }

        .fireghost-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.8);
        }

        /* Prevent text selection during scroll */
        .fireghost-scroll:active {
          user-select: none;
          -webkit-user-select: none;
        }

        /* Enhanced mobile optimization */
        @media (max-width: 768px) {
          .fireghost-chat-modal {
            /* Prevent zoom on double tap */
            touch-action: manipulation;
            /* Prevent text selection */
            -webkit-user-select: none;
            user-select: none;
          }
          
          .fireghost-scroll {
            /* Enhanced mobile scroll behavior */
            overscroll-behavior-y: contain;
            overscroll-behavior-x: hidden;
            /* Prevent rubber band effect */
            -webkit-overflow-scrolling: auto;
          }
          
          /* Prevent zoom on input focus */
          .fireghost-chat-modal input {
            font-size: 16px;
            transform: translateZ(0);
          }
        }
      `}</style>
    </>
  );
};