import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Minimize2, Maximize2 } from 'lucide-react';

interface DegenVaultChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'shadowagent';
  timestamp: Date;
}

export const DegenVaultChatModal: React.FC<DegenVaultChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Define initial greeting message
  const initialGreetingMessage: ChatMessage = {
    id: 'initial',
    text: 'Coming soon...',
    sender: 'shadowagent',
    timestamp: new Date()
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen && !isMinimized) {
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

  // Initialize with greeting when modal opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([initialGreetingMessage]);
    }
  }, [isOpen, messages.length]);

  // Reset chat state when modal closes
  const handleModalClose = () => {
    setMessages([initialGreetingMessage]);
    setInputText('');
    onClose();
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Auto-response for "Coming soon"
    setTimeout(() => {
      const shadowResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Shadow agent deployment in progress. Stand by for tactical updates.',
        sender: 'shadowagent',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, shadowResponse]);
    }, 1000);
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
      <div className={`fixed z-50 transition-all duration-300 ease-out ${
        isMinimized 
          ? 'bottom-4 right-4 w-80 h-12' 
          : 'bottom-4 right-4 w-96 h-[600px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]'
      }`}>
        <div className="w-full h-full bg-black border-2 border-red-500/40 shadow-2xl shadow-red-500/20 overflow-hidden flex flex-col">
          {/* Red Background Grid */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }} />
          </div>

          {/* Red Scanning Line Effect */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60 animate-scan-horizontal" />

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between p-3 border-b border-red-500/30 flex-shrink-0">
            <div className="flex items-center gap-3">
              {/* Shadow Agent Logo */}
              <div className="w-8 h-8 bg-red-600/20 border border-red-500/40 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-400">
                  <defs>
                    <linearGradient id="shadowAgentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="50%" stopColor="#dc2626" />
                      <stop offset="100%" stopColor="#b91c1c" />
                    </linearGradient>
                    <filter id="shadowAgentGlow">
                      <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Shadow Agent Mask */}
                  <path 
                    d="M12 3C8.5 3 6 5.5 6 9v6c0 1 0.5 2 1.5 2.5L9 19l1.5-1.5L12 19l1.5-1.5L15 19l1.5-1.5C17.5 17 18 16 18 15V9c0-3.5-2.5-6-6-6z" 
                    fill="url(#shadowAgentGradient)" 
                    opacity="0.9"
                    filter="url(#shadowAgentGlow)"
                  />
                  
                  {/* Tactical Visor */}
                  <rect x="8" y="9" width="8" height="3" rx="1" fill="#000" opacity="0.9"/>
                  <rect x="8.5" y="9.5" width="7" height="2" rx="0.5" fill="#ef4444" opacity="0.6"/>
                  
                  {/* Shadow Grid Lines */}
                  <line x1="6" y1="15" x2="18" y2="15" stroke="#ef4444" strokeWidth="0.3" opacity="0.4"/>
                  <line x1="12" y1="3" x2="12" y2="17" stroke="#dc2626" strokeWidth="0.3" opacity="0.3"/>
                </svg>
              </div>
              <div>
                <h3 className="modal-title text-sm font-bold text-red-400">
                  SHADOW AGENT
                </h3>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="underground-text text-red-300/80 text-xs">
                    DEPLOYING
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMinimize}
                className="p-1 hover:bg-red-500/10 transition-colors border border-red-500/30 hover:border-red-500/60"
              >
                {isMinimized ? (
                  <Maximize2 className="w-3 h-3 text-red-400" />
                ) : (
                  <Minimize2 className="w-3 h-3 text-red-400" />
                )}
              </button>
              <button
                onClick={handleModalClose}
                className="p-1 hover:bg-red-500/10 transition-colors border border-red-500/30 hover:border-red-500/60"
              >
                <X className="w-3 h-3 text-red-400" />
              </button>
            </div>
          </div>

          {/* Chat Content - only show when not minimized */}
          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-4 shadow-scroll">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 text-sm ${
                        message.sender === 'user'
                          ? 'bg-red-600/20 border border-red-500/30 text-red-300'
                          : 'bg-gray-800/50 border border-red-500/20 text-red-400'
                      }`}
                    >
                      <p className="underground-text leading-relaxed">{message.text}</p>
                      <div className="mt-1 text-xs text-red-500/60">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="relative z-10 border-t border-red-500/30 p-3 flex-shrink-0">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Shadow agent deployment in progress..."
                    className="flex-1 bg-black/50 border border-red-500/30 focus:border-red-500 text-red-300 placeholder-red-500/40 p-2 text-sm transition-all duration-200 hacker-mono"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-2 transition-all duration-200 border border-red-500 hover:border-red-400 disabled:border-gray-500 active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Coming Soon Notice */}
                <div className="mt-3 p-3 border border-red-500/20 bg-red-500/5 text-center">
                  <p className="underground-text text-red-400/80 text-xs leading-relaxed">
                    🔴 <strong>SHADOW AGENT DEPLOYMENT IN PROGRESS</strong><br />
                    Advanced tactical AI coming soon to the Degen Vault
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Minimized Content */}
          {isMinimized && (
            <div className="relative z-10 flex-1 flex items-center justify-center">
              <span className="underground-text text-red-400 text-sm hacker-mono">
                SHADOW AGENT DEPLOYING
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

        /* Shadow agent chat scrollbar */
        .shadow-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(239, 68, 68, 0.6) rgba(0, 0, 0, 0.3);
          overscroll-behavior: contain;
          scroll-behavior: smooth;
        }

        .shadow-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .shadow-scroll::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }

        .shadow-scroll::-webkit-scrollbar-thumb {
          background: rgba(239, 68, 68, 0.6);
          border-radius: 3px;
        }

        .shadow-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(239, 68, 68, 0.8);
        }
      `}</style>
    </>
  );
};